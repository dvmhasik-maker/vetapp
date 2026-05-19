import React, { useState, useRef } from 'react';
import { ChevronLeft, Camera, ShieldAlert, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';

interface ParasiteInfo {
  site: string;
  treatment: string;
}

interface ParasiteData {
  ko: string;
  en: string;
  sci: string;
  dog: ParasiteInfo;
  cat: ParasiteInfo;
}

const parasiteData: ParasiteData[] = [
  {
    ko: "원충 (기아르디아 / 콕시듐 등)",
    en: "Protozoa (Giardia, Coccidia spp.)",
    sci: "Giardia duodenalis / Cystoisospora spp.",
    dog: {
      site: "소장 점막 상피세포 및 장관 내 고착 생존",
      treatment: `
        <ul>
          <li><b>Giardia 치료:</b> Fenbendazole 50 mg/kg, PO, q24h 간격으로 3~5일 연속 투여 (가장 안전). 또는 Metronidazole 25 mg/kg, PO, q12h 간격으로 5~7일간 투여.</li>
          <li><b>Coccidia 치료:</b> Sulfadimethoxine 부하량 55 mg/kg 1회 투여 후 유지량 27.5 mg/kg, PO, q24h로 증상 소실 시까지 투여. Ponazuril 20~50 mg/kg, PO, 1~3일 투여도 효과적.</li>
        </ul>
      `
    },
    cat: {
      site: "소장 및 대장 장관 내 점막",
      treatment: `
        <ul>
          <li><b>Giardia 치료:</b> Fenbendazole 50 mg/kg, PO, q24h 간격으로 3~5일 연속 투여. 고양이는 Metronidazole 전정신경독성에 매우 민감하므로 <b>일일 총량이 25mg/kg/day를 넘지 않도록 극도로 주의</b>.</li>
          <li><b>Coccidia 치료:</b> Sulfadimethoxine 부하량 55 mg/kg 복용 후 27.5 mg/kg, PO, q24h 간격으로 5~10일간 유지. Ponazuril 20 mg/kg 단회 혹은 3일 요법 가능.</li>
        </ul>
      `
    }
  },
  {
    ko: "편충",
    en: "Whipworms",
    sci: "Trichuris vulpis",
    dog: {
      site: "맹장 및 대장 점막 (Cecum & Colon)",
      treatment: `
        <ul>
          <li><b>Fenbendazole:</b> 50 mg/kg, PO, q24h 간격으로 <b>3일 연속 투여</b>. 충란의 생활사를 고려하여 <b>3주 후 및 3개월 후에 반드시 재구충</b> 실시.</li>
          <li><b>Febantel 복합제:</b> Febantel/Pyrantel/Praziquantel 제제를 체중별 기준 용량에 맞춰 3일간 연속 투여.</li>
          <li>Milbemycin oxime 또는 Moxidectin 성분의 정기적 매달 예방제를 통한 감염 제어 권장.</li>
        </ul>
      `
    },
    cat: {
      site: "고양이 편충(Trichuris serrata)은 매우 드묾",
      treatment: `
        <ul>
          <li>북미 및 국내 고양이에서의 자생적 감염은 매우 드문 편이나, 확진 시 개에 준하여 Fenbendazole(50 mg/kg, PO, 3일) 투여를 고려하거나 임상 증상에 따른 대증치료를 병행함.</li>
        </ul>
      `
    }
  },
  {
    ko: "구충 (십이지장충)",
    en: "Hookworms",
    sci: "Ancylostoma caninum / Uncinaria stenocephala",
    dog: {
      site: "소장 점막 부착 및 흡혈 (Small Intestine)",
      treatment: `
        <ul>
          <li><b>Pyrantel pamoate:</b> 5~10 mg/kg, PO, 단회 투여. 성충만 사멸하므로 이행 자충 사멸을 위해 <b>2주 간격으로 최소 2~3회 반복 투여</b>.</li>
          <li><b>Fenbendazole:</b> 50 mg/kg, PO, q24h 간격으로 3일 연속 투여.</li>
          <li><b>주의:</b> 유충 이동으로 인한 피부염 및 모유 이행 감염 주의. 자견의 경우 심각한 빈혈 유발 가능.</li>
        </ul>
      `
    },
    cat: {
      site: "소장 (Ancylostoma tubaeforme)",
      treatment: `
        <ul>
          <li><b>Pyrantel pamoate:</b> 20 mg/kg, PO, 단회 투여 후 2주 뒤 재투여.</li>
          <li><b>Emodepside/Praziquantel (스팟온):</b> 고양이 전용 탑시컬 제제로 효과적인 단회 구제 가능.</li>
          <li>고양이 구충은 인수공통감염증(cutaneous larva migrans)을 유발하므로 보호자 접촉 주의 필요.</li>
        </ul>
      `
    }
  },
  {
    ko: "회충",
    en: "Roundworms",
    sci: "Toxocara canis / Toxocara cati",
    dog: {
      site: "소장 관강 내 (Small Intestine)",
      treatment: `
        <ul>
          <li><b>Pyrantel pamoate:</b> 5~10 mg/kg, PO, 1회 투여. 장내 성충만 사멸시키므로 조직 내 이행 유충 성숙 주기를 고려하여 <b>2주 후 재투여 필수</b>.</li>
          <li><b>Fenbendazole:</b> 50 mg/kg, PO, q24h로 3일 연속 투여.</li>
          <li>생후 2주령부터 시작하여 2주 간격으로 8주령까지 정기 구충 권장 (태반 및 모유 이행 차단).</li>
        </ul>
      `
    },
    cat: {
      site: "소장 (Small Intestine)",
      treatment: `
        <ul>
          <li><b>Pyrantel pamoate:</b> 20 mg/kg, PO, 1회 투여 후 2주 뒤 재구충.</li>
          <li><b>Milbemycin / Selamectin / Moxidectin / Emodepside:</b> 스팟온 복합제를 통해 자충 및 성충 동시 제어 가능. 고양이는 태반 이행은 없으나 모유 감염이 주된 경로임.</li>
        </ul>
      `
    }
  },
  {
    ko: "조충 (촌충)",
    en: "Tapeworms",
    sci: "Dipylidium caninum / Taenia spp.",
    dog: {
      site: "소장 내부 착생 (Small Intestine)",
      treatment: `
        <ul>
          <li><b>Praziquantel (가장 효과적):</b> 5 mg/kg, PO 또는 IM/SC 단회 투여. 후속 감염 예방을 위해 2주 뒤 반복 가능.</li>
          <li><b>Epsiprantel:</b> 5.5 mg/kg, PO, 단회 투여.</li>
          <li><b>벼룩(Flea) 제어 필수:</b> <i>Dipylidium caninum</i>의 중간숙주가 벼룩이므로 외부기생충 구제를 동시 진행하지 않으면 100% 재감염됨.</li>
        </ul>
      `
    },
    cat: {
      site: "소장 내부 (Small Intestine)",
      treatment: `
        <ul>
          <li><b>Praziquantel:</b> 5 mg/kg, PO 또는 SC 단회 주사. 고양이 전용 복합 외용제(스팟온)에 포함된 Praziquantel 성분으로도 쉽게 구제 가능.</li>
          <li>개와 마찬가지로 주변 환경의 벼룩 및 중간숙주(쥐 등 소동물) 섭식 차단이 예방의 핵심.</li>
        </ul>
      `
    }
  },
  {
    ko: "개선충 (옴진드기)",
    en: "Sarcoptic Mange (Scabies)",
    sci: "Sarcoptes scabiei var. canis",
    dog: {
      site: "피부 각질층 내 터널 형성 (심한 소양증, 팔꿈치/귀 끝)",
      treatment: `
        <ul>
          <li><b>Isooxazoline 계열 (Afoxolaner, Sarolaner, Fluralaner 등):</b> 경구용 외부기생충 제품 단회 투여로 매우 높은 구제율 확인 (CAPC 권장).</li>
          <li><b>Selamectin / Moxidectin (스팟온):</b> 2주 간격으로 최소 2~3회 연속 도포.</li>
          <li>전염성이 매우 강하므로 동거견 동시 치료 및 전신 환경 소독 필수. 인수공통 감염 유의.</li>
        </ul>
      `
    },
    cat: {
      site: "고양이 개선충(Notoedres cati) - 두부, 안면부 각질화",
      treatment: `
        <ul>
          <li><b>Fluralaner (브라벡토 캣) / Selamectin / Moxidectin 국소 도포:</b> 고양이 전용 제품을 정량 도포하여 치료.</li>
          <li><span style="color:red;">⚠️ 절대 금기: 개 전용 개선충 스프레이나 퍼메트린 성분 제품을 고양이에게 적용 시 치명적인 신경독성 유발.</span></li>
        </ul>
      `
    }
  },
  {
    ko: "귀진드기",
    en: "Ear Mites",
    sci: "Otodectes cynotis",
    dog: {
      site: "외이도 안쪽 및 이도 피부 표면 (흑갈색 귀지 발생)",
      treatment: `
        <ul>
          <li><b>외용 스팟온 제제:</b> Selamectin 또는 Moxidectin 복합제를 1달 간격으로 1~2회 도포.</li>
          <li><b>경구용 Isooxazoline 제제:</b> Sarolaner, Fluralaner 등 복용 시 신속히 귀진드기가 사멸됨.</li>
          <li>치료 전 외이도 내 검은 귀지를 귀 세정제를 이용해 완만하게 세정(플러싱)해 주는 것이 진행 속도를 촉진함.</li>
        </ul>
      `
    },
    cat: {
      site: "외이도 내 감염 (고양이 다두 사육 가구 빈발)",
      treatment: `
        <ul>
          <li><b>Selamectin 또는 Fluralaner(캣 전용) 스팟온 도포:</b> 단회 도포로 외이도 내 이물과 진드기 제어 탁월.</li>
          <li>이도 내 직접 점적하는 Ear drop 약물 사용 시 고양이 이독성(Ototoxicity) 및 전정계 증상(고개 기울임)이 유발될 수 있으므로, 안전성이 검증된 국소 스팟온 치료를 우선 권장.</li>
        </ul>
      `
    }
  },
  {
    ko: "참진드기 (살인진드기 / 매개 질병)",
    en: "Ixodid Ticks",
    sci: "Haemaphysalis, Ixodes, Rhipicephalus spp.",
    dog: {
      site: "피부 부착 흡혈 및 혈액 내 매개체(바베시아, 아나플라즈마) 전파",
      treatment: `
        <ul>
          <li><b>정기 구제 (Isooxazoline 계열 경구제):</b> 흡혈 시작 후 수 시간 내 사멸시켜 병원체 이행을 차단함.</li>
          <li><b>매개 질병(Ehrlichia, Anaplasma, Lyme병) 발생 시:</b> Doxycycline 10 mg/kg, PO, q24h(또는 5 mg/kg, q12h) 간격으로 <b>28일간(4주) 연속</b> 투여.</li>
          <li><b>Babesia gibsoni(바베시아) 감염 시:</b> Atovaquone 13.3 mg/kg PO q8h + Azithromycin 10 mg/kg PO q24h 복합 10일 프로토콜 실시.</li>
        </ul>
      `
    },
    cat: {
      site: "피부 부착 흡혈 및 빈혈 유발",
      treatment: `
        <ul>
          <li><b>고양이 안전 인증 외부기생충 스팟온 제품 사용:</b> Fluralaner 복합제 등 정기 도포.</li>
          <li><b>매개 감염증(Mycoplasma 등) 발생 시:</b> Doxycycline 10 mg/kg, PO, q24h로 14~28일 투여.</li>
          <li><span style="color:red;">⚠️ 중요: 고양이 투약 후 식도염/식도협착 방지를 위해 정제 투여 직후 반드시 물 5ml 이상 강제 급여할 것.</span></li>
        </ul>
      `
    }
  }
];

const Parasites: React.FC = () => {
  const [selectedParasite, setSelectedParasite] = useState<ParasiteData | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const sortedData = [...parasiteData].sort((a, b) => a.ko.localeCompare(b.ko, 'ko'));

  const handleParasiteClick = (p: ParasiteData) => {
    setSelectedParasite(p);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const saveResultImg = () => {
    if (!resultRef.current) return;
    const today = new Date().toLocaleDateString('ko-KR').replace(/\. /g, '-').replace('.', '');
    
    html2canvas(resultRef.current, { background: '#ffffff', scale: 2 } as any).then((canvas: HTMLCanvasElement) => {
      const link = document.createElement('a');
      link.download = `CAPC_Protocol_Result_${today}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 1.0);
      link.click();
    });
  };

  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn">
          <ChevronLeft size={20} /> 대시보드
        </Link>
      </div>

      <div className="compact-header">
        <div className="header-icon">🔬</div>
        <div className="header-text">
          <h1>기생충 치료법</h1>
          <p>CAPC 가이드라인 종합 프로토콜</p>
        </div>
      </div>

      <div className="section-container">
        <div className="section-label">📋 대상 기생충 선택</div>
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
          max-width: 700px;
          margin: 0 auto;
          padding: 1.5rem 1rem 3rem;
        }
        .tool-nav {
          margin-bottom: 1rem;
        }
        .back-btn {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: #64748b;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .compact-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 2rem;
          padding: 1.75rem;
          background: #fb923c; /* Soft Orange (Orange 400) */
          color: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        .header-icon {
          font-size: 2.5rem;
        }
        .header-text h1 { 
          font-size: 1.4rem; 
          font-weight: 700; 
          line-height: 1.3; 
          margin: 0; 
        }
        .header-text p { 
          font-size: 0.85rem; 
          opacity: 0.85; 
          margin-top: 4px; 
          margin-bottom: 0;
        }

        .section-container {
          margin-bottom: 2rem;
        }
        .section-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #64748b;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .tag-grid-refined {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          gap: 10px;
        }
        .refined-tag {
          padding: 12px 8px;
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          transition: all 0.2s;
        }
        .refined-tag:hover { border-color: #3498db; background: #f8fafc; }
        .refined-tag.active {
          background: #3498db;
          color: white;
          border-color: #3498db;
          box-shadow: 0 4px 12px rgba(52, 152, 219, 0.2);
        }

        .result-outer-container {
          background: white;
          border-radius: 20px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          padding: 24px;
          border: 1px solid #f1f5f9;
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .result-header-area {
          text-align: center;
          margin-bottom: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f1f5f9;
        }
        .main-result-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 6px;
        }
        .title-icon { color: #3498db; }
        .sub-result-title { font-size: 1rem; color: #64748b; font-weight: 600; margin-bottom: 4px; }
        .sci-name { font-size: 0.8rem; color: #94a3b8; font-style: italic; }

        .protocol-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 24px;
        }
        .protocol-box {
          border-radius: 14px;
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
          color: #334155;
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
          border-radius: 14px;
          padding: 16px;
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }
        .notice-icon { color: #e11d48; flex-shrink: 0; }
        .notice-text { font-size: 0.85rem; color: #9f1239; }
        .notice-text strong { display: block; margin-bottom: 4px; font-weight: 800; }
        .notice-text ul { margin: 4px 0 0 16px; }

        .action-row { margin-top: 10px; }
        .btn-save-refined {
          width: 100%;
          padding: 14px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 12px;
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

        @media (max-width: 600px) {
          .main-result-title { font-size: 1.3rem; }
          .tag-grid-refined { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </div>
  );
};

export default Parasites;
