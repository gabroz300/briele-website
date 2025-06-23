"use client";

import Link from 'next/link';
import { FiHome, FiUnlock, FiUser, FiInstagram, FiYoutube, FiMusic } from 'react-icons/fi';
import { FaTiktok, FaSpotify } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import {useTranslations} from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const socialLinks = [
  { icon: FiInstagram, href: "https://www.instagram.com/briele.briele/" },
  { icon: FaTiktok, href: "https://www.tiktok.com/@briele.briele?_t=ZN-8xN1nb543BG&_r=1" },
  { icon: FaSpotify, href: "https://open.spotify.com/intl-it/artist/5ZFTJe4kIAbFdRsawVky5Z?si=hx22fHHyRUqVTKuFe1oyAw" },
  { icon: FiYoutube, href: "https://www.youtube.com/channel/UC_y1O_RVurvqWq-6appchWQ" },
];

const NavLink = ({ href, label, isActive }: { href: string, label: string, isActive: boolean }) => (
  <Link href={href} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
    isActive ? 'text-white bg-white/10' : 'text-gray-300 hover:bg-white/5 hover:text-white'
  }`}>
    {label}
  </Link>
);

const SocialLink = ({ href, icon: Icon }: { href: string; icon: React.ElementType }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
    <Icon size={24} />
  </a>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations('Header');
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: t('home'), icon: FiHome },
    { href: '/briele', label: t('briele'), icon: FiUnlock },
    { href: '/discografia', label: t('discography'), icon: FiMusic },
    { href: '/gabriele-dagostino', label: t('gabriele'), icon: FiUser },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white">
              BRIELE
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <NavLink 
                key={link.href} 
                href={link.href} 
                label={link.label}
                isActive={pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))}
              />
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <LanguageSwitcher />
            <button
              onClick={toggleMenu}
              className="ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                      ? 'text-white bg-white/10'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 