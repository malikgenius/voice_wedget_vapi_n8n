'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

export const Marquee = ({ items, speed = 25, className = "" }: MarqueeProps) => {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!mounted) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="flex items-center space-x-12 py-2">
          <div className="text-gray-300 font-semibold text-base">Loading features...</div>
        </div>
      </div>
    );
  }

  // Create enough duplicates for seamless loop
  const duplicatedItems = [...items, ...items];

  const itemWidth = isMobile ? 200 : 250;

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="relative">
        <motion.div
          className="flex items-center space-x-6 sm:space-x-12 py-2"
          animate={{
            x: [`0px`, `-${items.length * itemWidth}px`],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
            },
          }}
          style={{ 
            width: `${duplicatedItems.length * itemWidth}px`,
          }}
        >
          {duplicatedItems.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex-shrink-0 text-gray-200 font-medium text-xs sm:text-sm tracking-wide"
              style={{ 
                minWidth: `${itemWidth}px`,
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};