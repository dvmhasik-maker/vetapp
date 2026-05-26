import React, { useState, useRef } from 'react';
import { CushingMode, PatientInfo, CushingValues, CushingResult } from './types';
import html2canvas from 'html2canvas';

const initialPatientInfo: PatientInfo = { name: '', breed: '', sex: '', age: '' };
const initialValues: CushingValues = { food: null, pupd: null, cortisol: '' };

export const useCushingLogic = () => {
  const [mode, setMode] = useState<CushingMode>('acth');
  const [patientInfo, setPatientInfo] = useState<PatientInfo>(initialPatientInfo);
  const [values, setValues] = useState<CushingValues>(initialValues);
  const [result, setResult] = useState<CushingResult | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setPatientInfo({ ...patientInfo, [e.target.id.replace('pt_', '')]: e.target.value });
  };

  const setToxValue = (type: keyof CushingValues, val: any) => {
    setValues({ ...values, [type]: val });
  };

  const executeAnalysis = () => {
    const { food, pupd, cortisol: cortisolStr } = values;
    const cortisol = parseFloat(cortisolStr);

    if (!food) { alert('식욕 상태를 선택해 주세요.'); return; }
    if (!pupd) { alert('다음다뇨 여부를 선택해 주세요.'); return; }
    if (isNaN(cortisol) || cortisol < 0) { alert('코르티솔 값을 입력해 주세요.'); return; }

    const foodLabels = { dec: '감소', norm: '정상', inc: '증가' };
    const pupdLabels = { no: '없음', yes: '있음' };
    const rawSymptomLabel = `식욕: ${foodLabels[food]}, PU/PD: ${pupdLabels[pupd]}`;

    let clinCat: 'poor' | 'well' | 'hc';
    if (food === 'dec') {
      clinCat = 'poor';
    } else if (food === 'norm' && pupd === 'no') {
      clinCat = 'well';
    } else {
      clinCat = 'hc';
    }

    const today = new Date().toLocaleDateString('ko-KR');
    let analysisResult: CushingResult;

    if (mode === 'acth') {
      const clinLabelMap = {
        poor: `이상 증상 (${rawSymptomLabel})`,
        well: `잘 조절됨 (${rawSymptomLabel})`,
        hc: `Cushing 증상 잔존 (${rawSymptomLabel})`
      };
      
      let banner: CushingResult['banner'];
      if (clinCat === 'poor') {
        if (cortisol < 1.5) {
          banner = { theme: 'red', icon: '🚨', label: 'Trilostane 투여 중단 · 부신피질기능저하증 가능성', 
            actions: ['Trilostane 즉시 중단', '지지 요법 및 증상 치료 시작', 'Glucocorticoid 투여 고려', '부신피질기능저하증(Addison\'s disease)에 준하여 처치'],
            note: 'Post cortisol < 1.5 ug/dL + poor sign → Discontinue trilostane. Start treatment.' };
        } else {
          banner = { theme: 'purple', icon: '🔍', label: 'Trilostane 중단 · 다른 원인 감별 필요',
            actions: ['Trilostane 중단', '부신피질기능저하증 가능성은 낮음', '다른 질환 및 합병증 감별 진단 시행', '재검사'],
            note: 'Post cortisol ≥ 1.5 ug/dL + poor sign → Discontinue trilostane. Investigate other diseases' };
        }
      } else if (clinCat === 'well') {
        if (cortisol >= 1.5 && cortisol <= 5.5) {
          banner = { theme: 'green', icon: '✅', label: '현재 용량 유지',
            actions: ['현재 Trilostane 용량 유지', 'Post cortisol이 목표 범위 내 (1.5~5.5 ug/dL)', '증상 재발 여부 정기 모니터링 권장'],
            note: 'Well controlled + cortisol target range → Dosage unchanged' };
        } else if (cortisol < 1.5) {
          banner = { theme: 'orange', icon: '⚠️', label: '용량 유지 (단, 재평가 권장)',
            actions: ['현재 cortisol이 낮지만 임상적으로 잘 조절되고 있음', '용량 유지 가능', '재발 여부 모니터링 강화 권장', '추후 이상 증상 발생 시 즉각 재평가'],
            note: 'Well controlled + cortisol < 1.5 ug/dL → Dosage unchanged, monitor for recurrence' };
        } else {
          banner = { theme: 'orange', icon: '⚠️', label: '용량 유지 · 재발 모니터링',
            actions: ['임상적으로 잘 조절되고 있으나 cortisol이 목표보다 높음', '현재 용량 유지', '증상 재발 여부 주의 깊게 모니터링', '증상 재발 시 용량 증량 고려'],
            note: 'Well controlled + cortisol > 5.5 ug/dL → Dosage unchanged, monitor for recurrence' };
        }
      } else {
        if (cortisol <= 5.5) {
          if (cortisol < 1.5) {
            banner = { theme: 'yellow', icon: '🔎', label: '단기 지속 가능성 · 더 빈번한 투여 고려',
              actions: ['Trilostane의 작용 시간이 짧을 가능성', '더 빈번한 투여(예: SID→BID) 고려', '전문 심장/내분비내과 협진 검토'],
              note: 'Polyphagia·PU/PD + cortisol < 1.5 ug/dL → Short duration suspected, consider more frequent administration' };
          } else {
            banner = { theme: 'orange', icon: '📈', label: '용량 증량 고려',
              actions: ['Cushing 증상이 잔존하며 cortisol이 목표 범위 내', 'Trilostane 용량 증량 고려', '증량하여 2주 후 재평가'],
              note: 'HC signs + cortisol 1.5~5.5 ug/dL → Consider increasing dosage' };
          }
        } else {
          banner = { theme: 'red', icon: '🔺', label: '용량 증량 필요',
            actions: ['Cushing 증상 잔존 + cortisol 높음', 'Trilostane 용량 증량 필요', '증량하여 2주 후 재평가'],
            note: 'HC signs + Post cortisol > 5.5 ug/dL → Increase the dosage' };
        }
      }

      analysisResult = { mode, patientInfo: { ...patientInfo }, clinCat, clinLabel: clinLabelMap[clinCat], cortisol, banner, date: today };
    } else {
      // Pre-Pill Mode
      const clinLabelMap = {
        poor: `이상 증상 (${rawSymptomLabel})`, // Handle if value remained from ACTH mode
        well: `Cushing 증상 소실 (${rawSymptomLabel})`,
        hc: `Cushing 증상 잔존 (${rawSymptomLabel})`
      };
      
      const pClinCat = (food === 'norm' && pupd === 'no') ? 'well' : (food === 'dec' ? 'poor' : 'hc');
      let banner: CushingResult['banner'];

      if (pClinCat === 'hc') {
        if (cortisol >= 5.5) {
          banner = { theme: 'red', icon: '🔺', label: '투여 빈도 또는 용량 증량',
            actions: ['Cushing 증상이 잔존하고 Pre-pill cortisol ≥ 5.5 ug/dL', '투여 빈도 증가(SID→BID) 또는 용량 증량 검토', '증량하여 10일 후 재평가'],
            note: 'HC signs present + pre-pill cortisol ≥ 5.5 ug/dL → Increase dosing frequency or increase dosage' };
        } else if (cortisol >= 1.5 && cortisol < 5.5) {
          banner = { theme: 'orange', icon: '🔄', label: '재평가 · 소량 증량 고려',
            actions: ['Cushing 증상 잔존, cortisol이 중간 범위 (1.5 ~ 5.5 ug/dL)', '재평가 후 소량 증량 고려', '증량하여 10일 후 재평가'],
            note: 'HC signs + pre-pill cortisol 1.5 ~ 5.5 ug/dL → Re-evaluate. Consider a small dosage increase' };
        } else {
          banner = { theme: 'purple', icon: '🔍', label: '재평가 · 소량 감량 고려',
            actions: ['Cushing 증상이 있으나 Pre-pill cortisol이 낮음 (< 1.5 ug/dL)', '과용량 가능성 재평가', '소량 감량 고려', '감량하여 10일 후 재평가'],
            note: 'HC signs + pre-pill cortisol < 1.5 ug/dL → Re-evaluate. Consider lower dosage' };
        }
      } else if (pClinCat === 'poor') {
        banner = { theme: 'purple', icon: '🔍', label: 'Trilostane 중단 · 다른 원인 감별 필요',
          actions: ['Trilostane 중단', '식욕 부진 등 이상 증상에 대한 정밀 검사 시행', '부신피질기능저하증 가능성 확인'],
          note: 'Poor sign + Pre-pill cortisol evaluation needed' };
      } else {
        if (cortisol === 0) {
          banner = { theme: 'red', icon: '🚨', label: '즉각적인 재평가 필요',
            actions: ['Pre-pill cortisol = 0 ug/dL', 'ACTH Stimulation Test (Pre & Post) 즉시 시행', 'Trilostane 중단 및 부신피질기능저하증 처치 고려'],
            note: 'pre-pill cortisol = 0 → Trilostane stop & ACTH stimulation test' };
        } else if (cortisol > 0 && cortisol <= 1.5) {
          banner = { theme: 'yellow', icon: '⚠️', label: '재평가 · 감량 고려',
            actions: ['Cushing 증상 소실되었으나 Pre-pill cortisol이 낮음 (0 < Cortisol ≤ 1.5 ug/dL)', '과용량 가능성 평가', '소량 감량 고려', '감량하여 10일 후 재평가'],
            note: 'HC resolved + pre-pill cortisol 0 < Cortisol ≤ 1.5 ug/dL → Re-evaluate. Consider lower dosage' };
        } else if (cortisol > 1.5 && cortisol <= 5.5) {
          banner = { theme: 'green', icon: '✅', label: '현재 용량 유지',
            actions: ['Cushing 증상 소실 + Pre-pill cortisol 목표 범위 내 (1.5 ~ 5.5 ug/dL)', '현재 Trilostane 용량 유지', '3개월 후 재평가'],
            note: 'HC resolved + pre-pill cortisol 1.5 ~ 5.5 ug/dL → Continue at current dosage' };
        } else {
          banner = { theme: 'orange', icon: '📈', label: '소량 증량 고려',
            actions: ['Cushing 증상은 소실되었으나 Pre-pill cortisol이 목표보다 높음 (> 5.5 ug/dL)', '소량 증량 고려', '증량하여 10일 후 재평가'],
            note: 'HC resolved + pre-pill cortisol > 5.5 ug/dL → Re-evaluate. Consider a small dosage increase' };
        }
      }

      analysisResult = { mode, patientInfo: { ...patientInfo }, clinCat: pClinCat, clinLabel: clinLabelMap[pClinCat], cortisol, banner, date: today };
    }

    setResult(analysisResult);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const saveImg = () => {
    if (!captureRef.current) return;
    html2canvas(captureRef.current, { background: '#f8fafc', scale: 2 } as any).then(canvas => {
      const link = document.createElement('a');
      link.download = `VETAPP_쿠싱분석_${patientInfo.name || '환자'}_${new Date().getTime()}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.click();
    });
  };

  return {
    mode, setMode, patientInfo, setPatientInfo, values, setValues, result, setResult,
    resultRef, captureRef, handlePatientChange, setToxValue, executeAnalysis, saveImg
  };
};
