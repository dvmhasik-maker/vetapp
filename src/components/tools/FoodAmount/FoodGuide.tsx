import React from 'react';

const FoodGuide: React.FC = () => {
  return (
    <div className="food-guide-content">
      <section className="guide-section">
        <h4>1. 반려동물 영양 관리의 기초</h4>
        <p>
          적절한 영양 공급은 질병 예방과 수명 연장의 핵심입니다. 단순히 양을 조절하는 것이 아니라, 반려동물의 나이, 중성화 여부, 활동량 및 질환 상태를 고려한 에너지 요구량 계산이 선행되어야 합니다.
        </p>
      </section>

      <section className="guide-section">
        <h4>2. 주요 계산 공식</h4>
        <ul className="guide-list">
          <li><strong>RER (Resting Energy Requirement):</strong> 70 × (체중)^0.75. 안정 상태에서 생명을 유지하기 위한 최소 에너지입니다.</li>
          <li><strong>DER (Daily Energy Requirement):</strong> RER × 가중치(Factor). 활동량과 생리적 상태에 따라 가중치를 곱하여 최종 사료량을 결정합니다.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h4>3. 주요 가중치(Factor) 기준</h4>
        <ul className="guide-list">
          <li><strong>중성화된 성견:</strong> 1.6</li>
          <li><strong>체중 감량이 필요한 개:</strong> 1.0 - 1.2</li>
          <li><strong>성장기 강아지:</strong> 2.0 - 3.0</li>
          <li><strong>중성화된 성묘:</strong> 1.2 - 1.4</li>
        </ul>
      </section>

      <section className="guide-section">
        <h4>4. 사료 교체 시 주의사항</h4>
        <p>
          새로운 사료로 교체할 때는 위장관 장애를 방지하기 위해 7~10일에 걸쳐 점진적으로 기존 사료와 섞어 급여하는 것이 좋습니다.
        </p>
      </section>

      <div className="guide-reference">
        <p>※ 참고 문헌: WSAVA Global Nutrition Guidelines. 2024.</p>
      </div>

      <style>{`
        .food-guide-content h4 {
          font-size: 1.1rem;
          color: #1e293b;
          margin: 1.5rem 0 0.75rem;
          font-weight: 700;
        }
        .food-guide-content h4:first-child {
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

export default FoodGuide;
