import React from 'react';
import { ChevronLeft, Camera } from 'lucide-react';
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

  const saveImg = (targetType: 'input' | 'result') => {
    const target = targetType === 'result' ? resultRef.current : captureRef.current;
    if (!target || (targetType === 'result' && !result)) {
      alert('저장할 화면이 활성화되지 않았습니다.');
      return;
    }

    const ptName = patient.name || '환자';
    const today = new Date().toLocaleDateString('ko-KR').replace(/\. /g, '-').replace('.', '');
    const label = targetType === 'result' ? '신경병변_분석결과' : '신경병변_입력화면';

    html2canvas(target, { background: '#f4f6f9', scale: 2 } as any).then((canvas) => {
      const link = document.createElement('a');
      link.download = `${ptName}_${label}_${today}.jpg`;
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

      <div className="page-header-tool-white">
        <div className="icon">🧠</div>
        <div>
          <h1>반려동물 신경증상 기반 병변 위치 분석기</h1>
          <p>Veterinary Neurological Localization System (이상 증상 및 좌/우 방향 판정)</p>
        </div>
      </div>

      <div className="layout-grid-neuro" ref={captureRef}>
        <NeuroForm
          patient={patient}
          setPatient={setPatient}
          selectedSymptomIds={selectedSymptomIds}
          toggleSymptom={toggleSymptom}
          localizeLesion={localizeLesion}
        />

        {result && (
          <NeuroResultView
            result={result}
            patient={patient}
            resultRef={resultRef}
          />
        )}
      </div>

      <div className="save-action-area">
        <div className="save-row">
          <button className="btn-save input-save" onClick={() => saveImg('input')}>
            <Camera size={18} style={{ marginRight: '6px' }} /> 입력화면 저장
          </button>
          <button className="btn-save result-save" onClick={() => saveImg('result')}>
            <Camera size={18} style={{ marginRight: '6px' }} /> 결과화면 저장
          </button>
        </div>
      </div>

      <style>{`
        .layout-grid-neuro { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem; padding-bottom: 20px; align-items: center; }
        .layout-grid-neuro > div { width: 100%; }
        
        .patient-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .pf { display: flex; flex-direction: column; gap: 6px; }
        .pf label { font-size: .85rem; color: #4a5568; font-weight: 700; }
        .pf input, .pf select {
          padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px;
          font-size: 1rem; outline: none; background: #fffdf0;
        }

        .save-action-area { max-width: 1200px; margin: 0 auto; padding: 1rem; display: flex; justify-content: center; }
        .save-row { display: flex; gap: 12px; width: 100%; max-width: 600px; }
        .btn-save {
          flex: 1; padding: 14px; border: none; border-radius: 10px;
          font-size: .95rem; font-weight: 700; cursor: pointer;
          display: flex; align-items: center; justify-content: center; transition: all 0.2s;
        }
        .input-save { background: #2ecc71; color: #fff; }
        .result-save { background: #3498db; color: #fff; }
        .btn-save:hover { transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); }

        @media (max-width: 1024px) {
          .layout-grid-neuro { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .patient-grid { grid-template-columns: 1fr; }
          .save-row { flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export default Neurological;
