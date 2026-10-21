import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRECO_PERSONALIZACAO, PRODUTOS } from "../data/produtos";
import type { ItemCarrinho, NovoItem, Produto } from "../types";

const STORAGE_KEY = "onze:carrinho";

export const produtoDoItem = (item: ItemCarrinho): Produto | undefined =>
  PRODUTOS.find((p) => p.id === item.produtoId);

/** Preço de uma unidade: camisa + personalização (se houver). */
export const precoUnitario = (item: ItemCarrinho): number => {
  const produto = produtoDoItem(item);
  if (!produto) return 0;
  return produto.preco + (item.personalizacao ? PRECO_PERSONALIZACAO : 0);
};

const gerarChave = (i: NovoItem) =>
  [i.produtoId, i.tamanho, i.personalizacao ? `${i.personalizacao.nome}#${i.personalizacao.numero}` : ""].join("|");

function carregar(): ItemCarrinho[] {
  try {
    const bruto = localStorage.getItem(STORAGE_KEY);
    const lista: unknown = bruto ? JSON.parse(bruto) : [];
    if (!Array.isArray(lista)) return [];
    return (lista as ItemCarrinho[]).filter(
      (i) => i && i.quantidade > 0 && PRODUTOS.some((p) => p.id === i.produtoId)
    );
  } catch {
    return [];
  }
}

interface CarrinhoCtx {
  itens: ItemCarrinho[];
  quantidadeTotal: number;
  total: number;
  adicionar: (item: NovoItem) => void;
  alterarQuantidade: (chave: string, delta: number) => void;
  remover: (chave: string) => void;
}

const Contexto = createContext<CarrinhoCtx | null>(null);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>(carregar);

  // mantém o carrinho ao recarregar a página
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
    } catch {
      /* armazenamento indisponível: segue sem salvar */
    }
  }, [itens]);

  const adicionar = useCallback((novo: NovoItem) => {
    const chave = gerarChave(novo);
    setItens((atual) =>
      atual.some((i) => i.chave === chave)
        ? atual.map((i) => (i.chave === chave ? { ...i, quantidade: i.quantidade + 1 } : i))
        : [...atual, { ...novo, chave, quantidade: 1 }]
    );
  }, []);

  const alterarQuantidade = useCallback((chave: string, delta: number) => {
    setItens((atual) =>
      atual.map((i) => (i.chave === chave ? { ...i, quantidade: Math.max(1, i.quantidade + delta) } : i))
    );
  }, []);

  const remover = useCallback((chave: string) => {
    setItens((atual) => atual.filter((i) => i.chave !== chave));
  }, []);

  // total e quantidade são recalculados sempre que a lista muda
  const valor = useMemo<CarrinhoCtx>(
    () => ({
      itens,
      quantidadeTotal: itens.reduce((soma, i) => soma + i.quantidade, 0),
      total: itens.reduce((soma, i) => soma + precoUnitario(i) * i.quantidade, 0),
      adicionar,
      alterarQuantidade,
      remover,
    }),
    [itens, adicionar, alterarQuantidade, remover]
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useCarrinho() {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("useCarrinho deve ser usado dentro de <CarrinhoProvider>");
  return ctx;
}
