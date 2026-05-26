import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Bug, 
  Utensils, 
  Droplets, 
  Activity, 
  Heart, 
  AlertTriangle, 
  Layers 
} from 'lucide-react';
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
];

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <header className="main-header">
        <div className="header-content">
          <h1 className="brand-logo">VET<span>APP</span></h1>
          <p className="brand-tagline">수의사를 위한 스마트 임상 지원 플랫폼</p>
        </div>
      </header>

      <main className="main-content">
        <AdSlot className="top-ad" />

        <div className="tool-grid">
          {tools.map((tool) => (
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

        <AdSlot className="bottom-ad" />
      </main>

      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#about">서비스 소개</a>
            <a href="#privacy">개인정보처리방침</a>
            <a href="#terms">이용약관</a>
          </div>
          <div className="footer-info">
            <p>&copy; 2026 VETAPP. All rights reserved.</p>
            <p className="disclaimer">본 서비스에서 제공하는 정보는 참고용이며, 최종적인 의학적 결정은 수의사의 전문적 판단하에 이루어져야 합니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
