'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ChevronDown, ChevronLeft, ChevronRight, X, Video, Smartphone, Image, Camera } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';
import styles from './MediaSection.module.css';

interface YouTubeItem {
  _id: string;
  title: string;
  url: string;
  coverImage: any;
}

interface ImageGallery {
  _id: string;
  categoryName: string;
  images: {
    _key: string;
    asset: any;
    caption?: string;
  }[];
}

type TabType = 'videos' | 'shorts' | 'fotosH' | 'fotosV';

const FETCH_QUERY = `{
  "videos": *[_type == "youtubeHorizontal"] | order(_createdAt desc),
  "shorts": *[_type == "youtubeVertical"] | order(_createdAt desc),
  "fotosH": *[_type == "imageGalleryHorizontal"] | order(_createdAt desc),
  "fotosV": *[_type == "imageGalleryVertical"] | order(_createdAt desc)
}`;

const TRANSLATIONS = {
  pt: {
    sectionTitle: 'Mídias',
    loading: 'Carregando mídias...',
    noPhotos: 'Nenhuma foto encontrada.',
    videos: 'Vídeos',
    shorts: 'Shorts',
    fotosH: 'Fotos Horizontais',
    fotosV: 'Fotos Verticais',
  },
  en: {
    sectionTitle: 'Media',
    loading: 'Loading media...',
    noPhotos: 'No photos found.',
    videos: 'Videos',
    shorts: 'Shorts',
    fotosH: 'Horizontal Photos',
    fotosV: 'Vertical Photos',
  },
  es: {
    sectionTitle: 'Medios',
    loading: 'Cargando medios...',
    noPhotos: 'No se encontraron fotos.',
    videos: 'Videos',
    shorts: 'Shorts',
    fotosH: 'Fotos Horizontales',
    fotosV: 'Fotos Verticales',
  }
};

type SupportedLang = 'pt' | 'en' | 'es';

export default function MediaSection({ lang = 'pt' }: { lang?: string }) {
  const tt = TRANSLATIONS[(lang as SupportedLang)] || TRANSLATIONS.pt;
  const [activeTab, setActiveTab] = useState<TabType>('videos');
  const [data, setData] = useState<{
    videos: YouTubeItem[];
    shorts: YouTubeItem[];
    fotosH: ImageGallery[];
    fotosV: ImageGallery[];
  }>({ videos: [], shorts: [], fotosH: [], fotosV: [] });
  const [loading, setLoading] = useState(true);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; caption?: string } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await client.fetch(FETCH_QUERY);
        setData(result);
      } catch (error) {
        console.error('Error fetching media data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Close lightbox on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const getYouTubeEmbedUrl = (url: string) => {
    try {
      const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } catch (e) {
      return url;
    }
  };

  const tabs = [
    { id: 'videos', label: tt.videos, icon: <Video size={16} /> },
    { id: 'shorts', label: tt.shorts, icon: <Smartphone size={16} /> },
    { id: 'fotosH', label: tt.fotosH, icon: <Image size={16} /> },
    { id: 'fotosV', label: tt.fotosV, icon: <Camera size={16} /> },
  ];

  if (loading) return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div style={{ textAlign: 'center', color: '#fff', opacity: 0.5 }}>{tt.loading}</div>
      </div>
    </section>
  );

  return (
    <section className={styles.section} id="midias">
      <div className={styles.header}>
        <h2 className={styles.title}>{tt.sectionTitle}</h2>
        <div className={styles.dividers_container}>
          <div className={styles.divider} />
        </div>
      </div>

      <div className={styles.desktop_selector}>
        <div className={styles.tabs_container}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab_btn} ${activeTab === tab.id ? styles.active_tab : ''}`}
              onClick={() => {
                setActiveTab(tab.id as TabType);
                setPlayingId(null);
              }}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="activeTab"
                  className={styles.active_pill}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div className={styles.tab_content}>
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.mobile_selector}>
        <div className={styles.dropdown_wrapper}>
          <button 
            className={`${styles.dropdown_trigger} ${isMenuOpen ? styles.trigger_open : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={styles.dropdown_label}>
              {tabs.find(t => t.id === activeTab)?.icon}
              <span>{tabs.find(t => t.id === activeTab)?.label}</span>
            </div>
            <motion.div
              animate={{ rotate: isMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={18} />
            </motion.div>
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div 
                className={styles.dropdown_menu}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`${styles.menu_item} ${activeTab === tab.id ? styles.item_active : ''}`}
                    onClick={() => {
                      setActiveTab(tab.id as TabType);
                      setPlayingId(null);
                      setIsMenuOpen(false);
                    }}
                  >
                    <div className={styles.tab_content}>
                      {tab.icon}
                      {tab.label}
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className={styles.container}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'videos' && (
              <div className={styles.grid_horizontal}>
                {data.videos.map((item) => (
                  <YouTubeCard key={item._id} item={item} isPlaying={playingId === item._id} onPlay={() => setPlayingId(item._id)} getEmbedUrl={getYouTubeEmbedUrl} type="horizontal" />
                ))}
              </div>
            )}

            {activeTab === 'shorts' && (
              <div className={styles.grid_vertical}>
                {data.shorts.map((item) => (
                  <YouTubeCard key={item._id} item={item} isPlaying={playingId === item._id} onPlay={() => setPlayingId(item._id)} getEmbedUrl={getYouTubeEmbedUrl} type="vertical" />
                ))}
              </div>
            )}

            {activeTab === 'fotosH' && (
              <PhotoGalleries galleries={data.fotosH} cardStyle={styles.mediaCard_horizontal} onImageClick={(url, cap) => setSelectedImage({url, caption: cap})} noPhotosText={tt.noPhotos} />
            )}

            {activeTab === 'fotosV' && (
              <PhotoGalleries galleries={data.fotosV} cardStyle={styles.mediaCard_vertical} onImageClick={(url, cap) => setSelectedImage({url, caption: cap})} noPhotosText={tt.noPhotos} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className={styles.lightbox_overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className={styles.lightbox_content}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className={styles.close_btn} onClick={() => setSelectedImage(null)}>
                <X size={40} />
              </button>
              <img src={selectedImage.url} alt="" className={styles.lightbox_image} />
              {selectedImage.caption && (
                <span className={styles.lightbox_caption}>{selectedImage.caption}</span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PhotoGalleries({ galleries, cardStyle, onImageClick, noPhotosText }: { galleries: ImageGallery[], cardStyle: string, onImageClick: (url: string, cap?: string) => void, noPhotosText: string }) {
  if (galleries.length === 0) return <div style={{ textAlign: 'center', color: '#666', padding: '40px 0' }}>{noPhotosText}</div>;

  return (
    <div>
      {galleries.map((gallery) => (
        <PhotoRow key={gallery._id} gallery={gallery} cardStyle={cardStyle} onImageClick={onImageClick} />
      ))}
    </div>
  );
}

function PhotoRow({ gallery, cardStyle, onImageClick }: { gallery: ImageGallery, cardStyle: string, onImageClick: (url: string, cap?: string) => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.category_group}>
      <h3 className={styles.category_title}>{gallery.categoryName}</h3>
      <div className={styles.scroll_outer_container}>
        <button className={`${styles.scroll_arrow} ${styles.arrow_left}`} onClick={() => scroll('left')}>
          <ChevronLeft size={24} />
        </button>
        <div className={styles.scroll_container} ref={scrollRef}>
          {gallery.images?.map((img) => (
            <div 
              key={img._key} 
              className={`${styles.mediaCard} ${cardStyle}`}
              onClick={() => onImageClick(urlFor(img).url(), img.caption)}
            >
              <img
                src={urlFor(img).width(800).url()}
                alt={img.caption || ''}
                className={styles.mediaImage}
              />
              {img.caption && (
                <div className={styles.overlay}>
                  <span className={styles.mediaTitle}>{img.caption}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <button className={`${styles.scroll_arrow} ${styles.arrow_right}`} onClick={() => scroll('right')}>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

function YouTubeCard({ item, isPlaying, onPlay, getEmbedUrl, type }: { item: YouTubeItem, isPlaying: boolean, onPlay: () => void, getEmbedUrl: (url: string) => string, type: 'horizontal' | 'vertical' }) {
  return (
    <div className={`${styles.mediaCard} ${type === 'horizontal' ? styles.mediaCard_horizontal : styles.mediaCard_vertical}`} onClick={() => !isPlaying && onPlay()}>
      {isPlaying ? (
        <div className={styles.embed_active}>
          <iframe
            src={getEmbedUrl(item.url)}
            className={styles.iframe}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
        <>
          <img
            src={urlFor(item.coverImage).width(800).url()}
            alt={item.title}
            className={styles.mediaImage}
          />
          <div className={styles.overlay}>
            <h3 className={styles.mediaTitle}>{item.title}</h3>
          </div>
          <div className={styles.playIcon}>
            <Play size={24} fill="currentColor" />
          </div>
        </>
      )}
    </div>
  );
}
