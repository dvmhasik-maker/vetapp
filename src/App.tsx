import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
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
import Hypothyroidism from './components/tools/Hypothyroidism/index';
import Parasites from './components/tools/Parasites/index';
import FoodAmount from './components/tools/FoodAmount/index';
import FluidTherapy from './components/tools/FluidTherapy/index';
import Neurological from './components/tools/Neurological/index';

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
    icon: <Layers size={32} />,
    path: '/hypothyroidism'
  },
  {
    id: 'parasites',
    name: '기생충',
    description: '내외부 기생충 감염 치료 프로토콜',
    icon: <Bug size={32} />,
    path: '/parasites'
  },
  {
    id: 'food-amount',
    name: '사료량',
    description: '반려동물의 체중 및 상태별 권장 사료량 계산',
    icon: <Utensils size={32} />,
    path: '/food-amount'
  },
  {
    id: 'fluid-therapy',
    name: '수액',
    description: '탈수 정도 및 체중에 따른 정밀 수액 속도 계산',
    icon: <Droplets size={32} />,
    path: '/fluid-therapy'
  },
  {
    id: 'neurological',
    name: '신경증상',
    description: '신경계 이상 부위 확인 및 감별 진단 보조',
    icon: <Activity size={32} />,
    path: '/neurological'
  },
  {
    id: 'echocardiography',
    name: '심초음파',
    description: '심장 크기 및 기능을 평가하기 위한 지표 계산',
    icon: <Heart size={32} />,
    path: '#echocardiography'
  },
  {
    id: 'poisoning',
    name: '중독',
    description: '섭취한 독성 물질별 위험성 및 응급 처치 가이드',
    icon: <AlertTriangle size={32} />,
    path: '#poisoning'
  },
  {
    id: 'cushing',
    name: '쿠싱',
    description: '부신피질기능항진증 진단 점수 및 관리 모니터링',
    icon: <Stethoscope size={32} />,
    path: '#cushing'
  },
];

const Dashboard = () => (
  <div className="container">
    <header>
      <h1>VETAPP</h1>
      <p>수의사를 위한 스마트 진료 지원 도구 모음</p>
    </header>

    <main>
      <div className="tool-grid">
        {tools.map((tool) => (
          <Link key={tool.id} to={tool.path} className="tool-card">
            <div className="tool-icon">
              {tool.icon}
            </div>
            <h2>{tool.name}</h2>
          </Link>
        ))}
      </div>
    </main>

    <footer>
      <div className="footer-links">
        <a href="#about">서비스 소개</a>
        <a href="#privacy">개인정보처리방침</a>
        <a href="#terms">이용약관</a>
        <a href="#contact">문의하기</a>
      </div>
      <p>&copy; 2026 VETAPP. All rights reserved.</p>
      <p style={{ fontSize: '0.8rem', marginTop: '10px', color: '#bdc3c7' }}>
        본 프로그램은 진료 보조용이며, 최종 판단은 수의사의 책임 하에 이루어져야 합니다.
      </p>
    </footer>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/hypothyroidism" element={<Hypothyroidism />} />
        <Route path="/parasites" element={<Parasites />} />
        <Route path="/food-amount" element={<FoodAmount />} />
        <Route path="/fluid-therapy" element={<FluidTherapy />} />
        <Route path="/neurological" element={<Neurological />} />
      </Routes>
    </Router>
  );
}

export default App;
