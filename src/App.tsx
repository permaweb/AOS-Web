import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import BaseLayout from "./BaseLayout";
import { MyProcessesProvider } from "./context/ProcessesContext";
import { WalletProvider } from "./context/WalletContext";

function App() {
  return (
    <WalletProvider>
      <MyProcessesProvider>
        <HashRouter>
          <Routes>
            <Route path={"/"} element={<BaseLayout />} />
            <Route path={"/process/:processId"} element={<BaseLayout />} />
          </Routes>
        </HashRouter>
      </MyProcessesProvider>
    </WalletProvider>
  );
}

export default App;
