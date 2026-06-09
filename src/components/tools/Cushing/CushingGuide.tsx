import React from 'react';

const CushingGuide: React.FC = () => {
  return (
    <div className="cushing-guide-content">
      <section className="guide-section">
        <h4>1. 부신피질기능항진증(Cushing's Syndrome)이란?</h4>
        <p>
          쿠싱 증후군은 부신에서 코르티솔(Cortisol) 호르몬이 과다하게 분비되어 발생하는 질환입니다. 주로 뇌하수체 종양(PDH)이나 부신 종양(AT)에 의해 발생하며, 다뇨, 다갈, 복부 팽만, 대칭성 탈모 등이 주요 증상으로 나타납니다.
        </p>
      </section>

      <section className="guide-section">
        <h4>2. 주요 확진 검사 가이드라인</h4>
        <p>임상 증상이 뚜렷할 때 아래 검사를 실시합니다.</p>
        <ul className="guide-list">
          <li><strong>LDDST (Low-Dose Dexamethasone Suppression Test):</strong> 가장 권장되는 선별 검사. 쿠싱 환자는 덱사메타손 투여 후에도 코르티솔 수치가 충분히 억제되지 않습니다.</li>
          <li><strong>ACTH 자극 검사:</strong> 의원성(Iatrogenic) 쿠싱 진단 및 치료 모니터링에 필수적입니다.</li>
          <li><strong>UCCR (Urine Cortisol:Creatinine Ratio):</strong> 배제 진단용으로 활용도가 높으며, 수치가 정상일 경우 쿠싱일 확률이 매우 낮습니다.</li>
        </ul>
      </section>

      <section className="guide-section">
        <h4>3. 치료(Trilostane) 모니터링 원칙</h4>
        <p>치료의 목표는 호르몬 수치를 정상화하는 것뿐만 아니라 환자의 '임상 증상'을 개선하는 데 있습니다.</p>
        <ul className="guide-list">
          <li>투약 후 약 2~4주 뒤 첫 모니터링 실시.</li>
          <li>임상 증상(음수량, 식욕 등)의 변화를 반드시 함께 기록해야 합니다.</li>
          <li>부작용: 기력 저하, 식욕 부진, 구토 등이 나타날 경우 즉시 투약을 중단하고 부신피질기능저하증(Addison's) 여부를 확인해야 합니다.</li>
        </ul>
      </section>

      <div className="guide-reference">
        <p>※ 참고 문헌: Behrend EN, et al. Diagnosis of spontaneous canine hyperadrenocorticism: 2012 ACVIM consensus statement (updated 2024).</p>
      </div>

      <style>{`
        .cushing-guide-content h4 {
          font-size: 1.1rem;
          color: #1e293b;
          margin: 1.5rem 0 0.75rem;
          font-weight: 700;
        }
        .cushing-guide-content h4:first-child {
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

export default CushingGuide;
