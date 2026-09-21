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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/65 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-3xl max-w-lg w-full p-6 shadow-2xl overflow-hidden text-[#171717]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D8D2C7]">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#FF5A36]" />
            <div>
              <h3 className="font-bold text-base text-[#171717]">Request Formal Quotation (RFQ)</h3>
              <p className="text-[11px] text-[#6B6B63] font-mono">Direct trade inquiry to {product.supplierName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#6B6B63] hover:text-[#171717] hover:bg-[#F3EFE7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product summary pill */}
        <div className="my-4 p-3 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7] flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-12 h-12 rounded-xl object-cover border border-[#D8D2C7] shrink-0"
          />
          <div className="min-w-0">
            <h4 className="font-semibold text-[#171717] text-xs sm:text-sm truncate">{product.name}</h4>
            <p className="text-[11px] text-[#6B6B63] font-mono">HS Code: {product.hsCode} • MOQ: {product.minOrderQty}</p>
            <p className="text-[11px] text-[#171717] font-mono font-bold">{product.priceRange}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[#6B6B63] font-mono uppercase font-semibold block mb-1">
                Required Order Quantity *
              </label>
              <input
                type="text"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full bg-[#F3EFE7] border border-[#D8D2C7] rounded-xl px-3 py-2 text-[#171717] focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div>
              <label className="text-[#6B6B63] font-mono uppercase font-semibold block mb-1">
                Destination Port / Location *
              </label>
              <input
                type="text"
                required
                value={targetPort}
                onChange={(e) => setTargetPort(e.target.value)}
                className="w-full bg-[#F3EFE7] border border-[#D8D2C7] rounded-xl px-3 py-2 text-[#171717] focus:outline-none focus:border-[#FF5A36]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-[#6B6B63] font-mono uppercase font-semibold block mb-1">
                Target Delivery Timeline
              </label>
              <input
                type="text"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full bg-[#F3EFE7] border border-[#D8D2C7] rounded-xl px-3 py-2 text-[#171717] focus:outline-none focus:border-[#FF5A36]"
              />
            </div>

            <div>
              <label className="text-[#6B6B63] font-mono uppercase font-semibold block mb-1">
                Preferred Payment Terms
              </label>
              <select
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full bg-[#F3EFE7] border border-[#D8D2C7] rounded-xl px-2.5 py-2 text-[#171717] focus:outline-none focus:border-[#FF5A36]"
              >
                <option value="100% Irrevocable Letter of Credit (LC) at Sight">Irrevocable LC at Sight</option>
                <option value="30% Advance T/T, 70% against Bill of Lading (BL)">30% Advance T/T + 70% BL</option>
                <option value="Escrow Trade Settlement">IMR Escrow Trade Settlement</option>
                <option value="Cash Against Documents (CAD)">Cash Against Documents (CAD)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[#6B6B63] font-mono uppercase font-semibold block mb-1">
              Inspection, Packing & Certification Requirements
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#F3EFE7] border border-[#D8D2C7] rounded-xl p-3 text-[#171717] focus:outline-none focus:border-[#FF5A36] resize-none placeholder:text-[#6B6B63]"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#A8C7B5]/20 border border-[#A8C7B5]/40 text-[11px] text-[#171717] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#171717] shrink-0" />
            <span>RFQ will open a secure discussion thread directly with the verified supplier.</span>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-[#6B6B63] hover:text-[#171717] font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
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
