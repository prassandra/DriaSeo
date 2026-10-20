import React from 'react';

interface FlagProps {
  className?: string;
}

/**
 * High-definition SVG Flag for Indonesia
 * Guaranteed to render crisply on all operating systems (Windows, Mac, Linux, Android, iOS)
 */
export const IndonesiaFlag: React.FC<FlagProps> = ({ className = 'w-4 h-3' }) => (
  <svg
    viewBox="0 0 640 480"
    className={`inline-block rounded-xs shadow-2xs shrink-0 overflow-hidden border border-slate-300/60 dark:border-slate-700/60 align-middle ${className}`}
    aria-hidden="true"
  >
    <rect width="640" height="240" fill="#e70011" />
    <rect y="240" width="640" height="240" fill="#ffffff" />
  </svg>
);

/**
 * High-definition SVG Flag for United States / English
 * Guaranteed to render crisply on all operating systems (Windows, Mac, Linux, Android, iOS)
 */
export const USAFlag: React.FC<FlagProps> = ({ className = 'w-4 h-3' }) => (
  <svg
    viewBox="0 0 640 480"
    className={`inline-block rounded-xs shadow-2xs shrink-0 overflow-hidden border border-slate-300/60 dark:border-slate-700/60 align-middle ${className}`}
    aria-hidden="true"
  >
    <g fill="#bf0a30">
      <rect width="640" height="480" fill="#fff" />
      <path d="M0 0h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0zm0 74h640v37H0z" />
    </g>
    <rect width="260" height="260" fill="#002868" />
    <g fill="#fff">
      <circle cx="35" cy="35" r="7" />
      <circle cx="95" cy="35" r="7" />
      <circle cx="155" cy="35" r="7" />
      <circle cx="215" cy="35" r="7" />
      <circle cx="65" cy="75" r="7" />
      <circle cx="125" cy="75" r="7" />
      <circle cx="185" cy="75" r="7" />
      <circle cx="35" cy="115" r="7" />
      <circle cx="95" cy="115" r="7" />
      <circle cx="155" cy="115" r="7" />
      <circle cx="215" cy="115" r="7" />
      <circle cx="65" cy="155" r="7" />
      <circle cx="125" cy="155" r="7" />
      <circle cx="185" cy="155" r="7" />
      <circle cx="35" cy="195" r="7" />
      <circle cx="95" cy="195" r="7" />
      <circle cx="155" cy="195" r="7" />
      <circle cx="215" cy="195" r="7" />
      <circle cx="65" cy="235" r="7" />
      <circle cx="125" cy="235" r="7" />
      <circle cx="185" cy="235" r="7" />
    </g>
  </svg>
);
