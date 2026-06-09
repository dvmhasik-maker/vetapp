import { SpeciesConfig, BrandProducts } from './types';

export const statusConfig: SpeciesConfig = {
  dog: [
    { text: "비만", val: 1.0 },
    { text: "비만 경향", val: 1.4 },
    { text: "중성화 수술", val: 1.6 },
    { text: "운동량 없음", val: 1.8 },
    { text: "가벼운 운동", val: 2.0 },
    { text: "적당한 운동", val: 3.0 },
    { text: "심한 운동", val: 6.0 },
    { text: "성견 체중의 50%이하 (성장기 자견)", val: 3.0 },
    { text: "성견 체중의 50~80% (성장기 자견)", val: 2.5 },
    { text: "성견 체중의 80%이상 (성장기 자견)", val: 2.0 }
  ],
  cat: [
    { text: "비만", val: 1.0 },
    { text: "비만 경향", val: 1.0 },
    { text: "중성화 수술", val: 1.2 },
    { text: "운동량 없음", val: 1.4 },
    { text: "가벼운 운동", val: 1.6 },
    { text: "적당한 운동", val: 2.0 },
    { text: "심한 운동", val: 4.5 },
    { text: "성묘 체중의 50%이하 (성장기 자묘)", val: 3.0 },
    { text: "성묘 체중의 50~80% (성장기 자묘)", val: 2.5 },
    { text: "성묘 체중의 80%이상 (성장기 자묘)", val: 2.0 }
  ]
};

export const brandProductPreset: { dog: BrandProducts; cat: BrandProducts } = {
  dog: {
    royal_canin: [
      { name: "미니 스타터 마더&베이비독", kcal: 4.26 },
      { name: "미니 인도어 퍼피", kcal: 3.91 },
      { name: "미니 인도어 어덜트", kcal: 3.78 },
      { name: "미니 어덜트", kcal: 3.96 },
      { name: "맥시 어덜트", kcal: 3.95 },
      { name: "말티즈 어덜트", kcal: 4.02 },
      { name: "푸들 어덜트", kcal: 4.06 },
      { name: "포메라니안 어덜트", kcal: 3.93 },
      { name: "처방식 - 가스트로인테스티날 (소화기)", kcal: 4.07 },
      { name: "처방식 - 가스트로인테스티날 로우 팻 (저지방)", kcal: 3.45 },
      { name: "처방식 - 유리너리 S/O (하부요로계)", kcal: 3.86 },
      { name: "처방식 - 유리너리 S/O 모더레이트 칼로리", kcal: 3.31 },
      { name: "처방식 - 레날 (만성신부전)", kcal: 3.99 },
      { name: "처방식 - 헤파틱 (간담도계)", kcal: 3.90 },
      { name: "처방식 - 아날러제닉 (아토피/알러지)", kcal: 3.88 },
      { name: "처방식 - 하이포알러제닉 (저알러지)", kcal: 4.00 },
      { name: "처방식 - 하이포알러제닉 + 세타이어티", kcal: 2.85 },
      { name: "처방식 - 하이포알러제닉 + 세타이어티 스몰독", kcal: 2.59 },
      { name: "처방식 - 유리너리 S/O + 세타이어티 스몰독", kcal: 2.90 },
      { name: "처방식 - 유리너리 S/O + 하이포알러제닉 스몰독", kcal: 3.48 },
      { name: "처방식 - 레날 + 하이포알러제닉 스몰독", kcal: 3.99 },
      { name: "처방식 - 가스트로인테스티널 로우팻 하이포알러제닉", kcal: 3.28 },
      { name: "처방식 - 세타이어티 서포트 (체중 관리)", kcal: 2.86 },
      { name: "처방식 - 모빌리티 C2P+ (관절강화)", kcal: 3.68 },
      { name: "처방식 - 스킨 서포트 (피부질환)", kcal: 3.64 },
      { name: "처방식 - 화이버 리스폰스 (변비개선)", kcal: 3.68 }
    ],
    hills: [
      { name: "사이언스 다이어트 퍼피 스몰바이트", kcal: 3.81 },
      { name: "사이언스 다이어트 어덜트 스몰앤미니", kcal: 3.73 },
      { name: "사이언스 다이어트 어덜트 라이트 스몰앤미니", kcal: 2.97 },
      { name: "사이언스 다이어트 어덜트 퍼펙트다이제스천", kcal: 3.66 },
      { name: "사이언스 다이어트 어덜트 7+ 시니어", kcal: 3.62 },
      { name: "처방식 - i/d (소화기 질환 관리)", kcal: 3.71 },
      { name: "처방식 - i/d Low Fat (저지방 소화기)", kcal: 3.34 },
      { name: "처방식 - c/d Multicare (비뇨기 결석 관리)", kcal: 3.87 },
      { name: "처방식 - k/d (만성 신장병 관리)", kcal: 4.21 },
      { name: "처방식 - z/d (식이 알레르기 제어)", kcal: 3.62 },
      { name: "처방식 - d/d (피부 및 식이 알레르기)", kcal: 3.74 },
      { name: "처방식 - w/d (당뇨 및 체중 유지)", kcal: 3.24 },
      { name: "처방식 - r/d (체중 감량 전용)", kcal: 3.12 },
      { name: "처방식 - Metabolic (비만 및 요요 방지식)", kcal: 3.11 },
      { name: "처방식 - j/d (관절 건강 보호)", kcal: 3.92 }
    ],
    healmedix: [
      { name: "처방식 - 카디악 & 레날 (Heart/Kidney)", kcal: 3.95 },
      { name: "처방식 - 가스트로인테스티날 저지방 (소화기/췌장염)", kcal: 3.35 },
      { name: "처방식 - 하이포알러제닉 (H/A 식의알러지)", kcal: 3.72 },
      { name: "처방식 - 하이포알러제닉 컷 (H/A Cut 가수분해)", kcal: 3.65 },
      { name: "처방식 - 유리너리 (비뇨기 결석)", kcal: 3.80 },
      { name: "처방식 - 웨이트 제어 (Weight 비만관리)", kcal: 3.05 },
      { name: "처방식 - 조인트 서포트 (Joint 관절케어)", kcal: 3.60 },
      { name: "수프림 - 퍼피 (Supreme 성장기)", kcal: 3.85 },
      { name: "수프림 - 어덜트 (Supreme 성견용)", kcal: 3.68 },
      { name: "수프림 - 웨이트 케어 (체중 유지용)", kcal: 3.20 }
    ],
    velixer: [
      { name: "처방식 - AF (Atopy Free 아토피/피부)", kcal: 3.61 },
      { name: "처방식 - GF (Gut Free 위장관/소화기)", kcal: 3.55 },
      { name: "처방식 - KF (Kidney Free 신장 관리)", kcal: 3.92 },
      { name: "처방식 - UF (Urinary Free 요로 결석)", kcal: 3.67 },
      { name: "처방식 - OD (Obesity/Diabetes 비만·당뇨)", kcal: 2.95 },
      { name: "처방식 - JS (Joint Support 관절 보호)", kcal: 3.50 },
      { name: "처방식 - AG (Anti-Aging 노령견 인지장애)", kcal: 3.70 },
      { name: "일반식 - 벨릭서 내츄럴 어덜트 (유기농)", kcal: 3.63 },
      { name: "일반식 - 벨릭서 내츄럴 퍼피 (성장기)", kcal: 3.78 }
    ]
  },
  cat: {
    royal_canin: [
      { name: "마더 & 베이비캣", kcal: 4.42 },
      { name: "키튼 (성장기 묘구)", kcal: 4.10 },
      { name: "인도어 (실내묘 전용)", kcal: 3.75 },
      { name: "인도어 7+ (노령묘)", kcal: 3.79 },
      { name: "헤어볼 케어 (헤어볼 배출)", kcal: 3.76 },
      { name: "처방식 - 가스트로인테스티날 (소화계)", kcal: 4.08 },
      { name: "처방식 - 유리너리 S/O (비뇨기)", kcal: 3.87 },
      { name: "처방식 - 유리너리 S/O 올팩토리 (식욕촉진)", kcal: 3.88 },
      { name: "처방식 - 유리너리 S/O + 블래더 컴포트 (스트레스 관리)", kcal: 3.49 },
      { name: "처방식 - 유리너리 S/O + 블래더 컴포트 + 세타이어티", kcal: 3.13 },
      { name: "처방식 - 유리너리 S/O + 하이포알러제닉", kcal: 3.63 },
      { name: "처방식 - 레날 (만성 신부전)", kcal: 3.92 },
      { name: "처방식 - 레날 + 하이포알러제닉", kcal: 3.98 },

      {name: "처방식 - 얼리 레날 (조기 신부전)", kcal: 3.93},
      {name: "처방식 - 레날 셀렉트 (기호성 강화)", kcal: 4.11},
      {name: "처방식 - 레날 스페셜 (풍미 강화)", kcal: 4.04},
      {name: "처방식 - 가스트로인테스티날 모더레이트 칼로리", kcal: 3.50},
      {name: "처방식 - 가스트로인테스티날 화이버 리스폰스", kcal: 3.76},
      {name: "처방식 - 세타이어티 (과체중 관리)", kcal: 3.09},
      {name: "처방식 - 뉴터드 세타이어티 밸런스 (중성화)", kcal: 3.35},
      {name: "처방식 - 하이포알러제닉 (알러지 차단)", kcal: 4.10},
      {name: "처방식 - 다이어베틱 (당뇨 관리)", kcal: 3.57},
      {name: "처방식 - 캄 (스트레스 관리)", kcal: 3.66},
      {name: "처방식 - 덴탈 (구강 관리)", kcal: 3.55}
      ],

    hills: [
      { name: "사이언스 다이어트 키튼 치킨", kcal: 4.25 },
      { name: "사이언스 다이어트 어덜트 실내묘 치킨", kcal: 3.55 },
      { name: "사이언스 다이어트 어덜트 헤어볼 컨트롤", kcal: 3.69 },
      { name: "사이언스 다이어트 어덜트 라이트", kcal: 3.17 },
      { name: "처방식 - i/d (급만성 장염 완화)", kcal: 4.02 },
      { name: "처방식 - c/d Multicare (FIC 특발성 방광염)", kcal: 3.88 },
      { name: "처방식 - k/d (고양이 신부전 전용)", kcal: 4.22 },
      { name: "처방식 - z/d (식이 알레르기 관리)", kcal: 3.65 },
      { name: "처방식 - m/d (당뇨병 및 체중 관리)", kcal: 3.95 },
      { name: "처방식 - Metabolic (대사 활성 체중조절)", kcal: 3.48 },
      { name: "처방식 - y/d (갑상선 기능 항진증 관리)", kcal: 4.34 }
    ],
    healmedix: [
      { name: "처방식 - 펠라인 유리너리 (Feline 비뇨기 결석)", kcal: 3.82 },
      { name: "처방식 - 펠라인 레날 (Feline 신부전 관리)", kcal: 4.12 },
      { name: "처방식 - 펠라인 하이포알러제닉 (식이알러지)", kcal: 3.75 },
      { name: "처방식 - 펠라인 가스트로인테스티날 (소화기)", kcal: 3.90 },
      { name: "수프림 - 펠라인 키튼 (성장기 묘구)", kcal: 4.05 },
      { name: "수프림 - 펠라인 인도어 (실내 반려묘 어덜트)", kcal: 3.65 }
    ],
    velixer: [
      { name: "처방식 - F-AF (Feline Atopy 피부 장벽 완화)", kcal: 3.72 },
      { name: "처방식 - F-KF (Feline Kidney 신부전 케어)", kcal: 4.05 },
      { name: "처방식 - F-UF (Feline Urinary 하부요로계)", kcal: 3.79 },
      { name: "처방식 - F-GF (Feline Gut 위장관 질환 완화)", kcal: 3.68 },
      { name: "처방식 - F-OD (Feline Obesity/Diabetes 비만관리)", kcal: 3.15 },
      { name: "일반식 - 벨릭서 내츄럴 펠라인 어덜트 (유기농)", kcal: 3.66 }
    ]
  }
};
