import React from 'react';
import { Calculator } from 'lucide-react';
import { EchoInput } from './types';

interface EchoFormProps {
  input: EchoInput;
  setInput: (i: EchoInput) => void;
  calculateEcho: () => void;
}

const EchoForm: React.FC<EchoFormProps> = ({ input, setInput, calculateEcho }) => {
  return (
    <div className="input-col">
      <div className="tool-card-container">
        <div className="tool-card-title">🐾 환자 기본 정보</div>
        <div className="pf">
          <label>체중 (kg)</label>
          <input 
            type="number" 
            value={input.weight} 
            onChange={(e) => setInput({...input, weight: e.target.value})} 
            step="0.1"
            placeholder="0.0" 
          />
        </div>
      </div>

      <div className="tool-card-container">
        <div className="tool-card-title">📏 심초음파 측정값 (mm)</div>
        
        <div className="patient-grid">
          <div className="pf">
            <label>좌심방 크기 (LA)</label>
            <input 
              type="number" 
              value={input.la} 
              onChange={(e) => setInput({...input, la: e.target.value})} 
              placeholder="0.0" 
            />
          </div>
          <div className="pf">
            <label>대동맥 직경 (Ao)</label>
            <input 
              type="number" 
              value={input.ao} 
              onChange={(e) => setInput({...input, ao: e.target.value})} 
              placeholder="0.0" 
            />
          </div>
          <div className="pf">
            <label>LVIDd (이완기)</label>
            <input 
              type="number" 
              value={input.lvidd} 
              onChange={(e) => setInput({...input, lvidd: e.target.value})} 
              placeholder="0.0" 
            />
          </div>
          <div className="pf">
            <label>LVIDs (수축기)</label>
            <input 
              type="number" 
              value={input.lvids} 
              onChange={(e) => setInput({...input, lvids: e.target.value})} 
              placeholder="0.0" 
            />
          </div>
        </div>

        <button className="btn-localize-stylish" style={{ marginTop: '1.5rem' }} onClick={calculateEcho}>
          <Calculator size={22} style={{ marginRight: '10px' }} /> 심장 지표 계산하기
        </button>
      </div>
    </div>
  );
};

export default EchoForm;
