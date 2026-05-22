export interface Product {
  name: string;
  kcal: number;
}

export interface BrandProducts {
  [key: string]: Product[];
}

export interface SpeciesConfig {
  dog: { text: string; val: number }[];
  cat: { text: string; val: number }[];
}

export interface ResultData {
  name: string;
  der: number;
  kcalPerG: string;
  foodG: number;
  profile: string;
  status: string;
  rer: number;
  foodInfo: string;
  cupInfo: string;
  date: string;
}
