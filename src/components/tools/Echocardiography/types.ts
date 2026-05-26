export type Species = 'dog' | 'cat';

export interface PatientInfo {
  name: string;
  breed: string;
  sex: string;
  age: string;
}

export interface DogInput {
  weight: string;
  LVOT_len: string;
  IVSd: string;
  LVIDd: string;
  LVPWd: string;
  LVIDs: string;
  FS: string;
  EPSS: string;
  LA_len: string;
  LA_Ao: string;
  MPA_Ao: string;
  RPAD: string;
  PA_vel: string;
  PR_vel: string;
  MV_E: string;
  DTE: string;
  MV_A: string;
  MCO: string;
  MV_Eprime: string;
  MV_Aprime: string;
  MV_Sprime: string;
  MR_vel: string;
  MR_Vol: string;
  MR_V1V3: string;
  TR_Frac: string;
  TR_vel: string;
  LVOT_VTI: string;
  AV_VTI: string;
  AV_vel: string;
  LV_ET: string;
  LV_PEP: string;
  HR: string;
  IVRT: string;
}

export interface CatInput {
  weight: string;
  LVform: string[];
  SEC: string;
  D2_IVSd: string;
  D2_LVPWd: string;
  LVOT_len: string;
  LVOT_turb: string;
  SAM: string;
  D2_LVwall: string;
  PM: string;
  M_IVSd: string;
  M_LVIDd: string;
  M_LVPWd: string;
  M_LVIDs: string;
  FS: string;
  EPSS: string;
  LA_len: string;
  LA_Ao: string;
  M_LAFS: string;
  PA_turb: string;
  PA_vel: string;
  PR_vel: string;
  MV_E: string;
  MV_A: string;
  MCO: string;
  MV_Eprime: string;
  MV_Aprime: string;
  MV_Sprime: string;
  MR_vel: string;
  MR_VTI: string;
  TR_vel: string;
  LVOT_VTI: string;
  HR: string;
  AV_vel: string;
  ET: string;
  PEP: string;
}

export interface EchoResultItem {
  group?: string;
  name: string;
  val: number;
  normal: number | null;
  range: [number, number] | null;
  inv: boolean;
  lo: string;
  hi: string;
}

export interface CatDiagnosis {
  label: string;
  thrombosisRisk?: string;
  lvotTurbulence?: string;
  samPresent?: string;
}

export interface EchoResult {
  species: Species;
  patientInfo: PatientInfo;
  items: EchoResultItem[]; // For Dog
  catDiagnosis?: CatDiagnosis; // For Cat
  catStageRows?: any[];
  catExtraRows?: any[];
  date: string;
}
