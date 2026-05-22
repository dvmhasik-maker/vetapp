import React from 'react';

export type Mode = 'diag' | 'manage';

export interface PatientData {
  name: string;
  breed: string;
  sex: string;
  age: string;
}

export interface ValueData {
  t4: string;
  tsh: string;
  diagSymptom: string;
  manageSymptom: string;
}

export interface AnalysisResult {
  resultClass: string;
  title: string;
  actionMsg: string;
  guideHtml: React.ReactNode;
  modeLabel: string;
  today: string;
}
