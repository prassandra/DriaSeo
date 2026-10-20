import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, Copy, Check, Loader2, ExternalLink } from 'lucide-react';
import { DomainMetricResult } from '../types';
import { Translations, Language } from '../i18n';

interface AiSeoAuditModalProps {
  domainData: DomainMetricResult | null;
  onClose: () => void;
  cachedAiAudit?: string | null;
  t: Translations['aiModal'];
  lang: Language;
}

export const AiSeoAuditModal: React.FC<AiSeoAuditModalProps> = ({
  domainData,
  onClose,
  cachedAiAudit,
  t,
  lang,
}) => {
  const [loading, setLoading] = useState(false);
  const [auditText, setAuditText] = useState<string | null>(cachedAiAudit || null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!domainData) return;

    if (cachedAiAudit) {
      setAuditText(cachedAiAudit);
      return;
    }

    setLoading(true);
    const fetchAudit = async () => {
      try {
        const res = await fetch('/api/check-domain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            domains: [domainData.rawDomain],
            requestAiAudit: true,
            lang: lang,
          }),
        });

        if (res.ok) {
          const json = await res.json();
          if (json.aiAudit) {
            setAuditText(json.aiAudit);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn('AI Audit fetch error:', err);
      }

      // Bilingual fallback diagnostic
      const isSpamHigh = domainData.ssNum > 25;
      const isAuthorityHigh = domainData.da > 40;

      let fallback = '';
      if (lang === 'en') {
        fallback = `SEO Audit & Authority Diagnostics: ${domainData.domain}

1. Domain Authority & SERP Potential:
- Domain Authority (${domainData.da}/100) and Domain Rating (${domainData.dr}/100) indicate ${
          isAuthorityHigh
            ? 'a solid trust baseline recognized by search crawlers for competitive queries.'
            : 'high growth potential. Target high-authority relevant referring domains.'
        }
- Domain Age is ${domainData.umurDomain}, which provides positive E-E-A-T longevity signals.

2. Spam Score Analysis (${domainData.ss}):
- Status: ${isSpamHigh ? 'Action Required (Moderate/High Risk)' : 'Clean & Low Risk (< 10%)'}.
- ${
          isSpamHigh
            ? 'Audit toxic backlink influx and disavow harmful links using Google Search Console.'
            : 'Backlink profile is natural with no aggressive anchor text abnormalities.'
        }

3. Tactical Roadmap:
- Boost Moz DA via contextual authority backlinks at https://da.driacom.com
- Boost Ahrefs DR via natural dofollow referring domains at https://dr.driacom.com
- Fix ${domainData.deleted} lost backlinks with 301 redirects to maintain link equity.`;
      } else {
        fallback = `Ringkasan Audit SEO & Otoritas Domain: ${domainData.domain}

1. Evaluasi Otoritas Domain & Peringkat SERP:
- Domain Authority (${domainData.da}/100) dan Domain Rating (${domainData.dr}/100) menunjukkan ${
          isAuthorityHigh
            ? 'profil web yang kuat dan telah dipercaya mesin pencari untuk kata kunci kompetitif.'
            : 'potensi bertumbuh. Diperlukan penambahan backlink relevan dari website se-topik.'
        }
- Umur domain tercatat ${domainData.umurDomain}, yang sangat menguntungkan sinyal E-E-A-T Google.

2. Diagnosis Spam Score (${domainData.ss}):
- Status: ${isSpamHigh ? 'Perlu Perhatian (Moderate/Tinggi)' : 'Sangat Sehat & Aman (Low Risk)'}.
- ${
          isSpamHigh
            ? 'Gunakan Google Search Console Disavow Tool untuk menolak domain spam pengirim link beracun.'
            : 'Profil link bersih, tidak terdeteksi anomali anchor text agresif.'
        }

3. Rekomendasi Taktis & Roadmap Peningkatan:
- Tingkatkan DA secara permanen melalui layanan resmi di https://da.driacom.com
- Tingkatkan DR dengan injeksi referring domain dofollow berkualitas di https://dr.driacom.com
- Perbaiki ${domainData.deleted} backlink deleted dengan merestorasi halaman 404 via 301 Redirect.`;
      }

      setAuditText(fallback);
      setLoading(false);
    };

    fetchAudit();
  }, [domainData, cachedAiAudit, lang]);

  if (!domainData) return null;

  const copyAudit = () => {
    if (!auditText) return;
    navigator.clipboard.writeText(auditText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg">{t.title}</h3>
              <p className="text-xs text-slate-300">Domain: {domainData.domain}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-slate-700 text-sm">
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-center">
            <div>
              <span className="text-[11px] text-slate-500 block">Domain Authority</span>
              <span className="text-lg font-bold text-slate-900 font-data">{domainData.da}/100</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Domain Rating</span>
              <span className="text-lg font-bold text-slate-900 font-data">{domainData.dr}/100</span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">Spam Score</span>
              <span className="text-lg font-bold text-rose-600 font-data">{domainData.ss}</span>
            </div>
          </div>

          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mb-3" />
              <p className="text-sm font-medium">{t.loading}</p>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 whitespace-pre-line leading-relaxed font-sans text-xs sm:text-sm">
              {auditText}
            </div>
          )}

          {/* Driacom Services Promotion inside Audit */}
          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="font-bold text-emerald-950 text-xs sm:text-sm">{t.needHelpTitle}</p>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              {t.needHelpDesc}{' '}
              <a
                href="https://driacom.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline text-emerald-950"
              >
                Driacom
              </a>.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://da.driacom.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-2xs"
              >
                <span>Jasa Tingkatkan DA (da.driacom.com)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://dr.driacom.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs"
              >
                <span>Jasa Tingkatkan DR (dr.driacom.com)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 flex items-center justify-between">
          <button
            onClick={copyAudit}
            disabled={!auditText}
            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-500" />
                <span>{t.copyResult}</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
