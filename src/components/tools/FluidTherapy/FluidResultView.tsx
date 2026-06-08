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
            <p className="hero-label">TLK CRI Result</p>
            <div className="hero-main-value">
              <span className="value">{result.hourlyRate}</span>
              <span className="unit">mL/h</span>
            </div>
            <div className="hero-divider-tlk"></div>
            <div className="hero-meta-tlk">
              <div className="meta-item-tlk">
                <div className="meta-lbl-tlk">24시간 총 수액량</div>
                <div className="meta-val-tlk">{result.total24h} mL/day</div>
              </div>
              <div className="meta-item-tlk">
                <div className="meta-lbl-tlk">수액 백</div>
                <div className="meta-val-tlk">{result.bagSize} mL</div>
              </div>
              <div className="meta-item-tlk">
                <div className="meta-lbl-tlk">mL/kg/hr</div>
                <div className="meta-val-tlk">{(result.hourlyRate / (result.total24h / result.hourlyRate / 24 || 1)).toFixed(2)} mL/kg/hr</div>
              </div>
              <div className="meta-item-tlk">
                <div className="meta-lbl-tlk">백 지속 시간</div>
                <div className="meta-val-tlk">{result.bagDuration} hr</div>
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
          <div className="k-report-header-refined">
            <h3 className="flex items-center gap-2">🧪 KCl-40 첨가 리포트</h3>
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

          {/* Desktop Table */}
          <div className="k-desktop-only">
            <table className="k-data-table">
              <thead>
                <tr>
                  <th>수액 백 종류</th>
                  <th className="text-right highlight">첨가량(mL)</th>
                  <th className="text-right">최종 K⁺</th>
                </tr>
              </thead>
              <tbody>
                {result.kSupplements.map((sup, idx) => (
                  <tr key={idx} className={sup.isLRS ? 'lrs-row' : ''}>
                    <td>{sup.bagName}</td>
                    <td className="text-right highlight font-bold">{sup.addAmount}ml</td>
                    <td className="text-right">{sup.totalK}mEq</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Stack */}
          <div className="k-mobile-only space-y-2">
            {result.kSupplements.map((sup, idx) => (
              <div key={idx} className={`k-row-mini-card ${sup.isLRS ? 'lrs' : ''}`}>
                <div className="mini-card-title">{sup.bagName}</div>
                <div className="mini-card-grid-refined">
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
                <strong>⚠️ K⁺ 투여 속도 경고</strong>
                안전 한계선(0.5mEq/kg/h) 초과 위험. 펌프 속도 감속 또는 농도 재조정 권장.
              </div>
            </div>
          )}
        </div>

        {/* TLK CRI Result Card */}
        <div className="tool-card-container tlk-red-border-top">
          <div className="tool-card-title flex items-center gap-2 tlk-red-text">
            <Syringe size={18} /> 수액 백 내 TLK 첨가약물량 ({result.bagSize}mL 기준)
          </div>
          
          <div className="space-y-2 mt-3">
            {/* Tramadol */}
            <div className="result-row-img" style={{ borderLeft: '3px solid #1a6cf5' }}>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#1a6cf5' }}></span>
                <div>
                  <div className="r-drug-name">Tramadol</div>
                  <div className="r-drug-sub">{result.tlk.tramadol.dose.toFixed(2)} mg/kg/hr → 총 {result.tlk.tramadol.totalMg} mg</div>
                </div>
              </div>
              <div className="text-right">
                <div className="r-vol" style={{ color: '#1a6cf5' }}>{result.tlk.tramadol.volumeMl} mL</div>
                <div className="r-conc">{result.tlk.tramadol.concInBag} mg/mL in bag</div>
              </div>
            </div>

            {/* Lidocaine */}
            <div className="result-row-img" style={{ borderLeft: '3px solid #0ea370' }}>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#0ea370' }}></span>
                <div>
                  <div className="r-drug-name">Lidocaine</div>
                  <div className="r-drug-sub">{result.tlk.lidocaine.dose.toFixed(2)} mg/kg/hr → 총 {result.tlk.lidocaine.totalMg} mg</div>
                </div>
              </div>
              <div className="text-right">
                <div className="r-vol" style={{ color: '#0ea370' }}>{result.tlk.lidocaine.volumeMl} mL</div>
                <div className="r-conc">{result.tlk.lidocaine.concInBag} mg/mL in bag</div>
              </div>
            </div>

            {/* Ketamine */}
            <div className="result-row-img" style={{ borderLeft: '3px solid #e8620a' }}>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#e8620a' }}></span>
                <div>
                  <div className="r-drug-name">Ketamine</div>
                  <div className="r-drug-sub">{result.tlk.ketamine.dose.toFixed(2)} mg/kg/hr → 총 {result.tlk.ketamine.totalMg} mg</div>
                </div>
              </div>
              <div className="text-right">
                <div className="r-vol" style={{ color: '#e8620a' }}>{result.tlk.ketamine.volumeMl} mL</div>
                <div className="r-conc">{result.tlk.ketamine.concInBag} mg/mL in bag</div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Dose Card */}
        <div className="tool-card-container tlk-red-border-top">
          <div className="tool-card-title flex items-center gap-2 tlk-red-text">
            <Syringe size={18} /> TLK 로딩 도즈 (Loading Dose)
          </div>
          
          <div className="space-y-3 mt-4">
            {/* Tramadol LD */}
            <div className="ld-row-img">
              <div className="ld-flex-group">
                <span className="ld-dot" style={{ background: '#1a6cf5' }}></span>
                <div className="ld-info">
                  <div className="ld-name">Tramadol LD</div>
                  <div className="ld-sub">원액 (50mg/mL)</div>
                </div>
              </div>
              <div className="ld-unit-wrap-row">
                <div className="ld-unit-wrap">
                  <span className="ld-label-small">LOW (2mg/kg)</span>
                  <span className="ld-val">{result.tlk.loadingDoses.tramadolLo} mL</span>
                </div>
                <div className="ld-divider"></div>
                <div className="ld-unit-wrap">
                  <span className="ld-label-small">HIGH (4mg/kg)</span>
                  <span className="ld-val">{result.tlk.loadingDoses.tramadolHi} mL</span>
                </div>
              </div>
            </div>

            {/* Lidocaine LD */}
            <div className="ld-row-img">
              <div className="ld-flex-group">
                <span className="ld-dot" style={{ background: '#0ea370' }}></span>
                <div className="ld-info">
                  <div className="ld-name">Lidocaine LD</div>
                  <div className="ld-sub">원액 (20mg/mL)</div>
                </div>
              </div>
              <div className="ld-unit-wrap-row">
                <div className="ld-unit-wrap">
                  <span className="ld-label-small">LOW ({result.species === 'dog' ? '1.0' : '0.25'}mg/kg)</span>
                  <span className="ld-val">{result.tlk.loadingDoses.lidocaineLo} mL</span>
                </div>
                <div className="ld-divider"></div>
                <div className="ld-unit-wrap">
                  <span className="ld-label-small">HIGH ({result.species === 'dog' ? '2.0' : '0.5'}mg/kg)</span>
                  <span className="ld-val">{result.tlk.loadingDoses.lidocaineHi} mL</span>
                </div>
              </div>
            </div>

            {/* Ketamine LD */}
            <div className="ld-row-img">
              <div className="ld-flex-group">
                <span className="ld-dot" style={{ background: '#e8620a' }}></span>
                <div className="ld-info">
                  <div className="ld-name">Ketamine LD</div>
                  <div className="ld-sub">원액 (50mg/mL)</div>
                </div>
              </div>
              <div className="ld-unit-wrap-row">
                <div className="ld-unit-wrap">
                  <span className="ld-label-small">LOW ({result.species === 'dog' ? '0.25' : '0.3'}mg/kg)</span>
                  <span className="ld-val">{result.tlk.loadingDoses.ketamineLo} mL</span>
                </div>
                <div className="ld-divider"></div>
                <div className="ld-unit-wrap">
                  <span className="ld-label-small">HIGH (0.5mg/kg)</span>
                  <span className="ld-val">{result.tlk.loadingDoses.ketamineHi} mL</span>
                </div>
              </div>
            </div>
          </div>
          <p className="ld-help-text">
            * TLK 로딩 도즈는 원액을 천천히 IV 투여하는 권장량입니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FluidResultView;