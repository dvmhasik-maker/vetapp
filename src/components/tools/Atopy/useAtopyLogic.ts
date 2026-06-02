import { useState, useRef } from 'react';
import { atopyBreedData } from './data';

export const useAtopyLogic = () => {
  const [selectedBreedId, setSelectedBreedId] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const sortedBreeds = [...atopyBreedData].sort((a, b) => a.ko.localeCompare(b.ko, 'ko'));

  const selectedBreed = atopyBreedData.find(b => b.id === selectedBreedId) || null;

  const selectBreed = (id: string) => {
    setSelectedBreedId(id);
  };

  return {
    sortedBreeds,
    selectedBreed,
    selectBreed,
    resultRef
  };
};
