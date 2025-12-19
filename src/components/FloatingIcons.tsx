'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import Image from 'next/image';

// TODO: Reemplaza estos nombres con los nombres de tus archivos de imagen en la carpeta `public/icons/`
const iconFiles = [
  'birrete.png',
  'diploma.png',
  'libro.png',
  'copa.png',
  'estrella.png',
  'musica.png',
];

function FloatingIcon({ iconData }: { iconData: any }) {
  const { src, style } = iconData;
  const duration = useMemo(() => Math.random() * 8 + 7, []); // 7-15 seconds
  const delay = useMemo(() => Math.random() * 7, []); // 0-7 seconds
  const xStart = useMemo(() => Math.random() * 80 + 10, []); // 10-90%
  const xEnd = useMemo(() => Math.random() * 80 + 10, []); // 10-90%

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        ...style,
        left: `${xStart}%`,
        transform: 'translateX(-50%)',
        opacity: 0.8
      }}
      animate={{
        y: ['-10vh', '110vh'],
        x: [`${xStart}%`, `${xEnd}%`],
        rotate: [0, Math.random() > 0.5 ? 180 : -180],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      }}
    >
      <div className="relative w-8 h-8 md:w-12 md:h-12" style={{ filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.3))' }}>
        <Image src={src} alt="" layout="fill" objectFit="contain" />
      </div>
    </motion.div>
  );
}

export function FloatingIcons() {
  const icons = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const iconFile = iconFiles[i % iconFiles.length];
      return {
        id: i,
        src: `/icons/${iconFile}`, // Las imágenes deben estar en la carpeta `public/icons/`
        style: {
          top: '-10vh'
        },
      };
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {icons.map((iconData) => (
        <FloatingIcon key={iconData.id} iconData={iconData} />
      ))}
    </div>
  );
}
