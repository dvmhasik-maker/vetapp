import React from 'react';
import { ChevronLeft } from 'lucide-react';
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
    resultRef
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
          <h1>반려동물 정밀 수액 요법 계산기</h1>
          <p>임상 가이드라인 기반 유지/탈수/손실 수액량 및 전해질 교정 연산</p>
        </div>
      </div>

      <div className="layout-grid-fluid">
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

      <style>{`
        .layout-grid-fluid { 
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 1.5rem; 
          margin-top: 1rem; 
          align-items: start;
        }

        .input-group-fluid { margin-bottom: 1.25rem; }
        .input-group-fluid.no-margin { margin-bottom: 0; }
        .input-label-fluid { display: block; font-size: 0.8rem; font-weight: 700; color: #475569; margin-bottom: 6px; }

        .patient-grid-fluid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .input-field-fluid, .select-field-fluid {
          width: 100%; padding: 11px 12px; border-radius: 10px; border: 1.5px solid #e2e8f0;
          background: #fff; font-size: 0.95rem; color: #1e293b; outline: none; transition: all 0.2s;
        }
        .input-field-fluid:focus, .select-field-fluid:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }

        .species-toggle-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .species-btn-small {
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 10px; border-radius: 10px; border: 2px solid #e2e8f0;
          background: #fff; font-size: 0.85rem; font-weight: 700; cursor: pointer; color: #64748b; transition: all 0.2s;
        }
        .species-btn-small.active { border-color: #3498db; background: #f0f7ff; color: #1d4ed8; }

        .dehydration-badge { font-size: 0.75rem; font-weight: 800; color: #1d4ed8; background: #eff6ff; padding: 2px 10px; border-radius: 100px; border: 1px solid #dbeafe; }
        .fluid-range-slider { width: 100%; height: 6px; background: #e2e8f0; border-radius: 999px; outline: none; cursor: pointer; -webkit-appearance: none; }
        .fluid-range-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; background: #3498db; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.15); }
        .dehydration-ticks { display: flex; justify-content: space-between; margin-top: 8px; }
        .dehydration-ticks span { font-size: 0.65rem; color: #94a3b8; font-weight: 600; }

        .k-settings-card { border-left: 4px solid #f59e0b; }
        .k-title-text { color: #b45309; }
        .k-input-field { border-color: #fde68a !important; color: #92400e; font-weight: 800; }
        .k-help-text { font-size: 0.7rem; color: #94a3b8; margin-top: 6px; font-style: italic; }

        .fluid-hero-card {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          border-radius: 16px; padding: 24px; color: #fff; position: relative; overflow: hidden;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.15);
        }
        .hero-icon-bg { position: absolute; right: -20px; bottom: -20px; opacity: 0.1; color: #fff; transform: rotate(-15deg); }
        .hero-label { font-size: 0.7rem; font-weight: 800; color: #bfdbfe; text-transform: uppercase; letter-spacing: 0.05em; }
        .hero-main-value { display: flex; align-items: baseline; gap: 8px; margin: 10px 0 20px; }
        .hero-main-value .value { font-size: 3rem; font-weight: 900; line-height: 1; }
        .hero-main-value .unit { font-size: 1.1rem; font-weight: 700; color: #bfdbfe; }
        .hero-sub-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.15); }
        .metric { display: flex; flex-direction: column; }
        .m-label { font-size: 0.6rem; color: #bfdbfe; font-weight: 600; margin-bottom: 4px; }
        .m-value { font-size: 1rem; font-weight: 800; }
        .m-sub { font-size: 0.7rem; color: #bfdbfe; opacity: 0.8; }

        .fluid-items-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .f-item { background: #f8fafc; padding: 14px 8px; border-radius: 12px; text-align: center; border: 1px solid #f1f5f9; }
        .f-label { font-size: 0.6rem; color: #94a3b8; font-weight: 700; display: block; margin-bottom: 6px; }
        .f-value { font-size: 1.1rem; font-weight: 800; color: #1e293b; }
        .f-value small { font-size: 0.7rem; color: #94a3b8; font-weight: 400; }

        .k-report-card { border-top: 6px solid #f59e0b; background: #fff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .k-report-header-refined { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 18px; flex-wrap: nowrap; }
        .k-report-header-refined h3 { font-size: 0.9rem; font-weight: 800; color: #92400e; margin: 0; white-space: nowrap; flex-shrink: 0; }
        .k-status-tag { font-size: 0.6rem; font-weight: 800; padding: 4px 8px; border-radius: 6px; border: 1px solid transparent; white-space: nowrap; flex-shrink: 1; overflow: hidden; text-overflow: ellipsis; }
        
        .status-normal { background: #f0fdf4; color: #166534; border-color: #dcfce7; }
        .status-warning { background: #fffbeb; color: #92400e; border-color: #fef3c7; }
        .status-danger-soft { background: #fff7ed; color: #9a3412; border-color: #ffedd5; }
        .status-danger { background: #fef2f2; color: #991b1b; border-color: #fee2e2; }
        .status-critical { background: #be123c; color: #fff; border-color: #9f1239; animation: pulse 2s infinite; }

        .k-guideline-box { background: #fffbeb; padding: 12px; border-radius: 10px; border: 1px solid #fef3c7; margin-bottom: 16px; }
        .g-line { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; margin-bottom: 4px; }
        .g-label { font-weight: 700; color: #92400e; opacity: 0.8; }
        .g-val { font-weight: 800; color: #92400e; }

        .k-data-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
        .k-data-table th { background: #f8fafc; padding: 12px 10px; text-align: left; color: #64748b; font-weight: 700; border-bottom: 2px solid #e2e8f0; }
        .k-data-table td { padding: 14px 10px; border-bottom: 1px solid #f1f5f9; color: #334155; font-weight: 600; }
        .k-data-table .highlight { color: #1d4ed8; }
        .lrs-row { background: #f0fdf4; }

        .k-desktop-only { display: block; }
        .k-mobile-only { display: none; }

        .k-row-mini-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; }
        .k-row-mini-card.lrs { border-color: #86efac; background: #f0fdf4; }
        .mini-card-title { font-size: 0.8rem; font-weight: 800; color: #1e293b; margin-bottom: 10px; }
        .mini-card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .cell { display: flex; flex-direction: column; align-items: center; }
        .c-label { font-size: 0.6rem; color: #94a3b8; font-weight: 600; margin-bottom: 2px; }
        .c-val { font-size: 0.9rem; font-weight: 800; color: #334155; }
        .c-val.highlight { color: #1d4ed8; }

        .k-safety-alert { display: flex; gap: 12px; background: #fef2f2; border: 1px solid #fee2e2; border-radius: 12px; padding: 16px; margin-top: 16px; }
        .alert-icon { color: #ef4444; flex-shrink: 0; }
        .alert-text { font-size: 0.75rem; color: #991b1b; line-height: 1.5; }
        .alert-text strong { display: block; margin-bottom: 4px; font-weight: 800; }

        .save-action-area { margin-top: 2rem; display: flex; justify-content: center; }
        .btn-save-refined-fluid {
          width: 100%; padding: 16px; background: #10b981; color: white; border: none; border-radius: 12px;
          font-weight: 700; font-size: 1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: all 0.2s; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
        }
        .btn-save-refined-fluid:hover { background: #059669; transform: translateY(-2px); }

        @media (max-width: 1024px) {
          .layout-grid-fluid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .patient-grid-fluid { grid-template-columns: 1fr; gap: 0; }
          .hero-main-value .value { font-size: 2.5rem; }
          .hero-sub-metrics { grid-template-columns: 1fr; gap: 10px; }
          .fluid-items-grid { grid-template-columns: 1fr; }
          
          .k-desktop-only { display: none; }
          .k-mobile-only { display: block; }
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
