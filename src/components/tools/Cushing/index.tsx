import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCushingLogic } from './useCushingLogic';
import CushingForm from './CushingForm';
import CushingResultView from './CushingResultView';
import { CushingMode } from './types';
import AdSlot from '../../common/AdSlot';

const Cushing = () => {
  const {
    mode, setMode, patientInfo, handlePatientChange, values, setValues, setToxValue,
    executeAnalysis, result, setResult, resultRef, saveImg
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

      <div className="tool-content-standard">
        <AdSlot className="mb-6" />

        <div className="tab-container-tool">
          <button 
            className={`tab-btn-tool ${mode === 'acth' ? 'active' : ''}`}
            onClick={() => handleModeSwitch('acth')}
          >
            ACTH Stimulation
            <small>Post Cortisol 기준</small>
          </button>
          <button 
            className={`tab-btn-tool ${mode === 'prepill' ? 'active' : ''}`}
            onClick={() => handleModeSwitch('prepill')}
          >
            Pre-Pill Cortisol
            <small>복약 직전 채혈 기준</small>
          </button>
        </div>

        <div className="tool-content-cushing">
          <CushingForm
            mode={mode}
            patientInfo={patientInfo}
            values={values}
            handlePatientChange={handlePatientChange}
            setToxValue={setToxValue}
            executeAnalysis={executeAnalysis}
            saveImg={saveImg}
            result={!!result}
          />

          {result && (
            <CushingResultView
              result={result}
              resultRef={resultRef}
            />
          )}
        </div>

        <AdSlot className="mt-8" />
      </div>

      <style>{`
        .tool-content-standard {
          margin: 0 auto;
        }
        .tool-content-cushing {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .tab-container-tool {
          display: flex;
          gap: 10px;
          margin-bottom: 1.5rem;
        }
        .tab-btn-tool {
          flex: 1;
          padding: 14px 10px;
          font-size: 1rem;
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
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.12);
        }
        .tab-btn-tool:hover:not(.active) {
          border-color: #cbd5e1;
          background: #f8fafc;
        }
        .tab-btn-tool small {
          display: block;
          font-size: 0.7rem;
          font-weight: 500;
          margin-top: 2px;
          opacity: 0.8;
          word-break: keep-all;
        }
        .tab-btn-tool.active small { color: #3b82f6; }

        @media (max-width: 640px) {
          .tab-btn-tool { padding: 12px 6px; font-size: 0.85rem; border-radius: 12px; }
          .tab-btn-tool small { font-size: 0.6rem; }
        }
      `}</style>
    </div>
  );
};

export default Cushing;
