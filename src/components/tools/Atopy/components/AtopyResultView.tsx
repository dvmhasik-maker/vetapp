import React from 'react';
import { AtopyBreed } from '../types';
import { atopyGeneralStats } from '../data';

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
      <div className={`result-header ${breed.isSignificant ? 'significant' : 'normal'}`}>
        <div>
          <span className="header-sub">{breed.en} Atopy Analysis</span>
          <div className="title-row">
            <h3 className="header-title">{breed.ko}</h3>
            {!breed.isSignificant && (
              <span className="pattern-badge">특이 패턴 없음</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
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

            {/* Legend */}
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

        {/* Middle: Data Report */}
        <div className="report-section-full">
          <div className="info-card">
            <div className="info-title sites-title">
              <span className="icon">📍</span> 주요 호발 부위 (Predilection Sites)
            </div>
            <div className="info-content sites-text">
              {breed.sites}
            </div>
          </div>

          <div className="report-grid-sub">
            <div className="info-card">
              <div className="info-title features-title">
                <span className="icon">📝</span> 논문 기반 임상 특징 (Clinical Features)
              </div>
              <div className="info-content">
                <ul className="list-style-common features-list">
                  {breed.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="info-card">
              <div className="info-title tips-title">
                <span className="icon">💡</span> 권장 관리 포인트 (Management Tip)
              </div>
              <div className="info-content">
                <ul className="list-style-common tips-list">
                  {breed.tips.map((tip, idx) => (
                    <li key={idx}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: General Research Stats */}
        <div className="general-stats-section">
          <div className="stats-header">
            <span className="stats-icon">📊</span> {atopyGeneralStats.title}
          </div>
          <div className="stats-grid">
            <div className="stats-item">
              <div className="stats-label">평균 발병 연령</div>
              <div className="stats-value">{atopyGeneralStats.meanAge}</div>
            </div>
            <div className="stats-item">
              <div className="stats-label">성별 유병률</div>
              <div className="stats-value">{atopyGeneralStats.genderRatio}</div>
            </div>
          </div>
          <div className="stats-ranking">
            <div className="ranking-label">전체 부위별 호발 순위</div>
            <div className="ranking-list">
              {atopyGeneralStats.rankings.map((r, i) => (
                <div key={i} className="ranking-row">
                  <div className="ranking-info">
                    <span className={`ranking-num rank-${i+1}`}>{i+1}</span>
                    <span className="ranking-site">{r.site}</span>
                  </div>
                  <div className="ranking-data">
                    <div className="ranking-bar-wrapper">
                      <div className="ranking-bar" style={{ width: r.rate.includes('~') ? r.rate.split('~')[1].replace(/[^0-9]/g, '') + '%' : r.rate }}></div>
                    </div>
                    <span className="ranking-rate">{r.rate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="result-footer">
        <div className="reference-box">
          <span className="ref-label">Source</span>
          <p className="ref-text">{atopyGeneralStats.reference}</p>
        </div>
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
          padding: 24px 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #fff;
        }
        .result-header.significant {
          background: linear-gradient(135deg, #1e40af, #3730a3);
        }
        .result-header.normal {
          background: linear-gradient(135deg, #475569, #1e293b);
        }
        
        .header-sub {
          display: block;
          font-size: 11px;
          font-family: monospace;
          text-transform: uppercase;
          opacity: 0.8;
          letter-spacing: 1.5px;
          margin-bottom: 6px;
        }
        .title-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .header-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.02em;
        }
        .pattern-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .result-body {
          padding: 28px;
          display: flex;
          flex-direction: column;
          gap: 28px;
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
        }

        .prevalence-legend {
          background: #fff;
          padding: 16px 24px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }
        .legend-title {
          font-size: 12px;
          font-weight: 800;
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
        .color-box.p-100 { background-color: #ef4444; }
        .color-box.p-75 { background-color: #f97316; }
        .color-box.p-50 { background-color: #facc15; }
        .color-box.p-25 { background-color: #afddea; }
        .l-text { font-size: 11px; font-weight: 700; color: #475569; }

        .report-section-full { display: flex; flex-direction: column; gap: 20px; }
        .report-grid-sub {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) { .report-grid-sub { grid-template-columns: 1fr 1fr; } }

        .info-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.02);
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

        .list-style-common {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .list-style-common li {
          position: relative;
          padding-left: 20px;
          margin-bottom: 10px;
          color: #475569;
        }
        .list-style-common li::before {
          content: "•";
          position: absolute;
          left: 0;
          font-weight: 900;
          font-size: 1.2em;
        }
        .features-list li::before { color: #6366f1; }
        .tips-list li::before { color: #10b981; }

        .general-stats-section {
          background: #f1f5f9;
          border-radius: 16px;
          padding: 24px;
          border: 1px solid #e2e8f0;
        }
        .stats-header {
          font-size: 16px;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }
        .stats-item {
          background: #fff;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          min-width: 0;
        }
        .stats-label { font-size: 11px; font-weight: 700; color: #64748b; margin-bottom: 4px; }
        .stats-value { 
          font-size: 12px; 
          font-weight: 800; 
          color: #334155; 
          white-space: nowrap; 
          overflow: hidden; 
          text-overflow: ellipsis; 
        }

        .stats-ranking {
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }
        .ranking-label { font-size: 12px; font-weight: 800; color: #475569; margin-bottom: 16px; }
        .ranking-list { display: flex; flex-direction: column; gap: 12px; }
        .ranking-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .ranking-info { display: flex; align-items: center; gap: 8px; flex: 0 0 auto; min-width: 140px; }
        .ranking-num {
          flex: 0 0 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          font-size: 10px;
          font-weight: 900;
          color: #fff;
          background: #94a3b8;
        }
        .ranking-num.rank-1 { background: #ef4444; }
        .ranking-num.rank-2 { background: #f97316; }
        .ranking-num.rank-3 { background: #facc15; }
        .ranking-site { font-size: 12px; font-weight: 700; color: #334155; white-space: nowrap; }
        
        .ranking-data {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0; /* Important for flex child to shrink below content width */
        }
        .ranking-bar-wrapper {
          flex: 1;
          height: 6px;
          background: #f1f5f9;
          border-radius: 3px;
          position: relative;
          overflow: hidden;
        }
        .ranking-bar {
          height: 100%;
          background: #3b82f6;
          border-radius: 3px;
          transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .ranking-rate { 
          font-size: 11px; 
          font-weight: 700; 
          color: #64748b; 
          font-family: monospace; 
          white-space: nowrap;
          flex: 0 0 auto;
        }

        .result-footer {
          background: #f8fafc;
          padding: 20px 28px;
          border-top: 1px solid #f1f5f9;
        }
        .reference-box {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 8px 16px;
          box-shadow: 0 1px 2px rgba(0,0,0,0.03);
          overflow: hidden;
        }
        .ref-label {
          font-size: 9px;
          font-weight: 800;
          color: #3b82f6;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          background: #eff6ff;
          padding: 2px 6px;
          border-radius: 4px;
          white-space: nowrap;
        }
        .ref-text {
          font-size: 11px;
          color: #64748b;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }

        @media (max-width: 640px) {
          .result-header { padding: 20px; }
          .header-title { font-size: 1.25rem; }
          .result-body { padding: 20px; }
          .stats-grid { grid-template-columns: 1fr; }
          .ranking-info { min-width: 110px; }
          .ranking-row { gap: 8px; }
          .ref-text { font-size: 10px; }
        }
      `}</style>
    </div>
  );
};

export default AtopyResultView;
