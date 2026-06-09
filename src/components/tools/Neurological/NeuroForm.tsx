import React from 'react';
import { ClipboardList, Camera } from 'lucide-react';
import { PatientData } from './types';
import { symptomData } from './data';

interface NeuroFormProps {
  patient: PatientData;
  setPatient: (p: PatientData) => void;
  selectedSymptomIds: string[];
  toggleSymptom: (id: string) => void;
  localizeLesion: () => void;
  resetSigns: () => void;
  saveImg?: () => void;
  result: boolean;
}

const NeuroForm: React.FC<NeuroFormProps> = ({
  patient,
  setPatient,
  selectedSymptomIds,
  toggleSymptom,
  localizeLesion,
  saveImg,
  result
}) => {
  return (
    <div className="input-col">
      {/* Patient Info */}
      <div className="tool-card-container">
        <div className="tool-card-title">🐾 환자 정보</div>
        <div className="patient-grid">
          <div className="pf"><label>이름</label><input type="text" id="pt_name" value={patient.name} onChange={(e) => setPatient({...patient, name: e.target.value})} placeholder="예: 대박이" /></div>
          <div className="pf"><label>품종</label><input type="text" id="pt_breed" value={patient.breed} onChange={(e) => setPatient({...patient, breed: e.target.value})} placeholder="예: 리트리버" /></div>
          <div className="pf">
            <label>성별</label>
            <select id="pt_sex" value={patient.sex} onChange={(e) => setPatient({...patient, sex: e.target.value})}>
              <option value="">선택</option>
              <option value="남">남</option>
              <option value="중성화 남">중성화 남</option>
              <option value="여">여</option>
              <option value="중성화 여">중성화 여</option>
            </select>
          </div>
          <div className="pf"><label>나이</label><input type="text" id="pt_age" value={patient.age} onChange={(e) => setPatient({...patient, age: e.target.value})} placeholder="예: 7세" /></div>
        </div>
      </div>

      {/* Symptoms Checklist */}
      <div className="tool-card-container">
        <div className="tool-card-title">📋 관찰되는 신경학적 증상 선택</div>

        <div className="cat-title">1. 의식 상태 (Consciousness)</div>
        <div className="single-grid">
          {symptomData.consciousness.map(s => (
            <label key={s.id} className={`chk-label ${selectedSymptomIds.includes(s.id) ? 'checked' : ''}`}>
              <input type="checkbox" checked={selectedSymptomIds.includes(s.id)} onChange={() => toggleSymptom(s.id)} /> <span>{s.text}</span>
            </label>
          ))}
        </div>

        <div className="cat-title">2. 위협 반사 (Menace Response)</div>
        <div className="pair-grid">
          {symptomData.menace.map(s => (
            <label key={s.id} className={`chk-label ${selectedSymptomIds.includes(s.id) ? 'checked' : ''}`}>
              <input type="checkbox" checked={selectedSymptomIds.includes(s.id)} onChange={() => toggleSymptom(s.id)} /> <span>{s.text}</span>
            </label>
          ))}
        </div>

        <div className="cat-title">3. 동공 빛 반사 (PLR)</div>
        <div className="single-grid">
          {symptomData.plr.map(s => (
            <label key={s.id} className={`chk-label ${selectedSymptomIds.includes(s.id) ? 'checked' : ''}`}>
              <input type="checkbox" checked={selectedSymptomIds.includes(s.id)} onChange={() => toggleSymptom(s.id)} /> <span>{s.text}</span>
            </label>
          ))}
        </div>

        <div className="cat-title">4. 자세 및 걸음 (Posture & Gait)</div>
        <div className="pair-grid">
          {symptomData.gait.slice(0, 6).map(s => (
            <label key={s.id} className={`chk-label ${selectedSymptomIds.includes(s.id) ? 'checked' : ''}`}>
              <input type="checkbox" checked={selectedSymptomIds.includes(s.id)} onChange={() => toggleSymptom(s.id)} /> <span>{s.text}</span>
            </label>
          ))}
        </div>
        <div className="single-grid" style={{ marginTop: '10px' }}>
          {symptomData.gait.slice(6).map(s => (
            <label key={s.id} className={`chk-label ${selectedSymptomIds.includes(s.id) ? 'checked' : ''}`}>
              <input type="checkbox" checked={selectedSymptomIds.includes(s.id)} onChange={() => toggleSymptom(s.id)} /> <span>{s.text}</span>
            </label>
          ))}
        </div>

        <div className="cat-title">5. 고유자세반응 (Proprioception)</div>
        <div className="pair-grid">
          {symptomData.proprioception.slice(0, 2).map(s => (
            <label key={s.id} className={`chk-label ${selectedSymptomIds.includes(s.id) ? 'checked' : ''}`}>
              <input type="checkbox" checked={selectedSymptomIds.includes(s.id)} onChange={() => toggleSymptom(s.id)} /> <span>{s.text}</span>
            </label>
          ))}
        </div>
        <div className="single-grid" style={{ marginTop: '10px' }}>
          {symptomData.proprioception.slice(2).map(s => (
            <label key={s.id} className={`chk-label ${selectedSymptomIds.includes(s.id) ? 'checked' : ''}`}>
              <input type="checkbox" checked={selectedSymptomIds.includes(s.id)} onChange={() => toggleSymptom(s.id)} /> <span>{s.text}</span>
            </label>
          ))}
        </div>

        <div className="cat-title">6. 기타 신경증상 (Miscellaneous)</div>
        <div className="single-grid">
          {symptomData.misc.map(s => (
            <label key={s.id} className={`chk-label ${selectedSymptomIds.includes(s.id) ? 'checked' : ''}`}>
              <input type="checkbox" checked={selectedSymptomIds.includes(s.id)} onChange={() => toggleSymptom(s.id)} /> <span>{s.text}</span>
            </label>
          ))}
        </div>

        <div className="action-area-common">
          <button className="btn-primary-action" onClick={localizeLesion}>
            <ClipboardList size={22} /> 병변 위치 분석하기
          </button>
          {result && saveImg && (
            <button className="btn-secondary-action" onClick={saveImg}>
              <Camera size={20} /> 분석 결과 리포트 이미지 저장
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NeuroForm;
