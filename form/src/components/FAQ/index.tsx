import * as S from './styles';

import Fade from 'react-reveal/Fade';

import AccordionGroup from '../AccordionGroup';

export default function FAQ() {
  // TODO criar pasta 'mock' para colocar os dados que estão mockados no front
  const leftAccordionGroup = [
    {
      summary: "O que preciso fazer para denunciar um foco do Aedes aegypti?",
      details:
        ["O cidadão informa um endereço completo do local que possa conter possíveis focos de mosquitos. Recebe um número de protocolo através do qual acompanha a situação do local denunciado. Depois de registrado o pedido, a solicitação terá o trâmite nos órgãos municipais."],
    },
    {
      summary: "Quanto tempo demora até a prefeitura agir",
      details: ["Um prazo de 15 (quinze) dias úteis."],
    },
    {
      summary: "Como reconhecer locais com foco do Aedes aegypti",
      details:
        ["O Aedes Aegypti põe seus ovos em recipientes como latas e garrafas vazias, pneus, calhas, construções e casas abandonadas ,caixas d'água descobertas, piscinas não tratadas, pratos sob vasos de plantas ou qualquer outro objeto que possa armazenar água da chuva."],
    },
  ];
  const rightAccordionGroup = [
    {
      summary: "O que é um foco de Aedes aegypti?",
      details: [
        "Lugar ou local com com acumulo de água por mais de 7 (sete) dias.",
      ],
    },
    {
      summary: "Como saber se minha denúncia foi feita com sucesso?",
      details: [
        "Certifique-se se o endereço está correto e o mais completo possível, informe um telefone ou e-mail de contato, coloque referência do local.",
      ],
    },
    {
      summary:
        "Como posso prevenir focos do Aedes aegypti em minha residência?",
      details: [
        "1 - Se você não colocou areia e acumulou água no pratinho de planta, lavá-lo com escova, água e sabão. Fazer isso uma vez por semana.",
        "2 - Lavar principalmente por dentro com escova e sabão os utensílios usados para guardar água em casa, como jarras, garrafas, potes, baldes etc.",
        "3 - Embale para recolhimento todas as garrafas pet e de vidro vazias que não for usar. As garrafas de vidro não descartadas devem ser guardadas de boca para baixo ou em local coberto.",
        "4 - Se você tiver vasos de plantas aquáticas, trocar a água e lavar o vaso principalmente por dentro com escova, água e sabão pelo menos uma vez por semana.",
        "5 - Jogar no lixo todo objeto que possa acumular água, como embalagens usadas, potes, latas, copos, garrafas vazias etc.",
        "6 - Remover folhas, galhos e tudo que possa impedir a água de correr pelas calhas.",
        "7 - Manter a caixa d’água sempre fechada com tampa adequada.",
        "8 - Colocar o lixo em sacos plásticos e manter a lixeira bem fechada. Não jogar lixo em terrenos baldios.",
        "9 - Não deixar a água da chuva acumulada sobre a laje.",
        "10 - Manter bem tampados tonéis e barris de água.",
        "11 - Encher de areia até a borda os pratinhos de vasos de plantas.",
        "12 - Entregue os pneus velhos aos serviços de limpeza urbana. Caso realmente precise mantê-los, guarde-os em local coberto.",
        "13 - Manter o saco de lixo bem fechado e fora do alcance de animais até o recolhimento pelo serviço de limpeza urbana.",
        "14 - Lavar semanalmente por dentro com escova e sabão os tanques utilizados para armazenar água.",
      ],
    },
  ];

  return (
    <S.Container>
      <S.Content>
        <Fade bottom>
          <h2>Perguntas Frequentes</h2>
          <p>Caso tenha mais dúvidas, entre em contato conosco abaixo</p>
        </Fade>

        <S.AccordionsSection>
          <Fade left>
            <AccordionGroup accordions={leftAccordionGroup} />
          </Fade>

          <Fade right>
            <AccordionGroup accordions={rightAccordionGroup} />
          </Fade>
        </S.AccordionsSection>

        <Fade bottom>
          <h3>Saiba mais sobre o mosquito no vídeo abaixo</h3>
          <div className='iframeContainer'>
            <iframe
              src="https://www.youtube.com/embed/qM7MT5YTSLQ"
              title="Aedes video"
            ></iframe>
          </div>
        </Fade>
      </S.Content>
    </S.Container>
  );
}