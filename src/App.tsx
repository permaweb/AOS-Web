import { HashRouter } from "react-router-dom";
import { Routes } from "./routes";
import { MyProcessesProvider } from "./context/ProcessesContext";
import WalletWrapper from "./components/wallet/WalletWrapper";
import { ConnectedProcessProvider } from "./context/ConnectedProcess";

function App() {
  return (
    <WalletWrapper>
      <ConnectedProcessProvider>
        <MyProcessesProvider>
          <HashRouter>
            <Routes />
          </HashRouter>
        </MyProcessesProvider>
      </ConnectedProcessProvider>
    </WalletWrapper>
  );
}

export default App;
