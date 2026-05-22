import React from 'react';
import { PawPrint, Dog, Cat, Droplets, FlaskConical } from 'lucide-react';
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
          <PawPrint size={18} /> 환자 기본 정보 입력
        </div>
        <div className="patient-grid">
          <div className="pf col-span-2 sm:col-span-1">
            <label>환자 이름</label>
            <input 
              type="text" 
              value={patient.name} 
              onChange={(e) => setPatient({...patient, name: e.target.value})} 
              placeholder="예: 대박이" 
            />
          </div>
          <div className="pf">
            <label>축종</label>
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
          <div className="pf">
            <label>체중 (kg)</label>
            <input 
              type="number" 
              value={patient.weight} 
              onChange={(e) => setPatient({...patient, weight: e.target.value})} 
              step="0.1"
              placeholder="0.0" 
            />
          </div>
        </div>
      </div>

      {/* 2. Fluid Settings */}
      <div className="tool-card-container">
        <div className="tool-card-title flex items-center gap-2">
          <Droplets size={18} /> 수액 요법 요구량 설정
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold text-slate-500">탈수율 (Dehydration %)</label>
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
            <span>0%<br/>정상</span>
            <span>5%<br/>경미</span>
            <span>8%<br/>중등도</span>
            <span>12%<br/>중증</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="pf">
            <label>지속 손실량 (ml/일)</label>
            <input 
              type="number" 
              value={input.ongoingLoss} 
              onChange={(e) => setInput({...input, ongoingLoss: e.target.value})} 
              placeholder="0" 
            />
          </div>
          <div className="pf">
            <label>수액 세트 규격</label>
            <select 
              value={input.dropFactor} 
              onChange={(e) => setInput({...input, dropFactor: e.target.value})}
            >
              <option value="60">60 gtt/mL (일반/소아용)</option>
              <option value="20">20 gtt/mL (중형견용)</option>
              <option value="15">15 gtt/mL (대형견용)</option>
              <option value="10">10 gtt/mL (대량 수액용)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. K+ Settings */}
      <div className="tool-card-container k-settings-card">
        <div className="tool-card-title flex items-center gap-2 k-title-text">
          <FlaskConical size={18} /> 혈청 칼륨(K⁺) 교정 설정
        </div>
        <div className="pf">
          <label>현재 혈청 K⁺ 농도 (mEq/L)</label>
          <input 
            type="number" 
            value={input.potassium} 
            onChange={(e) => setInput({...input, potassium: e.target.value})} 
            step="0.1"
            className="k-input-field"
          />
          <p className="k-help-text">
            * 3.5 mEq/L 미만 시 가이드라인에 따른 보충량이 자동 계산됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FluidForm;
