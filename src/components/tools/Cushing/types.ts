export type CushingMode = 'acth' | 'prepill';

export interface PatientInfo {
  name: string;
  breed: string;
  sex: string;
  age: string;
}

export interface CushingValues {
  food: 'dec' | 'norm' | 'inc' | null;
  pupd: 'no' | 'yes' | null;
  cortisol: string;
}

export interface CushingResult {
  mode: CushingMode;
  patientInfo: PatientInfo;
  clinCat: 'poor' | 'well' | 'hc';
  clinLabel: string;
  cortisol: number;
  banner: {
    theme: 'green' | 'orange' | 'red' | 'purple' | 'yellow';
    icon: string;
    label: string;
    actions: string[];
    note: string;
  };
  date: string;
}
