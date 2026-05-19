import React, { useState, useRef } from 'react';
import { ChevronLeft, Camera, Search, ClipboardList, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';

type Mode = 'diag' | 'manage';

const Hypothyroidism: React.FC = () => {
  const [mode, setMode] = useState<Mode>('diag');
  const [patient, setPatient] = useState({
    name: '',
    breed: '',
    sex: '',
    age: ''
  });
  const [values, setValues] = useState({
    t4: '',
    tsh: '',
    diagSymptom: '있음',
    manageSymptom: '개선됨'
  });
  const [result, setResult] = useState<React.ReactNode | null>(null);
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
      const isImproved = values.manageSymptom === "개선됨";
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

    setResult(
      <div className="result-container">
        <div className="patient-bar">
          <span><strong>🐾 환자 ({modeLabel})</strong></span>
          <span>이름: <strong>{patient.name || '-'}</strong></span>
          <span>품종: {patient.breed || '-'}</span>
          <span>성별: {patient.sex || '-'}</span>
          <span>나이: {patient.age || '-'}</span>
          <span style={{ marginLeft: 'auto', color: '#aaa', fontSize: '.8rem' }}>📅 {today}</span>
        </div>

        <div className="input-summary">
          <strong>{mode === 'diag' ? '초기 진단' : '투약 관리'} 데이터 요약:</strong><br />
          • 검사 결과: Total T4 = <b>{t4} μg/dL</b>, TSH = <b>{tsh} ng/mL</b><br />
          {mode === 'diag' ? (
            <>• 임상 증상 유무: <b>{values.diagSymptom}</b></>
          ) : (
            <>• 증상 개선 상태: <span style={{ color: values.manageSymptom === '개선됨' ? '#1e8c4e' : '#c0392b', fontWeight: 'bold' }}>{values.manageSymptom}</span></>
          )}
        </div>

        <div className={`result-box ${resultClass}`}>
          <div className="result-header">{title}</div>
          <div className="action-message">{actionMsg}</div>
          <div className="result-guideline">{guideHtml}</div>
        </div>
        
        <div className="ref-label">※ 본 프로그램 결과는 제공된 호르몬 데이터 매뉴얼을 매칭한 결과입니다. 최종적인 환자 정밀 처방 권한은 담당 주치의 수의사의 소견을 전적으로 따릅니다.</div>
      </div>
    );
    
    // Smooth scroll to result
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
    const modeLabel = mode === 'diag' ? '진단' : '모니터링';
    const label = targetType === 'result' ? `${modeLabel}_결과화면` : `${modeLabel}_입력화면`;

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

  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn">
          <ChevronLeft size={20} /> 대시보드로 돌아가기
        </Link>
      </div>

      <div className="page-header-tool">
        <div className="icon">🦋</div>
        <div>
          <h1>반려견 갑상선기능저하증 진단 및 관리 분석기</h1>
          <p>Canine Hypothyroidism Diagnosis & Management Analyzer</p>
        </div>
      </div>

      <div className="tab-container-tool">
        <button 
          className={`tab-btn-tool ${mode === 'diag' ? 'active' : ''}`} 
          onClick={() => { setMode('diag'); setResult(null); }}
        >
          <ClipboardList size={18} style={{ marginRight: '6px' }} /> 1단계 초기 진단
        </button>
        <button 
          className={`tab-btn-tool ${mode === 'manage' ? 'active' : ''}`} 
          onClick={() => { setMode('manage'); setResult(null); }}
        >
          <Activity size={18} style={{ marginRight: '6px' }} /> 2단계 치료 관리
        </button>
      </div>

      <div className="tool-card-container" ref={patientCardRef}>
        <div className="tool-card-title">🐾 환자 정보</div>
        <div className="patient-grid">
          <div className="pf"><label>이름</label><input type="text" id="pt_name" value={patient.name} onChange={handlePatientChange} placeholder="예: 대박이" /></div>
          <div className="pf"><label>품종</label><input type="text" id="pt_breed" value={patient.breed} onChange={handlePatientChange} placeholder="예: 리트리버" /></div>
          <div className="pf">
            <label>성별</label>
            <select id="pt_sex" value={patient.sex} onChange={handlePatientChange}>
              <option value="">선택</option>
              <option value="남">남</option>
              <option value="중성화 남">중성화 남</option>
              <option value="여">여</option>
              <option value="중성화 여">중성화 여</option>
            </select>
          </div>
          <div className="pf"><label>나이</label><input type="text" id="pt_age" value={patient.age} onChange={handlePatientChange} placeholder="예: 7세" /></div>
        </div>
      </div>

      <div className="tool-card-container" ref={inputPanelRef}>
        <div className="tool-card-title">
          {mode === 'diag' ? '📋 검사 수치 및 상태 입력 (초기 진단)' : '📋 호르몬 수치 및 치료 반응 입력 (투약 모니터링)'}
        </div>

        <div className="cat-title">1. 호르몬 검사 결과 수치</div>
        <div className="patient-grid" style={{ marginBottom: '15px' }}>
          <div className="pf">
            <label>Total T4 <span className="unit-text">(참조치: 1.0 ~ 4.0 μg/dL)</span></label>
            <input type="number" id="val_t4" step="0.1" inputMode="decimal" value={values.t4} onChange={handleValueChange} placeholder="예: 0.6" />
          </div>
          <div className="pf">
            <label>TSH <span className="unit-text">(참조치: 0.05 ~ 0.5 ng/mL)</span></label>
            <input type="number" id="val_tsh" step="0.01" inputMode="decimal" value={values.tsh} onChange={handleValueChange} placeholder="예: 0.35" />
          </div>
        </div>

        {mode === 'diag' ? (
          <div id="section-symptom-diag">
            <div className="cat-title">2. 임상 증상 유무 (대사 저하, 비대칭 탈모, 비만 등)</div>
            <div className="pair-grid">
              <label className={`chk-label ${values.diagSymptom === '있음' ? 'checked' : ''}`}>
                <input type="radio" name="diag_symptom" value="있음" checked={values.diagSymptom === '있음'} onChange={handleValueChange} /> 관련 임상 증상 있음
              </label>
              <label className={`chk-label ${values.diagSymptom === '없음' ? 'checked' : ''}`}>
                <input type="radio" name="diag_symptom" value="없음" checked={values.diagSymptom === '없음'} onChange={handleValueChange} /> 관련 임상 증상 없음
              </label>
            </div>
          </div>
        ) : (
          <div id="section-symptom-manage">
            <div className="cat-title">2. 치료 후 임상 증상 개선 상태</div>
            <div className="pair-grid">
              <label className={`chk-label ${values.manageSymptom === '개선됨' ? 'checked' : ''}`}>
                <input type="radio" name="manage_symptom" value="개선됨" checked={values.manageSymptom === '개선됨'} onChange={handleValueChange} /> 임상 증상 개선됨 (양호)
              </label>
              <label className={`chk-label ${values.manageSymptom === '개선안됨' ? 'checked' : ''}`}>
                <input type="radio" name="manage_symptom" value="개선안됨" checked={values.manageSymptom === '개선안됨'} onChange={handleValueChange} /> 임상 증상 개선 안 됨
              </label>
            </div>
          </div>
        )}

        <button className="btn-analyze-tool" onClick={executeAnalysis}>
          <Search size={20} style={{ marginRight: '8px' }} /> 상태 분석하기
        </button>
        <div className="save-row-tool">
          <button className="btn-save-tool input-save" onClick={() => saveImg('input')}>
            <Camera size={18} style={{ marginRight: '6px' }} /> 입력화면 저장
          </button>
          <button className="btn-save-tool result-save" onClick={() => saveImg('result')}>
            <Activity size={18} style={{ marginRight: '6px' }} /> 결과화면 저장
          </button>
        </div>
      </div>

      {result && (
        <div className="tool-card-container result-card" ref={resultRef}>
          <div className="tool-card-title">📊 종합 분석 결과</div>
          <div id="result-body">{result}</div>
        </div>
      )}

      <style>{`
        .tool-page {
          max-width: 800px;
          margin: 0 auto;
          padding: 1rem;
        }
        .tool-nav {
          margin-bottom: 1.5rem;
        }
        .back-btn {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 500;
          transition: var(--transition);
        }
        .back-btn:hover {
          color: var(--secondary-color);
        }
        .page-header-tool {
          background: linear-gradient(135deg, #2c3e50, #34495e);
          color: #fff;
          border-radius: 14px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 1.5rem;
        }
        .page-header-tool .icon { font-size: 2.5rem; }
        .page-header-tool h1 { font-size: 1.4rem; font-weight: 700; line-height: 1.3; margin: 0; }
        .page-header-tool p { font-size: .9rem; opacity: 0.85; margin-top: 4px; }

        .tab-container-tool {
          display: flex;
          gap: 10px;
          margin-bottom: 1.5rem;
        }
        .tab-btn-tool {
          flex: 1;
          padding: 14px;
          font-size: 1rem;
          font-weight: 700;
          background: #e2e8f0;
          color: #4a5568;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .tab-btn-tool.active {
          background: #3498db;
          color: #fff;
          box-shadow: 0 4px 6px rgba(52, 152, 219, 0.2);
        }

        .tool-card-container {
          background: #fff;
          border-radius: 12px;
          box-shadow: var(--shadow);
          padding: 20px;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(0,0,0,0.05);
        }
        .tool-card-title {
          font-size: 1rem;
          font-weight: 700;
          color: #3498db;
          margin-bottom: 1.25rem;
          padding-bottom: 10px;
          border-bottom: 2px solid #f0f7ff;
        }

        .patient-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .pf { display: flex; flex-direction: column; gap: 6px; }
        .pf label { font-size: .85rem; color: #4a5568; font-weight: 700; }
        .pf input, .pf select {
          padding: 10px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .pf input:focus, .pf select:focus { border-color: #3498db; }
        .unit-text { font-size: 0.75rem; color: #718096; font-weight: normal; margin-left: 4px; }

        .cat-title {
          font-size: .95rem;
          font-weight: 700;
          color: #2c3e50;
          background: #f0f7ff;
          padding: 10px 14px;
          border-radius: 8px;
          margin: 20px 0 12px;
          border-left: 4px solid #3498db;
        }
        
        .pair-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .chk-label {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px;
          border: 2px solid #f1f5f9;
          border-radius: 10px;
          background: #f8fafc;
          cursor: pointer;
          transition: all 0.2s;
          font-size: .95rem;
        }
        .chk-label input { width: 18px; height: 18px; }
        .chk-label.checked {
          background: #e0f2fe;
          border-color: #3498db;
          color: #2980b9;
          font-weight: 700;
        }

        .btn-analyze-tool {
          width: 100%;
          margin-top: 25px;
          padding: 16px;
          background: #3498db;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .btn-analyze-tool:hover { background: #2980b9; }

        .save-row-tool { display: flex; gap: 12px; margin-top: 12px; }
        .btn-save-tool {
          flex: 1;
          padding: 12px;
          border: none;
          border-radius: 8px;
          font-size: .9rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .input-save { background: #2ecc71; color: #fff; }
        .result-save { background: #1abc9c; color: #fff; }

        .patient-bar {
          background: #f0f7ff;
          border-left: 4px solid #3498db;
          border-radius: 8px;
          padding: 14px;
          margin-bottom: 1rem;
          font-size: .9rem;
          display: flex;
          flex-wrap: wrap;
          gap: 10px 20px;
        }
        .input-summary {
          background: #f8fafc;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 1rem;
          font-size: .9rem;
          line-height: 1.6;
        }
        .result-box {
          border-radius: 10px;
          padding: 20px;
          margin-top: 10px;
          border-left: 6px solid #95a5a6;
          background: #fdfefe;
        }
        .result-box.danger { border-left-color: #e74c3c; background: #fdf2f2; }
        .result-box.warning { border-left-color: #f39c12; background: #fef9e7; }
        .result-box.success { border-left-color: #27ae60; background: #f4fef8; }

        .result-header { font-size: 1.2rem; font-weight: 700; margin-bottom: 8px; }
        .action-message {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 15px;
          padding-bottom: 12px;
          border-bottom: 1px dashed #cbd5e1;
          line-height: 1.5;
        }
        .result-guideline { font-size: 1rem; line-height: 1.7; }
        .result-guideline ul { margin-left: 20px; margin-top: 10px; }
        .result-guideline li { margin-bottom: 8px; }

        .ref-label {
          font-size: .8rem;
          color: #95a5a6;
          text-align: right;
          margin-top: 20px;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .patient-grid, .pair-grid { grid-template-columns: 1fr; }
          .save-row-tool { flex-direction: column; }
          .page-header-tool { padding: 16px; flex-direction: column; text-align: center; }
          .page-header-tool h1 { font-size: 1.2rem; }
          .tab-btn-tool { font-size: .9rem; padding: 12px 6px; }
        }
      `}</style>
    </div>
  );
};

export default Hypothyroidism;
