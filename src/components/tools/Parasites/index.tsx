import React from 'react';
import { ChevronLeft, ShieldAlert, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useParasitesLogic } from './useParasitesLogic';
import { parasiteData } from './data';

const Parasites: React.FC = () => {
  const {
    selectedParasite,
    resultRef,
    handleParasiteClick
  } = useParasitesLogic();

  const sortedData = [...parasiteData].sort((a, b) => a.ko.localeCompare(b.ko, 'ko'));

  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <div className="page-header-tool-white">
        <div className="icon">🔬</div>
        <div>
          <h1>기생충 치료법 가이드</h1>
          <p>CAPC 가이드라인 종합 프로토콜</p>
        </div>
      </div>

      <div className="tool-card-container">
        <div className="tool-card-title">📋 대상 기생충 선택</div>
        <div className="tag-grid-refined">
          {sortedData.map((p, idx) => (
            <button 
              key={idx}
              className={`refined-tag ${selectedParasite?.ko === p.ko ? 'active' : ''}`}
              onClick={() => handleParasiteClick(p)}
            >
              🦠 {p.ko.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {selectedParasite && (
        <div className="result-outer-container" ref={resultRef}>
          <div className="result-header-area">
            <h2 className="main-result-title">
              🦠 {selectedParasite.ko}
            </h2>
            <p className="sub-result-title">{selectedParasite.en}</p>
            <p className="sci-name">학명: {selectedParasite.sci}</p>
          </div>

          <div className="protocol-stack">
            <div className="protocol-box dog">
              <div className="protocol-label">
                🐶 개 (Canine)
              </div>
              <div className="protocol-content">
                <div className="mini-label">부위</div>
                <p><b>{selectedParasite.dog.site}</b></p>
                <div className="mini-label" style={{ marginTop: '12px' }}>치료법</div>
                <div dangerouslySetInnerHTML={{ __html: selectedParasite.dog.treatment }} />
              </div>
            </div>

            <div className="protocol-box cat">
              <div className="protocol-label">
                🐱 고양이 (Feline)
              </div>
              <div className="protocol-content">
                <div className="mini-label">부위</div>
                <p><b>{selectedParasite.cat.site}</b></p>
                <div className="mini-label" style={{ marginTop: '12px' }}>치료법</div>
                <div dangerouslySetInnerHTML={{ __html: selectedParasite.cat.treatment }} />
              </div>
            </div>
          </div>

          <div className="clinical-notice">
            <ShieldAlert size={20} className="notice-icon" />
            <div className="notice-text">
              <strong>임상 위험성 관리 (Clinical Notice)</strong>
              <ul>
                <li>고양이에게 개 전용 외부기생충약(퍼메트린 함유) 절대 금기.</li>
                <li>인수공통감염 유의: 접촉 시 위생 장갑 착용 권장.</li>
              </ul>
            </div>
          </div>
          
          <div className="footer-ref">
            <Info size={12} /> CAPC Official Guideline & Plumb's Handbook Reference.
          </div>
        </div>
      )}

      <style>{`
        .tag-grid-refined {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 10px;
        }
        .refined-tag {
          padding: 12px 8px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s;
        }
        .refined-tag:hover { border-color: #3498db; background: #fff; }
        .refined-tag.active {
          background: #3498db;
          color: white;
          border-color: #3498db;
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
        }

        .result-outer-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          padding: 24px;
          border: 1px solid rgba(0,0,0,0.05);
          margin-bottom: 2rem;
        }

        .result-header-area {
          text-align: center;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f1f5f9;
        }
        .main-result-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 6px;
        }
        .sub-result-title { font-size: 1rem; color: var(--text-muted); font-weight: 600; margin-bottom: 4px; }
        .sci-name { font-size: 0.8rem; color: #94a3b8; font-style: italic; }

        .protocol-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 24px;
        }
        .protocol-box {
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #f1f5f9;
        }
        .protocol-label {
          padding: 12px 16px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 1rem;
        }
        .dog .protocol-label { background: #eff6ff; color: #1d4ed8; }
        .cat .protocol-label { background: #faf5ff; color: #7e22ce; }
        
        .protocol-content {
          padding: 16px;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-main);
        }
        .mini-label {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 4px;
        }
        .protocol-content ul { margin: 8px 0 0 18px; }
        .protocol-content li { margin-bottom: 8px; }

        .clinical-notice {
          background: #fff1f2;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }
        .notice-icon { color: #e11d48; flex-shrink: 0; }
        .notice-text { font-size: 0.85rem; color: #9f1239; }
        .notice-text strong { display: block; margin-bottom: 4px; font-weight: 800; }
        .notice-text ul { margin: 4px 0 0 16px; }

        .btn-save-refined {
          width: 100%;
          padding: 14px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s;
        }
        .btn-save-refined:hover { background: #059669; }

        .footer-ref {
          margin-top: 20px;
          font-size: 0.7rem;
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        @media (max-width: 768px) {
          .tag-grid-refined { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
};

export default Parasites;
