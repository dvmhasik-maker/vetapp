import { AtopyBreed } from './types';

export const atopyBreedData: AtopyBreed[] = [
  {
    id: "maltese",
    ko: "말티즈",
    en: "Maltese",
    img: "/assets/images/atopy/Maltese.jpg",
    sites: "안면부(눈 주변, 주둥이), 귀(귓바퀴 하부), 겨드랑이(Axillae), 앞발 지간부(Interdigital)",
    features: [
      "국내에서 가장 높은 유병률을 보이는 품종 중 하나로, 초기에는 발을 핥는 증상(Pododermatitis)으로 다수 내원합니다.",
      "안면부 소양증으로 인해 눈 주변 발적 및 눈물 자국 심화, 주둥이를 바닥에 비비는 행동이 전형적입니다.",
      "만성화될 경우 귀 주변과 겨드랑이 피부가 비후되거나 태선화(Lichenification)가 빠르게 진행되는 경향이 있습니다."
    ],
    tip: "발가락 사이(지간부) 습기 관리가 필수적이며, 세균/말라세지아 2차 감염 과증식 여부를 정기적인 도말 검사(Cytology)로 모니터링해야 합니다."
  },
  {
    id: "poodle",
    ko: "푸들",
    en: "Poodle",
    img: "/assets/images/atopy/Poodle.jpg",
    sites: "외이도 및 귀 주변, 복부, 서혜부(Groin), 사지 말단부",
    features: [
      "외이염(Otitis Externa)이 아토피의 최우선 혹은 유일한 임상 증상으로 발현되는 경우가 매우 흔합니다.",
      "복부와 서혜부 피부가 얇아 발적(Erythema)과 구진(Papules)성 병변이 쉽게 관찰됩니다.",
      "모질의 특성상 털 엉킴이 발생하면 피부 환기가 저해되어 가려움증 증폭의 원인이 됩니다."
    ],
    tip: "귀 내부 털 관리와 함께 정기적인 외이도 세정이 필수적이며, 소양증 완화를 위해 JAK 억제제(Oclacitinib) 또는 단클론항체(Lokivetmab) 처방 시 반응성이 좋은 편입니다."
  },
  {
    id: "shihtzu",
    ko: "시츄",
    en: "Shih Tzu",
    img: "/assets/images/atopy/Shihtzu.jpg",
    sites: "안면부 주름, 귀, 겨드랑이, 목 아래, 복부 전체, 사지 원위부",
    features: [
      "전신성 피부염으로 이행되기 가장 쉬운 견종으로, 지루성 피부염(Seborrheic Dermatitis)을 동반하는 경우가 많습니다.",
      "단두종 특성상 안면 주름 사이의 습한 환경이 미생물 증식을 유도하여 안면 소양증이 매우 극심합니다.",
      "만성적인 귀 손상과 목/겨드랑이 부위의 말라세지아성 과증식이 특징적인 소견입니다."
    ],
    tip: "항진균 성분(Chlorhexidine, Miconazole)이 포함된 약용 샴푸 요법이 필수적이며, 피부 장벽 회복을 위한 필수지방산 공급을 적극 권장합니다."
  },
  {
    id: "bichon",
    ko: "비숑 프리제",
    en: "Bichon Frise",
    img: "/assets/images/atopy/Bichonfrise.jpg",
    sites: "눈 및 입 주변, 지간부전체, 전흉부(가슴 앞쪽), 회음부",
    features: [
      "미용 관리가 잦은 품종으로, 클리퍼 증후군이나 미용 후 자극이 아토피 증상을 촉발(Trigger)하는 경우가 잦습니다.",
      "입 주변을 지속적으로 핥아 털이 갈색으로 변색되는 증상이 흔히 동반됩니다.",
      "꼬리 기부나 회음부 주변을 핥거나 바닥에 끄는 행동을 보일 수 있습니다."
    ],
    tip: "미용 자극을 최소화하고 보습제를 충분히 사용해야 하며, 환경 알러젠(집먼지진드기 등)의 영향을 크게 받으므로 면역요법(ASIT) 고려 대상이 될 수 있습니다."
  },
  {
    id: "cocker",
    ko: "코커 스패니얼",
    en: "Cockerspaniel.jpg",
    img: "/assets/images/atopy/Cockerspaniel.jpg",
    sites: "귀(귓바퀴 전체 및 외이도), 이도 하부 목 피부, 전흉부, 지간부",
    features: [
      "해부학적으로 늘어진 귀 구조와 아토피 유전 소인이 결합하여 심각한 만성 증식성 외이염을 앓는 경우가 대다수입니다.",
      "귀 주변 피부뿐만 아니라 가슴 앞쪽(전흉부)의 만성적인 습진과 지루성 악취가 동반되기 쉽습니다.",
      "만성화 시 이도 연골의 석회화 및 폐색이 진행될 위험이 타 견종 대비 높습니다."
    ],
    tip: "귀 통풍 관리에 각별히 유의해야 하며, 만성 외이염 관리 시 스테로이드성 이점착제 투여와 함께 소염 관리가 공격적으로 진행되어야 합니다."
  },
  {
    id: "pomeranian",
    ko: "포메라니안",
    en: "Pomeranian",
    img: "/assets/images/atopy/Pomeranian.jpg",
    sites: "눈 주위, 주둥이, 지간부, 엉덩이 및 미근부",
    features: [
      "이중모 품종 특성상 피부 가려움증을 긁는 행위 외에도 털을 뜯거나 씹는 행동으로 표출하는 경우가 많습니다.",
      "안면부 긁음으로 인한 털 빠짐과 눈가 발적이 두드러집니다.",
      "아토피성 외이염보다는 안면 및 사지 말단부의 국소적 소양증 호발 비율이 상대적으로 높습니다."
    ],
    tip: "잦은 목욕은 속털의 건조증을 유발하므로 보습 관리가 우선시되어야 하며, 탈모증(Alopcia X 등)과의 감별 진단이 요구됩니다."
  },
  {
    id: "frenchbulldog",
    ko: "프렌치 불독",
    en: "French Bulldog",
    img: "/assets/images/atopy/Frenchbulldog.jpg",
    sites: "안면 주름부, 액와부(겨드랑이), 서혜부, 지간부, 꼬리 주름",
    features: [
      "피부 접힘(Skin folds) 부위 전체가 일차적인 타겟이며, 마찰과 습기로 인한 피부염 강도가 매우 높습니다.",
      "겨드랑이와 간혹 복부 전체가 붉어지는 전신 발적성 병변이 흔합니다.",
      "지간염이 심해지면 지간 직포종(Interdigital cysts)으로 이행되어 보행 불편을 호소하기도 합니다."
    ],
    tip: "매일 주름 사이를 무알콜 패드로 닦아주고 건조시켜야 하며, 식이 알러지(AFR)가 아토피와 복합되어 나타나는 경우가 많으므로 철저한 제한식이(Elimination Diet) 병행을 추천합니다."
  },
  {
    id: "yorkshire",
    ko: "요크셔 테리어",
    en: "Yorkshire Terrier",
    img: "/assets/images/atopy/Yorkshireterrier.jpg",
    sites: "귀 기부, 안면부, 등선(Dorsal midline)을 포함한 전신 피부",
    features: [
      "전형적인 아토피 분포 구역 외에도 등줄기나 몸통 측면 부위의 소양감 및 건조성 각질을 호소하는 특이성을 보입니다.",
      "피부가 매우 민감하여 2차 농피증(Pyoderma)이 잦게 발생합니다.",
      "나이가 들면서 알러지성 과민반응이 심화되는 경향이 뚜렷합니다."
    ],
    tip: "세균성 농피증 치료를 위한 일차적 항생제 요법 또는 천연 항균 샴푸가 지시되며, 전신 장벽 강화를 위한 세라마이드 탑재 보습 제품이 유용합니다."
  },
  {
    id: "dachshund",
    ko: "닥스훈트",
    en: "Dachshund",
    img: "/assets/images/atopy/Dachshund.jpg",
    sites: "복부, 서혜부, 액와부(겨드랑이), 이도 하부",
    features: [
      "신체 구조상 지면과 복부 피부의 거리가 가까워 외부 환경 알러젠(잔디, 먼지 등)에 직접 접촉하여 발생하는 접촉성 복부 알러지 양상이 자주 복합됩니다.",
      "겨드랑이와 흉골 하부 라인의 피부가 쓸리며 발적과 색소침착이 가속화됩니다.",
      "사지 말단 지간부의 발적도 주요 지표 중 하나입니다."
    ],
    tip: "산책 시 복부를 보호할 수 있는 기능성 의류 착용이 도움이 될 수 있으며, 잔디 산책 후에는 즉시 사지와 복부를 세정 및 건조해 주는 환경 통제가 권장됩니다."
  }
];
