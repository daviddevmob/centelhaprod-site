"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import styles from "./QuemSomos.module.css";

type Lang = "pt" | "en" | "es";

const TRANSLATIONS = {
  pt: {
    title: "O TIME",
    subtitle: "Conheça a equipe por trás da Centelha",
    members: [
      { id: "luara", name: "Luara", role: "A Cabeça Pensante", description: "A Luara é a cabeça pensante, aquela que do nada joga a ideia mais criativa, pra resolver o B.O.", video: "/videos-quemsomos/luara.mp4" },
      { id: "leticia", name: "Letícia", role: "A Organização", description: "Se tem alguém que resolve tudo na base da organização, essa é a Letícia 🤌🏽😮_💨", video: "/videos-quemsomos/leticia.mp4" },
      { id: "thayluz", name: "Thay", role: "A Olho de Águia", description: "A Thay é a famosa olho de águia 🦅👁️ Não tem um detalhe que passe despercebido, atenta a tudo.", video: "/videos-quemsomos/thayluz.mp4" },
      { id: "louie", name: "Louie", role: "O Desenrolado", description: "Se a gente pudesse definir o Louie em uma palavra seria - DESENROLADO🔥 Bom de verdade.", video: "/videos-quemsomos/louie.mp4" }
    ]
  },
  en: {
    title: "THE TEAM",
    subtitle: "Meet the team behind Centelha",
    members: [
      { id: "luara", name: "Luara", role: "The Mastermind", description: "Luara is the mastermind, the one who suddenly drops the most creative idea to solve the issue.", video: "/videos-quemsomos/luara.mp4" },
      { id: "leticia", name: "Letícia", role: "The Organizer", description: "If there's someone who solves everything with pure organization, that's Letícia 🤌🏽😮_💨", video: "/videos-quemsomos/leticia.mp4" },
      { id: "thayluz", name: "Thay", role: "The Eagle Eye", description: "Thay is the famous eagle eye 🦅👁️ Not a single detail goes unnoticed.", video: "/videos-quemsomos/thayluz.mp4" },
      { id: "louie", name: "Louie", role: "The Problem Solver", description: "If we could define Louie in one word it would be - UNSTOPPABLE🔥 Truly great.", video: "/videos-quemsomos/louie.mp4" }
    ]
  },
  es: {
    title: "EL EQUIPO",
    subtitle: "Conoce al equipo detrás de Centelha",
    members: [
      { id: "luara", name: "Luara", role: "El Cerebro", description: "Luara es el cerebro, la que de la nada lanza la idea más creativa para solucionar los problemas.", video: "/videos-quemsomos/luara.mp4" },
      { id: "leticia", name: "Letícia", role: "La Organización", description: "Si hay alguien que resuelve todo a base de organización, esa es Letícia 🤌🏽😮_💨", video: "/videos-quemsomos/leticia.mp4" },
      { id: "thayluz", name: "Thay", role: "Ojo de Águila", description: "Thay es el famoso ojo de águila 🦅👁️ No hay un solo detalle que pase desapercibido.", video: "/videos-quemsomos/thayluz.mp4" },
      { id: "louie", name: "Louie", role: "El Resolutivo", description: "Si pudiéramos definir a Louie en una palabra sería - IMPARABLE🔥 Muy bueno de verdad.", video: "/videos-quemsomos/louie.mp4" }
    ]
  }
};

export default function QuemSomos({ lang = "pt" }: { lang?: Lang }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const t = TRANSLATIONS[lang];
  
  // Keep track of all video refs to control playback
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handleToggle = (id: string, e: React.MouseEvent) => {
    // If clicking on controls, don't close the card
    if ((e.target as Element).closest('.controls')) return;

    if (activeId === id) {
      setActiveId(null);
      // Mute the video when closing
      const video = videoRefs.current[id];
      if (video) video.muted = true;
    } else {
      setActiveId(id);
      setIsMuted(false); 
      setPlaybackSpeed(1); // Reset speed
      
      const video = videoRefs.current[id];
      if (video) {
        video.currentTime = 0; // Restart from beginning
        video.playbackRate = 1;
        video.muted = false;
        video.play().catch(() => {
          // Fallback if browser blocks unmuted auto-play
          video.muted = true;
          setIsMuted(true);
          video.play();
        });
      }

      // Mute other videos
      t.members.forEach((m: { id: string }) => {
        if (m.id !== id && videoRefs.current[m.id]) {
          videoRefs.current[m.id]!.muted = true;
        }
      });
    }
  };

  const toggleMute = () => {
    if (!activeId) return;
    const video = videoRefs.current[activeId];
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const cycleSpeed = () => {
    if (!activeId) return;
    const video = videoRefs.current[activeId];
    if (video) {
      let newSpeed = 1.5;
      if (video.playbackRate === 1) newSpeed = 1.5;
      else if (video.playbackRate === 1.5) newSpeed = 2;
      else newSpeed = 1;

      video.playbackRate = newSpeed;
      setPlaybackSpeed(newSpeed);
    }
  };

  return (
    <section id="quem-somos" className={styles.section}>
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

      <div className={styles.container}>
        {t.members.map((member: { id: string; name: string; role: string; description: string; video: string }) => {
          const isActive = activeId === member.id;

          return (
            <motion.div 
              layout
              key={member.id} 
              className={`${styles.card} ${isActive ? styles.card_active : ""}`}
              onClick={(e) => handleToggle(member.id, e)}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, layout: { duration: 0.4, type: "spring", bounce: 0.2 } }}
            >
              <motion.div layout className={styles.phone_mockup}>
                <video 
                  ref={el => { videoRefs.current[member.id] = el }}
                  src={member.video}
                  autoPlay
                  muted={!isActive} // Muted unless it's strictly active (handled in JS too)
                  loop
                  playsInline
                  className={styles.video}
                />
                <div className={styles.speaker_grill} />
                
                {!isActive && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className={styles.play_overlay}
                  >
                    <span className={styles.play_icon}>▶</span>
                  </motion.div>
                )}

                {isActive && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0 }}
                    className={`${styles.controls} controls`}
                  >
                    <button onClick={(e) => { e.stopPropagation(); toggleMute(); }} className={styles.control_btn}>
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); cycleSpeed(); }} className={styles.control_btn_text}>
                      {playbackSpeed}x
                    </button>
                  </motion.div>
                )}

              </motion.div>
              
              <motion.div layout className={styles.info}>
                <motion.h3 layout="position" className={styles.name}>{member.name}</motion.h3>
                <motion.span layout="position" className={styles.role}>{member.role}</motion.span>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      key="desc"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={styles.description_wrapper}
                    >
                      <p className={styles.description}>{member.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
