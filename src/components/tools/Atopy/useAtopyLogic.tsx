import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { atopyBreedData } from './data';

export const useAtopyLogic = () => {
  const [selectedBreedId, setSelectedBreedId] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const sortedBreeds = [...atopyBreedData].sort((a, b) => a.ko.localeCompare(b.ko, 'ko'));

  const selectedBreed = atopyBreedData.find(b => b.id === selectedBreedId) || null;

  const selectBreed = (id: string) => {
    setSelectedBreedId(id);
  };

  const saveCapture = async () => {
    if (!resultRef.current || !selectedBreed) return;

    try {
      const options: any = {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      };
      const canvas = await html2canvas(resultRef.current, options);
      const link = document.createElement('a');
      link.download = `Atopy_Chart_${selectedBreed.en.replace(/ /g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Capture failed:', error);
    }
  };

  return {
    sortedBreeds,
    selectedBreed,
    selectBreed,
    saveCapture,
    resultRef
  };
};
