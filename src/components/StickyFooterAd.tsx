import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface StickyFooterAdProps {
  client?: string;
  slot?: string;
  isHidden?: boolean;
}

/**
 * Responsive Sticky Footer Header Ad
 * - Fixed bottom-0 left-0 right-0 z-40
 * - Centered collapse button with smooth translation
 * - Filled with Header Ad Slot 5462390377
 * - Sized immediately so AdSense measures real dimensions and serves the ad
 */
export const StickyFooterAd: React.FC<StickyFooterAdProps> = ({
  client = 'ca-pub-2212969526982215',
  slot = '5462390377', // Matched with Header Ad slot
  isHidden = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isUnfilled, setIsUnfilled] = useState(false);
  const adRef = useRef<HTMLModElement | null>(null);
  const hasPushed = useRef(false);

  // Push to AdSense queue on mount
  useEffect(() => {
    if (!hasPushed.current && typeof window !== 'undefined') {
      try {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        hasPushed.current = true;
      } catch {
        // Silently handled
      }
    }
  }, []);

  // Monitor AdSense unfilled status to cleanly collapse if unfilled
  useEffect(() => {
    if (!adRef.current) return;

    const checkStatus = () => {
      const el = adRef.current;
      if (!el) return;

      const status = el.getAttribute('data-ad-status');
      if (status === 'unfilled') {
        setIsUnfilled(true);
      }
    };

    checkStatus();
    const observer = new MutationObserver(checkStatus);
    observer.observe(adRef.current, {
      attributes: true,
      attributeFilter: ['data-ad-status'],
    });

    return () => observer.disconnect();
  }, []);

  if (isHidden || isUnfilled) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
        isOpen
          ? 'translate-y-0 opacity-100'
          : 'translate-y-[calc(100%-32px)] opacity-100'
      }`}
      aria-label="Responsive Sticky Footer Header Ad"
    >
      {/* Center Toggle Pill Button */}
      <div className="flex justify-center -mb-px">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="px-6 py-1.5 rounded-t-xl bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-md border-t border-x border-slate-200/80 dark:border-slate-800 shadow-md text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5 transition-all cursor-pointer select-none text-xs font-semibold"
          title={isOpen ? 'Sembunyikan iklan' : 'Tampilkan iklan'}
          aria-expanded={isOpen}
        >
          <span>Iklan</span>
          {isOpen ? (
            <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          ) : (
            <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          )}
        </button>
      </div>

      {/* Ad Bar Body with Clean Edge-to-Edge Responsive Fit */}
      <div className="bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80 shadow-2xl py-1 sm:py-1.5 px-0 sm:px-2">
        <div className="w-full max-w-5xl mx-auto flex items-center justify-center overflow-hidden">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
            }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    </div>
  );
};
