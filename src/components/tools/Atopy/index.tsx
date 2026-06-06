import React, { useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAtopyLogic } from './useAtopyLogic';
import AtopyForm from './components/AtopyForm';
import AtopyResultView from './components/AtopyResultView';
import AdSlot from '../../common/AdSlot';

const Atopy: React.FC = () => {
  const {
    sortedBreeds,
    selectedBreed,
    selectBreed,
    resultRef
  } = useAtopyLogic();

  // Scroll to result when a breed is selected
  useEffect(() => {
    if (selectedBreed && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedBreed]);

  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <div className="page-header-tool-white">
        <div className="icon">🐾</div>
        <div>
          <h1>견종별 아토피 호발부위 분석기</h1>
          <p>Breed-Specific Canine Atopic Dermatitis (CAD) Predilection Sites</p>
        </div>
      </div>

      <div className="tool-content">
        <AdSlot className="mb-6" />

        <AtopyForm 
          breeds={sortedBreeds}
          selectedId={selectedBreed?.id || null}
          onSelect={selectBreed}
        />

        {selectedBreed && (
          <AtopyResultView 
            breed={selectedBreed}
            resultRef={resultRef}
          />
        )}

        <AdSlot className="mt-8" />
      </div>

      <style>{`
        .tool-content {
          margin: 0 auto;
          padding: 1rem 0;
        }
      `}</style>
    </div>
  );
};

export default Atopy;
