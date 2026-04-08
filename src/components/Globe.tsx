'use client';
import createGlobe from "cobe";
import { useEffect, useRef } from "react";

// Lista de locais atendidos
const MARKERS = [
  { location: [-3.7319, -38.5267], size: 0.06 }, // Fortaleza
  { location: [-23.5505, -46.6333], size: 0.05 }, // SP
  { location: [38.7223, -9.1393], size: 0.05 }, // Lisboa
  { location: [48.8566, 2.3522], size: 0.05 }, // Paris
  { location: [38.9648, -9.4124], size: 0.04 }, // Ericeira
  { location: [41.3851, 2.1734], size: 0.04 }, // Barcelona
  { location: [-8.3405, 115.0920], size: 0.06 }, // Bali
];

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    let width = 0;

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25, // Inclinação levemente ajustada para ver bem a Europa e o Brasil
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 4, // Globo levemente mais escuro para os pontos brilharem mais
      baseColor: [0.15, 0.15, 0.15], // Cinza escuro fosco
      // A mágica acontece aqui: A cor da sua marca em RGB normalizado (0 a 1)
      // Representa um dourado incandescente (Ex: rgb(255, 184, 0))
      markerColor: [1, 0.72, 0], 
      glowColor: [0.05, 0.05, 0.05],
      
      // Passamos os marcadores nativamente para a biblioteca WebGL
      markers: MARKERS as any,
      
      onRender: (state) => {
        state.width = width * 2;
        state.height = width * 2;
        // Rotação suave (Diminuímos de 0.008 para 0.005 para ficar mais "caro" e contemplativo)
        state.phi = phi;
        phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div style={{ width: '100%', maxWidth: 600, aspectRatio: 1, margin: 'auto', position: 'relative' }}>
      <canvas
        ref={canvasRef}
        style={{ 
          width: "100%", 
          height: "100%", 
          contain: "layout paint size", 
          opacity: 0.9,
          // Transição suave quando o canvas montar
          transition: "opacity 1s ease",
        }}
      />
    </div>
  );
}
