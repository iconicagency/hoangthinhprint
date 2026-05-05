'use client';

import { motion } from 'motion/react';

export default function ClientLogoSlider({ partners }: { partners: { name: string, logo?: string }[] }) {
  if (!partners || partners.length === 0) return null;

  return (
    <motion.div 
      className="flex w-max"
      animate={{ x: ["0%", "-50%"] }}
      transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
    >
      {/* First set */}
      <div className="flex items-center gap-16 md:gap-32 px-8 md:px-16">
        {partners.map((partner, i) => (
          <div key={`p1-${i}`} className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            {partner.logo ? (
              <img src={partner.logo} alt={partner.name} className="h-12 md:h-16 w-auto object-contain max-w-[150px]" />
            ) : (
              <div className="text-2xl font-black text-[var(--border)] whitespace-nowrap">{partner.name}</div>
            )}
          </div>
        ))}
      </div>
      {/* Second set (duplicate for seamless loop) */}
      <div className="flex items-center gap-16 md:gap-32 px-8 md:px-16">
        {partners.map((partner, i) => (
          <div key={`p2-${i}`} className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
            {partner.logo ? (
              <img src={partner.logo} alt={partner.name} className="h-12 md:h-16 w-auto object-contain max-w-[150px]" />
            ) : (
              <div className="text-2xl font-black text-[var(--border)] whitespace-nowrap">{partner.name}</div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}