import React from 'react';
import { X, ShieldCheck, Mail, Info, FileText, AlertCircle, ExternalLink } from 'lucide-react';
import { Language } from '../i18n';

export type LegalTab = 'about' | 'contact' | 'privacy' | 'disclaimer';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: LegalTab;
  onSelectTab: (tab: LegalTab) => void;
  lang?: Language;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  lang = 'id',
}) => {
  if (!isOpen) return null;

  const isEn = lang === 'en';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              DS
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">
                {isEn ? 'Information & Legal Policies' : 'Informasi & Kebijakan Legal'}
              </h3>
              <p className="text-xs text-slate-400">DriaSeo Checker by Driacom</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-600 dark:text-slate-400 overflow-x-auto">
          <button
            onClick={() => onSelectTab('about')}
            className={`py-3 px-4 text-center border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'about'
                ? 'border-emerald-600 text-emerald-800 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Info className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isEn ? 'About Us' : 'Tentang Kami'}</span>
          </button>
          <button
            onClick={() => onSelectTab('contact')}
            className={`py-3 px-4 text-center border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'contact'
                ? 'border-emerald-600 text-emerald-800 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isEn ? 'Contact Us' : 'Kontak'}</span>
          </button>
          <button
            onClick={() => onSelectTab('privacy')}
            className={`py-3 px-4 text-center border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'privacy'
                ? 'border-emerald-600 text-emerald-800 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isEn ? 'Privacy Policy' : 'Kebijakan Privasi'}</span>
          </button>
          <button
            onClick={() => onSelectTab('disclaimer')}
            className={`py-3 px-4 text-center border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
              activeTab === 'disclaimer'
                ? 'border-emerald-600 text-emerald-800 dark:text-emerald-400 bg-white dark:bg-slate-900'
                : 'border-transparent hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{isEn ? 'Disclaimer' : 'Penafian'}</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-4 leading-relaxed bg-white dark:bg-slate-900">
          {activeTab === 'about' && (
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {isEn ? 'About DriaSeo Checker' : 'Tentang DriaSeo Checker'}
              </h4>
              <p className="mb-3">
                {isEn 
                  ? 'DriaSeo Checker is a modern, high-precision domain authority analysis platform developed under the Driacom ecosystem. Designed for digital marketers, webmasters, and SEO practitioners to evaluate essential search performance metrics rapidly and accurately.'
                  : 'DriaSeo Checker adalah platform analisis otoritas domain modern berkecepatan tinggi yang dikembangkan di bawah ekosistem Driacom. Dirancang untuk memudahkan para praktisi SEO, blogger, agensi digital, dan pemilik bisnis dalam mengevaluasi metrik kunci situs secara instan dan akurat.'}
              </p>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-200 dark:border-emerald-800/80 mb-3">
                <span className="font-bold text-emerald-900 dark:text-emerald-300 block mb-1">
                  {isEn ? 'Core Features:' : 'Fitur Utama:'}
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                  <li>{isEn ? 'Instant batch multi-domain evaluation (up to 10 domains simultaneously)' : 'Pengecekan multi-domain sekaligus (batch hingga 10 domain)'}</li>
                  <li>{isEn ? 'Moz Domain Authority (DA), Page Authority (PA), and Spam Score evaluation' : 'Metrik Moz Domain Authority (DA), Page Authority (PA), dan Spam Score'}</li>
                  <li>{isEn ? 'Ahrefs Domain Rating (DR) and link profile calibration' : 'Metrik Ahrefs Domain Rating (DR) dan estimasi profil backlink'}</li>
                  <li>{isEn ? 'Live Authoritative RDAP query for precise registration and expiration dates' : 'Query Authoritative RDAP resmi untuk tanggal registrasi & kedaluwarsa'}</li>
                  <li>{isEn ? 'Export to CSV and one-click summary clipboard copying' : 'Ekspor hasil ke CSV dan salin ringkasan instan'}</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {isEn ? 'Contact Us' : 'Hubungi Tim Kami'}
              </h4>
              <p className="mb-4">
                {isEn
                  ? 'Have inquiries, feedback, or need professional domain authority enhancement services? Feel free to reach out through our official channels:'
                  : 'Jika Anda memiliki pertanyaan, saran, kemitraan periklanan, atau membutuhkan layanan optimasi otoritas website, silakan hubungi tim kami:'}
              </p>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
                      Email
                    </span>
                    <a href="mailto:driacom.id@gmail.com" className="font-semibold text-slate-900 dark:text-white hover:underline">
                      driacom.id@gmail.com
                    </a>
                  </div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-3">
                  <ExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block uppercase">
                      Website Resmi
                    </span>
                    <a href="https://driacom.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-700 dark:text-blue-400 hover:underline">
                      https://driacom.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {isEn ? 'Privacy Policy' : 'Kebijakan Privasi'}
              </h4>
              <p className="mb-2">
                {isEn 
                  ? 'At DriaSeo Checker, we prioritize your data privacy. We do not require visitors to register or submit private personal credentials to use our metric checking tool.'
                  : 'Di DriaSeo Checker, kami sangat menghargai privasi Anda. Pengunjung tidak diwajibkan melakukan pendaftaran akun untuk menggunakan fitur pengecekan metrik domain.'}
              </p>
              <h5 className="font-bold text-slate-900 dark:text-white mt-3 mb-1">
                {isEn ? '1. Google AdSense & Cookies' : '1. Periklanan Google AdSense & Cookie'}
              </h5>
              <p className="mb-2">
                {isEn
                  ? 'Third-party vendors, including Google, use cookies to serve ads based on prior visits to our website. Google use of advertising cookies enables it and its partners to serve relevant ads based on users visits across the internet.'
                  : 'Pihak ketiga, termasuk Google, menggunakan cookie untuk menayangkan iklan berdasarkan kunjungan pengguna sebelumnya ke website ini. Anda dapat mempelajari atau menonaktifkan personalisasi iklan melalui Pengaturan Iklan Google.'}
              </p>
              <h5 className="font-bold text-slate-900 dark:text-white mt-3 mb-1">
                {isEn ? '2. Domain Search Privacy' : '2. Kerahasiaan Domain yang Diperiksa'}
              </h5>
              <p>
                {isEn
                  ? 'Domains submitted for analysis are queried strictly for metric calculation and are not permanently logged, disclosed, or sold to third parties.'
                  : 'Nama domain yang Anda masukkan untuk dianalisis hanya digunakan untuk mengambil metrik dari database otoritatif dan tidak diperjualbelikan kepada pihak mana pun.'}
              </p>
            </div>
          )}

          {activeTab === 'disclaimer' && (
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                {isEn ? 'Disclaimer & Trademarks' : 'Penafian (Disclaimer)'}
              </h4>
              <p className="mb-2">
                {isEn
                  ? 'All metric names, logos, and trademarks (including Moz, Domain Authority, Page Authority, Spam Score, and Ahrefs Domain Rating) belong exclusively to their respective owners.'
                  : 'Semua nama metrik, merek dagang, dan logo pihak ketiga (termasuk Moz, Domain Authority, Page Authority, Spam Score, dan Ahrefs Domain Rating) adalah hak cipta dan merek terdaftar dari pemilik resminya masing-masing.'}
              </p>
              <p className="mb-2">
                {isEn
                  ? 'DriaSeo Checker provides estimated algorithmic and authoritative data for informational and analytical reference. While we strive for accuracy via live RDAP and calibration, search engine rankings depend on hundreds of dynamic algorithmic factors.'
                  : 'DriaSeo Checker menyajikan kalkulasi dan data otoritatif sebagai referensi analitis. Peringkat sebenarnya di mesin pencari Google dipengaruhi oleh ratusan faktor dinamis yang terus berkembang.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-950 p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
          >
            {isEn ? 'Close' : 'Tutup'}
          </button>
        </div>
      </div>
    </div>
  );
};
