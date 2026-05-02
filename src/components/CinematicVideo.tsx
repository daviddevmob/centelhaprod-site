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
    desc1Before: "Capturamos a ",
    desc1Highlight: "essência do momento",
    desc1After: " no ritmo em que ele acontece.",
    title2: "Sem Limites",
    desc2Before: "Da terra ao mar, a ",
    desc2Highlight: "Centelha",
    desc2After: " acompanha o seu movimento."
  },
  en: {
    title1: "Real Action",
    desc1Before: "We capture the ",
    desc1Highlight: "essence of the moment",
    desc1After: " in the rhythm it happens.",
    title2: "No Limits",
    desc2Before: "From land to sea, ",
    desc2Highlight: "Centelha",
    desc2After: " follows your movement."
  },
  es: {
    title1: "Acción Real",
    desc1Before: "Capturamos la ",
    desc1Highlight: "esencia del momento",
    desc1After: " al ritmo que sucede.",
    title2: "Sin Límites",
    desc2Before: "De la terra ao mar, la ",
    desc2Highlight: "Centelha",
    desc2After: " acompaña su movimento."
  }
};

// CONFIGURAÇÃO DA SEQUÊNCIA
const FRAME_COUNT = 88;
const PIXELS_PER_FRAME = 50; // Controla a "velocidade" do scroll. 50px de scroll = 1 frame.

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
          // O trackHeight agora é definido no useEffect de resize/load
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

    if (!canvas || !ctx || !img) {
      console.warn('RenderFrame: missing dependencies', { canvas: !!canvas, ctx: !!ctx, img: !!img, index });
      return;
    }

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

  // 5. Retina Display Support & Resize handling
  useEffect(() => {
    // Só inicializa o redimensionamento e o cálculo de altura após o carregamento inicial
    if (imagesLoaded === 0) return;

    const updateSizes = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        // Renderiza o frame correto baseado no progresso atual do scroll
        const currentProgress = scrollYProgress.get();
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.floor(currentProgress * (FRAME_COUNT - 1))
        );
        renderFrame(frameIndex);
      }
      
      // Ajusta a altura da seção baseado na janela atual
      // Apenas atualiza se já carregou uma quantidade considerável para evitar flickering
      if (imagesLoaded >= FRAME_COUNT / 2) {
        setTrackHeight(`${FRAME_COUNT * PIXELS_PER_FRAME + window.innerHeight}px`);
      }
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, [imagesLoaded === FRAME_COUNT]); // Ativa definitivamente quando termina de carregar

  // Framer Motion Transforms (Text Layer)
  // 1. Primeiro bloco aparece após o frame iniciar o movimento (0.15)
  // 2. Segundo bloco aparece logo após o primeiro desaparecer
  // 3. Ambos somem antes do final da seção (0.85)
  const opacity1 = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.5], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0.15, 0.25, 0.4, 0.5], [60, 0, 0, -60]);

  const opacity2 = useTransform(scrollYProgress, [0.55, 0.65, 0.8, 0.85], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.55, 0.65, 0.8, 0.85], [60, 0, 0, -60]);

  const mockupScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1.1, 1, 1, 0.9]);

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
            <p className={styles.subtitle}>
              {t.desc1Before}<span className={styles.highlight}>{t.desc1Highlight}</span>{t.desc1After}
            </p>
          </motion.div>

          <motion.div style={{ opacity: opacity2, y: y2 }} className={`${styles.textBlock} ${styles.textRight}`}>
            <h2 className={`${styles.title} ${styles.titleAccent}`}>{t.title2}</h2>
            <p className={styles.subtitle}>
              {t.desc2Before}<span className={styles.highlight}>{t.desc2Highlight}</span>{t.desc2After}
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
