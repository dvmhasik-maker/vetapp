import React from 'react';
import { ChevronLeft, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFluidLogic } from './useFluidLogic';
import FluidForm from './FluidForm';
import FluidResultView from './FluidResultView';
import AdSlot from '../../common/AdSlot';

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
    <div className="tool-page fluid-tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <div className="page-header-tool-white">
        <div className="icon">💧</div>
        <div>
          <h1>반려동물 정밀 수액 요법 계산기</h1>
          <p>임상 가이드라인 기반 수액량 연산</p>
        </div>
      </div>

      <div className="tool-content-standard">
        <AdSlot className="mb-6" />

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

        {result && (
          <AdSlot className="mt-8" />
        )}
      </div>

      <style>{`
        .tool-content-standard {
          width: 100%;
        }

        .layout-grid-fluid { 
          display: grid; 
          grid-template-columns: 1fr 1fr; /* 좌우 너비 동일하게 설정 */
          gap: 1.5rem; 
          margin-top: 1rem; 
          align-items: start;
        }

        /* TLK 추가 스타일 */
        .field-label-tlk { display: block; font-size: 11px; font-weight: 600; color: #8a96ab; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 8px; }
        
        .drug-block-tlk { display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px; }
        .drug-block-tlk:last-child { margin-bottom: 0; }
        .drug-header-tlk { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
        .drug-name-group-tlk { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .drug-dot-tlk { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .drug-name-tlk { font-size: 13px; font-weight: 700; color: #1a2236; }
        .drug-badge-tlk { font-size: 10px; font-weight: 500; color: #8a96ab; background: #f0f3f8; border: 1px solid #e4e8ef; border-radius: 5px; padding: 1px 6px; }
        .drug-val-badge-tlk { font-size: 12px; font-weight: 700; border-radius: 20px; padding: 3px 10px; white-space: nowrap; transition: all 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        
        .slider-wrap-tlk { position: relative; padding: 8px 0; }
        .range-tlk { 
          -webkit-appearance: none; appearance: none; height: 4px; border-radius: 9999px; outline: none; cursor: pointer; width: 100%;
          background: #e2e8f0;
        }
        .range-tlk::-webkit-slider-thumb { 
          -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%; border: 2.5px solid #fff; box-shadow: 0 1px 6px rgba(0,0,0,0.18); cursor: pointer; transition: transform 0.1s;
        }
        .range-tlk:active::-webkit-slider-thumb { transform: scale(1.15); }

        .def-marker-tlk {
          position: absolute; top: 11px; width: 2px; height: 10px; border-radius: 1px; background: rgba(0,0,0,0.2); z-index: 2; pointer-events: none;
        }

        .range-tlk.tram-track::-webkit-slider-thumb { background: #1a6cf5; }
        .range-tlk.lido-track::-webkit-slider-thumb { background: #0ea370; }
        .range-tlk.keta-track::-webkit-slider-thumb { background: #e8620a; }

        .slider-labels-tlk { display: flex; justify-content: space-between; margin-top: 4px; }
        .slider-labels-tlk span { font-size: 10px; color: #8a96ab; font-weight: 600; font-variant-numeric: tabular-nums; }
        .slider-labels-tlk .mid { font-weight: 800; }

        .result-row-tlk { display: flex; align-items: center; justify-content: space-between; padding: 11px 13px; background: #fafbfd; border: 1px solid #f0f3f8; border-radius: 8px; }
        .tlk-name { font-size: 12px; font-weight: 700; color: #1a2236; }
        .tlk-sub { font-size: 10px; color: #8a96ab; margin-top: 1px; }
        .tlk-vol { font-size: 14px; font-weight: 800; }
        .tlk-conc { font-size: 10px; color: #8a96ab; margin-top: 1px; }

        .ld-row-tlk { display: flex; align-items: center; justify-content: space-between; padding: 10px 13px; background: #fffdf0; border: 1px solid #f5e6a0; border-radius: 8px; }
        .ld-name { font-size: 12px; font-weight: 700; color: #6b4c00; }
        .ld-sub { font-size: 10px; color: #a08040; margin-top: 1px; }
        .ld-val { font-size: 13px; font-weight: 800; color: #8a5f00; }

        .tlk-info-banner { display: flex; align-items: center; gap: 12px; padding: 16px; border-radius: 12px; margin-top: 1.5rem; width: 100%; box-sizing: border-box; }
        .tlk-info-banner.dog { background: #e8f3ff; border: 1px solid #bdd6f9; color: #1a4080; }
        .tlk-info-banner.cat { background: #fff0f0; border: 1px solid #f9c0c0; color: #8a1a1a; }
        .tlk-info-banner strong { display: block; font-size: 0.9rem; margin-bottom: 2px; }
        .tlk-info-banner p { font-size: 0.75rem; opacity: 0.8; }

        /* 이미지 기반 TLK 신규 스타일 */
        .hero-divider-tlk { height: 1px; background: rgba(255,255,255,0.15); margin: 14px 0; }
        .hero-meta-tlk { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .meta-item-tlk .meta-lbl-tlk { font-size: 10px; color: rgba(255,255,255,0.5); margin-bottom: 2px; font-weight: 700; }
        .meta-item-tlk .meta-val-tlk { font-size: 13px; font-weight: 700; color: #fff; line-height: 1.3; }

        .result-row-img {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 13px;
          background: #fafbfd;
          border: 1px solid #f0f3f8;
          border-radius: 8px;
          margin-bottom: 6px;
        }
        .r-drug-name { font-size: 12px; font-weight: 700; color: #1a2236; }
        .r-drug-sub  { font-size: 10px; color: #8a96ab; margin-top: 1px; }
        .r-vol       { font-size: 1.25rem; font-weight: 900; letter-spacing: -0.02em; }
        .r-conc      { font-size: 10px; color: #8a96ab; margin-top: 1px; }

        .ld-row-img {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 13px;
          background: #fffdf0;
          border: 1px solid #f5e6a0;
          border-radius: 8px;
          margin-bottom: 6px;
          gap: 12px;
        }
        .ld-flex-group { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }
        .ld-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; display: block; }
        .ld-unit-wrap { display: flex; flex-direction: column; align-items: flex-end; text-align: right; }
        .ld-unit-wrap-row { display: flex; align-items: center; gap: 10px; }
        .ld-name { font-size: 12px; font-weight: 700; color: #6b4c00; font-family: inherit; }
        .ld-sub  { font-size: 10px; color: #a08040; margin-top: 1px; font-family: inherit; }
        .ld-val  { font-size: 13px; font-weight: 800; color: #8a5f00; font-variant-numeric: tabular-nums; font-family: inherit; }
        .ld-label-small { font-size: 9px; color: #a08040; margin-bottom: 1px; font-weight: 700; font-family: inherit; }
        .ld-divider { width: 1px; height: 24px; background: #f0d98a; flex-shrink: 0; display: block; }
        .ld-help-text { font-size: 11px; color: #94a3b8; font-style: italic; text-align: center; margin-top: 12px; font-family: inherit; }

        /* 카드 강조색 (레드) */
        .tool-card-container.tlk-red-border {
          border-left: 4px solid #ef4444 !important;
          padding: 1.5rem !important;
        }
        .tool-card-container.tlk-red-border-top {
          border-top: 6px solid #ef4444 !important;
        }
        .tlk-red-text {
          color: #ef4444 !important;
        }
        .tool-card-container {
          margin-bottom: 1.25rem !important;
          padding: 1.25rem !important;
          overflow: hidden;
          width: 100%; /* 부모 너비에 맞춤 */
          box-sizing: border-box;
        }

        .tool-card-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
          line-height: 1.4;
        }

        .input-group-fluid { margin-bottom: 1rem; }
        .input-group-fluid.no-margin { margin-bottom: 0; }
        .input-label-fluid { display: block; font-size: 0.85rem; font-weight: 700; color: #475569; margin-bottom: 0.5rem; line-height: 1.4; }

        .input-field-fluid, .select-field-fluid, .input-field-fluid-large {
          width: 100%; padding: 0.75rem 0.875rem; border-radius: 10px; border: 1.5px solid #e2e8f0;
          background: #fff; font-size: 1rem; color: #1e293b; outline: none; transition: all 0.2s;
          line-height: 1.5;
          box-sizing: border-box;
          text-align: center;
        }
        .input-field-fluid-large {
          padding: 1rem; font-size: 1.5rem; font-weight: 800; text-align: center; color: #2563eb; border-color: #3b82f6;
        }
        .input-field-fluid:focus, .select-field-fluid:focus, .input-field-fluid-large:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }

        .species-toggle-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.625rem; margin-bottom: 1rem; }
        .species-btn-small {
          display: flex; align-items: center; justify-content: center; gap: 0.5rem;
          padding: 0.625rem; border-radius: 10px; border: 2px solid #e2e8f0;
          background: #fff; font-size: 0.9rem; font-weight: 700; cursor: pointer; color: #64748b; transition: all 0.2s;
        }
        .species-btn-small.active { border-color: #3498db; background: #f0f7ff; color: #1d4ed8; }

        .bag-btn-large {
          display: flex; align-items: center; justify-content: center; gap: 0.625rem;
          padding: 0.875rem; border-radius: 12px; border: 2px solid #e2e8f0;
          background: #fff; font-size: 1rem; font-weight: 700; cursor: pointer; color: #64748b; transition: all 0.2s;
          width: 100%;
        }
        .bag-btn-large.active { border-color: #ef4444; background: #fef2f2; color: #ef4444; }

        .dehydration-badge { font-size: 0.8rem; font-weight: 800; color: #1d4ed8; background: #eff6ff; padding: 0.25rem 0.75rem; border-radius: 100px; border: 1px solid #dbeafe; flex-shrink: 0; }
        .fluid-range-slider { width: 100%; height: 6px; background: #e2e8f0; border-radius: 999px; outline: none; cursor: pointer; -webkit-appearance: none; margin: 0.5rem 0; }
        .fluid-range-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 22px; height: 22px; background: #3498db; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.15); }
        .dehydration-ticks { display: flex; justify-content: space-between; margin-top: 0.5rem; gap: 4px; }
        .dehydration-ticks span { font-size: 0.55rem; color: #94a3b8; font-weight: 600; text-align: center; flex: 1; }

        .k-settings-card { 
          border-left: 4px solid #f59e0b; 
          padding: 1.5rem !important; 
          margin-bottom: 2rem !important;
        }
        .k-title-text { color: #b45309; margin-bottom: 1.25rem !important; }
        .k-input-field { border-color: #fde68a !important; color: #92400e; font-weight: 800; margin-bottom: 1rem; }
        .k-help-text { font-size: 0.8rem; color: #94a3b8; margin-top: 1rem; font-style: italic; line-height: 1.6; text-align: center; }

        .fluid-hero-card {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          border-radius: 16px; padding: 1.5rem; color: #fff; position: relative; overflow: hidden;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.15);
          margin-bottom: 1.25rem;
          width: 100%;
          box-sizing: border-box;
        }
        .hero-icon-bg { position: absolute; right: -20px; bottom: -20px; opacity: 0.1; color: #fff; transform: rotate(-15deg); }
        .hero-label { font-size: 0.75rem; font-weight: 800; color: #bfdbfe; text-transform: uppercase; letter-spacing: 0.05em; }
        .hero-main-value { display: flex; align-items: baseline; gap: 0.5rem; margin: 0.75rem 0 1.25rem; flex-wrap: wrap; }
        .hero-main-value .value { font-size: 3.5rem; font-weight: 900; line-height: 1; max-width: 100%; word-break: break-all; }
        .hero-main-value .unit { font-size: 1.25rem; font-weight: 700; color: #bfdbfe; }
        .hero-sub-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,0.15); }
        .metric { display: flex; flex-direction: column; min-width: 0; }
        .m-label { font-size: 0.7rem; color: #bfdbfe; font-weight: 600; margin-bottom: 0.25rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .m-value { font-size: 1.1rem; font-weight: 800; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; display: block; }
        .m-sub { font-size: 0.75rem; color: #bfdbfe; opacity: 0.8; }

        .fluid-items-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .f-item { background: #f8fafc; padding: 1rem 0.5rem; border-radius: 12px; text-align: center; border: 1px solid #f1f5f9; min-width: 0; }
        .f-label { font-size: 0.7rem; color: #94a3b8; font-weight: 700; display: block; margin-bottom: 0.5rem; line-height: 1.2; }
        .f-value { font-size: 1rem; font-weight: 800; color: #1e293b; line-height: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; }
        .f-value small { font-size: 0.75rem; color: #94a3b8; font-weight: 400; margin-left: 1px; }

        .k-report-card { 
          border-top: 6px solid #f59e0b; 
          background: #fff; 
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); 
          display: flex;
          flex-direction: column;
          width: 100%; /* 고정 너비 해제 및 부모 너비 추종 */
        }
        .k-report-header-refined { 
          display: flex; 
          justify-content: space-between; 
          align-items: center; 
          gap: 0.75rem; 
          margin-bottom: 1.25rem; 
          flex-wrap: wrap; 
          min-height: 2.5rem;
          padding-bottom: 10px;
          border-bottom: 2px solid #f0f7ff;
        }
        .k-report-header-refined h3 { 
          font-size: 1rem; 
          font-weight: 800; 
          color: #92400e; 
          margin: 0; 
          white-space: nowrap; 
          flex-shrink: 0; 
        }
        .k-status-tag { 
          font-size: 0.75rem; /* Restored to a readable size */
          font-weight: 800; 
          padding: 0.375rem 0.75rem; 
          border-radius: 6px; 
          border: 1px solid transparent; 
          white-space: nowrap; 
          width: auto; /* Changed to auto to fit text naturally */
          min-width: 140px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          flex-shrink: 0;
        }
        
        .status-normal { background: #f0fdf4; color: #166534; border-color: #dcfce7; }
        .status-warning { background: #fffbeb; color: #92400e; border-color: #fef3c7; }
        .status-danger-soft { background: #fff7ed; color: #9a3412; border-color: #ffedd5; }
        .status-danger { background: #fef2f2; color: #991b1b; border-color: #fee2e2; }
        .status-critical { background: #be123c; color: #fff; border-color: #9f1239; animation: pulse 2s infinite; }

        .k-guideline-box { background: #fffbeb; padding: 1rem; border-radius: 10px; border: 1px solid #fef3c7; margin-bottom: 1.25rem; }
        .g-line { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; margin-bottom: 0.375rem; flex-wrap: wrap; }
        .g-label { font-weight: 700; color: #92400e; opacity: 0.8; }
        .g-val { font-weight: 800; color: #92400e; }

        .k-data-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
        .k-data-table th { background: #f8fafc; padding: 0.75rem 0.5rem; text-align: left; color: #64748b; font-weight: 700; border-bottom: 2px solid #e2e8f0; white-space: nowrap; }
        .k-data-table td { padding: 0.875rem 0.5rem; border-bottom: 1px solid #f1f5f9; color: #334155; font-weight: 600; white-space: nowrap; }
        .k-data-table .highlight { color: #1d4ed8; }
        .lrs-row { background: #f0fdf4; }

        .k-desktop-only { display: block; overflow-x: auto; }
        .k-mobile-only { display: none; }

        .k-row-mini-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 0.875rem; }
        .k-row-mini-card.lrs { border-color: #86efac; background: #f0fdf4; }
        .mini-card-title { font-size: 0.75rem; font-weight: 800; color: #1e293b; margin-bottom: 0.625rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .mini-card-grid-refined { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
        .cell { display: flex; flex-direction: column; align-items: center; }
        .c-label { font-size: 0.6rem; color: #94a3b8; font-weight: 600; margin-bottom: 0.25rem; }
        .c-val { font-size: 0.9rem; font-weight: 800; color: #334155; }
        .c-val.highlight { color: #1d4ed8; }

        .k-safety-alert { display: flex; gap: 0.75rem; background: #fef2f2; border: 1px solid #fee2e2; border-radius: 12px; padding: 1.25rem; margin-top: 1.25rem; }
        .alert-icon { color: #ef4444; flex-shrink: 0; }
        .alert-text { font-size: 0.8rem; color: #991b1b; line-height: 1.6; }
        .alert-text strong { display: block; margin-bottom: 0.25rem; font-weight: 800; }

        @media (max-width: 1024px) {
          .layout-grid-fluid { grid-template-columns: 1fr; gap: 1rem; }
          .tool-content-standard { padding: 0 1rem; }
        }
        @media (max-width: 640px) {
          .fluid-tool-page { padding: 1rem 0.5rem; }
          .hero-main-value .value { font-size: 2.75rem; word-break: break-all; }
          .hero-sub-metrics { grid-template-columns: 1fr; gap: 0.75rem; }
          .fluid-items-grid { grid-template-columns: 1fr; }
          
          .k-desktop-only { display: none; }
          .k-mobile-only { display: block; }
          
          .k-report-header-refined { justify-content: space-between; text-align: left; }
          .k-status-tag { width: auto; min-width: 120px; font-size: 0.65rem; }
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