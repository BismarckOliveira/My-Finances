import { FormEvent, useState } from "react";
import Modal from "react-modal";
import CloseImg from "../../assets/close.svg";
import IncomeImg from "../../assets/income.svg";
import OutcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";

import { Container, RadioBox, TransactionButtonContainer } from "./styles";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

Modal.setAppElement("#root");

export const TransactionModal = ({ isOpen, onRequestClose }: ModalProps) => {
  const [title, setTitle] = useState("");
  const [amount, setamount] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("deposit");
  const { createTransaction } = useTransactions();

  async function handlerCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      category,
      type,
    });

    setTitle("");
    setCategory("");
    setType("deposit");
    setamount(0);
    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-orverlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={CloseImg} alt="Fechar Modal" />
      </button>
      <Container onSubmit={handlerCreateNewTransaction}>
        <h2>Nova Transação</h2>

        <input
          placeholder="titulo"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(event) => setamount(Number(event.target.value))}
        />

        <TransactionButtonContainer>
          <RadioBox
            type="button"
            isActive={type === "deposit"}
            activeColor="green"
            onClick={() => setType("deposit")}
          >
            <img src={IncomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            isActive={type === "withdraw"}
            activeColor="red"
            onClick={() => setType("withdraw")}
          >
            <img src={OutcomeImg} alt="Saida" />
            <span>Saida</span>
          </RadioBox>
        </TransactionButtonContainer>

        <input
          placeholder="categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button type="submit">cadastrar</button>
      </Container>
    </Modal>
  );
};
