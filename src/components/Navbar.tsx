import React, { useState, useRef, useEffect } from 'react';
import { 
  ExternalLink, 
  Globe, 
  Sparkles, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ChevronDown, 
  Download, 
  RefreshCw, 
  Wrench,
  Check,
  Type,
  Scissors
} from 'lucide-react';
import { Language, Translations } from '../i18n';
import { IndonesiaFlag, USAFlag } from './Flags';

export type FontSizeOption = 'small' | 'normal' | 'large';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  onSelectLang?: (lang: Language) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  fontSize: FontSizeOption;
  onChangeFontSize: (size: FontSizeOption) => void;
  t: Translations;
  mobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
  onCloseMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  onSelectLang,
  isDark,
  onToggleTheme,
  fontSize,
  onChangeFontSize,
  t,
  mobileMenuOpen: controlledMobileOpen,
  onToggleMobileMenu,
  onCloseMobileMenu,
}) => {
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const fontDropdownRef = useRef<HTMLDivElement | null>(null);
  const langDropdownRef = useRef<HTMLDivElement | null>(null);

  // Subtle header scroll elevation listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside listener for font and language dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (fontDropdownRef.current && !fontDropdownRef.current.contains(target)) {
        setFontDropdownOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(target)) {
        setLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isMobileMenuOpen = controlledMobileOpen !== undefined ? controlledMobileOpen : internalMobileOpen;

  const handleToggleMobile = () => {
    if (onToggleMobileMenu) {
      onToggleMobileMenu();
    } else {
      setInternalMobileOpen(!internalMobileOpen);
    }
  };

  const closeMobileMenu = () => {
    if (onCloseMobileMenu) {
      onCloseMobileMenu();
    } else {
      setInternalMobileOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-slate-900/95 shadow-md shadow-slate-900/5 dark:shadow-black/25 border-b border-slate-200/90 dark:border-slate-800' 
        : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        
        {/* Brand: DriaSeo with 'by Driacom' underneath (Professional Modern Logo) */}
        <a href="#" className="flex items-center gap-2.5 group shrink-0 select-none">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-linear-to-br from-emerald-600 via-teal-600 to-cyan-700 p-0.5 shadow-md shadow-emerald-900/15 group-hover:shadow-emerald-700/25 group-hover:scale-105 transition-all">
            <div className="w-full h-full bg-slate-950/20 backdrop-blur-xs rounded-[10px] flex items-center justify-center p-1.5">
              {/* Premium Geometric SEO Authority Icon */}
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white" strokeWidth="2.2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5l4-4 4 4 6-6m4 0h-4m4 0v4" />
                <circle cx="7" cy="9.5" r="1.5" fill="currentColor" />
                <circle cx="11" cy="13.5" r="1.5" fill="currentColor" />
                <circle cx="17" cy="7.5" r="1.5" fill="currentColor" />
                <path strokeLinecap="round" d="M3 20.5h18" strokeOpacity="0.6" strokeWidth="1.8" />
              </svg>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-white dark:border-slate-900" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
              Dria<span className="text-emerald-700 dark:text-emerald-400">Seo</span>
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold tracking-wide leading-tight mt-0.5 flex items-center gap-1">
              by <span className="text-emerald-700 dark:text-emerald-400 font-extrabold">Driacom</span>
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
          <a href="#checker-tool" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
            {t.nav.checkMetric}
          </a>
          <a href="#jasa-seo" className="hover:text-emerald-700 dark:hover:text-emerald-400 text-emerald-800 dark:text-emerald-400 font-bold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.nav.services}</span>
          </a>
          <a href="#panduan-seo" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
            {t.nav.guide}
          </a>
          <a href="#faq" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
            {t.nav.faq}
          </a>

          {/* Tools Driacom Dropdown */}
          <div className="relative">
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              onBlur={() => setTimeout(() => setToolsDropdownOpen(false), 200)}
              type="button"
              className="flex items-center gap-1 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors cursor-pointer py-1"
            >
              <Wrench className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Tools Driacom</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-2 z-50 text-xs">
                <a
                  href="https://save.driacom.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                >
                  <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <span>DriaSave</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Download video, audio, gambar dari medsos
                    </p>
                  </div>
                </a>

                <a
                  href="https://convert.driacom.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                >
                  <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 shrink-0">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <span>DriaConvert</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Konversi file video, audio, gambar, dokumen
                    </p>
                  </div>
                </a>

                <a
                  href="https://clip.driacom.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                >
                  <div className="p-1.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 shrink-0">
                    <Scissors className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      <span>DriaClip</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Potong & clip video otomatis untuk konten clipper
                    </p>
                  </div>
                </a>

                <div className="border-t border-slate-100 dark:border-slate-800 my-1 pt-1">
                  <a
                    href="https://driacom.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <span>Website Resmi Driacom.com</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section: Desktop Full Controls & Mobile Minimal Bar */}
        <div className="flex items-center gap-2">
          
          {/* Desktop Only: Font Size Dropdown */}
          <div className="hidden md:block relative" ref={fontDropdownRef}>
            <button
              onClick={() => {
                setFontDropdownOpen(prev => !prev);
                setLangDropdownOpen(false);
              }}
              type="button"
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer shadow-2xs select-none ${
                fontDropdownOpen
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                  : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
              }`}
              title="Pilih Ukuran Font / Select Font Size"
              aria-expanded={fontDropdownOpen}
            >
              <Type className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>
                {fontSize === 'small' ? 'Font: Kecil' : fontSize === 'large' ? 'Font: Besar' : 'Font: Normal'}
              </span>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${fontDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {fontDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-44 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-2 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Font Size' : 'Ukuran Font'}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onChangeFontSize('small');
                    setFontDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    fontSize === 'small'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-5 text-[11px] font-bold text-slate-400">A-</span>
                    <span>{lang === 'en' ? 'Small (90%)' : 'Kecil (90%)'}</span>
                  </span>
                  {fontSize === 'small' && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChangeFontSize('normal');
                    setFontDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    fontSize === 'normal'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-5 text-xs font-bold text-slate-400">A</span>
                    <span>{lang === 'en' ? 'Normal (100%)' : 'Normal (100%)'}</span>
                  </span>
                  {fontSize === 'normal' && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onChangeFontSize('large');
                    setFontDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    fontSize === 'large'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-5 text-sm font-bold text-slate-400">A+</span>
                    <span>{lang === 'en' ? 'Large (110%)' : 'Besar (110%)'}</span>
                  </span>
                  {fontSize === 'large' && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Dark Mode Toggle Button (Always visible on mobile & desktop) */}
          <button
            onClick={onToggleTheme}
            type="button"
            className="p-2 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer shadow-2xs"
            title={isDark ? (lang === 'id' ? 'Aktifkan Mode Terang' : 'Switch to Light Mode') : (lang === 'id' ? 'Aktifkan Mode Gelap' : 'Switch to Dark Mode')}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {/* Desktop Only: Language Dropdown with Crisp Vector SVG Flags */}
          <div className="hidden md:block relative" ref={langDropdownRef}>
            <button
              onClick={() => {
                setLangDropdownOpen(prev => !prev);
                setFontDropdownOpen(false);
              }}
              type="button"
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer shadow-2xs select-none ${
                langDropdownOpen
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                  : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
              }`}
              title="Pilih Bahasa / Select Language"
              aria-expanded={langDropdownOpen}
            >
              <div className="flex items-center gap-1.5">
                {lang === 'id' ? <IndonesiaFlag className="w-4 h-3" /> : <USAFlag className="w-4 h-3" />}
                <span>{lang === 'id' ? 'ID' : 'EN'}</span>
              </div>
              <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-2 py-1 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  {lang === 'en' ? 'Select Language' : 'Pilih Bahasa'}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectLang) {
                      onSelectLang('id');
                    } else if (lang !== 'id') {
                      onToggleLang();
                    }
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    lang === 'id'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <IndonesiaFlag className="w-4.5 h-3.5" />
                    <span>Bahasa Indonesia</span>
                  </span>
                  {lang === 'id' && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectLang) {
                      onSelectLang('en');
                    } else if (lang !== 'en') {
                      onToggleLang();
                    }
                    setLangDropdownOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    lang === 'en'
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <USAFlag className="w-4.5 h-3.5" />
                    <span>English (US)</span>
                  </span>
                  {lang === 'en' && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Only: Hamburger Button */}
          <button
            onClick={handleToggleMobile}
            type="button"
            className="md:hidden p-2 text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-300 dark:border-slate-700 transition-colors cursor-pointer"
            aria-label="Menu navigasi mobile"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-800 dark:text-white" />
            ) : (
              <Menu className="w-5 h-5 text-slate-800 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer (HANYA tampil saat tombol hamburger ditekan, dengan scroll lancar & bebas tabrakan) */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-5 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100dvh-4.25rem)] overflow-y-auto pb-24 overscroll-contain">
          <div className="space-y-5">
            
            {/* 1. Pengatur Ukuran Font Mobile */}
            <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-2 uppercase tracking-wider">
                Ukuran Font Situs
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => onChangeFontSize('small')}
                  type="button"
                  className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    fontSize === 'small'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {fontSize === 'small' && <Check className="w-3.5 h-3.5" />}
                  <span>Kecil (A-)</span>
                </button>
                <button
                  onClick={() => onChangeFontSize('normal')}
                  type="button"
                  className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    fontSize === 'normal'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {fontSize === 'normal' && <Check className="w-3.5 h-3.5" />}
                  <span>Normal (A)</span>
                </button>
                <button
                  onClick={() => onChangeFontSize('large')}
                  type="button"
                  className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    fontSize === 'large'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {fontSize === 'large' && <Check className="w-3.5 h-3.5" />}
                  <span>Besar (A+)</span>
                </button>
              </div>
            </div>

            {/* 2. Switch Bahasa Mobile */}
            <div className="p-3 bg-slate-50 dark:bg-slate-850 rounded-2xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-2 uppercase tracking-wider">
                Bahasa / Language
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    if (lang !== 'id') onToggleLang();
                  }}
                  type="button"
                  className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    lang === 'id'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <IndonesiaFlag className="w-4.5 h-3.5" />
                  <span>Bahasa Indonesia</span>
                </button>
                <button
                  onClick={() => {
                    if (lang !== 'en') onToggleLang();
                  }}
                  type="button"
                  className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    lang === 'en'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <USAFlag className="w-4.5 h-3.5" />
                  <span>English</span>
                </button>
              </div>
            </div>

            {/* 3. Menu Navigasi Utama */}
            <div className="space-y-1 pt-1">
              <span className="text-xs font-bold text-slate-400 block px-2 uppercase tracking-wider mb-1">
                Navigasi Situs
              </span>
              <a
                href="#checker-tool"
                onClick={closeMobileMenu}
                className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {t.nav.checkMetric}
              </a>
              <a
                href="#jasa-seo"
                onClick={closeMobileMenu}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{t.nav.services}</span>
              </a>
              <a
                href="#panduan-seo"
                onClick={closeMobileMenu}
                className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {t.nav.guide}
              </a>
              <a
                href="#faq"
                onClick={closeMobileMenu}
                className="block px-3 py-2 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {t.nav.faq}
              </a>
            </div>

            {/* 4. Tools Driacom */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 block px-2 uppercase tracking-wider">
                Tools Driacom
              </span>
              
              <a
                href="https://save.driacom.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-800/40 text-slate-900 dark:text-white hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-600 text-white">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm block">DriaSave</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Download video, audio, gambar sosmed
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </a>

              <a
                href="https://convert.driacom.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-800/40 text-slate-900 dark:text-white hover:bg-indigo-100/60 dark:hover:bg-indigo-900/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm block">DriaConvert</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Konversi video, audio, gambar, dokumen
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </a>

              <a
                href="https://clip.driacom.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-800/40 text-slate-900 dark:text-white hover:bg-rose-100/60 dark:hover:bg-rose-900/40 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-rose-600 text-white">
                    <Scissors className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm block">DriaClip</span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Potong & clip video otomatis untuk clipper
                    </span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              </a>

              <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-800/60 text-slate-900 dark:text-white shadow-2xs">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-emerald-600 text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm block flex items-center gap-1.5">
                      <span>DriaSeo</span>
                      <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-md">
                        Aktif
                      </span>
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Cek Moz DA, PA, Ahrefs DR & Spam Score
                    </span>
                  </div>
                </div>
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
