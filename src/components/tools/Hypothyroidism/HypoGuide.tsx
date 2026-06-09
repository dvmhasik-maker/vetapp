import React from 'react';

const HypoGuide: React.FC = () => {
  return (
    <div className="hypo-guide-content">
      <section className="guide-section">
        <h4>1. 개 갑상선기능저하증(Hypothyroidism)의 이해</h4>
        <p>
          개 갑상선기능저하증은 주로 갑상선 자체의 파괴(림프구성 갑상선염 또는 특발성 위축)로 인해 갑상선 호르몬 분비가 부족해지는 질환입니다. 신진대사 속도가 저하되어 체중 증가, 무기력증, 피부 질환 등이 나타나며, 정확한 진단을 위해서는 여러 호르몬 수치를 종합적으로 평가해야 합니다.
        </p>
      </section>

      <section className="guide-section">
        <h4>2. 진단 프로토콜 (K-Value 및 호르몬 분석)</h4>
        <p>단일 호르몬 검사만으로는 오진의 가능성이 높으므로, 다음과 같은 복합 지표를 활용합니다.</p>
        <ul className="guide-list">
          <li><strong>Total T4 (TT4):</strong> 선별 검사로 활용되나, 다른 질환(ESS)에 의해 낮게 측정될 수 있음.</li>
          <li><strong>Free T4 (by Equilibrium Dialysis):</strong> TT4보다 진단적 가치가 높으며, 비갑상선 질환의 영향을 적게 받음.</li>
          <li><strong>TSH (Thyrotropin):</strong> T4가 낮으면서 TSH가 높은 경우 진단적 가치가 매우 높음 (약 25-30%의 환자에서는 TSH가 정상일 수 있음).</li>
          <li><strong>K-Value:</strong> 0.7 * fT4(pmol/L) - TSH(ng/mL) 공식을 활용하여 비갑상선 질환과 진성 갑상선기능저하증을 감별하는 데 도움을 줍니다.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h4>3. 비갑상선 질환(Euthyroid Sick Syndrome)과의 감별</h4>
        <p>
          전신 질환, 약물(스테로이드, 페노바비탈 등) 사용 시 갑상선 호르몬 수치가 일시적으로 낮아질 수 있습니다. 이를 '정상 갑상선 기능성 병태'라고 하며, 이때는 호르몬 보충 없이 원인 질환을 치료하는 것이 우선입니다.
        </p>
      </section>

      <section className="guide-section">
        <h4>4. 치료 및 모니터링 원칙</h4>
        <ul className="guide-list">
          <li><strong>투약:</strong> Levothyroxine (T4) 보충. 주로 0.02 mg/kg, 1일 2회 투여.</li>
          <li><strong>모니터링 시점:</strong> 투약 후 4~6시간(Peak level)에 채혈하여 수치 확인.</li>
          <li><strong>조정:</strong> 임상 증상의 개선 여부와 호르몬 농도를 종합하여 용량 결정.</li>
        </ul>
      </section>

      <div className="guide-reference">
        <p>※ 참고 문헌: Scott-Moncrieff JC. Hypothyroidism. In: Ettinger SJ, Feldman EC, eds. Textbook of Veterinary Internal Medicine. 8th ed.</p>
      </div>

      <style>{`
        .hypo-guide-content h4 {
          font-size: 1.1rem;
          color: #1e293b;
          margin: 1.5rem 0 0.75rem;
          font-weight: 700;
        }
        .hypo-guide-content h4:first-child {
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

export default HypoGuide;
