<h1 align="center">ONZE — Loja de Camisas de Futebol</h1>

<p align="center">
  Front-end de e-commerce de camisas de futebol<br />
  Feito com <strong>React</strong>, <strong>TypeScript</strong> e <strong>CSS</strong> puro.
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white" />
  <img alt="React Router" src="https://img.shields.io/badge/React_Router-6-ca4245?logo=reactrouter&logoColor=white" />
</p>

---

## Sobre o projeto

A **Onze** é uma loja fictícia de camisas de futebol (nacionais, internacionais e retrô). O projeto reproduz um layout de referência com foco em interface e interação: navegação com menus suspensos, filtro de produtos, página de produto com seleção de tamanho, página de carrinho de compras, personalização de nome e número, formas de pagamento e cálculo de frete (visual).


## Funcionalidades

**Navbar**
- Barra de aviso (frete grátis e desconto no Pix) e links em branco sobre fundo em degradê.
- Menu suspenso ao passar o mouse: **Nacionais** (7 estados brasileiros) e **Internacionais** (7 países). Também abre por foco de teclado.
- Menu hambúrguer em telas pequenas.
- Contador do carrinho, que aumenta ao adicionar um produto.

**Home**
- Faixa de vantagens (frete grátis, compra segura, produtos originais, 5% no Pix).
- Três capas de coleção (Nacionais, Internacionais, Retrô) que filtram a vitrine.
- Vitrine "As mais desejadas" com filtro por categoria.
- Clicar em um anúncio leva à página da camisa específica.

**Página de produto**
- Galeria com miniaturas e imagem principal.
- Seleção de tamanho (P, M, G, GG, XGG).
- **Personalização:** nome e número digitados aparecem como texto sobre a imagem, na parte superior, e somam R$ 39,90 ao total.
- **Pagamento:** Débito, Crédito (até 6x sem juros) e Pix (5% off), com valores recalculados conforme o total.
- **Frete:** campo de CEP com máscara (apenas visual, sem consulta real).
- Botão de favoritar e botão de adicionar ao carrinho.
- Seção "As mais desejadas" ao final da página.

**Página de carrinho**
- Cáculo de subtotal dos itens.
- Informe do restante para oferta de frete grátis.
- Opções de finalizar compra ou continuar comprando.

**Gerais**
- Newsletter apenas visual (o envio é bloqueado).
- Layout responsivo e navegação por teclado nos principais componentes.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| [React 18](https://react.dev/) | Interface em componentes |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [React Router 6](https://reactrouter.com/) | Rotas e navegação |
| [Vite 5](https://vitejs.dev/) | Servidor de desenvolvimento e build |
| CSS puro | Estilos por componente, com variáveis CSS |
| [Google Fonts (Outfit)](https://fonts.google.com/specimen/Outfit) | Tipografia |

## Como executar

**Pré-requisitos:** [Node.js](https://nodejs.org/) 18 ou superior.

```bash
# clonar o repositório
git clone https://github.com/seu-usuario/onze-loja.git
cd onze-loja

# instalar as dependências
npm install

# iniciar em modo de desenvolvimento
npm run dev
```

O site abre em `http://localhost:5173`.

### Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento com recarga automática |
| `npm run build` | Verifica os tipos e gera a versão de produção em `dist/` |
| `npm run preview` | Serve localmente a versão gerada pelo build |

## Rotas

| Rota | Página |
| --- | --- |
| `/` | Home |
| `/?categoria=nacionais`, `internacionais` ou `retro` | Home com a vitrine já filtrada |
| `/produto/:id` | Página do produto (ex.: `/produto/barcelona-home-24-25`) |

## Estrutura de pastas

```
onze-loja/
├── public/
│   └── camisas/              # imagens locais (opcional)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        # barra de aviso, menu e dropdowns
│   │   ├── Layout.tsx        # navbar + conteúdo + newsletter + rodapé
│   │   ├── Destaques.tsx     # vitrine com filtro por categoria
│   │   ├── ProdutoCard.tsx   # card de produto (link para a página)
│   │   ├── ImgSlot.tsx       # espaço reservado para as imagens
│   │   ├── Newsletter.tsx    # cadastro de e-mail (visual)
│   │   ├── Footer.tsx
│   │   ├── Logo.tsx
│   │   └── icons.tsx         # ícones SVG
|   ├── context/
|   |   ├── CarrinhoContext.tsx    # configs da tela de carrinho
│   ├── data/
│   │   ├── produtos.ts       # catálogo de produtos
│   │   └── menu.ts           # estados e países dos dropdowns
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── Produto.tsx
|   |   └── Carrinho.tsx
│   ├── App.tsx               # definição das rotas
│   ├── main.tsx
│   ├── index.css             # variáveis e estilos globais
│   ├── types.ts
│   └── utils.ts              # formatação de moeda e máscara de CEP
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Personalização

### Adicionar as imagens das camisas

Enquanto o campo de imagens estiver vazio, o espaço aparece em branco. Em `src/data/produtos.ts`, preencha `imagens` com URLs de imagens (ou caminhos de `public/camisas/`):

```ts
imagens: [
  "https://exemplo.com/barcelona-frente.png", // card e imagem principal
  "https://exemplo.com/barcelona-costas.png",
  "https://exemplo.com/barcelona-detalhe.png",
  "https://exemplo.com/barcelona-gola.png",
],
```

- O primeiro item é a imagem do card; na página do produto, os itens correspondem às quatro miniaturas.
- Use o link direto da imagem (terminado em `.png`, `.jpg` ou `.webp`). Alguns sites bloqueiam o uso de suas imagens em outros sites.
- As capas das coleções da home ficam no campo `imagem` de `COLECOES`, em `src/pages/Home.tsx`.

### Adicionar um produto

Inclua um novo objeto em `PRODUTOS` (`src/data/produtos.ts`):

```ts
{
  id: "flamengo-1-2026",          // usado na URL: /produto/flamengo-1-2024
  clube: "CR Flamengo",
  time: "Flamengo",
  nome: "Flamengo I 2026",
  categoria: "nacionais",         // "nacionais" | "internacionais" | "retro"
  selo: "Novo",                   // opcional
  temporada: "2026",
  preco: 359.9,
  precoAntigo: 419.9,             // opcional
  nota: 4.8,
  avaliacoes: 150,
  imagens: [],
}
```

### Outros ajustes

- **Estados e países dos menus:** `src/data/menu.ts`.
- **Preço da personalização e tamanhos:** `PRECO_PERSONALIZACAO` e `TAMANHOS` em `src/data/produtos.ts`.
- **Cor do texto de personalização sobre a camisa:** variável `--personalizacao-cor` em `src/pages/Produto.css`.
- **Cores e fonte do site:** variáveis em `:root`, no arquivo `src/index.css`.

## Publicação

O projeto usa `BrowserRouter`, então o servidor de hospedagem precisa redirecionar todas as rotas para o `index.html`. Em plataformas como Vercel e Netlify isso é configurado com uma regra de *rewrite*. No GitHub Pages, é necessário usar `HashRouter` ou um arquivo `404.html` de redirecionamento.


