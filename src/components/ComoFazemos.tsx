import { motion } from "framer-motion";
import styles from "./ComoFazemos.module.css";

type Lang = "pt" | "en" | "es";

const TRANSLATIONS = {
  pt: [
    { title: "Equipe Completa", desc: "Acompanhamos seu evento com um time especializado: videomakers, editores e diretores atentos a cada detalhe." },
    { title: "Captação Dinâmica", desc: "Registramos a essência, a luz e a alegria do momento, incluindo coberturas aéreas (drone) e bastidores." },
    { title: "Pós-Produção", desc: "Edição ágil e narrativa autêntica para entregar o melhor material bruto e decupado." },
    { title: "Entrega de Valor", desc: "Produzimos Aftermovies institucionais e Reels dinâmicos focados em engajar suas redes sociais." }
  ],
  en: [
    { title: "Full Team", desc: "We cover your event with a specialized team: videomakers, editors, and directors attentive to every detail." },
    { title: "Dynamic Capture", desc: "We capture the essence, light, and joy of the moment, including aerial (drone) and behind-the-scenes footage." },
    { title: "Post-Production", desc: "Agile editing and authentic storytelling to deliver the best raw and selected material." },
    { title: "Value Delivery", desc: "We produce institutional Aftermovies and dynamic Reels focused on engaging your social media." }
  ],
  es: [
    { title: "Equipo Completo", desc: "Acompañamos tu evento con un equipo especializado: videógrafos, editores y directores atentos a cada detalle." },
    { title: "Captación Dinámica", desc: "Registramos la esencia, la luz y la alegría del momento, incluyendo coberturas aéreas (dron) y detrás de escena." },
    { title: "Post-Producción", desc: "Edición ágil y narrativa auténtica para entregar el mejor material en bruto y seleccionado." },
    { title: "Entrega de Valor", desc: "Producimos Aftermovies institucionales y Reels dinámicos enfocados en generar interacción en tus redes sociales." }
  ]
};

export default function ComoFazemos({ lang = "pt" }: { lang?: Lang }) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="como-fazemos" className={styles.section}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.title}>COMO FAZEMOS</h2>
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
          <NumberedBlock
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

function NumberedBlock({ index, title, desc }: { index: number; title: string; desc: string }) {
  return (
    <motion.div
      className={styles.item}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
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
