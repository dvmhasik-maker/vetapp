import React from 'react';
import { ChevronLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <div className="tool-card-container">
        <div className="tool-card-title flex items-center gap-2">
          <ShieldCheck size={20} className="text-green-500" /> 개인정보처리방침
        </div>
        
        <div className="legal-content text-sm leading-relaxed text-slate-600 space-y-6">
          <p>본 VETAPP(이하 '서비스')은 이용자의 개인정보를 보호하고 관련 법령을 준수하기 위해 다음과 같은 방침을 가지고 있습니다.</p>

          <section>
            <h3 className="font-bold text-slate-900 mb-2">1. 개인정보의 수집 항목 및 방법</h3>
            <p>본 서비스는 원칙적으로 회원가입 없이 사용할 수 있으며, 이용자가 입력하는 '환자 이름', '체중' 등의 정보는 서버에 저장되지 않고 이용자의 브라우저 내에서 연산을 위해서만 사용됩니다.</p>
          </section>

          <section>
            <h3 className="font-bold text-slate-900 mb-2">2. 개인정보의 이용 목적</h3>
            <p>서비스 내 계산 및 분석 기능 제공, 서비스 개선 및 통계 분석을 위해서만 활용됩니다.</p>
          </section>

          <section>
            <h3 className="font-bold text-slate-900 mb-2">3. 데이터의 저장 및 파기</h3>
            <p>이용자가 입력한 데이터는 휘발성 데이터로, 페이지 새로고침 또는 브라우저 종료 시 삭제됩니다. 이미지 저장 기능을 통해 생성된 파일은 이용자의 로컬 장치에 저장되며 서버로는 전송되지 않습니다.</p>
          </section>

          <section>
            <h3 className="font-bold text-slate-900 mb-2">4. 쿠키(Cookie) 및 광고</h3>
            <p>본 서비스는 구글 애드센스(Google AdSense)를 통한 광고를 게재할 수 있습니다. 구글은 쿠키를 사용하여 이용자의 방문 기록을 바탕으로 맞춤 광고를 제공할 수 있으며, 이용자는 구글 광고 설정을 통해 이를 거부할 수 있습니다.</p>
          </section>

          <section>
            <h3 className="font-bold text-slate-900 mb-2">5. 관리 책임자</h3>
            <p>문의사항은 '문의하기' 페이지를 통해 접수해 주시기 바랍니다.</p>
          </section>

          <p className="pt-4 border-top border-slate-100 italic text-xs">시행 일자: 2026년 5월 29일</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
