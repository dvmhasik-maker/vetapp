import React from 'react';
import { ChevronLeft, ShieldCheck, Lock, Eye, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <div className="legal-header">
        <div className="legal-icon"><ShieldCheck size={48} className="text-green-500" /></div>
        <h1>개인정보처리방침</h1>
        <p>VETAPP은 이용자의 개인정보를 소중하게 생각합니다.</p>
      </div>

      <div className="tool-card-container">
        <div className="legal-prose">
          <p className="intro-text">
            본 VETAPP(이하 '서비스')은 이용자의 개인정보를 보호하고 관련 법령을 준수하기 위해 다음과 같은 방침을 가지고 있습니다.
          </p>

          <div className="legal-grid">
            <section className="legal-box">
              <div className="box-title">
                <Lock size={18} />
                <span>1. 수집 항목 및 방법</span>
              </div>
              <p>
                본 서비스는 원칙적으로 <strong>회원가입 없이 사용</strong>할 수 있습니다. 
                이용자가 입력하는 '환자 이름', '체중' 등의 정보는 서버에 저장되지 않고 이용자의 브라우저 내에서 연산을 위해서만 일시적으로 사용됩니다.
              </p>
            </section>

            <section className="legal-box">
              <div className="box-title">
                <Eye size={18} />
                <span>2. 이용 목적</span>
              </div>
              <p>
                서비스 내 정밀 계산 및 분석 기능 제공, 서비스 품질 개선을 위한 통계 분석 이외의 목적으로는 데이터를 활용하지 않습니다.
              </p>
            </section>

            <section className="legal-box">
              <div className="box-title">
                <ShieldCheck size={18} />
                <span>3. 데이터 저장 및 파기</span>
              </div>
              <p>
                입력 데이터는 휘발성으로, 페이지 새로고침 또는 종료 시 즉각 삭제됩니다. 
                이미지 저장 기능을 통해 생성된 파일은 이용자의 기기에만 저장되며 외부 서버로 전송되지 않습니다.
              </p>
            </section>

            <section className="legal-box">
              <div className="box-title">
                <Bell size={18} />
                <span>4. 쿠키 및 광고</span>
              </div>
              <p>
                본 서비스는 구글 애드센스(Google AdSense)를 게재합니다. 
                구글은 쿠키를 사용하여 이용자의 방문 기록을 바탕으로 맞춤 광고를 제공할 수 있습니다.
              </p>
            </section>
          </div>

          <div className="legal-footer">
            <p>관리 책임자: 서비스 운영 담당자</p>
            <p>시행 일자: 2026년 5월 29일</p>
          </div>
        </div>
      </div>

      <style>{`
        .legal-header { text-align: center; padding: 2rem 0 3rem; }
        .legal-icon { margin-bottom: 1rem; display: flex; justify-content: center; }
        .legal-header h1 { font-size: 1.75rem; font-weight: 800; color: #0f172a; margin: 0; }
        .legal-header p { color: #64748b; margin-top: 0.5rem; font-weight: 500; }

        .intro-text { font-size: 1rem; color: #475569; margin-bottom: 2rem; text-align: center; line-height: 1.6; }

        .legal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .legal-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.5rem; }
        .box-title { display: flex; align-items: center; gap: 8px; margin-bottom: 12px; color: #1e293b; font-weight: 700; }
        .legal-box p { font-size: 0.9rem; line-height: 1.6; color: #475569; margin: 0; }
        .legal-box strong { color: #10b981; }

        .legal-footer { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #f1f5f9; color: #94a3b8; font-size: 0.8rem; text-align: center; }
        .legal-footer p { margin: 4px 0; }

        @media (max-width: 768px) {
          .legal-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Privacy;
