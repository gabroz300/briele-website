"use client";

import { motion } from "framer-motion";

const VideoSection = () => {
  return (
    <section id="video" className="py-20 px-4">
      <h2 className="text-5xl font-bold text-center mb-12 font-serif">Video</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/20 backdrop-blur-sm border border-purple-500/20">
          <iframe
            src="https://www.youtube.com/embed/fz4tdRQfeFM"
            title="Iceland - Ambient Journey"
            className="w-full aspect-video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="text-center mt-4">
          <h3 className="text-xl font-semibold text-white">Iceland - Ambient Journey</h3>
        </div>
      </motion.div>
    </section>
  );
};

export default VideoSection; 