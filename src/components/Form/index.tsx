import React from 'react'
import * as S from './styles';

export default function Form() {
  async function handleSubmit() {
    
  } 

  return (
    <S.Container>
      <h1>Faça sua denúncia abaixo</h1>
      <p>
        Preencha o formulário abaixo. Assim que você enviar sua denúncia
        entraremos em contato e tomaremos as medidas necessárias.
      </p>
      <p>Obrigado por ajudar a cidade</p>
      <form onSubmit={handleSubmit}>
        <S.InputGroup>
          <label htmlFor="cep">CEP *</label>
          <input id="cep" type="text" />
        </S.InputGroup>
        <a
          href="https://buscacepinter.correios.com.br/app/endereco/index.php"
          target="_blank"
          rel="noopener noreferrer"
        >
          Não sei o CEP &#40;?&#41;
        </a>
        <S.InputGroup>
          <label htmlFor="street">Logradouro *</label>
          <input id="street" type="text" disabled />
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="neighborhood">Bairro*</label>
          <select name="neighborhood" id="neighborhood">
            <option value="215">Adolfo Vireque</option>
            <option value="223">Aeroporto</option>
            <option value="676">
              Aeroporto Municipal Francisco Álvares de Assis
            </option>
            <option value="302">Aldeia</option>
            <option value="498">Alphaville</option>
          </select>
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="houseNumber">Número</label>
          <input id="houseNumber" type="text" />
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="complement">Complemento &#40;Opcional&#41;</label>
          <input id="complement" type="text" />
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="complement">
            Referência do local &#40;Opcional&#41; &#40;Ex: em frente a igreja,
            perto da padaria&#41;
          </label>
          <textarea name="complement" id="complement"></textarea>
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="cellphoneNumber">
            Telefone celular &#40;Opcional&#41;
          </label>
          <input id="cellphoneNumber" type="text" />
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="phoneNumber">Telefone fixo &#40;Opcional&#41;</label>
          <input id="phoneNumber" type="text" />
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="email">Email &#40;Opcional&#41;</label>
          <input id="email" type="text" />
        </S.InputGroup>

        {/* // TODO imagem */}

        <S.InputGroup>
          <label htmlFor="place">Local favorável de foco*</label>
          <select name="place" id="place">
            <option value="1">Acumulador</option>
            <option value="2">Ação conjunta</option>
            <option value="3">Boca de lobo entupida</option>
            <option value="4">Bromélias</option>
            <option value="3">Caixa d'água destampada</option>
          </select>
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="notes">Observações &#40;Opcional&#41;</label>
          <textarea name="notes" id="notes"></textarea>
        </S.InputGroup>
        {/* // TODO protocolo da denúncia  */}
        <button>Enviar</button>
      </form>
    </S.Container>
  );
}
