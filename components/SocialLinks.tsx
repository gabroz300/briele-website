"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaInstagram,
  FaTiktok,
  FaSpotify,
  FaYoutube,
} from "react-icons/fa";

// Link reali dei profili social
const socialLinksData = [
  { icon: FaInstagram, href: "https://www.instagram.com/briele.briele/" },
  { icon: FaTiktok, href: "https://www.tiktok.com/@briele.briele?_t=ZN-8xN1nb543BG&_r=1" },
  { icon: FaSpotify, href: "https://open.spotify.com/intl-it/artist/5ZFTJe4kIAbFdRsawVky5Z?si=hx22fHHyRUqVTKuFe1oyAw" },
  { icon: FaYoutube, href: "https://www.youtube.com/channel/UC_y1O_RVurvqWq-6appchWQ" },
  // TODO: Aggiungere link per Apple Music e Amazon Music se necessario
];

const SocialLinks = () => {
  return (
    <section id="socials" className="py-20 px-4">
      {/* <h2 className="text-5xl font-bold text-center mb-12">Social</h2> */}
      <div className="flex justify-center items-center gap-6 md:gap-8">
        {socialLinksData.map((social, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.2, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link href={social.href} target="_blank" rel="noopener noreferrer" className="text-4xl md:text-5xl text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors">
              <social.icon />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SocialLinks; 