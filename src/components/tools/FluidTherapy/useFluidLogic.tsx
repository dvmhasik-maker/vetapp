import { useState, useRef, useEffect } from 'react';
import { PatientData, FluidInput, FluidResult, KSupplementResult } from './types';

export const useFluidLogic = () => {
  const [patient, setPatient] = useState<PatientData>({
    species: 'dog',
    weight: '5.0'
  });
  const [input, setInput] = useState<FluidInput>({
    dehydration: 0,
    ongoingLoss: '0',
    potassium: '4.0',
    bagSize: 500,
    tramadol: 1.30,
    lidocaine: 1.50,
    ketamine: 0.60
  });
  const [result, setResult] = useState<FluidResult | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset defaults when species changes
    if (patient.species === 'cat') {
      setInput(prev => ({
        ...prev,
        lidocaine: Math.min(prev.lidocaine, 1.50)
      }));
    }
  }, [patient.species]);

  useEffect(() => {
    calculateFluid();
  }, [patient, input]);

  const calculateFluid = () => {
    const weight = parseFloat(patient.weight);
    if (isNaN(weight) || weight <= 0) return;

    const dehydPct = input.dehydration;
    const ongoingLoss = parseFloat(input.ongoingLoss) || 0;
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

    // 4. Bag Duration
    const duration = input.bagSize / hourlyFluidRate;

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

    // 7. TLK CRI Logic
    const CONC = { tramadol: 50, lidocaine: 20, ketamine: 50 };
    
    const calculateDrugCRI = (dose: number, conc: number) => {
      const totalMg = dose * weight * duration;
      const volumeMl = totalMg / conc;
      const concInBag = totalMg / input.bagSize;
      return {
        dose,
        totalMg: totalMg.toFixed(2),
        volumeMl: volumeMl.toFixed(2),
        concInBag: concInBag.toFixed(2)
      };
    };

    const tlk = {
      tramadol: calculateDrugCRI(input.tramadol, CONC.tramadol),
      lidocaine: calculateDrugCRI(input.lidocaine, CONC.lidocaine),
      ketamine: calculateDrugCRI(input.ketamine, CONC.ketamine),
      loadingDoses: {
        tramadol: ((1.50 * weight) / CONC.tramadol).toFixed(2),
        lidocaine: (((patient.species === 'dog' ? 1.00 : 0.25) * weight) / CONC.lidocaine).toFixed(2),
        ketamineLo: ((0.25 * weight) / CONC.ketamine).toFixed(2),
        ketamineHi: ((0.50 * weight) / CONC.ketamine).toFixed(2)
      }
    };

    setResult({
      maintenance: Math.round(maintenanceDaily),
      deficit: Math.round(dehydrationDaily),
      ongoing: Math.round(ongoingLoss),
      total24h: Math.round(totalDailyFluid),
      hourlyRate: parseFloat(hourlyFluidRate.toFixed(1)),
      bagSize: input.bagSize,
      bagDuration: duration.toFixed(1),
      kTarget,
      kStatusText,
      kStatusClass,
      kSupplements,
      maxSafeK,
      currentKRate,
      showSafetyWarning,
      tlk,
      date: new Date().toLocaleDateString('ko-KR')
    });
  };

  return {
    patient,
    setPatient,
    input,
    setInput,
    result,
    resultRef
  };
};