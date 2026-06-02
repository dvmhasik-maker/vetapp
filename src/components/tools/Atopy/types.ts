export interface AtopyBreed {
  id: string;
  ko: string;
  en: string;
  img: string;
  sites: string;
  features: string[];
  tips: string[];
  isSignificant: boolean; // Statistically significant or unique pattern in the study
}
