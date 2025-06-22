"use client";

import "./ChromaGrid.css";
import ShapeBlur from "./ShapeBlur";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useIsMobile from "./hooks/useIsMobile";

interface ChromaGridItem {
  image: string;
  title: string;
  subtitle?: string;
  handle?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
  location?: string;
}

interface ChromaGridProps {
  items: ChromaGridItem[];
  className?: string;
  columns?: number;
  rows?: number;
}

export const ChromaGrid = ({
  items,
  className = "",
  columns = 3,
  rows = 1,
}: ChromaGridProps) => {
  const data = items;
  const router = useRouter();
  const isMobile = useIsMobile();
  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});
  const [imageLoadStatus, setImageLoadStatus] = useState<{ [key: number]: 'loading' | 'loaded' | 'error' }>({});
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Debug: log dei dati all'inizializzazione
  useEffect(() => {
    console.log("=== CHROMAGRID DEBUG ===");
    console.log("ChromaGrid initialized with items:", data);
    data.forEach((item, index) => {
      console.log(`Item ${index}:`, {
        title: item.title,
        image: item.image,
        url: item.url
      });
    });
    console.log("=== END DEBUG ===");
  }, [data]);

  const handleCardClick = (url?: string) => {
    if (!url) return;
    // Usa window.location.href per i link spotify:// e window.open per i link http/https
    if (url.startsWith("spotify:")) {
      window.location.href = url;
    } else {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleCardPointerMove = (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleImageError = (index: number) => {
    console.error(`❌ Failed to load image for item ${index}:`, data[index].image);
    setImageErrors(prev => ({ ...prev, [index]: true }));
    setImageLoadStatus(prev => ({ ...prev, [index]: 'error' }));
  };

  const handleImageLoad = (index: number) => {
    console.log(`✅ Image loaded successfully for item ${index}:`, data[index].image);
    setImageLoadStatus(prev => ({ ...prev, [index]: 'loaded' }));
  };

  const handleImageStartLoad = (index: number) => {
    console.log(`🔄 Starting to load image for item ${index}:`, data[index].image);
    setImageLoadStatus(prev => ({ ...prev, [index]: 'loading' }));
  };

  return (
    <div
      className={`chroma-grid ${className}`}
      style={
        {
          "--cols": columns,
          "--rows": rows,
        } as React.CSSProperties
      }
    >
      {data.map((c, i) => (
        <article
          key={i}
          className={`chroma-card ${activeCard === i ? 'is-activated' : ''}`}
          onClick={() => handleCardClick(c.url)}
          onMouseEnter={!isMobile ? () => setActiveCard(i) : undefined}
          onMouseLeave={!isMobile ? () => setActiveCard(null) : undefined}
          onTouchStart={isMobile ? () => setActiveCard(i) : undefined}
          onTouchEnd={isMobile ? () => setActiveCard(null) : undefined}
          onMouseMove={!isMobile ? handleCardPointerMove : undefined}
          onTouchMove={isMobile ? handleCardPointerMove : undefined}
          style={
            {
              "--card-border": c.borderColor || "transparent",
              "--card-gradient": c.gradient,
              cursor: c.url ? "pointer" : "default",
            } as React.CSSProperties
          }
        >
          {!isMobile && (
            <ShapeBlur
              variation={0}
              shapeSize={2.1}
              roundness={0.2}
              borderSize={0.02}
              circleSize={0.05}
              circleEdge={1.5}
            />
          )}
          <div className="chroma-img-wrapper">
            {imageErrors[i] ? (
              <div className="flex items-center justify-center h-full bg-gray-800 text-gray-400 p-4 text-center">
                <div>
                  <p className="mb-2">❌ Immagine non disponibile</p>
                  <p className="text-xs text-gray-500">{c.image}</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageErrors(prev => ({ ...prev, [i]: false }));
                      setImageLoadStatus(prev => ({ ...prev, [i]: 'loading' }));
                    }}
                    className="mt-2 px-2 py-1 bg-blue-600 text-white text-xs rounded"
                  >
                    Riprova
                  </button>
                </div>
              </div>
            ) : imageLoadStatus[i] === 'loading' ? (
              <div className="flex items-center justify-center h-full bg-gray-800 text-gray-400">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <p className="text-xs">Caricamento...</p>
                </div>
              </div>
            ) : (
              <img 
                src={c.image} 
                alt={c.title} 
                loading="lazy"
                onLoadStart={() => handleImageStartLoad(i)}
                onLoad={() => handleImageLoad(i)}
                onError={() => handleImageError(i)}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '10px'
                }}
              />
            )}
          </div>
          <footer className="chroma-info">
            <h3 className="name">{c.title}</h3>
            {c.handle && <span className="handle">{c.handle}</span>}
            <p className="role">{c.subtitle}</p>
            {c.location && <span className="location">{c.location}</span>}
          </footer>
        </article>
      ))}
    </div>
  );
};

export default ChromaGrid; 