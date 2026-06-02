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

        <div className="fluid-grid-layout-refined">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* 1. Patient Info */}
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

            {/* 2. Fluid Req Settings */}
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

            {/* 3. K+ Settings & Report */}
            <div className="space-y-4">
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
              {result && (
                <div className="tool-card-container k-report-card">
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

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-6">
            {/* 1. Total Fluid Rate Result */}
            {result && (
              <div className="fluid-hero-card hero-card-matched-height flex flex-col justify-center">
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

            {/* 2. TLK Settings & Results */}
            <div className="space-y-4">
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
                            <span className="text-sm font-bold text-slate-600">{drug.name} 원액</span>
                          </div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-xl font-black text-slate-800 font-mono tracking-tighter">{drug.volumeMl.toFixed(3)}</span>
                            <span className="text-xs font-bold text-slate-400">mL</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="tlk-meta-info-refined mt-3 pt-3 border-t border-slate-100 flex justify-between text-[10px] font-bold text-slate-400">
                      <span>속도: {result.tlk.fluidRateAbs.toFixed(1)}mL/h</span>
                      <span>지속: {result.tlk.duration.toFixed(1)}h</span>
                    </div>
                  </div>

                  <div className="tool-card-container">
                    <div className="tool-card-title flex items-center gap-2 text-slate-500">
                      <Syringe size={16} /> 로딩 용량 (Loading Dose)
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                      {result.tlk.loadingDoses.map((ld, idx) => (
                        <div key={idx} className="ld-card-simple">
                          <div className="ld-label-group">
                            <span className="ld-title-simple">{ld.name}</span>
                            <span className="ld-desc-simple">{ld.description}</span>
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
        </div>

        <AdSlot className="mt-8" />
      </div>

      <style>{`
        .tool-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem 0;
        }
        .fluid-grid-layout-refined {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          align-items: start;
        }

        .input-group-fluid { margin-bottom: 1.25rem; }
        .input-group-fluid.no-margin { margin-bottom: 0; }
        .input-label-fluid { display: block; font-size: 0.8rem; font-weight: 700; color: #475569; margin-bottom: 6px; }

        .patient-grid-fluid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
...
        .hero-card-matched-height { min-height: 240px; }
...
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
        .ld-desc-simple { display: block; font-size: 8px; color: #94a3b8; font-weight: 600; line-height: 1.1; }
        .ld-value-simple { font-size: 13px; font-weight: 900; color: #2563eb; font-family: monospace; white-space: nowrap; }

        @media (max-width: 1024px) {
          .fluid-grid-layout-refined { grid-template-columns: 1fr; gap: 1rem; }
          .hero-card-matched-height { min-height: auto; }
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
