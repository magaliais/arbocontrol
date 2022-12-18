import React, { ChangeEvent, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import api from '../../services/api';
import neighborhoods from '../../mocks/neighborhoods';
import * as S from './styles';
import places from '../../mocks/place';

interface FormValues {
  cep: string;
  street: string;
  neighborhood: string;
  houseNumber: string;
  complement: string;
  reference: string;
  cellphoneNumber: string;
  phoneNumber: string;
  email: string;
  place: string;
  notes: string;
}
interface cepResponse {
  logradouro: string;
  erro?: 'true';
}

export default function Form() {
  const [isLoading, setIsLoading] = useState(false);
  const [complaintProtocol, setComplaintProtocol] = useState('');

  useEffect(() => {
    const presentTime = Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date).replaceAll('/', '-');

    // TODO obter número do protocolo atual
    const protocolNumber = 'N.12'

    setComplaintProtocol(`${protocolNumber} - ${presentTime}`);
  }, [])

  const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      cep: '',
      street: '',
      neighborhood: '',
      houseNumber: '',
      complement: '',
      reference: '',
      cellphoneNumber: '',
      phoneNumber: '',
      email: '',
      place: '',
      notes: '',
    }
  });
  const [image, setImage] = useState<string | ArrayBuffer | null>('');

  async function handleSelectImage(inputFiles: FileList | null) {
    // base64
    const fileToLoad = inputFiles![0];

    if(fileToLoad) {
      // FileReader instance
      const fileReader = new FileReader();

      fileReader.onload = function (fileLoadedEvent) {
        const fileAsBase64 = fileLoadedEvent.target!.result;

        console.log(fileAsBase64);
        setImage(fileAsBase64);
      };

      // convert to base64
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  async function fetchStreet() {
    const cep = getValues('cep');

    // TODO outras verificações
    if(cep.length !== 8) {
      // TODO passar os alertas para "toasts" mais amigáveis (react-toastify)
      alert("O CEP deve ser composto por 8 números");
      return;
    }
    if(cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json`)
        .then(response => {
          return response.json() as Promise<cepResponse>
        })
        .then(result => {
          if(result.erro) {
            alert("Não foi possível encontrar o CEP informado");
          }
          setValue("street", result.logradouro)
        })
        .catch(err => {
          alert(err);
        })
    }
  }

  const onSubmitComplaint: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    const payload = {
      ...data,
      image: image
    }
    console.log(payload);

    await api
      .post("/complaint", payload)
      .then((response) => {
        console.log(response);
        alert(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  }

  return (
    <S.Container>
      <h1 id='hashForm'>Faça sua denúncia abaixo</h1>
      <p>
        Preencha o formulário abaixo. Assim que você enviar sua denúncia
        entraremos em contato e tomaremos as medidas necessárias.
      </p>
      <p>Obrigado por ajudar a cidade</p>
      <form onSubmit={handleSubmit(onSubmitComplaint)}>
        <S.InputGroup>
          <label htmlFor="cep">CEP *</label>
          <input
            id="cep"
            type="text"
            {...register("cep", { 
              required: 'O campo "CEP" é obrigatório', 
              minLength: { value: 8, message: 'Um CEP precisa ter 8 dígitos' }, 
              maxLength: 8 
            })}
            onBlur={fetchStreet}
            maxLength={8}
          />
          {errors.cep?.message !== undefined && <span>{errors.cep?.message}</span>}
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
          <input id="street" type="text" disabled {...register("street", {})}/>
        </S.InputGroup>

        <S.InputGroup>
          <label htmlFor="neighborhood">Bairro *</label>
          <select 
            id="neighborhood"
            {...register("neighborhood", {
              required: 'O campo "Bairro" é obrigatório'
            })}
          >
            {neighborhoods.map(hit => <option value={hit.id}>{hit.name}</option>)}
          </select>
          {errors.neighborhood?.message !== undefined && <span>{errors.neighborhood?.message}</span>}
        </S.InputGroup>

        <S.InputGroup>
          <label htmlFor="houseNumber">Número *</label>
          <input id="houseNumber" type="text" {...register("houseNumber", {
            required: 'O campo "Número" é obrigatório'
          })} />
          {errors.houseNumber?.message !== undefined && <span>{errors.houseNumber?.message}</span>}
        </S.InputGroup>

        <S.InputGroup>
          <label htmlFor="complement">Complemento &#40;Opcional&#41;</label>
          <input id="complement" type="text" {...register('complement')} />
        </S.InputGroup>

        <S.InputGroup>
          <label htmlFor="reference">
            Referência do local &#40;Opcional&#41; &#40;Ex: em frente a igreja,
            perto da padaria&#41;
          </label>
          <textarea id="reference" {...register("reference")}></textarea>
        </S.InputGroup>

        <S.InputGroup>
          <label htmlFor="cellphoneNumber">
            Telefone celular &#40;Opcional&#41;
          </label>
          <input id="cellphoneNumber" type="text" {...register("cellphoneNumber")} />
        </S.InputGroup>

        <S.InputGroup>
          <label htmlFor="phoneNumber">Telefone fixo &#40;Opcional&#41;</label>
          <input id="phoneNumber" type="text" {...register("phoneNumber")} />
        </S.InputGroup>

        <S.InputGroup>
          <label htmlFor="email">Email &#40;Opcional&#41;</label>
          <input id="email" type="text" {...register("email")} />
        </S.InputGroup>

        {/* // TODO imagem */}
        <S.InputGroup>
          <label htmlFor="image">Foto &#40;Opcional&#41;</label>
          <input id="image" type="file" onChange={(e) => handleSelectImage(e.target.files)} />
          {/* <img src={image && image} alt="" /> */}
        </S.InputGroup>

        <S.InputGroup>
          <label htmlFor="place">Local favorável de foco *</label>
          <select id="place" {...register('place', {
            required: 'O campo "Local favorável de foco" é obrigatório'
          })}>
            {places.map(hit => <option value={hit.id}>{hit.name}</option>)}
          </select>
          {errors.place?.message !== undefined && <span>{errors.place?.message}</span>}
        </S.InputGroup>
        <S.InputGroup>
          <label htmlFor="notes">Observações &#40;Opcional&#41;</label>
          <textarea id="notes" {...register("notes")}></textarea>
        </S.InputGroup>

        <p>* campos de preenchimento obrigatório</p>

        <S.InputGroup>
          <label htmlFor="complaintProtocol">Protocolo da Denúncia</label>
          <input id="complaintProtocol" type="text" disabled value={complaintProtocol} />
        </S.InputGroup>

        <button disabled={isLoading} type='submit'>{isLoading ? 'Carregando...' : 'Enviar'}</button>
      </form>
    </S.Container>
  );
}
