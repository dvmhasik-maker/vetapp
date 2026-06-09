import React from 'react';

const NeuroGuide: React.FC = () => {
  return (
    <div className="neuro-guide-content">
      <section className="guide-section">
        <h4>1. 신경계 검사(Neurological Exam)의 목적</h4>
        <p>
          신경계 검사의 첫 번째 목표는 병변의 유무를 확인하는 것이며, 두 번째 목표는 병변의 위치를 국소화(Localization)하는 것입니다. 이를 통해 뇌, 척수, 또는 말초 신경 중 어디에 문제가 있는지 판단합니다.
        </p>
      </section>

      <section className="guide-section">
        <h4>2. 척수 병변의 국소화 (Localization)</h4>
        <ul className="guide-list">
          <li><strong>C1-C5:</strong> 사지 마비 또는 부전 마비. 사지 모두 상위운동신경세포(UMN) 징후.</li>
          <li><strong>C6-T2:</strong> 사지 마비. 전지는 하위운동신경세포(LMN) 징후, 후지는 UMN 징후.</li>
          <li><strong>T3-L3:</strong> 후지 마비 또는 부전 마비. 전지는 정상, 후지는 UMN 징후.</li>
          <li><strong>L4-S3:</strong> 후지 마비. 전지는 정상, 후지는 LMN 징후.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h4>3. UMN vs LMN 징후 감별</h4>
        <ul className="guide-list">
          <li><strong>UMN (상위운동신경):</strong> 척수 반사 정상~항진, 근긴장도 정상~항진, 위축이 느리게 나타남.</li>
          <li><strong>LMN (하위운동신경):</strong> 척수 반사 저하~소실, 근긴장도 저하(이완성), 근위축이 매우 빠르게 진행.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h4>4. 응급 상황 판단 (Deep Pain)</h4>
        <p>
          후지 마비 환자에서 심부 통증 감각(Deep Pain Perception)의 소실은 매우 불량한 예후를 의미하며, 즉각적인 외과적 개입이 필요할 수 있는 응급 상황입니다.
        </p>
      </section>

      <div className="guide-reference">
        <p>※ 참고 문헌: Dewey CW, da Costa RC, eds. Practical Guide to Canine and Feline Neurology. 3rd ed.</p>
      </div>

      <style>{`
        .neuro-guide-content h4 {
          font-size: 1.1rem;
          color: #1e293b;
          margin: 1.5rem 0 0.75rem;
          font-weight: 700;
        }
        .neuro-guide-content h4:first-child {
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

export default NeuroGuide;
