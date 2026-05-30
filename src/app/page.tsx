'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Scene from '@/components/canvas/Scene';
import LoadingScreen from '@/components/dom/LoadingScreen';

import ProfileCard from '@/components/dom/ProfileCard';
import MetricsConsole from '@/components/dom/MetricsConsole';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [loadingDone, setLoadingDone] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      lerp: 0.04,
      wheelMultiplier: 0.8,
      smoothWheel: true,
      syncTouch: true,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    lenis.stop();

    if (loadingDone) {
      gsap.fromTo(
        textRef.current,
        { y: 150, opacity: 0, filter: 'blur(10px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 3.5, ease: 'expo.out', delay: 0.5 }
      );

      setTimeout(() => {
        lenis.start();
      }, 4200);
    }

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [loadingDone]);

  return (
    <main className="relative w-full bg-[#050505]">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene loadingDone={loadingDone} />
      </div>

      {/* Main */}
      <div className="relative z-10 min-h-[100dvh] flex flex-col items-center justify-center pointer-events-none px-6">
        {!loadingDone && <LoadingScreen onComplete={() => setLoadingDone(true)} />}
        
        <div ref={textRef} className="text-center pointer-events-auto opacity-0" style={{ visibility: loadingDone ? 'visible' : 'hidden' }}>
          <h1 className="text-4xl md:text-6xl font-bold tracking-widest text-white/90">
            {process.env.NEXT_PUBLIC_HERO_TITLE || "ARQUITETURA VIVA"}
          </h1>
          <p className="mt-4 text-white/60 max-w-lg mx-auto text-sm md:text-base">
            {process.env.NEXT_PUBLIC_HERO_SUB || "A explorar a interseção entre o desenvolvimento de sistemas complexos e inteligência criativa."}
          </p>
        </div>
      </div>

      {/* Frase legal */}
      {/* ADICIONADO min-h e py-24 (espaçamento em cima e em baixo) */}
      <div className="relative z-10 min-h-[100dvh] py-24 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center max-w-2xl px-6 text-white/80 pointer-events-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#818cf8]">
            {process.env.NEXT_PUBLIC_ABYSS_TITLE || "O Abismo do Conhecimento"}
          </h2>
          <p className="text-lg text-white/60 mb-4">
            {process.env.NEXT_PUBLIC_ABYSS_SUB || "Sistemas profundos escondem lógicas belas e inexplicáveis."}
          </p>
          <p className="text-sm text-white/40">
            {process.env.NEXT_PUBLIC_ABYSS_DESC || "Da arquitetura modular da RNMC à estruturação complexa de bancos de dados relacionais e construção de bibliotecas virtuais autônomas."}
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="relative z-10 min-h-[100dvh] py-24 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6">
        <div className="pointer-events-auto w-full flex justify-center">
          <ProfileCard />
        </div>
      </div>

      {/* Por favor me contrate */}
      <div id="section-4" className="relative z-10 min-h-[100dvh] py-24 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6">
        <div className="text-center max-w-3xl bg-black/40 p-6 md:p-10 rounded-3xl border border-white/5 backdrop-blur-sm pointer-events-auto shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            {process.env.NEXT_PUBLIC_PITCH_TITLE || "Por que me contratar para o Estágio de Verão?"}
          </h2>
          <p className="text-base md:text-lg text-white/70 mb-6 leading-relaxed">
            {process.env.NEXT_PUBLIC_PITCH_TEXT || "Eu construo por diversão, mas entrego com rigor..."}
          </p>
          <p className="text-white/50 text-sm italic border-l-2 border-[#818cf8] pl-4 text-left">
            {process.env.NEXT_PUBLIC_PITCH_QUOTE || "\"A experiência provou que consigo canalizar essa paixão...\""}
          </p>
        </div>
      </div>

      {/* SQL Biblioteca */}
      <div id="section-5" className="relative z-10 min-h-[100dvh] py-24 flex flex-col items-center justify-center pointer-events-none px-4 sm:px-6">
        <MetricsConsole />
      </div>

      {/* Contatos */}
      <div id="section-6" className="relative z-10 min-h-[100dvh] py-24 flex flex-col items-center justify-center pointer-events-none px-6">
        <div className="pointer-events-auto text-center w-full max-w-lg">
          <h2 className="text-4xl font-bold mb-2 text-[#818cf8]">
            {process.env.NEXT_PUBLIC_CONTACT_TITLE || "Iniciar Conexão"}
          </h2>
          <p className="text-white/50 mb-10">
            {process.env.NEXT_PUBLIC_CONTACT_SUB || "Os sistemas estão prontos. Vamos construir juntos?"}
          </p>
          
          <div className="flex flex-col gap-4">
            <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "exemplo@email.com"}`} className="bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl text-white transition-all hover:scale-105 hover:border-[#818cf8]/50 flex items-center justify-center gap-3">
              <span className="font-mono text-sm">{'>'} ENVIAR_EMAIL</span>
            </a>
            <a href={process.env.NEXT_PUBLIC_CONTACT_LINKEDIN || "#"} target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-[#0077b5]/20 border border-white/10 p-4 rounded-xl text-white transition-all hover:scale-105 hover:border-[#0077b5] flex items-center justify-center gap-3">
              <span className="font-mono text-sm">{'>'} ACESSAR_LINKEDIN</span>
            </a>
            <a href={process.env.NEXT_PUBLIC_CONTACT_GITHUB || "#"} target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-white/20 border border-white/10 p-4 rounded-xl text-white transition-all hover:scale-105 hover:border-white/50 flex items-center justify-center gap-3">
              <span className="font-mono text-sm">{'>'} ABRIR_GITHUB</span>
            </a>
          </div>
          
          <p className="mt-12 text-[#22c55e] font-mono text-xs animate-pulse">STATUS: AGUARDANDO_PROMPT...</p>
        </div>
      </div>
    </main>
  );
}