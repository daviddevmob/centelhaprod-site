"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Instagram } from "lucide-react";
import { motion, Variants } from "framer-motion";
import styles from "./page.module.css";
import dynamic from 'next/dynamic';

const AlbumSection = dynamic(() => import("../components/AlbumSection"));
const QuemSomos = dynamic(() => import("../components/QuemSomos"));
const ComoTrabalhamos = dynamic(() => import("../components/ComoTrabalhamos"));

type Lang = 'pt' | 'en' | 'es';

const TRANSLATIONS = {
  pt: {
    subtitle: "We are Storytellers 🎥 Audiovisual | Estratégia | Criatividade",
    cta_whatsapp: "AGENDAR TRABALHO",
    footer: "© {year} CentelhaProd. Todos os direitos reservados.",
    nav_quem_somos: "Quem Somos",
    nav_como_trabalhamos: "Como Trabalhamos",
    nav_midias: "Mídias"
  },
  en: {
    subtitle: "We are Storytellers 🎥 Audiovisual | Strategy | Creativity",
    cta_whatsapp: "BOOK NOW",
    footer: "© {year} CentelhaProd. All rights reserved.",
    nav_quem_somos: "Who We Are",
    nav_como_trabalhamos: "How We Work",
    nav_midias: "Media"
  },
  es: {
    subtitle: "We are Storytellers 🎥 Audiovisual | Estrategia | Creatividad",
    cta_whatsapp: "RESERVAR AHORA",
    footer: "© {year} CentelhaProd. Todos los derechos reservados.",
    nav_quem_somos: "Quiénes Somos",
    nav_como_trabalhamos: "Cómo Trabajamos",
    nav_midias: "Medios"
  }
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<Lang>('pt');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  const t = TRANSLATIONS[lang];
  const year = new Date().getFullYear();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.header_left}>
          <div className={styles.lang_selector}>
            <button onClick={() => setLang('pt')} className={lang === 'pt' ? styles.active_lang : ""}>PT</button>
            <button onClick={() => setLang('en')} className={lang === 'en' ? styles.active_lang : ""}>EN</button>
            <button onClick={() => setLang('es')} className={lang === 'es' ? styles.active_lang : ""}>ES</button>
          </div>
          
        <nav className={styles.nav_links}>
            <a href="#quem-somos">{t.nav_quem_somos}</a>
            <a href="#como-trabalhamos">{t.nav_como_trabalhamos}</a>
            <a href="#midias">{t.nav_midias}</a>
          </nav>
        </div>

        <a 
          href="https://www.instagram.com/centelhaprod/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.header_ig}
          aria-label="Instagram"
        >
          <Instagram size={20} />
        </a>
      </header>

      {mounted && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="auto"
            className={styles.video_bg}
          >
            <source src="/CameraLens.mp4" type="video/mp4" />
          </video>
          <div className={styles.video_overlay} />
        </motion.div>
      )}

      {/* Removed status badge */}

      <motion.div 
        className={styles.logo_container}
        variants={fadeUpVariant}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <Image 
          src="/centelha-logo.png" 
          alt="CentelhaProd Logo" 
          width={280} 
          height={280} 
          priority
          style={{ objectFit: 'contain' }}
        />
      </motion.div>

      <motion.div 
        className={styles.copy_container}
        variants={fadeUpVariant}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        <p 
          className={styles.subtitle} 
          dangerouslySetInnerHTML={{ __html: t.subtitle }} 
        />
      </motion.div>

      <motion.a 
        href="https://wa.me/5585987172446" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.whatsapp_btn}
        variants={fadeUpVariant}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        {t.cta_whatsapp}
      </motion.a>

      <QuemSomos lang={lang} />
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        style={{ width: "100%" }}
      >
        <ComoTrabalhamos lang={lang} />
      </motion.div>
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        style={{ width: "100%" }}
      >
        <AlbumSection lang={lang} />
      </motion.div>

      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        style={{ width: "100%", display: "flex", justifyContent: "center", margin: "40px 0" }}
      >
        <motion.a 
          href="https://wa.me/5585987172446" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.whatsapp_btn}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          {t.cta_whatsapp}
        </motion.a>
      </motion.div>

      <footer className={styles.footer}>
        <a 
          href="https://www.instagram.com/centelhaprod/" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.footer_ig}
          aria-label="Instagram"
        >
          <Instagram size={24} />
        </a>
        <p>{t.footer.replace('{year}', year.toString())}</p>
      </footer>
    </main>
  );
}
