import { Link, useSearchParams } from "react-router-dom";
import Destaques, { type Filtro } from "../components/Destaques";
import ImgSlot from "../components/ImgSlot";
import { IconArrow, IconCheck, IconPercent, IconShield, IconTruck } from "../components/icons";
import "./Home.css";

const BENEFICIOS = [
  { Icone: IconTruck, titulo: "Frete grátis", texto: "acima de R$ 499" },
  { Icone: IconShield, titulo: "Compra segura", texto: "pagamento protegido" },
  { Icone: IconCheck, titulo: "Produtos originais", texto: "autenticidade garantida" },
  { Icone: IconPercent, titulo: "5% de desconto", texto: "pagando no Pix" },
];

// "imagem": caminho da imagem da coleção (ex.: "/camisas/capa-nacionais.png")
const COLECOES = [
  { n: "01", categoria: "nacionais", tema: "lavanda", nome: "Nacionais", imagem: "https://fanaticotorcedor.net/cdn/shop/files/0671051b-removebg-preview_500x.png?v=1777916602" },
  { n: "02", categoria: "internacionais", tema: "noite", nome: "Internacionais", imagem: "https://lojaole.com.br/wp-content/uploads/2025/02/27-1.png" },
  { n: "03", categoria: "retro", tema: "areia", nome: "Retrô", imagem: "https://acdn-us.mitiendanube.com/stores/003/059/842/products/holanda_manga_longa_laranja_home_1980-removebg-preview-844d22f05dcf5f3fb217768188151196-640-0.webp" },
];

export default function Home() {
  const [params] = useSearchParams();
  const cat = params.get("categoria");
  const inicial: Filtro =
    cat === "nacionais" || cat === "internacionais" || cat === "retro" ? cat : "todos";

  return (
    <>
      <section className="beneficios" aria-label="Vantagens">
        <ul className="container beneficios__lista">
          {BENEFICIOS.map(({ Icone, titulo, texto }) => (
            <li className="beneficio" key={titulo}>
              <Icone />
              <div>
                <strong>{titulo}</strong>
                <span>{texto}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="colecoes">
        <div className="container">
          <header className="secao__cab">
            <div>
              <span className="eyebrow">Encontre seu time</span>
              <h1 className="titulo-secao">Jogue no seu estilo</h1>
            </div>
            <p className="secao__sub">Dos clássicos eternos aos lançamentos da temporada.</p>
          </header>
          <div className="colecoes__grade">
            {COLECOES.map((c) => (
              <Link
                key={c.n}
                to={`/?categoria=${c.categoria}#vestiario`}
                className={`colecao colecao--${c.tema}`}
                aria-label={`Ver coleção ${c.nome}`}
              >
                <span className="colecao__n">{c.n}</span>
                <div className="colecao__img">
                  <ImgSlot src={c.imagem || undefined} alt={`Coleção ${c.nome}` } />
                  <span className="colecao__nome">{c.nome}</span>
                </div>
                <span className="colecao__cta">
                  Ver coleção <IconArrow width={16} height={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Destaques inicial={inicial} />
    </>
  );
}
