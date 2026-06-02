import React from 'react';
import { Dog, Cat, Zap } from 'lucide-react';
import { PatientData, FluidInput, TLKInput } from './types';

interface FluidFormProps {
  patient: PatientData;
  setPatient: (p: PatientData) => void;
  input: FluidInput;
  setInput: (i: FluidInput) => void;
  tlkInput: TLKInput;
  setTlkInput: (t: TLKInput) => void;
  tlkRanges: {
    tramadol: { lo: number; hi: number; step: number };
    lidocaine: { lo: number; hi: number; step: number };
    ketamine: { lo: number; hi: number; step: number };
  };
  mode: 'patient-info' | 'fluid-req' | 'potassium' | 'tlk';
}

const FluidForm: React.FC<FluidFormProps> = ({
  patient,
  setPatient,
  input,
  setInput,
  tlkInput,
  setTlkInput,
  tlkRanges,
  mode
}) => {
  return (
    <div className="input-col-inline">
      {/* 1. Patient Basic Info */}
      {mode === 'patient-info' && (
        <div className="tool-card-container h-full flex flex-col justify-center">
          <div className="tool-card-title flex items-center gap-2">
            환자 기본 정보
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
      )}

      {/* 2. Fluid Requirement Settings */}
      {mode === 'fluid-req' && (
        <div className="tool-card-container h-full">
          <div className="tool-card-title flex items-center gap-2">
            수액 요구량 설정
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
            <div className="input-group-fluid no-margin">
              <label className="input-label-fluid">지속 손실량 (ml/일)</label>
              <input 
                type="number" 
                value={input.ongoingLoss} 
                onChange={(e) => setInput({...input, ongoingLoss: e.target.value})} 
                placeholder="0" 
                className="input-field-fluid"
              />
            </div>
            <div className="input-group-fluid no-margin">
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
      )}

      {/* 3. K+ Settings */}
      {mode === 'potassium' && (
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
      )}

      {/* 4. TLK Settings */}
      {mode === 'tlk' && (
        <div className="tool-card-container tlk-settings-card-refined h-full">
          <div className="tool-card-title flex justify-between items-center">
            <div className="flex items-center gap-2 text-slate-700">
              <Zap size={18} className="text-blue-500" /> TLK CRI 설정
            </div>
          </div>

          <div className="tlk-form-content-refined mt-4 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="input-group-fluid no-margin">
                <label className="input-label-fluid">수액 백 용량</label>
                <div className="flex gap-2">
                  {['100', '500'].map(size => (
                    <button
                      key={size}
                      className={`tlk-size-btn ${tlkInput.bagSize === size ? 'active' : ''}`}
                      onClick={() => setTlkInput({...tlkInput, bagSize: size})}
                    >
                      {size}mL
                    </button>
                  ))}
                </div>
              </div>
              <div className="input-group-fluid no-margin">
                <label className="input-label-fluid">수액 투여 속도 (Multiplier)</label>
                <div className="grid grid-cols-4 gap-1">
                  {['0.5', '1.0', '1.5', '2.0'].map(mult => (
                    <button
                      key={mult}
                      className={`tlk-mult-btn ${tlkInput.fluidRate === mult ? 'active' : ''}`}
                      onClick={() => setTlkInput({...tlkInput, fluidRate: mult})}
                    >
                      {mult}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <label className="input-label-fluid text-center">약물별 Dose 설정 (mg/kg/h)</label>
              {/* Tramadol */}
              <div className="drug-slider-box">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Tramadol</span>
                  <span className="text-base font-black text-blue-600 font-mono tracking-tight">{tlkInput.tramadolDose.toFixed(2)}</span>
                </div>
                <input 
                  type="range"
                  min={tlkRanges.tramadol.lo}
                  max={tlkRanges.tramadol.hi}
                  step={tlkRanges.tramadol.step}
                  value={tlkInput.tramadolDose}
                  onChange={(e) => setTlkInput({...tlkInput, tramadolDose: parseFloat(e.target.value)})}
                  className="fluid-range-slider tlk-custom-slider tramadol"
                />
              </div>

              {/* Lidocaine */}
              <div className="drug-slider-box">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Lidocaine</span>
                  <span className="text-base font-black text-emerald-600 font-mono tracking-tight">{tlkInput.lidocaineDose.toFixed(2)}</span>
                </div>
                <input 
                  type="range"
                  min={tlkRanges.lidocaine.lo}
                  max={tlkRanges.lidocaine.hi}
                  step={tlkRanges.lidocaine.step}
                  value={tlkInput.lidocaineDose}
                  onChange={(e) => setTlkInput({...tlkInput, lidocaineDose: parseFloat(e.target.value)})}
                  className="fluid-range-slider tlk-custom-slider lidocaine"
                />
              </div>

              {/* Ketamine */}
              <div className="drug-slider-box">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Ketamine</span>
                  <span className="text-base font-black text-orange-600 font-mono tracking-tight">{tlkInput.ketamineDose.toFixed(2)}</span>
                </div>
                <input 
                  type="range"
                  min={tlkRanges.ketamine.lo}
                  max={tlkRanges.ketamine.hi}
                  step={tlkRanges.ketamine.step}
                  value={tlkInput.ketamineDose}
                  onChange={(e) => setTlkInput({...tlkInput, ketamineDose: parseFloat(e.target.value)})}
                  className="fluid-range-slider tlk-custom-slider ketamine"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .tlk-toggle-btn-refined {
          padding: 6px 14px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
          background: #f1f5f9;
          color: #94a3b8;
          border: 1.5px solid #e2e8f0;
          transition: all 0.2s;
        }
        .tlk-toggle-btn-refined.active {
          background: #3b82f6;
          color: #fff;
          border-color: #2563eb;
        }
        .tlk-size-btn, .tlk-mult-btn {
          flex: 1;
          padding: 10px;
          font-size: 0.85rem;
          font-weight: 700;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          color: #64748b;
          transition: all 0.2s;
        }
        .tlk-size-btn.active, .tlk-mult-btn.active {
          background: #eff6ff;
          border-color: #3b82f6;
          color: #1d4ed8;
          box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
        }
        .tlk-mult-btn { padding: 8px 4px; font-size: 0.75rem; }

        .tlk-custom-slider.tramadol::-webkit-slider-thumb { background: #2563eb; }
        .tlk-custom-slider.lidocaine::-webkit-slider-thumb { background: #10b981; }
        .tlk-custom-slider.ketamine::-webkit-slider-thumb { background: #f97316; }
      `}</style>
    </div>
  );
};

export default FluidForm;
