import React from 'react';
import { ChevronLeft, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <div className="tool-card-container">
        <div className="tool-card-title flex items-center gap-2">
          <FileText size={20} className="text-slate-500" /> 이용약관
        </div>
        
        <div className="legal-content text-sm leading-relaxed text-slate-600 space-y-6">
          <section>
            <h3 className="font-bold text-slate-900 mb-2">제1조 (목적)</h3>
            <p>본 약관은 VETAPP(이하 '서비스')이 제공하는 수의학 임상 지원 도구 및 관련 서비스의 이용 조건 및 절차를 규정함을 목적으로 합니다.</p>
          </section>

          <section>
            <h3 className="font-bold text-slate-900 mb-2">제2조 (면책 조항 및 서비스의 성격)</h3>
            <p>1. 본 서비스는 수의사의 임상적 판단을 돕기 위한 보조 도구입니다.<br/>
               2. 서비스에서 제공하는 결과는 학술적 가이드라인을 기반으로 산출되나, 최종 진단 및 처방에 대한 책임은 이용자(수의사)에게 있습니다.<br/>
               3. 서비스 이용으로 인해 발생하는 직간접적인 손해에 대해 서비스 제공자는 법적 책임을 지지 않습니다.</p>
          </section>

          <section>
            <h3 className="font-bold text-slate-900 mb-2">제3조 (이용자의 의무)</h3>
            <p>이용자는 본 서비스를 합법적인 목적으로만 사용해야 하며, 서비스의 정상적인 운영을 방해하는 행위를 해서는 안 됩니다.</p>
          </section>

          <section>
            <h3 className="font-bold text-slate-900 mb-2">제4조 (서비스의 변경 및 중단)</h3>
            <p>서비스는 지속적인 업데이트를 위해 예고 없이 기능을 변경하거나 일시적으로 중단할 수 있습니다.</p>
          </section>

          <p className="pt-4 border-top border-slate-100 italic text-xs">공고 일자: 2026년 5월 29일</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
