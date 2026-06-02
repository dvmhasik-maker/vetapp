import React from 'react';
import { ChevronLeft, Calculator, Syringe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFluidLogic } from './useFluidLogic';
import FluidForm from './FluidForm';
import AdSlot from '../../common/AdSlot';

const FluidTherapy: React.FC = () => {
  const {
    patient,
    setPatient,
    input,
    setInput,
    tlkInput,
    setTlkInput,
    tlkRanges,
    result
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
          <h1>수액 요구량 및 K⁺ 보충 계산기</h1>
          <p>Fluid Requirement & Potassium Supplementation</p>
        </div>
      </div>

      <div className="tool-content">
        <AdSlot className="mb-6" />

        <div className="fluid-dashboard-grid">
          {/* ROW 1: [Patient Info] [Total Fluid Rate] */}
          <div className="dashboard-cell">
            <FluidForm 
              patient={patient}
              setPatient={setPatient}
              input={input}
              setInput={setInput}
              tlkInput={tlkInput}
              setTlkInput={setTlkInput}
              tlkRanges={tlkRanges}
              mode="patient-info"
            />
          </div>
          <div className="dashboard-cell">
            {result && (
              <div className="fluid-hero-card h-full flex flex-col justify-center">
                <div className="hero-icon-bg"><Calculator size={100} /></div>
                <div className="hero-content">
                  <p className="hero-label text-blue-200">Total Fluid Rate</p>
                  <div className="hero-main-value">
                    <span className="value">{result.hourlyRate}</span>
                    <span className="unit">mL/h</span>
                  </div>
                  <div className="hero-sub-metrics">
                    <div className="metric">
                      <span className="m-label">수액 점적 속도</span>
                      <span className="m-value">{result.gttPerMin} gtt/min</span>
                      <span className="m-sub">({result.secondsPerDrop}초/방울)</span>
                    </div>
                    <div className="metric">
                      <span className="m-label">24시간 총 수액량</span>
                      <span className="m-value">{result.total24h} mL/day</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ROW 2: [Fluid Req Settings] [TLK Settings & Results] */}
          <div className="dashboard-cell">
            <FluidForm 
              patient={patient}
              setPatient={setPatient}
              input={input}
              setInput={setInput}
              tlkInput={tlkInput}
              setTlkInput={setTlkInput}
              tlkRanges={tlkRanges}
              mode="fluid-req"
            />
          </div>
          <div className="dashboard-cell">
            <div className="flex flex-col gap-4">
              <FluidForm 
                patient={patient}
                setPatient={setPatient}
                input={input}
                setInput={setInput}
                tlkInput={tlkInput}
                setTlkInput={setTlkInput}
                tlkRanges={tlkRanges}
                mode="tlk"
              />
              {result && result.tlk && (
                <div className="space-y-4">
                  <div className="tool-card-container tlk-guide-card-refined">
                    <div className="tool-card-title flex items-center gap-2">
                      <Zap size={18} className="text-blue-500" /> TLK 조제 가이드 ({result.tlk.bagSize}mL)
                    </div>
                    <div className="tlk-simplified-list mt-3">
                      {result.tlk.drugs.map((drug, idx) => (
                        <div key={idx} className="tlk-simplified-item">
                          <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: drug.color }}></div>
                            <span className="text-sm font-bold text-slate-600">{drug.name}</span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black text-slate-800 font-mono tracking-tighter">{drug.volumeMl.toFixed(3)}</span>
                            <span className="text-xs font-bold text-slate-400">mL</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="tlk-meta-info-refined mt-3 pt-3 border-t border-slate-100 flex justify-between text-[10px] font-bold text-slate-400">
                      <span>속도: {result.tlk.fluidRateAbs.toFixed(1)}mL/h ({tlkInput.fluidRate}x)</span>
                      <span>지속: {result.tlk.duration.toFixed(1)}h</span>
                    </div>
                  </div>

                  <div className="tool-card-container">
                    <div className="tool-card-title flex items-center gap-2 text-slate-500">
                      <Syringe size={16} /> 로딩 용량 (Loading Dose)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                      {result.tlk.loadingDoses.map((ld, idx) => (
                        <div key={idx} className="ld-card-simple">
                          <div className="ld-label-group">
                            <span className="ld-title-simple">{ld.name}</span>
                          </div>
                          <span className="ld-value-simple">{ld.volume.toFixed(3)}<small className="ml-0.5 opacity-60">mL</small></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ROW 3: [K+ Settings] [KCl Report] */}
          <div className="dashboard-cell">
            <FluidForm 
              patient={patient}
              setPatient={setPatient}
              input={input}
              setInput={setInput}
              tlkInput={tlkInput}
              setTlkInput={setTlkInput}
              tlkRanges={tlkRanges}
              mode="potassium"
            />
          </div>
          <div className="dashboard-cell">
            {result && (
              <div className="tool-card-container k-report-card h-full">
                <div className="k-report-header-refined">
                  <h3 className="flex items-center gap-2 font-bold text-slate-700">KCl-40 첨가 리포트</h3>
                  <span className={`k-status-tag ${result.kStatusClass}`}>
                    {result.kStatusText}
                  </span>
                </div>

                <div className="k-guideline-box">
                  <div className="g-line">
                    <span className="g-label">권장 농도:</span>
                    <span className="g-val">{result.kTarget > 0 ? `수액 1L당 ${result.kTarget}mEq` : '보충 권장사항 없음'}</span>
                  </div>
                  <div className="g-line">
                    <span className="g-label">안전 상한:</span>
                    <span className="g-val">{result.maxSafeK.toFixed(2)}mEq/h</span>
                  </div>
                </div>

                <div className="k-desktop-only">
                  <table className="k-data-table">
                    <thead>
                      <tr>
                        <th>수액 백</th>
                        <th className="text-right highlight">첨가량</th>
                        <th className="text-right">최종 K⁺</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.kSupplements.map((sup, idx) => (
                        <tr key={idx} className={sup.isLRS ? 'lrs-row' : ''}>
                          <td className="text-xs">{sup.bagName.split(' ')[0]}</td>
                          <td className="text-right highlight font-bold">{sup.addAmount}ml</td>
                          <td className="text-right">{sup.totalK}mEq</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="k-mobile-only space-y-2">
                  {result.kSupplements.map((sup, idx) => (
                    <div key={idx} className={`k-row-mini-card ${sup.isLRS ? 'lrs' : ''}`}>
                      <div className="mini-card-title text-xs">{sup.bagName}</div>
                      <div className="mini-card-grid-refined">
                        <div className="cell"><span className="c-label">첨가량</span><span className="c-val highlight">{sup.addAmount}ml</span></div>
                        <div className="cell"><span className="c-label">K⁺총량</span><span className="c-val">{sup.totalK}mEq</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <AdSlot className="mt-8" />
      </div>

      <style>{`
        .tool-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 0;
        }
        .fluid-dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          align-items: stretch;
        }
        .dashboard-cell { display: flex; flex-direction: column; }

        .input-group-fluid { margin-bottom: 1.25rem; }
        .input-group-fluid.no-margin { margin-bottom: 0; }
        .input-label-fluid { display: block; font-size: 0.8rem; font-weight: 700; color: #475569; margin-bottom: 6px; }

        .patient-grid-fluid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .input-field-fluid, .select-field-fluid, .input-field-fluid-large {
          width: 100%; padding: 11px 12px; border-radius: 10px; border: 1.5px solid #e2e8f0;
          background: #fff; font-size: 0.95rem; color: #1e293b; outline: none; transition: all 0.2s;
        }
        .input-field-fluid-large {
          padding: 18px 16px; font-size: 1.5rem; font-weight: 800; text-align: center; color: #2563eb; border-color: #3b82f6;
        }
        .input-field-fluid:focus, .select-field-fluid:focus, .input-field-fluid-large:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }

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
        .k-report-card { border-top: 6px solid #f59e0b; background: #fff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
        .k-report-header-refined { display: flex; justify-content: space-between; align-items: center; gap: 8px; margin-bottom: 18px; flex-wrap: nowrap; }
        .k-report-header-refined h3 { font-size: 0.9rem; font-weight: 800; color: #92400e; margin: 0; white-space: nowrap; flex-shrink: 0; }
        .k-status-tag { font-size: 0.6rem; font-weight: 800; padding: 4px 8px; border-radius: 6px; border: 1px solid transparent; white-space: nowrap; flex-shrink: 1; overflow: hidden; text-overflow: ellipsis; }
        
        .status-normal { background: #f0fdf4; color: #166534; border-color: #dcfce7; }
        .status-warning { background: #fffbeb; color: #92400e; border-color: #fef3c7; }
        .status-danger-soft { background: #fff7ed; color: #9a3412; border-color: #ffedd5; }
        .status-danger { background: #fef2f2; color: #991b1b; border-color: #fee2e2; }
        .status-critical { background: #be123c; color: #fff; border-color: #9f1239; animation: pulse 2s infinite; }

        .k-guideline-box { background: #fffbeb; padding: 12px; border-radius: 10px; border: 1px solid #fef3c7; margin-bottom: 12px; }
        .g-line { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; margin-bottom: 4px; }
        .g-label { font-weight: 700; color: #92400e; opacity: 0.8; }
        .g-val { font-weight: 800; color: #92400e; }

        .k-data-table { width: 100%; border-collapse: collapse; font-size: 0.8rem; }
        .k-data-table th { background: #f8fafc; padding: 12px 10px; text-align: left; color: #64748b; font-weight: 700; border-bottom: 2px solid #e2e8f0; }
        .k-data-table td { padding: 10px 8px; border-bottom: 1px solid #f1f5f9; color: #334155; font-weight: 600; }
        .k-data-table .highlight { color: #1d4ed8; }
        .lrs-row { background: #f0fdf4; }

        .k-desktop-only { display: block; }
        .k-mobile-only { display: none; }

        .k-row-mini-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; }
        .k-row-mini-card.lrs { border-color: #86efac; background: #f0fdf4; }
        .mini-card-title { font-size: 0.8rem; font-weight: 800; color: #1e293b; margin-bottom: 10px; }
        .mini-card-grid-refined { display: grid; gap: 10px; grid-template-columns: 1fr 1fr; }
        .cell { display: flex; flex-direction: column; align-items: center; }
        .c-label { font-size: 0.6rem; color: #94a3b8; font-weight: 600; margin-bottom: 2px; }
        .c-val { font-size: 0.9rem; font-weight: 800; color: #334155; }
        .c-val.highlight { color: #1d4ed8; }

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

        /* TLK Refined Styles */
        .tlk-simplified-list { display: flex; flex-direction: column; gap: 6px; }
        .tlk-simplified-item { 
          display: flex; justify-content: space-between; align-items: center; 
          padding: 12px 16px; background: #f8fafc; border-radius: 10px; border: 1.5px solid #f1f5f9;
        }
        .ld-card-simple {
          display: flex; justify-content: space-between; align-items: center;
          padding: 10px 12px; background: #f8fafc; border-radius: 10px; border: 1.5px solid #f1f5f9;
        }
        .ld-title-simple { display: block; font-size: 10px; font-weight: 800; color: #334155; }
        .ld-value-simple { font-size: 13px; font-weight: 900; color: #2563eb; font-family: monospace; white-space: nowrap; }

        @media (max-width: 1024px) {
          .fluid-dashboard-grid { grid-template-columns: 1fr; gap: 1.5rem; }
        }

        @media (max-width: 640px) {
          .patient-grid-fluid { grid-template-columns: 1fr; gap: 0; }
          .hero-main-value .value { font-size: 2.5rem; }
          .hero-sub-metrics { grid-template-columns: 1fr; gap: 10px; }
          
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
