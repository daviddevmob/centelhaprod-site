"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import styles from "./page.module.css";

const POSTS = [
  "https://www.instagram.com/p/DVRMSPDDrBJ/",
  "https://www.instagram.com/p/DUGd3rtDgGV/",
  "https://www.instagram.com/p/DUGdlQBDqye/",
  "https://www.instagram.com/p/DTTSzPuidN9/"
];

type Lang = 'pt' | 'en' | 'es';

const TRANSLATIONS = {
  pt: {
    badge: "Em Breve",
    subtitle: "Enquanto nosso novo site está sendo preparado, acompanhe as produções da <strong>CentelhaProd</strong> no Instagram:",
    cta: "Acessar @centelhaprod",
    footer: "© {year} CentelhaProd. Todos os direitos reservados."
  },
  en: {
    badge: "Coming Soon",
    subtitle: "While our new website is being prepared, follow <strong>CentelhaProd</strong>'s latest productions on Instagram:",
    cta: "Follow @centelhaprod",
    footer: "© {year} CentelhaProd. All rights reserved."
  },
  es: {
    badge: "Muy Pronto",
    subtitle: "Mientras preparamos nuestro nuevo sitio web, sigue as producciones de <strong>CentelhaProd</strong> en Instagram:",
    cta: "Seguir @centelhaprod",
    footer: "© {year} CentelhaProd. Todos los derechos reservados."
  }
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<Lang>('pt');

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = TRANSLATIONS[lang];
  const year = new Date().getFullYear();

  return (
    <main className={styles.main}>
      <div className={styles.lang_selector}>
        <button onClick={() => setLang('pt')} className={lang === 'pt' ? styles.active_lang : ""}>PT</button>
        <button onClick={() => setLang('en')} className={lang === 'en' ? styles.active_lang : ""}>EN</button>
        <button onClick={() => setLang('es')} className={lang === 'es' ? styles.active_lang : ""}>ES</button>
      </div>

      {mounted && (
        <>
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
        </>
      )}

      <div className={styles.status_badge}>
        {t.badge}
      </div>

      <div className={styles.logo_container}>
        <Image 
          src="/centelha-logo.png" 
          alt="CentelhaProd Logo" 
          width={180} 
          height={180} 
          priority
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className={styles.copy_container}>
        <p 
          className={styles.subtitle} 
          dangerouslySetInnerHTML={{ __html: t.subtitle }} 
        />
      </div>

      <a 
        href="https://www.instagram.com/centelhaprod/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.instagram_link}
      >
        {t.cta}
      </a>

      <div className={styles.feed_container}>
        {mounted && POSTS.map((url, index) => (
          <div key={index} className={styles.instagram_card}>
            <div className={styles.embed_wrapper}>
              <InstagramEmbed url={url} width="100%" />
            </div>
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        {t.footer.replace('{year}', year.toString())}
      </footer>
    </main>
  );
}
