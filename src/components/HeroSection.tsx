'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HeroSection.module.css';

type Lang = 'pt' | 'en' | 'es';

interface HeroProps {
  lang: Lang;
}

const TRANSLATIONS = {
  pt: {
    subtitle: "We are storytellers<br />audiovisual | estratégia | criatividade",
    cta: "AGENDAR TRABALHO"
  },
  en: {
    subtitle: "We are storytellers<br />audiovisual | strategy | creativity",
    cta: "BOOK NOW"
  },
  es: {
    subtitle: "We are storytellers<br />audiovisual | estrategia | creatividad",
    cta: "RESERVAR AHORA"
  }
};

// Array Híbrido: Aponta as duas versões da Direção de Arte
const HERO_IMAGES = [
  { desktop: '/hero/slide-1.webp', mobile: '/hero/mobile_1.webp' },
  { desktop: '/hero/slide-2.webp', mobile: '/hero/mobile_2.webp' },
  { desktop: '/hero/slide-3.webp', mobile: '/hero/mobile_3.webp' },
  { desktop: '/hero/slide-4.webp', mobile: '/hero/mobile_4.webp' }
];

export default function HeroSection({ lang }: HeroProps) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.pt;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detecta o tamanho da tela de forma segura no Next.js
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize(); // Checagem inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play do slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero_container}>
      
      {/* LADO DIREITO/FUNDO: Slider Animado */}
      <motion.div 
        className={styles.slider_side}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.slider_wrapper}>
          <AnimatePresence>
            <motion.img
              key={`${currentIndex}-${isMobile}`}
              // Alterna a imagem baseada no device
              src={isMobile ? HERO_IMAGES[currentIndex].mobile : HERO_IMAGES[currentIndex].desktop}
              alt={`Centelha Portfolio ${currentIndex + 1}`}
              className={styles.slider_image}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.2, ease: [0.165, 0.84, 0.44, 1] }}
            />
          </AnimatePresence>

          {/* Paginação */}
          <div className={styles.pagination}>
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`${styles.dot} ${idx === currentIndex ? styles.dot_active : ''}`}
                aria-label={`Ir para foto ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* LADO ESQUERDO/FRENTE: Copy e CTA */}
      <div className={styles.content_side}>
        <motion.div 
          className={styles.logo_wrapper}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="/centelha-logo.png"
            alt="CentelhaProd Logo"
            width={370}
            height={370}
            priority
            style={{ objectFit: 'contain' }}
            className={styles.logo_img}
          />
        </motion.div>

        <motion.p 
          className={styles.subtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          dangerouslySetInnerHTML={{ __html: t.subtitle }}
        />

        <motion.a
          href="https://wa.me/5585987172446"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta_btn}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          {t.cta}
        </motion.a>
      </div>

    </section>
  );
}
