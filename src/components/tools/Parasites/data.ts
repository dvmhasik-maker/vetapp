import { ParasiteData } from './types';

export const parasiteData: ParasiteData[] = [
  {
    ko: "원충 (지아르디아 / 콕시듐 등)",
    en: "Protozoa (Giardia, Coccidia spp.)",
    sci: "Giardia duodenalis / Cystoisospora spp.",
    dog: {
      site: "소장 점막 상피세포 및 장관 내 고착 생존",
      treatment: `
        <ul>
          <li><b>Giardia 치료:</b> Fenbendazole 50 mg/kg, PO, q24h 간격으로 3~5일 연속 투여 (가장 안전). 또는 Metronidazole 25 mg/kg, PO, q12h 간격으로 5~7일간 투여.</li>
          <li><b>Coccidia 치료:</b> Sulfadimethoxine 부하량 55 mg/kg 1회 투여 후 유지량 27.5 mg/kg, PO, q24h로 증상 소실 시까지 투여. Ponazuril 20~50 mg/kg, PO, 1~3일 투여도 효과적.</li>
        </ul>
      `
    },
    cat: {
      site: "소장 및 대장 장관 내 점막",
      treatment: `
        <ul>
          <li><b>Giardia 치료:</b> Fenbendazole 50 mg/kg, PO, q24h 간격으로 3~5일 연속 투여. 고양이는 Metronidazole 전정신경독성에 매우 민감하므로 <b>일일 총량이 25mg/kg/day를 넘지 않도록 극도로 주의</b>.</li>
          <li><b>Coccidia 치료:</b> Sulfadimethoxine 부하량 55 mg/kg 복용 후 27.5 mg/kg, PO, q24h 간격으로 5~10일간 유지. Ponazuril 20 mg/kg 단회 혹은 3일 요법 가능.</li>
        </ul>
      `
    },
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/3/39/Giardia_intestinalis_trophozoite.png",
      magnification: "400x (High Power)",
      description: "지아르디아 영양형(Trophozoite). 광학 현미경(400배율) 하에서 관찰되는 전형적인 서양배 모양과 두 개의 핵(눈 모양)을 확인할 수 있음."
    }
  },
  {
    ko: "편충",
    en: "Whipworms",
    sci: "Trichuris vulpis",
    dog: {
      site: "맹장 및 대장 점막 (Cecum & Colon)",
      treatment: `
        <ul>
          <li><b>Fenbendazole:</b> 50 mg/kg, PO, q24h 간격으로 <b>3일 연속 투여</b>. 충란의 생활사를 고려하여 <b>3주 후 및 3개월 후에 반드시 재구충</b> 실시.</li>
          <li><b>Febantel 복합제:</b> Febantel/Pyrantel/Praziquantel 제제를 체중별 기준 용량에 맞춰 3일간 연속 투여.</li>
          <li>Milbemycin oxime 또는 Moxidectin 성분의 정기적 매달 예방제를 통한 감염 제어 권장.</li>
        </ul>
      `
    },
    cat: {
      site: "고양이 편충(Trichuris serrata)은 매우 드묾",
      treatment: `
        <ul>
          <li>북미 및 국내 고양이에서의 자생적 감염은 매우 드문 편이나, 확진 시 개에 준하여 Fenbendazole(50 mg/kg, PO, 3일) 투여를 고려하거나 임상 증상에 따른 대증치료를 병행함.</li>
        </ul>
      `
    },
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Whipworm_egg.JPG",
      magnification: "400x (High Power)",
      description: "특징적인 럭비공 모양의 충란. 양 끝에 투명한 극성 플러그(Polar plugs)가 있음."
    }
  },
  {
    ko: "구충 (십이지장충)",
    en: "Hookworms",
    sci: "Ancylostoma caninum / Uncinaria stenocephala",
    dog: {
      site: "소장 점막 부착 및 흡혈 (Small Intestine)",
      treatment: `
        <ul>
          <li><b>Pyrantel pamoate:</b> 5~10 mg/kg, PO, 단회 투여. 성충만 사멸하므로 이행 자충 사멸을 위해 <b>2주 간격으로 최소 2~3회 반복 투여</b>.</li>
          <li><b>Fenbendazole:</b> 50 mg/kg, PO, q24h 간격으로 3일 연속 투여.</li>
          <li><b>주의:</b> 유충 이동으로 인한 피부염 및 모유 이행 감염 주의. 자견의 경우 심각한 빈혈 유발 가능.</li>
        </ul>
      `
    },
    cat: {
      site: "소장 (Ancylostoma tubaeforme)",
      treatment: `
        <ul>
          <li><b>Pyrantel pamoate:</b> 20 mg/kg, PO, 단회 투여 후 2주 뒤 재투여.</li>
          <li><b>Emodepside/Praziquantel (스팟온):</b> 고양이 전용 탑시컬 제제로 효과적인 단회 구제 가능.</li>
          <li>고양이 구충은 인수공통감염증(cutaneous larva migrans)을 유발하므로 보호자 접촉 주의 필요.</li>
        </ul>
      `
    },
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/63/Canine_hookworm_egg_1.JPG",
      magnification: "100x (Scanning/Low Power)",
      description: "얇은 벽으로 둘러싸인 타원형 충란. 내부에는 할구(Blastomere)가 관찰됨."
    }
  },
  {
    ko: "회충",
    en: "Roundworms",
    sci: "Toxocara canis / Toxocara cati",
    dog: {
      site: "소장 관강 내 (Small Intestine)",
      treatment: `
        <ul>
          <li><b>Pyrantel pamoate:</b> 5~10 mg/kg, PO, 1회 투여. 장내 성충만 사멸시키므로 조직 내 이행 유충 성숙 주기를 고려하여 <b>2주 후 재투여 필수</b>.</li>
          <li><b>Fenbendazole:</b> 50 mg/kg, PO, q24h로 3일 연속 투여.</li>
          <li>생후 2주령부터 시작하여 2주 간격으로 8주령까지 정기 구충 권장 (태반 및 모유 이행 차단).</li>
        </ul>
      `
    },
    cat: {
      site: "소장 (Small Intestine)",
      treatment: `
        <ul>
          <li><b>Pyrantel pamoate:</b> 20 mg/kg, PO, 1회 투여 후 2주 뒤 재구충.</li>
          <li><b>Milbemycin / Selamectin / Moxidectin / Emodepside:</b> 스팟온 복합제를 통해 자충 및 성충 동시 제어 가능. 고양이는 태반 이행은 없으나 모유 감염이 주된 경로임.</li>
        </ul>
      `
    },
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Toxocara_canis.JPG",
      magnification: "400x (High Power)",
      description: "두꺼운 벽과 거친 표면(Pitted shell)을 가진 원형의 충란."
    }
  },
  {
    ko: "조충 (촌충)",
    en: "Tapeworms",
    sci: "Dipylidium caninum / Taenia spp.",
    dog: {
      site: "소장 내부 착생 (Small Intestine)",
      treatment: `
        <ul>
          <li><b>Praziquantel (가장 효과적):</b> 5 mg/kg, PO 또는 IM/SC 단회 투여. 후속 감염 예방을 위해 2주 뒤 반복 가능.</li>
          <li><b>Epsiprantel:</b> 5.5 mg/kg, PO, 단회 투여.</li>
          <li><b>벼룩(Flea) 제어 필수:</b> <i>Dipylidium caninum</i>의 중간숙주가 벼룩이므로 외부기생충 구제를 동시 진행하지 않으면 100% 재감염됨.</li>
        </ul>
      `
    },
    cat: {
      site: "소장 내부 (Small Intestine)",
      treatment: `
        <ul>
          <li><b>Praziquantel:</b> 5 mg/kg, PO 또는 SC 단회 주사. 고양이 전용 복합 외용제(스팟온)에 포함된 Praziquantel 성분으로도 쉽게 구제 가능.</li>
          <li>개와 마찬가지로 주변 환경의 벼룩 및 중간숙주(쥐 등 소동물) 섭식 차단이 예방의 핵심.</li>
        </ul>
      `
    },
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/1/11/Dipyl_can_egg1.JPG",
      magnification: "400x (High Power)",
      description: "개조충(Dipylidium)의 특징적인 충란 주머니(Egg packet). 내부에 여러 개의 충란이 들어있음."
    }
  },
  {
    ko: "개선충 (옴진드기)",
    en: "Sarcoptic Mange (Scabies)",
    sci: "Sarcoptes scabiei var. canis",
    dog: {
      site: "피부 각질층 내 터널 형성 (심한 소양증, 팔꿈치/귀 끝)",
      treatment: `
        <ul>
          <li><b>Isooxazoline 계열 (Afoxolaner, Sarolaner, Fluralaner 등):</b> 경구용 외부기생충 제품 단회 투여로 매우 높은 구제율 확인 (CAPC 권장).</li>
          <li><b>Selamectin / Moxidectin (스팟온):</b> 2주 간격으로 최소 2~3회 연속 도포.</li>
          <li>전염성이 매우 강하므로 동거견 동시 치료 및 전신 환경 소독 필수. 인수공통 감염 유의.</li>
        </ul>
      `
    },
    cat: {
      site: "고양이 개선충(Notoedres cati) - 두부, 안면부 각질화",
      treatment: `
        <ul>
          <li><b>Fluralaner (브라벡토 캣) / Selamectin / Moxidectin 국소 도포:</b> 고양이 전용 제품을 정량 도포하여 치료.</li>
          <li><span style="color:red;">⚠️ 절대 금기: 개 전용 개선충 스프레이나 퍼메트린 성분 제품을 고양이에게 적용 시 치명적인 신경독성 유발.</span></li>
        </ul>
      `
    },
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Canine_scabies_mite.JPG",
      magnification: "100x (Scanning/Low Power)",
      description: "개선충(Sarcoptes scabiei) 실물 현미경 사진. 원형의 몸체와 짧은 다리가 특징."
    }
  },
  {
    ko: "귀진드기",
    en: "Ear Mites",
    sci: "Otodectes cynotis",
    dog: {
      site: "외이도 안쪽 및 이도 피부 표면 (흑갈색 귀지 발생)",
      treatment: `
        <ul>
          <li><b>외용 스팟온 제제:</b> Selamectin 또는 Moxidectin 복합제를 1달 간격으로 1~2회 도포.</li>
          <li><b>경구용 Isooxazoline 제제:</b> Sarolaner, Fluralaner 등 복용 시 신속히 귀진드기가 사멸됨.</li>
          <li>치료 전 외이도 내 검은 귀지를 귀 세정제를 이용해 완만하게 세정(플러싱)해 주는 것이 진행 속도를 촉진함.</li>
        </ul>
      `
    },
    cat: {
      site: "외이도 내 감염 (고양이 다두 사육 가구 빈발)",
      treatment: `
        <ul>
          <li><b>Selamectin 또는 Fluralaner(캣 전용) 스팟온 도포:</b> 단회 도포로 외이도 내 이물과 진드기 제어 탁월.</li>
          <li>이도 내 직접 점적하는 Ear drop 약물 사용 시 고양이 이독성(Ototoxicity) 및 전정계 증상(고개 기울임)이 유발될 수 있으므로, 안전성이 검증된 국소 스팟온 치료를 우선 권장.</li>
        </ul>
      `
    },
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Otodectes_cynotis.jpg",
      magnification: "100x (Scanning/Low Power)",
      description: "귀지로 가득 찬 이도에서 발견되는 귀진드기. 다리가 길고 활동성이 좋음."
    }
  },
  {
    ko: "참진드기 (살인진드기 / 매개 질병)",
    en: "Ixodid Ticks",
    sci: "Haemaphysalis, Ixodes, Rhipicephalus spp.",
    dog: {
      site: "피부 부착 흡혈 및 혈액 내 매개체(바베시아, 아나플라즈마) 전파",
      treatment: `
        <ul>
          <li><b>정기 구제 (Isooxazoline 계열 경구제):</b> 흡혈 시작 후 수 시간 내 사멸시켜 병원체 이행을 차단함.</li>
          <li><b>매개 질병(Ehrlichia, Anaplasma, Lyme병) 발생 시:</b> Doxycycline 10 mg/kg, PO, q24h(또는 5 mg/kg, q12h) 간격으로 <b>28일간(4주) 연속</b> 투여.</li>
          <li><b>Babesia gibsoni(바베시아) 감염 시:</b> Atovaquone 13.3 mg/kg PO q8h + Azithromycin 10 mg/kg PO q24h 복합 10일 프로토콜 실시.</li>
        </ul>
      `
    },
    cat: {
      site: "피부 부착 흡혈 및 빈혈 유발",
      treatment: `
        <ul>
          <li><b>고양이 안전 인증 외부기생충 스팟온 제품 사용:</b> Fluralaner 복합제 등 정기 도포.</li>
          <li><b>매개 감염증(Mycoplasma 등) 발생 시:</b> Doxycycline 10 mg/kg, PO, q24h로 14~28일 투여.</li>
          <li><span style="color:red;">⚠️ 중요: 고양이 투약 후 식도염/식도협착 방지를 위해 정제 투여 직후 반드시 물 5ml 이상 강제 급여할 것.</span></li>
        </ul>
      `
    },
    image: {
      url: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Haemaphysalis_longicornis_1.jpg",
      magnification: "육안 / Macro",
      description: "작은소참진드기(Haemaphysalis longicornis) 성충. 국내에서 바베시아 등을 매개하는 주요 진드기."
    }
  }
];
