export interface ParasiteInfo {
  site: string;
  treatment: string;
}

export interface ParasiteData {
  ko: string;
  en: string;
  sci: string;
  dog: ParasiteInfo;
  cat: ParasiteInfo;
  image?: {
    url: string;
    magnification: string;
    description: string;
  };
}
