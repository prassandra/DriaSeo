import React, { useEffect, useRef, useState } from 'react';

interface SidebarLazyAdProps {
  client?: string;
  slot?: string;
  className?: string;
}

/**
 * 300x250 Medium Rectangle Ad with Lazy Loading
 * - Official slot: 1116459861
 * - Uses IntersectionObserver to trigger adsbygoogle.push only when near viewport
 * - Crisp 300x250 dimensions matching AdSense guidelines
 */
export const SidebarLazyAd: React.FC<SidebarLazyAdProps> = ({
  client = 'ca-pub-2212969526982215',
  slot = '1116459861',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const adRef = useRef<HTMLModElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasRequested = useRef(false);
  const [isUnfilled, setIsUnfilled] = useState(false);

  // Lazy loading observer: only render and request ad when close to viewport
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '250px 0px', // Trigger 250px before entering viewport for seamless render
        threshold: 0.01,
      }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Once visible, push to AdSense queue
  useEffect(() => {
    if (!isVisible || hasRequested.current || typeof window === 'undefined') return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      hasRequested.current = true;
    } catch {
      // Catch in dev or when adblocker is present
    }
  }, [isVisible]);

  // Monitor unfilled status to hide gracefully if unfilled
  useEffect(() => {
    if (!adRef.current) return;

    const checkStatus = () => {
      const el = adRef.current;
      if (!el) return;
      if (el.getAttribute('data-ad-status') === 'unfilled') {
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
  }, [isVisible]);

  if (isUnfilled) return null;

  return (
    <div
      ref={containerRef}
      className={`w-[300px] h-[250px] shrink-0 mx-auto overflow-hidden flex items-center justify-center transition-opacity duration-300 ${className}`}
    >
      {isVisible ? (
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{
            display: 'inline-block',
            width: '300px',
            height: '250px',
            textAlign: 'center',
          }}
          data-ad-client={client}
          data-ad-slot={slot}
        />
      ) : (
        // Lightweight neutral skeleton while waiting to be scrolled into view
        <div className="w-[300px] h-[250px] bg-slate-100/40 dark:bg-slate-800/20 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-600 text-xs select-none">
          <span className="font-semibold text-[11px] tracking-wider uppercase opacity-50">Iklan 300 × 250</span>
        </div>
      )}
    </div>
  );
};
