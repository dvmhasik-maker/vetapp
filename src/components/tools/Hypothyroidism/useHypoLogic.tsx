import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Mode, PatientData, ValueData, AnalysisResult } from './types';
import React from 'react';

export const useHypoLogic = () => {
  const [mode, setMode] = useState<Mode>('diag');
  const [patient, setPatient] = useState<PatientData>({
    name: '',
    breed: '',
    sex: '',
    age: ''
  });
  const [values, setValues] = useState<ValueData>({
    t4: '',
    tsh: '',
    diagSymptom: '있음',
    manageSymptom: '개선됨'
  });
  const [result, setResult] = useState<AnalysisResult | null>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);
  const patientCardRef = useRef<HTMLDivElement>(null);
  const inputPanelRef = useRef<HTMLDivElement>(null);

  const handlePatientChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const field = id.replace('pt_', '');
    setPatient(prev => ({ ...prev, [field]: value }));
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, id, value } = e.target;
    if (name === 'diag_symptom') setValues(prev => ({ ...prev, diagSymptom: value }));
    else if (name === 'manage_symptom') setValues(prev => ({ ...prev, manageSymptom: value }));
    else setValues(prev => ({ ...prev, [id.replace('val_', '')]: value }));
  };

  const executeAnalysis = () => {
    if (values.t4 === "" || values.tsh === "") {
      alert("Total T4 수치와 TSH 수치를 입력해 주세요.");
      return;
    }

    const t4 = parseFloat(values.t4);
    const tsh = parseFloat(values.tsh);
    const today = new Date().toLocaleDateString('ko-KR');
    const modeLabel = mode === 'diag' ? '초기 진단 평가' : '투약 모니터링 관리';

    let resultClass = "";
    let title = "";
    let actionMsg = "";
    let guideHtml: React.ReactNode = null;

    if (mode === 'diag') {
      const hasSymptoms = values.diagSymptom === "있음";
      const isT4Low = t4 < 1.0;
      const isTshHigh = tsh > 0.5;

      if (isT4Low && isTshHigh) {
        if (hasSymptoms) {
          resultClass = "danger";
          title = "📢 [확진] 분석 판정:";
          actionMsg = "👉 갑상선기능저하증 확진 후 Levothyroxine 투약 개시.";
          guideHtml = (
            <>
              임상 증상이 명확하며, 검사상 Low T4 및 High TSH 기준을 만족하므로 갑상선기능저하증으로 확진됩니다.
              <ul>
                <li><strong>투약 안내:</strong> 처방 지침에 따른 Levothyroxine 약물 처방을 시작하십시오.</li>
                <li><strong>재평가 시점:</strong> 투약 시작 후 약 4~8주 사이에 모니터링 검사(Post-pill test)를 설계하십시오.</li>
              </ul>
            </>
          );
        } else {
          resultClass = "warning";
          title = "📢 [무증상성 이상] 분석 판정:";
          actionMsg = "👉 임상증상 불일치로 즉각적인 투약 유보 및 2~4주 후 재검사 고려.";
          guideHtml = (
            <>
              호르몬 수치는 저하증 지표를 나타내나 명확한 임상 외관 증상이 식별되지 않는 상태입니다.
              <ul>
                <li><strong>권장 조치:</strong> 즉각적인 약물 처방보다는 약 2~4주 후에 호르몬 재검사를 시행하거나, Free T4 검사를 추가하는 것이 권장됩니다.</li>
              </ul>
            </>
          );
        }
      } else if (isT4Low && !isTshHigh) {
        if (hasSymptoms) {
          resultClass = "warning";
          title = "📢 [진단 불분명 소견] 분석 판정:";
          actionMsg = "👉 추가 검사(Free T4, TgAA) 권장.";
          guideHtml = (
            <>
              T4는 낮고 상응하는 임상 증상이 확인되나, TSH 상승이 수반되지 않은 불일치 상태입니다. 약 20~30%의 갑상선기능저하증 환자견은 초기 TSH가 상승하지 않을 수 있으며, 전신 기저 질환(ESS) 가능성도 존재합니다.
              <ul>
                <li><strong>권장 조치:</strong> 진단의 정확성을 확보하기 위해 전신 질환 스크리닝과 병행하여 Free T4 검사 및 갑상선 글로불린 자가항체(TgAA) 검사를 즉시 추가 시행할 것을 강력히 권장합니다.</li>
              </ul>
            </>
          );
        } else {
          resultClass = "warning";
          title = "📢 [Euthyroid Sick Syndrome] 분석 판정:";
          actionMsg = "👉 갑상선 외 질환(ESS) 부전 상태 의심으로 기저 질환 선행 치료 필요.";
          guideHtml = (
            <>
              증상이 없고 T4는 낮으나 TSH가 정상 범위에 머물러 있습니다. 이는 쿠싱, 만성 염증, 대사성 기저 질환 또는 약물 노출에 의해 갑상선 축이 억제되었을 가능성이 매우 지배적입니다.
              <ul>
                <li><strong>권장 조치:</strong> 갑상선 호르몬제를 투여하지 마시고, 종합 스크리닝을 통해 원인이 되는 기저 질환을 먼저 감별 및 치료하십시오.</li>
              </ul>
            </>
          );
        }
      } else if (!isT4Low && isTshHigh) {
        if (hasSymptoms) {
          resultClass = "warning";
          title = "📢 [초기/보상성 상태] 분석 판정:";
          actionMsg = "👉 추가 검사(Free T4, TgAA) 권장.";
          guideHtml = (
            <>
              임상 증상이 뚜렷하게 관찰되나 말초 Total T4 농도는 정상 범주이며, 뇌하수체 자극 호르몬(TSH) 유행 유도 신호만 상승해 있는 상태입니다. 초기 혹은 보상성(Compensatory) 갑상선기능저하증일 수 있습니다.
              <ul>
                <li><strong>권장 조치:</strong> 초기 결정을 유보하고 Free T4 검사 및 갑상선 글로불린 자가항체(TgAA) 검사를 추가 진행하여 확진 단계를 밟을 것을 강력히 권장합니다.</li>
              </ul>
            </>
          );
        } else {
          resultClass = "warning";
          title = "📢 [무증상성 보상 상태] 분석 판정:";
          actionMsg = "👉 초기 또는 보상성 저하증 소견으로 투약 없이 1~3개월간 추적 모니터링.";
          guideHtml = (
            <>
              임상 증상이 동반되지 않은 상태에서 말초 T4 농도는 정상이지만 TSH 신호가 상승되어 있는 단계입니다.
              <ul>
                <li><strong>권장 조치:</strong> 즉시 투약하지 않고 대사 흐름 및 임상 변화 관찰과 함께 1~3개월 후 재검사를 실시하여 호르몬 추이를 관찰하십시오.</li>
              </ul>
            </>
          );
        }
      } else {
        resultClass = "success";
        title = "📢 [정상 정상] 분석 판정:";
        actionMsg = "👉 갑상선 기능정상(Euthyroid) 확인. 타 질환(쿠싱 등) 감별 필요.";
        guideHtml = (
          <>
            호르몬 피드백 시스템이 모두 건강한 정상 범주 안에 안정적으로 위치하고 있습니다.
            <ul>
              <li><strong>권장 조치:</strong> 현재 보이는 피부 질환이나 대사성 소견의 원인이 갑상선이 아닌 쿠싱증후군(HAC), 알레르기성 피부염, 면역 매개성 원인 등 다른 기저 원인에 기인한 것인지 광범위하게 감별 진단하십시오.</li>
            </ul>
          </>
        );
      }
    } else {
      const isImproved = values.manageSymptom === '개선됨';
      const isT4Low = t4 < 1.0;
      const isT4High = t4 > 4.5;
      const isT4Normal = (t4 >= 1.0 && t4 <= 4.5);
      const isTshHigh = tsh > 0.5;
      const isTshNormalOrLow = tsh <= 0.5;

      if (isImproved) {
        if (isT4Normal && isTshNormalOrLow) {
          resultClass = "success";
          title = "📢 [치료 양호] 분석 판정:";
          actionMsg = "👉 임상 증상 개선 및 호르몬 균형 안정화로 현재 약물 투여량 유지 및 정기 모니터링.";
          guideHtml = (
            <>
              임상 증상의 뚜렷한 완화와 함께 피드백 지표(T4, TSH)가 모두 이상적인 모니터링 타겟 범위 내에 머무르고 있습니다.
              <ul>
                <li><strong>권장 조치:</strong> 현재의 Levothyroxine 복용 용량을 변경 없이 그대로 유지하십시오.</li>
                <li><strong>검사 주기:</strong> 임상적 이상 소견이 없다면 향후 3~6개월 주기로 정기 혈액 검사를 실시하십시오.</li>
              </ul>
            </>
          );
        } else if (isT4High) {
          resultClass = "warning";
          title = "📢 [용량 과다 위험] 분석 판정:";
          actionMsg = "👉 호르몬 목표치 상한 초과로 Levothyroxine 투여량 감량 고려.";
          guideHtml = (
            <>
              임상 증상은 개선되었으나, 약물 유효 농도가 타겟 범위를 과도하게 상회하여 의원성 갑상선기능항진증(빈맥, 헐떡임, 다음다뇨) 유발 위험이 있습니다.
              <ul>
                <li><strong>권장 조치:</strong> 환자의 생체 대사 상태에 맞추어 현재 처방 용량의 약 10~25% 감량을 고려하고, 약 4주 후 투약 후 검사로 재평가하십시오.</li>
              </ul>
            </>
          );
        } else {
          resultClass = "success";
          title = "📢 [수치 안정 유지] 분석 판정:";
          actionMsg = "👉 안정적 대사 수치 유지 상태로 현재 가이드 유지.";
          guideHtml = <>환자의 컨디션 반전 및 수치 분포가 준수합니다. 현재 처방 가이드라인을 유지하며 관리하십시오.</>;
        }
      } else {
        if (isT4Low || isTshHigh) {
          resultClass = "danger";
          title = "📢 [용량 부족 소견] 분석 판정:";
          actionMsg = "👉 호르몬 반응성 부족 확인으로 Levothyroxine 투여량 증량 고려.";
          guideHtml = (
            <>
              지속 투약 중임에도 불구하고 임상 징후 개선이 없고, 검사 결과 역시 호르몬 부족(Low T4) 및 자극호르몬 상승(High TSH)을 보입니다.
              <ul>
                <li><strong>권장 조치:</strong> Levothyroxine 용량의 단계적 증량이 필요합니다. 단, 증량 조치 전에 보호자가 공복 투약 수칙 및 급여 스케줄을 철저히 준수했는지 먼저 점검하십시오.</li>
              </ul>
            </>
          );
        } else if (isT4High) {
          resultClass = "danger";
          title = "📢 [독성 및 오진 의심] 분석 판정:";
          actionMsg = "👉 호르몬 과다 상태이나 증상 미개선으로 즉시 감량 조치 및 타 질환 전면 감별 재실시.";
          guideHtml = (
            <>
              외관 증상은 개선되지 않았는데 체내 호르몬 수치만 과량 공급된 불일치 상태입니다. 약물 투여 과부하이거나 본 기저 증상의 본질이 갑상선 기능 문제가 아닐 확률이 지배적입니다.
              <ul>
                <li><strong>권장 조치:</strong> 약물 용량을 즉시 감량하거나 일시 중단하고, 탈모 및 대사 저하의 실질적 원인이 쿠싱증후군, 피부 사상균증 등인지 전면 재진단하십시오.</li>
              </ul>
            </>
          );
        } else {
          resultClass = "warning";
          title = "📢 [불일치 반응] 분석 판정:";
          actionMsg = "👉 호르몬 정상 범위 도달 상태이나 증상 지속으로 동반 질환 평가 및 경과 관찰.";
          guideHtml = (
            <>
              호르몬 정량 수치는 투약 관리에 의해 이상적인 타겟 영역에 진입했으나, 실제 모질 개선이나 피부 재생 등 임상적 발현 속도가 지연되는 상황입니다.
              <ul>
                <li><strong>권장 조치:</strong> 수치가 정상이므로 약물을 추가 증량하지 마십시오. 피부 조직이 재생되는 데는 보통 최소 2~3개월 이상의 긴 시간이 필요하므로 조금 더 유지하며 지켜보거나 동반 질환 유무를 점검하십시오.</li>
              </ul>
            </>
          );
        }
      }
    }

    setResult({
      resultClass,
      title,
      actionMsg,
      guideHtml,
      modeLabel,
      today
    });
    
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const saveImg = (targetType: 'input' | 'result') => {
    const target = targetType === 'result' ? resultRef.current : inputPanelRef.current;
    if (!target || (targetType === 'result' && !result)) {
      alert('저장할 화면이 활성화되지 않았습니다.');
      return;
    }

    const ptName = patient.name || '환자';
    const today = new Date().toLocaleDateString('ko-KR').replace(/\. /g, '-').replace('.', '');
    const modeLabelStr = mode === 'diag' ? '진단' : '모니터링';
    const label = targetType === 'result' ? `${modeLabelStr}_결과화면` : `${modeLabelStr}_입력화면`;

    html2canvas(patientCardRef.current!, { background: '#ffffff', scale: 2 } as any).then((ptCanvas: HTMLCanvasElement) => {
      html2canvas(target, { background: '#ffffff', scale: 2 } as any).then((mainCanvas: HTMLCanvasElement) => {
        const combined = document.createElement('canvas');
        if (targetType === 'result') {
          const link = document.createElement('a');
          link.download = `${ptName}_${label}_${today}.jpg`;
          link.href = mainCanvas.toDataURL('image/jpeg', 1.0);
          link.click();
        } else {
          combined.width = mainCanvas.width;
          combined.height = ptCanvas.height + mainCanvas.height;
          const ctx = combined.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, combined.width, combined.height);
            ctx.drawImage(ptCanvas, 0, 0);
            ctx.drawImage(mainCanvas, 0, ptCanvas.height);
            const link = document.createElement('a');
            link.download = `${ptName}_${label}_${today}.jpg`;
            link.href = combined.toDataURL('image/jpeg', 1.0);
            link.click();
          }
        }
      });
    });
  };

  return {
    mode,
    setMode,
    patient,
    values,
    result,
    setResult,
    resultRef,
    patientCardRef,
    inputPanelRef,
    handlePatientChange,
    handleValueChange,
    executeAnalysis,
    saveImg
  };
};
