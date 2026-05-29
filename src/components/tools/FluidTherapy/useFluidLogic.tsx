import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { PatientData, FluidInput, FluidResult, KSupplementResult } from './types';

export const useFluidLogic = () => {
  const [patient, setPatient] = useState<PatientData>({
    name: '',
    species: 'dog',
    weight: '5.0'
  });
  const [input, setInput] = useState<FluidInput>({
    dehydration: 0,
    ongoingLoss: '0',
    dropFactor: '60',
    potassium: '4.0'
  });
  const [result, setResult] = useState<FluidResult | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  // Auto-calculate whenever patient or input changes
  useEffect(() => {
    calculateFluid();
  }, [patient, input]);

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
      date: new Date().toLocaleDateString('ko-KR')
    });
  };

  const saveImg = () => {
    if (!captureRef.current) return;
    html2canvas(captureRef.current, { background: '#f8fafc', scale: 2 } as any).then((canvas) => {
      const link = document.createElement('a');
      link.download = `VET_수액처방리포트_${patient.name || '환자'}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
    });
  };

  return {
    patient,
    setPatient,
    input,
    setInput,
    result,
    resultRef,
    captureRef,
    saveImg
  };
};
