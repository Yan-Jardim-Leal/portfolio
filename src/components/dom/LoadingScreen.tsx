'use client';
import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 2500);
    const completeTimer = setTimeout(() => onComplete(), 5500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-green-400 font-mono text-sm pointer-events-auto transition-opacity duration-3000 ease-in-out ${fading ? 'opacity-0' : 'opacity-100'}`}
    >
        <div className="w-full max-w-lg p-6">
            <p>{process.env.NEXT_PUBLIC_LOAD_1 || "> A iniciar terminal de sistema..."}</p>
            <p>{process.env.NEXT_PUBLIC_LOAD_2 || "> A transferir 6GB de dependências LaTeX offline... [FALHA: Tempo excedido]"}</p>
            <p>{process.env.NEXT_PUBLIC_LOAD_3 || "> A ignorar protocolo. A carregar ambiente de emergência..."}</p>
            <p className="mt-4 animate-pulse">{process.env.NEXT_PUBLIC_LOAD_4 || "> A inicializar biomas emocionais da RNMC..."}</p>
        </div>
    </div>
  );
}