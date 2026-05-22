export interface EchoInput {
  weight: string;
  la: string; // Left Atrium
  ao: string; // Aorta
  lvidd: string; // Left Ventricular Internal Diameter in Diastole
  lvids: string; // Left Ventricular Internal Diameter in Systole
}

export interface EchoResult {
  laAoRatio: number;
  fsPct: number;
  lviddn: number; // Normalized LVIDd
  stage: string;
  interpretation: string;
  date: string;
}
