"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./QuemSomos.module.css";

type Lang = "pt" | "en" | "es";

type TextSegment = { text: string; type?: "highlight" | "bold" };

function highlightText(parts: TextSegment[]): React.ReactNode {
  return parts.map((part, i) => (
    <span key={i} className={part.type === "highlight" ? styles.highlight : part.type === "bold" ? styles.bold : ""}>
      {part.text}
    </span>
  ));
}

const PARAGRAPHS: Record<Lang, TextSegment[][]> = {
  pt: [
    [
      { text: "Somos uma produtora fruto de uma tríade: " },
      { text: "estratégia, audiovisual e criatividade", type: "bold" },
      { text: ". Nosso propósito é ajudar pessoas a comunicar o que têm a dizer ao mundo através do audiovisual." }
    ],
    [
      { text: "Ajudamos marcas a se comunicarem com clareza e impacto, pois acreditamos no vídeo como uma ferramenta poderosa de " },
      { text: "posicionamento, conexão e geração de valor", type: "bold" },
      { text: "." }
    ],
    [
      { text: "Estamos no exato momento em que a luz, a habilidade e o acaso se encontram diante do tempo: na " },
      { text: "Centelha", type: "highlight" },
      { text: " do momento. Criamos imagens que vão além da estética e geram " },
      { text: "resultados reais", type: "bold" },
      { text: "." }
    ],
    [
      { text: "Mais do que produzir, nós construímos narrativas que impulsionam marcas e negócios", type: "highlight" },
      { text: "." }
    ]
  ],
  en: [
    [
      { text: "We are a production company born from a triad: " },
      { text: "strategy, audiovisual, and creativity", type: "bold" },
      { text: ". Our purpose is to help people communicate what they have to say to the world through audiovisual." }
    ],
    [
      { text: "We help brands communicate with clarity and impact, as we believe in video as a powerful tool for " },
      { text: "positioning, connection, and value creation", type: "bold" },
      { text: "." }
    ],
    [
      { text: "We are at the exact moment when light, skill, and chance meet in time: in the " },
      { text: "Spark", type: "highlight" },
      { text: " of the moment. We create images that go beyond aesthetics and deliver " },
      { text: "real results", type: "bold" },
      { text: "." }
    ],
    [
      { text: "More than producing, we build narratives that drive brands and businesses forward", type: "highlight" },
      { text: "." }
    ]
  ],
  es: [
    [
      { text: "Somos una productora fruto de una tríade: " },
      { text: "estrategia, audiovisual y creatividad", type: "bold" },
      { text: ". Nuestro propósito es ayudar a las personas a comunicar lo que tienen que decir al mundo a través del audiovisual." }
    ],
    [
      { text: "Ayudamos a las marcas a comunicarse con claridad e impacto, pues creemos en el video como una herramienta poderosa de " },
      { text: "posicionamiento, conexión y generación de valor", type: "bold" },
      { text: "." }
    ],
    [
      { text: "Estamos en el exacto momento en que la luz, la habilidad y el azar se encuentran ante el tiempo: en la " },
      { text: "Chispa", type: "highlight" },
      { text: " del momento. Creamos imágenes que van más allá de la estética y generan " },
      { text: "resultados reales", type: "bold" },
      { text: "." }
    ],
    [
      { text: "Más que producir, construimos narrativas que impulsan marcas y negocios", type: "highlight" },
      { text: "." }
    ]
  ]
};

function ParagraphReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.p
      ref={ref}
      className={styles.paragraph}
      initial={{ opacity: 0, y: 20, x: -10 }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 + delay }}
    >
      {children}
    </motion.p>
  );
}

export default function QuemSomos({ lang = "pt" }: { lang?: Lang }) {
  const paragraphs = PARAGRAPHS[lang];

  return (
    <section id="quem-somos" className={styles.section}>
      <motion.div
        className={styles.title_wrapper}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className={styles.title}>{lang === "pt" ? "QUEM SOMOS" : lang === "en" ? "WHO WE ARE" : "QUIÉNES SOMOS"}</h2>
        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        />
      </motion.div>

      <div className={styles.paragraphs}>
        {paragraphs.map((segments, i) => (
          <ParagraphReveal key={`${lang}-${i}`} delay={i * 0.15}>
            {highlightText(segments)}
          </ParagraphReveal>
        ))}
      </div>
    </section>
  );
}
