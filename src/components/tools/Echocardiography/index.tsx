import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEchoLogic } from './useEchoLogic';
import EchoForm from './EchoForm';
import EchoResultView from './EchoResultView';
import html2canvas from 'html2canvas';
import AdSlot from '../../common/AdSlot';

const Echocardiography = () => {
  const {
    species, setSpecies,
    patientInfo, setPatientInfo,
    dogInput, setDogInput,
    catInput, setCatInput,
    result,
    resultRef,
    calculateEcho
  } = useEchoLogic();

  const saveImg = () => {
    if (!resultRef.current) return;
    
    html2canvas(resultRef.current, { 
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

      <div className="tool-content-standard">
        <AdSlot className="mb-6" />

        <div className="tool-content-echo">
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
            saveImg={saveImg}
            result={!!result}
          />

          {result && (
            <EchoResultView
              result={result}
              resultRef={resultRef}
            />
          )}
        </div>

        <AdSlot className="mt-8" />
      </div>

      <style>{`
        .tool-content-standard {
          margin: 0 auto;
        }
        .tool-content-echo {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Echocardiography;
