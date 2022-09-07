import * as S from './styles'

import pjfLogo from '/src/assets/images/logo-pjf.png'
import arbocontrol from '/src/assets/images/arbocontrol.png';
import bgVideo from '/src/assets/videos/bg-video.mp4';

export default function Hero() {
  return (
      <S.Hero>
        <video autoPlay muted loop>
          <source src={`${bgVideo}#t=8,20`} type="video/mp4" />
        </video>
        <div className="content">
          <div className="images">
            <img src={pjfLogo} alt="" />
            <img src={arbocontrol} alt="" />
          </div>
          <header>
            <h2>
              Orientação e Prevenção <br />
              JF Contra o Aedes
            </h2>
          </header>
          <button>Denuncie Agora!</button>
        </div>
      </S.Hero>
  );
}