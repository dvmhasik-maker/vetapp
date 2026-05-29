import React from 'react';
import { Search, Activity } from 'lucide-react';
import { Mode, PatientData, ValueData } from './types';

interface DiagnosisFormProps {
  mode: Mode;
  patient: PatientData;
  values: ValueData;
  handlePatientChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleValueChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  executeAnalysis: () => void;
  saveImg: (targetType: 'input' | 'result') => void;
  patientCardRef: React.RefObject<HTMLDivElement>;
  inputPanelRef: React.RefObject<HTMLDivElement>;
}

const DiagnosisForm: React.FC<DiagnosisFormProps> = ({
  mode,
  patient,
  values,
  handlePatientChange,
  handleValueChange,
  executeAnalysis,
  saveImg,
  patientCardRef,
  inputPanelRef
}) => {
  return (
    <>
      <div className="tool-card-container" ref={patientCardRef}>
        <div className="tool-card-title">🐾 환자 정보</div>
        <div className="patient-grid">
          <div className="pf"><label>이름</label><input type="text" id="pt_name" value={patient.name} onChange={handlePatientChange} placeholder="예: 대박이" /></div>
          <div className="pf"><label>품종</label><input type="text" id="pt_breed" value={patient.breed} onChange={handlePatientChange} placeholder="예: 리트리버" /></div>
          <div className="pf">
            <label>성별</label>
            <select id="pt_sex" value={patient.sex} onChange={handlePatientChange}>
              <option value="">선택</option>
              <option value="남">남</option>
              <option value="중성화 남">중성화 남</option>
              <option value="여">여</option>
              <option value="중성화 여">중성화 여</option>
            </select>
          </div>
          <div className="pf"><label>나이</label><input type="text" id="pt_age" value={patient.age} onChange={handlePatientChange} placeholder="예: 7세" /></div>
        </div>
      </div>

      <div className="tool-card-container" ref={inputPanelRef}>
        <div className="tool-card-title">
          {mode === 'diag' ? '📋 검사 수치 및 상태 입력 (초기 진단)' : '📋 호르몬 수치 및 치료 반응 입력 (투약 모니터링)'}
        </div>

        <div className="cat-title">1. 호르몬 검사 결과 수치</div>
        <div className="patient-grid" style={{ marginBottom: '15px' }}>
          <div className="pf">
            <label>Total T4 <span className="unit-text">(참조치: 1.0 ~ 4.0 μg/dL)</span></label>
            <input type="number" id="val_t4" step="0.1" inputMode="decimal" value={values.t4} onChange={handleValueChange} placeholder="예: 0.6" />
          </div>
          <div className="pf">
            <label>TSH <span className="unit-text">(참조치: 0.05 ~ 0.5 ng/mL)</span></label>
            <input type="number" id="val_tsh" step="0.01" inputMode="decimal" value={values.tsh} onChange={handleValueChange} placeholder="예: 0.35" />
          </div>
        </div>

        {mode === 'diag' ? (
          <div id="section-symptom-diag">
            <div className="cat-title">2. 임상 증상 유무 (대사 저하, 비대칭 탈모, 비만 등)</div>
            <div className="pair-grid">
              <label className={`chk-label ${values.diagSymptom === '있음' ? 'checked' : ''}`}>
                <input type="radio" name="diag_symptom" value="있음" checked={values.diagSymptom === '있음'} onChange={handleValueChange} /> 관련 임상 증상 있음
              </label>
              <label className={`chk-label ${values.diagSymptom === '없음' ? 'checked' : ''}`}>
                <input type="radio" name="diag_symptom" value="없음" checked={values.diagSymptom === '없음'} onChange={handleValueChange} /> 관련 임상 증상 없음
              </label>
            </div>
          </div>
        ) : (
          <div id="section-symptom-manage">
            <div className="cat-title">2. 치료 후 임상 증상 개선 상태</div>
            <div className="pair-grid">
              <label className={`chk-label ${values.manageSymptom === '개선됨' ? 'checked' : ''}`}>
                <input type="radio" name="manage_symptom" value="개선됨" checked={values.manageSymptom === '개선됨'} onChange={handleValueChange} /> 임상 증상 개선됨 (양호)
              </label>
              <label className={`chk-label ${values.manageSymptom === '개선안됨' ? 'checked' : ''}`}>
                <input type="radio" name="manage_symptom" value="개선안됨" checked={values.manageSymptom === '개선안됨'} onChange={handleValueChange} /> 임상 증상 개선 안 됨
              </label>
            </div>
          </div>
        )}

        <button className="btn-analyze-tool" onClick={executeAnalysis}>
          <Search size={20} style={{ marginRight: '8px' }} /> 상태 분석하기
        </button>
        <div className="save-row-tool">
          <button className="btn-save-tool result-save" onClick={() => saveImg('result')}>
            <Activity size={18} style={{ marginRight: '6px' }} /> 결과 리포트 이미지 저장
          </button>
        </div>
      </div>
    </>
  );
};

export default DiagnosisForm;
