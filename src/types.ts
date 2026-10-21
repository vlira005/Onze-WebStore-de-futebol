export type Categoria = "nacionais" | "internacionais" | "retro";

export interface Produto {
  id: string;
  clube: string;
  time: string;
  nome: string;
  categoria: Categoria;
  selo?: string;
  temporada: string;
  preco: number;
  precoAntigo?: number;
  nota: number;
  avaliacoes: number;
  /** Caminhos das imagens (ex.: "/camisas/barcelona-frente.png"). Vazio = espaço em branco. */
  imagens: string[];
}

export interface ItemCarrinho {
  chave: string;
  produtoId: string;
  tamanho: string;
  personalizacao?: { nome: string; numero: string };
  quantidade: number;
}

export type NovoItem = Omit<ItemCarrinho, "chave" | "quantidade">;