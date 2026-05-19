import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Camera, Calculator, Info, Dog, Cat } from 'lucide-react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';

interface Product {
  name: string;
  kcal: number;
}

interface BrandProducts {
  [key: string]: Product[];
}

interface SpeciesConfig {
  dog: { text: string; val: number }[];
  cat: { text: string; val: number }[];
}

const statusConfig: SpeciesConfig = {
  dog: [
    { text: "비만", val: 1.0 },
    { text: "비만 경향", val: 1.4 },
    { text: "중성화 수술", val: 1.6 },
    { text: "운동량 없음", val: 1.8 },
    { text: "가벼운 운동", val: 2.0 },
    { text: "적당한 운동", val: 3.0 },
    { text: "심한 운동", val: 6.0 },
    { text: "성견 체중의 50%이하 (성장기 자견)", val: 3.0 },
    { text: "성견 체중의 50~80% (성장기 자견)", val: 2.5 },
    { text: "성견 체중의 80%이상 (성장기 자견)", val: 2.0 }
  ],
  cat: [
    { text: "비만", val: 1.0 },
    { text: "비만 경향", val: 1.0 },
    { text: "중성화 수술", val: 1.2 },
    { text: "운동량 없음", val: 1.4 },
    { text: "가벼운 운동", val: 1.6 },
    { text: "적당한 운동", val: 2.0 },
    { text: "심한 운동", val: 4.5 },
    { text: "성묘 체중의 50%이하 (성장기 자묘)", val: 3.0 },
    { text: "성묘 체중의 50~80% (성장기 자묘)", val: 2.5 },
    { text: "성묘 체중의 80%이상 (성장기 자묘)", val: 2.0 }
  ]
};

const brandProductPreset: { dog: BrandProducts; cat: BrandProducts } = {
  dog: {
    royal_canin: [
      { name: "미니 스타터 마더&베이비독", kcal: 4.26 },
      { name: "미니 인도어 퍼피", kcal: 3.91 },
      { name: "미니 인도어 어덜트", kcal: 3.78 },
      { name: "미니 어덜트", kcal: 3.96 },
      { name: "맥시 어덜트", kcal: 3.95 },
      { name: "말티즈 어덜트", kcal: 4.02 },
      { name: "푸들 어덜트", kcal: 4.06 },
      { name: "포메라니안 어덜트", kcal: 3.93 },
      { name: "처방식 - 가스트로인테스티날 (소화기)", kcal: 4.07 },
      { name: "처방식 - 가스트로인테스티날 로우 팻 (저지방)", kcal: 3.45 },
      { name: "처방식 - 유리너리 S/O (하부요로계)", kcal: 3.86 },
      { name: "처방식 - 유리너리 S/O 모더레이트 칼로리", kcal: 3.31 },
      { name: "처방식 - 레날 (만성신부전)", kcal: 3.99 },
      { name: "처방식 - 헤파틱 (간담도계)", kcal: 3.90 },
      { name: "처방식 - 아날러제닉 (아토피/알러지)", kcal: 3.88 },
      { name: "처방식 - 하이포알레르기 (저알러지)", kcal: 4.00 },
      { name: "처방식 - 새티어티 서포트 (체중 관리)", kcal: 2.86 },
      { name: "처방식 - 모빌리티 C2P+ (관절강화)", kcal: 3.68 },
      { name: "처방식 - 스킨 서포트 (피부질환)", kcal: 3.64 },
      { name: "처방식 - 화이버 리스폰스 (변비개선)", kcal: 3.68 }
    ],
    hills: [
      { name: "사이언스 다이어트 퍼피 스몰바이트", kcal: 3.81 },
      { name: "사이언스 다이어트 어덜트 스몰앤미니", kcal: 3.73 },
      { name: "사이언스 다이어트 어덜트 라이트 스몰앤미니", kcal: 2.97 },
      { name: "사이언스 다이어트 어덜트 퍼펙트다이제스천", kcal: 3.66 },
      { name: "사이언스 다이어트 어덜트 7+ 시니어", kcal: 3.62 },
      { name: "처방식 - i/d (소화기 질환 관리)", kcal: 3.71 },
      { name: "처방식 - i/d Low Fat (저지방 소화기)", kcal: 3.34 },
      { name: "처방식 - c/d Multicare (비뇨기 결석 관리)", kcal: 3.87 },
      { name: "처방식 - k/d (만성 신장병 관리)", kcal: 4.21 },
      { name: "처방식 - z/d (식이 알레르기 제어)", kcal: 3.62 },
      { name: "처방식 - d/d (피부 및 식이 알레르기)", kcal: 3.74 },
      { name: "처방식 - w/d (당뇨 및 체중 유지)", kcal: 3.24 },
      { name: "처방식 - r/d (체중 감량 전용)", kcal: 3.12 },
      { name: "처방식 - Metabolic (비만 및 요요 방지식)", kcal: 3.11 },
      { name: "처방식 - j/d (관절 건강 보호)", kcal: 3.92 }
    ],
    healmedix: [
      { name: "처방식 - 카디악 & 레날 (Heart/Kidney)", kcal: 3.95 },
      { name: "처방식 - 가스트로인테스티날 저지방 (소화기/췌장염)", kcal: 3.35 },
      { name: "처방식 - 하이포알레르기 (H/A 식의알러지)", kcal: 3.72 },
      { name: "처방식 - 하이포알레르기 컷 (H/A Cut 가수분해)", kcal: 3.65 },
      { name: "처방식 - 유리너리 (비뇨기 결석)", kcal: 3.80 },
      { name: "처방식 - 웨이트 제어 (Weight 비만관리)", kcal: 3.05 },
      { name: "처방식 - 조인트 서포트 (Joint 관절케어)", kcal: 3.60 },
      { name: "수프림 - 퍼피 (Supreme 성장기)", kcal: 3.85 },
      { name: "수프림 - 어덜트 (Supreme 성견용)", kcal: 3.68 },
      { name: "수프림 - 웨이트 케어 (체중 유지용)", kcal: 3.20 }
    ],
    velixer: [
      { name: "처방식 - AF (Atopy Free 아토피/피부)", kcal: 3.61 },
      { name: "처방식 - GF (Gut Free 위장관/소화기)", kcal: 3.55 },
      { name: "처방식 - KF (Kidney Free 신장 관리)", kcal: 3.92 },
      { name: "처방식 - UF (Urinary Free 요로 결석)", kcal: 3.67 },
      { name: "처방식 - OD (Obesity/Diabetes 비만·당뇨)", kcal: 2.95 },
      { name: "처방식 - JS (Joint Support 관절 보호)", kcal: 3.50 },
      { name: "처방식 - AG (Anti-Aging 노령견 인지장애)", kcal: 3.70 },
      { name: "일반식 - 벨릭서 내츄럴 어덜트 (유기농)", kcal: 3.63 },
      { name: "일반식 - 벨릭서 내츄럴 퍼피 (성장기)", kcal: 3.78 }
    ]
  },
  cat: {
    royal_canin: [
      { name: "마더 & 베이비캣", kcal: 4.42 },
      { name: "키튼 (성장기 묘구)", kcal: 4.10 },
      { name: "인도어 (실내묘 전용)", kcal: 3.75 },
      { name: "인도어 7+ (노령묘)", kcal: 3.79 },
      { name: "헤어볼 케어 (헤어볼 배출)", kcal: 3.76 },
      { name: "처방식 - 가스트로인테스티날 (소화계)", kcal: 4.08 },
      { name: "처방식 - 유리너리 S/O (비뇨기)", kcal: 3.87 },
      { name: "처방식 - 유리너리 S/O 올팩토리 (식욕촉진)", kcal: 3.88 },
      { name: "처방식 - 레날 (만성 신부전)", kcal: 3.92 },
      { name: "처방식 - 새티어티 (과체중 관리)", kcal: 3.09 },
      { name: "처방식 - 하이포알레르기 (알러지 차단)", kcal: 4.10 }
    ],
    hills: [
      { name: "사이언스 다이어트 키튼 치킨", kcal: 4.25 },
      { name: "사이언스 다이어트 어덜트 실내묘 치킨", kcal: 3.55 },
      { name: "사이언스 다이어트 어덜트 헤어볼 컨트롤", kcal: 3.69 },
      { name: "사이언스 다이어트 어덜트 라이트", kcal: 3.17 },
      { name: "처방식 - i/d (급만성 장염 완화)", kcal: 4.02 },
      { name: "처방식 - c/d Multicare (FIC 특발성 방광염)", kcal: 3.88 },
      { name: "처방식 - k/d (고양이 신부전 전용)", kcal: 4.22 },
      { name: "처방식 - z/d (식이 알레르기 관리)", kcal: 3.65 },
      { name: "처방식 - m/d (당뇨병 및 체중 관리)", kcal: 3.95 },
      { name: "처방식 - Metabolic (대사 활성 체중조절)", kcal: 3.48 },
      { name: "처방식 - y/d (갑상선 기능 항진증 관리)", kcal: 4.34 }
    ],
    healmedix: [
      { name: "처방식 - 펠라인 유리너리 (Feline 비뇨기 결석)", kcal: 3.82 },
      { name: "처방식 - 펠라인 레날 (Feline 신부전 관리)", kcal: 4.12 },
      { name: "처방식 - 펠라인 하이포알레르기 (식이알러지)", kcal: 3.75 },
      { name: "처방식 - 펠라인 가스트로인테스티날 (소화기)", kcal: 3.90 },
      { name: "수프림 - 펠라인 키튼 (성장기 묘구)", kcal: 4.05 },
      { name: "수프림 - 펠라인 인도어 (실내 반려묘 어덜트)", kcal: 3.65 }
    ],
    velixer: [
      { name: "처방식 - F-AF (Feline Atopy 피부 장벽 완화)", kcal: 3.72 },
      { name: "처방식 - F-KF (Feline Kidney 신부전 케어)", kcal: 4.05 },
      { name: "처방식 - F-UF (Feline Urinary 하부요로계)", kcal: 3.79 },
      { name: "처방식 - F-GF (Feline Gut 위장관 질환 완화)", kcal: 3.68 },
      { name: "처방식 - F-OD (Feline Obesity/Diabetes 비만관리)", kcal: 3.15 },
      { name: "일반식 - 벨릭서 내츄럴 펠라인 어덜트 (유기농)", kcal: 3.66 }
    ]
  }
};

const FoodAmount: React.FC = () => {
  const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petWeight, setPetWeight] = useState('');
  const [petStatus, setPetStatus] = useState<number>(1.6); // Default: 중성화 수술 (dog)
  const [brand, setBrand] = useState('royal_canin');
  const [productKcal, setProductKcal] = useState<number>(0);
  const [result, setResult] = useState<any>(null);

  const captureZoneRef = useRef<HTMLDivElement>(null);
  const resultColRef = useRef<HTMLDivElement>(null);

  // Sync petStatus when species changes
  useEffect(() => {
    setPetStatus(species === 'dog' ? 1.6 : 1.2);
    // Reset product selection
    const firstProduct = brandProductPreset[species][brand]?.[0];
    setProductKcal(firstProduct?.kcal || 0);
  }, [species, brand]);

  const calculateNutrition = () => {
    const weight = parseFloat(petWeight);
    if (isNaN(weight) || weight <= 0) {
      alert("반려동물의 체중을 정확하게 입력해 주십시오.");
      return;
    }

    if (productKcal === 0) {
      alert("유효한 사료 제품을 선택해 주십시오.");
      return;
    }

    const rer = species === 'dog' ? (weight * 30) + 70 : weight * 40;
    const der = rer * petStatus;
    const totalFoodG = der / productKcal;
    const paperCupConvert = totalFoodG / 75;

    const activeStatusText = statusConfig[species].find(s => s.val === petStatus)?.text || "기타";
    const productList = brandProductPreset[species][brand];
    const activeProductName = productList.find(p => p.kcal === productKcal)?.name || "선택된 사료";
    const brandNameMap: Record<string, string> = {
      royal_canin: "로얄캐닌",
      hills: "힐스",
      healmedix: "힐메딕스",
      velixer: "벨릭서"
    };

    setResult({
      name: petName || "반려동물",
      der: Math.round(der),
      kcalPerG: productKcal.toFixed(2),
      foodG: Math.round(totalFoodG),
      profile: `${species === 'dog' ? '개(Canine)' : '고양이(Feline)'} / ${petAge || '미입력'} / ${weight.toFixed(2)} kg`,
      status: `${activeStatusText} [Factor: ${petStatus.toFixed(1)}]`,
      rer: Math.round(rer),
      foodInfo: `[${brandNameMap[brand]}] ${activeProductName}`,
      cupInfo: `약 ${paperCupConvert.toFixed(1)} 컵`,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })
    });

    if (window.innerWidth < 1024) {
      setTimeout(() => {
        resultColRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const exportToImage = () => {
    if (!captureZoneRef.current) return;
    html2canvas(captureZoneRef.current, { scale: 2.5, useCORS: true, backgroundColor: '#ffffff' } as any)
      .then((canvas: HTMLCanvasElement) => {
        const a = document.createElement('a');
        a.download = `VET_정밀급여설계_${result?.name || '환자'}.png`;
        a.href = canvas.toDataURL('image/png');
        a.click();
      })
      .catch(() => alert("리포트 이미지 저장 중 시스템 오류가 발생했습니다."));
  };

  return (
    <div className="tool-page food-tool">
      <div className="tool-nav">
        <Link to="/" className="back-btn">
          <ChevronLeft size={20} /> 대시보드
        </Link>
      </div>

      <div className="compact-header-food">
        <div className="header-icon">🥣</div>
        <div className="header-text">
          <h1>사료량 계산기</h1>
          <p>임상 영양학 기반 정밀 급여 시뮬레이터</p>
        </div>
      </div>

      <div className="layout-grid-food">
        {/* Input Column */}
        <div className="input-col">
          {/* 1. Basic Profile */}
          <div className="card-food mb-6">
            <div className="section-title-food">
              <span className="section-title-bar-food"></span> 1. 기본 프로필 입력
            </div>

            <div className="mb-4">
              <label className="input-label-food">대상 축종</label>
              <div className="species-grid-food">
                <button 
                  className={`species-btn-food ${species === 'dog' ? 'active' : ''}`}
                  onClick={() => setSpecies('dog')}
                >
                  <Dog size={18} /> <span>강아지 (Canine)</span>
                </button>
                <button 
                  className={`species-btn-food ${species === 'cat' ? 'active' : ''}`}
                  onClick={() => setSpecies('cat')}
                >
                  <Cat size={18} /> <span>고양이 (Feline)</span>
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

            <div className="grid-2-food">
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

          {/* 2. Clinical Status & Brand */}
          <div className="card-food">
            <div className="section-title-food">
              <span className="section-title-bar-food"></span> 2. 임상 상태 및 사료 매칭
            </div>

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
                <Camera size={18} /> 임상 진단 리포트 이미지 저장
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .food-tool {
          max-width: 1000px;
          margin: 0 auto;
          background: #f8fafc;
        }
        .compact-header-food {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 2rem;
          padding: 1.75rem;
          background: #4f46e5; /* Indigo */
          color: white;
          border-radius: 20px;
          box-shadow: 0 4px 20px rgba(79, 70, 229, 0.15);
        }
        .compact-header-food .header-icon { font-size: 2.5rem; }
        .compact-header-food h1 { font-size: 1.5rem; font-weight: 800; margin: 0; }
        .compact-header-food p { font-size: 0.9rem; opacity: 0.9; margin-top: 4px; }

        .layout-grid-food {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .card-food {
          background: white;
          border-radius: 20px;
          padding: 24px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .section-title-food {
          font-size: 0.9rem;
          font-weight: 800;
          color: #0f172a;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid #f1f5f9;
        }
        .section-title-bar-food {
          width: 4px;
          height: 16px;
          background: #4f46e5;
          border-radius: 2px;
        }

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
          padding: 14px;
          border-radius: 14px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .species-btn-food.active {
          border-color: #4f46e5;
          background: #eef2ff;
          color: #4f46e5;
        }

        .input-field-food, .select-field-food {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1.5px solid #e2e8f0;
          background: #f8fafc;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field-food:focus, .select-field-food:focus {
          border-color: #4f46e5;
          background: white;
        }

        .grid-2-food {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .btn-calculate-food {
          width: 100%;
          margin-top: 24px;
          padding: 16px;
          background: #0f172a;
          color: white;
          border: none;
          border-radius: 14px;
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
          border-radius: 24px;
          border: 2px dashed #e2e8f0;
          padding: 40px;
          text-align: center;
          color: #94a3b8;
        }
        .placeholder-icon { font-size: 3.5rem; margin-bottom: 16px; }
        .result-placeholder-food h3 { font-size: 1.1rem; color: #475569; margin-bottom: 8px; }
        .result-placeholder-food p { font-size: 0.85rem; }

        .result-card-food {
          background: white;
          border-radius: 24px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }
        .result-accent-bar {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 6px;
          background: #4f46e5;
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
          color: #4f46e5;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }
        .result-header-food h2 { font-size: 1.25rem; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.4; }
        .pet-name-highlight { color: #4f46e5; }
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
          border-radius: 16px;
          padding: 16px 8px;
          text-align: center;
        }
        .metric-box-food.highlight {
          background: #eef2ff;
          border: 2px solid #c7d2fe;
        }
        .box-label { font-size: 0.65rem; font-weight: 700; color: #94a3b8; display: block; margin-bottom: 6px; line-height: 1.4; }
        .box-label.highlight { color: #4f46e5; }
        .box-value { font-size: 1.5rem; font-weight: 900; color: #0f172a; display: block; }
        .box-value.highlight { color: #4338ca; font-size: 1.8rem; }
        .box-unit { font-size: 0.75rem; font-weight: 700; color: #64748b; }
        .box-unit.highlight { color: #4338ca; }

        .details-list-food {
          background: #f8fafc;
          border-radius: 16px;
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
        .detail-value { font-size: 0.85rem; color: #0f172a; font-weight: 700; text-align: right; }
        .highlight-row { margin-top: 8px; padding-top: 15px; border-top: 2px solid #e2e8f0; }
        .cup-label { color: #4f46e5; font-weight: 800; }
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
          background: #0f172a;
          color: white;
          border: none;
          border-radius: 14px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        @media (max-width: 1024px) {
          .layout-grid-food { grid-template-columns: 1fr; }
          .compact-header-food { padding: 1.5rem; }
          .metrics-grid-food { grid-template-columns: 1fr 1fr 1fr; }
        }

        @media (max-width: 640px) {
          .metrics-grid-food { grid-template-columns: 1fr; }
          .box-value { font-size: 1.8rem; }
          .box-value.highlight { font-size: 2.2rem; }
          .detail-item-food { flex-direction: column; text-align: left; }
          .detail-value { text-align: left; margin-top: 4px; }
        }
      `}</style>
    </div>
  );
};

export default FoodAmount;
