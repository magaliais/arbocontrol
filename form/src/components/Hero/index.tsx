import * as S from './styles'

import pjfLogo from '/src/assets/images/logo-pjf.png'
import bgVideo from '/src/assets/videos/bg-video.mp4';

export default function Hero() {
  return (
    <S.Container>
      <video autoPlay muted loop>
        <source src={`${bgVideo}#t=8,20`} type="video/mp4" />
      </video>
      <div className="content">
        <div className="images">
          <img src={pjfLogo} alt="" />
        </div>
        <header>
          <h2>
            Orientação e Prevenção <br />
            JF Contra o Aedes
          </h2>
        </header>
        <S.HashLinkButton to="#hashForm">Denuncie Agora!</S.HashLinkButton>
      </div>
    </S.Container>
  );
}