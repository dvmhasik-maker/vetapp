import React from 'react';
import { ClipboardList } from 'lucide-react';
import { PatientData } from './types';
import { symptomData } from './data';

interface NeuroFormProps {
  patient: PatientData;
  setPatient: (p: PatientData) => void;
  selectedSymptomIds: string[];
  toggleSymptom: (id: string) => void;
  localizeLesion: () => void;
}

const NeuroForm: React.FC<NeuroFormProps> = ({
  patient,
  setPatient,
  selectedSymptomIds,
  toggleSymptom,
  localizeLesion
}) => {
  return (
    <div className="input-col">
      {/* Patient Info */}
      <div className="tool-card-container">
        <div className="tool-card-title">🐾 환자 정보</div>
        <div className="patient-grid">
          <div className="pf"><label>이름</label><input type="text" value={patient.name} onChange={(e) => setPatient({...patient, name: e.target.value})} placeholder="예: 해피" /></div>
          <div className="pf"><label>품종</label><input type="text" value={patient.breed} onChange={(e) => setPatient({...patient, breed: e.target.value})} placeholder="예: 말티즈" /></div>
          <div className="pf">
            <label>성별</label>
            <select value={patient.sex} onChange={(e) => setPatient({...patient, sex: e.target.value})}>
              <option value="">선택</option>
              <option value="남">남</option>
              <option value="중성화 남">중성화 남</option>
              <option value="여">여</option>
              <option value="중성화 여">중성화 여</option>
            </select>
          </div>
          <div className="pf"><label>나이</label><input type="text" value={patient.age} onChange={(e) => setPatient({...patient, age: e.target.value})} placeholder="예: 5세" /></div>
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

        <button className="btn-localize-stylish" onClick={localizeLesion}>
          <ClipboardList size={22} style={{ marginRight: '10px' }} /> 병변 위치 분석하기
        </button>
      </div>

      <style>{`
        .cat-title {
          font-size: .88rem; font-weight: 700; color: #444;
          background: #ebf3fc; padding: 6px 12px; border-radius: 6px;
          margin: 22px 0 10px; border-left: 4px solid var(--secondary-color);
          text-align: center;
        }
        .pair-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .single-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
        .chk-label {
          display: flex; align-items: center; justify-content: flex-start; gap: 12px; padding: 12px 16px;
          border: 1px solid #e2e8f0; border-radius: 12px; background: #f8fafc;
          cursor: pointer; transition: all .2s; font-size: .9rem; color: #334155; line-height: 1.3;
          min-height: 72px; text-align: left; white-space: pre-line;
        }
        .chk-label:hover { border-color: var(--secondary-color); background: #f0f7ff; transform: translateY(-1px); box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .chk-label.checked { background: #e0f2fe; border-color: #3498db; color: #0369a1; font-weight: 700; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05); }
        .chk-label input { width: 20px; height: 20px; cursor: pointer; flex-shrink: 0; }

        .btn-localize-stylish {
          width: 100%; margin-top: 2rem; padding: 18px;
          background: linear-gradient(135deg, #3498db, #2980b9);
          color: #fff; border: none; border-radius: 14px;
          font-size: 1.1rem; font-weight: 800; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s; box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
          letter-spacing: 0.05em;
        }
        .btn-localize-stylish:hover { 
          background: linear-gradient(135deg, #2980b9, #2471a3);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
        }
        .btn-localize-stylish:active { transform: translateY(0); }

        @media (min-width: 1024px) {
          .single-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .pair-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default NeuroForm;
