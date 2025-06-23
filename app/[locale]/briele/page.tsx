"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import DecryptedText from "../../components/DecryptedText";
import { FiArrowDown, FiMusic, FiDroplet, FiZap, FiHeart, FiEye, FiCompass, FiGrid, FiHome } from "react-icons/fi";
import Link from "next/link";
import { useInView } from 'react-intersection-observer';
import React from "react";
import CosmicPurpleBackground from "../../components/CosmicPurpleBackground";

interface ScrollObserverInstance {
  direction: 'up' | 'down';
  progress: number;
  // Aggiungi altre proprietà se necessario
}

// Componente per osservare la sezione e aggiornare l'indice attivo
const SectionObserver = ({ index, setActiveSection }: { index: number; setActiveSection: (index: number) => void; }) => {
  const { ref, inView } = useInView({
    threshold: 0.5, // Si attiva quando il 50% della sezione è visibile
  });

  useEffect(() => {
    if (inView) {
      setActiveSection(index);
    }
  }, [inView, index, setActiveSection]);

  return <div ref={ref} className="absolute top-1/2" />;
};

// Indicatore di profondità laterale (nuova versione)
const DeepMeter = ({ sections, activeSection }: { sections: any[], activeSection: number }) => {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col items-center space-y-4">
        {sections.map((section, index) => {
          if (!section.icon) return null;
          const Icon = section.icon;
          return (
            <a href={`#${section.id}`} key={section.id} className="relative block group" aria-label={`Scroll to ${section.title}`}>
              <Icon
                className={`w-6 h-6 transition-all duration-300 ease-in-out group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.7)] ${
                  index === activeSection
                    ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(0,255,255,0.7)]"
                    : "text-white/30"
                }`}
              />
              {index === activeSection && (
                 <motion.div
                   layoutId="active-section-indicator"
                   className="absolute -inset-2 rounded-full border-2 border-cyan-400/50"
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1.1 }}
                   exit={{ opacity: 0, scale: 0.8 }}
                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
                 />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
};

// Particelle cosmiche animate - Client-side only
const CosmicParticles = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(400)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-white/30 rounded-full"
          style={{
            left: `${(i * 7) % 100}%`,
            top: `${(i * 13) % 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, (i % 3 - 1) * 20, 0],
            opacity: [0.1, 0.9, 0.1],
            scale: [0.3, 1.8, 0.3],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 6 + (i % 8),
            repeat: Infinity,
            delay: i * 0.05,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Onde sinusoidali animate
const SineWaves = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <svg className="w-full h-full" viewBox="0 0 1000 200">
        <motion.path
          d="M0,100 Q250,50 500,100 T1000,100"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          animate={{
            d: [
              "M0,100 Q250,50 500,100 T1000,100",
              "M0,100 Q250,150 500,100 T1000,100",
              "M0,100 Q250,50 500,100 T1000,100",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// Barra di profondità laterale
const DepthIndicator = ({ currentSection }: { currentSection: number }) => {
  const sections = [
    { name: "Superficie", icon: FiArrowDown },
    { name: "Frequenze", icon: FiZap },
    { name: "Armonia", icon: FiMusic },
    { name: "Colori", icon: FiDroplet },
    { name: "Introspezione", icon: FiHeart },
    { name: "Spiritualità", icon: FiEye },
    { name: "Filosofia", icon: FiCompass },
    { name: "Frammenti", icon: FiGrid },
  ];

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
      <div className="flex flex-col items-center space-y-4">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index <= currentSection 
                ? "bg-gradient-to-r from-purple-400 to-cyan-400 shadow-lg shadow-purple-400/50" 
                : "bg-white/20"
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
};

// Palette interattiva dei colori
const ColorPalette = () => {
  const colors = [
    { name: "Viola Profondo", hex: "#8b5cf6", frequency: "432 Hz" },
    { name: "Ciano Elettrico", hex: "#06b6d4", frequency: "528 Hz" },
    { name: "Rosa Magenta", hex: "#ec4899", frequency: "639 Hz" },
    { name: "Blu Cosmico", hex: "#3b82f6", frequency: "741 Hz" },
    { name: "Indigo Mistico", hex: "#6366f1", frequency: "852 Hz" },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 mt-8">
      {colors.map((color, index) => (
        <motion.div
          key={index}
          className="group cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div
            className="h-16 rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl"
            style={{ backgroundColor: color.hex }}
          />
          <div className="mt-2 text-center">
            <p className="text-xs text-gray-300 font-medium">{color.name}</p>
            <p className="text-xs text-gray-400">{color.frequency}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Accordi visualizzati
const ChordVisualization = ({ chord }: { chord: string }) => {
  const chordData = {
    "Cmaj7": {
      notes: ["C", "E", "G", "B"],
      tensions: ["9", "13"],
      colors: ["#3b82f6", "#06b6d4", "#8b5cf6", "#ec4899"]
    }
  };

  const data = chordData[chord as keyof typeof chordData];

  return (
    <div className="flex items-center justify-center space-x-2 mt-6">
      {data?.notes.map((note, index) => (
        <motion.div
          key={index}
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg"
          style={{ backgroundColor: data.colors[index] }}
          whileHover={{ scale: 1.1, y: -5 }}
          transition={{ delay: index * 0.1 }}
        >
          {note}
        </motion.div>
      ))}
    </div>
  );
};

// Sezione frammenti
const FragmentsSection = () => {
  const fragments = [
    "Un'emozione è un accordo non risolto.",
    "Ogni silenzio è un preludio.",
    "Il colore è suono che ha imparato a farsi vedere.",
    "La musica è il linguaggio dell'anima.",
    "Ogni frequenza ha il suo colore interiore.",
    "Il vuoto contiene tutte le possibilità.",
    "L'armonia è matematica dell'emozione.",
    "Ogni nota è una porta verso l'inconscio."
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {fragments.map((fragment, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="p-6 rounded-lg bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/20 backdrop-blur-sm"
        >
          <p className="text-gray-200 text-sm font-light italic leading-relaxed">
            "{fragment}"
          </p>
        </motion.div>
      ))}
    </div>
  );
};

const DynamicCosmicPurpleBackground = React.memo(CosmicParticles);

const sections = [
  {
      id: "hero",
      title: "Decrypting Briele",
      subtitle: "Questa è la chiave di lettura. Trova il tuo significato.",
      icon: FiHome,
      content: null,
      visual: null,
  },
  {
      id: "frequencies",
      title: "Frequenze",
      icon: FiZap,
      content: `Tutto vibra. Anche noi.\nAlcune frequenze liberano, altre contengono.\nBriele crea paesaggi sonori che agiscono sulla mente: non musica da ascoltare, ma da abitare.\nÈ un lavoro di alchimia sonora.`,
      visual: <SineWaves />
  },
  {
      id: "harmony",
      title: "L'Armonia come linguaggio emotivo",
      icon: FiMusic,
      content: `Per Briele, l'armonia non è teoria. È colore.\n\nOgni accordo è un'emozione che prende forma.\n\nLe estensioni sono sfumature dell'anima,\nogni nota in più è un dettaglio emotivo. Ogni tensione, un battito in sospeso.`,
      visual: <ChordVisualization chord="Cmaj7" />
  },
  {
      id: "colors",
      title: "Colori come Frequenze Emotive",
      icon: FiDroplet,
      content: `I colori non sono estetica. Sono onde che toccano il subconscio.\nBriele lavora su una mappa che collega frequenze sonore a frequenze luminose.\nCome un pittore ha la sua tavolozza, così un compositore sceglie i suoi colori armonici.\nIl suo obiettivo è far incontrare suono e luce, farli parlare la stessa lingua.`,
      visual: <ColorPalette />
  },
  {
      id: "introspection",
      title: "Musicoterapia e Introspezione",
      icon: FiHeart,
      content: `Briele studia il suono come si studia una lingua antica.\nLe frequenze non sono solo vibrazioni nell'aria — sono correnti sottili che attraversano il corpo, modulano il respiro, riequilibrano stati d'animo che le parole non riescono a nominare.\n\nNella sua ricerca confluiscono musicoterapia, neuroscienze, emozione, intuizione.\n\nLa sua musica è un tentativo di tradurre ciò che sente nel profondo in un linguaggio vibrazionale che risuona con le frequenze stesse dell'universo.\nOgni armonia è una fotografia interiore. Ogni accordo una tensione che ha trovato il coraggio di suonare.\n\nChi ascolta, ascolta anche sé stesso.\nE trova, nelle onde, uno specchio.`,
      visual: <motion.p 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 2, delay: 1 }} 
                className="text-xl text-purple-300 font-light italic text-center mt-8">
                  "Non ti dico cosa provare, ti aiuto a riconoscerlo"
              </motion.p>
  },
  {
      id: "philosophy",
      title: "Filosofia e Simbolismo",
      icon: FiCompass,
      content: `Briele intreccia simbolismo junghiano, archetipi emotivi e sinestesia per creare un dialogo silenzioso con chi ascolta.\nDietro ogni testo c'è l'intento preciso di trasformare concetti complessi — filosofici, spirituali, scientifici — in parole semplici, dirette, quotidiane.\n\nPerché la profondità non ha bisogno di complicazioni.\nHa bisogno di verità.\n\nBriele non scrive canzoni.\nScrive specchi.\nE in ognuno, lascia una fessura aperta per chi ha il coraggio di guardarsi davvero.`,
      visual: null
  },
  {
      id: "spirituality",
      title: "Spiritualità e Silenzio",
      icon: FiEye,
      content: `Briele non cerca il sacro nella religione, ma nella presenza.\nNell'attesa.\nNel silenzio prima della nota.\nNella pausa che contiene tutte le possibilità.\nNel tutto e nel nulla.\nNella luce e nel buio.\nNel colore e nel nero profondo.\n\nBriele cerca il senso della vita nell'esperienza stessa del viverla.\nTanto nella gioia quanto nella sofferenza.\nPerché ogni emozione è parte del gioco.\nE ogni sfumatura merita ascolto.`,
      visual: null
  },
  {
      id: "fragments",
      title: "Frammenti",
      icon: FiGrid,
      content: null,
      visual: <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
              `"L'ansia è un Sol7(♭9♯9♭13) che non risolve mai su Do;"`,
              `"Ogni silenzio è un preludio."`,
              `"Il colore è suono visibile con gli occhi;"`,
              `"La musica è il linguaggio universale delle anime"`,
              `"Ogni nota è una pennellata sull'invisibile."`,
              `"Il vuoto contiene tutte le possibilità."`,
              `"L'armonia è matematica dell'emozione."`,
              `"Ogni nota è una porta verso l'inconscio."`
          ].map((fragment, index) => (
              <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                  <p className="text-sm text-white/80 font-light italic text-center">
                      {fragment}
                  </p>
              </motion.div>
          ))}
      </div>
  }
];

export default function BrielePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.9, 1],
    [1, 0.2, 0]
  );
  
  // CSS per l'animazione pulsante
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-glow {
        0%, 100% { 
          opacity: 0.6;
          transform: translate(-50%, -50%) scale(1);
        }
        50% { 
          opacity: 0.8;
          transform: translate(-50%, -50%) scale(1.05);
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-transparent min-h-screen text-white relative">
      {/* Sfondo dinamico con scroll */}
      <div className="fixed inset-0 -z-20 bg-[#05010a]" />
      <motion.div 
        className="fixed inset-0 -z-10"
        style={{ opacity: backgroundOpacity }}
      >
        <CosmicPurpleBackground />
      </motion.div>
      
      {/* Punto luce centrale statico */}
      <div className="fixed inset-0 -z-5 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full"
          style={{
            background: `
              radial-gradient(circle, 
                rgba(139, 92, 246, 0.08) 0%, 
                rgba(6, 182, 212, 0.05) 40%, 
                rgba(139, 92, 246, 0.02) 70%, 
                transparent 100%
              )
            `,
            filter: 'blur(60px)',
            animation: 'pulse-glow 6s ease-in-out infinite'
          }}
        />
      </div>

      <DeepMeter sections={sections} activeSection={activeSection} />
      
      <CosmicParticles />

      <main ref={containerRef} className="relative z-10 overflow-x-hidden">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8"
          >
            <SectionObserver index={index} setActiveSection={setActiveSection} />

            {/* Contenuto specifico per la sezione Hero */}
            {section.id === 'hero' ? (
              <div className="relative isolate px-6 pt-14 lg:px-8 text-center">
                <div className="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
                  <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl pb-2">
                    <motion.div
                      animate={{
                        filter: [
                          'drop-shadow(0 0 5px rgba(139, 92, 246, 0.4))',
                          'drop-shadow(0 0 15px rgba(139, 92, 246, 0.8))',
                          'drop-shadow(0 0 5px rgba(139, 92, 246, 0.4))',
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                    >
                      <DecryptedText 
                        text={section.title} 
                        className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
                      />
                    </motion.div>
                  </h1>
                  <p className="mt-6 text-lg leading-8 text-gray-300">
                    {section.subtitle}
                  </p>
                  <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
                    <a href="#frequencies" aria-label="Scroll to next section">
                      <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="text-white/70 hover:text-white transition-colors duration-300"
                      >
                        <FiArrowDown className="w-8 h-8" />
                      </motion.div>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              /* Contenuto per tutte le altre sezioni */
              <div className="max-w-4xl w-full space-y-8 text-center">
                <div className="flex justify-center">
                  {section.icon && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <section.icon className="w-12 h-12 text-cyan-400" />
                    </motion.div>
                  )}
                </div>
                <motion.h2
                  className="mt-6 text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 sm:text-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  {section.title}
                </motion.h2>
                <motion.p
                  className="mt-4 max-w-2xl mx-auto text-lg text-gray-300 whitespace-pre-line"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                >
                  {section.content}
                </motion.p>
                {section.visual && (
                  <motion.div
                    className="mt-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    {section.visual}
                  </motion.div>
                )}
              </div>
            )}
          </section>
        ))}
      </main>

      {/* Final Message */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.5 }}
        className="text-center py-20"
      >
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-2xl md:text-3xl font-light text-purple-200 italic"
        >
          "You're inside now."
        </motion.p>
      </motion.div>
    </div>
  );
} 