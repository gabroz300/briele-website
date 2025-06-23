"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import DecryptedText from "@/components/DecryptedText";
import { FiArrowDown, FiMusic, FiDroplet, FiZap, FiHeart, FiEye, FiCompass, FiGrid, FiHome } from "react-icons/fi";
import Link from "next/link";
import { useInView } from 'react-intersection-observer';
import React from "react";
import CosmicPurpleBackground from "@/components/CosmicPurpleBackground";
import { useTranslations } from "next-intl";

const getSections = (t: (key: string) => string) => [
  { id: 'hero', title: t('section_title_9'), subtitle: t('p1') + " " + t('p2') + " " + t('p3') + " " + t('p4'), icon: FiHome, content: null, visual: null },
  { id: 'frequencies', title: t('section_title_4'), icon: FiHeart, content: "Ogni elemento dell'universo, visibile o invisibile, vibra a una propria frequenza. La musica di Briele è una traduzione emotiva di queste vibrazioni, un ponte tra il mondo fisico e quello spirituale.", visual: <div className="w-full h-64 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg" /> },
  { id: 'colors', title: t('section_title_2'), icon: FiDroplet, content: "I colori sono la manifestazione visibile delle frequenze. Nel progetto Briele, ogni traccia è associata a una palette cromatica specifica, studiata per amplificare l'impatto emotivo della musica.", visual: <div className="w-full h-64 bg-red-500" /> },
  { id: 'light', title: t('section_title_3'), icon: FiZap, content: "La luce è energia, informazione. È il veicolo attraverso cui i colori e le frequenze si rivelano. Le performance live di Briele sono un bagno di luce, un'immersione totale in un paesaggio visivo che danza in sincrono con la musica.", visual: <div className="w-full h-64 bg-yellow-500" /> },
  { id: 'emotions', title: t('section_title_5'), icon: FiEye, content: "Le emozioni sono il linguaggio universale che Briele utilizza per comunicare. Ogni composizione è un'esplorazione di uno stato d'animo, un invito a connettersi con la parte più profonda di sé.", visual: <div className="w-full h-64 bg-green-500" /> },
  { id: 'perception', title: t('section_title_6'), icon: FiCompass, content: "Briele sfida i limiti della percezione sensoriale, spingendo l'ascoltatore a 'vedere' i suoni e 'sentire' i colori. Un'esperienza sinestetica che apre la mente a nuove realtà.", visual: <div className="w-full h-64 bg-blue-500" /> },
  { id: 'connection', title: t('section_title_7'), icon: FiGrid, content: "Siamo tutti connessi. Le frequenze, i colori, la luce, le emozioni, sono fili invisibili che ci legano gli uni agli altri e all'universo. La musica di Briele è una celebrazione di questa connessione universale.", visual: <div className="w-full h-64 bg-indigo-500" /> },
  { id: 'universe', title: t('section_title_8'), icon: FiHome, content: "L'universo è un'immensa sinfonia di frequenze. Briele è un tentativo di catturare un frammento di questa melodia cosmica e di condividerla con il mondo.", visual: <div className="w-full h-64 bg-violet-500" /> }
];

interface ScrollObserverInstance {
  ref: React.RefObject<HTMLDivElement>;
  inView: boolean;
}

const SectionObserver = ({ index, setActiveSection }: { index: number; setActiveSection: (index: number) => void; }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection(index);
    }
  }, [inView, index, setActiveSection]);

  return <div ref={ref} className="absolute top-1/2 w-full h-px" />;
};

const DeepMeter = ({ sections, activeSection }: { sections: typeof sections, activeSection: number }) => {
  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-4">
      <div className="text-white uppercase text-xs font-bold tracking-widest [writing-mode:vertical-rl]">Briele</div>
      <div className="w-px h-48 bg-white/20 relative">
        <motion.div
          className="w-px bg-cyan-400 absolute top-0"
          initial={{ height: 0 }}
          animate={{ height: `${(activeSection + 1) / sections.length * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      <div className="w-5 h-5 rounded-full border-2 border-cyan-400 bg-black flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-cyan-400" />
      </div>
    </div>
  );
};

const CosmicParticles = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none">
    {/* Implementazione particelle */}
  </div>
);

const BrielePage = () => {
  const t = useTranslations('BrielePage');
  const sections = getSections(t);
  
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
};

export default BrielePage; 