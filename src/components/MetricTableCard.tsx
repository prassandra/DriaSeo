import React, { useState } from 'react';
import { 
  Globe, 
  AlertTriangle, 
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Clock,
  Calendar,
  Link as LinkIcon,
  ShieldAlert,
  FileCheck,
  Download,
  Loader2
} from 'lucide-react';
import { DomainMetricResult } from '../types';
import { Translations } from '../i18n';
import { downloadDomainMetricImage } from '../utils/metricImageGenerator';

interface MetricTableCardProps {
  data: DomainMetricResult;
  t: Translations['results'];
  onOpenAiAudit?: (data: DomainMetricResult) => void;
}

export const MetricTableCard: React.FC<MetricTableCardProps> = ({ 
  data, 
  t, 
  onOpenAiAudit,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  // Pure integer values without any decimals or commas
  const daInt = Math.round(Number(data.da));
  const paInt = Math.round(Number(data.pa));
  const drInt = Math.round(Number(data.dr));
  const ssInt = Math.round(Number(data.ssNum));

  const handleDownloadImage = async () => {
    setIsDownloading(true);
    try {
      await downloadDomainMetricImage(data);
    } catch (err) {
      console.error('Gagal mengunduh gambar:', err);
    } finally {
      setTimeout(() => setIsDownloading(false), 400);
    }
  };

  // Determine Spam Score health status
  const getSpamScoreInfo = (ssNum: number) => {
    if (ssNum <= 10) {
      return {
        label: 'Aman & Bersih',
        color: 'text-emerald-700 dark:text-emerald-300',
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
        border: 'border-emerald-500/30',
        bar: 'bg-emerald-600 dark:bg-emerald-400'
      };
    }
    if (ssNum <= 30) {
      return {
        label: 'Toleransi Wajar',
        color: 'text-cyan-700 dark:text-cyan-300',
        bg: 'bg-cyan-500/10 dark:bg-cyan-500/15',
        border: 'border-cyan-500/30',
        bar: 'bg-cyan-600 dark:bg-cyan-400'
      };
    }
    if (ssNum <= 50) {
      return {
        label: 'Perlu Pengawasan',
        color: 'text-amber-700 dark:text-amber-300',
        bg: 'bg-amber-500/10 dark:bg-amber-500/15',
        border: 'border-amber-500/30',
        bar: 'bg-amber-500'
      };
    }
    return {
      label: 'Risiko Tinggi',
      color: 'text-rose-700 dark:text-rose-300',
      bg: 'bg-rose-500/10 dark:bg-rose-500/15',
      border: 'border-rose-500/30',
      bar: 'bg-rose-600'
    };
  };

  // Authority Tier details (High contrast for dark header background - WCAG AAA compliant: >10:1 contrast)
  const getAuthorityBadge = (da: number) => {
    if (da >= 70) {
      return { 
        label: 'Top Tier Authority', 
        color: 'bg-emerald-500/25 text-emerald-200 border-2 border-emerald-400/80 font-extrabold shadow-xs' 
      };
    }
    if (da >= 45) {
      return { 
        label: 'High Authority', 
        color: 'bg-sky-500/25 text-sky-200 border-2 border-sky-400/80 font-extrabold shadow-xs' 
      };
    }
    if (da >= 25) {
      return { 
        label: 'Medium Authority', 
        color: 'bg-amber-500/25 text-amber-200 border-2 border-amber-400/80 font-extrabold shadow-xs' 
      };
    }
    return { 
      label: 'Growing Domain', 
      color: 'bg-slate-700/90 text-slate-100 border-2 border-slate-400/80 font-extrabold shadow-xs' 
    };
  };

  const ssInfo = getSpamScoreInfo(ssInt);
  const authBadge = getAuthorityBadge(daInt);

  return (
    <div className="w-full min-w-0 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
      
      {/* 1. Header Bar: Domain Identity & Quick Actions */}
      <div className="p-4 sm:p-5 bg-linear-to-r from-slate-900 via-slate-850 to-slate-900 text-white border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center font-black text-sm shadow-md shrink-0">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-xl font-black tracking-tight text-white uppercase break-all">
                {data.domain}
              </h3>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border shrink-0 tracking-wide ${authBadge.color}`}>
                {authBadge.label}
              </span>
              {data.expired?.includes('Kedaluwarsa') && (
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-amber-500/50 bg-amber-500/20 text-amber-300 shrink-0 tracking-wide">
                  Kedaluwarsa (Expired)
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5 truncate">
              {data.expired?.includes('Kedaluwarsa')
                ? 'Domain Kedaluwarsa / Riwayat Otoritas & Backlink Resmi Terverifikasi'
                : 'Data Resmi Moz & Ahrefs Terverifikasi'}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <button
            onClick={handleDownloadImage}
            disabled={isDownloading}
            type="button"
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white rounded-xl shadow-xs transition-colors cursor-pointer disabled:opacity-60 border border-emerald-500/40"
            title="Download Gambar Rincian Metrik (PNG)"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                <span className="hidden sm:inline">Mengunduh...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-emerald-200" />
                <span>Download Gambar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. Core Four-Pillar Scorecard: Moz DA, Moz PA, Ahrefs DR, Moz Spam Score */}
      <div className="p-4 sm:p-6 space-y-5">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          
          {/* Pod 1: Moz Domain Authority (DA) */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-linear-to-b from-emerald-50/70 to-white dark:from-emerald-950/25 dark:to-slate-900 border border-emerald-200/80 dark:border-emerald-900/40 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 text-[11px] flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Moz DA
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Skor / 100</span>
              </div>
              
              <div className="my-2 flex items-baseline gap-1.5">
                <span className="font-data text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                  {daInt}
                </span>
                <span className="text-xs font-bold text-slate-400">DA</span>
              </div>
            </div>

            {/* Moz Trust (MT) & Moz Rank (MR) */}
            <div className="pt-2 border-t border-emerald-100 dark:border-emerald-900/40 flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
              <span title="Moz Trust">
                MT: <strong className="text-emerald-700 dark:text-emerald-300 font-data">{data.mt}</strong>
              </span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span title="Moz Rank">
                MR: <strong className="text-emerald-700 dark:text-emerald-300 font-data">{data.mr}</strong>
              </span>
            </div>
          </div>

          {/* Pod 2: Moz Page Authority (PA) - Standalone Big Number Card (No slider) */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-linear-to-b from-teal-50/70 to-white dark:from-teal-950/25 dark:to-slate-900 border border-teal-200/80 dark:border-teal-900/40 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-extrabold uppercase tracking-wider text-teal-800 dark:text-teal-300 text-[11px] flex items-center gap-1">
                  <FileCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  Moz PA
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Skor / 100</span>
              </div>

              <div className="my-2 flex items-baseline gap-1.5">
                <span className="font-data text-3xl sm:text-4xl lg:text-5xl font-black text-teal-700 dark:text-teal-300 tracking-tight">
                  {paInt}
                </span>
                <span className="text-xs font-bold text-slate-400">PA</span>
              </div>
            </div>

            {/* Page Authority Status Indicator (Clean typography, no tiny slider) */}
            <div className="pt-2 border-t border-teal-100 dark:border-teal-900/40 flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
              <span>Kekuatan URL:</span>
              <span className="text-teal-700 dark:text-teal-300 font-data font-black uppercase text-[10px] px-2 py-0.5 rounded-md bg-teal-100/80 dark:bg-teal-950/80">
                {paInt >= 50 ? 'Otoritas Tinggi' : paInt >= 30 ? 'Menengah' : paInt >= 15 ? 'Berkembang' : 'Halaman Awal'}
              </span>
            </div>
          </div>

          {/* Pod 3: Ahrefs Domain Rating (DR) */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-linear-to-b from-indigo-50/70 to-white dark:from-indigo-950/25 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-900/40 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-extrabold uppercase tracking-wider text-indigo-800 dark:text-indigo-300 text-[11px] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Ahrefs DR
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Rating / 100</span>
              </div>

              <div className="my-2 flex items-baseline gap-1.5">
                <span className="font-data text-3xl sm:text-4xl lg:text-5xl font-black text-indigo-700 dark:text-indigo-300 tracking-tight">
                  {drInt}
                </span>
                <span className="text-xs font-bold text-slate-400">DR</span>
              </div>
            </div>

            <div className="pt-2 border-t border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
              <span>Profil Link:</span>
              <span className="text-indigo-700 dark:text-indigo-300 font-data font-black uppercase text-[10px] px-2 py-0.5 rounded-md bg-indigo-100/80 dark:bg-indigo-950/80">
                {drInt >= 75 ? 'Otoritas Tinggi' : drInt >= 40 ? 'Menengah' : drInt >= 15 ? 'Berkembang' : 'Baru / Ringan'}
              </span>
            </div>
          </div>

          {/* Pod 4: Spam Score (SS) */}
          <div className={`p-3.5 sm:p-4 rounded-2xl ${ssInfo.bg} border ${ssInfo.border} relative overflow-hidden flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className={`font-extrabold uppercase tracking-wider ${ssInfo.color} text-[11px] flex items-center gap-1`}>
                  {ssInt > 30 ? (
                    <ShieldAlert className="w-3.5 h-3.5" />
                  ) : (
                    <ShieldCheck className="w-3.5 h-3.5" />
                  )}
                  Spam Score
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${ssInfo.color} bg-white/70 dark:bg-slate-900/70 border border-current/20`}>
                  {ssInfo.label}
                </span>
              </div>

              <div className="my-2 flex items-baseline gap-1">
                <span className={`font-data text-3xl sm:text-4xl lg:text-5xl font-black ${ssInfo.color} tracking-tight`}>
                  {ssInt}%
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
              <span>Tingkat Risiko:</span>
              <span className="font-bold text-[10px] uppercase px-2 py-0.5 rounded-md bg-white/70 dark:bg-slate-900/70">
                {ssInt <= 10 ? 'Sangat Aman' : ssInt <= 30 ? 'Aman' : 'Audit Diperlukan'}
              </span>
            </div>
          </div>

        </div>

        {/* 3. Backlink Section (Clean Title 'Backlink' without Ekosistem) */}
        <div className="w-full p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                <LinkIcon className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Backlink
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Total Backlinks:</span>
              <span className="font-data font-black text-lg sm:text-xl text-blue-800 dark:text-blue-300">
                {data.backlink}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
            <div className="p-2.5 sm:p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase">Nofollow</span>
              <span className="font-data text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">{data.nofollow}</span>
            </div>
            <div className="p-2.5 sm:p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase">Redirect</span>
              <span className="font-data text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5 block">{data.redirect}</span>
            </div>
            <div className="p-2.5 sm:p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800">
              <span className="text-[10px] sm:text-[11px] font-bold text-rose-500 dark:text-rose-400 block uppercase">Deleted</span>
              <span className="font-data text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400 mt-0.5 block">{data.deleted}</span>
            </div>
          </div>
        </div>

        {/* 4. Umur Domain: Dedicated Separate Full-Width Row (Baris Baru agar tidak terpotong) */}
        <div className="w-full p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                <Clock className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xs sm:text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Umur Domain
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-200/70 dark:border-slate-800">
              WHOIS RDAP Resmi
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
            {/* Box 1: Umur Aktif (Spacious & No-Wrap) */}
            <div className="p-3 sm:p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-center">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase block mb-1">
                Umur Aktif Domain
              </span>
              <span className="font-data font-black text-sm sm:text-base md:text-lg text-emerald-700 dark:text-emerald-400 leading-tight whitespace-nowrap overflow-x-auto">
                {data.umurDomain}
              </span>
            </div>

            {/* Box 2: Tanggal Terdaftar */}
            <div className="p-3 sm:p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-center">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Tanggal Terdaftar
              </span>
              <span className="font-data text-xs sm:text-sm md:text-base font-bold text-slate-800 dark:text-slate-200 leading-tight">
                {data.daftar}
              </span>
            </div>

            {/* Box 3: Tanggal Kedaluwarsa */}
            <div className="p-3 sm:p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 flex flex-col justify-center">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase flex items-center gap-1.5 mb-1">
                <Calendar className={`w-3.5 h-3.5 ${data.expired?.includes('Kedaluwarsa') ? 'text-amber-500 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`} />
                Tanggal Kedaluwarsa
              </span>
              <span className={`font-data text-xs sm:text-sm md:text-base font-bold leading-tight ${data.expired?.includes('Kedaluwarsa') ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-800 dark:text-emerald-300'}`}>
                {data.expired}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* 5. Footer: Verification & AI SEO Audit Trigger */}
      <div className="bg-slate-100/70 dark:bg-slate-950/70 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          {ssInt > 30 ? (
            <span className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 shrink-0 animate-pulse" />
              <span>{t.spamAlert}</span>
            </span>
          ) : (
            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Metrik Otoritas Terverifikasi Resmi</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadImage}
            disabled={isDownloading}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-bold rounded-xl shadow-2xs transition-all cursor-pointer text-xs border border-slate-300 dark:border-slate-700 disabled:opacity-60"
            title="Download Gambar Rincian Metrik (PNG)"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600 dark:text-emerald-400" />
                <span>Menyiapkan...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Unduh Gambar Rincian</span>
              </>
            )}
          </button>

          {onOpenAiAudit && (
            <button
              onClick={() => onOpenAiAudit(data)}
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-bold rounded-xl shadow-xs transition-all cursor-pointer text-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.aiAuditButton}</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
