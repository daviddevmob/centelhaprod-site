"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Instagram, Menu, X } from "lucide-react";
import { motion, Variants } from "framer-motion";
import styles from "./page.module.css";
import dynamic from 'next/dynamic';

const AlbumSection = dynamic(() => import("../components/AlbumSection"));
const InstaGallery = dynamic(() => import("../components/InstaGallery"));
const QuemSomos = dynamic(() => import("../components/QuemSomos"));
const OQueFazemos = dynamic(() => import("../components/ComoTrabalhamos"));
const ComoFazemos = dynamic(() => import("../components/ComoFazemos"));
const PartnerMarquee = dynamic(() => import("../components/PartnerMarquee"));

type Lang = 'pt' | 'en' | 'es';

const TRANSLATIONS = {
  pt: {
    subtitle: "We are storytellers<br />audiovisual | estrategia | criatividade",
    cta_whatsapp: "AGENDAR TRABALHO",
    footer: "© {year} CentelhaProd. Todos os direitos reservados.",
    nav_quem_somos: "QUEM SOMOS",
    nav_o_que_fazemos: "O QUE FAZEMOS",
    nav_como_fazemos: "COMO FAZEMOS"
  },
  en: {
    subtitle: "We are storytellers<br />audiovisual | estrategia | criatividade",
    cta_whatsapp: "BOOK NOW",
    footer: "© {year} CentelhaProd. All rights reserved.",
    nav_quem_somos: "WHO WE ARE",
    nav_o_que_fazemos: "WHAT WE DO",
    nav_como_fazemos: "HOW WE DO IT"
  },
  es: {
    subtitle: "We are storytellers<br />audiovisual | estrategia | criatividade",
    cta_whatsapp: "RESERVAR AHORA",
    footer: "© {year} CentelhaProd. Todos los derechos reservados.",
    nav_quem_somos: "QUIÉNES SOMOS",
    nav_o_que_fazemos: "QUÉ HACEMOS",
    nav_como_fazemos: "CÓMO LO HACEMOS"
  }
};

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<Lang>('pt');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  const t = TRANSLATIONS[lang];
  const year = new Date().getFullYear();

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className={styles.lang_selector}>
          <button onClick={() => setLang('pt')} className={lang === 'pt' ? styles.active_lang : ""}>PT</button>
          <button onClick={() => setLang('en')} className={lang === 'en' ? styles.active_lang : ""}>EN</button>
          <button onClick={() => setLang('es')} className={lang === 'es' ? styles.active_lang : ""}>ES</button>
        </div>

        <nav className={styles.nav_links}>
          <a href="#quem-somos">{t.nav_quem_somos}</a>
          <a href="#o-que-fazemos">{t.nav_o_que_fazemos}</a>
          <a href="#como-fazemos">{t.nav_como_fazemos}</a>
        </nav>

        <div className={styles.header_actions}>
          <a
            href="https://www.instagram.com/centelhaprod/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.header_ig}
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <button className={styles.menu_toggle} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className={styles.mobile_overlay}>
          <button className={styles.overlay_close} onClick={() => setMenuOpen(false)} aria-label="Close">
            <X size={24} />
          </button>
          <nav className={styles.overlay_links}>
            <a href="#quem-somos" onClick={() => setMenuOpen(false)}>{t.nav_quem_somos}</a>
            <a href="#o-que-fazemos" onClick={() => setMenuOpen(false)}>{t.nav_o_que_fazemos}</a>
            <a href="#como-fazemos" onClick={() => setMenuOpen(false)}>{t.nav_como_fazemos}</a>
          </nav>
        </div>
      )}

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
            <source src="/CameraLens.webm" type="video/webm" />
            <source src="/CameraLens.mp4" type="video/mp4" />
          </video>
          <div className={styles.video_overlay} />
        </motion.div>
      )}

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
        <OQueFazemos lang={lang} />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
        style={{ width: "100%" }}
      >
        <ComoFazemos lang={lang} />
      </motion.div>

      <InstaGallery />

      <PartnerMarquee />

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
