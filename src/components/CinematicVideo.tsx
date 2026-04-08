'use client';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';
import styles from './CinematicVideo.module.css';

interface CinematicVideoProps {
  lang: 'pt' | 'en' | 'es';
}

const TRANSLATIONS = {
  pt: {
    title1: "Ação Real",
    desc1: "Capturamos a essência do momento no ritmo em que ele acontece.",
    title2: "Sem Limites",
    desc2: "Da terra ao mar, a Centelha acompanha o seu movimento."
  },
  en: {
    title1: "Real Action",
    desc1: "We capture the essence of the moment in the rhythm it happens.",
    title2: "No Limits",
    desc2: "From land to sea, Centelha follows your movement."
  },
  es: {
    title1: "Acción Real",
    desc1: "Capturamos la esencia del momento al ritmo que sucede.",
    title2: "Sin Límites",
    desc2: "De la terra ao mar, la Centelha acompaña su movimento."
  }
};

// CONFIGURAÇÃO DA SEQUÊNCIA
const FRAME_COUNT = 88;
const PIXELS_PER_FRAME = 30; // Controla a "velocidade" do scroll. 30px de scroll = 1 frame.

export default function CinematicVideo({ lang }: CinematicVideoProps) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.pt;
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [trackHeight, setTrackHeight] = useState('500vh');

  // 1. Pré-carregamento de Imagens (Senior Pattern)
  useEffect(() => {
    const preloadImages = () => {
      const loadedImages: HTMLImageElement[] = [];
      let count = 0;

      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        // Nomenclatura detectada: ezgif-frame-001.jpg
        const frameNum = i.toString().padStart(3, '0');
        img.src = `/video-frames/ezgif-frame-${frameNum}.jpg`;
        img.onload = () => {
          count++;
          setImagesLoaded(count);
          if (count === FRAME_COUNT) {
            // Quando tudo carregar, definimos a altura real baseada na quantidade de frames
            setTrackHeight(`${FRAME_COUNT * PIXELS_PER_FRAME + window.innerHeight}px`);
          }
        };
        loadedImages.push(img);
      }
      imagesRef.current = loadedImages;
    };

    preloadImages();
  }, []);

  // 2. Scroll Progress
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Suavização opcional para o índice do frame (evita trepidação em mouses ruins)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 3. Render Loop (Canvas optimized)
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imagesRef.current[index];

    if (!canvas || !ctx || !img) return;

    // Lógica de aspect-ratio: Cover
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;
    
    const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const newWidth = imgWidth * ratio;
    const newHeight = imgHeight * ratio;
    const x = (canvasWidth - newWidth) / 2;
    const y = (canvasHeight - newHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, newWidth, newHeight);
  };

  // 4. Update Frame on Scroll
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (imagesLoaded === 0) return; // Só bloqueia se não houver NENHUMA imagem
    
    const frameIndex = Math.min(
      FRAME_COUNT - 1,
      Math.floor(latest * FRAME_COUNT)
    );
    
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  // 5. Retina Display Support
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Desenha o frame inicial
      if (imagesLoaded === FRAME_COUNT) renderFrame(0);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [imagesLoaded]);

  // Framer Motion Transforms (Text Layer)
  const opacity1 = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [0, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.1, 0.25, 0.4], [60, 0, -60]);
  const opacity2 = useTransform(scrollYProgress, [0.6, 0.75, 0.9], [0, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.6, 0.75, 0.9], [60, 0, -60]);
  const mockupScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1.1, 1, 1, 0.95]);

  return (
    <section ref={sectionRef} className={styles.section} style={{ height: trackHeight }}>
      <div className={styles.stickyContainer}>
        
        {/* Mockup Central */}
        <motion.div style={{ scale: mockupScale }} className={styles.videoShell}>
           {/* Canvas Renderer */}
           <canvas 
             ref={canvasRef} 
             className={styles.videoElement}
             style={{ 
               width: '100%', 
               height: '100%', 
               objectFit: 'cover',
               opacity: imagesLoaded > 0 ? 1 : 0 // Aparece assim que o primeiro frame existe
             }}
           />
           
           {/* Fundo de fallback sutil enquanto o primeiro frame não chega */}
           {imagesLoaded === 0 && (
             <div className="absolute inset-0 bg-black/20" />
           )}

           <div className={styles.overlay} />
        </motion.div>

        {/* Textos Orbitais */}
        <div className={styles.textLayer}>
          <motion.div style={{ opacity: opacity1, y: y1 }} className={`${styles.textBlock} ${styles.textLeft}`}>
            <h2 className={styles.title}>{t.title1}</h2>
            <p className={styles.subtitle}>{t.desc1}</p>
          </motion.div>

          <motion.div style={{ opacity: opacity2, y: y2 }} className={`${styles.textBlock} ${styles.textRight}`}>
            <h2 className={`${styles.title} ${styles.titleAccent}`}>{t.title2}</h2>
            <p className={styles.subtitle}>{t.desc2}</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
