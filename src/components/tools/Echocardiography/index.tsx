import { ChevronLeft, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEchoLogic } from './useEchoLogic';
import EchoForm from './EchoForm';
import EchoResultView from './EchoResultView';
import html2canvas from 'html2canvas';

const Echocardiography = () => {
  const {
    species, setSpecies,
    patientInfo, setPatientInfo,
    dogInput, setDogInput,
    catInput, setCatInput,
    result,
    resultRef,
    captureRef,
    calculateEcho
  } = useEchoLogic();

  const saveImg = () => {
    if (!captureRef.current) return;
    
    html2canvas(captureRef.current, { 
      background: '#f8fafc',
      scale: 2,
      useCORS: true,
      logging: false
    } as any).then((canvas) => {
      const link = document.createElement('a');
      const ptName = patientInfo.name || 'Patient';
      link.download = `VETAPP_심초음파_${ptName}_${new Date().getTime()}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.9);
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

      <header className="page-header-tool-white">
        <div className="icon">❤️</div>
        <div>
          <h1>수의 심장 초음파 분석기</h1>
          <p>Echocardiography Analysis based on ACVIM Guidelines</p>
        </div>
      </header>

      <div className="tool-content-echo" ref={captureRef}>
        <EchoForm
          species={species}
          setSpecies={setSpecies}
          patientInfo={patientInfo}
          setPatientInfo={setPatientInfo}
          dogInput={dogInput}
          setDogInput={setDogInput}
          catInput={catInput}
          setCatInput={setCatInput}
          calculateEcho={calculateEcho}
        />

        {result && (
          <EchoResultView
            result={result}
            resultRef={resultRef}
          />
        )}
      </div>

      <div className="action-area-echo">
        <button className="btn-save-refined" onClick={saveImg}>
          <Camera size={20} /> 분석 결과 리포트 이미지 저장
        </button>
      </div>

      <style>{`
        .tool-content-echo {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .action-area-echo {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
        }

        .btn-save-refined {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.05rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
        }

        .btn-save-refined:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
          filter: brightness(1.05);
        }

        .btn-save-refined:active {
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Echocardiography;
