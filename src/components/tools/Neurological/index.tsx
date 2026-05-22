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
        .tool-page { max-width: 1200px; margin: 0 auto; padding: 1rem; display: flex; flex-direction: column; align-items: center; }
        .tool-nav, .page-header-tool-white, .layout-grid-neuro, .save-action-area { width: 100%; max-width: 800px; }
        
        .layout-grid-neuro { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem; padding-bottom: 20px; align-items: center; }
        .layout-grid-neuro > div { width: 100%; }
        
        .tool-nav { margin-bottom: 1.5rem; display: flex; justify-content: flex-start; }
        .back-btn-prominent {
          display: inline-flex; align-items: center; gap: 4px; text-decoration: none; color: #fff;
          background-color: var(--secondary-color); padding: 8px 16px; border-radius: 8px;
          font-weight: 600; font-size: 0.9rem; transition: var(--transition);
          box-shadow: 0 2px 4px rgba(52, 152, 219, 0.2);
        }

        .page-header-tool-white {
          background: #fff; color: var(--primary-color); border-radius: 14px; padding: 24px;
          display: flex; align-items: center; gap: 16px; margin-bottom: 1.5rem;
          border: 1px solid rgba(0,0,0,0.05); box-shadow: var(--shadow);
        }
        .page-header-tool-white .icon { font-size: 2.5rem; }
        .page-header-tool-white h1 { font-size: 1.4rem; font-weight: 700; line-height: 1.3; margin: 0; color: var(--primary-color); }
        .page-header-tool-white p { font-size: .9rem; color: var(--text-secondary); margin-top: 4px; }

        .tool-card-container {
          background: #fff; border-radius: 12px; box-shadow: var(--shadow);
          padding: 20px 24px; margin-bottom: 1.5rem; border: 1px solid rgba(0,0,0,0.05);
        }
        .tool-card-title {
          font-size: 1rem; font-weight: 700; color: var(--secondary-color);
          margin-bottom: 1.25rem; padding-bottom: 10px; border-bottom: 2px solid #f0f7ff;
          text-align: center;
        }

        .patient-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .pf { display: flex; flex-direction: column; gap: 6px; }
        .pf label { font-size: .85rem; color: #4a5568; font-weight: 700; text-align: center; }
        .pf input, .pf select {
          padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px;
          font-size: 1rem; outline: none; background: #fffdf0; text-align: center;
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
          .page-header-tool-white { padding: 16px; flex-direction: column; text-align: center; }
          .page-header-tool-white h1 { font-size: 1.2rem; }
          .patient-grid { grid-template-columns: 1fr; }
          .save-row { flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export default Neurological;
