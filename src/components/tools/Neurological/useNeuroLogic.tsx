import { useState, useRef } from 'react';
import { NeuroResult, PatientData, RankResult, Symptom } from './types';
import { symptomData } from './data';

export const useNeuroLogic = () => {
  const [patient, setPatient] = useState<PatientData>({
    name: '',
    breed: '',
    sex: '',
    age: ''
  });
  const [selectedSymptomIds, setSelectedSymptoms] = useState<string[]>([]);
  const [result, setResult] = useState<NeuroResult | null>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const localizeLesion = () => {
    if (selectedSymptomIds.length === 0) {
      alert('관찰되는 이상 증상을 최소 1개 이상 선택해 주세요.');
      return;
    }

    const targetsList = ['전뇌', '뇌간', '소뇌', 'C1-C5', 'C6-T2', 'T3-L3', 'L4-L6', 'L6-S3', '골격근'];
    const scoreMap: Record<string, { score: number; matches: string[] }> = {};
    
    targetsList.forEach(t => {
      scoreMap[`좌측 ${t}`] = { score: 0, matches: [] };
      scoreMap[`우측 ${t}`] = { score: 0, matches: [] };
    });

    const flatSymptoms = Object.values(symptomData).flat();
    const selectedSymptoms = flatSymptoms.filter(s => selectedSymptomIds.includes(s.id));
    
    let totalInteractions = 0;
    const selectedTexts: string[] = [];

    selectedSymptoms.forEach(s => {
      const text = s.text;
      selectedTexts.push(text);
      totalInteractions += 1;

      // 1. Base (Symmetric)
      if (s.base) {
        s.base.forEach(t => {
          scoreMap[`좌측 ${t}`].score += 1; scoreMap[`좌측 ${t}`].matches.push(text);
          scoreMap[`우측 ${t}`].score += 1; scoreMap[`우측 ${t}`].matches.push(text);
        });
      }

      // 2. Cross (Contralateral)
      if (s.cross) {
        const isLeftSymptom = s.id.includes('왼쪽');
        s.cross.forEach(t => {
          const side = isLeftSymptom ? '우측 ' : '좌측 ';
          scoreMap[side + t].score += 1;
          scoreMap[side + t].matches.push(text);
        });
      }

      // 3. Ipsi (Ipsilateral)
      if (s.ipsi) {
        const isLeftSymptom = s.id.includes('왼쪽') || s.id.includes('왼쪽서클') || s.id.includes('왼쪽휨') || s.id.includes('왼쪽턴');
        s.ipsi.forEach(t => {
          const side = isLeftSymptom ? '좌측 ' : '우측 ';
          scoreMap[side + t].score += 1;
          scoreMap[side + t].matches.push(text);
        });
      }

      // 4. Special: Menace Fail (Brainstem path)
      if (s.isMenaceFail) {
        scoreMap['좌측 뇌간'].score += 1; scoreMap['좌측 뇌간'].matches.push(`${text} (위협반사 경로 이상)`);
        scoreMap['우측 뇌간'].score += 1; scoreMap['우측 뇌간'].matches.push(`${text} (위협반사 경로 이상)`);
        totalInteractions += 1;
      }
    });

    const sorted: RankResult[] = Object.keys(scoreMap)
      .map(key => {
        const pct = Math.min(100, Math.round((scoreMap[key].score / totalInteractions) * 100));
        return {
          name: key,
          score: scoreMap[key].score,
          pct,
          matches: scoreMap[key].matches
        };
      })
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);

    setResult({
      topRanks: sorted,
      selectedSymptoms: selectedTexts,
      totalInteractions,
      date: new Date().toLocaleDateString('ko-KR')
    });

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return {
    patient,
    setPatient,
    selectedSymptomIds,
    toggleSymptom,
    result,
    resultRef,
    captureRef,
    localizeLesion
  };
};
