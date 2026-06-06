import React from 'react';
import { PawPrint, Dog, Cat, FlaskConical, Droplets, Syringe } from 'lucide-react';
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
  const isDog = patient.species === 'dog';
  
  const ranges = {
    tramadol: { lo: 1.30, hi: 2.60, step: 0.05, def: 1.30 },
    lidocaine: isDog 
      ? { lo: 0.60, hi: 3.00, step: 0.05, def: 1.50 }
      : { lo: 0.60, hi: 1.50, step: 0.05, def: 1.00 },
    ketamine: { lo: 0.12, hi: 1.20, step: 0.02, def: 0.60 },
  };

  const calculatePct = (val: number, min: number, max: number) => ((val - min) / (max - min)) * 100;

  return (
    <div className="input-col">
      {/* 1. Patient Info */}
      <div className="tool-card-container">
        <div className="tool-card-title flex items-center gap-2">
          <PawPrint size={18} /> 환자 기본 정보
        </div>
        
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
        
        <div className="input-group-fluid" style={{ marginBottom: '1.75rem' }}>
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

      {/* 4. Bag & Drug Settings */}
      <div className="tool-card-container tlk-red-border">
        <div className="tool-card-title flex items-center gap-2 tlk-red-text">
          <Syringe size={18} /> TLK 약물 용량 설정
        </div>

        <div className="input-group-fluid">
          <label className="field-label-tlk">수액 백 용량</label>
          <div className="species-toggle-grid">
            <button 
              className={`species-btn-small ${input.bagSize === 100 ? 'active' : ''}`}
              onClick={() => setInput({...input, bagSize: 100})}
            >
              <FlaskConical size={16} /> <span>100 mL</span>
            </button>
            <button 
              className={`species-btn-small ${input.bagSize === 500 ? 'active' : ''}`}
              onClick={() => setInput({...input, bagSize: 500})}
            >
              <Droplets size={16} /> <span>500 mL</span>
            </button>
          </div>
        </div>

        <div className="space-y-6 mt-4">
          {/* Tramadol */}
          <div className="drug-block-tlk">
            <div className="drug-header-tlk">
              <div className="drug-name-group-tlk">
                <span className="drug-dot-tlk" style={{ background: '#1a6cf5' }}></span>
                <span className="drug-name-tlk">Tramadol</span>
                <span className="drug-badge-tlk">원액 50 mg/mL</span>
              </div>
              <span className="drug-val-badge-tlk tram" style={{
                color: input.tramadol > ranges.tramadol.def ? '#0c3fa3' : input.tramadol < ranges.tramadol.def ? '#6094e8' : '#1a6cf5',
                background: input.tramadol > ranges.tramadol.def ? '#c8dafd' : input.tramadol < ranges.tramadol.def ? '#f0f5ff' : '#e8f0fe'
              }}>{input.tramadol.toFixed(2)} mg/kg/hr</span>
            </div>
            <div className="slider-wrap-tlk">
              <input 
                type="range" 
                min={ranges.tramadol.lo} max={ranges.tramadol.hi} step={ranges.tramadol.step}
                value={input.tramadol}
                onChange={(e) => setInput({...input, tramadol: parseFloat(e.target.value)})}
                className="range-tlk tram-track"
                style={{
                  background: `linear-gradient(to right, ${input.tramadol > ranges.tramadol.def ? '#1a6cf5' : '#90b8fa'} 0%, ${input.tramadol > ranges.tramadol.def ? '#1a6cf5' : '#90b8fa'} ${calculatePct(ranges.tramadol.def, ranges.tramadol.lo, ranges.tramadol.hi)}%, ${input.tramadol > ranges.tramadol.def ? '#0c3fa3' : '#e2e8f0'} ${calculatePct(ranges.tramadol.def, ranges.tramadol.lo, ranges.tramadol.hi)}%, ${input.tramadol > ranges.tramadol.def ? '#0c3fa3' : '#e2e8f0'} ${calculatePct(input.tramadol, ranges.tramadol.lo, ranges.tramadol.hi)}%, #e2e8f0 ${calculatePct(input.tramadol, ranges.tramadol.lo, ranges.tramadol.hi)}%, #e2e8f0 100%)`
                }}
              />
              <div className="def-marker-tlk" style={{ left: `${calculatePct(ranges.tramadol.def, ranges.tramadol.lo, ranges.tramadol.hi)}%` }}></div>
            </div>
            <div className="slider-labels-tlk">
              <span>{ranges.tramadol.lo.toFixed(2)}</span>
              <span className="mid" style={{ color: input.tramadol === ranges.tramadol.def ? '#1a6cf5' : '#8a96ab' }}>기본값 {ranges.tramadol.def.toFixed(2)}</span>
              <span>{ranges.tramadol.hi.toFixed(2)}</span>
            </div>
          </div>

          {/* Lidocaine */}
          <div className="drug-block-tlk">
            <div className="drug-header-tlk">
              <div className="drug-name-group-tlk">
                <span className="drug-dot-tlk" style={{ background: '#0ea370' }}></span>
                <span className="drug-name-tlk">Lidocaine</span>
                <span className="drug-badge-tlk">원액 20 mg/mL</span>
              </div>
              <span className="drug-val-badge-tlk lido" style={{
                color: input.lidocaine > ranges.lidocaine.def ? '#066344' : input.lidocaine < ranges.lidocaine.def ? '#4baf8a' : '#0ea370',
                background: input.lidocaine > ranges.lidocaine.def ? '#b5e8d4' : input.lidocaine < ranges.lidocaine.def ? '#f0fbf6' : '#e6f7f1'
              }}>{input.lidocaine.toFixed(2)} mg/kg/hr</span>
            </div>
            <div className="slider-wrap-tlk">
              <input 
                type="range" 
                min={ranges.lidocaine.lo} max={ranges.lidocaine.hi} step={ranges.lidocaine.step}
                value={input.lidocaine}
                onChange={(e) => setInput({...input, lidocaine: parseFloat(e.target.value)})}
                className="range-tlk lido-track"
                style={{
                  background: `linear-gradient(to right, ${input.lidocaine > ranges.lidocaine.def ? '#0ea370' : '#6ecfac'} 0%, ${input.lidocaine > ranges.lidocaine.def ? '#0ea370' : '#6ecfac'} ${calculatePct(ranges.lidocaine.def, ranges.lidocaine.lo, ranges.lidocaine.hi)}%, ${input.lidocaine > ranges.lidocaine.def ? '#066344' : '#e2e8f0'} ${calculatePct(ranges.lidocaine.def, ranges.lidocaine.lo, ranges.lidocaine.hi)}%, ${input.lidocaine > ranges.lidocaine.def ? '#066344' : '#e2e8f0'} ${calculatePct(input.lidocaine, ranges.lidocaine.lo, ranges.lidocaine.hi)}%, #e2e8f0 ${calculatePct(input.lidocaine, ranges.lidocaine.lo, ranges.lidocaine.hi)}%, #e2e8f0 100%)`
                }}
              />
              <div className="def-marker-tlk" style={{ left: `${calculatePct(ranges.lidocaine.def, ranges.lidocaine.lo, ranges.lidocaine.hi)}%` }}></div>
            </div>
            <div className="slider-labels-tlk">
              <span>{ranges.lidocaine.lo.toFixed(2)}</span>
              <span className="mid" style={{ color: input.lidocaine === ranges.lidocaine.def ? '#0ea370' : '#8a96ab' }}>기본값 {ranges.lidocaine.def.toFixed(2)}</span>
              <span>{ranges.lidocaine.hi.toFixed(2)}</span>
            </div>
          </div>

          {/* Ketamine */}
          <div className="drug-block-tlk">
            <div className="drug-header-tlk">
              <div className="drug-name-group-tlk">
                <span className="drug-dot-tlk" style={{ background: '#e8620a' }}></span>
                <span className="drug-name-tlk">Ketamine</span>
                <span className="drug-badge-tlk">원액 50 mg/mL</span>
              </div>
              <span className="drug-val-badge-tlk keta" style={{
                color: input.ketamine > ranges.ketamine.def ? '#8a2d00' : input.ketamine < ranges.ketamine.def ? '#d88040' : '#e8620a',
                background: input.ketamine > ranges.ketamine.def ? '#fdd0a8' : input.ketamine < ranges.ketamine.def ? '#fff5ed' : '#fef0e6'
              }}>{input.ketamine.toFixed(2)} mg/kg/hr</span>
            </div>
            <div className="slider-wrap-tlk">
              <input 
                type="range" 
                min={ranges.ketamine.lo} max={ranges.ketamine.hi} step={ranges.ketamine.step}
                value={input.ketamine}
                onChange={(e) => setInput({...input, ketamine: parseFloat(e.target.value)})}
                className="range-tlk keta-track"
                style={{
                  background: `linear-gradient(to right, ${input.ketamine > ranges.ketamine.def ? '#e8620a' : '#f5ae7a'} 0%, ${input.ketamine > ranges.ketamine.def ? '#e8620a' : '#f5ae7a'} ${calculatePct(ranges.ketamine.def, ranges.ketamine.lo, ranges.ketamine.hi)}%, ${input.ketamine > ranges.ketamine.def ? '#8a2d00' : '#e2e8f0'} ${calculatePct(ranges.ketamine.def, ranges.ketamine.lo, ranges.ketamine.hi)}%, ${input.ketamine > ranges.ketamine.def ? '#8a2d00' : '#e2e8f0'} ${calculatePct(input.ketamine, ranges.ketamine.lo, ranges.ketamine.hi)}%, #e2e8f0 ${calculatePct(input.ketamine, ranges.ketamine.lo, ranges.ketamine.hi)}%, #e2e8f0 100%)`
                }}
              />
              <div className="def-marker-tlk" style={{ left: `${calculatePct(ranges.ketamine.def, ranges.ketamine.lo, ranges.ketamine.hi)}%` }}></div>
            </div>
            <div className="slider-labels-tlk">
              <span>{ranges.ketamine.lo.toFixed(2)}</span>
              <span className="mid" style={{ color: input.ketamine === ranges.ketamine.def ? '#e8620a' : '#8a96ab' }}>기본값 {ranges.ketamine.def.toFixed(2)}</span>
              <span>{ranges.ketamine.hi.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FluidForm;