# Maps Musical

Visualize escalas e acordes no braço de qualquer instrumento de corda.

> Visualize scales and chords on the fretboard of any string instrument.

## Sobre o projeto

**Maps Musical** é uma aplicação web interativa para músicos que desejam estudar e visualizar escalas musicais em diferentes instrumentos de corda.

### Funcionalidades

- Visualização de escalas no braço do instrumento em tempo real
- Suporte a 10 escalas: Maior, Menor Natural, Blues, Pentatônicas, Dórica, Mixolídia, Lídia, Frígia e Eólia
- 7 instrumentos: Guitarra, Baixo, Violino, Ukulele, Banjo, Mandolin e Cavaquinho
- Seleção de tom (C até B) com destaque da nota raiz
- Editor livre para marcar notas manualmente no braço
- Afinação personalizável por corda
- Suporte a múltiplos diagramas simultâneos
- Download do diagrama como imagem
- Interface em Português e Inglês
- Design responsivo para desktop e mobile

## Stack

| Tecnologia | Uso |
|---|---|
| [Next.js](https://nextjs.org/) | Framework React (SSG/SSR) |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [MUI](https://mui.com/) | Componentes de UI |
| [Zustand](https://zustand-demo.pmnd.rs/) | Gerenciamento de estado |
| [i18next](https://www.i18next.com/) | Internacionalização (PT-BR / EN) |
| [html2canvas](https://html2canvas.hertzen.com/) | Export de diagrama como imagem |

## Rodando localmente

**Pré-requisitos:** Node.js >= 20.x

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev        # Servidor de desenvolvimento
npm run build      # Build de produção
npm run start      # Iniciar build de produção
npm run lint       # Verificar erros de lint
npm run lint:fix   # Corrigir lint e formatar com Prettier
npm test           # Rodar testes (Jest)
```

## Estrutura do projeto

```
src/
├── pages/
│   ├── index.tsx              # Home — lista de escalas e instrumentos
│   ├── editor/                # Editor interativo do braço
│   ├── scales/[id].tsx        # Detalhe da escala com seletor de tom e instrumento
│   └── instruments/[id].tsx   # Detalhe do instrumento
├── components/
│   ├── guitar/                # Componente do braço interativo
│   ├── config/                # Painel de controles do editor
│   ├── home/                  # Página inicial
│   └── common/                # Componentes reutilizáveis (Card, PageLayout...)
├── store/
│   └── store.ts               # Estado global com Zustand
├── data/
│   ├── scalesData.ts          # Definição das escalas
│   ├── scaleUtils.ts          # Cálculo de notas por escala e tom
│   └── instrumentsData.ts     # Definição dos instrumentos e afinações
├── utils/
│   └── scales.ts              # Mapeamento nota ↔ traste
└── locales/
    └── i18n.ts                # Configuração do i18next
public/
└── locales/
    ├── en/common.json         # Traduções em inglês
    └── pt-BR/common.json      # Traduções em português
```

## Deploy

O projeto está configurado para deploy na [Vercel](https://vercel.com).

**Requisito:** definir Node.js Version como `20.x` ou superior em **Project Settings → General** no dashboard da Vercel.

```bash
# Build de produção local
npm run build
npm run start
```
