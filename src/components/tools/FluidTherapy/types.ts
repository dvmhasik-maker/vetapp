export interface PatientData {
  species: 'dog' | 'cat';
  weight: string;
}

export interface FluidInput {
  dehydration: number;
  ongoingLoss: string;
  potassium: string;
  bagSize: number;
  tramadol: number;
  lidocaine: number;
  ketamine: number;
}

export interface KSupplementResult {
  bagName: string;
  volume: number;
  addAmount: string;
  totalK: string;
  isLRS: boolean;
}

export interface DrugCRIResult {
  dose: number;
  totalMg: string;
  volumeMl: string;
  concInBag: string;
}

export interface FluidResult {
  maintenance: number;
  deficit: number;
  ongoing: number;
  total24h: number;
  hourlyRate: number;
  bagSize: number;
  bagDuration: string;
  kTarget: number;
  kStatusText: string;
  kStatusClass: string;
  kSupplements: KSupplementResult[];
  maxSafeK: number;
  currentKRate: number;
  showSafetyWarning: boolean;
  tlk: {
    tramadol: DrugCRIResult;
    lidocaine: DrugCRIResult;
    ketamine: DrugCRIResult;
    loadingDoses: {
      tramadol: string;
      lidocaine: string;
      ketamineLo: string;
      ketamineHi: string;
    };
  };
  date: string;
}