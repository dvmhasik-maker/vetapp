import React from 'react';
import { ChevronLeft, CheckCircle, ShieldAlert, Zap, Layout, FileBarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <div className="about-hero">
        <div className="hero-icon-wrapper">🥣</div>
        <h1>VETAPP 소개</h1>
        <p>수의사를 위한 스마트 임상 지원 플랫폼</p>
      </div>

      <div className="tool-card-container">
        <div className="prose-content">
          <section className="about-section">
            <div className="section-header">
              <Zap size={20} className="text-blue-500" />
              <h3>우리의 미션</h3>
            </div>
            <p>
              VETAPP은 복잡하고 반복적인 수의학적 계산과 진단 과정을 단순화하여, 
              수의사가 오직 환자의 건강과 치료에만 집중할 수 있는 환경을 만듭니다. 
              최신 가이드라인을 데이터화하여 임상 현장의 효율성을 극대화합니다.
            </p>
          </section>

          <div className="features-grid">
            <div className="feature-item">
              <Layout size={24} className="text-indigo-500" />
              <h4>직관적 UI</h4>
              <p>모바일과 PC 어디서든 즉시 사용 가능한 최적화된 인터페이스</p>
            </div>
            <div className="feature-item">
              <FileBarChart size={24} className="text-green-500" />
              <h4>데이터 기반</h4>
              <p>Ettinger, AAHA 등 공인된 학술적 가이드라인 기반의 연산 로직</p>
            </div>
          </div>

          <section className="about-section mt-6">
            <div className="section-header">
              <CheckCircle size={20} className="text-blue-500" />
              <h3>핵심 기능</h3>
            </div>
            <ul className="feature-list">
              <li><strong>정밀 계산:</strong> 수액 속도, 칼륨 보충량, 일일 에너지 요구량(DER) 자동 산출</li>
              <li><strong>진단 보조:</strong> 쿠싱, 심초음파 지표 등 단계별 체크리스트 및 분석</li>
              <li><strong>스마트 리포트:</strong> 상담용 이미지 저장 기능을 통해 보호자 신뢰도 향상</li>
            </ul>
          </section>

          <section className="disclaimer-box">
            <div className="disclaimer-header">
              <ShieldAlert size={18} />
              <span>중요 고지 및 면책 사항</span>
            </div>
            <p>
              본 서비스에서 제공하는 모든 결과는 의학적 참고용입니다. 
              환자의 개별적인 특이 사항과 임상 증상을 종합적으로 고려한 최종적인 의학적 결정은 
              반드시 <strong>담당 수의사의 전문적인 판단</strong>하에 이루어져야 합니다.
            </p>
          </section>
        </div>
      </div>

      <style>{`
        .about-hero {
          text-align: center;
          padding: 2rem 1rem 3rem;
        }
        .hero-icon-wrapper {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .about-hero h1 {
          font-size: 1.75rem;
          font-weight: 800;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }
        .about-hero p {
          font-size: 1rem;
          color: #64748b;
          font-weight: 500;
        }

        .about-section {
          margin-bottom: 2rem;
        }
        .section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 1rem;
        }
        .section-header h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }
        .prose-content p {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #475569;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin: 2rem 0;
        }
        .feature-item {
          background: #f8fafc;
          padding: 1.25rem;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }
        .feature-item h4 {
          font-size: 1rem;
          font-weight: 700;
          color: #1e293b;
          margin: 10px 0 6px;
        }
        .feature-item p {
          font-size: 0.85rem;
          margin: 0;
          line-height: 1.5;
        }

        .feature-list {
          list-style: none;
          padding: 0;
        }
        .feature-list li {
          position: relative;
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.6;
        }
        .feature-list li::before {
          content: "•";
          position: absolute;
          left: 0.5rem;
          color: #3b82f6;
          font-weight: bold;
        }

        .disclaimer-box {
          margin-top: 3rem;
          background: #fffbeb;
          border: 1px solid #fef3c7;
          border-radius: 14px;
          padding: 1.25rem;
        }
        .disclaimer-header {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #92400e;
          font-weight: 800;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }
        .disclaimer-box p {
          font-size: 0.85rem;
          color: #b45309;
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          .features-grid { grid-template-columns: 1fr; }
          .about-hero { padding: 1.5rem 1rem 2rem; }
          .about-hero h1 { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default About;
