import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Bug, 
  Utensils, 
  Droplets, 
  Activity, 
  Heart, 
  AlertTriangle, 
  Layers,
  ShieldAlert,
  ChevronDown,
  Info,
  Monitor,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { useState } from 'react';
import AdSlot from './common/AdSlot';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const tools: Tool[] = [
  {
    id: 'hypothyroidism',
    name: '갑기저',
    description: '갑상선기능저하증 진단 및 관리 지원',
    icon: <Layers size={28} />,
    path: '/hypothyroidism'
  },
  {
    id: 'parasites',
    name: '기생충',
    description: '내외부 기생충 감염 치료 프로토콜',
    icon: <Bug size={28} />,
    path: '/parasites'
  },
  {
    id: 'food-amount',
    name: '사료량',
    description: '반려동물의 체중 및 상태별 권장 사료량 계산',
    icon: <Utensils size={28} />,
    path: '/food-amount'
  },
  {
    id: 'fluid-therapy',
    name: '수액',
    description: '탈수 정도 및 체중에 따른 정밀 수액 속도 계산',
    icon: <Droplets size={28} />,
    path: '/fluid-therapy'
  },
  {
    id: 'neurological',
    name: '신경증상',
    description: '신경계 이상 부위 확인 및 감별 진단 보조',
    icon: <Activity size={28} />,
    path: '/neurological'
  },
  {
    id: 'echocardiography',
    name: '심초음파',
    description: '심장 크기 및 기능을 평가하기 위한 지표 계산',
    icon: <Heart size={28} />,
    path: '/echocardiography'
  },
  {
    id: 'poisoning',
    name: '중독',
    description: '섭취한 독성 물질별 위험성 및 응급 처치 가이드',
    icon: <AlertTriangle size={28} />,
    path: '/poisoning'
  },
  {
    id: 'cushing',
    name: '쿠싱',
    description: '부신피질기능항진증 진단 점수 및 관리 모니터링',
    icon: <Stethoscope size={28} />,
    path: '/cushing'
  },
  {
    id: 'atopy',
    name: '아토피',
    description: '견종별 아토피 호발 부위 및 임상 특징 정보',
    icon: <ShieldAlert size={28} />,
    path: '/atopy'
  },
];

const Dashboard: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dashboard-container">
      <header className="main-header">
        <div className="header-content">
          <h1 className="brand-logo">VET<span>APP</span></h1>
          <p className="brand-tagline">수의사를 위한 스마트 임상 지원 플랫폼</p>
        </div>
      </header>

      <main className="main-content">
        {/* PC Access & Shortcut Section */}
        <div className="pc-access-section">
          <div className="pc-access-card">
            <div className="pc-access-info">
              <Monitor className="pc-icon" size={24} />
              <div>
                <h4>💻 큰 화면에서 더 편하게 보세요!</h4>
                <p>PC 브라우저(Chrome, Edge 등)에서도 동일하게 이용 가능합니다.</p>
              </div>
            </div>
            <div className="pc-access-btns">
              <button onClick={copyUrl} className={`pc-btn copy ${copied ? 'copied' : ''}`}>
                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                {copied ? '복사 완료!' : '홈페이지 주소 복사'}
              </button>
              <a 
                href="https://www.google.com/search?q=크롬+바탕화면+바로가기+만들기" 
                target="_blank" 
                rel="noreferrer" 
                className="pc-btn shortcut"
              >
                <Monitor size={16} />
                PC 바로가기 만드는 법
              </a>
            </div>
          </div>
        </div>

        <AdSlot className="top-ad" />

        <div className="tool-grid">
          {[...tools].sort((a, b) => a.name.localeCompare(b.name, 'ko')).map((tool) => (
            <Link key={tool.id} to={tool.path} className="tool-card">
              <div className="tool-icon-wrapper">
                {tool.icon}
              </div>
              <div className="tool-info">
                <h3>{tool.name}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* SEO & Info Section - Collapsible to avoid blocking UX */}
        <section className="dashboard-info-section">
          <button 
            onClick={() => setShowInfo(!showInfo)} 
            className={`info-toggle-btn ${showInfo ? 'active' : ''}`}
          >
            <Info size={18} />
            <span>VETAPP 서비스 상세 안내 및 활용 가이드</span>
            <ChevronDown size={18} className={`arrow-icon ${showInfo ? 'rotated' : ''}`} />
          </button>
          
          <div className={`info-content-wrapper ${showInfo ? 'show' : ''}`}>
            <div className="info-content-inner">
              <div className="info-grid">
                <div className="info-card">
                  <h4>💡 VETAPP은 어떤 서비스인가요?</h4>
                  <p>
                    VETAPP은 바쁜 임상 현장에서 수의사 선생님들이 반복적으로 수행하는 복잡한 계산과 
                    최신 가이드라인 확인 과정을 효율화하기 위해 개발된 <strong>수의학 전문 임상 지원 플랫폼</strong>입니다.
                  </p>
                  <p>
                    모든 도구는 AAHA, ISFM, WSAVA 등 공신력 있는 수의학회와 최신 교과서(Ettinger, Nelson 등)의 
                    데이터를 기반으로 설계되었으며, 단순 수치 계산을 넘어 진단 알고리즘을 보조하는 기능을 제공합니다.
                  </p>
                </div>
                
                <div className="info-card">
                  <h4>🛠 주요 기능 및 활용 분야</h4>
                  <ul>
                    <li><strong>정밀 수액 요법:</strong> 환자의 탈수율, 보전량, 지속 소실량을 고려한 단계별 수액 속도 자동 계산</li>
                    <li><strong>내분비 진단 보조:</strong> 쿠싱(HAC), 갑기저(HypoT4)의 복잡한 진단 수치와 프로토콜 가이드 제공</li>
                    <li><strong>심장 평가 도구:</strong> 심초음파 지표(VHS, VLAS 등)를 입력하여 즉각적인 심장 크기 및 기능 평가 지원</li>
                    <li><strong>응급 및 중독 관리:</strong> 섭취 독성 물질에 따른 위험 용량 및 처치 프로토콜 즉시 확인</li>
                  </ul>
                </div>
                
                <div className="info-card wide">
                  <h4>✅ 구글 애드센스 준수 및 사용자 환경 최적화</h4>
                  <p>
                    저희는 Google 게시자 정책을 준수하며, 사용자에게 가치 있는 고유 콘텐츠를 제공하기 위해 노력하고 있습니다. 
                    본 플랫폼의 모든 계산 로직은 자체 검증을 거친 독창적인 코드로 구현되었으며, 
                    단순한 정보 나열이 아닌 실제 진료 환경에서 '해결책'을 주는 도구로서의 가치를 최우선으로 합니다.
                  </p>
                  <p>
                    반응형 웹 설계를 통해 PC는 물론 모바일 환경에서도 최적화된 경험을 제공하며, 
                    개인정보를 서버에 저장하지 않는 보안 방침을 고수하여 안심하고 사용하실 수 있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AdSlot className="bottom-ad" />
      </main>

      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-links">
            <Link to="/about">서비스 소개</Link>
            <Link to="/privacy">개인정보처리방침</Link>
            <Link to="/terms">이용약관</Link>
            <Link to="/contact">문의하기</Link>
          </div>
          <div className="footer-info">
            <p>&copy; 2026 VETAPP. All rights reserved.</p>
            <p className="disclaimer">본 서비스에서 제공하는 정보는 참고용이며, 최종적인 의학적 결정은 수의사의 전문적 판단하에 이루어져야 합니다.</p>
          </div>
        </div>
      </footer>

      <style>{`
        .pc-access-section {
          margin-bottom: 2rem;
        }
        
        .pc-access-card {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 1px solid #bae6fd;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.08);
        }
        
        .pc-access-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .pc-icon {
          color: #0ea5e9;
          flex-shrink: 0;
        }
        
        .pc-access-info h4 {
          margin: 0 0 0.25rem 0;
          font-size: 1.05rem;
          color: #0369a1;
          font-weight: 800;
        }
        
        .pc-access-info p {
          margin: 0;
          font-size: 0.9rem;
          color: #0c4a6e;
          opacity: 0.8;
        }
        
        .pc-access-btns {
          display: flex;
          gap: 0.75rem;
          flex-shrink: 0;
        }
        
        .pc-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        
        .pc-btn.copy {
          background: #fff;
          border: 1.5px solid #0ea5e9;
          color: #0ea5e9;
        }
        
        .pc-btn.copy:hover {
          background: #f0f9ff;
        }
        
        .pc-btn.copy.copied {
          background: #0ea5e9;
          color: #fff;
        }
        
        .pc-btn.shortcut {
          background: #0ea5e9;
          border: 1.5px solid #0ea5e9;
          color: #fff;
        }
        
        .pc-btn.shortcut:hover {
          background: #0284c7;
          border-color: #0284c7;
        }
        
        @media (max-width: 768px) {
          .pc-access-card {
            flex-direction: column;
            text-align: center;
            padding: 1.25rem;
            gap: 1.25rem;
          }
          
          .pc-access-info {
            flex-direction: column;
            gap: 0.75rem;
          }
          
          .pc-access-btns {
            width: 100%;
            flex-direction: column;
          }
          
          .pc-btn {
            justify-content: center;
            width: 100%;
          }
        }

        .dashboard-info-section {
          margin: 2rem 0;
          background: #fff;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        
        .info-toggle-btn {
          width: 100%;
          padding: 1.25rem 1.5rem;
          display: flex;
          align-items: center;
          gap: 12px;
          background: none;
          border: none;
          cursor: pointer;
          color: #475569;
          font-weight: 700;
          font-size: 1rem;
          transition: all 0.2s;
        }
        
        .info-toggle-btn:hover {
          background: #f8fafc;
          color: #3b82f6;
        }
        
        .info-toggle-btn.active {
          border-bottom: 1px solid #f1f5f9;
        }
        
        .arrow-icon {
          margin-left: auto;
          transition: transform 0.3s ease;
        }
        
        .arrow-icon.rotated {
          transform: rotate(180deg);
        }
        
        .info-content-wrapper {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease-out;
          background: #f8fafc;
        }
        
        .info-content-wrapper.show {
          max-height: 1000px;
        }
        
        .info-content-inner {
          padding: 2rem;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        
        .info-card h4 {
          font-size: 1.1rem;
          color: #0f172a;
          margin-bottom: 1rem;
          font-weight: 800;
        }
        
        .info-card p {
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        
        .info-card ul {
          list-style: none;
          padding: 0;
        }
        
        .info-card ul li {
          position: relative;
          padding-left: 1.25rem;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.6;
        }
        
        .info-card ul li::before {
          content: "•";
          position: absolute;
          left: 0;
          color: #3b82f6;
          font-weight: bold;
        }
        
        .info-card.wide {
          grid-column: span 2;
          padding-top: 1.5rem;
          border-top: 1px dashed #cbd5e1;
        }
        
        @media (max-width: 768px) {
          .info-grid { grid-template-columns: 1fr; }
          .info-card.wide { grid-column: span 1; }
          .info-content-inner { padding: 1.5rem; }
          .info-toggle-btn { font-size: 0.9rem; padding: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
