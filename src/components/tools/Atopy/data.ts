import { AtopyBreed } from './types';

// Use Vite's BASE_URL for flexible deployment
const BASE_URL = import.meta.env.BASE_URL || '/';
const BASE_PATH = `${BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/'}assets/images/atopy`;

export const atopyGeneralStats = {
  title: "국내 소형-중형견 아토피 유병률 조사 결과 (N=331)",
  meanAge: "조사 대상의 93%가 소형-중형견 (<25kg)",
  genderRatio: "말티즈, 푸들, 시츄, 비숑 등 9개 품종 집중 분석",
  rankings: [
    { site: "외이도 (Medial pinna)", rate: "약 41~82%" },
    { site: "발 (Paws)", rate: "약 23~91%" },
    { site: "회음부 (Perineum)", rate: "약 45~82%" },
    { site: "복부 (Ventral trunk)", rate: "약 18~51%" },
    { site: "액와 (Axilla)", rate: "약 5~45%" }
  ],
  reference: "Prevalence and lesion distribution of atopic dermatitis in small-to-medium breed dogs in Korea"
};

export const atopyBreedData: AtopyBreed[] = [
  {
    id: "maltese",
    ko: "말티즈",
    en: "Maltese",
    img: `${BASE_PATH}/Maltese.jpg`,
    sites: "외이도(63%), 발(35%), 회음부(53%), 눈 주변(34%)",
    features: [
      "국내 아토피 환자 중 가장 높은 비중(20.5%)을 차지하나, 전체 등록견 대비 유병률 증가(OR 0.90)는 유의적이지 않습니다.",
      "특정 부위에 집중된 '시그니처' 패턴 없이 일반적인 cAD 분포를 보입니다.",
      "외이염(63%)과 발 병변(35%)이 흔하게 관찰됩니다."
    ],
    tips: [
      "품종 특이적 패턴보다는 전형적인 아토피 호발 부위를 전체적으로 평가하십시오.",
      "개체별 병변 위치에 따른 맞춤형 관리가 중요합니다."
    ],
    isSignificant: false
  },
  {
    id: "shihtzu",
    ko: "시츄",
    en: "Shih Tzu",
    img: `${BASE_PATH}/Shihtzu.jpg`,
    sites: "복부(51%), 액와(43%), 복측 경부(40%), 앞다리 굽힘 부위",
    features: [
      "등록견 대비 아토피 유병률이 유의적으로 높습니다 (OR 1.78).",
      "복측(Ventral) 부위 병변이 51%로 매우 특징적입니다.",
      "복측 경부, 액와, 복부, 서혜부 등 몸의 아래쪽 부위에 병변이 집중됩니다.",
      "앞다리 굽힘 부위(Cubital flexor) 병변 증가가 타 품종 대비 유의적입니다."
    ],
    tips: [
      "목주름, 겨드랑이(액와), 복부 등 복측 부위를 집중적으로 검사하십시오.",
      "피부 접힘 부위의 2차 감염 관리가 필수적입니다."
    ],
    isSignificant: true
  },
  {
    id: "poodle",
    ko: "푸들",
    en: "Poodle",
    img: `${BASE_PATH}/Poodle.jpg`,
    sites: "외이도(68%), 회음부(62%), 발(40%), 복부(40%)",
    features: [
      "국내 아토피 환자의 약 15.1%를 차지하며, 외이염(68%) 발생 빈도가 높습니다.",
      "등록견 대비 유병률 증가(OR 0.83)는 유의적이지 않습니다.",
      "눈 주변(44%) 병변이 타 품종 대비 상대적으로 높은 빈도를 보입니다."
    ],
    tips: [
      "외이염과 함께 안면부(눈 주변), 회음부 관리에 유의하십시오.",
      "일반적인 cAD 관리 프로토콜을 따릅니다."
    ],
    isSignificant: false
  },
  {
    id: "bichon",
    ko: "비숑 프리제",
    en: "Bichon Frise",
    img: `${BASE_PATH}/Bichonfrise.jpg`,
    sites: "외이도(52%), 발(48%), 회음부(56%), 눈 주변(41%)",
    features: [
      "등록견 대비 유병률 증가(OR 1.34)는 통계적으로 유의하지 않았습니다.",
      "특징적인 부위 집중 패턴 없이 전형적인 cAD 분포를 보입니다.",
      "발(48%)과 회음부(56%) 병변이 주요 관찰 대상입니다."
    ],
    tips: [
      "전신적인 아토피 평가 지침을 적용하십시오.",
      "털 관리와 병행하여 피부 위생을 유지하는 것이 중요합니다."
    ],
    isSignificant: false
  },
  {
    id: "pomeranian",
    ko: "포메라니안",
    en: "Pomeranian",
    img: `${BASE_PATH}/Pomeranian.jpg`,
    sites: "외이도(50%), 회음부(45%), 복부(41%), 발(23%)",
    features: [
      "등록견 대비 유병률 증가(OR 0.57)는 확인되지 않았습니다.",
      "복부(41%)와 외이도(50%) 병변이 가장 흔합니다.",
      "타 품종 대비 발 병변 빈도가 상대적으로 낮은 경향을 보입니다."
    ],
    tips: [
      "복부와 귀 상태를 정기적으로 확인하십시오.",
      "개체별 증상에 따른 유동적인 치료 계획을 세우십시오."
    ],
    isSignificant: false
  },
  {
    id: "yorkshire",
    ko: "요크셔 테리어",
    en: "Yorkshire Terrier",
    img: `${BASE_PATH}/Yorkshireterrier.jpg`,
    sites: "외이도(55%), 회음부(55%), 복부(45%), 발(36%)",
    features: [
      "조사 대상 중 유병률 증가(OR 0.54)는 유의적이지 않았습니다.",
      "외이도와 회음부 병변이 각각 55%로 가장 흔하게 나타납니다."
    ],
    tips: [
      "귀와 회음부 위생 관리에 집중하십시오.",
      "일반적인 아토피 평가 가이드를 따릅니다."
    ],
    isSignificant: false
  },
  {
    id: "cocker",
    ko: "코커 스패니얼",
    en: "Cocker Spaniel",
    img: `${BASE_PATH}/Cockerspaniel.jpg`,
    sites: "외이도(68%), 회음부(76%), 발(52%), 입 주변(36%)",
    features: [
      "등록견 대비 아토피 유병률이 매우 높은 고위험 품종입니다 (OR 5.22).",
      "회음부(76%)와 외이도(68%)에서 높은 병변 빈도를 보입니다.",
      "특정 부위 '시그니처' 패턴보다는 전신적으로 높은 발생률을 보이는 것이 특징입니다."
    ],
    tips: [
      "고위험 품종이므로 조기 진단과 적극적인 전신 관리가 권장됩니다.",
      "반복적인 외이염 및 회음부 피부염을 세밀하게 모니터링하십시오."
    ],
    isSignificant: true
  },
  {
    id: "frenchbulldog",
    ko: "프렌치 불독",
    en: "French Bulldog",
    img: `${BASE_PATH}/Frenchbulldog.jpg`,
    sites: "발(91%), 외이도(82%), 입술 주름(64%), 꼬리 주름(27%)",
    features: [
      "등록견 대비 아토피 유병률이 유의적으로 높습니다 (OR 4.07).",
      "피부 주름(Skin folds) 부위에 병변이 집중되는 특징적인 패턴을 보입니다.",
      "입술 주름(64%) 및 꼬리 주름(27%) 병변이 타 품종 대비 매우 유의적입니다.",
      "발 병변 빈도(91%)가 조사 대상 중 가장 높습니다."
    ],
    tips: [
      "입술 및 꼬리 주름 사이의 위생 관리와 지간염 관리를 최우선으로 하십시오.",
      "주름 부위의 습기 조절과 2차 감염 예방이 핵심입니다."
    ],
    isSignificant: true
  },
  {
    id: "dachshund",
    ko: "닥스훈트",
    en: "Dachshund",
    img: `${BASE_PATH}/Dachshund.jpg`,
    sites: "등쪽 흉부(71%), 등허리(43%), 외이도(57%), 발(71%)",
    features: [
      "일반적인 cAD와 달리 등쪽 흉부(Dorsal thorax) 병변이 71%로 매우 특징적입니다.",
      "Dorso-lumbar 부위의 병변 분포가 타 품종 대비 유의적으로 높습니다.",
      "전형적인 아토피 부위가 아닌 곳에 증상이 나타날 수 있음을 유의해야 합니다."
    ],
    tips: [
      "등과 허리 부위의 피부 상태를 반드시 확인하십시오.",
      "등쪽 병변이 위주일 경우 다른 피부 질환과 혼동될 수 있으나 cAD 가능성을 강력히 고려해야 합니다."
    ],
    isSignificant: true
  }
];
