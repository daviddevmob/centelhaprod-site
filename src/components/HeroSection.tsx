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

const HERO_IMAGES = [
  '/hero/slide-1.webp',
  '/hero/slide-2.webp',
  '/hero/slide-3.webp',
  '/hero/slide-4.webp'
];

export default function HeroSection({ lang }: HeroProps) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.pt;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero_container}>
      
      {/* LADO DIREITO/FUNDO: O Slider vem primeiro na DOM para o mobile o tratar como background */}
      <motion.div 
        className={styles.slider_side}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={styles.slider_wrapper}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={HERO_IMAGES[currentIndex]}
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
