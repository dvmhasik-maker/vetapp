import React from 'react';
import { PawPrint, Dog, Cat } from 'lucide-react';
import { PatientData, FluidInput } from './types';

interface FluidFormProps {
  patient: PatientData;
  setPatient: (p: PatientData) => void;
  input: FluidInput;
  setInput: (i: FluidInput) => void;
}

const FluidForm: React.FC<FluidFormProps> = ({
  patient,
  setPatient,
  input,
  setInput
}) => {
  return (
    <div className="input-col">
      {/* 1. Patient Info */}
      <div className="tool-card-container">
        <div className="tool-card-title flex items-center gap-2">
          <PawPrint size={18} /> 🐾 환자 기본 정보
        </div>
        
        {/* 축종 선택을 가장 위로 이동 및 라벨 삭제 */}
        <div className="input-group-fluid">
          <div className="species-toggle-grid">
            <button 
              className={`species-btn-small ${patient.species === 'dog' ? 'active' : ''}`}
              onClick={() => setPatient({...patient, species: 'dog'})}
            >
              <Dog size={16} /> <span>강아지</span>
            </button>
            <button 
              className={`species-btn-small ${patient.species === 'cat' ? 'active' : ''}`}
              onClick={() => setPatient({...patient, species: 'cat'})}
            >
              <Cat size={16} /> <span>고양이</span>
            </button>
          </div>
        </div>

        <div className="input-group-fluid no-margin">
          <label className="input-label-fluid">체중 (kg)</label>
          <input 
            type="number" 
            value={patient.weight} 
            onChange={(e) => setPatient({...patient, weight: e.target.value})} 
            step="0.1"
            placeholder="0.0" 
            className="input-field-fluid-large"
          />
        </div>
      </div>

      {/* 2. Fluid Settings */}
      <div className="tool-card-container">
        <div className="tool-card-title flex items-center gap-2">
          💧 수액 요구량 설정
        </div>
        
        <div className="input-group-fluid">
          <div className="flex justify-between items-center mb-2">
            <label className="input-label-fluid">탈수율 (Dehydration %)</label>
            <span className="dehydration-badge">{input.dehydration} %</span>
          </div>
          <input 
            type="range" 
            min="0" max="12" step="1" 
            value={input.dehydration}
            onChange={(e) => setInput({...input, dehydration: parseInt(e.target.value)})}
            className="fluid-range-slider"
          />
          <div className="dehydration-ticks">
            <span>0% (정상)</span>
            <span>5% (경미)</span>
            <span>8% (중등도)</span>
            <span>12% (중증)</span>
          </div>
        </div>

        <div className="patient-grid-fluid">
          <div className="input-group-fluid">
            <label className="input-label-fluid">지속 손실량 (ml/일)</label>
            <input 
              type="number" 
              value={input.ongoingLoss} 
              onChange={(e) => setInput({...input, ongoingLoss: e.target.value})} 
              placeholder="0" 
              className="input-field-fluid"
            />
          </div>
          <div className="input-group-fluid">
            <label className="input-label-fluid">수액 세트 규격</label>
            <select 
              value={input.dropFactor} 
              onChange={(e) => setInput({...input, dropFactor: e.target.value})}
              className="select-field-fluid"
            >
              <option value="60">60 gtt/mL (소아용)</option>
              <option value="20">20 gtt/mL (중형견)</option>
              <option value="15">15 gtt/mL (대형견)</option>
              <option value="10">10 gtt/mL (대량)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. K+ Settings */}
      <div className="tool-card-container k-settings-card">
        <div className="tool-card-title flex items-center gap-2 k-title-text">
          🧪 K⁺ 교정 설정
        </div>
        <div className="input-group-fluid no-margin">
          <label className="input-label-fluid">현재 혈청 K⁺ 농도 (mEq/L)</label>
          <input 
            type="number" 
            value={input.potassium} 
            onChange={(e) => setInput({...input, potassium: e.target.value})} 
            step="0.1"
            className="input-field-fluid k-input-field"
          />
          <p className="k-help-text">
            * 3.5 mEq/L 미만 시 가이드라인 보충량이 자동 계산됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FluidForm;
