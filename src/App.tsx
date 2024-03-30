import { HashRouter } from "react-router-dom";
import { Routes } from "./routes";
import { MyProcessesProvider } from "./context/ProcessesContext";
import WalletWrapper from "./components/wallet/WalletWrapper";

function App() {
  return (
    <WalletWrapper>
      <MyProcessesProvider>
        <HashRouter>
          <Routes />
        </HashRouter>
      </MyProcessesProvider>
    </WalletWrapper>
  );
}

export default App;
