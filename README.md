# 3D Interactive Portfolio

Um portfólio construído para ser uma experiências 3D conectado em tempo real a um banco de dados PostgreSQL para exibir métricas reais dos seus projetos.

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)
![GSAP](https://img.shields.io/badge/GSAP-Animations-green?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=for-the-badge&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Live_Metrics-blue?style=for-the-badge&logo=postgresql)

## Funcionalidades

- **Interatividade em 3D**: Experiências simples em WebGL usando React Three Fiber que acompanham o movimento do mouse e o scroll.
- **Navegação Fluida**: Integração de Lenis com GSAP ScrollTrigger para uma rolagem mais suave e controlada.
- **Exibição de Dados Real-time**: Uso de Server Actions para buscar e exibir estatísticas básicas do banco de dados (como contadores ou métricas de uso).
- **Configuração via Variáveis de Ambiente**: O conteúdo é gerenciado por um arquivo `.env`, facilitando a adaptação do projeto para diferentes temas ou nichos sem precisar mexer no código core.

## Instalação:

1. Clone o repositório:
```bash
git clone [https://github.com/seu-usuario/portfolio-rnmc.git](https://github.com/seu-usuario/portfolio-rnmc.git)
cd portfolio-rnmc

npm install
npm run dev
```