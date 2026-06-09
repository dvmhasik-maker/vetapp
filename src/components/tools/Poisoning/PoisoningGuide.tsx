import React from 'react';

const PoisoningGuide: React.FC = () => {
  return (
    <div className="poisoning-guide-content">
      <section className="guide-section">
        <h4>1. 독성 물질 섭취 시 응급 처치 원칙</h4>
        <p>
          독성 물질 섭취 시 가장 중요한 것은 **시간**입니다. 섭취 후 1~2시간 이내라면 구토 유발을 통해 흡수를 최소화할 수 있으나, 물질의 종류에 따라 구토가 금기시되는 경우도 있습니다.
        </p>
      </section>

      <section className="guide-section">
        <h4>2. 구토 유발이 금지되는 경우</h4>
        <ul className="guide-list">
          <li><strong>부식성 물질:</strong> 강산, 강염기, 세제 등 (역류 시 식도 손상 심화).</li>
          <li><strong>석유화학 제품:</strong> 휘발유, 오일 등 (오연성 폐렴 위험).</li>
          <li><strong>의식 불명/경련 중:</strong> 구토물 흡입으로 인한 질식 위험.</li>
          <li><strong>이미 심한 구토 중인 경우.</strong></li>
        </ul>
      </section>

      <section className="guide-section">
        <h4>3. 주요 독성 물질별 위험성</h4>
        <ul className="guide-list">
          <li><strong>초콜릿 (테오브로민):</strong> 심박수 증가, 경련, 부정맥 유발.</li>
          <li><strong>포도/건포도:</strong> 급성 신부전 유발 (소량으로도 치명적일 수 있음).</li>
          <li><strong>양파/마늘:</strong> 적혈구 파괴 및 용혈성 빈혈 유발.</li>
          <li><strong>자일리톨:</strong> 급격한 저혈당 및 간부전 유발.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h4>4. 활성탄(Activated Charcoal) 사용</h4>
        <p>
          구토 유발 후 또는 구토가 불가능한 경우, 남은 독성 물질을 흡착하여 배출하기 위해 활성탄을 투여할 수 있습니다. 단, 알코올이나 중금속 등 일부 물질에는 효과가 없습니다.
        </p>
      </section>

      <div className="guide-reference">
        <p>※ 참고 문헌: ASPCA Animal Poison Control Center Guidelines. 2024.</p>
      </div>

      <style>{`
        .poisoning-guide-content h4 {
          font-size: 1.1rem;
          color: #1e293b;
          margin: 1.5rem 0 0.75rem;
          font-weight: 700;
        }
        .poisoning-guide-content h4:first-child {
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

export default PoisoningGuide;
