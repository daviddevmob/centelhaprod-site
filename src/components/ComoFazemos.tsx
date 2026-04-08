'use client';

import { motion } from "framer-motion";
import styles from "./ComoFazemos.module.css";
import Globe from "./Globe"; // Importando o globo

type Lang = "pt" | "en" | "es";

// Traduções atualizadas
const TRANSLATIONS = {
  pt: {
    intro: { title: "Somos do mundo", desc: "Já atendemos + de 8 cidades, dentro e fora do Brasil." },
    items: [
      { title: "Equipe completa", desc: "Contamos com uma equipe especializada de videomakers, fotógrafos, editores e outros profissionais envolvidos para garantir que o seu projeto aconteça com excelência." },
      { title: "Somos desenrolados", desc: "Na Centelha, não existem obstáculos. Sua ideia vai se tornar real. Somos comprometidos com cada projeto e cuidamos de tudo, do roteiro à edição para fazer a sua ideia acontecer!" },
      { title: "Entrega de valor", desc: "Nosso objetivo é gerar resultados, seja em vendas ou posicionamento de marca. Criamos produções que impactam o seu cliente e fortalecem sua presença no mercado." }
    ]
  },
  en: {
    intro: { title: "We are from the world", desc: "We have already served more than 8 cities, inside and outside Brazil." },
    items: [
      { title: "Complete team", desc: "We have a specialized team of videomakers, photographers, editors and other professionals involved to ensure that your project happens with excellence." },
      { title: "We are versatile", desc: "At Centelha, there are no obstacles. Your idea will become real. We are committed to each project and take care of everything, from script to editing, to make your idea happen!" },
      { title: "Value delivery", desc: "Our goal is to generate results, whether in sales or brand positioning. We create productions that impact your client and strengthen your presence in the market." }
    ]
  },
  es: {
    intro: { title: "Somos del mundo", desc: "Ya hemos atendido a más de 8 ciudades, dentro y fuera de Brasil." },
    items: [
      { title: "Equipo completo", desc: "Contamos con un equipo especializado de videógrafos, fotógrafos, editores y otros profesionales involucrados para asegurar que su proyecto se realice con excelencia." },
      { title: "Somos resolutivos", desc: "En Centelha, no hay obstáculos. Tu idea se hará realidad. ¡Estamos comprometidos con cada proyecto y nos encargamos de todo, desde el guion hasta la edición para que tu idea suceda!" },
      { title: "Entrega de valor", desc: "Nuestro objetivo es generar resultados, ya sea en ventas o posicionamiento de marca. Creamos producciones que impactan a su cliente y fortalecen su presencia en el mercado." }
    ]
  }
};

export default function ComoFazemos({ lang = "pt" }: { lang?: Lang }) {
  const content = TRANSLATIONS[lang] || TRANSLATIONS["pt"];

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

      {/* NOVO: Bloco do Globo (Hero da Seção) */}
      <div className={styles.world_block}>
        <motion.div 
          className={styles.world_text}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className={styles.world_title}>{content.intro.title}</h3>
          <p className={styles.world_desc}>{content.intro.desc}</p>
        </motion.div>
        
        <motion.div 
          className={styles.globe_container}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Globe />
        </motion.div>
      </div>

      {/* Lista Numerada Atualizada */}
      <div className={styles.items}>
        {content.items.map((item, idx) => (
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

