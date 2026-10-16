import { Link } from "react-router-dom";
import { ROTULOS } from "../data/produtos";
import type { Produto } from "../types";
import { brl } from "../utils";
import ImgSlot from "./ImgSlot";

export default function ProdutoCard({ produto: p }: { produto: Produto }) {
  return (
    <Link to={`/produto/${p.id}`} className="card">
      <div className="card__img">
        {p.selo && <span className="selo">{p.selo}</span>}
        <span className="card__cat">{ROTULOS[p.categoria]}</span>
        <ImgSlot src={p.imagens[0]} alt={`Camisa ${p.nome}`} />
      </div>
      <span className="card__time">{p.time}</span>
      <h3 className="card__nome">{p.nome}</h3>
      <p className="card__preco">
        <strong>{brl(p.preco)}</strong>
        {p.precoAntigo && <s>{brl(p.precoAntigo)}</s>}
      </p>
      <span className="card__parcelas">ou 6x sem juros</span>
    </Link>
  );
}
