import { useState, useRef } from 'react';
import { EchoInput, EchoResult } from './types';

export const useEchoLogic = () => {
  const [input, setInput] = useState<EchoInput>({
    weight: '5.0',
    la: '',
    ao: '',
    lvidd: '',
    lvids: ''
  });
  const [result, setResult] = useState<EchoResult | null>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  const calculateEcho = () => {
    const w = parseFloat(input.weight);
    const la = parseFloat(input.la);
    const ao = parseFloat(input.ao);
    const d = parseFloat(input.lvidd);
    const s = parseFloat(input.lvids);

    if (isNaN(w) || isNaN(la) || isNaN(ao) || isNaN(d) || isNaN(s)) {
      alert("모든 측정값을 입력해 주세요.");
      return;
    }

    // 1. LA:Ao Ratio
    const laAoRatio = parseFloat((la / ao).toFixed(2));

    // 2. Fractional Shortening (FS%)
    const fsPct = parseFloat((((d - s) / d) * 100).toFixed(1));

    // 3. Normalized LVIDd (Cornell)
    // LVIDdn = LVIDd / (Weight^0.294)
    const lviddn = parseFloat((d / Math.pow(w, 0.294)).toFixed(2));

    // 4. Diagnostic Stage (ACVIM MMVD Guidelines)
    let stage = "Stage B1";
    let interpretation = "심장 비대 기준(LA:Ao 1.6 & LVIDdn 1.7)을 모두 충족하지 않습니다.";

    if (laAoRatio >= 1.6 && lviddn >= 1.7) {
      stage = "Stage B2";
      interpretation = "심장 비대 기준을 모두 충족합니다. 투약(Pimobendan) 개시가 권장됩니다.";
    } else if (laAoRatio >= 1.6 || lviddn >= 1.7) {
      stage = "Stage B1/B2 경계";
      interpretation = "비대 기준 중 하나만 충족합니다. 환자의 임상 증상 및 VHS 등을 종합적으로 고려하십시오.";
    }

    setResult({
      laAoRatio,
      fsPct,
      lviddn,
      stage,
      interpretation,
      date: new Date().toLocaleDateString('ko-KR')
    });

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return {
    input,
    setInput,
    result,
    resultRef,
    captureRef,
    calculateEcho
  };
};
