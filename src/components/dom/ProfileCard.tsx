'use client';
import Image from 'next/image';
import AsciiDonut from './AsciiDonut';

export default function ProfileCard() {
  return (
    <div className="relative p-[1px] bg-gradient-to-b from-white/20 to-white/5 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl w-full max-w-6xl">
      <div className="bg-black/70 p-8 md:p-10 rounded-[23px] flex flex-col lg:flex-row items-center lg:items-stretch gap-10 w-full relative overflow-hidden">
        
        {/* Brilho legal na foto */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.05)_0%,transparent_50%)] pointer-events-none" />

        {/* Minha linda foto */}
        <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-2 border-[#818cf8]/40 shrink-0 shadow-[0_0_30px_rgba(129,140,248,0.15)] flex items-center justify-center bg-black/50 z-10">
          <Image 
            src="/perfil.jpg" 
            alt="Yan Leal" 
            fill 
            className="object-cover"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center text-[10px] text-white/30 text-center px-2 font-mono">
            <span>[FILLER]</span>
            <span>Olá como vai?/</span>
          </div>
        </div>

        {/* Olha para mim, sou profissional */}
        <div className="flex flex-col text-center lg:text-left flex-1 z-10 justify-center">
          <h3 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight drop-shadow-md">
            {process.env.NEXT_PUBLIC_PROFILE_NAME || "Yan Leal"}
          </h3>
          
          <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-5">
            <span className="px-3 py-1 bg-[#818cf8]/10 text-[#818cf8] text-xs font-mono rounded-md border border-[#818cf8]/20 backdrop-blur-sm">
              {process.env.NEXT_PUBLIC_PROFILE_BADGE_1 || "Pesquisador IA"}
            </span>
            <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-mono rounded-md border border-green-500/20 backdrop-blur-sm">
              {process.env.NEXT_PUBLIC_PROFILE_BADGE_2 || "Engenheiro de Sistemas"}
            </span>
            <span className="px-3 py-1 bg-white/5 text-white/60 text-xs font-mono rounded-md border border-white/10 backdrop-blur-sm">
              {process.env.NEXT_PUBLIC_PROFILE_BADGE_3 || "Game Dev"}
            </span>
          </div>

          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 max-w-2xl">
            {process.env.NEXT_PUBLIC_PROFILE_BIO || "Arquiteto da base teórica da RNMC..."}
          </p>

          <div className="text-xs text-[#818cf8] space-y-2 font-mono bg-[#050505]/80 p-4 rounded-xl border border-white/10 mt-auto">
            <p className="flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span> 
              {process.env.NEXT_PUBLIC_PROFILE_LOC || "Base Operacional: Lisboa, Portugal"}
            </p>
            <p className="text-white/50 flex items-center justify-center lg:justify-start gap-2">
              <span className="text-[#818cf8]">{'>'}</span> {process.env.NEXT_PUBLIC_PROFILE_EXTRA || "Participante Especialista: EY AI Challenge"}
            </p>
          </div>
        </div>

        {/* Donouts ASCII */}
        <div className="shrink-0 w-full lg:w-auto flex flex-col items-center justify-center bg-[#050505]/80 rounded-xl border border-white/5 p-6 z-10 hidden md:flex shadow-inner min-w-[280px]">
          <AsciiDonut />
        </div>

      </div>
    </div>
  );
}