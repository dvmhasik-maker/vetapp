import React from 'react';
import { AnalysisResult, PatientData, ValueData, Mode } from './types';

interface ResultViewProps {
  result: AnalysisResult;
  patient: PatientData;
  values: ValueData;
  mode: Mode;
  resultRef: React.RefObject<HTMLDivElement>;
}

const ResultView: React.FC<ResultViewProps> = ({
  result,
  patient,
  values,
  mode,
  resultRef
}) => {
  return (
    <div className="tool-card-container result-card" ref={resultRef}>
      <div className="tool-card-title">📊 종합 분석 결과</div>
      <div id="result-body">
        <div className="result-container">
          <div className="patient-bar">
            <span><strong>🐾 환자 ({result.modeLabel})</strong></span>
            <span>이름: <strong>{patient.name || '-'}</strong></span>
            <span>품종: {patient.breed || '-'}</span>
            <span>성별: {patient.sex || '-'}</span>
            <span>나이: {patient.age || '-'}</span>
            <span style={{ marginLeft: 'auto', color: '#aaa', fontSize: '.8rem' }}>📅 {result.today}</span>
          </div>

          <div className="input-summary">
            <strong>{mode === 'diag' ? '초기 진단' : '투약 관리'} 데이터 요약:</strong><br />
            • 검사 결과: Total T4 = <b>{values.t4} μg/dL</b>, TSH = <b>{values.tsh} ng/mL</b><br />
            {mode === 'diag' ? (
              <>• 임상 증상 유무: <b>{values.diagSymptom}</b></>
            ) : (
              <>• 증상 개선 상태: <span style={{ color: values.manageSymptom === '개선됨' ? '#1e8c4e' : '#c0392b', fontWeight: 'bold' }}>{values.manageSymptom}</span></>
            )}
          </div>

          <div className={`result-box ${result.resultClass}`}>
            <div className="result-header">{result.title}</div>
            <div className="action-message">{result.actionMsg}</div>
            <div className="result-guideline">{result.guideHtml}</div>
          </div>
          
          <div className="ref-label">※ 본 프로그램 결과는 제공된 호르몬 데이터 매뉴얼을 매칭한 결과입니다. 최종적인 환자 정밀 처방 권한은 담당 주치의 수의사의 소견을 전적으로 따릅니다.</div>
        </div>
      </div>
    </div>
  );
};

export default ResultView;
