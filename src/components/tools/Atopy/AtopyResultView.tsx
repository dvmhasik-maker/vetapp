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

      {/* Main Content - Vertical Layout */}
      <div className="result-body">
        
        {/* Top: Large Map Image & Legend */}
        <div className="map-section-full">
          <div className="section-label">호발 부위 매핑 (Atopy Map)</div>
          
          <div className="image-and-legend">
            <div className="image-wrapper-large">
              <img 
                src={breed.img} 
                alt={`${breed.ko} 아토피 호발부위`}
                className="atopy-map-img-large"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const placeholder = target.nextElementSibling as HTMLElement;
                  if (placeholder) placeholder.style.display = 'flex';
                }}
              />
              <div className="image-placeholder-large" style={{ display: 'none' }}>
                <span className="placeholder-icon">🖼️</span>
                <p className="placeholder-text">
                  이미지 파일을 찾을 수 없습니다.<br />
                  <span className="filename">{breed.img.split('/').pop()}</span>
                </p>
              </div>
            </div>

            {/* Legend - Based on the study's prevalence scale */}
            <div className="prevalence-legend">
              <div className="legend-title">병변 발생 빈도 (Prevalence)</div>
              <div className="legend-items">
                <div className="legend-item">
                  <span className="color-box p-100"></span>
                  <span className="l-text">76-100%</span>
                </div>
                <div className="legend-item">
                  <span className="color-box p-75"></span>
                  <span className="l-text">51-75%</span>
                </div>
                <div className="legend-item">
                  <span className="color-box p-50"></span>
                  <span className="l-text">26-50%</span>
                </div>
                <div className="legend-item">
                  <span className="color-box p-25"></span>
                  <span className="l-text">1-25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Data Report */}
        <div className="report-section-full">
          {/* Sites */}
          <div className="info-card">
            <div className="info-title sites-title">
              <span className="icon">📍</span> 주요 호발 부위 (Predilection Sites)
            </div>
            <div className="info-content sites-text">
              {breed.sites}
            </div>
          </div>

          <div className="report-grid-sub">
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
      </div>

      <div className="result-footer">
        Reference: Prevalence and lesion distribution of atopic dermatitis in small-to-medium breed dogs in Korea
      </div>

      <style>{`
        .atopy-result-container {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          border: 1px solid #e2e8f0;
          overflow: hidden;
          margin-top: 24px;
        }
        .result-header {
          background: linear-gradient(135deg, #1e40af, #3730a3);
          padding: 20px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #fff;
        }
        .header-sub {
          display: block;
          font-size: 11px;
          font-family: monospace;
          text-transform: uppercase;
          opacity: 0.8;
          letter-spacing: 1.5px;
          margin-bottom: 4px;
        }
        .header-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.02em;
        }

        .result-body {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 28px;
          background-color: #fff;
        }

        .map-section-full {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
        }
        .section-label {
          font-size: 11px;
          font-weight: 800;
          color: #64748b;
          text-transform: uppercase;
          margin-bottom: 20px;
          letter-spacing: 1px;
          text-align: center;
        }

        .image-and-legend {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .image-wrapper-large {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          border-radius: 12px;
          padding: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .atopy-map-img-large {
          max-width: 100%;
          height: auto;
          max-height: 800px;
          object-fit: contain;
          border-radius: 4px;
          /* Optimization for sharpness */
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          transform: translateZ(0); /* Trigger hardware acceleration */
          -webkit-backface-visibility: hidden;
        }

        .prevalence-legend {
          background: #fff;
          padding: 16px 24px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        }
        .legend-title {
          font-size: 12px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 12px;
          text-align: center;
        }
        .legend-items {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .color-box {
          width: 16px;
          height: 16px;
          border-radius: 3px;
          border: 1px solid rgba(0,0,0,0.1);
        }
        .color-box.p-100 { background-color: #ef4444; } /* Red */
        .color-box.p-75 { background-color: #f97316; }  /* Orange */
        .color-box.p-50 { background-color: #facc15; }  /* Yellow */
        .color-box.p-25 { background-color: #afddea; }  /* Custom Skyblue */
        
        .l-text {
          font-size: 11px;
          font-weight: 700;
          color: #475569;
        }

        .report-section-full { display: flex; flex-direction: column; gap: 20px; }
        .report-grid-sub {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .report-grid-sub { grid-template-columns: 1fr 1fr; }
        }

        .info-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
          transition: transform 0.2s;
        }
        .info-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .info-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          font-weight: 800;
          margin-bottom: 14px;
        }
        .sites-title { color: #1e40af; }
        .features-title { color: #312e81; }
        .tips-title { color: #065f46; }
        .icon { font-size: 18px; }

        .info-content { font-size: 14px; line-height: 1.7; color: #334155; }
        .sites-text {
          font-weight: 700;
          font-size: 15px;
          background: #eff6ff;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #dbeafe;
          color: #1e40af;
        }
        .features-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .features-list li {
          position: relative;
          padding-left: 20px;
          margin-bottom: 10px;
          color: #475569;
        }
        .features-list li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #6366f1;
          font-weight: 900;
          font-size: 1.2em;
        }
        .tips-text {
          background: #ecfdf5;
          padding: 16px;
          border-radius: 12px;
          border: 1px solid #d1fae5;
          color: #065f46;
          font-weight: 500;
        }

        .result-footer {
          background: #f8fafc;
          padding: 16px 28px;
          border-top: 1px solid #f1f5f9;
          text-align: center;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          line-height: 1.4;
        }

        @media (max-width: 640px) {
          .result-header { padding: 16px 20px; }
          .header-title { font-size: 1.25rem; }
          .result-body { padding: 20px; }
          .legend-items { gap: 10px; }
          .color-box { width: 14px; height: 14px; }
          .l-text { font-size: 10px; }
        }
      `}</style>
    </div>
  );
};

export default AtopyResultView;
