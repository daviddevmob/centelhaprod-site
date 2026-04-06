'use client';

import styles from './PartnerMarquee.module.css';

// Certifique-se de que TODOS estes arquivos são PNGs transparentes.
// Aviso: Ainda existem arquivos JPG/WEBP que devem ser substituídos por PNGs transparentes.
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

export default function PartnerMarquee() {
  // Duplicamos o array para criar a ilusão de rolagem infinita contínua
  const allPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section className={styles.section}>
      {/* Cabeçalho da Seção */}
      <div className={styles.header}>
        <h2 className={styles.title}>
          Quem Acompanha Nossa <span className={styles.highlight}>Centelha</span>
        </h2>
        <div className={styles.divider} />
      </div>

      {/* Container da Esteira */}
      <div className={styles.marquee_container}>
        {/* Máscaras de degradê para as logos sumirem suavemente nas bordas */}
        <div className={styles.fade_left} />
        <div className={styles.fade_right} />

        {/* Fita Animada */}
        <div className={styles.marquee_track}>
          {allPartners.map((partner, idx) => (
            <div key={idx} className={styles.logo_wrapper}>
              <img
                src={partner.logo}
                alt={`Logo ${partner.name}`}
                className={styles.logo}
                loading="lazy"
              />
              {/* Tooltip elegante feito 100% em CSS (Sem estados de hover no React) */}
              <span className={styles.tooltip}>{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
