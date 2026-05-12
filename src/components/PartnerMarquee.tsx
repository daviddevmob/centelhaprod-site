'use client';

import { useRef, useEffect, useState } from 'react';
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
  { name: 'Mamba', logo: '/parceiros/mamba.jpg' },
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

export default function PartnerMarquee({ lang = 'pt' }: { lang?: string }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Triplicamos para garantir que o scroll infinito manual funcione suavemente
  const allPartners = [...PARTNERS, ...PARTNERS, ...PARTNERS];

  const titles: Record<string, React.ReactNode> = {
    pt: <>Quem Acompanha Nossa <span className={styles.highlight}>Centelha</span></>,
    en: <>Those Who Follow Our <span className={styles.highlight}>Centelha</span></>,
    es: <>Quienes Siguen Nuestra <span className={styles.highlight}>Centelha</span></>
  };

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollWidth = container.scrollWidth;
      container.scrollLeft = scrollWidth / 3;
    }
  }, []);

  const handleInfiniteScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const third = scrollWidth / 3;

    if (scrollLeft < 10) {
      container.scrollLeft = third;
    } else if (scrollLeft + clientWidth > scrollWidth - 10) {
      container.scrollLeft = third;
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = 300;
    
    container.scrollTo({
      left: direction === 'left' ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount,
      behavior: 'smooth'
    });
  };

  // Funções para Dragging
  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    setStartX(pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  const onDragging = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const pageX = 'touches' in e ? e.touches[0].pageX : e.pageX;
    const x = pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Multiplicador de velocidade
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {titles[lang] || titles.pt}
        </h2>
        <div className={styles.divider} />
      </div>

      <div className={styles.marquee_wrapper}>
        <button 
          className={styles.nav_button} 
          onClick={() => scroll('left')}
          aria-label="Scroll Left"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div 
          className={`${styles.marquee_container} ${isDragging ? styles.dragging : ''}`} 
          ref={scrollContainerRef}
          onScroll={handleInfiniteScroll}
          onMouseDown={startDragging}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          onMouseMove={onDragging}
          onTouchStart={startDragging}
          onTouchEnd={stopDragging}
          onTouchMove={onDragging}
        >
          <div className={styles.marquee_track}>
            {allPartners.map((partner, idx) => (
              <div key={idx} className={styles.logo_wrapper}>
                <img
                  src={partner.logo}
                  alt={`Logo ${partner.name}`}
                  className={styles.logo}
                  loading="lazy"
                  draggable={false}
                />
                <span className={styles.brand_name}>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>

        <button 
          className={styles.nav_button} 
          onClick={() => scroll('right')}
          aria-label="Scroll Right"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}


