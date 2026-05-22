import { Symptom } from './types';

export const symptomData: Record<string, Symptom[]> = {
  consciousness: [
    { id: '의식_이상', text: '의식 이상\n(Stupor/Coma/Depression)', base: ['전뇌', '뇌간'] }
  ],
  menace: [
    { id: '위협_왼쪽소실', text: '왼쪽 위협반사 저하/소실\n(Menace Response Deficit)', cross: ['전뇌'], ipsi: ['소뇌'], isMenaceFail: true },
    { id: '위협_오른쪽소실', text: '오른쪽 위협반사 저하/소실\n(Menace Response Deficit)', cross: ['전뇌'], ipsi: ['소뇌'], isMenaceFail: true }
  ],
  plr: [
    { id: 'PLR_이상', text: 'PLR 이상\n(Pupillary Light Reflex)', base: ['뇌간'] }
  ],
  gait: [
    { id: '걸음_왼쪽휨', text: '몸이 왼쪽으로 휨\n(Body Lean)', ipsi: ['전뇌'] },
    { id: '걸음_오른쪽휨', text: '몸이 오른쪽으로 휨\n(Body Lean)', ipsi: ['전뇌'] },
    { id: '걸음_왼쪽턴', text: '왼쪽으로 머리 돌림\n(Head Turn)', ipsi: ['전뇌'] },
    { id: '걸음_오른쪽턴', text: '오른쪽으로 머리 돌림\n(Head Turn)', ipsi: ['전뇌'] },
    { id: '걸음_왼쪽서클', text: '왼쪽 선회 운동\n(Circling)', ipsi: ['전뇌'] },
    { id: '걸음_오른쪽서클', text: '오른쪽 선회 운동\n(Circling)', ipsi: ['전뇌'] },
    { id: '걸음_전뇌_프레싱', text: '벽에 머리 대기\n(Head Pressing)', base: ['전뇌'] },
    { id: '걸음_사지마비', text: '사지 마비/부전\n(Tetraparesis)', base: ['뇌간', 'C1-C5', 'C6-T2'] },
    { id: '걸음_사지강직', text: '사지 강직\n(Rigidity)', base: ['뇌간'] },
    { id: '걸음_소뇌_트레머', text: '의도 전율\n(Intention Tremor)', base: ['소뇌'] },
    { id: '걸음_소뇌_실조', text: '운동 실조\n(Ataxia)', base: ['소뇌'] },
    { id: '걸음_소뇌_벌어짐', text: '사지 기저부 벌어짐\n(Wide-based Gait)', base: ['소뇌'] },
    { id: '걸음_경추_기운목', text: '기운목 / 척추 측만\n(Head Tilt)', base: ['C1-C5', 'C6-T2'] },
    { id: '걸음_전지강직', text: '전지 강직\n(Schiff-Sherrington)', base: ['소뇌', 'C6-T2', 'T3-L3'] },
    { id: '걸음_후지마비', text: '후지 마비/부전\n(Paraparesis)', base: ['T3-L3', 'L4-L6', 'L6-S3'] },
    { id: '걸음_일어섬_어려움', text: '일어서기 어려움\n(Difficulty Standing)', base: ['L4-L6'] },
    { id: '걸음_평지자세', text: '평지 자세 취함\n(Plantigrade Posture)', base: ['L4-L6'] },
    { id: '걸음_뻣뻣_과장', text: '뻣뻣하고 과장된 걸음\n(Stiff/Exaggerated Gait)', base: ['골격근'] }
  ],
  proprioception: [
    { id: '고유_왼쪽소실', text: '왼쪽 고유자세반응 소실/저하\n(CP Deficit)', cross: ['전뇌'], ipsi: ['뇌간', 'C1-C5', 'C6-T2', '소뇌', 'T3-L3', 'L4-L6'] },
    { id: '고유_오른쪽소실', text: '오른쪽 고유자세반응 소실/저하\n(CP Deficit)', cross: ['전뇌'], ipsi: ['뇌간', 'C1-C5', 'C6-T2', '소뇌', 'T3-L3', 'L4-L6'] },
    { id: '고유_사지소실', text: '사지 전체 고유자세반응 소실\n(General CP Deficit)', base: ['뇌간', 'C1-C5', 'C6-T2'] },
    { id: '고유_후지소실', text: '후지 전체 고유자세반응 소실\n(Hindlimb CP Deficit)', base: ['T3-L3', 'L4-L6'] }
  ],
  misc: [
    { id: '기타_발작', text: '경련/발작\n(Seizure)', base: ['전뇌'] },
    { id: '기타_편측무시', text: '편측무시증후군\n(Hemi-inattention)', base: ['전뇌'] },
    { id: '기타_호흡곤란', text: '호흡 곤란\n(Respiratory Distress)', base: ['뇌간', 'C1-C5', 'C6-T2'] },
    { id: '기타_심장이상', text: '심장 리듬/자율신경 이상\n(Cardiac/Autonomic)', base: ['뇌간'] },
    { id: '기타_연하곤란', text: '연하 곤란\n(Dysphagia)', base: ['뇌간'] },
    { id: '기타_배뇨증가', text: '배뇨 빈도 증가\n(Increased Urination)', base: ['소뇌'] },
    { id: '기타_호너', text: '호너증후군 의심\n(Horner\'s Syndrome)', base: ['C1-C5', 'C6-T2'] },
    { id: '기타_요정체', text: '요정체\n(UMN Bladder)', base: ['T3-L3', 'L4-L6'] },
    { id: '기타_요실금', text: '요실금\n(LMN Bladder)', base: ['L6-S3'] },
    { id: '기타_변실금', text: '변실금\n(Fecal Incontinence)', base: ['L6-S3'] }
  ]
};
