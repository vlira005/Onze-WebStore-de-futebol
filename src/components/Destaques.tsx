import { useEffect, useState } from "react";
import { PRODUTOS } from "../data/produtos";
import type { Categoria } from "../types";
import ProdutoCard from "./ProdutoCard";
import "./Destaques.css";

export type Filtro = "todos" | Categoria;

const FILTROS: { id: Filtro; rotulo: string }[] = [
  { id: "todos", rotulo: "Todos" },
  { id: "nacionais", rotulo: "Nacionais" },
  { id: "internacionais", rotulo: "Internacionais" },
  { id: "retro", rotulo: "Retrô" },
];

export default function Destaques({ inicial = "todos" }: { inicial?: Filtro }) {
  const [filtro, setFiltro] = useState<Filtro>(inicial);
  useEffect(() => {
    setFiltro(inicial);
  }, [inicial]);

  const lista = filtro === "todos" ? PRODUTOS : PRODUTOS.filter((p) => p.categoria === filtro);

  return (
    <section className="destaques" id="vestiario">
      <div className="container">
        <header className="secao__cab">
          <div>
            <span className="eyebrow">Seleção do vestiário</span>
            <h2 className="titulo-secao">As mais desejadas</h2>
          </div>
          <div className="filtros" role="group" aria-label="Filtrar por categoria">
            {FILTROS.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filtro === f.id}
                onClick={() => setFiltro(f.id)}
              >
                {f.rotulo}
              </button>
            ))}
          </div>
        </header>
        <div className="produtos__grade">
          {lista.map((p) => (
            <ProdutoCard key={p.id} produto={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
