import React, { useState } from 'react';
import { X, Check, DollarSign, Settings, Megaphone, Link as LinkIcon, Save } from 'lucide-react';
import { AdSenseConfig, AffiliateBannerConfig } from '../types';

interface AdSenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AdSenseConfig;
  affiliateConfig: AffiliateBannerConfig;
  onSave: (config: AdSenseConfig, affiliateConfig: AffiliateBannerConfig) => void;
}

export const AdSenseModal: React.FC<AdSenseModalProps> = ({
  isOpen,
  onClose,
  config,
  affiliateConfig,
  onSave,
}) => {
  const [formConfig, setFormConfig] = useState<AdSenseConfig>(config);
  const [formAffiliate, setFormAffiliate] = useState<AffiliateBannerConfig>(affiliateConfig);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formConfig, formAffiliate);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-lg">Pengaturan Google AdSense & Slot Iklan High CTR</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* AdSense Mode Toggle */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h4 className="font-bold text-amber-900 flex items-center gap-1.5 mb-1.5">
              <Megaphone className="w-4 h-4 text-amber-700" />
              Mode Tampilan Iklan
            </h4>
            <p className="text-xs text-amber-800/80 mb-3">
              Pilih apakah ingin menampilkan pratinjau iklan mock ber-CTR tinggi atau menyematkan tag script Google AdSense asli Anda.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFormConfig({ ...formConfig, previewMode: true })}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                  formConfig.previewMode
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                Pratinjau Mock High CTR
              </button>
              <button
                type="button"
                onClick={() => setFormConfig({ ...formConfig, previewMode: false })}
                className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                  !formConfig.previewMode
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                Live Script AdSense Asli
              </button>
            </div>
          </div>

          {/* AdSense ID Inputs */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
              <Settings className="w-4 h-4 text-slate-600" />
              Kredensial Google AdSense
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Publisher ID (ca-pub-XXXXXXXXXX)
              </label>
              <input
                type="text"
                value={formConfig.client}
                onChange={e => setFormConfig({ ...formConfig, client: e.target.value })}
                placeholder="ca-pub-1234567890123456"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Slot Banner Atas (Header Ad)
                </label>
                <input
                  type="text"
                  value={formConfig.topSlot}
                  onChange={e => setFormConfig({ ...formConfig, topSlot: e.target.value })}
                  placeholder="Contoh: 9876543210"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Slot In-Feed Content Ad
                </label>
                <input
                  type="text"
                  value={formConfig.inFeedSlot}
                  onChange={e => setFormConfig({ ...formConfig, inFeedSlot: e.target.value })}
                  placeholder="Contoh: 1122334455"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Pengaturan otomatis tersimpan di browser Anda
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Tersimpan!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Simpan Pengaturan</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
