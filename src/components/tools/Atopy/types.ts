export interface AtopyBreed {
  id: string;
  ko: string;
  en: string;
  img: string;
  sites: string;
  features: string[];
  tip: string;
}

export interface AtopyResult {
  breed: AtopyBreed;
}
