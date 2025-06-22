"use client";

import Link from 'next/link';
import { FiHome, FiUnlock, FiUser, FiInstagram, FiYoutube, FiMusic } from 'react-icons/fi';
import { FaTiktok, FaSpotify } from "react-icons/fa";
import { usePathname } from 'next/navigation';

const socialLinks = [
  { icon: FiInstagram, href: "https://www.instagram.com/briele.briele/" },
  { icon: FaTiktok, href: "https://www.tiktok.com/@briele.briele?_t=ZN-8xN1nb543BG&_r=1" },
  { icon: FaSpotify, href: "https://open.spotify.com/intl-it/artist/5ZFTJe4kIAbFdRsawVky5Z?si=hx22fHHyRUqVTKuFe1oyAw" },
  { icon: FiYoutube, href: "https://www.youtube.com/channel/UC_y1O_RVurvqWq-6appchWQ" },
];

const NavLink = ({ href, icon: Icon, isActive }: { href: string; icon: React.ElementType; isActive: boolean }) => (
  <Link href={href}>
    <div className={`p-2 rounded-full transition-all duration-300 ${isActive ? 'bg-white/20 text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
      <Icon size={22} />
    </div>
  </Link>
);

const SocialLink = ({ href, icon: Icon }: { href: string; icon: React.ElementType }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
    <Icon size={24} />
  </a>
);


const Header = () => {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', icon: FiHome, label: 'Home' },
    { href: '/briele', icon: FiUnlock, label: 'Briele' },
    { href: '/gabriele-dagostino', icon: FiUser, label: 'Gabriele D\'Agostino' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="w-full flex justify-between items-center">
        {/* Navigazione a sinistra */}
        <nav className="flex items-center gap-3">
          {navLinks.map(link => (
            <NavLink key={link.href} href={link.href} icon={link.icon} isActive={pathname === link.href} />
          ))}
        </nav>

        {/* Social a destra */}
        <div className="flex items-center gap-5">
          {socialLinks.map((link, index) => (
            <SocialLink key={index} href={link.href} icon={link.icon} />
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header; 