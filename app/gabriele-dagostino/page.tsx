import React from 'react';
import { FiUser, FiBookOpen, FiTool, FiMail, FiStar, FiCode, FiTrendingUp, FiGlobe } from 'react-icons/fi';
import { ContactForm } from '../../components/ContactForm';
import { CosmicParticles } from '../../components/CosmicParticles';
import Link from 'next/link';
import { MotionDiv } from '../../components/MotionDiv';

const Section = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <MotionDiv
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, ease: 'easeOut' }}
    className={`w-full max-w-4xl mx-auto px-6 py-12 md:py-16 ${className}`}
  >
    {children}
  </MotionDiv>
);

const SectionTitle = ({ icon: Icon, title }: { icon: React.ElementType, title: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <Icon className="w-8 h-8 text-cyan-400" />
    <h2 className="text-3xl font-bold text-white tracking-tight">{title}</h2>
  </div>
);

const SkillCard = ({ title, content }: { title: string, content: React.ReactNode }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:border-white/20">
    <h3 className="text-xl font-semibold text-purple-300 mb-3">{title}</h3>
    <div className="text-gray-300 space-y-2 font-light">{content}</div>
  </div>
);

export default function GabrieleDagostinoPage() {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="fixed inset-0 -z-20 bg-[#05010a]" />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#1a1129] to-[#05010a]" />
      <CosmicParticles />

      <main className="relative z-10 flex flex-col items-center">
        <header className="w-full text-center py-24 md:py-32">
          <MotionDiv 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              Gabriele D'Agostino
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-gray-300 font-light tracking-wider">
              Producer – Composer – Developer
            </p>
          </MotionDiv>
        </header>

        <Section>
          <SectionTitle icon={FiUser} title="Profilo" />
          <div className="space-y-4 text-lg text-gray-200 leading-relaxed font-light border-l-2 border-cyan-400/50 pl-6">
            <p>Gabriele D'Agostino è un artista e produttore multidisciplinare nato nel 2002.</p>
            <p>Attivo sotto il nome artistico "Briele", si muove tra musica, tecnologia e linguaggio visivo, con una forte attenzione alla dimensione emozionale e percettiva.</p>
            <p>Il suo percorso fonde formazione classica, ricerca personale e una laurea in Music Production conseguita presso la University of Chichester – Sonus Factory.</p>
            <p>Si occupa di scrittura, produzione, mix, sound design, sviluppo software e comunicazione strategica.</p>
            <p>Il suo lavoro è un dialogo tra emozione, frequenza e forma: una sintesi personale che trasforma complessità interiori in esperienze condivisibili.</p>
          </div>
        </Section>
        
        <Section>
          <SectionTitle icon={FiBookOpen} title="Formazione" />
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <FiStar className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white">Bachelor of Arts in Popular Music – Music Production</h3>
                <p className="text-gray-400">University of Chichester – Sonus Factory Roma (2022–2025)</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <FiStar className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-white">Maturità Classica</h3>
                <p className="text-gray-400">Liceo "P. Galluppi" (2021)</p>
              </div>
            </li>
          </ul>
        </Section>

        <Section>
          <SectionTitle icon={FiTool} title="Competenze" />
          <div className="grid md:grid-cols-2 gap-8">
            <SkillCard title="Produzione Musicale" content={
              <p>Composizione, arrangiamento, registrazione, editing, mix e mastering. Utilizzo professionale di Logic Pro, Komplete, Waves, FabFilter, Omnisphere, Keyscape, e altri strumenti.</p>
            } />
            <SkillCard title="Sviluppo e Tecnologie Creative" content={
              <>
                <p>Esperienza in sviluppo con Python, Next.js e React.</p>
                <p>Ha realizzato software originali per la visualizzazione in tempo reale di musica tramite luce e colore, integrando intelligenza artificiale, frequenze e concetti psicologici.</p>
              </>
            } />
            <SkillCard title="Project & Content Management" content={
              <p>Scrittura creativa, coordinamento tecnico, gestione di progetti complessi, branding, copywriting, storytelling e strategia digitale.</p>
            } />
            <SkillCard title="Lingue" content={
              <ul className="list-disc list-inside">
                <li>Italiano (madrelingua)</li>
                <li>Inglese (ottimo)</li>
              </ul>
            } />
          </div>
        </Section>

        <Section>
          <SectionTitle icon={FiMail} title="Contatti" />
          <ContactForm />
        </Section>
        
        <footer className="py-12 text-center text-gray-500">
           <Link href="/" className="hover:text-white transition-colors">
              Torna alla Home
           </Link>
        </footer>
      </main>
    </div>
  );
} 