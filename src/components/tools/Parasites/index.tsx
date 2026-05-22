import React from 'react';
import { ChevronLeft, Camera, ShieldAlert, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useParasitesLogic } from './useParasitesLogic';
import { parasiteData } from './data';

const Parasites: React.FC = () => {
  const {
    selectedParasite,
    resultRef,
    handleParasiteClick,
    saveResultImg
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

          <div className="action-row">
            <button className="btn-save-refined" onClick={saveResultImg}>
              <Camera size={18} /> 결과 화면 저장
            </button>
          </div>
          
          <div className="footer-ref">
            <Info size={12} /> CAPC Official Guideline & Plumb's Handbook Reference.
          </div>
        </div>
      )}

      <style>{`
        .tool-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 1rem;
        }
        .tool-nav {
          margin-bottom: 1.5rem;
        }
        .back-btn-prominent {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          text-decoration: none;
          color: #fff;
          background-color: var(--secondary-color);
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          transition: var(--transition);
          box-shadow: 0 2px 4px rgba(52, 152, 219, 0.2);
        }
        .back-btn-prominent:hover {
          background-color: #2980b9;
          transform: translateX(-2px);
          box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
        }
        .page-header-tool-white {
          background: #fff;
          color: var(--primary-color);
          border-radius: 14px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: var(--shadow);
        }
        .page-header-tool-white .icon { font-size: 2.5rem; }
        .page-header-tool-white h1 { font-size: 1.4rem; font-weight: 700; line-height: 1.3; margin: 0; color: var(--primary-color); }
        .page-header-tool-white p { font-size: .9rem; color: var(--text-secondary); margin-top: 4px; }

        .tool-card-container {
          background: #fff;
          border-radius: 12px;
          box-shadow: var(--shadow);
          padding: 20px;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .tool-card-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--secondary-color);
          margin-bottom: 1.25rem;
          padding-bottom: 10px;
          border-bottom: 2px solid #f0f7ff;
        }

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
        .refined-tag:hover { border-color: var(--secondary-color); background: #fff; }
        .refined-tag.active {
          background: var(--secondary-color);
          color: white;
          border-color: var(--secondary-color);
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
        }

        .result-outer-container {
          background: white;
          border-radius: 12px;
          box-shadow: var(--shadow);
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
          color: var(--primary-color);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 6px;
        }
        .sub-result-title { font-size: 1rem; color: var(--text-secondary); font-weight: 600; margin-bottom: 4px; }
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
          color: var(--text-primary);
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
          .page-header-tool-white { padding: 16px; flex-direction: column; text-align: center; }
          .page-header-tool-white h1 { font-size: 1.2rem; }
          .tag-grid-refined { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
};

export default Parasites;
