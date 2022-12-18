import * as S from './style';

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
  complaintProtocol: string;
}

export default function Modal({ isModalOpen, setIsModalOpen, complaintProtocol }: ModalProps) {
  return (
    <S.Overlay>
      <S.Modal>
        <strong>Sua denúncia foi registrada com sucesso!</strong>
        <p>Número do Protocolo da Denúncia</p>
        <span>{complaintProtocol}</span>
        <button onClick={() => setIsModalOpen(false)}>OK</button>
      </S.Modal>
    </S.Overlay>
  );
}