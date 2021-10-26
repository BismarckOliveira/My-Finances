import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { TransactionModal } from "./components/TransactionModal";
import { GlobalStyle } from "./styles/global";
import { TransactionProvider} from './hooks/useTransactions'

function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  function HandleOpenNewTransactionModal() {
    setIsNewTransactionModalOpen(true);
  }

  function HandleCloseNewTransactionModal() {
    setIsNewTransactionModalOpen(false);
  }
  return (
    <TransactionProvider>
      <Header onOpenNewTransactionModal={HandleOpenNewTransactionModal} />
      <Dashboard />

      <TransactionModal
        isOpen={isNewTransactionModalOpen}
        onRequestClose={HandleCloseNewTransactionModal}
      />
      <GlobalStyle />
    </TransactionProvider>
  );
}

export default App;
