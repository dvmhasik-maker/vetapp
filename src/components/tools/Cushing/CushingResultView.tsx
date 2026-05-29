import React from 'react';
import { CushingResult } from './types';

interface CushingResultViewProps {
  result: CushingResult;
  resultRef: React.RefObject<HTMLDivElement>;
}

const CushingResultView: React.FC<CushingResultViewProps> = ({ result, resultRef }) => {
  const { banner } = result;

  return (
    <div className="result-container-cushing" ref={resultRef}>
      <div className="tool-card-container">
        <div className="tool-card-title">📊 분석 결과 리포트</div>

        {/* 환자 요약 */}
        <div className="patient-bar-cushing">
          <div className="pb-info">
            <span>이름: <strong>{result.patientInfo.name || '-'}</strong></span>
            <span>품종: {result.patientInfo.breed || '-'}</span>
            <span>성별: {result.patientInfo.sex || '-'}</span>
            <span>나이: {result.patientInfo.age || '-'}</span>
          </div>
          <span className="date-poison">{result.date}</span>
        </div>

        {/* 입력 정보 요약 */}
        <div className="input-summary-cushing">
          <div className="summary-row">
            <span className="label">검사 방법</span>
            <span className="value">{result.mode === 'acth' ? 'ACTH Stimulation Test' : 'Pre-Pill Cortisol'}</span>
          </div>
          <div className="summary-row">
            <span className="label">임상 증상</span>
            <span className="value">{result.clinLabel}</span>
          </div>
          <div className="summary-row">
            <span className="label">코르티솔 수치</span>
            <span className="value">
              <strong>{result.cortisol.toFixed(2)} ug/dL</strong> 
              <small>({(result.cortisol * 27.59).toFixed(0)} nmol/L)</small>
            </span>
          </div>
        </div>

        {/* 메인 결과 배너 */}
        <div className={`result-banner-cushing theme-${banner.theme}`}>
          <div className="rb-header">
            <span className="rb-icon">{banner.icon}</span>
            <span className="rb-label">{banner.label}</span>
          </div>
          <ul className="rb-actions">
            {banner.actions.map((action, idx) => (
              <li key={idx}>{action}</li>
            ))}
          </ul>
          {banner.note && <div className="rb-note">{banner.note}</div>}
        </div>

        <div className="ref-label-poison">
          ※ 본 분석은 Ettinger's Textbook of Veterinary Internal Medicine 9th ed. 가이드라인을 기반으로 하며, 최종 판단은 수의사의 임상적 판단에 따릅니다.
        </div>
      </div>

      <style>{`
        .patient-bar-cushing {
          background: #f0f7ff;
          border-left: 4px solid #3498db;
          border-radius: 10px;
          padding: 12px 16px;
          margin-bottom: 1rem;
          font-size: 0.85rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .pb-info { display: flex; flex-wrap: wrap; gap: 4px 12px; }
        .patient-bar-cushing strong { color: #1d4ed8; }
        .date-poison { color: #94a3b8; font-size: 0.75rem; white-space: nowrap; }

        .input-summary-cushing {
          background: #f8fafc;
          border-radius: 12px;
          padding: 14px;
          margin-bottom: 1.5rem;
          border: 1px solid #e2e8f0;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .summary-row:last-child { border-bottom: none; }
        .summary-row .label { color: #64748b; font-weight: 700; font-size: 0.85rem; }
        .summary-row .value { color: #1e293b; font-weight: 600; font-size: 0.9rem; text-align: right; }
        .summary-row .value small { font-size: 0.75rem; color: #94a3b8; margin-left: 4px; font-weight: 400; }

        .result-banner-cushing {
          border-radius: 14px;
          padding: 20px;
          border-left: 6px solid;
          margin-bottom: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
        }
        .rb-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
        .rb-icon { font-size: 1.5rem; }
        .rb-label { font-size: 1.05rem; font-weight: 800; line-height: 1.3; }
        
        .rb-actions { margin-left: 1.4rem; padding: 0; list-style-type: none; }
        .rb-actions li { 
          margin-bottom: 10px; 
          font-size: 0.9rem; 
          font-weight: 600; 
          line-height: 1.4;
          position: relative;
        }
        .rb-actions li::before {
          content: '•';
          position: absolute;
          left: -1.2rem;
          color: currentColor;
          opacity: 0.6;
        }
        
        .rb-note { margin-top: 15px; font-size: 0.75rem; opacity: 0.7; font-style: italic; border-top: 1px dashed rgba(0,0,0,0.1); padding-top: 10px; }

        .theme-green { background: #f0fdf4; border-color: #22c55e; color: #166534; }
        .theme-orange { background: #fffbeb; border-color: #f59e0b; color: #92400e; }
        .theme-red { background: #fef2f2; border-color: #ef4444; color: #991b1b; }
        .theme-purple { background: #f5f3ff; border-color: #8b5cf6; color: #5b21b6; }
        .theme-yellow { background: #fefce8; border-color: #eab308; color: #854d0e; }

        .ref-label-poison {
          margin-top: 25px;
          font-size: 0.65rem;
          color: #94a3b8;
          text-align: center;
          font-style: italic;
          line-height: 1.5;
          opacity: 0.8;
        }

        @media (max-width: 640px) {
          .patient-bar-cushing { flex-direction: column; align-items: flex-start; gap: 8px; }
          .summary-row { flex-direction: column; text-align: left; gap: 4px; padding: 12px 0; }
          .summary-row .value { text-align: left; }
          .rb-label { font-size: 1rem; }
          .rb-actions li { font-size: 0.85rem; }
        }
      `}</style>
    </div>
  );
};

export default CushingResultView;
