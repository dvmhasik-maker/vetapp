import React from 'react';
import { EchoResult } from './types';

interface EchoResultViewProps {
  result: EchoResult;
  resultRef: React.RefObject<HTMLDivElement>;
}

const EchoResultView: React.FC<EchoResultViewProps> = ({ result, resultRef }) => {
  return (
    <div className="result-col" ref={resultRef}>
      <div className="tool-card-container">
        <div className="tool-card-title">📊 심초음파 분석 결과</div>

        <div className="echo-main-metrics">
          <div className="echo-metric-box">
            <span className="label">LA:Ao 비율</span>
            <span className={`value ${result.laAoRatio >= 1.6 ? 'danger' : 'normal'}`}>{result.laAoRatio}</span>
            <span className="ref">참조: &lt; 1.6</span>
          </div>
          <div className="echo-metric-box">
            <span className="label">LVIDdn (표준화)</span>
            <span className={`value ${result.lviddn >= 1.7 ? 'danger' : 'normal'}`}>{result.lviddn}</span>
            <span className="ref">참조: &lt; 1.7</span>
          </div>
          <div className="echo-metric-box">
            <span className="label">FS (단축축축률)</span>
            <span className="value">{result.fsPct}%</span>
            <span className="ref">참조: 25~45%</span>
          </div>
        </div>

        <div className="echo-stage-card">
          <div className="stage-header">진단 단계 제안</div>
          <div className={`stage-value ${result.stage.includes('B2') ? 'b2' : ''}`}>{result.stage}</div>
          <div className="interpretation-text">{result.interpretation}</div>
        </div>

        <div className="ref-label" style={{ marginTop: '2rem' }}>
          ※ 본 분석은 ACVIM MMVD 가이드라인(2019)을 기준으로 합니다. 최종 진단은 임상 증상과 방사선 검사 결과를 종합하여 결정하십시오.
        </div>
      </div>

      <style>{`
        .echo-main-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 15px;
          margin-bottom: 2rem;
        }
        .echo-metric-box {
          background: #f8fafc;
          padding: 16px;
          border-radius: 12px;
          text-align: center;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .echo-metric-box .label { font-size: 0.75rem; font-weight: 700; color: #64748b; }
        .echo-metric-box .value { font-size: 1.5rem; font-weight: 800; }
        .echo-metric-box .value.danger { color: #e74c3c; }
        .echo-metric-box .value.normal { color: #27ae60; }
        .echo-metric-box .ref { font-size: 0.7rem; color: #94a3b8; }

        .echo-stage-card {
          background: #f0f7ff;
          border-radius: 14px;
          padding: 24px;
          text-align: center;
          border: 1px solid #dbeafe;
        }
        .stage-header { font-size: 0.85rem; font-weight: 700; color: #3b82f6; margin-bottom: 8px; text-transform: uppercase; }
        .stage-value { font-size: 2.2rem; font-weight: 900; color: #1e40af; margin-bottom: 12px; }
        .stage-value.b2 { color: #c0392b; }
        .interpretation-text { font-size: 0.95rem; line-height: 1.6; color: #334155; font-weight: 600; }

        @media (max-width: 640px) {
          .echo-main-metrics { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default EchoResultView;
