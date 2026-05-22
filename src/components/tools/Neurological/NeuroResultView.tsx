import React from 'react';
import { NeuroResult, PatientData } from './types';

interface NeuroResultViewProps {
  result: NeuroResult;
  patient: PatientData;
  resultRef: React.RefObject<HTMLDivElement>;
}

const NeuroResultView: React.FC<NeuroResultViewProps> = ({ result, patient, resultRef }) => {
  return (
    <div className="result-col" ref={resultRef}>
      <div className="tool-card-container">
        <div className="tool-card-title">📊 신경계 병변 위치 예측 결과</div>
        
        <div className="patient-bar">
          <span><strong>🐾 환자</strong></span>
          <span>이름: <strong>{patient.name || '-'}</strong></span>
          <span>품종: {patient.breed || '-'}</span>
          <span>성별: {patient.sex || '-'}</span>
          <span>나이: {patient.age || '-'}</span>
          <span style={{ marginLeft: 'auto', color: '#aaa', fontSize: '.8rem' }}>📅 {result.date}</span>
        </div>

        <div className="input-summary">
          <strong>관찰된 이상 증상 요약 ({result.selectedSymptoms.length}개 선택):</strong>
          <ul>
            {result.selectedSymptoms.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>

        <h3>🎯 유력 병변 위치 및 방향 판정 순위</h3>
        <div className="score-rank-box">
          {result.topRanks.map((rg, idx) => {
            const rankIdx = idx + 1;
            const rankClass = rankIdx <= 3 ? `top-${rankIdx}` : 'rank-normal';
            const icon = rankIdx === 1 ? '🚨 [1순위]' : (rankIdx === 2 ? '🔸 [2순위]' : (rankIdx === 3 ? '🔹 [3순위]' : '▪ [4순위]'));
            
            return (
              <div key={idx} className={`rank-item ${rankClass}`}>
                <div className="rank-header">
                  <span className="rank-title">{icon} <strong>{rg.name}</strong></span>
                  <span className="rank-score">{rg.pct}% 일치 ({rg.score}/{result.totalInteractions}점)</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-bar" style={{ width: `${rg.pct}%` }}></div>
                </div>
                <div className="matched-reasons"><strong>관련 징후:</strong> {rg.matches.join(', ')}</div>
              </div>
            );
          })}
          
          {result.topRanks.length === 0 && (
            <p style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
              선택한 증상 조합으로 병변 위치를 유유추할 수 없습니다.
            </p>
          )}
        </div>

        <div className="ref-label">
          ※ 본 분석기는 전뇌(대뇌) 교차 신호 및 후뇌/척수의 동측 특성을 기반으로 병변 방향을 추적합니다. 정밀 진단을 위해 MRI 촬영을 적극 권장합니다.
        </div>
      </div>

      <style>{`
        .patient-bar {
          background: #f0f7ff; border-left: 4px solid var(--secondary-color);
          border-radius: 8px; padding: 10px 14px; margin-bottom: 14px;
          font-size: .88rem; color: #333; display: flex; flex-wrap: wrap; gap: 4px 20px;
        }
        .patient-bar strong { color: var(--secondary-color); }

        .input-summary {
          background: #f8f9fa; border-radius: 8px; padding: 12px 16px;
          margin-bottom: 20px; font-size: .88rem; color: #444; border: 1px solid #e2e8f0;
        }
        .input-summary ul { margin-left: 18px; margin-top: 6px; line-height: 1.5; }

        .score-rank-box { margin-top: 16px; display: flex; flex-direction: column; gap: 10px; }
        .rank-item {
          background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .rank-item.top-1 { border-left: 6px solid #c0392b; background: #fff5f5; }
        .rank-item.top-2 { border-left: 6px solid #d4700a; background: #fffaf0; }
        .rank-item.top-3 { border-left: 6px solid #1e8c4e; background: #f0fdf4; }
        
        .rank-header { display: flex; justify-content: space-between; align-items: center; font-weight: 700; gap: 10px; }
        .rank-title { font-size: 1.05rem; color: #1e293b; }
        .top-1 .rank-title { color: #c0392b; }
        .rank-score { font-size: 1rem; color: #0f172a; }

        .progress-bg { background: #e2e8f0; height: 8px; border-radius: 999px; width: 100%; overflow: hidden; }
        .progress-bar { height: 100%; border-radius: 999px; transition: width 0.3s; }
        .top-1 .progress-bar { background: #c0392b; }
        .top-2 .progress-bar { background: #d4700a; }
        .top-3 .progress-bar { background: #1e8c4e; }
        .rank-normal .progress-bar { background: #4a5568; }
        
        .matched-reasons { font-size: .82rem; color: #64748b; line-height: 1.4; }

        .ref-label { font-size: .75rem; color: #aaa; text-align: right; margin-top: 16px; font-style: italic; line-height: 1.5; }

        @media (max-width: 768px) {
          .rank-header { flex-direction: column; align-items: flex-start; }
          .patient-bar { flex-direction: column; gap: 6px; }
        }
      `}</style>
    </div>
  );
};

export default NeuroResultView;
