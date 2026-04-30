'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';
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

interface HeroSlide {
  _id: string;
  desktopImage: any;
  mobileImage: any;
  isFallback?: boolean;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  { _id: 'f1', desktopImage: '/hero/slide-1.webp', mobileImage: '/hero/mobile_1.webp', isFallback: true },
  { _id: 'f2', desktopImage: '/hero/slide-2.webp', mobileImage: '/hero/mobile_2.webp', isFallback: true },
  { _id: 'f3', desktopImage: '/hero/slide-3.webp', mobileImage: '/hero/mobile_3.webp', isFallback: true },
  { _id: 'f4', desktopImage: '/hero/slide-4.webp', mobileImage: '/hero/mobile_4.webp', isFallback: true },
];

const SLIDES_QUERY = `*[_type == "heroSlide"] | order(_createdAt asc)`;

export default function HeroSection({ lang }: HeroProps) {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.pt;
  const [sanitySlides, setSanitySlides] = useState<HeroSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  // Determina quais slides usar
  const activeSlides = (sanitySlides.length > 0) ? sanitySlides : DEFAULT_SLIDES;

  // Busca slides do Sanity
  useEffect(() => {
    async function fetchSlides() {
      try {
        const data = await client.fetch(SLIDES_QUERY);
        if (data && data.length > 0) {
          setSanitySlides(data);
        }
      } catch (error) {
        console.error('Error fetching hero slides:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSlides();
  }, []);

  // Detecta o tamanho da tela de forma segura no Next.js
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize(); // Checagem inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play do slider
  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  // Helper para resolver a URL da imagem (Sanity ou Local)
  const getImageUrl = (slide: HeroSlide, mobile: boolean) => {
    const image = mobile ? slide.mobileImage : slide.desktopImage;
    if (slide.isFallback) {
      return image; // É o path local direto
    }
    try {
      return urlFor(image).width(mobile ? 800 : 1920).quality(90).url();
    } catch (e) {
      // Caso o slide do Sanity exista mas a imagem falhe, usa o fallback correspondente
      const fallbackIdx = activeSlides.indexOf(slide) % DEFAULT_SLIDES.length;
      return mobile ? DEFAULT_SLIDES[fallbackIdx].mobileImage : DEFAULT_SLIDES[fallbackIdx].desktopImage;
    }
  };

  if (loading && sanitySlides.length === 0) {
    // Splash screen minimalista enquanto decide se usa Sanity ou Fallback
    return <section className={styles.hero_container} style={{ background: '#000' }} />;
  }

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
          <AnimatePresence mode="wait">
            <motion.img
              key={`${currentIndex}-${isMobile}-${activeSlides[currentIndex]?._id}`}
              src={getImageUrl(activeSlides[currentIndex], isMobile)}
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
            {activeSlides.map((_, idx) => (
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
