import React from 'react';
import { ChevronLeft, Camera, Calculator, Info, Dog, Cat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFoodAmountLogic } from './useFoodAmountLogic';
import { statusConfig, brandProductPreset } from './data';
import AdSlot from '../../common/AdSlot';

const FoodAmount: React.FC = () => {
  const {
    species,
    setSpecies,
    petName,
    setPetName,
    petAge,
    setPetAge,
    petWeight,
    setPetWeight,
    petStatus,
    setPetStatus,
    brand,
    setBrand,
    productKcal,
    setProductKcal,
    result,
    captureZoneRef,
    resultColRef,
    calculateNutrition,
    exportToImage
  } = useFoodAmountLogic();

  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <div className="page-header-tool-white">
        <div className="icon">🥣</div>
        <div>
          <h1>사료량 계산기</h1>
          <p>임상 영양학 기반 정밀 급여 시뮬레이터</p>
        </div>
      </div>

      <div className="tool-content-standard">
        <AdSlot className="mb-6" />

        <div className="layout-grid-food">
          {/* Input Column */}
          <div className="input-col">
            <div className="tool-card-container">
              <div className="tool-card-title">1. 반려동물 프로필</div>

              {/* 축종 선택을 탭 스타일로 개선 */}
              <div className="species-tabs-food">
                <button 
                  className={`species-tab ${species === 'dog' ? 'active' : ''}`}
                  onClick={() => setSpecies('dog')}
                >
                  <Dog size={20} /> <span>강아지</span>
                </button>
                <button 
                  className={`species-tab ${species === 'cat' ? 'active' : ''}`}
                  onClick={() => setSpecies('cat')}
                >
                  <Cat size={20} /> <span>고양이</span>
                </button>
              </div>

              <div className="input-group-food">
                <label className="input-label-food">이름</label>
                <input 
                  type="text" 
                  value={petName} 
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="예: 보리, 나비" 
                  className="input-field-food"
                />
              </div>

              <div className="patient-grid-food">
                <div className="input-group-food no-margin">
                  <label className="input-label-food">나이</label>
                  <input 
                    type="text" 
                    value={petAge} 
                    onChange={(e) => setPetAge(e.target.value)}
                    placeholder="예: 2세" 
                    className="input-field-food"
                  />
                </div>
                <div className="input-group-food no-margin">
                  <label className="input-label-food">체중 (kg)</label>
                  <input 
                    type="number" 
                    value={petWeight} 
                    onChange={(e) => setPetWeight(e.target.value)}
                    placeholder="0.0" 
                    className="input-field-food"
                  />
                </div>
              </div>
            </div>

            <div className="tool-card-container">
              <div className="tool-card-title">2. 임상 상태 및 사료 정보</div>

              <div className="input-group-food">
                <label className="input-label-food">임상 상태 (Status Factor)</label>
                <select 
                  className="select-field-food"
                  value={petStatus}
                  onChange={(e) => setPetStatus(parseFloat(e.target.value))}
                >
                  {statusConfig[species].map((s, idx) => (
                    <option key={idx} value={s.val}>{s.text} ({s.val})</option>
                  ))}
                </select>
              </div>

              <div className="input-group-food">
                <label className="input-label-food">사료 제조사</label>
                <select 
                  className="select-field-food"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <option value="royal_canin">로얄캐닌 (Royal Canin)</option>
                  <option value="hills">힐스 (Hill's)</option>
                  <option value="healmedix">힐메딕스 (Healmedix)</option>
                  <option value="velixer">벨릭서 (Velixer)</option>
                </select>
              </div>

              <div className="input-group-food">
                <label className="input-label-food">사료 제품명</label>
                <select 
                  className="select-field-food"
                  value={productKcal}
                  onChange={(e) => setProductKcal(parseFloat(e.target.value))}
                >
                  {brandProductPreset[species][brand]?.map((p, idx) => (
                    <option key={idx} value={p.kcal}>{p.name} [{p.kcal.toFixed(2)} kcal/g]</option>
                  ))}
                </select>
              </div>

              <button onClick={calculateNutrition} className="btn-calculate-food">
                <Calculator size={20} /> 급여 가이드라인 생성하기
              </button>
            </div>
          </div>

          {/* Result Column */}
          <div className="result-col-food" ref={resultColRef}>
            {!result ? (
              <div className="result-placeholder-food">
                <div className="placeholder-icon">📋</div>
                <h3>급여 설계 준비 완료</h3>
                <p>환자 정보를 입력하고 버튼을 누르면<br/>정밀 급여량이 산출됩니다.</p>
              </div>
            ) : (
              <div className="result-content-food">
                <div className="result-card-food" ref={captureZoneRef}>
                  <div className="result-accent-bar"></div>
                  
                  <div className="result-header-food">
                    <div className="header-left">
                      <span className="prescription-badge">Dietary Guideline</span>
                      <h2><span className="pet-name-highlight">{result.name}</span> 맞춤 급여 솔루션</h2>
                    </div>
                    <span className="result-date">{result.date}</span>
                  </div>

                  <div className="metrics-grid-food">
                    <div className="metric-box-food">
                      <span className="box-label">일일 필요 열량<br/>(DER)</span>
                      <span className="box-value">{result.der}</span>
                      <span className="box-unit">kcal</span>
                    </div>
                    <div className="metric-box-food">
                      <span className="box-label">사료 에너지<br/>밀도</span>
                      <span className="box-value">{result.kcalPerG}</span>
                      <span className="box-unit">kcal/g</span>
                    </div>
                    <div className="metric-box-food highlight">
                      <span className="box-label highlight">일일 권장<br/>급여량</span>
                      <span className="box-value highlight">{result.foodG}</span>
                      <span className="box-unit highlight">g / day</span>
                    </div>
                  </div>

                  <div className="details-list-food">
                    <div className="detail-item-food">
                      <span className="detail-label">프로필 요약</span>
                      <span className="detail-value">{result.profile}</span>
                    </div>
                    <div className="detail-item-food">
                      <span className="detail-label">적용 계수</span>
                      <span className="detail-value">{result.status}</span>
                    </div>
                    <div className="detail-item-food">
                      <span className="detail-label">RER (기초대사량)</span>
                      <span className="detail-value">{result.rer} kcal</span>
                    </div>
                    <div className="detail-item-food">
                      <span className="detail-label">선택 제품</span>
                      <span className="detail-value">{result.foodInfo}</span>
                    </div>
                    <div className="detail-item-food highlight-row">
                      <div className="detail-label cup-label">
                        계량컵 환산
                        <small>종이컵(약 75g) 기준</small>
                      </div>
                      <span className="detail-value cup-value">{result.cupInfo}</span>
                    </div>
                  </div>

                  <div className="nutrition-warning-food">
                    <Info size={16} style={{ flexShrink: 0 }} />
                    <p>본 결과는 참고 수치입니다. 반려동물의 실제 체중 변화에 따라 급여량을 조절해 주세요.</p>
                  </div>
                </div>

                <button onClick={exportToImage} className="btn-save-food">
                  <Camera size={18} /> 설계표 이미지로 저장
                </button>
              </div>
            )}
          </div>
        </div>

        <AdSlot className="mt-8" />
      </div>

      <style>{`
        .tool-content-standard {
          margin: 0 auto;
        }
        .layout-grid-food {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .species-tabs-food {
          display: flex;
          gap: 8px;
          margin-bottom: 1.5rem;
          background: #f1f5f9;
          padding: 4px;
          border-radius: 12px;
        }
        .species-tab {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px;
          border-radius: 9px;
          border: none;
          background: transparent;
          font-weight: 700;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .species-tab.active {
          background: #fff;
          color: #3b82f6;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .input-group-food { margin-bottom: 1.25rem; }
        .input-group-food.no-margin { margin-bottom: 0; }
        
        .input-label-food {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          color: #475569;
          margin-bottom: 6px;
        }

        .patient-grid-food {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .input-field-food, .select-field-food {
          width: 100%;
          padding: 11px 12px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          font-size: 0.95rem;
          color: #1e293b;
          outline: none;
          transition: all 0.2s;
        }
        .input-field-food:focus, .select-field-food:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .btn-calculate-food {
          width: 100%;
          margin-top: 1rem;
          padding: 16px;
          background: #0f172a;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .btn-calculate-food:hover { background: #1e293b; transform: translateY(-1px); }
        .btn-calculate-food:active { transform: translateY(0); }

        .result-placeholder-food {
          height: 100%;
          min-height: 450px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #fff;
          border-radius: 12px;
          border: 2px dashed #e2e8f0;
          padding: 30px;
          text-align: center;
          color: #94a3b8;
        }
        .placeholder-icon { font-size: 3rem; margin-bottom: 12px; opacity: 0.4; }
        .result-placeholder-food h3 { font-size: 1.1rem; color: #475569; margin-bottom: 8px; }

        .result-card-food {
          background: #fff;
          border-radius: 16px;
          padding: 24px;
          position: relative;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }
        .result-accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 6px;
          background: #3b82f6;
          border-radius: 16px 16px 0 0;
        }

        .result-header-food {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          padding-top: 6px;
        }
        .prescription-badge {
          display: inline-block;
          background: #eff6ff;
          color: #1d4ed8;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 100px;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .result-header-food h2 { font-size: 1.2rem; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.3; }
        .pet-name-highlight { color: #3b82f6; }
        .result-date { font-size: 0.75rem; color: #94a3b8; white-space: nowrap; }

        .metrics-grid-food {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 24px;
        }
        .metric-box-food {
          background: #f8fafc;
          border-radius: 12px;
          padding: 14px 6px;
          text-align: center;
          border: 1px solid #f1f5f9;
        }
        .metric-box-food.highlight { background: #f0f7ff; border: 1.5px solid #3b82f6; }
        .box-label { font-size: 0.6rem; font-weight: 700; color: #64748b; display: block; margin-bottom: 4px; }
        .box-label.highlight { color: #3b82f6; }
        .box-value { font-size: 1.4rem; font-weight: 800; color: #1e293b; display: block; }
        .box-value.highlight { color: #1d4ed8; font-size: 1.6rem; }
        .box-unit { font-size: 0.7rem; font-weight: 600; color: #64748b; }

        .details-list-food {
          background: #f8fafc;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 24px;
        }
        .detail-item-food {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .detail-item-food:last-child { border-bottom: none; }
        .detail-label { font-size: 0.8rem; color: #64748b; font-weight: 600; }
        .detail-value { font-size: 0.85rem; color: #0f172a; font-weight: 700; text-align: right; }
        .highlight-row { margin-top: 6px; padding-top: 12px; border-top: 1.5px solid #cbd5e1; }
        .cup-label { color: #1d4ed8; font-weight: 800; font-size: 0.85rem; }
        .cup-label small { font-weight: 400; font-size: 0.65rem; color: #64748b; display: block; margin-top: 1px; }
        .cup-value { font-size: 1.15rem; color: #1d4ed8; }

        .nutrition-warning-food {
          display: flex;
          gap: 10px;
          background: #fffbeb;
          border-radius: 10px;
          padding: 12px;
          font-size: 0.75rem;
          color: #92400e;
        }

        .btn-save-food {
          width: 100%;
          margin-top: 1rem;
          padding: 14px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        @media (max-width: 1024px) {
          .layout-grid-food { grid-template-columns: 1fr; }
          .result-placeholder-food { min-height: 150px; }
        }

        @media (max-width: 640px) {
          .patient-grid-food { grid-template-columns: 1fr; gap: 0; }
          .patient-grid-food .input-group-food { margin-bottom: 1.25rem; }
          .patient-grid-food .input-group-food:last-child { margin-bottom: 0; }
          .metrics-grid-food { grid-template-columns: repeat(2, 1fr); }
          .metrics-grid-food .metric-box-food:last-child { grid-column: span 2; }
          .detail-item-food { flex-direction: column; gap: 2px; }
          .detail-value { text-align: left; }
          .result-header-food { flex-direction: column; gap: 8px; align-items: flex-start; }
          .result-date { white-space: nowrap; font-size: 0.7rem; }
        }
      `}</style>
    </div>
  );
};

export default FoodAmount;
