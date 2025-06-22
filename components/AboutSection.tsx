"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import DecryptedText from "./DecryptedText";

// Particelle animate per l'effetto cosmico
const AnimatedParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

// Onde animate per il background
const AnimatedWaves = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

const AboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const sections = [
    {
      id: "vision",
      title: "Visione Artistica",
      content: `Briele è un artista che traduce emozioni in onde. Le sue canzoni non spiegano: suggeriscono.  
Non canta per raccontarti una verità, ma per attivare la tua.

Ogni brano è una mappa emotiva: fatta di luci, fratture e silenzi pieni.  
Ogni suono è un codice. Tu sei l'interprete.`,
    },
    {
      id: "origins",
      title: "Origini Interiori",
      content: `Cresciuto tra armonie inquiete e sogni lucidi, ha imparato presto che la musica è un linguaggio più preciso delle parole.

Nelle sue produzioni convivono spiritualità e concretezza, struttura e abbandono. È arte che respira, e che ascolta.`,
    },
    {
      id: "invitation",
      title: "Invito",
      content: `Qui non troverai certezze, ma frammenti.  
Tracce di qualcosa che si sta formando. Di qualcuno che si sta rivelando.

*Benvenutə nella decodifica.*`,
    },
  ];

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/50 to-blue-900/30 overflow-hidden"
    >
      {/* Background Effects */}
      <AnimatedWaves />
      <AnimatedParticles />
      
      {/* Noise Grain Effect */}
      <div className="absolute inset-0 opacity-5 mix-blend-overlay">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            <DecryptedText
              text="Briele"
              speed={100}
              maxIterations={20}
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
              animateOn="view"
              revealDirection="center"
            />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed"
          >
            Una mente fatta di silenzi, sinapsi sonore e battiti fuori tempo.
            <br />
            <span className="text-purple-300">Ogni click, ogni scroll… è un passo in più dentro.</span>
          </motion.p>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-32">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut",
                delay: index * 0.3 
              }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-300 mb-4">
                  {section.title}
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full" />
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="prose prose-lg prose-invert mx-auto text-center"
              >
                <div className="text-gray-200 leading-relaxed space-y-6 text-lg md:text-xl">
                  {section.content.split('\n\n').map((paragraph, pIndex) => (
                    <motion.p
                      key={pIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: pIndex * 0.2 }}
                      className="font-light"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5 }}
          className="text-center mt-32 mb-20"
        >
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-2xl md:text-3xl font-light text-purple-200 italic"
          >
            "You're inside now."
          </motion.p>
        </motion.div>

        {/* Memory Slots */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-20"
        >
          {[
            { caption: "Frequenza", color: "from-purple-400 to-pink-400" },
            { caption: "Corpo", color: "from-blue-400 to-cyan-400" },
            { caption: "Ombra", color: "from-indigo-400 to-purple-400" },
          ].map((slot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div className={`h-64 rounded-lg bg-gradient-to-br ${slot.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300 flex items-center justify-center`}>
                <span className="text-white/60 text-lg font-medium">
                  {slot.caption}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection; 