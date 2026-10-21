import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Produto from "./pages/Produto";
import Carrinho from "./pages/Carrinho";
import Auth from "./pages/Auth";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:id" element={<Produto />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}