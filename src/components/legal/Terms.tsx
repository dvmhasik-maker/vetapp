import React from 'react';
import { ChevronLeft, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <div className="legal-header">
        <div className="legal-icon"><FileText size={48} className="text-slate-400" /></div>
        <h1>이용약관</h1>
        <p>VETAPP 서비스 이용을 위한 기본 수칙입니다.</p>
      </div>

      <div className="tool-card-container">
        <div className="terms-content">
          
          <section className="terms-section">
            <div className="terms-badge">제1조</div>
            <h3>목적</h3>
            <p>
              본 약관은 VETAPP(이하 '서비스')이 제공하는 수의학 임상 지원 도구 및 관련 서비스의 이용 조건 및 절차를 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="terms-section highlight">
            <div className="terms-badge">제2조</div>
            <h3>면책 조항 및 서비스의 성격</h3>
            <div className="terms-points">
              <div className="point">
                <CheckCircle2 size={16} />
                <span>본 서비스는 수의사의 임상적 판단을 돕기 위한 <strong>보조 도구</strong>입니다.</span>
              </div>
              <div className="point">
                <CheckCircle2 size={16} />
                <span>서비스 결과는 학술적 가이드라인 기반이나, 최종 처방 책임은 이용자에게 있습니다.</span>
              </div>
              <div className="point">
                <AlertCircle size={16} className="text-amber-500" />
                <span>이용으로 발생한 직간접적 손해에 대해 서비스는 법적 책임을 지지 않습니다.</span>
              </div>
            </div>
          </section>

          <section className="terms-section">
            <div className="terms-badge">제3조</div>
            <h3>이용자의 의무</h3>
            <p>
              이용자는 본 서비스를 합법적인 목적으로만 사용해야 하며, 시스템에 부하를 주거나 정상적인 운영을 방해하는 행위를 해서는 안 됩니다.
            </p>
          </section>

          <section className="terms-section">
            <div className="terms-badge">제4조</div>
            <h3>서비스의 변경 및 중단</h3>
            <p>
              서비스는 최신 의학 정보 반영 및 기능 개선을 위해 예고 없이 업데이트되거나 일시적으로 중단될 수 있습니다.
            </p>
          </section>

          <div className="terms-date">
            공고 일자: 2026년 5월 29일
          </div>
        </div>
      </div>

      <style>{`
        .legal-header { text-align: center; padding: 2rem 0 3rem; }
        .legal-icon { margin-bottom: 1rem; display: flex; justify-content: center; }
        .legal-header h1 { font-size: 1.75rem; font-weight: 800; color: #0f172a; margin: 0; }
        .legal-header p { color: #64748b; margin-top: 0.5rem; font-weight: 500; }

        .terms-section { position: relative; padding: 2rem 1.5rem 1.5rem; border-bottom: 1px solid #f1f5f9; }
        .terms-section:last-of-type { border-bottom: none; }
        .terms-section.highlight { background: #f8fafc; border-radius: 12px; border-bottom: none; margin: 1rem 0; }
        
        .terms-badge { 
          position: absolute; top: 1rem; left: 1.5rem;
          font-size: 0.65rem; font-weight: 800; color: #3b82f6;
          background: #eff6ff; padding: 2px 8px; border-radius: 4px;
          text-transform: uppercase;
        }

        .terms-section h3 { font-size: 1.05rem; font-weight: 700; color: #1e293b; margin: 0 0 0.75rem; }
        .terms-section p { font-size: 0.9rem; line-height: 1.7; color: #475569; margin: 0; }

        .terms-points { display: flex; flex-direction: column; gap: 10px; margin-top: 0.5rem; }
        .point { display: flex; gap: 10px; font-size: 0.85rem; color: #475569; line-height: 1.5; }
        .point svg { flex-shrink: 0; margin-top: 2px; color: #10b981; }
        .point strong { color: #0f172a; }

        .terms-date { margin-top: 3rem; text-align: center; color: #94a3b8; font-size: 0.8rem; font-style: italic; }

        @media (max-width: 640px) {
          .terms-section { padding: 1.5rem 1rem 1rem; }
          .terms-badge { left: 1rem; }
        }
      `}</style>
    </div>
  );
};

export default Terms;
