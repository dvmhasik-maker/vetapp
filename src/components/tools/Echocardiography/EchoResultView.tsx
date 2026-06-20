import React from 'react';
import { EchoResult } from './types';

interface EchoResultViewProps {
  result: EchoResult;
  resultRef: React.RefObject<HTMLDivElement>;
}

const EchoResultView: React.FC<EchoResultViewProps> = ({ result, resultRef }) => {
  const fmt = (n: number | null | undefined) => {
    if (n === null || n === undefined) return '-';
    if (isNaN(n) || !isFinite(n) || n === 0) return '-';
    return Math.abs(n) >= 100 ? n.toFixed(0) : n.toFixed(2);
  };

  const renderDogResults = () => {
    const groups = ['Volume Overload', 'Myocardial Failure', 'Diastolic Failure', 'Pulmonary Hypertension'];
    const groupStyles: any = {
      'Volume Overload': { color: '#eff6ff', border: '#3b82f6', title: 'Volume Overload' },
      'Myocardial Failure': { color: '#fff1f2', border: '#f43f5e', title: 'Myocardial Failure' },
      'Diastolic Failure': { color: '#f5f3ff', border: '#8b5cf6', title: 'Diastolic Failure' },
      'Pulmonary Hypertension': { color: '#f0fdf4', border: '#22c55e', title: 'Pulmonary Hypertension' }
    };

    return groups.map(g => {
      const groupItems = result.items.filter(it => it.group === g);
      const style = groupStyles[g];
      return (
        <div key={g} className="result-group-echo" style={{ background: style.color }}>
          <h3 style={{ borderLeft: `5px solid ${style.border}` }}>{style.title}</h3>
          <table className="result-table-echo">
            <thead>
              <tr>
                <th>항목</th>
                <th>정상범위</th>
                <th>측정값</th>
                <th>해석</th>
              </tr>
            </thead>
            <tbody>
              {groupItems.map((it, idx) => {
                const n = it.val;
                
                // 정상범위 표시 포맷 (MV E wave, MV E/A ratio는 소수점 1자리 고정)
                const fmtVal = (val: number) => {
                  if (it.name === 'MV E wave' || it.name === 'MV E/A ratio') {
                    return val.toFixed(1);
                  }
                  return val.toString();
                };

                const normalDisp = it.range 
                  ? `${fmtVal(it.range[0])} ~ ${fmtVal(it.range[1])}` 
                  : (it.normal !== null ? fmt(it.normal) : '-');
                  
                let color = '#64748b', txt = '-';

                if (!isNaN(n) && isFinite(n) && n !== 0) {
                  // 1. 상태 텍스트 결정
                  if (it.range) {
                    if (n < it.range[0]) txt = it.lo;
                    else if (n > it.range[1]) txt = it.hi;
                    else txt = '정상';
                  } else if (it.normal !== null) {
                    if (n < it.normal) txt = it.lo;
                    else if (n > it.normal) txt = it.hi;
                    else txt = '정상';
                  }

                  // 2. 색상 결정 (텍스트가 '정상'이면 항상 초록색)
                  if (txt === '정상') {
                    color = '#27ae60'; // 정상: 초록색 (통일)
                  } else if (txt !== '-') {
                    // 비정상일 때: 측정값이 기준보다 낮으면 파란색, 높으면 빨간색
                    if (it.range) {
                      color = (n < it.range[0]) ? '#2980b9' : '#c0392b';
                    } else if (it.normal !== null) {
                      color = (n < it.normal) ? '#2980b9' : '#c0392b';
                    }
                  }
                }

                return (
                  <tr key={idx}>
                    <td>{it.name}</td>
                    <td>{normalDisp}</td>
                    <td style={{ color, fontWeight: 'bold' }}>{fmt(n)}</td>
                    <td style={{ color }}>{txt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    });
  };

  const renderCatResults = () => {
    const dx = result.catDiagnosis!;
    
    const styledCat = (val: any, thresh: any) => {
      if (val === undefined || val === null || val === '') return '-';
      const n = parseFloat(val);
      if (isNaN(n)) return '-';

      let color = '#27ae60'; // 기본 초록색 (정상)
      if (thresh) {
        if (thresh.min !== undefined && n < thresh.min) {
          color = '#2980b9'; // 낮음: 파란색
        } else if (thresh.max !== undefined && n > thresh.max) {
          color = '#c0392b'; // 높음: 빨간색
        }
      } else {
        color = '#334155'; // 기준치 없는 경우 기본 텍스트 색상
      }

      return (
        <span style={{ color, fontWeight: 'bold' }}>
          {Math.abs(n) >= 100 ? n.toFixed(0) : n.toFixed(2)}
        </span>
      );
    };

    const threshLabel = (t: any) => {
      if (!t) return '-';
      const fmtVal = (val: number) => {
        if (val === undefined || val === null || isNaN(val)) return '';
        return Number.isInteger(val) ? val.toString() : (Math.round(val * 100) / 100).toString();
      };
      if (t.min !== undefined && t.max !== undefined) return `${fmtVal(t.min)} ~ ${fmtVal(t.max)}`;
      if (t.min !== undefined) return `≥ ${fmtVal(t.min)}`;
      if (t.max !== undefined) return `≤ ${fmtVal(t.max)}`;
      return '-';
    };

    return (
      <>
        <div className="diagnosis-banner-echo">
          <div className="dx-label-echo">{dx.label}</div>
          {dx.thrombosisRisk && <div className="dx-sub-echo">{dx.thrombosisRisk}</div>}
          {dx.lvotTurbulence && <div className="dx-sub-echo danger">{dx.lvotTurbulence}</div>}
          {dx.samPresent && <div className="dx-sub-echo danger">{dx.samPresent}</div>}
        </div>

        <div className="result-group-echo" style={{ background: '#eff6ff' }}>
          <h3 style={{ borderLeft: '5px solid #3b82f6' }}>ACVIM 단계 평가 (B1 / B2 / C)</h3>
          <table className="result-table-echo cat-stage-table">
            <thead>
              <tr>
                <th>항목</th>
                <th>B1</th>
                <th>B2</th>
                <th>C</th>
                <th>측정값</th>
              </tr>
            </thead>
            <tbody>
              {result.catStageRows?.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.label}</td>
                  <td className={`ref-val ${r.matched.includes('b1') ? 'matched-stage' : ''}`}>{r.b1}</td>
                  <td className={`ref-val ${r.matched.includes('b2') ? 'matched-stage' : ''}`}>{r.b2}</td>
                  <td className={`ref-val ${r.matched.includes('c') ? 'matched-stage' : ''}`}>{r.c}</td>
                  <td>{styledCat(r.measured, r.thresh)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {dx.finalStage && (
            <div className="final-stage-summary">
              <span className="label">종합 ACVIM 단계 판정:</span>
              <span className="value">Stage {dx.finalStage}</span>
            </div>
          )}
        </div>

        <div className="result-group-echo" style={{ background: '#f5f3ff' }}>
          <h3 style={{ borderLeft: '5px solid #8b5cf6' }}>기타 측정값</h3>
          <table className="result-table-echo">
            <thead>
              <tr>
                <th>항목</th>
                <th>정상 기준</th>
                <th>측정값</th>
              </tr>
            </thead>
            <tbody>
              {result.catExtraRows?.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.label}</td>
                  <td>{threshLabel(r.thresh)}</td>
                  <td>{styledCat(r.measured, r.thresh)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <div className="result-col-echo" ref={resultRef}>
      <div className="tool-card-container">
        <div className="tool-card-title">📊 분석 결과 리포트</div>

        {/* 환자 요약 */}
        <div className="patient-summary-echo">
          <div className="summary-title">🐾 환자 정보 요약</div>
          <div className="summary-grid">
            <span>이름: <strong>{result.patientInfo.name || '-'}</strong></span>
            <span>품종: {result.patientInfo.breed || '-'}</span>
            <span>종: {result.species === 'dog' ? '강아지' : '고양이'}</span>
            <span>성별: {result.patientInfo.sex || '-'}</span>
            <span>나이: {result.patientInfo.age || '-'}</span>
            <span className="date">진단일: {result.date}</span>
          </div>
        </div>

        {result.species === 'dog' ? renderDogResults() : renderCatResults()}

        <div className="ref-label-echo">
          ※ 본 분석은 ACVIM 가이드라인을 기준으로 하며, 최종 진단은 수의사의 전문적 판단하에 결정되어야 합니다.
        </div>
      </div>

      <style>{`
        .patient-summary-echo {
          background: #f8fafc;
          border-left: 4px solid #3b82f6;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .summary-title { font-weight: 800; font-size: 0.95rem; color: #1e293b; margin-bottom: 8px; }
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px 20px;
          font-size: 0.85rem;
          color: #475569;
        }
        .summary-grid .date { color: #94a3b8; }

        .diagnosis-banner-echo {
          text-align: center;
          padding: 24px;
          border-radius: 12px;
          background: #f0f9ff;
          border: 1px solid #bae6fd;
          margin-bottom: 24px;
        }
        .dx-label-echo { font-size: 1.8rem; font-weight: 900; color: #0369a1; margin-bottom: 8px; }
        .dx-sub-echo { font-size: 1rem; font-weight: 600; color: #0ea5e9; }
        .dx-sub-echo.danger { color: #e11d48; }

        .result-group-echo {
          margin-bottom: 24px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .result-group-echo h3 {
          margin: 0;
          padding: 12px 16px;
          font-size: 1rem;
          font-weight: 800;
          background: #fff;
          color: #1e293b;
        }
        .result-table-echo {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
          table-layout: fixed; /* 컬럼 너비 고정 */
        }
        .result-table-echo th, .result-table-echo td {
          padding: 10px 5px;
          font-size: 0.85rem;
          border-bottom: 1px solid #f1f5f9;
          text-align: center;
          color: #334155;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap; /* 텍스트 줄바꿈 방지 */
        }
        .result-table-echo th {
          background: #f8fafc;
          color: #64748b;
          font-size: 0.8rem;
          border-bottom: 1px solid #e2e8f0;
        }
        /* 일반 리포트 테이블 (항목, 정상범위, 측정값, 해석) */
        .result-table-echo:not(.cat-stage-table) th:nth-child(1), .result-table-echo:not(.cat-stage-table) td:nth-child(1) { width: 22%; }
        .result-table-echo:not(.cat-stage-table) th:nth-child(2), .result-table-echo:not(.cat-stage-table) td:nth-child(2) { width: 18%; }
        .result-table-echo:not(.cat-stage-table) th:nth-child(3), .result-table-echo:not(.cat-stage-table) td:nth-child(3) { width: 15%; }
        .result-table-echo:not(.cat-stage-table) th:nth-child(4), .result-table-echo:not(.cat-stage-table) td:nth-child(4) { width: 45%; text-align: left; padding-left: 10px; }

        /* 고양이 ACVIM 단계 테이블 전용 너비 (항목, B1, B2, C, 측정값) */
        .cat-stage-table th:nth-child(1), .cat-stage-table td:nth-child(1) { width: 25%; }
        .cat-stage-table th:nth-child(2), .cat-stage-table td:nth-child(2),
        .cat-stage-table th:nth-child(3), .cat-stage-table td:nth-child(3),
        .cat-stage-table th:nth-child(4), .cat-stage-table td:nth-child(4) { width: 15%; }
        .cat-stage-table th:nth-child(5), .cat-stage-table td:nth-child(5) { width: 30%; }

        .result-table-echo tr:last-child td { border-bottom: none; }
        .ref-val { font-size: 0.75rem !important; color: #94a3b8 !important; }
        .matched-stage { 
          background: #dbeafe !important; 
          color: #1d4ed8 !important; 
          font-weight: 800 !important;
          border: 1.5px solid #3b82f6;
        }

        .final-stage-summary {
          padding: 15px 20px;
          background: #fff;
          border-top: 2px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
        }
        .final-stage-summary .label {
          font-size: 0.9rem;
          font-weight: 700;
          color: #475569;
        }
        .final-stage-summary .value {
          font-size: 1.1rem;
          font-weight: 900;
          color: #2563eb;
          background: #eff6ff;
          padding: 4px 12px;
          border-radius: 6px;
          border: 1px solid #bfdbfe;
        }

        .ref-label-echo {
          margin-top: 2rem;
          font-size: 0.75rem;
          color: #94a3b8;
          text-align: center;
          font-style: italic;
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .summary-grid { grid-template-columns: 1fr 1fr; }
          .dx-label-echo { font-size: 1.4rem; }
        }
      `}</style>
    </div>
  );
};

export default EchoResultView;
