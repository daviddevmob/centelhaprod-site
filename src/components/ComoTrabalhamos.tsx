import { motion } from "framer-motion";
import styles from "./ComoTrabalhamos.module.css";

type Lang = "pt" | "en" | "es";

const TRANSLATIONS = {
  pt: [
    { title: "Cobertura Real Time", desc: "Cobertura dinâmica de eventos com produção de conteúdo em tempo real. Stories, vídeos e fotos que acompanham o ritmo do momento, gerando presença digital imediata e engajamento enquanto tudo acontece." },
    { title: "Produção Audiovisual", desc: "Criação de vídeos institucionais, comerciais e conteúdos criativos e de alto padrão. Do roteiro à entrega final, desenvolvemos materiais que posicionam marcas e geram valor." },
    { title: "Fotografia", desc: "Produção fotográfica com direção estética e olhar estratégico. Imagens que traduzem identidade, elevam o posicionamento e constroem uma presença visual consistente e sofisticada." }
  ],
  en: [
    { title: "Real Time Coverage", desc: "Dynamic event coverage with real-time content production. Stories, videos, and photos that match the pace of the moment, generating immediate digital presence and engagement while it all happens." },
    { title: "Audiovisual Production", desc: "Creation of institutional videos, commercials, and high-end creative content. From script to final delivery, we develop materials that position brands and generate value." },
    { title: "Photography", desc: "Photography production with aesthetic direction and strategic vision. Images that translate identity, elevate positioning, and build a consistent and sophisticated visual presence." }
  ],
  es: [
    { title: "Cobertura Real Time", desc: "Cobertura dinámica de eventos con producción de contenido en tiempo real. Stories, videos y fotos que acompañan el ritmo del momento, generando presencia digital inmediata y engagement." },
    { title: "Producción Audiovisual", desc: "Creación de videos institucionales, comerciales y contenidos creativos de alto nivel. Del guion a la entrega final, desarrollamos materiales que posicionan marcas y generan valor." },
    { title: "Fotografía", desc: "Producción fotográfica con dirección estética y mirada estratégica. Imágenes que traducen identidad, elevan el posicionamiento y construyen una presencia visual consistente y sofisticada." }
  ]
};

export default function OQueFazemos({ lang = "pt" }: { lang?: Lang }) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="o-que-fazemos" className={styles.section}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.title}>O QUE FAZEMOS</h2>
        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        />
      </motion.div>

      <div className={styles.items}>
        {t.map((item, idx) => (
          <NummberedBlock
            key={`${lang}-${idx}`}
            index={idx}
            title={item.title}
            desc={item.desc}
          />
        ))}
      </div>
    </section>
  );
}

function NummberedBlock({ index, title, desc }: { index: number; title: string; desc: string }) {
  return (
    <motion.div
      className={styles.item}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
    >
      <span className={styles.number}>
        {String(index + 1).padStart(2, "0")}.
      </span>
      <div className={styles.content_block}>
        <h3 className={styles.item_title}>{title}</h3>
        <p className={styles.item_desc}>{desc}</p>
      </div>
    </motion.div>
  );
}
