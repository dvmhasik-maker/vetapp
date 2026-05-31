import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNeuroLogic } from './useNeuroLogic';
import NeuroForm from './NeuroForm';
import NeuroResultView from './NeuroResultView';
import html2canvas from 'html2canvas';

const Neurological: React.FC = () => {
  const {
    patient,
    setPatient,
    selectedSymptomIds,
    toggleSymptom,
    result,
    resultRef,
    captureRef,
    localizeLesion
  } = useNeuroLogic();

  const saveImg = () => {
    const target = resultRef.current;
    if (!target || !result) {
      alert('분석 결과가 없습니다. 먼저 분석을 실행해 주세요.');
      return;
    }

    const ptName = patient.name || '환자';
    const today = new Date().toLocaleDateString('ko-KR').replace(/\. /g, '-').replace('.', '');

    html2canvas(target, { background: '#f4f6f9', scale: 2 } as any).then((canvas) => {
      const link = document.createElement('a');
      link.download = `${ptName}_신경병변_분석결과_${today}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 1.0);
      link.click();
    });
  };

  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <header className="page-header-tool-white">
        <div className="icon">🧠</div>
        <div>
          <h1>반려동물 신경증상 기반 병변 위치 분석기</h1>
          <p>Veterinary Neurological Localization System (이상 증상 및 좌/우 방향 판정)</p>
        </div>
      </header>

      <div className="layout-grid-neuro" ref={captureRef}>
        <NeuroForm
          patient={patient}
          setPatient={setPatient}
          selectedSymptomIds={selectedSymptomIds}
          toggleSymptom={toggleSymptom}
          localizeLesion={localizeLesion}
          saveImg={saveImg}
          result={!!result}
        />

        {result && (
          <NeuroResultView
            result={result}
            patient={patient}
            resultRef={resultRef}
          />
        )}
      </div>

      <style>{`
        .layout-grid-neuro { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem; padding-bottom: 20px; align-items: center; }
        .layout-grid-neuro > div { width: 100%; }
        
        .patient-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .pf { display: flex; flex-direction: column; gap: 6px; }
        .pf label { font-size: .85rem; color: #4a5568; font-weight: 700; }
        .pf input, .pf select {
          padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px;
          font-size: 1rem; outline: none; background: #fff;
        }

        .save-action-area { max-width: 1200px; margin: 0 auto; padding: 1rem; display: flex; justify-content: center; }
        .btn-save-refined-neuro {
          width: 100%; max-width: 600px; padding: 16px; border: none; border-radius: 12px;
          font-size: 1rem; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          background: #10b981; color: #fff; transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
        }
        .btn-save-refined-neuro:hover { background: #059669; transform: translateY(-2px); box-shadow: 0 6px 15px rgba(16, 185, 129, 0.3); }

        @media (max-width: 1024px) {
          .layout-grid-neuro { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .patient-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Neurological;
