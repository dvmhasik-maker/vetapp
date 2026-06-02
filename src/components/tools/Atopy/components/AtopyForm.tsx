import React from 'react';
import { AtopyBreed } from '../types';

interface AtopyFormProps {
  breeds: AtopyBreed[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const AtopyForm: React.FC<AtopyFormProps> = ({ breeds, selectedId, onSelect }) => {
  return (
    <div className="tool-card-container">
      <div className="tool-card-title text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
        견종 선택 (Select Breed)
      </div>
      <div className="breed-grid">
        {breeds.map((breed) => (
          <button
            key={breed.id}
            type="button"
            className={`breed-btn ${selectedId === breed.id ? 'active' : ''}`}
            onClick={() => onSelect(breed.id)}
          >
            <span className="breed-name-ko">{breed.ko}</span>
            <span className="breed-name-en">{breed.en}</span>
          </button>
        ))}
      </div>

      <style>{`
        .breed-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        @media (min-width: 640px) { .breed-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (min-width: 768px) { .breed-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (min-width: 1024px) { .breed-grid { grid-template-columns: repeat(5, 1fr); } }

        .breed-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          padding: 12px 8px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .breed-btn:hover {
          border-color: #cbd5e1;
          transform: translateY(-1px);
        }
        .breed-btn.active {
          background-color: #1e40af;
          color: #ffffff;
          border-color: #1e40af;
          box-shadow: 0 4px 6px -1px rgba(30, 64, 175, 0.2);
        }
        .breed-name-ko {
          font-weight: 700;
          font-size: 0.875rem;
        }
        .breed-btn.active .breed-name-ko {
          color: #fff;
        }
        .breed-name-en {
          font-size: 11px;
          font-family: monospace;
          color: #94a3b8;
        }
        .breed-btn.active .breed-name-en {
          color: rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
};

export default AtopyForm;
