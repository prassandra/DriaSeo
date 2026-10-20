import React, { useEffect, useRef, useState } from 'react';

export type AdSlotType =
  | 'top-billboard'
  | 'below-input-native'
  | 'mid-results'
  | 'in-feed'
  | 'sidebar'
  | 'skyscraper'
  | 'multiplex'
  | 'pre-footer-banner'
  | 'split-grid'
  | 'sticky-bottom-anchor'
  | 'bottom-banner'
  | 'in-page-responsive';

interface AdSenseBannerProps {
  type?: AdSlotType;
  client?: string;
  slot?: string;
  className?: string;
  isHidden?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

/**
 * High-CTR AdSenseBanner Component
 * - All slots utilize official Header Ad Slot 5462390377
 * - Sized with full responsive width and min-height 60px-90px so AdSense renders immediately
 * - Only collapses if AdSense explicitly returns data-ad-status="unfilled"
 */
export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({
  type = 'top-billboard',
  client = 'ca-pub-2212969526982215',
  slot = '5462390377', // Default all slots to verified Header Ad Unit
  className = '',
  isHidden = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const adRef = useRef<HTMLModElement | null>(null);
  const hasRequested = useRef(false);
  const [isUnfilled, setIsUnfilled] = useState(false);

  // Push to AdSense queue on mount once container is rendered in DOM
  useEffect(() => {
    if (hasRequested.current || typeof window === 'undefined') return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      hasRequested.current = true;
    } catch {
      // Silently caught in dev or when adblocker is present
    }
  }, []);

  // Monitor AdSense unfilled status to cleanly collapse if no bid is returned
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
  }, []);

  if (isHidden || isUnfilled) return null;

  // Dedicated 300x250 Sidebar Rectangle Ad Slot (High-CTR desktop sidebar)
  if (type === 'sidebar') {
    return (
      <div
        ref={containerRef}
        className={`w-[300px] min-h-[250px] mx-auto overflow-hidden flex items-center justify-center ${className}`}
      >
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
          data-ad-format="rectangle"
        />
      </div>
    );
  }

  // Render clean, full-width responsive ad slot without restrictive internal padding or double-borders
  return (
    <div
      ref={containerRef}
      className={`w-full max-w-5xl mx-auto my-3 sm:my-4 px-0 overflow-hidden flex items-center justify-center ${className}`}
    >
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
  );
};
