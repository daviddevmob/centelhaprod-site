"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { InstagramEmbed } from "react-social-media-embed";
import styles from "./InstaGallery.module.css";

export default function InstaGallery() {
  const [links, setLinks] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch("/api/ig-links");
        const data = await res.json();
        if (data.links) {
          setLinks(data.links);
        }
      } catch (error) {
        console.error("Erro ao carregar mídias:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, []);

  if (loading) {
    return (
      <section id="galeria" className={styles.section}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.title}>PRODUÇÕES RECENTES</h2>
          <div className={styles.divider} />
        </motion.div>
        <div className={styles.grid}>
          {[0, 1, 2].map((i) => (
            <div key={i} className={styles.skeleton} />
          ))}
        </div>
      </section>
    );
  }

  if (links.length === 0) {
    return null;
  }

  return (
    <section id="galeria" className={styles.section}>
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={styles.title}>PRODUÇÕES RECENTES</h2>
        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0, originX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        />
      </motion.div>

      <div className={styles.grid}>
        {links.map((link, index) => (
          <motion.div
            key={link}
            className={styles.card}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={styles.frame}>
              <InstagramEmbed
                url={link}
                width="100%"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
