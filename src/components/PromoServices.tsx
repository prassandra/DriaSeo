import React from 'react';
import { ExternalLink, CheckCircle2, TrendingUp, ShieldCheck, Zap, Award } from 'lucide-react';
import { Translations } from '../i18n';
import { ScrollReveal } from './ScrollReveal';
import { AdSenseBanner } from './AdSenseBanner';

interface PromoServicesProps {
  t: Translations['promo'];
}

export const PromoServices: React.FC<PromoServicesProps> = ({ t }) => {
  return (
    <section className="w-full my-12 sm:my-16" id="jasa-seo">
      {/* Header with generous spacing to avoid text crowding on mobile */}
      <ScrollReveal direction="up" distance={16}>
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold tracking-wide uppercase mb-3">
            <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.heading}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
            {t.subheading}
          </p>
        </div>
      </ScrollReveal>

      {/* 2 Focused Informational Benefit Cards with Ad Slot in between */}
      <div className="flex flex-col gap-6 sm:gap-8">
        
        {/* Card 1: Manfaat Domain Authority (DA) */}
        <ScrollReveal direction="up" delay={0.08} distance={20} className="h-full">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all p-5 sm:p-7 flex flex-col justify-between h-full">
          <div>
            {/* Top clean header row: Category & Badge without overlapping */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800/80">
              <span className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                Jasa Meningkatkan Domain Authority
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                {t.daService.badge}
              </span>
            </div>

            {/* Title & Icon */}
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center font-bold text-lg shrink-0 mt-0.5">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                  {t.daService.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
              {t.daService.desc}
            </p>

            <div className="mb-3 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              {t.daService.benefitsTitle}
            </div>

            {/* Benefits List */}
            <ul className="space-y-3 mb-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {t.daService.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mb-4 text-xs">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Pondasi SEO Terpercaya</span>
              </span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 font-mono">
                da.driacom.com
              </span>
            </div>

            <a
              href={t.daService.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold text-sm rounded-xl transition-all shadow-xs hover:shadow-sm"
            >
              <span>{t.daService.cta}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        </ScrollReveal>

        {/* Responsive Display Ad Slot: Dibawah Layanan DA */}
        <div className="w-full my-2 sm:my-3 flex justify-center overflow-visible">
          <AdSenseBanner slot="5462390377" />
        </div>

        {/* Card 2: Manfaat Domain Rating (DR) */}
        <ScrollReveal direction="up" delay={0.16} distance={20} className="w-full">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all p-5 sm:p-7 flex flex-col justify-between h-full">
          <div>
            {/* Top clean header row: Category & Badge without overlapping */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800/80">
              <span className="text-[11px] font-extrabold text-blue-700 dark:text-blue-400 uppercase tracking-wider">
                Jasa Meningkatkan Domain Rating
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/90 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
                {t.drService.badge}
              </span>
            </div>

            {/* Title & Icon */}
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900 flex items-center justify-center font-bold text-lg shrink-0 mt-0.5">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                  {t.drService.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
              {t.drService.desc}
            </p>

            <div className="mb-3 text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              {t.drService.benefitsTitle}
            </div>

            {/* Benefits List */}
            <ul className="space-y-3 mb-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {t.drService.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mb-4 text-xs">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Analisis Sesuai Database Ahrefs</span>
              </span>
              <span className="font-semibold text-blue-700 dark:text-blue-400 font-mono">
                dr.driacom.com
              </span>
            </div>

            <a
              href={t.drService.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-bold text-sm rounded-xl transition-all shadow-xs hover:shadow-sm"
            >
              <span>{t.drService.cta}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
