'use client';

import { useRef, useState, useCallback } from 'react';
import styles from './PartnerMarquee.module.css';

const PARTNERS = [
  { name: 'Absolut', logo: '/parceiros/absolut.png' },
  { name: 'Banco do Brasil', logo: '/parceiros/banco do brasil.jpg' },
  { name: 'Beefeater', logo: '/parceiros/beefeater.png' },
  { name: 'Duotone', logo: '/parceiros/duotone.png' },
  { name: 'Elo', logo: '/parceiros/elo.png' },
  { name: 'Evoke', logo: '/parceiros/evoke.jpg' },
  { name: 'Fan Construções', logo: '/parceiros/fan construcoes.webp' },
  { name: 'FIEC', logo: '/parceiros/fiec.jpg' },
  { name: 'Freixenet', logo: '/parceiros/freixenet.jpg' },
  { name: 'Layback', logo: '/parceiros/layback.png' },
  { name: 'Monster', logo: '/parceiros/monster.png' },
  { name: 'Monte Dourado', logo: '/parceiros/monte dourado.jpg' },
  { name: 'Monteiro Urbanismo', logo: '/parceiros/monteiro urbanismo.png' },
  { name: 'Red Bull', logo: '/parceiros/redbull.png' },
  { name: 'Reveillon Maravilha', logo: '/parceiros/reveillon_maravilha.png' },
  { name: 'Segurobet', logo: '/parceiros/segurobet.avif' },
  { name: 'Skol', logo: '/parceiros/skol.png' },
  { name: 'Sol', logo: '/parceiros/sol.png' },
  { name: 'WSL Brasil', logo: '/parceiros/wsl.webp' },
  { name: 'Xeque Mate', logo: '/parceiros/xeque mate.png' },
];

export default function PartnerMarquee() {
  const allPartners = [...PARTNERS, ...PARTNERS];
  const refs = useRef<Map<number, HTMLImageElement>>(new Map());
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [bounds, setBounds] = useState<DOMRect | null>(null);

  const enter = useCallback((idx: number, img: HTMLImageElement) => {
    refs.current.set(idx, img);
    setHoveredIdx(idx);
    setBounds(img.getBoundingClientRect());
  }, []);

  const leave = useCallback(() => {
    setHoveredIdx(null);
    setBounds(null);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Quem Acompanha Nossa{' '}
          <span className={styles.highlight}>Centelha</span>
        </h2>
        <div className={styles.divider} />
      </div>

      <div className={styles.marquee_container}>
        <div className={styles.fade_left} />
        <div className={styles.fade_right} />

        <div className={styles.marquee_track}>
          {allPartners.map((partner, idx) => (
            <div
              key={idx}
              className={styles.logo_wrapper}
              onMouseEnter={() => enter(idx, refs.current.get(idx)!)}
              onMouseLeave={leave}
            >
              <img
                ref={(el) => {
                  if (el) refs.current.set(idx, el);
                }}
                src={partner.logo}
                alt={`Logo ${partner.name}`}
                className={styles.logo}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Expanded overlay logo — fixed position, outside all clip bounds */}
      {hoveredIdx != null && bounds && (
        <div
          className={styles.overlay}
          style={{ top: `${bounds.top}px`, left: `${bounds.left}px` }}
        >
          <img
            src={allPartners[hoveredIdx].logo}
            alt={`Logo ${allPartners[hoveredIdx].name}`}
            className={styles.overlay_img}
          />
          <span className={styles.overlay_tooltip}>
            {allPartners[hoveredIdx].name}
          </span>
        </div>
      )}
    </section>
  );
}
