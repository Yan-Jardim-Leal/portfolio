# 3D Interactive Portfolio

Um portfólio construído para ser uma experiências 3D conectado em tempo real a um banco de dados PostgreSQL para exibir métricas reais dos seus projetos.

![Next.js](https://img.shields.io/badge/Next.js-15+-black?style=for-the-badge&logo=next.js)
![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)
![GSAP](https://img.shields.io/badge/GSAP-Animations-green?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=for-the-badge&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Live_Metrics-blue?style=for-the-badge&logo=postgresql)

## Funcionalidades

- **Mundo 3D Dinâmico**: Ambientes WebGL (React Three Fiber) que reagem ao scroll e ao mouse do usuário.
- **Scroll Inercial Amanteigado**: Implementação customizada do `Lenis` aliada ao `ScrollTrigger` do GSAP para viagens cinematográficas pela página.
- **Painel SQL ao Vivo**: Uma rota de servidor segura (`Server Actions`) que se conecta ao seu banco de dados e traz estatísticas reais (ex: número de utilizadores do seu jogo, livros escritos, etc).
- **100% Customizável por `.env`**: A estrutura de texto inteira do site está desacoplada. Você pode transformar este projeto num portfólio para qualquer área de engenharia apenas alterando as variáveis de ambiente.

## 🛠️ Instalação Local

1. Clone o repositório:
```bash
git clone [https://github.com/seu-usuario/portfolio-rnmc.git](https://github.com/seu-usuario/portfolio-rnmc.git)
cd portfolio-rnmc