import { useState, useRef } from 'react';
import { Species, Toxin, PoisonResult } from './types';
import { toxinDatabase } from './data';
import html2canvas from 'html2canvas';

export const usePoisoningLogic = () => {
  const [species, setSpecies] = useState<Species>('dog');
  const [selectedToxin, setSelectedToxin] = useState<Toxin | null>(null);
  const [result, setResult] = useState<PoisonResult | null>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  const selectToxin = (toxinId: string) => {
    const toxin = toxinDatabase.find(t => t.id === toxinId);
    if (!toxin) return;
    
    setSelectedToxin(toxin);
    const newResult: PoisonResult = {
      toxin,
      species,
      date: new Date().toLocaleDateString('ko-KR')
    };
    setResult(newResult);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const handleSpeciesChange = (newSpecies: Species) => {
    setSpecies(newSpecies);
    if (selectedToxin) {
      // Update result if species changes
      setResult({
        toxin: selectedToxin,
        species: newSpecies,
        date: new Date().toLocaleDateString('ko-KR')
      });
    }
  };

  const saveImg = () => {
    if (!captureRef.current || !selectedToxin) return;
    
    html2canvas(captureRef.current, { 
      background: species === 'dog' ? '#fffbeb' : '#eff6ff',
      scale: 2,
      useCORS: true,
      logging: false
    } as any).then((canvas) => {
      const link = document.createElement('a');
      const speciesName = species === 'dog' ? '개' : '고양이';
      link.download = `VETAPP_중독분석_${selectedToxin.ko}_(${speciesName})_${new Date().getTime()}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.click();
    });
  };

  return {
    species,
    setSpecies: handleSpeciesChange,
    selectedToxin,
    setSelectedToxin,
    result,
    resultRef,
    captureRef,
    selectToxin,
    saveImg
  };
};
