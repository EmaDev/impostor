'use client';

import { motion } from 'framer-motion';
import { Award, Cake, Mic, Music, Star, Gift } from 'lucide-react';
import { useMemo } from 'react';

const iconConfig = [
  { icon: Award, color: 'text-yellow-400' },
  { icon: Cake, color: 'text-pink-400' },
  { icon: Mic, color: 'text-blue-400' },
  { icon: Music, color: 'text-purple-400' },
  { icon: Star, color: 'text-yellow-300' },
  { icon: Gift, color: 'text-red-400' },
];

function FloatingIcon({ iconData }: { iconData: any }) {
  const { icon: Icon, color, style } = iconData;
  const duration = useMemo(() => Math.random() * 5 + 5, []); // 5-10 seconds
  const delay = useMemo(() => Math.random() * 5, []); // 0-5 seconds
  const xStart = useMemo(() => Math.random() * 80 + 10, []); // 10-90%
  const xEnd = useMemo(() => Math.random() * 80 + 10, []); // 10-90%

  return (
    <motion.div
      className="pointer-events-none absolute"
      style={{
        ...style,
        left: `${xStart}%`,
        transform: 'translateX(-50%)',
        opacity: 0.7
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
      <Icon className={`w-8 h-8 md:w-12 md:h-12 ${color}`} style={{ filter: 'drop-shadow(0 0 5px currentColor)' }}/>
    </motion.div>
  );
}

export function FloatingIcons() {
  const icons = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const config = iconConfig[i % iconConfig.length];
      return {
        ...config,
        id: i,
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
