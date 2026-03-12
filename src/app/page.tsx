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

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className={styles.main}>
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
        Lançamento em breve
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
        <p className={styles.subtitle}>
          Enquanto nosso novo site não fica pronto, acompanhe <br /> 
          as produções da <strong>CentelhaProd</strong> no Instagram:
        </p>
      </div>

      <a 
        href="https://www.instagram.com/centelhaprod/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className={styles.instagram_link}
      >
        Acessar @centelhaprod
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
        © {new Date().getFullYear()} CentelhaProd
      </footer>
    </main>
  );
}
