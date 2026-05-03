'use client';

import { motion } from 'motion/react';

export default function ClientLogoSlider({ partners }: { partners: string[] }) {
  if (!partners || partners.length === 0) return null;

  return (
    <motion.div 
      className="flex w-max"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
    >
      {/* First set */}
      <div className="flex items-center gap-16 md:gap-32 px-8 md:px-16 opacity-60">
        {partners.map((partner, i) => (
          <div key={`p1-${i}`} className="text-2xl font-black text-[var(--border)]">{partner}</div>
        ))}
      </div>
      {/* Second set (duplicate for seamless loop) */}
      <div className="flex items-center gap-16 md:gap-32 px-8 md:px-16 opacity-60">
        {partners.map((partner, i) => (
          <div key={`p2-${i}`} className="text-2xl font-black text-gray-300">{partner}</div>
        ))}
      </div>
    </motion.div>
  );
}