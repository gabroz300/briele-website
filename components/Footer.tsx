import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-10 px-4 text-center border-t border-gray-700">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/gabriele-dagostino" 
          className="block group cursor-pointer mb-4 p-4 rounded-lg border border-white/20 bg-white/5 animate-pulse-glow hover:scale-105 transition-all duration-300"
        >
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
            Gabriele d'Agostino
          </h3>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            è un artista, producer e songwriter italiano, attivo nella ricerca tra musica, emozione e tecnologia.
          </p>
        </Link>
        <div className="mb-4">
          <a
            href="mailto:info@brielebriele.com"
            className="text-primary hover:underline"
          >
            info@brielebriele.com
          </a>
        </div>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Gabriele d'Agostino. Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 