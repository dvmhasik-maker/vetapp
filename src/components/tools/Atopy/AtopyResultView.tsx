import React from 'react';
import { AtopyBreed } from './types';

interface AtopyResultViewProps {
  breed: AtopyBreed;
  resultRef: React.RefObject<HTMLDivElement>;
}

const AtopyResultView: React.FC<AtopyResultViewProps> = ({
  breed,
  resultRef
}) => {
  return (
    <div className="atopy-result-container" ref={resultRef}>
      {/* Header Bar */}
      <div className="result-header">
        <div>
          <span className="header-sub">{breed.en} Atopy Analysis</span>
          <h3 className="header-title">{breed.ko}</h3>
        </div>
      </div>

      {/* Main Content */}
      <div className="result-body">
        {/* Left: Map Image */}
        <div className="map-section">
          <div className="section-label">호발 부위 매핑 (Atopy Map)</div>
          <div className="image-wrapper">
            <img 
              src={breed.img} 
              alt={`${breed.ko} 아토피 호발부위`}
              className="atopy-map-img"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const placeholder = target.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = 'flex';
              }}
            />
            <div className="image-placeholder" style={{ display: 'none' }}>
              <span className="placeholder-icon">🖼️</span>
              <p className="placeholder-text">
                이미지 파일을 찾을 수 없습니다.<br />
                <span className="filename">{breed.img.split('/').pop()}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Data Report */}
        <div className="report-section">
          {/* Sites */}
          <div className="info-card">
            <div className="info-title sites-title">
              <span className="icon">📍</span> 주요 호발 부위 (Predilection Sites)
            </div>
            <div className="info-content sites-text">
              {breed.sites}
            </div>
          </div>

          {/* Features */}
          <div className="info-card">
            <div className="info-title features-title">
              <span className="icon">📝</span> 논문 기반 임상 특징 (Clinical Features)
            </div>
            <div className="info-content">
              <ul className="features-list">
                {breed.features.map((feat, idx) => (
                  <li key={idx}>{feat}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tips */}
          <div className="info-card">
            <div className="info-title tips-title">
              <span className="icon">💡</span> 관리 및 치료 프로토콜 (Management Tip)
            </div>
            <div className="info-content tips-text">
              {breed.tip}
            </div>
          </div>
        </div>
      </div>

      <div className="result-footer">
        Reference: Guideline Data of Canine Atopic Dermatitis | Extracted from PDF Paper
      </div>

      <style>{`
        .atopy-result-container {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e2e8f0;
          overflow: hidden;
          margin-top: 24px;
        }
        .result-header {
          background: linear-gradient(135deg, #1e40af, #3730a3);
          padding: 16px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #fff;
        }
        .header-sub {
          display: block;
          font-size: 10px;
          font-family: monospace;
          text-transform: uppercase;
          opacity: 0.8;
          letter-spacing: 1px;
        }
        .header-title {
          font-size: 1.25rem;
          font-weight: 800;
          margin: 0;
        }

        .result-body {
          padding: 24px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          background-color: rgba(239, 246, 255, 0.3);
        }
        @media (min-width: 768px) {
          .result-body { grid-template-columns: 5fr 7fr; }
        }

        .map-section {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
        }
        .section-label {
          font-size: 10px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          margin-bottom: 12px;
          letter-spacing: 0.5px;
        }
        .image-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-h: [300px];
        }
        .atopy-map-img {
          max-width: 100%;
          max-height: 340px;
          object-fit: contain;
          border-radius: 8px;
        }
        .image-placeholder {
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: #94a3b8;
          padding: 40px 20px;
        }
        .placeholder-icon { font-size: 48px; margin-bottom: 8px; }
        .placeholder-text { font-size: 12px; line-height: 1.5; }
        .filename { color: #2563eb; font-weight: 700; font-family: monospace; }

        .report-section { display: flex; flex-direction: column; gap: 16px; }
        .info-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .info-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 800;
          margin-bottom: 10px;
        }
        .sites-title { color: #1e40af; }
        .features-title { color: #312e81; }
        .tips-title { color: #065f46; }
        .icon { font-size: 16px; }

        .info-content { font-size: 14px; line-height: 1.6; color: #334155; }
        .sites-text {
          font-weight: 600;
          background: #f8fafc;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #f1f5f9;
        }
        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .features-list li {
          position: relative;
          padding-left: 18px;
          margin-bottom: 8px;
        }
        .features-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #6366f1;
          font-weight: 900;
        }
        .tips-text {
          background: rgba(16, 185, 129, 0.05);
          padding: 12px;
          border-radius: 8px;
          border: 1px solid rgba(16, 185, 129, 0.1);
          color: #065f46;
        }

        .result-footer {
          background: #fff;
          padding: 12px 24px;
          border-top: 1px solid #f1f5f9;
          text-align: right;
          font-size: 10px;
          font-family: monospace;
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
};

export default AtopyResultView;
