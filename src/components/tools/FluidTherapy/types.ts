export interface PatientData {
  species: 'dog' | 'cat';
  weight: string;
}

export interface FluidInput {
  dehydration: number; // %
  ongoingLoss: string; // ml/day
  potassium: string; // mEq/L
}

export interface KSupplementResult {
  bagName: string;
  volume: number;
  addAmount: string; // mL
  totalK: string; // mEq
  isLRS: boolean;
}

export interface FluidResult {
  maintenance: number;
  deficit: number;
  ongoing: number;
  total24h: number;
  hourlyRate: number;
  kTarget: number;
  kStatusText: string;
  kStatusClass: string;
  kSupplements: KSupplementResult[];
  maxSafeK: number;
  currentKRate: number;
  showSafetyWarning: boolean;
  date: string;
}