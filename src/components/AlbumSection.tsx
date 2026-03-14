"use client";

import Image from "next/image";
import styles from "./AlbumSection.module.css";

const VIDEOS = [
  "/videos/anonyig.io_Instagram__3798545274545762341.mp4",
  "/videos/anonyig.io_Instagram__3799995679019958883.mp4",
  "/videos/anonyig.io_Instagram__3800562704285563614.mp4",
  "/videos/anonyig.io_Instagram__3806468796475626365.mp4",
  "/videos/anonyig.io_Instagram__3810693447146154057.mp4",
  "/videos/anonyig.io_Instagram__3820872703717278101.mp4"
];

const COLLAGES = [
  { type: 'row_2', images: ["/imagens/1a.jpeg", "/imagens/1b.jpeg"] },
  { type: 'row_3', images: ["/imagens/2a.jpeg", "/imagens/2b.jpeg", "/imagens/2c.jpeg"] },
  { type: 'row_4', images: ["/imagens/3a.jpeg", "/imagens/3b.jpeg", "/imagens/3c.jpeg", "/imagens/3d.jpeg"] },
  { type: 'row_2', images: ["/imagens/4a.jpeg", "/imagens/4b.jpeg"] }
];

type Lang = "pt" | "en" | "es";

const TRANSLATIONS = {
  pt: {
    title: "MÍDIAS PRODUZIDAS",
    subtitle: "Confira nossos últimos takes e edições exclusivas"
  },
  en: {
    title: "OUTPUT MEDIA",
    subtitle: "Check out our latest shots and exclusive edits"
  },
  es: {
    title: "MEDIOS PRODUCIDOS",
    subtitle: "Mira nuestras últimas tomas y ediciones exclusivas"
  }
};

export default function AlbumSection({ lang = "pt" }: { lang?: Lang }) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="midias" className={styles.album_container}>
      {/* Title */}
      <div className={styles.section_header}>
        <h2 className={styles.title}>{t.title}</h2>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </div>

      {/* Videos Section */}
      <div className={styles.videos_grid}>
        {VIDEOS.map((src, idx) => (
          <div key={`video-${idx}`} className={styles.video_wrapper}>
            <video 
              src={src} 
              autoPlay 
              muted 
              loop 
              playsInline 
              preload="metadata"
            />
          </div>
        ))}
      </div>

      {/* Collages Section */}
      <div className={styles.collage_section}>
        {COLLAGES.map((collage, cIdx) => (
          <div 
            key={`collage-${cIdx}`} 
            className={styles[`collage_${collage.type}` as keyof typeof styles]}
          >
            {collage.images.map((src, iIdx) => (
              <div key={`img-${cIdx}-${iIdx}`} className={styles.image_wrapper}>
                <Image 
                  src={src} 
                  alt={`Portfolio capture ${cIdx}-${iIdx}`} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
