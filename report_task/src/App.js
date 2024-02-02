import { BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./Components/Main";
import { TestRoute } from "./Components/TestRoute";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/test" element={<TestRoute />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
