'use client';
import { useEffect, useState } from 'react';

export default function AsciiDonut() {
  const [frame, setFrame] = useState('');

  useEffect(() => {
    let A = 0, B = 0;
    
    const interval = setInterval(() => {
      const b = [];
      const z = [];
      A += 0.07;
      B += 0.03;
      const cA = Math.cos(A), sA = Math.sin(A),
            cB = Math.cos(B), sB = Math.sin(B);
      
      for (let k = 0; k < 1760; k++) {
        b[k] = k % 80 === 79 ? '\n' : ' ';
        z[k] = 0;
      }
      
      for (let j = 0; j < 6.28; j += 0.07) {
        const ct = Math.cos(j), st = Math.sin(j);
        for (let i = 0; i < 6.28; i += 0.02) {
          const sp = Math.sin(i), cp = Math.cos(i),
                h = ct + 2,
                D = 1 / (sp * h * sA + st * cA + 5),
                t = sp * h * cA - st * sA;
          const x = Math.floor(40 + 30 * D * (cp * h * cB - t * sB));
          const y = Math.floor(12 + 15 * D * (cp * h * sB + t * cB));
          const o = x + 80 * y;
          const N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
          
          if (y > 0 && y < 22 && x > 0 && x < 80 && D > z[o]) {
            z[o] = D;
            b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
          }
        }
      }
      setFrame(b.join(''));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-500">
      <pre className="font-mono text-[8px] sm:text-[10px] leading-none text-[#818cf8] whitespace-pre text-center tracking-tighter">
        {frame}
      </pre>
      <p className="mt-4 text-xs font-mono text-white/40">
        {process.env.NEXT_PUBLIC_DONUT_TEXT || "> rendering_math_torus.exe"}
      </p>
    </div>
  );
}