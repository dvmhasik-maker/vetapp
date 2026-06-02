import { useState, useRef, useEffect } from 'react';
import { PatientData, FluidInput, FluidResult, KSupplementResult, TLKInput, TLKResult, TLKDrugResult, TLKLoadingDose } from './types';

const TLK_CONC = { tramadol: 50, lidocaine: 20, ketamine: 50 };
const TLK_RANGES = {
  dog: {
    tramadol: { lo: 1.3, hi: 2.6, step: 0.05, default: 1.3 },
    lidocaine: { lo: 0.6, hi: 3.0, step: 0.05, default: 1.5 },
    ketamine: { lo: 0.12, hi: 1.2, step: 0.02, default: 0.6 },
  },
  cat: {
    tramadol: { lo: 1.3, hi: 2.6, step: 0.05, default: 1.3 },
    lidocaine: { lo: 0.6, hi: 1.5, step: 0.05, default: 1.0 },
    ketamine: { lo: 0.12, hi: 1.2, step: 0.02, default: 0.6 },
  },
};

export const useFluidLogic = () => {
  const [patient, setPatient] = useState<PatientData>({
    species: 'dog',
    weight: '5.0'
  });
  const [input, setInput] = useState<FluidInput>({
    dehydration: 0,
    ongoingLoss: '0',
    dropFactor: '60',
    potassium: '4.0'
  });
  const [tlkInput, setTlkInput] = useState<TLKInput>({
    enabled: false,
    bagSize: '500',
    fluidRate: '1.0', // Now multiplier
    isRatePerKg: false,
    tramadolDose: 1.3,
    lidocaineDose: 1.5,
    ketamineDose: 0.6
  });
  const [result, setResult] = useState<FluidResult | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  // Update TLK doses when species changes to ensure they are within safe limits
  useEffect(() => {
    const ranges = TLK_RANGES[patient.species];
    setTlkInput(prev => ({
      ...prev,
      tramadolDose: Math.min(ranges.tramadol.hi, Math.max(ranges.tramadol.lo, prev.tramadolDose)),
      lidocaineDose: Math.min(ranges.lidocaine.hi, Math.max(ranges.lidocaine.lo, prev.lidocaineDose)),
      ketamineDose: Math.min(ranges.ketamine.hi, Math.max(ranges.ketamine.lo, prev.ketamineDose))
    }));
  }, [patient.species]);

  useEffect(() => {
    calculateFluid();
  }, [patient, input, tlkInput]);

  const calculateFluid = () => {
    const weight = parseFloat(patient.weight);
    if (isNaN(weight) || weight <= 0) return;

    const dehydPct = input.dehydration;
    const ongoingLoss = parseFloat(input.ongoingLoss) || 0;
    const dropFactor = parseFloat(input.dropFactor) || 60;
    const kSerum = parseFloat(input.potassium) || 4.0;

    // 1. Maintenance (AAHA Guidelines)
    const maintenanceDaily = patient.species === 'dog'
        ? 132 * Math.pow(weight, 0.75)
        : 80 * Math.pow(weight, 0.75);

    // 2. Deficit (ml) = weight(kg) * %dehydration * 10
    const dehydrationDaily = weight * dehydPct * 10;

    // 3. Total 24h & Hourly Rate
    const totalDailyFluid = maintenanceDaily + dehydrationDaily + ongoingLoss;
    const hourlyFluidRate = totalDailyFluid / 24;

    // 4. Drip rates
    const gttPerMin = (hourlyFluidRate * dropFactor) / 60;
    const secondsPerDrop = gttPerMin > 0 ? 60 / gttPerMin : 0;

    // 5. K+ Logic
    let kTarget = 0;
    let kStatusText = '';
    let kStatusClass = '';

    if (kSerum >= 3.5) {
      kTarget = 0;
      kStatusText = '정상 K+ 수치 (보충 비대상)';
      kStatusClass = 'status-normal';
    } else if (kSerum >= 3.0) {
      kTarget = 20;
      kStatusText = '경미한 Hypokalemia (교정 대상)';
      kStatusClass = 'status-warning';
    } else if (kSerum >= 2.5) {
      kTarget = 30;
      kStatusText = '중등도 Hypokalemia (정밀 교정)';
      kStatusClass = 'status-danger-soft';
    } else if (kSerum >= 2.0) {
      kTarget = 40;
      kStatusText = '중증 Hypokalemia (주의 요망)';
      kStatusClass = 'status-danger';
    } else {
      kTarget = 60;
      kStatusText = '위독한 저칼륨혈증 (초고농도 처방)';
      kStatusClass = 'status-critical';
    }

    const mEqPerMl = 2; // KCL-40: 2mEq/mL
    
    const kSupplements: KSupplementResult[] = [
      {
        bagName: '100mL 생리식염수 (0.9% NaCl)',
        volume: 100,
        addAmount: kTarget === 0 ? '0.0' : ((kTarget * 100 / 1000) / mEqPerMl).toFixed(1),
        totalK: kTarget === 0 ? '0.0' : (kTarget * 100 / 1000).toFixed(1),
        isLRS: false
      },
      {
        bagName: '500mL 생리식염수 (0.9% NaCl)',
        volume: 500,
        addAmount: kTarget === 0 ? '0.0' : ((kTarget * 500 / 1000) / mEqPerMl).toFixed(1),
        totalK: kTarget === 0 ? '0.0' : (kTarget * 500 / 1000).toFixed(1),
        isLRS: false
      },
      {
        bagName: '500mL 하트만액 (LRS)',
        volume: 500,
        addAmount: kTarget === 0 ? '0.0' : (Math.max(0, (kTarget * 500 / 1000) - 2) / mEqPerMl).toFixed(1),
        totalK: kTarget === 0 ? '2.0' : (kTarget * 500 / 1000).toFixed(1),
        isLRS: true
      }
    ];

    // 6. Safety Warning
    const maxSafeK = 0.5 * weight;
    const currentKRate = (hourlyFluidRate / 1000) * kTarget;
    const showSafetyWarning = kTarget > 0 && currentKRate >= maxSafeK;

    // 7. TLK Logic
    let tlkResult: TLKResult | undefined;
    if (tlkInput.enabled) {
      const bagSize = parseFloat(tlkInput.bagSize) || 500;
      const multiplier = parseFloat(tlkInput.fluidRate) || 1.0;
      
      const fluidRateAbs = hourlyFluidRate * multiplier;
      const fluidRatePerKg = fluidRateAbs / weight;
      const duration = fluidRateAbs > 0 ? bagSize / fluidRateAbs : 0;

      const drugs: TLKDrugResult[] = [
        {
          name: 'Tramadol',
          dose: tlkInput.tramadolDose,
          totalMg: tlkInput.tramadolDose * weight * duration,
          volumeMl: (tlkInput.tramadolDose * weight * duration) / TLK_CONC.tramadol,
          concMgMl: (tlkInput.tramadolDose * weight * duration) / bagSize,
          color: 'var(--tramadol)'
        },
        {
          name: 'Lidocaine',
          dose: tlkInput.lidocaineDose,
          totalMg: tlkInput.lidocaineDose * weight * duration,
          volumeMl: (tlkInput.lidocaineDose * weight * duration) / TLK_CONC.lidocaine,
          concMgMl: (tlkInput.lidocaineDose * weight * duration) / bagSize,
          color: 'var(--lidocaine)'
        },
        {
          name: 'Ketamine',
          dose: tlkInput.ketamineDose,
          totalMg: tlkInput.ketamineDose * weight * duration,
          volumeMl: (tlkInput.ketamineDose * weight * duration) / TLK_CONC.ketamine,
          concMgMl: (tlkInput.ketamineDose * weight * duration) / bagSize,
          color: 'var(--ketamine)'
        }
      ];

      const loadingDoses: TLKLoadingDose[] = [
        {
          name: 'Tramadol 로딩',
          description: '1.5 mg/kg IV — 천천히 투여',
          volume: (1.5 * weight) / TLK_CONC.tramadol
        },
        {
          name: patient.species === 'dog' ? 'Lidocaine 로딩 (표준)' : 'Lidocaine 로딩 (저용량)',
          description: patient.species === 'dog' ? '1.0 mg/kg IV — 개 표준' : '0.25 mg/kg IV — 고양이 권장 (천천히)',
          volume: (patient.species === 'dog' ? 1.0 : 0.25) * weight / TLK_CONC.lidocaine
        },
        {
          name: 'Ketamine 로딩 (저용량)',
          description: '0.25 mg/kg IV',
          volume: (0.25 * weight) / TLK_CONC.ketamine
        },
        {
          name: 'Ketamine 로딩 (고용량)',
          description: '0.50 mg/kg IV',
          volume: (0.50 * weight) / TLK_CONC.ketamine
        }
      ];

      tlkResult = {
        drugs,
        fluidRateAbs,
        fluidRatePerKg,
        duration,
        bagSize,
        loadingDoses
      };
    }

    setResult({
      maintenance: Math.round(maintenanceDaily),
      deficit: Math.round(dehydrationDaily),
      ongoing: Math.round(ongoingLoss),
      total24h: Math.round(totalDailyFluid),
      hourlyRate: parseFloat(hourlyFluidRate.toFixed(1)),
      gttPerMin: Math.round(gttPerMin),
      secondsPerDrop: parseFloat(secondsPerDrop.toFixed(1)),
      kTarget,
      kStatusText,
      kStatusClass,
      kSupplements,
      maxSafeK,
      currentKRate,
      showSafetyWarning,
      tlk: tlkResult,
      date: new Date().toLocaleDateString('ko-KR')
    });
  };

  return {
    patient,
    setPatient,
    input,
    setInput,
    tlkInput,
    setTlkInput,
    tlkRanges: TLK_RANGES[patient.species],
    result,
    resultRef
  };
};
