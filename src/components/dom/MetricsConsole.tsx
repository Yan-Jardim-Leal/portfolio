'use client';
import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchDatabaseMetrics } from '@/actions/metrics';

gsap.registerPlugin(ScrollTrigger);

export default function MetricsConsole() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState({ books: 0, comments: 0, users: 0, offers: 0 });
  const [displayVals, setDisplayVals] = useState({ books: 0, comments: 0, users: 0, offers: 0 });

  // Vai buscar os dados reais ao Banco de Dados quando o componente monta
  useEffect(() => {
    fetchDatabaseMetrics().then((data) => setMetrics(data));
  }, []);

  // Anima os números quando o painel entra na tela
  useEffect(() => {
    if (!containerRef.current || metrics.users === 0) return;

    // Objeto temporário para o GSAP animar
    const counter = { books: 0, comments: 0, users: 0, offers: 0 };

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(counter, {
          books: metrics.books,
          comments: metrics.comments,
          users: metrics.users,
          offers: metrics.offers,
          duration: 2.5,
          ease: 'power3.out',
          onUpdate: () => {
            setDisplayVals({
              books: Math.ceil(counter.books),
              comments: Math.ceil(counter.comments),
              users: Math.ceil(counter.users),
              offers: Math.ceil(counter.offers),
            });
          }
        });
      }
    });
  }, [metrics]);

  return (
    <div ref={containerRef} className="w-full max-w-3xl bg-[#050505]/90 border border-[#818cf8]/30 rounded-xl font-mono text-sm shadow-[0_0_40px_rgba(129,140,248,0.1)] backdrop-blur-md overflow-hidden pointer-events-auto">
      
      {/* Cabeçalho do Terminal */}
      <div className="bg-[#818cf8]/10 px-4 py-2 flex items-center gap-2 border-b border-[#818cf8]/20">
        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        <span className="ml-2 text-[#818cf8]/70 text-xs">yan.biblioteca.server.net:27500 — bash</span>
      </div>

{/* Corpo do Terminal */}
      <div className="p-6 md:p-8 flex flex-col gap-6 text-white/80">
        <div>
          <p className="text-[#22c55e] break-all">postgres@yan-server:~$ <span className="text-white">SELECT COUNT(*) FROM public.livro;</span></p>
          <p className="mt-1 text-2xl font-bold text-[#818cf8]">{displayVals.books} <span className="text-sm font-normal text-white/50">{process.env.NEXT_PUBLIC_METRICS_LABEL_1 || "livros transcritos"}</span></p>
        </div>

        <div>
          <p className="text-[#22c55e] break-all">postgres@yan-server:~$ <span className="text-white">SELECT COUNT(*) FROM public.comentario;</span></p>
          <p className="mt-1 text-2xl font-bold text-[#818cf8]">{displayVals.comments} <span className="text-sm font-normal text-white/50">{process.env.NEXT_PUBLIC_METRICS_LABEL_2 || "interações registradas"}</span></p>
        </div>

        <div>
          <p className="text-[#22c55e] break-all">postgres@yan-server:~$ <span className="text-white">SELECT COUNT(*) FROM public.usuario;</span></p>
          <p className="mt-1 text-2xl font-bold text-[#818cf8]">{displayVals.users} <span className="text-sm font-normal text-white/50">{process.env.NEXT_PUBLIC_METRICS_LABEL_3 || "mentes únicas da biblioteca"}</span></p>
        </div>

        <div className="pt-4 border-t border-white/10 mt-2">
          <p className="text-white/50 text-xs mb-2">/* Avaliação de status corporativo */</p>
          <p className="text-[#22c55e]">postgres@yan-server:~$ <span className="text-white">SELECT offers FROM career.internships WHERE year = 2026;</span></p>
          <p className="mt-1 text-4xl font-bold text-red-400">{displayVals.offers} <span className="text-sm font-normal text-white/50">{process.env.NEXT_PUBLIC_METRICS_LABEL_4 || "propostas confirmadas"}</span></p>
        </div>

        <div className="mt-4">
          <a 
            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "email@exemplo.com"}?subject=Proposta de Estágio (UPDATE candidate SET offers = 1)`}
            className="group relative inline-flex items-center justify-center w-full px-6 py-4 bg-[#818cf8]/10 hover:bg-[#818cf8]/20 border border-[#818cf8]/50 rounded text-[#818cf8] transition-all hover:shadow-[0_0_20px_rgba(129,140,248,0.4)]"
          >
            <span className="font-bold tracking-wider">{process.env.NEXT_PUBLIC_METRICS_CTA || "> UPDATE candidate SET offers = 1;"}</span>
            <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity">EXECUTAR ↵</span>
          </a>
        </div>
      </div>
    </div>
  );
}