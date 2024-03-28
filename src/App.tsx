import { HashRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import BaseLayout from "./BaseLayout";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={"/"} element={<BaseLayout />} />
        <Route path={"/process/:processId"} element={<BaseLayout />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
