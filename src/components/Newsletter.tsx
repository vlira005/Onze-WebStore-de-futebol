import { IconArrow } from "./icons";
import "./Rodape.css";

/** Apenas visual: o envio é bloqueado. */
export default function Newsletter() {
  return (
    <section className="newsletter">
      <div className="container newsletter__grade">
        <div>
          <span className="eyebrow">Entre para o clube</span>
          <h2>Receba novidades antes do apito inicial.</h2>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="nl-email">Seu melhor e-mail</label>
          <div className="newsletter__campo">
            <input id="nl-email" type="email" placeholder="voce@email.com" autoComplete="email" />
            <button type="submit" aria-label="Cadastrar e-mail"><IconArrow /></button>
          </div>
          <small>Ao cadastrar, você concorda com nossa política de privacidade.</small>
        </form>
      </div>
    </section>
  );
}
