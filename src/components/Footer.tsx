import Logo from "./Logo";
import "./Rodape.css";

export default function Footer() {
  return (
    <footer className="rodape">
      <div className="container rodape__linha">
        <Logo />
        <small>Camisas que contam histórias.</small>
        <small>© 2025 Onze Store</small>
      </div>
    </footer>
  );
}
