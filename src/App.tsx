import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VerifyCert from "./pages/VerifyCert";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/verify-cert" element={<VerifyCert />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
