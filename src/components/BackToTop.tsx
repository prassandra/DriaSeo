import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BackToTopProps {
  label?: string;
}

/**
 * Back to Top Button with Dynamic Circular Scroll Progress Ring
 * - As the user scrolls, the circular progress indicator fills up
 * - Upon reaching the bottom of the page, the circle animation completes 100% full
 * - Click smoothly animates user back to page top
 */
export const BackToTop: React.FC<BackToTopProps> = ({ label = 'Kembali ke Atas' }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const totalScroll = docHeight - windowHeight;

      if (totalScroll > 0) {
        // Snap to exactly 100% when close to the bottom (within 4px)
        const progress = scrollTop + windowHeight >= docHeight - 4
          ? 100
          : Math.min(100, Math.max(0, (scrollTop / totalScroll) * 100));
        
        setScrollProgress(progress);
        setIsVisible(scrollTop > 200);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG circular progress parameters
  const radius = 22;
  const circumference = 2 * Math.PI * radius; // ~138.23
  const strokeDashoffset = circumference - (circumference * scrollProgress) / 100;
  const isFull = scrollProgress >= 98;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          type="button"
          aria-label={label}
          title={`${label} (${Math.round(scrollProgress)}%)`}
          initial={{ opacity: 0, scale: 0.6, y: 24 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -4, 0],
          }}
          exit={{ opacity: 0, scale: 0.6, y: 24 }}
          whileHover={{
            scale: 1.12,
            y: -5,
            boxShadow: '0 12px 30px -4px rgba(16, 185, 129, 0.5)',
          }}
          whileTap={{ scale: 0.92 }}
          transition={{
            y: { repeat: Infinity, duration: 2.8, ease: 'easeInOut' },
            scale: { type: 'spring', stiffness: 400, damping: 25 },
            opacity: { duration: 0.2 },
          }}
          className="fixed bottom-24 sm:bottom-8 right-5 sm:right-6 z-40 w-12 h-12 rounded-full bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-xl shadow-slate-950/20 flex items-center justify-center cursor-pointer border border-slate-200/90 dark:border-slate-800 group focus:outline-hidden"
        >
          {/* Circular SVG Scroll Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5" viewBox="0 0 52 52">
            {/* Background Track */}
            <circle
              cx="26"
              cy="26"
              r={radius}
              className="stroke-slate-200 dark:stroke-slate-800"
              strokeWidth="3.5"
              fill="transparent"
            />
            {/* Dynamic Progress Stroke that fills to 100% when scrolled to bottom */}
            <circle
              cx="26"
              cy="26"
              r={radius}
              className={`transition-all duration-150 ease-out ${
                isFull
                  ? 'stroke-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.85)]'
                  : 'stroke-emerald-600 dark:stroke-emerald-400'
              }`}
              strokeWidth="3.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
            />
          </svg>

          {/* Center Inner Arrow Button */}
          <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            isFull 
              ? 'bg-emerald-600 text-white shadow-xs scale-105' 
              : 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white'
          }`}>
            <ArrowUp className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
