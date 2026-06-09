import React from 'react';

const ParasiteGuide: React.FC = () => {
  return (
    <div className="parasite-guide-content">
      <section className="guide-section">
        <h4>1. 개/고양이 기생충 관리의 중요성</h4>
        <p>
          반려동물의 기생충 감염은 단순한 소화기 증상을 넘어, 중증 빈혈, 심부전(심장사상충), 신경 증상 등을 유발할 수 있습니다. 특히 일부 기생충은 사람에게 전염되는 <strong>인수공통감염병(Zoonosis)</strong>의 원인이 되므로 체계적인 예방과 치료가 필수적입니다.
        </p>
      </section>

      <section className="guide-section">
        <h4>2. 주요 기생충별 임상 특징</h4>
        <ul className="guide-list">
          <li><strong>심장사상충(Dirofilaria immitis):</strong> 모기에 의해 전파되며 폐동맥 및 우심방에 기생. 호흡곤란, 복수 유발.</li>
          <li><strong>지알디아(Giardia):</strong> 오염된 물/분변을 통해 감염. 만성적인 점액성 설사가 특징.</li>
          <li><strong>트리코모나스(Trichomoniasis):</strong> 고양이 대장에 기생하며 만성적인 악취성 설사 유발. PCR 검사가 골든 스탠다드.</li>
          <li><strong>회충/구충:</strong> 어린 개체에서 영양실조 및 빈혈 유발. 사람의 피부나 내장에 침투 가능.</li>
          <li><strong>외부기생충(진드기, 벼룩):</strong> 피부염뿐만 아니라 바베시아, SFTS 등 치명적인 전염병 매개.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h4>3. CAPC 가이드라인 요약</h4>
        <p>Companion Animal Parasite Council(CAPC)은 다음과 같은 연중 예방 프로토콜을 권장합니다.</p>
        <ul className="guide-list">
          <li><strong>연중 무휴 예방:</strong> 지리적 위치와 관계없이 12개월 내내 내외부 기생충 예방약 투여.</li>
          <li><strong>정기 검진:</strong> 매년 최소 1회 분변 검사 및 심장사상충 항원 검사 실시.</li>
          <li><strong>위생 관리:</strong> 배설물의 즉각적인 처리 및 오염된 환경 노출 자제.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h4>4. 치료 시 주의사항</h4>
        <ul className="guide-list">
          <li><strong>Collie 등 MDR1 유전자 변이:</strong> 특정 약물(Ivermectin 등)에 대한 신경 독성 위험이 있으므로 주의.</li>
          <li><strong>고양이 퍼메트린 중독:</strong> 강아지 전용 외부기생충약에 포함된 퍼메트린은 고양이에게 치명적이므로 절대 혼용 금지.</li>
        </ul>
      </section>

      <div className="guide-reference">
        <p>※ 참고 문헌: Companion Animal Parasite Council (CAPC) Official Guidelines. 2024.</p>
      </div>

      <style>{`
        .parasite-guide-content h4 {
          font-size: 1.1rem;
          color: #1e293b;
          margin: 1.5rem 0 0.75rem;
          font-weight: 700;
        }
        .parasite-guide-content h4:first-child {
          margin-top: 0;
        }
        .guide-section p {
          margin-bottom: 1rem;
        }
        .guide-list {
          padding-left: 1.25rem;
          margin-bottom: 1.5rem;
        }
        .guide-list li {
          margin-bottom: 0.5rem;
          position: relative;
        }
        .guide-reference {
          margin-top: 2rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
          font-size: 0.8rem;
          color: #94a3b8;
          font-style: italic;
        }
      `}</style>
    </div>
  );
};

export default ParasiteGuide;
