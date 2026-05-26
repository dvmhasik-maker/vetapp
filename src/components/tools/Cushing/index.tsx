import { ChevronLeft, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCushingLogic } from './useCushingLogic';
import CushingForm from './CushingForm';
import CushingResultView from './CushingResultView';
import { CushingMode } from './types';

const Cushing = () => {
  const {
    mode, setMode, patientInfo, handlePatientChange, values, setValues, setToxValue,
    executeAnalysis, result, setResult, resultRef, captureRef, saveImg
  } = useCushingLogic();

  const handleModeSwitch = (newMode: CushingMode) => {
    setMode(newMode);
    setResult(null);
    setValues({ food: null, pupd: null, cortisol: '' }); // 탭 전환 시 입력값 초기화
  };

  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <header className="page-header-tool-white">
        <div className="icon">🐶</div>
        <div>
          <h1>강아지 쿠싱 관리 분석기</h1>
          <p>Trilostane 치료 중 모니터링 (Ettinger 9th ed. 기반)</p>
        </div>
      </header>

      <div className="tab-container-tool">
        <button 
          className={`tab-btn-tool ${mode === 'acth' ? 'active' : ''}`}
          onClick={() => handleModeSwitch('acth')}
        >
          ACTH Stimulation
          <small style={{ display: 'block', fontSize: '0.7rem', fontWeight: 400 }}>Post Cortisol 기준</small>
        </button>
        <button 
          className={`tab-btn-tool ${mode === 'prepill' ? 'active' : ''}`}
          onClick={() => handleModeSwitch('prepill')}
        >
          Pre-Pill Cortisol
          <small style={{ display: 'block', fontSize: '0.7rem', fontWeight: 400 }}>복약 직전 채혈 기준</small>
        </button>
      </div>

      <div className="tool-content-cushing" ref={captureRef}>
        <CushingForm
          mode={mode}
          patientInfo={patientInfo}
          values={values}
          handlePatientChange={handlePatientChange}
          setToxValue={setToxValue}
          executeAnalysis={executeAnalysis}
        />

        {result && (
          <CushingResultView
            result={result}
            resultRef={resultRef}
          />
        )}
      </div>

      <div className="save-action-area">
        <button className="btn-save-refined" onClick={saveImg}>
          <Camera size={20} /> 분석 결과 리포트 이미지 저장
        </button>
      </div>

      <style>{`
        .tool-content-cushing {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .tab-container-tool {
          display: flex;
          gap: 12px;
          margin-bottom: 1.5rem;
        }
        .tab-btn-tool {
          flex: 1;
          padding: 16px 12px;
          font-size: 1.05rem;
          font-weight: 800;
          background: #fff;
          color: #64748b;
          border: 2px solid #e2e8f0;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
        }
        .tab-btn-tool.active {
          background: #fff;
          border-color: #3498db;
          color: #1d4ed8;
          box-shadow: 0 4px 15px rgba(52, 152, 219, 0.15);
          transform: translateY(-2px);
        }
        .tab-btn-tool:hover:not(.active) {
          border-color: #cbd5e1;
          background: #f8fafc;
        }
        .tab-btn-tool small {
          display: block;
          font-size: 0.75rem;
          font-weight: 500;
          margin-top: 4px;
          opacity: 0.8;
        }
        .tab-btn-tool.active small { color: #3b82f6; }

        .save-action-area {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
        }

        .btn-save-refined {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.05rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
        }

        .btn-save-refined:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
          filter: brightness(1.05);
        }

        @media (max-width: 768px) {
          .tab-container-tool { flex-direction: column; }
        }
      `}</style>
    </div>
  );
};

export default Cushing;
