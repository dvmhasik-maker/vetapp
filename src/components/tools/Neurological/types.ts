export interface PatientData {
  name: string;
  breed: string;
  sex: string;
  age: string;
}

export interface Symptom {
  id: string;
  text: string;
  base?: string[];
  cross?: string[];
  ipsi?: string[];
  isMenaceFail?: boolean;
}

export interface RankResult {
  name: string;
  score: number;
  pct: number;
  matches: string[];
}

export interface NeuroResult {
  topRanks: RankResult[];
  selectedSymptoms: string[];
  totalInteractions: number;
  date: string;
}
