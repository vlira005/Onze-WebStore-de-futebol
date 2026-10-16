import type { Categoria, Produto } from "../types";

export const ROTULOS: Record<Categoria, string> = {
  nacionais: "Nacionais",
  internacionais: "Internacionais",
  retro: "Retrô",
};

export const TAMANHOS = ["P", "M", "G", "GG", "XGG"];
export const PRECO_PERSONALIZACAO = 39.9;

// Dados de exemplo. Preencha "imagens" com os caminhos das fotos em /public/camisas.
export const PRODUTOS: Produto[] = [
  {
    id: "brasil-1-2024",
    clube: "Seleção Brasileira",
    time: "Brasil",
    nome: "Brasil I 2026",
    categoria: "nacionais",
    selo: "Mais vendida",
    temporada: "2026",
    preco: 449.9,
    precoAntigo: 499.9,
    nota: 4.8,
    avaliacoes: 312,
    imagens: ["https://acdn-us.mitiendanube.com/stores/003/398/868/products/167bb73b-427d-42a5-ae5a-f3709ec36dfd-037ac6bf35cf35668717805372630586-1024-1024.webp", "https://arquibancadaoficial.com.br/cdn/shop/files/brasilcostastitular_5d92ccd2-bcbf-42f9-92bb-4703390454e0.webp?v=1775491088&width=1946"],
  },
  {
    id: "barcelona-home-24-25",
    clube: "FC Barcelona",
    time: "Barcelona",
    nome: "Barcelona I 24/25",
    categoria: "internacionais",
    selo: "Novo",
    temporada: "24/25",
    preco: 329.9,
    precoAntigo: 399.9,
    nota: 4.9,
    avaliacoes: 128,
    imagens: ["https://images.tcdn.com.br/img/img_prod/1052037/camisa_barcelona_home_2024_25_vinho_5107_1_d341e920ec46adf8221fdfc56de512dc.jpg",
      "https://images.tcdn.com.br/img/img_prod/1052037/camisa_barcelona_home_2024_25_vinho_5107_2_22b07dfe878c8478c8ef07b1d1834f8b.jpg"
    ],
  },
  {
    id: "milan-retro-1988",
    clube: "AC Milan",
    time: "Milan",
    nome: "Milan Retrô 1988",
    categoria: "retro",
    selo: "Edição especial",
    temporada: "1988",
    preco: 389.9,
    precoAntigo: 449.9,
    nota: 4.7,
    avaliacoes: 86,
    imagens: ["https://store.acmilan.com/cdn/shop/files/2134-A13_01_b0713652-cc86-4f4f-88df-b72f5fdac6f7.jpg?v=1748009969&width=835", "https://store.acmilan.com/cdn/shop/files/2134-A13_02_8d7b4dcb-bab7-4c9f-bce7-31717227fd2a_800x.jpg?v=1748009969"  ],
  },
  {
    id: "corinthians-2-2024",
    clube: "SC Corinthians",
    time: "Corinthians",
    nome: "Corinthians II 2026",
    categoria: "nacionais",
    temporada: "2026",
    preco: 359.9,
    precoAntigo: 419.9,
    nota: 4.8,
    avaliacoes: 204,
    imagens: ["https://dasports.com.br/cdn/shop/files/SGL-053A-026_zoom1.webp?v=1778273159" ,"https://dcdn-us.mitiendanube.com/stores/003/790/880/products/camisa-corinthians-ii-2627-com-patch-libertadores-2026-torcedor-masculino-preta-2-564203d238f55e220917800848883899-1024-1024.webp"],
  },
];
