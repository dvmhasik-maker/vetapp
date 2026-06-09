import React from 'react';

const FluidGuide: React.FC = () => {
  return (
    <div className="fluid-guide-content">
      <section className="guide-section">
        <h4>1. 수액 요법의 기본 원칙</h4>
        <p>
          수액 요법은 단순히 물을 보충하는 것이 아니라, 관류(Perfusion)를 유지하고, 수분 및 전해질 불균형을 교정하며, 지속적인 소실량을 보충하는 중요한 처치입니다.
        </p>
      </section>

      <section className="guide-section">
        <h4>2. 수액량 계산의 세 요소</h4>
        <ul className="guide-list">
          <li><strong>Deficit (탈수량):</strong> 체중(kg) × 탈수 정도(%) × 1000 = 교정량(mL). 주로 12-24시간에 걸쳐 보충합니다.</li>
          <li><strong>Maintenance (유지량):</strong> 대사 및 배설을 위한 기본 요구량. 70 × 체중(kg)^0.75 또는 80-132 × 체중(kg)^0.75 공식을 사용합니다.</li>
          <li><strong>Ongoing Loss (지속 소실량):</strong> 구토, 설사 등으로 인해 추가적으로 발생하는 소실량을 추정하여 합산합니다.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h4>3. 탈수 정도 평가 (Clinical Signs)</h4>
        <ul className="guide-list">
          <li><strong>5% 이하:</strong> 임상적으로 감지하기 어려움.</li>
          <li><strong>5-7%:</strong> 피부 탄력(Turgor) 감소, 구강 점막 끈적임.</li>
          <li><strong>8-10%:</strong> 눈이 약간 함몰됨, 모세혈관 재충혈 시간(CRT) 지연.</li>
          <li><strong>10-12%:</strong> 심한 피부 탄력 저하, 차가운 사지, 쇼크 징후.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h4>4. 주의사항: 과수액(Fluid Overload)</h4>
        <p>
          심부전, 신부전 환자에서 과도한 수액 처치는 폐수종을 유발할 수 있습니다. 호흡수 증가, 맑은 비강 분비물, 체중의 급격한 증가 여부를 면밀히 모니터링해야 합니다.
        </p>
      </section>

      <div className="guide-reference">
        <p>※ 참고 문헌: AAHA/AAFP Fluid Therapy Guidelines for Dogs and Cats. 2024.</p>
      </div>

      <style>{`
        .fluid-guide-content h4 {
          font-size: 1.1rem;
          color: #1e293b;
          margin: 1.5rem 0 0.75rem;
          font-weight: 700;
        }
        .fluid-guide-content h4:first-child {
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

export default FluidGuide;
