import { Calculator, Camera } from 'lucide-react';
import { Species, PatientInfo, DogInput, CatInput } from './types';

interface EchoFormProps {
  species: Species;
  setSpecies: (s: Species) => void;
  patientInfo: PatientInfo;
  setPatientInfo: (p: PatientInfo) => void;
  dogInput: DogInput;
  setDogInput: (d: DogInput) => void;
  catInput: CatInput;
  setCatInput: (c: CatInput) => void;
  calculateEcho: () => void;
  saveImg: () => void;
  result: boolean;
}

const EchoForm: React.FC<EchoFormProps> = ({
  species, setSpecies,
  patientInfo, setPatientInfo,
  dogInput, setDogInput,
  catInput, setCatInput,
  calculateEcho, saveImg, result
}) => {
  const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPatientInfo({ ...patientInfo, [e.target.id.replace('pt_', '')]: e.target.value });
  };

  const handleDogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDogInput({ ...dogInput, [e.target.id.replace('dog_', '')]: e.target.value });
  };

  const handleCatChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target.type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const currentForm = catInput.LVform;
      if (checkbox.checked) {
        setCatInput({ ...catInput, LVform: [...currentForm, checkbox.value] });
      } else {
        setCatInput({ ...catInput, LVform: currentForm.filter(v => v !== checkbox.value) });
      }
    } else {
      setCatInput({ ...catInput, [e.target.id.replace('cat_', '')]: e.target.value });
    }
  };

  return (
    <div className="echo-form-container">
      {/* 종 선택 탭 */}
      <div className="tab-container-tool">
        <button 
          className={`tab-btn-tool ${species === 'dog' ? 'active' : ''}`}
          onClick={() => setSpecies('dog')}
        >
          🐶 강아지
        </button>
        <button 
          className={`tab-btn-tool ${species === 'cat' ? 'active' : ''}`}
          onClick={() => setSpecies('cat')}
        >
          🐱 고양이
        </button>
      </div>

      {/* 환자 정보 - 갑기저와 동일하게 수정 */}
      <div className="tool-card-container">
        <div className="tool-card-title">🐾 환자 정보</div>
        <div className="patient-grid">
          <div className="pf">
            <label>이름</label>
            <input type="text" id="pt_name" value={patientInfo.name} onChange={handlePatientChange} placeholder="예: 초코" />
          </div>
          <div className="pf">
            <label>품종</label>
            <input type="text" id="pt_breed" value={patientInfo.breed} onChange={handlePatientChange} placeholder="예: 말티즈" />
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
            <input type="text" id="pt_age" value={patientInfo.age} onChange={handlePatientChange} placeholder="예: 5세" />
          </div>
        </div>
      </div>

      {/* 강아지 입력 폼 */}
      {species === 'dog' && (
        <div className="dog-form">
          <div className="tool-card-container">
            <div className="tool-card-title">⚖️ 기본 정보</div>
            <div className="pf-horizontal">
              <label>체중 (kg)</label>
              <input type="number" id="dog_weight" value={dogInput.weight} onChange={handleDogChange} step="0.1" placeholder="예: 5.0" />
            </div>
          </div>

          <div className="tool-card-container">
            <div className="cat-title">RPLA5C</div>
            <div className="pf-horizontal"><label>LVOT 길이 (cm)</label><input type="number" id="dog_LVOT_len" value={dogInput.LVOT_len} onChange={handleDogChange} step="any" /></div>

            <div className="cat-title">RPSALV</div>
            <div className="vertical-form">
              <div className="pf-horizontal"><label>IVSd (cm)</label><input type="number" id="dog_IVSd" value={dogInput.IVSd} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>LVIDd (cm)</label><input type="number" id="dog_LVIDd" value={dogInput.LVIDd} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>LVPWd (cm)</label><input type="number" id="dog_LVPWd" value={dogInput.LVPWd} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>LVIDs (cm)</label><input type="number" id="dog_LVIDs" value={dogInput.LVIDs} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>FS (%)</label><input type="number" id="dog_FS" value={dogInput.FS} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>EPSS (cm)</label><input type="number" id="dog_EPSS" value={dogInput.EPSS} onChange={handleDogChange} step="any" /></div>
            </div>

            <div className="cat-title">RPSAAO</div>
            <div className="vertical-form">
              <div className="pf-horizontal"><label>LA 길이 (cm)</label><input type="number" id="dog_LA_len" value={dogInput.LA_len} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>LA/Ao ratio</label><input type="number" id="dog_LA_Ao" value={dogInput.LA_Ao} onChange={handleDogChange} step="any" /></div>
            </div>

            <div className="cat-title">RPSAPA</div>
            <div className="vertical-form">
              <div className="pf-horizontal"><label>MPA/Ao ratio</label><input type="number" id="dog_MPA_Ao" value={dogInput.MPA_Ao} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>RPAD index (%)</label><input type="number" id="dog_RPAD" value={dogInput.RPAD} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>PV 속도 (m/s)</label><input type="number" id="dog_PA_vel" value={dogInput.PA_vel} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>PR 속도 (m/s)</label><input type="number" id="dog_PR_vel" value={dogInput.PR_vel} onChange={handleDogChange} step="any" /></div>
            </div>

            <div className="cat-title">LA4C</div>
            <div className="vertical-form">
              <div className="pf-horizontal"><label>MV E (m/s)</label><input type="number" id="dog_MV_E" value={dogInput.MV_E} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>DTE (ms)</label><input type="number" id="dog_DTE" value={dogInput.DTE} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>MV A (m/s)</label><input type="number" id="dog_MV_A" value={dogInput.MV_A} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>MCO (ms)</label><input type="number" id="dog_MCO" value={dogInput.MCO} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>MV E' (cm/s)</label><input type="number" id="dog_MV_Eprime" value={dogInput.MV_Eprime} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>MV A' (cm/s)</label><input type="number" id="dog_MV_Aprime" value={dogInput.MV_Aprime} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>MV S' (cm/s)</label><input type="number" id="dog_MV_Sprime" value={dogInput.MV_Sprime} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>MR 속도 (m/s)</label><input type="number" id="dog_MR_vel" value={dogInput.MR_vel} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>MR Vol (mL)</label><input type="number" id="dog_MR_Vol" value={dogInput.MR_Vol} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>MR V1-V3 (ms)</label><input type="number" id="dog_MR_V1V3" value={dogInput.MR_V1V3} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>TR Fraction (%)</label><input type="number" id="dog_TR_Frac" value={dogInput.TR_Frac} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>TR 속도 (m/s)</label><input type="number" id="dog_TR_vel" value={dogInput.TR_vel} onChange={handleDogChange} step="any" /></div>
            </div>

            <div className="cat-title">LA5C</div>
            <div className="vertical-form">
              <div className="pf-horizontal"><label>LVOT VTI (cm)</label><input type="number" id="dog_LVOT_VTI" value={dogInput.LVOT_VTI} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>AV VTI (cm)</label><input type="number" id="dog_AV_VTI" value={dogInput.AV_VTI} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>AV 속도 (m/s)</label><input type="number" id="dog_AV_vel" value={dogInput.AV_vel} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>LV ET (ms)</label><input type="number" id="dog_LV_ET" value={dogInput.LV_ET} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>LV PEP (ms)</label><input type="number" id="dog_LV_PEP" value={dogInput.LV_PEP} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>HR (bpm)</label><input type="number" id="dog_HR" value={dogInput.HR} onChange={handleDogChange} step="any" /></div>
              <div className="pf-horizontal"><label>IVRT (ms)</label><input type="number" id="dog_IVRT" value={dogInput.IVRT} onChange={handleDogChange} step="any" /></div>
            </div>
          </div>
        </div>
      )}

      {/* 고양이 입력 폼 */}
      {species === 'cat' && (
        <div className="cat-form">
          <div className="tool-card-container">
            <div className="tool-card-title">⚖️ 기본 정보</div>
            <div className="pf-horizontal">
              <label>체중 (kg)</label>
              <input type="number" id="cat_weight" value={catInput.weight} onChange={handleCatChange} step="0.1" placeholder="예: 5.0" />
            </div>
          </div>

          <div className="tool-card-container">
            <div className="cat-title">RPLA4C</div>
            <div className="pf">
              <label>LV 형태</label>
              <div className="lv-form-grid">
                <div className="lv-col">
                  {['Normal'].map(val => (
                    <label key={val} className={`chk-label ${catInput.LVform.includes(val) ? 'checked' : ''}`}>
                      <input type="checkbox" value={val} checked={catInput.LVform.includes(val)} onChange={handleCatChange} /> {val}
                    </label>
                  ))}
                </div>
                <div className="lv-col">
                  {['Diffuse symmetric', 'Diffuse asymmetric IVS', 'Diffuse asymmetric LVFW'].map(val => (
                    <label key={val} className={`chk-label ${catInput.LVform.includes(val) ? 'checked' : ''}`}>
                      <input type="checkbox" value={val} checked={catInput.LVform.includes(val)} onChange={handleCatChange} /> {val}
                    </label>
                  ))}
                </div>
                <div className="lv-col">
                  {['Segmental Basal IVS', 'Segmental Apical'].map(val => (
                    <label key={val} className={`chk-label ${catInput.LVform.includes(val) ? 'checked' : ''}`}>
                      <input type="checkbox" value={val} checked={catInput.LVform.includes(val)} onChange={handleCatChange} /> {val}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="vertical-form" style={{ marginTop: '1.5rem' }}>
              <div className="pf-horizontal">
                <label>SEC (smoke)</label>
                <select id="cat_SEC" value={catInput.SEC} onChange={handleCatChange}>
                  <option value="">선택</option>
                  <option value="있음">있음</option>
                  <option value="없음">없음</option>
                </select>
              </div>
              <div className="pf-horizontal"><label>2D: IVSd (mm)</label><input type="number" id="cat_D2_IVSd" value={catInput.D2_IVSd} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>2D: LVPWd (mm)</label><input type="number" id="cat_D2_LVPWd" value={catInput.D2_LVPWd} onChange={handleCatChange} step="any" /></div>
            </div>

            <div className="cat-title">RPLA5C</div>
            <div className="vertical-form">
              <div className="pf-horizontal"><label>LVOT 길이 (cm)</label><input type="number" id="cat_LVOT_len" value={catInput.LVOT_len} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal">
                <label>LVOT Turbulence</label>
                <select id="cat_LVOT_turb" value={catInput.LVOT_turb} onChange={handleCatChange}>
                  <option value="">선택</option>
                  <option value="있음">있음</option>
                  <option value="없음">없음</option>
                </select>
              </div>
              <div className="pf-horizontal">
                <label>SAM (LVOT 폐쇄)</label>
                <select id="cat_SAM" value={catInput.SAM} onChange={handleCatChange}>
                  <option value="">선택</option>
                  <option value="있음">있음</option>
                  <option value="없음">없음</option>
                </select>
              </div>
            </div>

            <div className="cat-title">RPSALV</div>
            <div className="vertical-form">
              <div className="pf-horizontal"><label>2D: LV wall (mm)</label><input type="number" id="cat_D2_LVwall" value={catInput.D2_LVwall} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal">
                <label>PM</label>
                <select id="cat_PM" value={catInput.PM} onChange={handleCatChange}>
                  <option value="">선택</option>
                  <option value="Normal">Normal</option>
                  <option value="Thickness">Thickness</option>
                  <option value="Hyperecho">Hyperecho</option>
                </select>
              </div>
              <div className="pf-horizontal"><label>M: IVSd (cm)</label><input type="number" id="cat_M_IVSd" value={catInput.M_IVSd} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>M: LVIDd (cm)</label><input type="number" id="cat_M_LVIDd" value={catInput.M_LVIDd} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>M: LVPWd (cm)</label><input type="number" id="cat_M_LVPWd" value={catInput.M_LVPWd} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>M: LVIDs (cm)</label><input type="number" id="cat_M_LVIDs" value={catInput.M_LVIDs} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>FS (%)</label><input type="number" id="cat_FS" value={catInput.FS} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>EPSS (cm)</label><input type="number" id="cat_EPSS" value={catInput.EPSS} onChange={handleCatChange} step="any" /></div>
            </div>

            <div className="cat-title">RPSAAO</div>
            <div className="vertical-form">
              <div className="pf-horizontal"><label>LA 길이 (cm)</label><input type="number" id="cat_LA_len" value={catInput.LA_len} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>LA/Ao ratio</label><input type="number" id="cat_LA_Ao" value={catInput.LA_Ao} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>M: LAFS (%)</label><input type="number" id="cat_M_LAFS" value={catInput.M_LAFS} onChange={handleCatChange} step="any" /></div>
            </div>

            <div className="cat-title">LA4C</div>
            <div className="vertical-form">
              <div className="pf-horizontal">
                <label>PV Turbulence</label>
                <select id="cat_PA_turb" value={catInput.PA_turb} onChange={handleCatChange}>
                  <option value="">선택</option>
                  <option value="있음">있음</option>
                  <option value="없음">없음</option>
                </select>
              </div>
              <div className="pf-horizontal"><label>PV 속도 (m/s)</label><input type="number" id="cat_PA_vel" value={catInput.PA_vel} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>PR 속도 (m/s)</label><input type="number" id="cat_PR_vel" value={catInput.PR_vel} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>MV E (m/s)</label><input type="number" id="cat_MV_E" value={catInput.MV_E} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>MV A (m/s)</label><input type="number" id="cat_MV_A" value={catInput.MV_A} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>MCO (ms)</label><input type="number" id="cat_MCO" value={catInput.MCO} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>MV E' (cm/s)</label><input type="number" id="cat_MV_Eprime" value={catInput.MV_Eprime} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>MV A' (cm/s)</label><input type="number" id="cat_MV_Aprime" value={catInput.MV_Aprime} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>MV S' (cm/s)</label><input type="number" id="cat_MV_Sprime" value={catInput.MV_Sprime} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>MR 속도 (m/s)</label><input type="number" id="cat_MR_vel" value={catInput.MR_vel} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>MR VTI</label><input type="number" id="cat_MR_VTI" value={catInput.MR_VTI} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>TR 속도 (m/s)</label><input type="number" id="cat_TR_vel" value={catInput.TR_vel} onChange={handleCatChange} step="any" /></div>
            </div>

            <div className="cat-title">LA5C</div>
            <div className="vertical-form">
              <div className="pf-horizontal"><label>LVOT VTI (cm)</label><input type="number" id="cat_LVOT_VTI" value={catInput.LVOT_VTI} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>HR (bpm)</label><input type="number" id="cat_HR" value={catInput.HR} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>AV 속도 (m/s)</label><input type="number" id="cat_AV_vel" value={catInput.AV_vel} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>ET (ms)</label><input type="number" id="cat_ET" value={catInput.ET} onChange={handleCatChange} step="any" /></div>
              <div className="pf-horizontal"><label>PEP (ms)</label><input type="number" id="cat_PEP" value={catInput.PEP} onChange={handleCatChange} step="any" /></div>
            </div>
          </div>
        </div>
      )}

      <div className="action-area-common">
        <button className="btn-primary-action" onClick={calculateEcho}>
          <Calculator size={20} /> 심장 초음파 분석 실행
        </button>
        {result && (
          <button className="btn-secondary-action" onClick={saveImg}>
            <Camera size={20} /> 분석 결과 리포트 이미지 저장
          </button>
        )}
      </div>

      <style>{`
        .tab-container-tool {
          display: flex;
          gap: 10px;
          margin-bottom: 1.5rem;
        }
        .tab-btn-tool {
          flex: 1;
          padding: 14px;
          font-size: 1rem;
          font-weight: 700;
          background: #e2e8f0;
          color: #4a5568;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tab-btn-tool.active {
          background: #3498db;
          color: #fff;
          box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
        }
        .tab-btn-tool:hover:not(.active) {
          background: #cbd5e1;
        }

        .tool-card-container {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          padding: 20px;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .tool-card-title {
          font-size: 1rem;
          font-weight: 700;
          color: #3498db;
          margin-bottom: 1.25rem;
          padding-bottom: 10px;
          border-bottom: 2px solid #f0f7ff;
        }

        .patient-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .vertical-form { display: flex; flex-direction: column; gap: 15px; }
        .pf { display: flex; flex-direction: column; gap: 6px; }
        .pf-horizontal {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 8px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .pf-horizontal:last-child { border-bottom: none; }
        .pf-horizontal label { font-size: .9rem; color: #4a5568; font-weight: 700; flex: 1; }
        .pf-horizontal input, .pf-horizontal select {
          width: 140px;
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
          background: #fffdf0;
          text-align: center;
          text-align-last: center;
        }
        .pf-horizontal input:focus, .pf-horizontal select:focus { border-color: #3498db; }
        .pf label { font-size: .85rem; color: #4a5568; font-weight: 700; }
        .pf input, .pf select {
          padding: 10px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
          background: #fffdf0;
          text-align: center;
          text-align-last: center;
        }
        .pf input:focus, .pf select:focus { border-color: #3498db; }

        .cat-title {
          font-size: .95rem;
          font-weight: 700;
          color: #2c3e50;
          background: #f0f7ff;
          padding: 10px 14px;
          border-radius: 8px;
          margin: 20px 0 12px;
          border-left: 4px solid #3498db;
        }
        
        .pair-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .chk-label {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border: 2px solid #f1f5f9;
          border-radius: 10px;
          background: #f8fafc;
          cursor: pointer;
          transition: all 0.2s;
          font-size: .8rem;
          color: #475569;
          min-height: 52px;
          line-height: 1.3;
        }
        .chk-label input { width: 18px; height: 18px; }
        .chk-label.checked {
          background: #e0f2fe;
          border-color: #3498db;
          color: #2980b9;
          font-weight: 700;
        }

        .lv-form-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-top: 5px;
        }
        .lv-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        @media (max-width: 640px) {
          .patient-grid, .pair-grid, .lv-form-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default EchoForm;
