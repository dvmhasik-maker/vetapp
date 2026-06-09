import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEchoLogic } from './useEchoLogic';
import EchoForm from './EchoForm';
import EchoResultView from './EchoResultView';
import EchoGuide from './EchoGuide';
import CollapsibleInfo from '../../common/CollapsibleInfo';
import AdSlot from '../../common/AdSlot';

const Echocardiography: React.FC = () => {
  const {
    species,
    setSpecies,
    patientInfo,
    setPatientInfo,
    dogInput,
    setDogInput,
    catInput,
    setCatInput,
    result,
    resultRef,
    calculateEcho,
    saveImg
  } = useEchoLogic();

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
          <h1>반려견 심초음파 분석기</h1>
          <p>LVIDdn, LA/Ao 및 심장 크기 지표 계산</p>
        </div>
      </div>

      <div className="tool-content-standard">
        <AdSlot className="mb-6" />

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
          result={Boolean(result)}
        />

        {result && (
          <EchoResultView
            result={result}
            resultRef={resultRef}
          />
        )}

        <CollapsibleInfo title="심초음파 지표 해석 및 심부전 가이드">
          <EchoGuide />
        </CollapsibleInfo>

        <AdSlot className="mt-8" />
      </div>

      <style>{`
        .tool-content-standard {
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default Echocardiography;
