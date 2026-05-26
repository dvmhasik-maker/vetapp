import React from 'react';
import { ChevronLeft, Camera, Calculator, Info, Dog, Cat } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFoodAmountLogic } from './useFoodAmountLogic';
import { statusConfig, brandProductPreset } from './data';

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

      <div className="layout-grid-food">
        {/* Input Column */}
        <div className="input-col">
          <div className="tool-card-container">
            <div className="tool-card-title">1. 기본 프로필 입력</div>

            <div className="mb-4">
              <label className="input-label-food">대상 축종</label>
              <div className="species-grid-food">
                <button 
                  className={`species-btn-food ${species === 'dog' ? 'active' : ''}`}
                  onClick={() => setSpecies('dog')}
                >
                  <Dog size={18} /> <span>강아지</span>
                </button>
                <button 
                  className={`species-btn-food ${species === 'cat' ? 'active' : ''}`}
                  onClick={() => setSpecies('cat')}
                >
                  <Cat size={18} /> <span>고양이</span>
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="input-label-food">반려동물 이름</label>
              <input 
                type="text" 
                value={petName} 
                onChange={(e) => setPetName(e.target.value)}
                placeholder="예: 보리, 나비" 
                className="input-field-food"
              />
            </div>

            <div className="patient-grid">
              <div>
                <label className="input-label-food">연령</label>
                <input 
                  type="text" 
                  value={petAge} 
                  onChange={(e) => setPetAge(e.target.value)}
                  placeholder="예: 2세" 
                  className="input-field-food"
                />
              </div>
              <div>
                <label className="input-label-food">체중 (kg)</label>
                <input 
                  type="number" 
                  value={petWeight} 
                  onChange={(e) => setPetWeight(e.target.value)}
                  placeholder="0.00" 
                  className="input-field-food"
                />
              </div>
            </div>
          </div>

          <div className="tool-card-container">
            <div className="tool-card-title">2. 임상 상태 및 사료 매칭</div>

            <div className="space-y-4-food">
              <div>
                <label className="input-label-food">반려동물 현재 상태</label>
                <select 
                  className="select-field-food"
                  value={petStatus}
                  onChange={(e) => setPetStatus(parseFloat(e.target.value))}
                >
                  {statusConfig[species].map((s, idx) => (
                    <option key={idx} value={s.val}>{s.text} (계수: {s.val})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="input-label-food">제조 회사 (Brand)</label>
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

              <div>
                <label className="input-label-food">선택 사료 제품명</label>
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
            </div>

            <button onClick={calculateNutrition} className="btn-calculate-food">
              <Calculator size={20} /> 처방 급여 가이드라인 산출
            </button>
          </div>
        </div>

        {/* Result Column */}
        <div className="result-col-food" ref={resultColRef}>
          {!result ? (
            <div className="result-placeholder-food">
              <div className="placeholder-icon">📊</div>
              <h3>급여 시뮬레이션 대기 중</h3>
              <p>환자 프로필 정보 및 급여 제품을 고르신 후 산출 버튼을 실행해 주십시오.</p>
            </div>
          ) : (
            <div className="result-content-food">
              <div className="result-card-food" ref={captureZoneRef}>
                <div className="result-accent-bar"></div>
                
                <div className="result-header-food">
                  <div className="header-left">
                    <span className="prescription-badge">Nutritional Prescription</span>
                    <h2><span className="pet-name-highlight">{result.name}</span> 환자 맞춤형 정밀 급여량 설계표</h2>
                  </div>
                  <span className="result-date">{result.date}</span>
                </div>

                <div className="metrics-grid-food">
                  <div className="metric-box-food">
                    <span className="box-label">하루 필요 에너지<br/>(DER)</span>
                    <span className="box-value">{result.der}</span>
                    <span className="box-unit">kcal</span>
                  </div>
                  <div className="metric-box-food">
                    <span className="box-label">사료 칼로리<br/>밀도</span>
                    <span className="box-value">{result.kcalPerG}</span>
                    <span className="box-unit">kcal/g</span>
                  </div>
                  <div className="metric-box-food highlight">
                    <span className="box-label highlight">일일 권장<br/>급여량</span>
                    <span className="box-value highlight">{result.foodG}</span>
                    <span className="box-unit highlight">g / 일</span>
                  </div>
                </div>

                <div className="details-list-food">
                  <div className="detail-item-food">
                    <span className="detail-label">개체 식별 데이터</span>
                    <span className="detail-value">{result.profile}</span>
                  </div>
                  <div className="detail-item-food">
                    <span className="detail-label">평가 상태 및 계수</span>
                    <span className="detail-value">{result.status}</span>
                  </div>
                  <div className="detail-item-food">
                    <span className="detail-label">휴식기 대사량 (RER)</span>
                    <span className="detail-value">{result.rer} kcal/day</span>
                  </div>
                  <div className="detail-item-food">
                    <span className="detail-label">처방 제품 상세</span>
                    <span className="detail-value">{result.foodInfo}</span>
                  </div>
                  <div className="detail-item-food highlight-row">
                    <span className="detail-label cup-label">계량 컵 환산<br/><span>(종이컵 약 75g 기준)</span></span>
                    <span className="detail-value cup-value">{result.cupInfo}</span>
                  </div>
                </div>

                <div className="nutrition-warning-food">
                  <Info size={16} />
                  <p>본 결과는 공식 가이드라인 기반 기준량입니다. 개체 대사 상태 및 환경에 따라 편차가 생길 수 있으므로 주기적으로 체중과 BCS를 체크하며 조절하십시오.</p>
                </div>
              </div>

              <button onClick={exportToImage} className="btn-save-food">
                <Camera size={18} /> 이미지 저장
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .layout-grid-food {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .mb-4 { margin-bottom: 1rem; }
        .input-label-food {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          margin-bottom: 8px;
        }

        .species-grid-food {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .species-btn-food {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .species-btn-food.active {
          border-color: #3498db;
          background: #eef2ff;
          color: #3498db;
        }

        .input-field-food, .select-field-food {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field-food:focus, .select-field-food:focus {
          border-color: #3498db;
          background: white;
        }

        .btn-calculate-food {
          width: 100%;
          margin-top: 24px;
          padding: 16px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: transform 0.1s;
        }
        .btn-calculate-food:active { transform: scale(0.98); }

        .result-placeholder-food {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 12px;
          border: 2px dashed #e2e8f0;
          padding: 40px;
          text-align: center;
          color: #94a3b8;
        }
        .placeholder-icon { font-size: 3.5rem; margin-bottom: 16px; }
        .result-placeholder-food h3 { font-size: 1.1rem; color: #475569; margin-bottom: 8px; }

        .result-card-food {
          background: white;
          border-radius: 12px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          box-shadow: var(--shadow-sm);
        }
        .result-accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 6px;
          background: #3498db;
        }

        .result-header-food {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          padding-top: 8px;
        }
        .prescription-badge {
          display: inline-block;
          background: #eef2ff;
          color: #3498db;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }
        .result-header-food h2 { font-size: 1.25rem; font-weight: 800; color: var(--primary); margin: 0; line-height: 1.4; }
        .pet-name-highlight { color: #3498db; }
        .result-date { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }

        .metrics-grid-food {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }
        .metric-box-food {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px 8px;
          text-align: center;
        }
        .metric-box-food.highlight {
          background: #eef2ff;
          border: 2px solid #c7d2fe;
        }
        .box-label { font-size: 0.65rem; font-weight: 700; color: #94a3b8; display: block; margin-bottom: 6px; line-height: 1.4; }
        .box-label.highlight { color: #3498db; }
        .box-value { font-size: 1.5rem; font-weight: 900; color: var(--primary); display: block; }
        .box-value.highlight { color: #4338ca; font-size: 1.8rem; }
        .box-unit { font-size: 0.75rem; font-weight: 700; color: #64748b; }

        .details-list-food {
          background: #f8fafc;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
          border: 1px solid #f1f5f9;
        }
        .detail-item-food {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #e2e8f0;
        }
        .detail-item-food:last-child { border-bottom: none; }
        .detail-label { font-size: 0.8rem; color: #64748b; font-weight: 600; }
        .detail-value { font-size: 0.85rem; color: var(--primary); font-weight: 700; text-align: right; }
        .highlight-row { margin-top: 8px; padding-top: 15px; border-top: 2px solid #e2e8f0; }
        .cup-label { color: #3498db; font-weight: 800; }
        .cup-label span { font-weight: 400; font-size: 0.7rem; color: #94a3b8; }
        .cup-value { font-size: 1.1rem; color: #4338ca; }

        .nutrition-warning-food {
          display: flex;
          gap: 12px;
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: 12px;
          padding: 14px;
          font-size: 0.75rem;
          color: #92400e;
          line-height: 1.6;
        }

        .btn-save-food {
          width: 100%;
          margin-top: 16px;
          padding: 14px;
          background: var(--primary);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        @media (max-width: 1024px) {
          .layout-grid-food { grid-template-columns: 1fr; }
        }

        @media (max-width: 768px) {
          .metrics-grid-food { grid-template-columns: 1fr; }
          .detail-item-food { flex-direction: column; text-align: left; }
          .detail-value { text-align: left; margin-top: 4px; }
        }
      `}</style>
    </div>
  );
};

export default FoodAmount;
