import { Link } from "react-router-dom";
import ImgSlot from "../components/ImgSlot";
import { precoUnitario, produtoDoItem, useCarrinho } from "../context/CarrinhoContext";
import { brl } from "../utils";
import "./Carrinho.css";

const FRETE_GRATIS = 499;
const DESCONTO_PIX = 0.05;

export default function Carrinho() {
  const { itens, quantidadeTotal, total, alterarQuantidade, remover } = useCarrinho();

  if (itens.length === 0) {
    return (
      <section className="container carrinho-vazio">
        <span className="eyebrow">Carrinho</span>
        <h1 className="titulo-secao">Seu carrinho está vazio</h1>
        <p>Adicione camisas para ver os itens e o total da compra aqui.</p>
        <Link to="/#vestiario" className="btn-escuro">Ver camisas</Link>
      </section>
    );
  }

  const faltaFrete = Math.max(0, FRETE_GRATIS - total);
  const progresso = Math.min(100, (total / FRETE_GRATIS) * 100);

  return (
    <section className="carrinho-pagina">
      <div className="container">
        <header>
          <span className="eyebrow">Compra</span>
          <h1 className="titulo-secao">Seu carrinho</h1>
        </header>

        <div className="carrinho__grade">
          <ul className="itens">
            {itens.map((item) => {
              const produto = produtoDoItem(item);
              if (!produto) return null;
              const unitario = precoUnitario(item);
              const personalizacao = item.personalizacao
                ? [item.personalizacao.nome, item.personalizacao.numero].filter(Boolean).join(" ") || "a definir"
                : null;

              return (
                <li className="item" key={item.chave}>
                  <div className="item__img">
                    <ImgSlot src={produto.imagens[0]} alt={`Camisa ${produto.nome}`} />
                  </div>

                  <div className="item__info">
                    <span className="item__time">{produto.time}</span>
                    <Link to={`/produto/${produto.id}`} className="item__nome">{produto.nome}</Link>
                    <p className="item__detalhe">Tamanho {item.tamanho} · {brl(unitario)} cada</p>
                    {personalizacao && <p className="item__detalhe">Nome e número: {personalizacao}</p>}
                    <button type="button" className="item__remover" onClick={() => remover(item.chave)}>
                      Remover
                    </button>
                  </div>

                  <div className="item__qtd" role="group" aria-label={`Quantidade de ${produto.nome}`}>
                    <button
                      type="button"
                      aria-label="Diminuir quantidade"
                      disabled={item.quantidade <= 1}
                      onClick={() => alterarQuantidade(item.chave, -1)}
                    >
                      −
                    </button>
                    <output aria-live="polite">{item.quantidade}</output>
                    <button type="button" aria-label="Aumentar quantidade" onClick={() => alterarQuantidade(item.chave, 1)}>
                      +
                    </button>
                  </div>

                  <strong className="item__total">{brl(unitario * item.quantidade)}</strong>
                </li>
              );
            })}
          </ul>

          <aside className="resumo" aria-label="Resumo da compra">
            <h2>Resumo</h2>
            <dl>
              <div>
                <dt>Subtotal ({quantidadeTotal} {quantidadeTotal === 1 ? "item" : "itens"})</dt>
                <dd>{brl(total)}</dd>
              </div>
              <div>
                <dt>Frete</dt>
                <dd>{faltaFrete === 0 ? "Grátis" : "Calculado na entrega"}</dd>
              </div>
            </dl>

            <div className="resumo__frete">
              <div className="barra" aria-hidden="true"><span style={{ width: `${progresso}%` }} /></div>
              <p>
                {faltaFrete === 0
                  ? "Você ganhou frete grátis!"
                  : `Faltam ${brl(faltaFrete)} para o frete grátis.`}
              </p>
            </div>

            <div className="resumo__total">
              <span>Total</span>
              <strong aria-live="polite">{brl(total)}</strong>
            </div>
            <p className="resumo__pix">ou {brl(total * (1 - DESCONTO_PIX))} no Pix (5% off)</p>

            <button type="button" className="finalizar">Finalizar compra</button>
            <Link to="/" className="continuar">Continuar comprando</Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
