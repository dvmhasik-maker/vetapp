import React from 'react';
import { ChevronLeft, Info, CheckCircle, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <div className="tool-card-container">
        <div className="tool-card-title flex items-center gap-2">
          <Info size={20} className="text-blue-500" /> 서비스 소개
        </div>
        
        <div className="prose-content">
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">VETAPP: 수의사를 위한 스마트 임상 지원 플랫폼</h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              VETAPP은 바쁜 임상 현장에서 수의사 및 수의학도들이 빠르고 정확한 의사결정을 내릴 수 있도록 돕는 디지털 툴킷입니다. 
              최신 수의학 가이드라인을 기반으로 복잡한 계산과 진단 프로토콜을 시각화하여 제공합니다.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <CheckCircle size={18} className="text-green-500" /> 주요 특징
            </h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex gap-2">
                <span className="font-bold text-blue-500">•</span>
                <span><strong>정밀 계산기:</strong> 수액 속도, 사료량, 약물 용량 등 오차가 없어야 할 필수 수치 계산 지원</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-500">•</span>
                <span><strong>진단 보조:</strong> 쿠싱, 심초음파 등 복잡한 진단 기준을 단계별로 분석</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-500">•</span>
                <span><strong>리포트 생성:</strong> 분석 결과를 이미지로 저장하여 보호자 상담 및 차트에 활용 가능</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-blue-500">•</span>
                <span><strong>반응형 디자인:</strong> PC와 모바일 어디서든 최적화된 화면으로 즉시 사용</span>
              </li>
            </ul>
          </section>

          <section className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <h3 className="text-amber-800 font-bold mb-2 flex items-center gap-2">
              <ShieldAlert size={18} /> 중요 면책 조항
            </h3>
            <p className="text-sm text-amber-700 leading-relaxed">
              본 서비스에서 제공하는 모든 계산 결과와 정보는 공인된 수의학 텍스트 및 가이드라인을 기반으로 하지만, 
              개별 환자의 임상 상태는 매우 다양할 수 있습니다. <strong>최종적인 진단과 처방에 대한 책임은 해당 환자를 담당하는 수의사 본인에게 있으며</strong>, 
              VETAPP은 참고 도구로서의 역할만을 수행합니다.
            </p>
          </section>
        </div>
      </div>

      <style>{`
        .prose-content h2 { color: #0f172a; margin-top: 1.5rem; }
        .prose-content h3 { color: #1e293b; margin-top: 1.25rem; }
        .prose-content p { margin-bottom: 1rem; color: #475569; }
      `}</style>
    </div>
  );
};

export default About;
