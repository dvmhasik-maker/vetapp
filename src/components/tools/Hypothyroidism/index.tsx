import React from 'react';
import { ChevronLeft, ClipboardList, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useHypoLogic } from './useHypoLogic';
import DiagnosisForm from './DiagnosisForm';
import ResultView from './ResultView';
import AdSlot from '../../common/AdSlot';

const Hypothyroidism: React.FC = () => {
  const {
    mode,
    setMode,
    patient,
    values,
    result,
    setResult,
    resultRef,
    patientCardRef,
    inputPanelRef,
    handlePatientChange,
    handleValueChange,
    executeAnalysis,
    saveImg
  } = useHypoLogic();

  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <div className="page-header-tool-white">
        <div className="icon">🦋</div>
        <div>
          <h1>반려견 갑상선기능저하증 진단 및 관리 분석기</h1>
          <p>Canine Hypothyroidism Diagnosis & Management Analyzer</p>
        </div>
      </div>

      <div className="tool-content-standard">
        <AdSlot className="mb-6" />

        <div className="tab-container-tool">
          <button 
            className={`tab-btn-tool ${mode === 'diag' ? 'active' : ''}`} 
            onClick={() => { setMode('diag'); setResult(null); }}
          >
            <ClipboardList size={18} style={{ marginRight: '6px' }} /> 1단계 초기 진단
          </button>
          <button 
            className={`tab-btn-tool ${mode === 'manage' ? 'active' : ''}`} 
            onClick={() => { setMode('manage'); setResult(null); }}
          >
            <Activity size={18} style={{ marginRight: '6px' }} /> 2단계 치료 관리
          </button>
        </div>

        <DiagnosisForm
          mode={mode}
          patient={patient}
          values={values}
          handlePatientChange={handlePatientChange}
          handleValueChange={handleValueChange}
          executeAnalysis={executeAnalysis}
          saveImg={saveImg}
          patientCardRef={patientCardRef}
          inputPanelRef={inputPanelRef}
        />

        {result && (
          <ResultView
            result={result}
            patient={patient}
            values={values}
            mode={mode}
            resultRef={resultRef}
          />
        )}

        <AdSlot className="mt-8" />
      </div>

      <style>{`
        .tool-content-standard {
          margin: 0 auto;
        }
        .tab-container-tool {
          display: flex;
          gap: 10px;
          margin-bottom: 1.5rem;
        }
        .tab-btn-tool {
          flex: 1;
          padding: 14px;
          font-size: 1rem;
          font-weight: 700;
          background: #e2e8f0;
          color: #4a5568;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tab-btn-tool.active {
          background: #3498db;
          color: #fff;
          box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
        }
        .tab-btn-tool:hover:not(.active) {
          background: #cbd5e1;
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
        .unit-text { font-size: 0.75rem; color: #718096; font-weight: normal; margin-left: 4px; }

        .cat-title {
          font-size: .95rem;
          font-weight: 700;
          color: #2c3e50;
          background: #f0f7ff;
          padding: 10px 14px;
          border-radius: 8px;
          margin: 20px 0 12px;
          border-left: 4px solid #3498db;
        }
        
        .pair-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
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
        }
        .chk-label input { width: 18px; height: 18px; }
        .chk-label.checked {
          background: #e0f2fe;
          border-color: #3498db;
          color: #2980b9;
          font-weight: 700;
        }

        .btn-analyze-tool {
          width: 100%;
          margin-top: 25px;
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
        }
        .btn-analyze-tool:hover { background: #2980b9; }

        .save-row-tool { display: flex; gap: 12px; margin-top: 12px; }
        .btn-save-tool {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: .9rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .input-save { background: #2ecc71; color: #fff; }
        .result-save { background: #1abc9c; color: #fff; }

        .patient-bar {
          background: #f0f7ff;
          border-left: 4px solid #3498db;
          border-radius: 8px;
          padding: 14px;
          margin-bottom: 1rem;
          font-size: .9rem;
          display: flex;
          flex-wrap: wrap;
          gap: 10px 20px;
        }
        .input-summary {
          background: #f8fafc;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 1rem;
          font-size: .9rem;
          line-height: 1.6;
        }
        .result-box {
          border-radius: 10px;
          padding: 20px;
          margin-top: 10px;
          border-left: 6px solid #95a5a6;
          background: #fdfefe;
        }
        .result-box.danger { border-left-color: #e74c3c; background: #fdf2f2; }
        .result-box.warning { border-left-color: #f39c12; background: #fef9e7; }
        .result-box.success { border-left-color: #27ae60; background: #f4fef8; }

        .result-header { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
        .action-message {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 15px;
          padding-bottom: 12px;
          border-bottom: 1px dashed #cbd5e1;
          line-height: 1.5;
        }
        .result-guideline { font-size: 1rem; line-height: 1.7; }
        .result-guideline ul { margin-left: 20px; margin-top: 10px; }
        .result-guideline li { margin-bottom: 8px; }

        .ref-label {
          font-size: .8rem;
          color: #95a5a6;
          text-align: right;
          margin-top: 20px;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .patient-grid, .pair-grid { grid-template-columns: 1fr; }
          .save-row-tool { flex-direction: column; }
          .page-header-tool-white { padding: 16px; flex-direction: column; text-align: center; }
          .page-header-tool-white h1 { font-size: 1.2rem; }
          .tab-btn-tool { font-size: .9rem; padding: 12px 6px; }
        }
      `}</style>
    </div>
  );
};

export default Hypothyroidism;
