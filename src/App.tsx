import React, { useState, useEffect } from 'react';
import { 
  RotateCcw, 
  FileSpreadsheet, 
  Copy, 
  Check, 
  Loader2,
  TrendingUp,
  Globe,
  Sparkles,
  ExternalLink,
  LayoutGrid,
  TableProperties,
  Download,
  RefreshCw,
  Wrench,
  Scissors
} from 'lucide-react';
import { DomainMetricResult } from './types';
import { Language, translations } from './i18n';
import { parseDomainInput, checkDomainsAPI, fallbackCalculateMetrics } from './utils/domainChecker';
import { MetricTableCard } from './components/MetricTableCard';
import { BatchComparisonTable } from './components/BatchComparisonTable';
import { AdSenseBanner } from './components/AdSenseBanner';
import { SidebarLazyAd } from './components/SidebarLazyAd';
import { Navbar, FontSizeOption } from './components/Navbar';
import { Footer } from './components/Footer';
import { SeoEducationalGuide } from './components/SeoEducationalGuide';
import { PromoServices } from './components/PromoServices';
import { AiSeoAuditModal } from './components/AiSeoAuditModal';
import { LegalModal, LegalTab } from './components/LegalModal';
import { BackToTop } from './components/BackToTop';
import { ScrollProgressBar, ScrollReveal, StaggerContainer, StaggerItem } from './components/ScrollReveal';

export default function App() {
  // Theme State (Dark Mode)
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('driaseo_theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('driaseo_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('driaseo_theme', 'light');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark(prev => !prev);
  };

  // URL Sanitizer: Clean any trailing rogue characters (/l, /I, etc.)
  useEffect(() => {
    try {
      const p = window.location.pathname;
      if (p && p !== '/' && !p.startsWith('/api')) {
        window.history.replaceState(null, '', '/' + window.location.search + window.location.hash);
      }
    } catch {
      // ignore
    }
  }, []);

  // Font Size State (small | normal | large)
  const [fontSize, setFontSize] = useState<FontSizeOption>(() => {
    if (typeof window !== 'undefined') {
      const savedSize = localStorage.getItem('driaseo_font_size') as FontSizeOption;
      if (savedSize === 'small' || savedSize === 'normal' || savedSize === 'large') {
        return savedSize;
      }
    }
    return 'normal';
  });

  // Apply responsive font size scale: kecil (14.5px/15px), normal (15.5px/16.5px), besar (17.5px/18.5px)
  useEffect(() => {
    const root = document.documentElement;
    const applySize = () => {
      const isMobile = window.innerWidth < 640;
      if (fontSize === 'small') {
        root.style.fontSize = isMobile ? '14px' : '15px';
      } else if (fontSize === 'large') {
        root.style.fontSize = isMobile ? '17.5px' : '18.5px';
      } else {
        // normal (default)
        root.style.fontSize = isMobile ? '15.5px' : '16.5px';
      }
    };

    applySize();
    window.addEventListener('resize', applySize);
    localStorage.setItem('driaseo_font_size', fontSize);

    return () => window.removeEventListener('resize', applySize);
  }, [fontSize]);

  // Language State
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('driaseo_lang');
    return saved === 'en' ? 'en' : 'id';
  });

  const t = translations[lang];

  const handleToggleLang = () => {
    const nextLang: Language = lang === 'id' ? 'en' : 'id';
    setLang(nextLang);
    localStorage.setItem('driaseo_lang', nextLang);
  };

  const handleSelectLang = (nextLang: Language) => {
    setLang(nextLang);
    localStorage.setItem('driaseo_lang', nextLang);
  };

  // Input domain state: starts EMPTY on first visit and page refresh
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DomainMetricResult[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);

  // View mode for results: 'grid' (responsive cards) or 'table' (comparative matrix)
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  // AI Audit Modal state
  const [selectedAuditDomain, setSelectedAuditDomain] = useState<DomainMetricResult | null>(null);
  const [cachedAiAudit, setCachedAiAudit] = useState<string | null>(null);

  // Mobile Hamburger Menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Legal Modal state
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTab>('about');

  const handleOpenLegal = (tab: LegalTab) => {
    setActiveLegalTab(tab);
    setLegalModalOpen(true);
  };

  // Calculate parsed domain list and count
  const parsedDomains = parseDomainInput(inputText);
  const domainCount = parsedDomains.length;

  // Perform domain check
  const handleCheckDomains = async () => {
    if (domainCount === 0) return;
    setLoading(true);

    try {
      const response = await checkDomainsAPI(parsedDomains, false);
      if (response.success && response.data.length > 0) {
        setResults(response.data);
        if (response.aiAudit) {
          setCachedAiAudit(response.aiAudit);
        }
        // Smoothly auto-scroll to the metrics results section
        setTimeout(() => {
          const resultsElement = document.getElementById('results-section');
          if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    } catch (err) {
      console.error('Error during domain check:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Preset domain sample
  const handlePresetClick = (sampleDomain: string) => {
    setInputText(sampleDomain);
    const parts = parseDomainInput(sampleDomain);
    const checked = parts.map(d => fallbackCalculateMetrics(d));
    setResults(checked);
    // Smoothly auto-scroll to the metrics results section
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  // Export results to CSV
  const handleExportCSV = () => {
    if (results.length === 0) return;

    const headers = [
      'Domain',
      'Domain Authority (DA)',
      'Page Authority (PA)',
      'Spam Score (SS)',
      'Domain Rating (DR)',
      'Moz Trust (MT)',
      'Moz Rank (MR)',
      'Backlink',
      'Umur Domain',
      'Nofollow',
      'Redirect',
      'Deleted',
      'Daftar',
      'Expired',
    ];

    const rows = results.map(r => [
      r.domain,
      r.da,
      r.pa,
      r.ss,
      r.dr,
      r.mt,
      r.mr,
      `"${r.backlink}"`,
      `"${r.umurDomain}"`,
      `"${r.nofollow}"`,
      `"${r.redirect}"`,
      `"${r.deleted}"`,
      r.daftar,
      r.expired,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `driaseo_checker_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy all results to clipboard
  const handleCopyAll = () => {
    if (results.length === 0) return;

    const text = results
      .map(
        r => `--- ${r.domain} ---
DA: ${r.da} | PA: ${r.pa} | DR: ${r.dr} | SS: ${r.ss}
Backlinks: ${r.backlink} | Umur: ${r.umurDomain}
Daftar: ${r.daftar} | Expired: ${r.expired}
Sumber: DriaSeo (by Driacom)`
      )
      .join('\n\n');

    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950 transition-colors">
      {/* Real-time Scroll Reading Progress Bar */}
      <ScrollProgressBar />

      {/* 1. Header with Language Switcher, Dark Mode Toggle & Font Size Control */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        onSelectLang={handleSelectLang}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        t={t}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        onCloseMobileMenu={() => setMobileMenuOpen(false)}
      />

      {/* Main Container with Content Layout */}
      <main className="grow max-w-7xl mx-auto w-full px-3 sm:px-6 pt-5 pb-4 sm:pb-6">
        
        {/* Tools Driacom Top Banner */}
        <ScrollReveal direction="down" distance={10}>
          <div className="flex flex-wrap items-center justify-between gap-2 bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-200/90 dark:border-emerald-800/80 rounded-xl px-4 py-2.5 mb-4 text-xs shadow-2xs">
            <div className="flex items-center gap-2 text-emerald-950 dark:text-emerald-200">
              <Wrench className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[11px]">
                Tools Driacom
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <a
                href="https://save.driacom.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1.5 px-2 py-0.5 rounded-md hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>DriaSave</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <a
                href="https://convert.driacom.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-indigo-700 dark:text-indigo-400 hover:underline flex items-center gap-1.5 px-2 py-0.5 rounded-md hover:bg-indigo-100/60 dark:hover:bg-indigo-900/40 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>DriaConvert</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <a
                href="https://clip.driacom.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1.5 px-2 py-0.5 rounded-md hover:bg-rose-100/60 dark:hover:bg-rose-900/40 transition-colors"
              >
                <Scissors className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>DriaClip</span>
                <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
              <span className="text-slate-300 dark:text-slate-700">·</span>
              <span className="font-black text-emerald-700 dark:text-emerald-300 flex items-center gap-1 bg-white dark:bg-slate-900 px-2.5 py-0.5 rounded-md border border-emerald-300 dark:border-emerald-700/60 shadow-2xs">
                <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>DriaSeo</span>
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Clean Top Billboard Ad Slot (Zero CLS min-h-[100px] sm:min-h-[90px]) */}
        <div className="w-full min-h-[100px] sm:min-h-[90px] flex justify-center mb-4">
          <AdSenseBanner type="top-billboard" />
        </div>

        {/* Desktop 2-Column Layout: Large Metric Checker Column + Right Sticky Sidebar (3 x 300x250 Ads) */}
        <div className="w-full flex justify-center items-start gap-6 mt-2">
          
          {/* Large Column for Checker Tool and Content */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Hero Section */}
            <ScrollReveal direction="up" distance={14}>
              <div className="text-center mb-6 px-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold mb-2.5 border border-slate-200/80 dark:border-slate-700">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>DriaSeo · Batch Multi-Domain Analysis</span>
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {t.hero.title}
                </h1>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  {t.hero.subtitle}
                </p>
              </div>
            </ScrollReveal>

            {/* Checker Tool Input Form */}
            <ScrollReveal direction="up" distance={16} delay={0.05}>
            <section
              id="checker-tool"
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 mb-8 transition-colors"
            >
              <div className="relative mb-3">
                <textarea
                  rows={3}
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  placeholder={t.hero.placeholder.replace('{count}', String(domainCount))}
                  className="w-full p-3.5 border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:border-emerald-600 dark:focus:border-emerald-500 rounded-xl text-sm md:text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden transition-all shadow-inner resize-y min-h-[95px]"
                />
                <div className="absolute right-3 bottom-3 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 pointer-events-none">
                  {t.hero.counterLabel.replace('{count}', String(domainCount))}
                </div>
              </div>

              {inputText && (
                <div className="flex justify-end mb-2">
                  <button
                    type="button"
                    onClick={() => setInputText('')}
                    className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{t.hero.clear}</span>
                  </button>
                </div>
              )}

              {/* Big Action Button: CEK METRIK DOMAIN */}
              <button
                onClick={handleCheckDomains}
                disabled={loading || domainCount === 0}
                type="button"
                className="w-full py-3.5 px-6 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white text-base md:text-lg font-black tracking-wider uppercase rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{t.hero.checkingButton}</span>
                  </>
                ) : (
                  <>
                    <span>{t.hero.checkButton}</span>
                  </>
                )}
              </button>
            </section>
            </ScrollReveal>

            {/* Results Section */}
            {results.length > 0 && (
              <ScrollReveal direction="up" distance={16}>
              <section id="results-section" className="mb-10 animate-fade-in-up scroll-mt-20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div>
                    <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      <span>{t.results.title} ({results.length} Domain)</span>
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {results.length > 1
                        ? (lang === 'en' ? 'Batch multi-domain analysis. Switch between card columns or matrix table.' : 'Hasil analisis batch multi-domain. Anda dapat melihat dalam kartu kolom atau tabel komparasi.')
                        : t.results.subtitle}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {/* View Mode Toggle: Grid Cards vs Table */}
                    {results.length > 1 && (
                      <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold">
                        <button
                          onClick={() => setViewMode('grid')}
                          type="button"
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                            viewMode === 'grid'
                              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                          }`}
                          title={lang === 'en' ? 'Card Column View' : 'Tampilan Kolom Kartu'}
                        >
                          <LayoutGrid className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{lang === 'en' ? 'Cards' : 'Kolom Kartu'}</span>
                        </button>
                        <button
                          onClick={() => setViewMode('table')}
                          type="button"
                          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                            viewMode === 'table'
                              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                          }`}
                          title={lang === 'en' ? 'Batch Table Matrix' : 'Tabel Komparasi Master'}
                        >
                          <TableProperties className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>{lang === 'en' ? 'Table' : 'Tabel Batch'}</span>
                        </button>
                      </div>
                    )}

                    <button
                      onClick={handleExportCSV}
                      type="button"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                      <span>{t.results.exportCsv}</span>
                    </button>

                    <button
                      onClick={handleCopyAll}
                      type="button"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold shadow-2xs transition-colors cursor-pointer"
                    >
                      {copiedAll ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-600 dark:text-emerald-400">{t.results.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                          <span>{t.results.copyAll}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {viewMode === 'table' && results.length > 1 ? (
                  <BatchComparisonTable
                    results={results}
                    t={t.results}
                    onOpenAiAudit={data => setSelectedAuditDomain(data)}
                  />
                ) : (
                  <div className={`grid gap-6 ${
                    results.length === 1 ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-2'
                  }`}>
                    {results.map((domainData, idx) => (
                      <MetricTableCard
                        key={`${domainData.domain}-${idx}`}
                        data={domainData}
                        t={t.results}
                        onOpenAiAudit={data => setSelectedAuditDomain(data)}
                      />
                    ))}
                  </div>
                )}

                {/* Responsive Display Ad Slot inside Results */}
                <div className="w-full my-3 flex justify-center overflow-visible">
                  <AdSenseBanner type="mid-results" />
                </div>
              </section>
              </ScrollReveal>
            )}

            {/* Responsive Display Ad Slot */}
            <div className="w-full my-3 flex justify-center overflow-visible">
              <AdSenseBanner type="in-feed" />
            </div>

            {/* Dedicated Tools & Ekosistem Driacom Showcase Section */}
            <ScrollReveal direction="up" distance={20}>
            <section className="mb-8 p-5 sm:p-6 bg-linear-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl border border-slate-800 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-1.5 border border-emerald-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ekosistem Aplikasi Digital Driacom</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Tools Unggulan Gratis by Driacom
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Gunakan berbagai utilitas online gratis berkinerja tinggi untuk mendukung kebutuhan konten dan produktivitas Anda.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Tool 1: DriaSave */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-md shrink-0">
                          <Download className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-base font-black text-white group-hover:text-emerald-400 transition-colors">
                            DriaSave
                          </h4>
                          <span className="text-[11px] text-emerald-400 font-semibold block">Social Media Downloader</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shrink-0">
                        Gratis & Cepat
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Tools online untuk mengunduh file berupa video, audio, dan gambar dari berbagai sumber media sosial (TikTok, YouTube, IG, FB) dalam resolusi terbaik tanpa watermark.
                    </p>
                  </div>

                  <a
                    href="https://save.driacom.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Buka DriaSave (save.driacom.com)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Tool 2: DriaConvert */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-indigo-500/50 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md shrink-0">
                          <RefreshCw className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-base font-black text-white group-hover:text-indigo-400 transition-colors">
                            DriaConvert
                          </h4>
                          <span className="text-[11px] text-indigo-400 font-semibold block">Universal File Converter</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 shrink-0">
                        Multi-Format
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Tools untuk mengkonversi file berupa video, audio, gambar, dan dokumen (MP4, MP3, WebP, PNG, PDF, Word) secara instan, aman, dan tanpa batasan file.
                    </p>
                  </div>

                  <a
                    href="https://convert.driacom.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Buka DriaConvert (convert.driacom.com)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Tool 3: DriaClip */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-rose-500/50 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-rose-500 to-amber-500 text-white flex items-center justify-center shadow-md shrink-0">
                          <Scissors className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-base font-black text-white group-hover:text-rose-400 transition-colors">
                            DriaClip
                          </h4>
                          <span className="text-[11px] text-rose-400 font-semibold block">Auto Video Clipper</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 shrink-0">
                        Clipper Otomatis
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      Tools untuk clip / potong video otomatis cocok untuk para clipper dan konten kreator (TikTok, Reels, Shorts) untuk menghasilkan cuplikan video menarik dengan cepat.
                    </p>
                  </div>

                  <a
                    href="https://clip.driacom.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                  >
                    <span>Buka DriaClip (clip.driacom.com)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </section>
            </ScrollReveal>

            {/* Responsive Display Ad Slot: Setelah Kontainer Tools Unggulan */}
            <div className="w-full my-4 flex justify-center overflow-visible">
              <AdSenseBanner slot="5462390377" />
            </div>

            {/* Dedicated Promotional Area for DA & DR (Manfaat DA PA) */}
            <PromoServices t={t.promo} />

            {/* Responsive Display Ad Slot: Dibawah Manfaat DA PA */}
            <div className="w-full my-4 flex justify-center overflow-visible">
              <AdSenseBanner slot="5462390377" />
            </div>

            {/* Comprehensive SEO Educational Content & FAQ Section */}
            <SeoEducationalGuide lang={lang} />

            {/* Single Pre-Footer Ad Slot: Dibawah FAQ */}
            <div className="w-full my-4 flex flex-col items-center justify-center">
              <AdSenseBanner slot="5462390377" />
            </div>
          </div>

          {/* Right Sidebar (Desktop Only: Sticky, does not scroll with page, 3 x 300x250 Ads) */}
          <aside className="hidden lg:flex flex-col items-center w-[300px] shrink-0 sticky top-20 self-start space-y-3 py-1 max-h-[calc(100vh-5.5rem)] overflow-y-auto no-scrollbar">
            <SidebarLazyAd slot="1116459861" />
            <SidebarLazyAd slot="1116459861" />
            <SidebarLazyAd slot="1116459861" />
          </aside>

        </div>
      </main>

      {/* Clean Footer (With Jasa DA, Jasa DR, Information & Policies, and Created by Driacom) */}
      <Footer 
        t={t.footer} 
        lang={lang}
        onOpenLegal={handleOpenLegal}
      />

      {/* Floating Back to Top Button */}
      <BackToTop label={lang === 'en' ? 'Back to Top' : 'Kembali ke Atas'} />

      {/* AI SEO Audit Modal */}
      {selectedAuditDomain && (
        <AiSeoAuditModal
          domainData={selectedAuditDomain}
          cachedAiAudit={cachedAiAudit}
          lang={lang}
          t={t.aiModal}
          onClose={() => setSelectedAuditDomain(null)}
        />
      )}

      {/* Legal & Policy Modal (About, Contact, Privacy, Disclaimer) */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        activeTab={activeLegalTab}
        onSelectTab={setActiveLegalTab}
        lang={lang}
      />
    </div>
  );
}
