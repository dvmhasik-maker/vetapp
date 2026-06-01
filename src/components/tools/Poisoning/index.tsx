import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePoisoningLogic } from './usePoisoningLogic';
import { toxinDatabase } from './data';
import AdSlot from '../../common/AdSlot';

const Poisoning: React.FC = () => {
  const {
    species,
    setSpecies,
    selectedToxin,
    result,
    resultRef,
    selectToxin
  } = usePoisoningLogic();

  // 가나다 순 정렬
  const sortedToxins = [...toxinDatabase].sort((a, b) => a.ko.localeCompare(b.ko, 'ko'));

  return (
    <div className={`tool-page poison-theme-${species}`}>
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <header className="page-header-tool-white">
        <div className="icon">🧪</div>
        <div>
          <h1>반려동물 중독 물질 분석기</h1>
          <p>주요 중독 물질별 진단 및 치료 프로토콜</p>
        </div>
      </header>

      <div className="tool-content-standard">
        <AdSlot className="mb-6" />

        {/* 축종 선택 탭 - 심초음파와 동일하게 카드 외부로 이동 */}
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

        {/* 물질 선택 그리드 */}
        <div className="tool-card-container">
          <div className="tool-card-title">🔍 중독 물질 선택 (가나다순)</div>
          <div className="toxin-grid">
            {sortedToxins.map((toxin) => (
              <button
                key={toxin.id}
                className={`toxin-item-btn ${selectedToxin?.id === toxin.id ? 'active' : ''}`}
                onClick={() => selectToxin(toxin.id)}
              >
                <span className="ko-name">{toxin.emoji} {toxin.ko}</span>
                <span className="en-name">{toxin.en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 결과 영역 */}
        {result && (
          <div className="poison-result-section" ref={resultRef}>
            <div className="tool-card-container result-card">
              <div className="result-header-poison">
                <div className="header-main-info">
                  <span className="result-emoji">{result.toxin.emoji}</span>
                  <div>
                    <h2>{result.toxin.ko} <span className="en-sub">{result.toxin.en}</span></h2>
                    <span className={`species-badge-${result.species}`}>
                      {result.species === 'dog' ? '🐶 강아지' : '🐱 고양이'}
                    </span>
                  </div>
                </div>
                <div className="result-date-poison">진단일: {result.date}</div>
              </div>

              <div className="poison-info-grid">
                <div className="info-box-poison">
                  <div className="info-title organ">🧠 손상 부위</div>
                  <div className="info-content">{result.toxin.organ}</div>
                </div>
                <div className="info-box-poison">
                  <div className="info-title dose">⚖️ 중독 용량 (Tox Dose)</div>
                  <div className="info-content">{result.toxin.dose}</div>
                </div>
                <div className="info-box-poison">
                  <div className="info-title symptoms">🤮 주요 임상 증상</div>
                  <div className="info-content">{result.toxin.symptoms}</div>
                </div>
                <div className="info-box-poison">
                  <div className="info-title tests">🧪 권장 진단 검사</div>
                  <div className="info-content">{result.toxin.tests}</div>
                </div>
                <div className="info-box-poison full-width">
                  <div className="info-title treatment">🏥 추천 치료 프로토콜</div>
                  <div className="info-content treatment-text">{result.toxin.treatment}</div>
                </div>
              </div>

              <div className="prognosis-duration-grid">
                <div className="extra-info-box prognosis">
                  <span className="extra-label">🔮 임상 예후 (Prognosis)</span>
                  <span className="extra-content">{result.toxin.prognosis}</span>
                </div>
                <div className="extra-info-box duration">
                  <span className="extra-label">⏱️ 중독 반응 및 지속 기간</span>
                  <span className="extra-content">{result.toxin.duration}</span>
                </div>
              </div>

              <div className="ref-label-poison">
                ※ 본 정보는 참고용이며, 최종 처방과 치료는 수의사의 임상적 판단하에 결정되어야 합니다.
              </div>
            </div>
          </div>
        )}

        <AdSlot className="mt-8" />
      </div>

      <style>{`
        .tool-content-standard {
          max-width: 1200px;
          margin: 0 auto;
        }
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
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tab-btn-tool.active {
          background: #3498db;
          color: #fff;
          box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
        }
        .tab-btn-tool:hover:not(.active) {
          background: #cbd5e1;
        }

        .toxin-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 10px;
        }
        .toxin-item-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px 8px;
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          min-height: 70px;
          font-family: inherit;
        }
        .toxin-item-btn:hover {
          border-color: #3498db;
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }
        .toxin-item-btn.active {
          background: #3498db;
          border-color: #3498db;
          color: #fff;
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
        }
        .toxin-item-btn .ko-name { font-weight: 700; font-size: 0.95rem; margin-bottom: 2px; }
        .toxin-item-btn .en-name { font-size: 0.75rem; opacity: 0.7; font-weight: 500; }
        .toxin-item-btn.active .en-name { color: rgba(255,255,255,0.9); }

        .result-card {
          border-top: 6px solid #3498db;
        }
        .poison-theme-dog .result-card { border-top-color: #f59e0b; }
        .poison-theme-cat .result-card { border-top-color: #3b82f6; }

        .result-header-poison {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #f1f5f9;
        }
        .header-main-info { display: flex; gap: 15px; align-items: center; }
        .result-emoji { font-size: 2.5rem; }
        .header-main-info h2 { font-size: 1.5rem; font-weight: 800; margin: 0; color: #1e293b; }
        .en-sub { font-size: 0.9rem; font-weight: 400; color: #64748b; margin-left: 5px; }
        .result-date-poison { font-size: 0.75rem; color: #94a3b8; }

        .species-badge-dog, .species-badge-cat {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          margin-top: 6px;
        }
        .species-badge-dog { background: #fef3c7; color: #92400e; border: 1.5px solid #fcd34d; }
        .species-badge-cat { background: #dbeafe; color: #1e40af; border: 1.5px solid #93c5fd; }

        .poison-info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }
        .info-box-poison {
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 12px;
          padding: 15px;
        }
        .info-box-poison.full-width { grid-column: span 2; }
        .info-title { font-weight: 800; font-size: 0.85rem; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; }
        .info-title.organ { color: #e11d48; }
        .info-title.dose { color: #d97706; }
        .info-title.symptoms { color: #ea580c; }
        .info-title.tests { color: #2563eb; }
        .info-title.treatment { color: #059669; }
        
        .info-content { font-size: 0.85rem; line-height: 1.6; color: #334155; white-space: pre-line; }
        .treatment-text { font-weight: 500; }

        .prognosis-duration-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .extra-info-box {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid transparent;
        }
        .extra-info-box.prognosis { background: #eef2ff; border-color: #e0e7ff; }
        .extra-info-box.duration { background: #f5f3ff; border-color: #ede9fe; }
        .extra-label { display: block; font-weight: 800; font-size: 0.8rem; color: #1e1b4b; margin-bottom: 4px; }
        .extra-content { font-size: 0.8rem; color: #312e81; line-height: 1.5; }

        .ref-label-poison {
          margin-top: 25px;
          font-size: 0.7rem;
          color: #94a3b8;
          text-align: center;
          font-style: italic;
        }

        .save-action-area {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
        }

        .btn-save-refined {
          width: 100%;
          max-width: 600px;
          padding: 16px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.05rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
        }
        .btn-save-refined:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3); filter: brightness(1.05); }

        .poison-theme-dog .tab-btn-tool.active { background: #f59e0b; box-shadow: 0 4px 6px rgba(245, 158, 11, 0.2); }
        .poison-theme-cat .tab-btn-tool.active { background: #3b82f6; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2); }

        @media (max-width: 768px) {
          .toxin-grid { grid-template-columns: repeat(2, 1fr); }
          .poison-info-grid { grid-template-columns: 1fr; }
          .info-box-poison.full-width { grid-column: span 1; }
          .prognosis-duration-grid { grid-template-columns: 1fr; }
          .result-header-poison { flex-direction: column; gap: 10px; }
        }
      `}</style>
    </div>
  );
};

export default Poisoning;
