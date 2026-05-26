export type Species = 'dog' | 'cat';

export interface Toxin {
  id: string;
  ko: string;
  en: string;
  emoji?: string;
  organ: string;
  dose: string;
  symptoms: string;
  tests: string;
  treatment: string;
  prognosis: string;
  duration: string;
}

export interface PoisonResult {
  toxin: Toxin;
  species: Species;
  date: string;
}
