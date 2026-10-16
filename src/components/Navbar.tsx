import { useState } from "react";
import { Link } from "react-router-dom";
import { ESTADOS, PAISES } from "../data/menu";
import { IconBag, IconMenu, IconUser } from "./icons";
import Logo from "./Logo";
import "./Navbar.css";

const destino = (categoria: string) => `/?categoria=${categoria}#vestiario`;

export default function Navbar({ carrinho }: { carrinho: number }) {
  const [aberto, setAberto] = useState(false);
  const fechar = () => setAberto(false);

  return (
    <header className="header">
      <p className="header__aviso">
        <span>FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 499</span>
        <i className="header__ponto" aria-hidden="true" />
        <span>5% OFF NO PIX</span>
      </p>

      <div className="container header__barra">
        <Logo onClick={fechar} />

        <nav className={`nav${aberto ? " nav--aberto" : ""}`} aria-label="Principal">
          <ul className="nav__lista">
            <li className="nav__item">
              <Link className="nav__link" to={destino("nacionais")} onClick={fechar}>Nacionais</Link>
              <ul className="nav__drop">
                {ESTADOS.map((estado) => (
                  <li key={estado}>
                    <Link to={destino("nacionais")} onClick={fechar}>{estado}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav__item">
              <Link className="nav__link" to={destino("internacionais")} onClick={fechar}>Internacionais</Link>
              <ul className="nav__drop">
                {PAISES.map((pais) => (
                  <li key={pais}>
                    <Link to={destino("internacionais")} onClick={fechar}>{pais}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav__item">
              <Link className="nav__link" to={destino("retro")} onClick={fechar}>Retrô</Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" to="/#vestiario" onClick={fechar}>Lançamentos</Link>
            </li>
          </ul>
        </nav>

        <div className="header__acoes">
          <button type="button" className="conta">
            <IconUser />
            <span>Olá, entre ou<strong>cadastre-se</strong></span>
          </button>
          <button type="button" className="carrinho" aria-label={`Carrinho com ${carrinho} itens`}>
            <IconBag />
            <span className="carrinho__n">{carrinho}</span>
          </button>
          <button
            type="button"
            className="header__menu"
            aria-label="Abrir menu"
            aria-expanded={aberto}
            onClick={() => setAberto((v) => !v)}
          >
            <IconMenu />
          </button>
        </div>
      </div>
    </header>
  );
}
