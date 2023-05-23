import { Clock, Phone, EnvelopeSimple, MapTrifold } from "phosphor-react";
import * as S from "./styles";
import pjfLogo from "/src/assets/images/logo-pjf.png";
import Fade from "react-reveal/Fade";

export default function Footer() {
  return (
    <S.Container>
      <S.Content>
        <Fade bottom>
          <h2>Entre em Contato!</h2>
          <p>Tem alguma dúvida sobre? Saiba como nos contatar</p>
        </Fade>

        <Fade bottom>
          <section>
            <S.Card>
              <Clock size={48} color="#19CCB2" />
              <strong>Horário de Atendimento</strong>
              <p>Segunda-Sexta: 07:00 as 11:00 e 13:00 as 17:00</p>
            </S.Card>
            <S.Card as="a" href="tel:+3232123070">
              <Phone size={48} color="#19CCB2" />
              <strong>Telefone</strong>
              <p>(32) 3212-3070</p>
              <i>Clique para discar</i>
            </S.Card>
            <S.Card as="a" href="mailto:dengue@pjf.mg.gov.br">
              <EnvelopeSimple size={48} color="#19CCB2" />
              <strong>Email</strong>
              <p>dengue@pjf.mg.gov.br</p>
              <i>Clique para enviar email</i>
            </S.Card>
            <S.Card>
              <MapTrifold size={48} color="#19CCB2" />
              <strong>Endereço</strong>
              <p>
                Departamento de Vigilância Epidemiológica Programa Nacional de
                Combate de Combate a Dengue Rua: Praça Pantaleone Arcury 87 - CEP:
                36036.050- Juiz de Fora MG
              </p>
            </S.Card>
          </section>
        </Fade>

        <S.Logos>
          <img src={pjfLogo} alt="" />
        </S.Logos>
      </S.Content>
    </S.Container>
  );
}
