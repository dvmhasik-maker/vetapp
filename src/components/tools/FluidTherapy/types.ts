export interface PatientData {
  species: 'dog' | 'cat';
  weight: string;
}

export interface FluidInput {
  dehydration: number; // %
  ongoingLoss: string; // ml/day
  dropFactor: string; // gtt/ml
  potassium: string; // mEq/L
}

export interface TLKInput {
  enabled: boolean;
  bagSize: string; // ml
  fluidRate: string; // ml/hr or ml/kg/hr
  isRatePerKg: boolean;
  tramadolDose: number; // mg/kg/hr
  lidocaineDose: number; // mg/kg/hr
  ketamineDose: number; // mg/kg/hr
}

export interface KSupplementResult {
  bagName: string;
  volume: number;
  addAmount: string; // mL
  totalK: string; // mEq
  isLRS: boolean;
}

export interface TLKDrugResult {
  name: string;
  dose: number;
  totalMg: number;
  volumeMl: number;
  concMgMl: number;
  color: string;
}

export interface TLKLoadingDose {
  name: string;
  description: string;
  volume: number;
}

export interface TLKResult {
  drugs: TLKDrugResult[];
  fluidRateAbs: number;
  fluidRatePerKg: number;
  duration: number;
  bagSize: number;
  loadingDoses: TLKLoadingDose[];
}

export interface FluidResult {
  maintenance: number;
  deficit: number;
  ongoing: number;
  total24h: number;
  hourlyRate: number;
  gttPerMin: number;
  secondsPerDrop: number;
  kTarget: number;
  kStatusText: string;
  kStatusClass: string;
  kSupplements: KSupplementResult[];
  maxSafeK: number;
  currentKRate: number;
  showSafetyWarning: boolean;
  tlk?: TLKResult;
  date: string;
}
