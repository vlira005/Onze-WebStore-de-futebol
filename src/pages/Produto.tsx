import { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import Destaques from "../components/Destaques";
import ImgSlot from "../components/ImgSlot";
import { IconCheck, IconHeart, IconStar } from "../components/icons";
import { PRECO_PERSONALIZACAO, PRODUTOS, ROTULOS, TAMANHOS } from "../data/produtos";
import type { LayoutCtx, Produto } from "../types";
import { brl, mascaraCep } from "../utils";
import "./Produto.css";

type Pagamento = "debito" | "credito" | "pix";

const VISTAS = ["Frente", "Costas", "Detalhe", "Gola"];

const PAGAMENTOS: { id: Pagamento; titulo: string; detalhe: (total: number) => string }[] = [
  { id: "debito", titulo: "Débito", detalhe: (t) => `${brl(t)} à vista` },
  { id: "credito", titulo: "Crédito", detalhe: (t) => `até 6x de ${brl(t / 6)} sem juros` },
  { id: "pix", titulo: "Pix", detalhe: (t) => `${brl(t * 0.95)} com 5% off` },
];

export default function ProdutoPage() {
  const { id } = useParams();
  const { adicionar } = useOutletContext<LayoutCtx>();
  const produto = PRODUTOS.find((p) => p.id === id);

  if (!produto) {
    return (
      <section className="vazio container">
        <h1 className="titulo-secao">Camisa não encontrada</h1>
        <p>Esse produto não existe ou saiu do catálogo.</p>
        <Link to="/" className="btn-voltar">Voltar para a loja</Link>
      </section>
    );
  }

  // key: reinicia o estado ao trocar de produto
  return <Detalhe key={produto.id} produto={produto} adicionar={adicionar} />;
}

function Detalhe({ produto, adicionar }: { produto: Produto; adicionar: () => void }) {
  const [vista, setVista] = useState(0);
  const [tamanho, setTamanho] = useState("M");
  const [personalizar, setPersonalizar] = useState(false);
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [pagamento, setPagamento] = useState<Pagamento>("credito");
  const [favorito, setFavorito] = useState(false);
  const [cep, setCep] = useState("");
  const [adicionado, setAdicionado] = useState(false);

  const total = produto.preco + (personalizar ? PRECO_PERSONALIZACAO : 0);
  const selo = [produto.selo, produto.temporada].filter(Boolean).join(" · ");

  const comprar = () => {
    adicionar();
    setAdicionado(true);
    window.setTimeout(() => setAdicionado(false), 1800);
  };

  return (
    <>
      <section className="produto">
        <div className="container">
          <nav className="migalhas" aria-label="Você está em">
            <Link to="/">Início</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/?categoria=${produto.categoria}#vestiario`}>{ROTULOS[produto.categoria]}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{produto.nome}</span>
          </nav>

          <div className="produto__grade">
            {/* galeria */}
            <div className="galeria">
              <div className="galeria__thumbs">
                {VISTAS.map((v, i) => (
                  <button
                    key={v}
                    type="button"
                    className="thumb"
                    aria-label={`Ver ${v.toLowerCase()}`}
                    aria-pressed={vista === i}
                    onClick={() => setVista(i)}
                  >
                    <ImgSlot src={produto.imagens[i]} />
                  </button>
                ))}
              </div>

              <div className="galeria__principal">
                <span className="selo">{selo}</span>
                <span className="galeria__vista">{VISTAS[vista]}</span>
                <ImgSlot src={produto.imagens[vista]} alt={`Camisa ${produto.nome} — ${VISTAS[vista]}`} />

                {personalizar && (nome || numero) && (
                  <div className="personalizacao" aria-live="polite">
                    {nome && <span className="personalizacao__nome">{nome}</span>}
                    {numero && <span className="personalizacao__numero">{numero}</span>}
                  </div>
                )}
              </div>
            </div>

            {/* informações */}
            <div className="info">
              <div className="info__topo">
                <div>
                  <span className="eyebrow">{produto.clube}</span>
                  <h1>Camisa {produto.nome}</h1>
                </div>
                <button
                  type="button"
                  className="fav"
                  aria-label="Favoritar"
                  aria-pressed={favorito}
                  onClick={() => setFavorito((v) => !v)}
                >
                  <IconHeart />
                </button>
              </div>

              <div className="nota">
                <span className="estrelas" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => <IconStar key={i} />)}
                </span>
                <strong>{produto.nota.toLocaleString("pt-BR", { minimumFractionDigits: 1 })}</strong>
                <a href="#avaliacoes">{produto.avaliacoes} avaliações</a>
              </div>

              <div className="preco">
                <div>
                  {produto.precoAntigo && <s>{brl(produto.precoAntigo)}</s>}
                  <strong>{brl(total)}</strong>
                </div>
                <small>ou 6x de {brl(total / 6)} sem juros</small>
              </div>

              {/* 1. tamanho */}
              <div className="bloco">
                <div className="bloco__cab">
                  <h2>1. Escolha o tamanho</h2>
                  <a href="#medidas">Guia de medidas</a>
                </div>
                <div className="tamanhos">
                  {TAMANHOS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className="tamanho"
                      aria-pressed={tamanho === t}
                      onClick={() => setTamanho(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <p className="estoque">Tamanho {tamanho} disponível para envio imediato</p>
              </div>

              {/* 2. personalização */}
              <div className="bloco">
                <div className="bloco__cab">
                  <h2>2. Personalize seu manto</h2>
                  <span className="extra">+ {brl(PRECO_PERSONALIZACAO)}</span>
                </div>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={personalizar}
                    onChange={(e) => setPersonalizar(e.target.checked)}
                  />
                  <span className="check__caixa"><IconCheck /></span>
                  Adicionar nome e número
                </label>

                {personalizar && (
                  <div className="campos">
                    <div className="campo">
                      <label htmlFor="pers-nome">Nome</label>
                      <input
                        id="pers-nome"
                        value={nome}
                        maxLength={12}
                        placeholder="SEU NOME"
                        onChange={(e) => setNome(e.target.value.toUpperCase())}
                      />
                    </div>
                    <div className="campo">
                      <label htmlFor="pers-numero">Número</label>
                      <input
                        id="pers-numero"
                        value={numero}
                        inputMode="numeric"
                        maxLength={2}
                        placeholder="10"
                        onChange={(e) => setNumero(e.target.value.replace(/\D/g, "").slice(0, 2))}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 3. pagamento */}
              <div className="bloco">
                <div className="bloco__cab"><h2>3. Como prefere pagar?</h2></div>
                <div className="pagamentos" role="radiogroup" aria-label="Forma de pagamento">
                  {PAGAMENTOS.map((p) => (
                    <label className="pagto" key={p.id}>
                      <input
                        type="radio"
                        name="pagamento"
                        checked={pagamento === p.id}
                        onChange={() => setPagamento(p.id)}
                      />
                      <span className="pagto__corpo">
                        <strong>{p.titulo}</strong>
                        <span>{p.detalhe(total)}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 4. frete (visual) */}
              <div className="bloco">
                <div className="bloco__cab"><h2>4. Calcule o frete</h2></div>
                <form className="frete" onSubmit={(e) => e.preventDefault()}>
                  <label className="sr-only" htmlFor="cep">CEP</label>
                  <input
                    id="cep"
                    value={cep}
                    inputMode="numeric"
                    placeholder="00000-000"
                    autoComplete="postal-code"
                    onChange={(e) => setCep(mascaraCep(e.target.value))}
                  />
                  <button type="submit">Calcular</button>
                </form>
                <p className="estoque estoque--neutro">Frete grátis em compras acima de R$ 499</p>
              </div>

              <button type="button" className="comprar" onClick={comprar}>
                <span>{adicionado ? "Adicionada ao carrinho" : "Adicionar ao carrinho"}</span>
                <span>{brl(total)}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Destaques />
    </>
  );
}
