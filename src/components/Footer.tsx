import React from 'react';
import { ExternalLink, Sparkles, Globe, ShieldCheck, Mail, Info, AlertCircle } from 'lucide-react';
import { Language, Translations } from '../i18n';
import { LegalTab } from './LegalModal';

interface FooterProps {
  t: Translations['footer'];
  lang: Language;
  onOpenLegal: (tab: LegalTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ t, lang, onOpenLegal }) => {
  const currentYear = new Date().getFullYear();
  const isEn = lang === 'en';

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 pt-10 pb-32 sm:pb-36 mt-4 sm:mt-6 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs">
                DS
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-white tracking-tight leading-tight">
                  DriaSeo
                </span>
                <span className="text-[11px] text-slate-400 font-semibold leading-tight">
                  by <span className="text-emerald-400 font-bold">Driacom</span>
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-4">
              {t.desc}
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-emerald-400 font-semibold">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>DriaSeo by Driacom</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
              {t.quickLinks}
            </span>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#checker-tool" className="hover:text-emerald-400 transition-colors">
                  {isEn ? 'Check Domain Metrics' : 'Cek Metrik Domain'}
                </a>
              </li>
              <li>
                <a href="#jasa-seo" className="hover:text-emerald-400 transition-colors font-semibold text-emerald-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>{isEn ? 'Official DA & DR Services' : 'Jasa DA & DR Resmi'}</span>
                </a>
              </li>
              <li>
                <a href="#panduan-seo" className="hover:text-emerald-400 transition-colors">
                  {isEn ? 'DA & PA Guide' : 'Panduan Nilai DA & PA'}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-400 transition-colors">
                  {isEn ? 'FAQ & Help' : 'FAQ & Pertanyaan Umum'}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Company Links (About, Contact, Privacy, Disclaimer) */}
          <div>
            <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
              {isEn ? 'Information & Policies' : 'Informasi & Kebijakan'}
            </span>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('about')}
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer text-slate-300"
                >
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isEn ? 'About Us' : 'Tentang Kami'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('contact')}
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer text-slate-300"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isEn ? 'Contact Us' : 'Kontak'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer text-slate-300"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isEn ? 'Privacy Policy' : 'Kebijakan Privasi'}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('disclaimer')}
                  className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors cursor-pointer text-slate-300"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>{isEn ? 'Disclaimer' : 'Penafian'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Tools & Ekosistem Driacom */}
          <div>
            <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3">
              Tools & Ekosistem Driacom
            </span>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="https://save.driacom.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  <span>DriaSave (Downloader Sosmed)</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://convert.driacom.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                >
                  <span>DriaConvert (Konverter File)</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://clip.driacom.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-rose-400 hover:text-rose-300 font-semibold transition-colors"
                >
                  <span>DriaClip (Auto Video Clipper)</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://da.driacom.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-300 hover:text-white font-medium transition-colors"
                >
                  <span>Jasa DA Moz Driacom</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://dr.driacom.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-slate-300 hover:text-white font-medium transition-colors"
                >
                  <span>Jasa DR Ahrefs Driacom</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://driacom.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors text-slate-400"
                >
                  <span>Driacom.com (Website Utama)</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with mandatory "Created by Driacom" link */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © {currentYear} DriaSeo Checker. {t.rightsReserved}
          </p>

          <p className="flex items-center gap-1 font-medium text-slate-300">
            <span>{t.createdBy}</span>
            <a
              href="https://driacom.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold underline transition-colors"
            >
              Driacom
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
