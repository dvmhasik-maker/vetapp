import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { ParasiteData } from './types';

export const useParasitesLogic = () => {
  const [selectedParasite, setSelectedParasite] = useState<ParasiteData | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleParasiteClick = (p: ParasiteData) => {
    setSelectedParasite(p);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const saveResultImg = () => {
    if (!resultRef.current) return;
    const today = new Date().toLocaleDateString('ko-KR').replace(/\. /g, '-').replace('.', '');
    
    html2canvas(resultRef.current, { background: '#ffffff', scale: 2 } as any).then((canvas: HTMLCanvasElement) => {
      const link = document.createElement('a');
      link.download = `CAPC_Protocol_Result_${today}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 1.0);
      link.click();
    });
  };

  return {
    selectedParasite,
    setSelectedParasite,
    resultRef,
    handleParasiteClick,
    saveResultImg
  };
};
