import React from 'react';
import { Search } from 'lucide-react';
import { CushingMode, PatientInfo, CushingValues } from './types';

interface CushingFormProps {
  mode: CushingMode;
  patientInfo: PatientInfo;
  values: CushingValues;
  handlePatientChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setToxValue: (type: keyof CushingValues, val: any) => void;
  executeAnalysis: () => void;
}

const CushingForm: React.FC<CushingFormProps> = ({
  mode, patientInfo, values, handlePatientChange, setToxValue, executeAnalysis
}) => {
  return (
    <div className="cushing-form-container">
      {/* 환자 정보 - 갑기저/심초음파와 동일하게 2열 배치 */}
      <div className="tool-card-container">
        <div className="tool-card-title">🐾 환자 정보</div>
        <div className="patient-grid">
          <div className="pf">
            <label>이름</label>
            <input type="text" id="pt_name" value={patientInfo.name} onChange={handlePatientChange} placeholder="예: 초코" />
          </div>
          <div className="pf">
            <label>품종</label>
            <input type="text" id="pt_breed" value={patientInfo.breed} onChange={handlePatientChange} placeholder="예: 푸들" />
          </div>
          <div className="pf">
            <label>성별</label>
            <select id="pt_sex" value={patientInfo.sex} onChange={handlePatientChange}>
              <option value="">선택</option>
              <option value="남">남</option>
              <option value="중성화 남">중성화 남</option>
              <option value="여">여</option>
              <option value="중성화 여">중성화 여</option>
            </select>
          </div>
          <div className="pf">
            <label>나이</label>
            <input type="text" id="pt_age" value={patientInfo.age} onChange={handlePatientChange} placeholder="예: 9세" />
          </div>
        </div>
      </div>

      <div className="tool-card-container">
        <div className="tool-card-title">
          {mode === 'acth' ? '🧪 ACTH Stimulation Test 입력' : '💉 Pre-Pill Cortisol 입력'}
        </div>

        <div className="cat-title">① 식욕 상태</div>
        <div className="opt-group-cushing">
          {mode === 'acth' && (
            <button className={`opt-btn-cushing ${values.food === 'dec' ? 'sel-food-dec' : ''}`} onClick={() => setToxValue('food', 'dec')}>
              <strong>감소</strong><small>(구토·설사·허약)</small>
            </button>
          )}
          <button className={`opt-btn-cushing ${values.food === 'norm' ? 'sel-food-norm' : ''}`} onClick={() => setToxValue('food', 'norm')}>
            <strong>정상</strong>
          </button>
          <button className={`opt-btn-cushing ${values.food === 'inc' ? 'sel-food-inc' : ''}`} onClick={() => setToxValue('food', 'inc')}>
            <strong>증가</strong><small>(다식·헐떡임)</small>
          </button>
        </div>

        <div className="cat-title">② 다음다뇨 (PU/PD)</div>
        <div className="opt-group-cushing">
          <button className={`opt-btn-cushing ${values.pupd === 'no' ? 'sel-pupd-no' : ''}`} onClick={() => setToxValue('pupd', 'no')}>
            <strong>없음</strong>
          </button>
          <button className={`opt-btn-cushing ${values.pupd === 'yes' ? 'sel-pupd-yes' : ''}`} onClick={() => setToxValue('pupd', 'yes')}>
            <strong>있음</strong>
          </button>
        </div>

        <div className="cat-title">③ {mode === 'acth' ? 'Post' : 'Pre-Pill'} Cortisol 값</div>
        <div className="cortisol-input-row">
          <label>{mode === 'acth' ? 'Post' : 'Pre-Pill'} Cortisol</label>
          <div className="input-wrap-cushing">
            <input 
              type="number" 
              value={values.cortisol} 
              onChange={(e) => setToxValue('cortisol', e.target.value)}
              placeholder="0.00" 
              step="0.01"
            />
            <span className="unit">ug/dL</span>
          </div>
        </div>

        <button className="btn-analyze-tool" style={{ marginTop: '2rem' }} onClick={executeAnalysis}>
          <Search size={20} style={{ marginRight: '8px' }} /> 분석 실행하기
        </button>
      </div>

      <style>{`
        .patient-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .pf { display: flex; flex-direction: column; gap: 6px; }
        .pf label { font-size: .85rem; color: #4a5568; font-weight: 700; }
        .pf input, .pf select {
          padding: 10px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
          background: #fffdf0;
        }
        .pf input:focus, .pf select:focus { border-color: #3498db; }

        .opt-group-cushing {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 10px;
          margin-bottom: 1rem;
        }
        .opt-btn-cushing {
          padding: 12px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 56px; /* 높이 통일 */
        }
        .opt-btn-cushing strong { font-size: 1rem; color: #4a5568; line-height: 1.2; }
        .opt-btn-cushing small { font-size: 0.7rem; color: #94a3b8; line-height: 1.2; }
        .opt-btn-cushing:hover { border-color: #3498db; }

        .sel-food-dec { background: #fff9db !important; border-color: #f59e0b !important; }
        .sel-food-dec strong { color: #b45309 !important; }
        .sel-food-norm { background: #ecfdf5 !important; border-color: #10b981 !important; }
        .sel-food-norm strong { color: #047857 !important; }
        .sel-food-inc { background: #fef2f2 !important; border-color: #ef4444 !important; }
        .sel-food-inc strong { color: #b91c1c !important; }
        .sel-pupd-no { background: #ecfdf5 !important; border-color: #10b981 !important; }
        .sel-pupd-no strong { color: #047857 !important; }
        .sel-pupd-yes { background: #fef2f2 !important; border-color: #ef4444 !important; }
        .sel-pupd-yes strong { color: #b91c1c !important; }

        .cortisol-input-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #f8fafc;
          padding: 0 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          min-height: 56px; /* 높이 통일 */
        }
        .cortisol-input-row label { font-weight: 700; color: #1e293b; font-size: 0.95rem; }
        .input-wrap-cushing { display: flex; align-items: center; gap: 8px; height: 100%; }
        .input-wrap-cushing input {
          width: 100px;
          height: 38px; /* 내부 입력창 높이 조정 */
          padding: 0 10px;
          border-radius: 8px;
          border: 1.5px solid #cbd5e1;
          text-align: right;
          font-weight: 800;
          font-size: 1.1rem;
          color: #0f172a;
        }
        .input-wrap-cushing .unit { font-weight: 700; color: #64748b; font-size: 0.85rem; }

        .btn-analyze-tool {
          width: 100%;
          margin: 20px 0 0;
          padding: 16px;
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.25);
        }
        .btn-analyze-tool:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35);
          filter: brightness(1.05);
        }
        .btn-analyze-tool:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default CushingForm;
