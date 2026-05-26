import React from 'react';
import { ChevronLeft, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFluidLogic } from './useFluidLogic';
import FluidForm from './FluidForm';
import FluidResultView from './FluidResultView';

const FluidTherapy: React.FC = () => {
  const {
    patient,
    setPatient,
    input,
    setInput,
    result,
    resultRef,
    captureRef,
    saveImg
  } = useFluidLogic();

  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <div className="page-header-tool-white">
        <div className="icon">💧</div>
        <div>
          <h1>반려동물 정밀 수액 요법 & K⁺ 보충량 계산기</h1>
          <p>임상 가이드라인 기반 유지/탈수/손실 수액량 및 전해질 교정 연산</p>
        </div>
      </div>

      <div className="layout-grid-fluid" ref={captureRef}>
        <FluidForm
          patient={patient}
          setPatient={setPatient}
          input={input}
          setInput={setInput}
        />

        {result && (
          <FluidResultView
            result={result}
            resultRef={resultRef}
          />
        )}
      </div>

      <div className="save-action-area">
        <button className="btn-save-full" onClick={saveImg}>
          <Camera size={20} /> 처방 리포트 이미지 저장
        </button>
      </div>

      <style>{`
        .layout-grid-fluid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1rem; padding-bottom: 20px; }
        
        .patient-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .pf { display: flex; flex-direction: column; gap: 6px; }
        .pf label { font-size: .85rem; color: #4a5568; font-weight: 700; }
        .pf input, .pf select {
          padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px;
          font-size: 1rem; outline: none; background: #fffdf0;
        }

        .species-toggle-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .species-btn-small {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px; border-radius: 8px; border: 1.5px solid #e2e8f0;
          background: #f8fafc; font-size: 0.85rem; font-weight: 600; cursor: pointer; color: #64748b;
        }
        .species-btn-small.active { border-color: #3498db; background: #eef2ff; color: #3498db; }

        .dehydration-badge { font-size: 0.75rem; font-weight: 800; color: #1d4ed8; background: #eff6ff; padding: 2px 8px; border-radius: 100px; border: 1px solid #dbeafe; }
        .fluid-range-slider { width: 100%; height: 6px; background: #e2e8f0; border-radius: 999px; outline: none; cursor: pointer; -webkit-appearance: none; }
        .fluid-range-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; background: #3498db; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        .dehydration-ticks { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 8px; }
        .dehydration-ticks span { font-size: 0.65rem; color: #94a3b8; line-height: 1.3; }
        .dehydration-ticks span:last-child { text-align: right; }

        .k-settings-card { border-left: 4px solid #f59e0b; }
        .k-title-text { color: #b45309; }
        .k-input-field { border-color: #fde68a !important; color: #92400e; font-weight: 800; }
        .k-help-text { font-size: 0.75rem; color: #94a3b8; margin-top: 8px; }

        .fluid-hero-card {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          border-radius: 16px; padding: 24px; color: #fff; position: relative; overflow: hidden;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.2);
        }
        .hero-icon-bg { position: absolute; right: -20px; bottom: -20px; opacity: 0.1; color: #fff; transform: rotate(-15deg); }
        .hero-label { font-size: 0.75rem; font-weight: 800; color: #bfdbfe; text-transform: uppercase; letter-spacing: 0.05em; }
        .hero-main-value { display: flex; align-items: baseline; gap: 8px; margin: 12px 0 24px; }
        .hero-main-value .value { font-size: 3.5rem; font-weight: 900; line-height: 1; }
        .hero-main-value .unit { font-size: 1.25rem; font-weight: 700; color: #bfdbfe; }
        .hero-sub-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.2); }
        .metric { display: flex; flex-direction: column; }
        .m-label { font-size: 0.65rem; color: #bfdbfe; font-weight: 600; margin-bottom: 4px; }
        .m-value { font-size: 1rem; font-weight: 800; }
        .m-sub { font-size: 0.7rem; color: #bfdbfe; }

        .fluid-items-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .f-item { background: #f8fafc; padding: 12px 8px; border-radius: 10px; text-align: center; border: 1px solid #f1f5f9; }
        .f-label { font-size: 0.65rem; color: #94a3b8; font-weight: 700; display: block; margin-bottom: 4px; }
        .f-value { font-size: 1rem; font-weight: 800; color: #1e293b; }
        .f-value small { font-size: 0.65rem; color: #94a3b8; font-weight: 400; }

        .k-report-card { border-top: 4px solid #f59e0b; background: #fffbeb; }
        .k-report-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 16px; }
        .k-report-header h3 { font-size: 0.95rem; font-weight: 800; color: #92400e; margin: 0; }
        .k-report-header p { font-size: 0.75rem; color: #b45309; opacity: 0.8; }
        .k-status-tag { font-size: 0.7rem; font-weight: 800; padding: 4px 10px; border-radius: 6px; border: 1px solid transparent; white-space: nowrap; }
        .status-normal { background: #dcfce7; color: #166534; border-color: #bbf7d0; }
        .status-warning { background: #fef3c7; color: #92400e; border-color: #fde68a; }
        .status-danger-soft { background: #ffedd5; color: #9a3412; border-color: #fed7aa; }
        .status-danger { background: #fee2e2; color: #991b1b; border-color: #fecaca; }
        .status-critical { background: #be123c; color: #fff; border-color: #9f1239; animation: pulse 2s infinite; }

        .k-guideline-box { background: #fff; padding: 12px; border-radius: 10px; border: 1px solid #fde68a; margin-bottom: 16px; }
        .g-line { display: flex; flex-wrap: wrap; gap: 6px; font-size: 0.75rem; margin-bottom: 4px; }
        .g-label { font-weight: 700; color: #475569; }
        .g-val { font-weight: 800; color: #92400e; }

        .k-data-table { width: 100%; border-collapse: collapse; font-size: 0.75rem; }
        .k-data-table th { background: #fef3c7; padding: 10px; text-align: left; color: #92400e; }
        .k-data-table td { padding: 12px 10px; border-bottom: 1px solid #fde68a; color: #78350f; font-weight: 600; }
        .k-data-table .highlight { color: #c2410c; }
        .lrs-row { background: rgba(16, 185, 129, 0.05); }

        .k-row-mini-card { background: #fff; border: 1px solid #fde68a; border-radius: 10px; padding: 12px; }
        .k-row-mini-card.lrs { border-color: #6ee7b7; background: #f0fdf4; }
        .mini-card-title { font-size: 0.75rem; font-weight: 800; color: #475569; margin-bottom: 8px; }
        .mini-card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .cell { display: flex; flex-direction: column; align-items: center; }
        .c-label { font-size: 0.6rem; color: #94a3b8; font-weight: 600; }
        .c-val { font-size: 0.85rem; font-weight: 800; color: #475569; }
        .c-val.highlight { color: #c2410c; }

        .k-safety-alert { display: flex; gap: 12px; background: #fff1f2; border: 1px solid #fecaca; border-radius: 10px; padding: 14px; margin-top: 16px; }
        .alert-icon { color: #e11d48; flex-shrink: 0; }
        .alert-text { font-size: 0.75rem; color: #9f1239; line-height: 1.5; }
        .alert-text strong { display: block; margin-bottom: 4px; }

        @media (max-width: 1024px) {
          .layout-grid-fluid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .patient-grid { grid-template-columns: 1fr; }
          .hero-main-value .value { font-size: 2.75rem; }
          .hero-sub-metrics { grid-template-columns: 1fr; }
          .k-table-container { display: none; }
        }

        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.7; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default FluidTherapy;
