import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { ResultData } from './types';
import { statusConfig, brandProductPreset } from './data';

export const useFoodAmountLogic = () => {
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [petStatus, setPetStatus] = useState<number>(1.6);
  const [brand, setBrand] = useState('royal_canin');
  const [productKcal, setProductKcal] = useState<number>(0);
  const [result, setResult] = useState<ResultData | null>(null);

  const captureZoneRef = useRef<HTMLDivElement>(null);
  const resultColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPetStatus(species === 'dog' ? 1.6 : 1.2);
    const firstProduct = brandProductPreset[species][brand]?.[0];
    setProductKcal(firstProduct?.kcal || 0);
  }, [species, brand]);

  const calculateNutrition = () => {
    const weight = parseFloat(petWeight);
    if (isNaN(weight) || weight <= 0) {
      alert("반려동물의 체중을 정확하게 입력해 주십시오.");
      return;
    }

    if (productKcal === 0) {
      alert("유효한 사료 제품을 선택해 주십시오.");
      return;
    }

    const rer = species === 'dog' ? (weight * 30) + 70 : weight * 40;
    const der = rer * petStatus;
    const totalFoodG = der / productKcal;
    const paperCupConvert = totalFoodG / 75;

    const activeStatusText = statusConfig[species].find(s => s.val === petStatus)?.text || "기타";
    const productList = brandProductPreset[species][brand];
    const activeProductName = productList.find(p => p.kcal === productKcal)?.name || "선택된 사료";
    const brandNameMap: Record<string, string> = {
      royal_canin: "로얄캐닌",
      hills: "힐스",
      healmedix: "힐메딕스",
      velixer: "벨릭서"
    };

    setResult({
      name: petName || "반려동물",
      der: Math.round(der),
      kcalPerG: productKcal.toFixed(2),
      foodG: Math.round(totalFoodG),
      profile: `${species === 'dog' ? '개(Canine)' : '고양이(Feline)'} / ${petAge || '미입력'} / ${weight.toFixed(2)} kg`,
      status: `${activeStatusText} [Factor: ${petStatus.toFixed(1)}]`,
      rer: Math.round(rer),
      foodInfo: `[${brandNameMap[brand]}] ${activeProductName}`,
      cupInfo: `약 ${paperCupConvert.toFixed(1)} 컵`,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
    });

    if (window.innerWidth < 1024) {
      setTimeout(() => {
        resultColRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const exportToImage = () => {
    if (!captureZoneRef.current) return;
    html2canvas(captureZoneRef.current, { scale: 2.5, useCORS: true, backgroundColor: '#ffffff' } as any)
      .then((canvas: HTMLCanvasElement) => {
        const a = document.createElement('a');
        a.download = `VET_정밀급여설계_${result?.name || '환자'}.jpg`;
        a.href = canvas.toDataURL('image/jpeg', 0.9);
        a.click();
      })
      .catch(() => alert("리포트 이미지 저장 중 시스템 오류가 발생했습니다."));
  };

  return {
    species,
    setSpecies,
    petName,
    setPetName,
    petAge,
    setPetAge,
    petWeight,
    setPetWeight,
    petStatus,
    setPetStatus,
    brand,
    setBrand,
    productKcal,
    setProductKcal,
    result,
    captureZoneRef,
    resultColRef,
    calculateNutrition,
    exportToImage
  };
};
