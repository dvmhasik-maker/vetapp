import React from 'react';
import { Calculator, Info, Syringe, AlertTriangle } from 'lucide-react';
import { FluidResult } from './types';

interface FluidResultViewProps {
  result: FluidResult;
  resultRef: React.RefObject<HTMLDivElement>;
}

const FluidResultView: React.FC<FluidResultViewProps> = ({
  result,
  resultRef
}) => {
  return (
    <div className="result-col" id="result-view">
      <div className="space-y-4" ref={resultRef}>
        {/* Hero Result Card */}
        <div className="fluid-hero-card">
          <div className="hero-icon-bg"><Calculator size={120} /></div>
          <div className="hero-content">
            <p className="hero-label">Total Fluid Rate</p>
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

        {/* Breakdown Card */}
        <div className="tool-card-container">
          <div className="tool-card-title flex items-center gap-2">
            <Info size={16} className="text-slate-400" /> 24시간 수액 요구량 세부 항목
          </div>
          <div className="fluid-items-grid">
            <div className="f-item">
              <span className="f-label">① 유지 수액량</span>
              <span className="f-value">{result.maintenance} <small>mL</small></span>
            </div>
            <div className="f-item">
              <span className="f-label">② 탈수 교정량</span>
              <span className="f-value">{result.deficit} <small>mL</small></span>
            </div>
            <div className="f-item">
              <span className="f-label">③ 지속 손실량</span>
              <span className="f-value">{result.ongoing} <small>mL</small></span>
            </div>
          </div>
        </div>

        {/* K+ Prescription Card */}
        <div className="tool-card-container k-report-card">
          <div className="k-report-header">
            <div className="header-text">
              <h3 className="flex items-center gap-2"><Syringe size={18} /> 염화칼륨-40 첨가 처방 리포트</h3>
              <p>수액 백(Bag) 용량별 실제 주사제 투여량</p>
            </div>
            <span className={`k-status-tag ${result.kStatusClass}`}>
              {result.kStatusText}
            </span>
          </div>

          <div className="k-guideline-box">
            <div className="g-line">
              <span className="g-label">가이드라인 권장 K⁺ 농도:</span>
              <span className="g-val">{result.kTarget > 0 ? `수액 1L당 총 ${result.kTarget} mEq 필요` : '보충 권장사항 없음'}</span>
            </div>
            <div className="g-line">
              <span className="g-label">최대 안전 K⁺ 투여 속도 상한:</span>
              <span className="g-val">{result.maxSafeK.toFixed(2)} mEq/h</span>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="k-table-container hidden sm:block">
            <table className="k-data-table">
              <thead>
                <tr>
                  <th>수액 백 종류</th>
                  <th className="text-right">용량</th>
                  <th className="text-right highlight">첨가량(mL)</th>
                  <th className="text-right">최종 K⁺ 총량</th>
                </tr>
              </thead>
              <tbody>
                {result.kSupplements.map((sup, idx) => (
                  <tr key={idx} className={sup.isLRS ? 'lrs-row' : ''}>
                    <td>{sup.bagName}</td>
                    <td className="text-right">{sup.volume} mL</td>
                    <td className="text-right highlight font-bold">{sup.addAmount} mL</td>
                    <td className="text-right">{sup.totalK} mEq</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Stack */}
          <div className="k-card-stack sm:hidden space-y-2">
            {result.kSupplements.map((sup, idx) => (
              <div key={idx} className={`k-row-mini-card ${sup.isLRS ? 'lrs' : ''}`}>
                <div className="mini-card-title">{sup.bagName}</div>
                <div className="mini-card-grid">
                  <div className="cell"><span className="c-label">용량</span><span className="c-val">{sup.volume}ml</span></div>
                  <div className="cell"><span className="c-label">첨가량</span><span className="c-val highlight">{sup.addAmount}ml</span></div>
                  <div className="cell"><span className="c-label">K⁺총량</span><span className="c-val">{sup.totalK}mEq</span></div>
                </div>
              </div>
            ))}
          </div>

          {/* Safety Warning */}
          {result.showSafetyWarning && (
            <div className="k-safety-alert">
              <AlertTriangle size={24} className="alert-icon" />
              <div className="alert-text">
                <strong>⚠️ 과도한 K⁺ 투여 속도 경고</strong>
                현재 속도 시 칼륨 주입량이 안전 한계선(0.5 mEq/kg/h)에 근접하거나 초과합니다. 펌프 속도를 낮추거나 첨가 농도를 재조정하십시오.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FluidResultView;
