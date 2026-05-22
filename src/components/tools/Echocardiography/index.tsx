import React from 'react';
import { ChevronLeft, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEchoLogic } from './useEchoLogic';
import EchoForm from './EchoForm';
import EchoResultView from './EchoResultView';
import html2canvas from 'html2canvas';

const Echocardiography: React.FC = () => {
  const {
    input,
    setInput,
    result,
    resultRef,
    captureRef,
    calculateEcho
  } = useEchoLogic();

  const saveImg = () => {
    if (!captureRef.current) return;
    html2canvas(captureRef.current, { background: '#f8fafc', scale: 2 } as any).then((canvas) => {
      const link = document.createElement('a');
      link.download = `VET_심초음파리포트_${new Date().getTime()}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
    });
  };

  return (
    <div className="tool-page">
      <div className="tool-nav">
        <Link to="/" className="back-btn-prominent">
          <ChevronLeft size={18} /> 대시보드
        </Link>
      </div>

      <div className="page-header-tool-white">
        <div className="icon">❤️</div>
        <div>
          <h1>심초음파 지표 계산기</h1>
          <p>주요 심장 지표 산출 및 ACVIM 가이드라인 기반 분석</p>
        </div>
      </div>

      <div className="layout-grid-neuro" ref={captureRef}>
        <EchoForm
          input={input}
          setInput={setInput}
          calculateEcho={calculateEcho}
        />

        {result && (
          <EchoResultView
            result={result}
            resultRef={resultRef}
          />
        )}
      </div>

      <div className="save-action-area">
        <button className="btn-save-full" onClick={saveImg}>
          <Camera size={20} /> 분석 리포트 이미지 저장
        </button>
      </div>

      <style>{`
        .tool-page { max-width: 1200px; margin: 0 auto; padding: 1rem; display: flex; flex-direction: column; align-items: center; }
        .tool-nav, .page-header-tool-white, .layout-grid-neuro, .save-action-area { width: 100%; max-width: 800px; }
        
        .layout-grid-neuro { display: flex; flex-direction: column; gap: 1.5rem; margin-top: 1rem; padding-bottom: 20px; align-items: center; }
        .layout-grid-neuro > div { width: 100%; }
        
        .tool-nav { margin-bottom: 1.5rem; display: flex; justify-content: flex-start; }
        .back-btn-prominent {
          display: inline-flex; align-items: center; gap: 4px; text-decoration: none; color: #fff;
          background-color: var(--secondary-color); padding: 8px 16px; border-radius: 8px;
          font-weight: 600; font-size: 0.9rem; transition: var(--transition);
          box-shadow: 0 2px 4px rgba(52, 152, 219, 0.2);
        }

        .page-header-tool-white {
          background: #fff; color: var(--primary-color); border-radius: 14px; padding: 24px;
          display: flex; align-items: center; gap: 16px; margin-bottom: 1.5rem;
          border: 1px solid rgba(0,0,0,0.05); box-shadow: var(--shadow);
        }
        .page-header-tool-white .icon { font-size: 2.5rem; }
        .page-header-tool-white h1 { font-size: 1.4rem; font-weight: 700; line-height: 1.3; margin: 0; color: var(--primary-color); }
        .page-header-tool-white p { font-size: .9rem; color: var(--text-secondary); margin-top: 4px; }

        .tool-card-container {
          background: #fff; border-radius: 12px; box-shadow: var(--shadow);
          padding: 20px 24px; margin-bottom: 1.5rem; border: 1px solid rgba(0,0,0,0.05);
        }
        .tool-card-title {
          font-size: 1rem; font-weight: 700; color: var(--secondary-color);
          margin-bottom: 1.25rem; padding-bottom: 10px; border-bottom: 2px solid #f0f7ff;
          text-align: center;
        }

        .patient-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .pf { display: flex; flex-direction: column; gap: 6px; }
        .pf label { font-size: .85rem; color: #4a5568; font-weight: 700; text-align: center; }
        .pf input, .pf select {
          padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px;
          font-size: 1rem; outline: none; background: #fffdf0; text-align: center;
        }

        .btn-localize-stylish {
          width: 100%; padding: 18px;
          background: linear-gradient(135deg, #3498db, #2980b9);
          color: #fff; border: none; border-radius: 14px;
          font-size: 1.1rem; font-weight: 800; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s; box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
        }
        .btn-localize-stylish:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4); }

        .save-action-area { max-width: 1000px; margin: 0 auto; padding: 1rem; display: flex; justify-content: center; }
        .btn-save-full {
          width: 100%; max-width: 800px; padding: 16px; background: #1e293b; color: #fff; border: none;
          border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.2s;
        }
        .btn-save-full:hover { background: #334155; transform: translateY(-2px); }

        .ref-label { font-size: .75rem; color: #aaa; text-align: right; margin-top: 16px; font-style: italic; line-height: 1.5; }

        @media (max-width: 768px) {
          .page-header-tool-white { padding: 16px; flex-direction: column; text-align: center; }
          .page-header-tool-white h1 { font-size: 1.2rem; }
          .patient-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Echocardiography;
