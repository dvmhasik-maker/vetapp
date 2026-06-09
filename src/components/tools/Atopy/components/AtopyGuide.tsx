import React from 'react';

const AtopyGuide: React.FC = () => {
  return (
    <div className="atopy-guide-content">
      <section className="guide-section">
        <h4>1. 개 아토피성 피부염(CAD)이란?</h4>
        <p>
          개 아토피성 피부염은 유전적으로 소인이 있는 환자에서 환경 알레르겐(집먼지진드기, 꽃가루 등)에 대한 IgE 항체가 형성되어 발생하는 염증성, 가려움성 피부 질환입니다. 주로 생후 6개월에서 3세 사이에 증상이 시작되며, 평생 관리가 필요한 만성 질환입니다.
        </p>
      </section>

      <section className="guide-section">
        <h4>2. Favrot's Criteria (진단 기준 8가지)</h4>
        <p>아토피는 단일 검사로 진단되지 않으며, 임상 증상과 병력 제외 진단을 통해 판단합니다. 아래 8가지 항목 중 5가지 이상 만족 시 아토피 가능성이 높습니다.</p>
        <ul className="guide-list">
          <li>생후 3세 이전에 증상 시작</li>
          <li>주로 실내에서 생활하는 개</li>
          <li>스테로이드 반응성 가려움증</li>
          <li>병변이 없는 상태에서 가려움증 시작 (Pruritus sine materia)</li>
          <li>앞발(Forepaws)에 병변이 있음</li>
          <li>귓바퀴(Ear pinnae)에 병변이 있음</li>
          <li>귀 끝(Ear margins)에는 병변이 없음</li>
          <li>등/허리(Dorso-lumbar area)에는 병변이 없음</li>
        </ul>
      </section>

      <section className="guide-section">
        <h4>3. 견종별 호발 부위의 중요성</h4>
        <p>
          아토피는 견종에 따라 증상이 나타나는 주요 부위가 다릅니다. 예를 들어, <strong>프렌치 불독</strong>은 겨드랑이와 발가락 사이 증상이 두드러지는 반면, <strong>시바견</strong>은 눈 주위와 입술 주변의 병변이 흔합니다. 이러한 호발 부위 데이터는 초기 진단 시 음식 알레르기나 다른 피부 질환과의 감별에 중요한 단서가 됩니다.
        </p>
      </section>

      <section className="guide-section">
        <h4>4. 관리 및 치료의 기본 원칙</h4>
        <ul className="guide-list">
          <li><strong>피부 장벽 강화:</strong> 약용 샴푸, 보습제, 필수 지방산 급여</li>
          <li><strong>알레르겐 회피:</strong> 알레르기 검사 결과를 바탕으로 한 환경 개선</li>
          <li><strong>가려움증 조절:</strong> 아포퀠(Oclacitinib), 사이토포인트(Lokivetmab), 면역억제제 등 사용</li>
          <li><strong>이차 감염 제어:</strong> 세균(농피증) 또는 말라세지아 과증식 치료</li>
        </ul>
      </section>

      <div className="guide-reference">
        <p>※ 참고 문헌: Favrot C, et al. A prospective study on the clinical features of chronic canine atopic dermatitis and assessment of the specificity of criteria. Vet Dermatol. 2010.</p>
      </div>

      <style>{`
        .atopy-guide-content h4 {
          font-size: 1.1rem;
          color: #1e293b;
          margin: 1.5rem 0 0.75rem;
          font-weight: 700;
        }
        .atopy-guide-content h4:first-child {
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

export default AtopyGuide;
