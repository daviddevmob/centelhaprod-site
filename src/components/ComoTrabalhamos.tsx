import { LucideIcon } from "lucide-react";
import styles from "./ComoTrabalhamos.module.css";
import { motion } from "framer-motion";
import { Camera, Clapperboard, Users, Sparkles } from "lucide-react";

type Lang = "pt" | "en" | "es";

const TRANSLATIONS = {
  pt: {
    title: "COMO TRABALHAMOS",
    subtitle: "Transformando eventos em narrativas visuais",
    steps: [
      { icon: Users, title: "Equipe Completa", desc: "Acompanhamos seu evento com um time especializado: videomakers, editores e diretores atentos a cada detalhe." },
      { icon: Camera, title: "Captação Dinâmica", desc: "Registramos a essência, a luz e a alegria do momento, incluindo coberturas aéreas (drone) e bastidores." },
      { icon: Clapperboard, title: "Pós-Produção", desc: "Edição ágil e narrativa autêntica para entregar o melhor material bruto e decupado." },
      { icon: Sparkles, title: "Entrega de Valor", desc: "Produzimos Aftermovies institucionais e Reels dinâmicos focados em engajar suas redes sociais." }
    ]
  },
  en: {
    title: "HOW WE WORK",
    subtitle: "Transforming events into visual narratives",
    steps: [
      { icon: Users, title: "Full Team", desc: "We cover your event with a specialized team: videographers, editors, and directors attentive to every detail." },
      { icon: Camera, title: "Dynamic Capture", desc: "We capture the essence, light, and joy of the moment, including aerial (drone) and behind-the-scenes footage." },
      { icon: Clapperboard, title: "Post-Production", desc: "Agile editing and authentic storytelling to deliver the best raw and selected material." },
      { icon: Sparkles, title: "Value Delivery", desc: "We produce institutional Aftermovies and dynamic Reels focused on engaging your social media." }
    ]
  },
  es: {
    title: "CÓMO TRABAJAMOS",
    subtitle: "Transformando eventos en narrativas visuales",
    steps: [
      { icon: Users, title: "Equipo Completo", desc: "Acompañamos tu evento con un equipo especializado: videógrafos, editores y directores atentos a cada detalle." },
      { icon: Camera, title: "Captación Dinámica", desc: "Registramos la esencia, la luz y la alegría del momento, incluyendo coberturas aéreas (dron) y detrás de escena." },
      { icon: Clapperboard, title: "Post-Producción", desc: "Edición ágil y narrativa auténtica para entregar el mejor material en bruto y seleccionado." },
      { icon: Sparkles, title: "Entrega de Valor", desc: "Producimos Aftermovies institucionales y Reels dinámicos enfocados en generar interacción en tus redes sociales." }
    ]
  }
};

export default function ComoTrabalhamos({ lang = "pt" }: { lang?: Lang }) {
  const t = TRANSLATIONS[lang];

  return (
    <section id="como-trabalhamos" className={styles.section}>
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.title}>{t.title}</h2>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </motion.div>

      <div className={styles.grid}>
        {t.steps.map((step: { icon: React.ElementType; title: string; desc: string }, idx: number) => {
          const Icon = step.icon;
          return (
            <motion.div 
              key={idx} 
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className={styles.icon_wrapper}>
                <Icon size={28} className={styles.icon} />
              </div>
              <h3 className={styles.card_title}>{step.title}</h3>
              <p className={styles.card_desc}>{step.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
