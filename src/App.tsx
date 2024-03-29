import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import BaseLayout from "./BaseLayout";
import { MyProcessesProvider } from "./context/ProcessesContext";

function App() {
  return (
    <MyProcessesProvider>
      <HashRouter>
        <Routes>
          <Route path={"/"} element={<BaseLayout />} />
          <Route path={"/process/:processId"} element={<BaseLayout />} />
        </Routes>
      </HashRouter>
    </MyProcessesProvider>
  );
}

export default App;
