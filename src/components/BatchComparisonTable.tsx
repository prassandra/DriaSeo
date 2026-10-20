import React, { useState } from 'react';
import { DomainMetricResult } from '../types';
import { Translations } from '../i18n';
import { ArrowUpDown, ExternalLink, Sparkles, Copy, Check, Globe, Download, Loader2 } from 'lucide-react';
import { downloadBatchComparisonImage, downloadDomainMetricImage } from '../utils/metricImageGenerator';

interface BatchComparisonTableProps {
  results: DomainMetricResult[];
  t: Translations['results'];
  onOpenAiAudit: (domain: DomainMetricResult) => void;
}

type SortField = 'domain' | 'da' | 'pa' | 'ssNum' | 'dr' | 'backlinksRaw';

export const BatchComparisonTable: React.FC<BatchComparisonTableProps> = ({
  results,
  t,
  onOpenAiAudit,
}) => {
  const [sortField, setSortField] = useState<SortField>('da');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [copiedDomain, setCopiedDomain] = useState<string | null>(null);
  const [isDownloadingBatch, setIsDownloadingBatch] = useState<boolean>(false);
  const [downloadingDomain, setDownloadingDomain] = useState<string | null>(null);

  const handleDownloadBatch = async () => {
    setIsDownloadingBatch(true);
    try {
      await downloadBatchComparisonImage(results);
    } catch (e) {
      console.error('Gagal mengunduh gambar matriks:', e);
    } finally {
      setTimeout(() => setIsDownloadingBatch(false), 400);
    }
  };

  const handleDownloadRow = async (domainData: DomainMetricResult) => {
    setDownloadingDomain(domainData.domain);
    try {
      await downloadDomainMetricImage(domainData);
    } catch (e) {
      console.error('Gagal mengunduh gambar domain:', e);
    } finally {
      setTimeout(() => setDownloadingDomain(null), 400);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false); // default descending for metrics
    }
  };

  const sortedResults = [...results].sort((a, b) => {
    let aVal: any = a[sortField];
    let bVal: any = b[sortField];

    if (sortField === 'backlinksRaw') {
      aVal = a.backlinksRaw || parseInt(a.backlink.replace(/\./g, '')) || 0;
      bVal = b.backlinksRaw || parseInt(b.backlink.replace(/\./g, '')) || 0;
    }

    if (typeof aVal === 'string') {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortAsc ? aVal - bVal : bVal - aVal;
  });

  const copyRow = (domain: DomainMetricResult) => {
    const text = `${domain.domain} -> DA: ${domain.da} | PA: ${domain.pa} | DR: ${domain.dr} | SS: ${domain.ss} | Backlinks: ${domain.backlink} | Umur: ${domain.umurDomain}`;
    navigator.clipboard.writeText(text);
    setCopiedDomain(domain.domain);
    setTimeout(() => setCopiedDomain(null), 1800);
  };

  const getSpamScorePill = (ssNum: number, ssText: string) => {
    if (ssNum <= 10) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          {ssText}
        </span>
      );
    }
    if (ssNum <= 30) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300">
          {ssText}
        </span>
      );
    }
    if (ssNum <= 50) {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950/80 dark:text-amber-200 border border-amber-300/80 dark:border-amber-700/80">
          {ssText}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 animate-pulse">
        {ssText}
      </span>
    );
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-md overflow-hidden mb-6">
      <div className="p-4 sm:p-5 bg-linear-to-r from-slate-900 via-slate-850 to-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
        <div>
          <h3 className="font-black text-base sm:text-lg flex items-center gap-2">
            <span>Matriks Analisis Otoritas ({results.length} Domain)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Komparasi matriks metrik independen. Klik tajuk kolom untuk menyortir urutan nilai.
          </p>
        </div>

        <button
          onClick={handleDownloadBatch}
          disabled={isDownloadingBatch}
          type="button"
          className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer shrink-0 disabled:opacity-60"
          title="Download Gambar Matriks Komparasi Semua Domain (PNG)"
        >
          {isDownloadingBatch ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Menyiapkan Gambar...</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Download Gambar Tabel (PNG)</span>
            </>
          )}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm border-collapse">
          <thead className="bg-slate-50 dark:bg-slate-850 text-slate-700 dark:text-slate-300 font-bold uppercase text-[11px] tracking-wider border-b border-slate-200 dark:border-slate-800 select-none">
            <tr>
              <th
                onClick={() => handleSort('domain')}
                className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                <div className="flex items-center gap-1.5">
                  <span>Domain</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('da')}
                className="py-3.5 px-3 text-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
                title="Moz Domain Authority"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Moz DA</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('pa')}
                className="py-3.5 px-3 text-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
                title="Moz Page Authority"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Moz PA</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('dr')}
                className="py-3.5 px-3 text-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
                title="Ahrefs Domain Rating"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Ahrefs DR</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('ssNum')}
                className="py-3.5 px-3 text-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
                title="Spam Score"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Spam Score</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('backlinksRaw')}
                className="py-3.5 px-4 text-right cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Backlink</span>
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-3 text-center whitespace-nowrap">{t.tableHeaders.domainAge}</th>
              <th className="py-3.5 px-3 text-center whitespace-nowrap">{t.tableHeaders.registered}</th>
              <th className="py-3.5 px-3 text-center whitespace-nowrap">{t.tableHeaders.expired}</th>
              <th className="py-3.5 px-3 text-center whitespace-nowrap">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-900">
            {sortedResults.map((r, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors font-medium">
                {/* Domain name */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-xs shrink-0">
                      <Globe className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-black text-slate-900 dark:text-white tracking-tight">{r.domain}</span>
                    <a
                      href={`https://${r.rawDomain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                      title={t.visitSite}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </td>

                {/* DA */}
                <td className="py-3.5 px-3 text-center font-data font-black">
                  <span className="inline-block px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800 text-sm">
                    {Math.round(Number(r.da))}
                  </span>
                </td>

                {/* PA */}
                <td className="py-3.5 px-3 text-center font-data font-bold text-slate-700 dark:text-slate-300">
                  {Math.round(Number(r.pa))}
                </td>

                {/* DR */}
                <td className="py-3.5 px-3 text-center font-data font-black">
                  <span className="inline-block px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 text-sm">
                    {Math.round(Number(r.dr))}
                  </span>
                </td>

                {/* SS */}
                <td className="py-3.5 px-3 text-center font-data">
                  {getSpamScorePill(Math.round(Number(r.ssNum)), `${Math.round(Number(r.ssNum))}%`)}
                </td>

                {/* Backlinks */}
                <td className="py-3.5 px-4 text-right font-data font-black text-blue-800 dark:text-blue-300 text-sm">
                  {r.backlink}
                </td>

                {/* Umur */}
                <td className="py-3.5 px-3 text-center text-slate-600 dark:text-slate-400 text-xs font-medium">
                  {r.umurDomain}
                </td>

                {/* Daftar */}
                <td className="py-3.5 px-3 text-center text-slate-600 dark:text-slate-400 text-xs">
                  {r.daftar}
                </td>

                {/* Expired */}
                <td className={`py-3.5 px-3 text-center font-semibold text-xs ${r.expired?.includes('Kedaluwarsa') ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                  {r.expired}
                </td>

                {/* Actions */}
                <td className="py-3.5 px-3 text-center whitespace-nowrap">
                  <div className="flex items-center justify-center gap-1.5">
                    <button
                      onClick={() => handleDownloadRow(r)}
                      disabled={downloadingDomain === r.domain}
                      type="button"
                      className="p-1.5 text-emerald-700 dark:text-emerald-400 hover:text-white hover:bg-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl transition-colors cursor-pointer border border-emerald-200/60 dark:border-emerald-800/60 disabled:opacity-50"
                      title="Download Gambar Rincian Domain Ini (PNG)"
                    >
                      {downloadingDomain === r.domain ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => copyRow(r)}
                      type="button"
                      className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
                      title={t.copySummary}
                    >
                      {copiedDomain === r.domain ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => onOpenAiAudit(r)}
                      type="button"
                      className="p-1.5 text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors cursor-pointer shadow-2xs"
                      title={t.aiAuditButton}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
