import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNeuroLogic } from './useNeuroLogic';
import NeuroForm from './NeuroForm';
import NeuroResultView from './NeuroResultView';
import NeuroGuide from './NeuroGuide';
import CollapsibleInfo from '../../common/CollapsibleInfo';
import AdSlot from '../../common/AdSlot';

const Neurological: React.FC = () => {
  const {
    patient,
    setPatient,
    selectedSymptomIds,
    toggleSymptom,
    result,
    resultRef,
    localizeLesion,
    resetSigns
  } = useNeuroLogic();

  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <div className="page-header-tool-white">
        <div className="icon">🧠</div>
        <div>
          <h1>신경계 병변 국소화 보조 도구</h1>
          <p>신경 증상 기반 병변 위치 감별 (Neuro-Localization)</p>
        </div>
      </div>

      <div className="tool-content-standard">
        <AdSlot className="mb-6" />

        <NeuroForm
          patient={patient}
          setPatient={setPatient}
          selectedSymptomIds={selectedSymptomIds}
          toggleSymptom={toggleSymptom}
          localizeLesion={localizeLesion}
          resetSigns={resetSigns}
          result={Boolean(result)}
        />

        {result && (
          <NeuroResultView
            result={result}
            patient={patient}
            resultRef={resultRef}
          />
        )}

        <CollapsibleInfo title="신경계 검사 및 병변 국소화 가이드">
          <NeuroGuide />
        </CollapsibleInfo>

        <AdSlot className="mt-8" />
      </div>

      <style>{`
        .tool-content-standard {
          margin: 0 auto;
        }

        .patient-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .pf { display: flex; flex-direction: column; gap: 6px; }
        .pf label { font-size: .85rem; color: #4a5568; font-weight: 700; }
        .pf input, .pf select {
          padding: 10px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .pf input:focus, .pf select:focus { border-color: #3498db; }

        .cat-title {
          font-size: .95rem;
          font-weight: 700;
          color: #2c3e50;
          background: #f0f7ff;
          padding: 10px 14px;
          border-radius: 8px;
          margin: 22px 0 12px;
          border-left: 4px solid #3498db;
          text-align: center;
        }
        
        .pair-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .single-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
        
        .chk-label {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px;
          border: 2px solid #f1f5f9;
          border-radius: 10px;
          background: #f8fafc;
          cursor: pointer;
          transition: all 0.2s;
          font-size: .95rem;
          color: #334155;
          min-height: 72px;
          line-height: 1.3;
          text-align: left;
          white-space: pre-line;
        }
        .chk-label input { width: 18px; height: 18px; flex-shrink: 0; }
        .chk-label:hover { border-color: #3498db; background: #f0f7ff; }
        .chk-label.checked {
          background: #e0f2fe;
          border-color: #3498db;
          color: #2980b9;
          font-weight: 700;
        }

        .action-area-common {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 25px;
        }

        .btn-primary-action {
          width: 100%;
          padding: 16px;
          background: #3498db;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          gap: 8px;
        }
        .btn-primary-action:hover { background: #2980b9; }

        .btn-secondary-action {
          width: 100%;
          padding: 12px;
          background: #1abc9c;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: .9rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .btn-secondary-action:hover { background: #16a085; }

        @media (min-width: 1024px) {
          .single-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .patient-grid, .pair-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Neurological;
