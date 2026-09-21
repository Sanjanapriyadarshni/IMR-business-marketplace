import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import { FileText, X, Send, Anchor, ShieldCheck } from 'lucide-react';
import type { TradeProduct } from '../../types';

interface RFQModalProps {
  product: TradeProduct | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RFQModal: React.FC<RFQModalProps> = ({ product, isOpen, onClose }) => {
  const { sendRFQ, currentUser } = useIMR();

  const [quantity, setQuantity] = useState('20 Metric Tons');
  const [targetPort, setTargetPort] = useState('Jebel Ali Port, UAE');
  const [targetDate, setTargetDate] = useState('Within 45 days');
  const [paymentTerms, setPaymentTerms] = useState('100% Irrevocable Letter of Credit (LC) at Sight');
  const [notes, setNotes] = useState(
    'Please provide CIF quotation including phytosanitary certificates, Eurofins lab inspection, and export packing specs.'
  );

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendRFQ(product.id, {
      quantity,
      targetPort,
      notes: `${notes} (Payment Terms: ${paymentTerms} | Target Date: ${targetDate})`,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400">
            <FileText className="w-5 h-5" />
            <div>
              <h3 className="font-bold text-base text-white">Request Formal Quotation (RFQ)</h3>
              <p className="text-[11px] text-slate-400">Direct trade inquiry to {product.supplierName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product summary pill */}
        <div className="my-4 p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0"
          />
          <div className="min-w-0">
            <h4 className="font-semibold text-white text-xs sm:text-sm truncate">{product.name}</h4>
            <p className="text-[11px] text-slate-400 font-mono">HS Code: {product.hsCode} • MOQ: {product.minOrderQty}</p>
            <p className="text-[11px] text-emerald-400 font-semibold">{product.priceRange}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Required Order Quantity *
              </label>
              <input
                type="text"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Destination Port / Location *
              </label>
              <input
                type="text"
                required
                value={targetPort}
                onChange={(e) => setTargetPort(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Target Delivery Timeline
              </label>
              <input
                type="text"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 font-semibold block mb-1">
                Preferred Payment Terms
              </label>
              <select
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="100% Irrevocable Letter of Credit (LC) at Sight">Irrevocable LC at Sight</option>
                <option value="30% Advance T/T, 70% against Bill of Lading (BL)">30% Advance T/T + 70% BL</option>
                <option value="Escrow Trade Settlement">IMR Escrow Trade Settlement</option>
                <option value="Cash Against Documents (CAD)">Cash Against Documents (CAD)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">
              Inspection, Packing & Certification Requirements
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 resize-none placeholder:text-slate-600"
            />
          </div>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>RFQ will open a secure discussion thread directly with the verified supplier.</span>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Quotation Request</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
