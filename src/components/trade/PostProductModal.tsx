import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import { X, Package, ShieldCheck, Upload } from 'lucide-react';
import { BUSINESS_CATEGORIES } from '../../types';

interface PostProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTradeType?: 'export' | 'import';
}

export const PostProductModal: React.FC<PostProductModalProps> = ({
  isOpen,
  onClose,
  defaultTradeType = 'export',
}) => {
  const { addProduct, currentUser } = useIMR();

  const [tradeType, setTradeType] = useState<'export' | 'import'>(defaultTradeType);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Food & Beverages');
  const [description, setDescription] = useState('');
  const [hsCode, setHsCode] = useState('0910.30');
  const [minOrderQty, setMinOrderQty] = useState('5 Metric Tons');
  const [priceRange, setPriceRange] = useState('$1,800 - $2,100 / MT');
  const [originCountry, setOriginCountry] = useState(currentUser.country || 'India');
  const [destinationMarkets, setDestinationMarkets] = useState('United Arab Emirates, Germany, United States');
  const [shippingIncoterms, setShippingIncoterms] = useState('FOB Mundra, CIF Jebel Ali, CIF Hamburg');
  const [certifications, setCertifications] = useState('ISO 22000, FSSAI, Halal, USDA Organic');
  const [image, setImage] = useState(
    'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=80'
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addProduct({
      name,
      image,
      description,
      hsCode,
      minOrderQty,
      priceRange,
      tradeType,
      originCountry,
      destinationMarkets: destinationMarkets.split(',').map((s) => s.trim()).filter(Boolean),
      shippingIncoterms: shippingIncoterms.split(',').map((s) => s.trim()).filter(Boolean),
      certifications: certifications.split(',').map((s) => s.trim()).filter(Boolean),
      category,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">List Product for Global Trade</h3>
              <p className="text-xs text-slate-400">Reach verified cross-border importers, buyers & distributors</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm flex-1">
          {/* Trade Type Switcher */}
          <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-slate-950 border border-slate-800">
            <button
              type="button"
              onClick={() => setTradeType('export')}
              className={`py-2 rounded-xl font-bold transition-all ${
                tradeType === 'export'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Export Offering (We Supply)
            </button>
            <button
              type="button"
              onClick={() => setTradeType('import')}
              className={`py-2 rounded-xl font-bold transition-all ${
                tradeType === 'import'
                  ? 'bg-blue-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Import Requirement / RFP (We Buy)
            </button>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Single-Estate Organic Salem Turmeric Finger (Curcumin > 5.2%)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                HS Tariff Code (Harmonized System) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 0910.30.20"
                value={hsCode}
                onChange={(e) => setHsCode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Industry Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              >
                {BUSINESS_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Minimum Order Quantity (MOQ) *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 5 Metric Tons or 100 Units"
                value={minOrderQty}
                onChange={(e) => setMinOrderQty(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Target Price Range *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. $1,650 - $1,850 / MT"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Detailed Product Specifications & Quality Parameters *
            </label>
            <textarea
              rows={3}
              required
              placeholder="Detail purity levels, shelf life, moisture %, packaging types (jute, drums, pallets)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Origin Country *
              </label>
              <input
                type="text"
                required
                value={originCountry}
                onChange={(e) => setOriginCountry(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Target Destination Markets
              </label>
              <input
                type="text"
                placeholder="e.g. UAE, Germany, USA, UK"
                value={destinationMarkets}
                onChange={(e) => setDestinationMarkets(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Incoterms & Shipping Ports
              </label>
              <input
                type="text"
                placeholder="e.g. FOB Mundra, CIF Jebel Ali"
                value={shippingIncoterms}
                onChange={(e) => setShippingIncoterms(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Certifications Held
              </label>
              <input
                type="text"
                placeholder="e.g. ISO 9001, FDA, CE, Halal"
                value={certifications}
                onChange={(e) => setCertifications(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-300 hover:text-white font-semibold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20"
            >
              Publish Trade Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
