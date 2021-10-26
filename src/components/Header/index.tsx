import { Container, Content } from "./styles";
import logoImg from "../../assets/logo.svg";

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="DtFinance" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          nova transação
        </button>
      </Content>
    </Container>
  );
}
