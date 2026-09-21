import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  X,
  FileText,
  ShieldCheck,
  Package,
  Globe2,
  Anchor,
  Award,
  CheckCircle2,
  MessageSquare,
  Flag,
} from 'lucide-react';
import type { TradeProduct } from '../../types';
import { RFQModal } from './RFQModal';
import { ReportModal } from '../common/ReportModal';

interface ProductDetailModalProps {
  product: TradeProduct | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { startConversationWith, setActiveTab, setActiveThreadId } = useIMR();
  const [rfqOpen, setRfqOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  if (!product) return null;

  const handleDirectChat = () => {
    const threadId = startConversationWith(
      product.supplierId,
      `Trade Inquiry: ${product.name}`,
      'trade_rfq',
      `Hello ${product.supplierName}, I am inquiring regarding your listing "${product.name}" (HS: ${product.hsCode}). Can we discuss order terms?`,
      product.id,
      product.name
    );
    setActiveThreadId(threadId);
    setActiveTab('messages');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#171717]/65 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden text-[#171717]">
        {/* Header */}
        <div className="p-6 border-b border-[#D8D2C7] bg-[#FFFDF8] flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold uppercase ${
                  product.tradeType === 'export'
                    ? 'bg-[#A8C7B5]/40 text-[#171717] border border-[#A8C7B5]'
                    : 'bg-[#FF5A36]/15 text-[#FF5A36] border border-[#FF5A36]/30'
                }`}
              >
                {product.tradeType === 'export' ? 'Ready for Export' : 'Import Demand / RFP'}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F3EFE7] text-[#171717] font-mono font-bold border border-[#D8D2C7]">
                HS Code: {product.hsCode}
              </span>
              <span className="text-xs text-[#6B6B63] font-mono">
                Origin: {product.originCountry}
              </span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight leading-snug">
              {product.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#F3EFE7] text-[#6B6B63] hover:text-[#171717] hover:bg-[#EBE5DA] border border-[#D8D2C7] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#171717]">
          {/* Main Visual & Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#D8D2C7] aspect-video md:aspect-square bg-[#EBE5DA]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.verifiedSupplier && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#171717]/85 backdrop-blur-md text-[#FFFDF8] text-xs font-semibold flex items-center gap-1.5 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#A8C7B5]" />
                  <span>Verified Merchant</span>
                </div>
              )}
            </div>

            <div className="space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7]">
                  <span className="text-[11px] font-mono text-[#6B6B63] block font-medium">
                    Indicative Price Range
                  </span>
                  <span className="text-2xl font-extrabold text-[#171717] font-mono mt-0.5 block">
                    {product.priceRange}
                  </span>
                  <span className="text-xs text-[#6B6B63] mt-1 block">
                    Minimum Order Quantity (MOQ): <strong className="text-[#171717]">{product.minOrderQty}</strong>
                  </span>
                </div>

                {/* Supplier info */}
                <div className="p-4 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7] space-y-2">
                  <span className="text-[11px] font-mono text-[#6B6B63] font-medium block">
                    Listing Owner / Manufacturer
                  </span>
                  <div>
                    <h4 className="font-bold text-[#171717] text-sm">{product.supplierName}</h4>
                    <p className="text-xs text-[#6B6B63] font-mono">{product.supplierCompany}</p>
                    <span className="text-xs text-[#6B6B63] mt-0.5 block">
                      Location: {product.supplierCountry}
                    </span>
                  </div>
                </div>

                {/* Destination Markets */}
                <div className="p-3.5 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7] text-xs">
                  <span className="text-[#6B6B63] font-medium block mb-1">
                    Primary Destination Markets
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.destinationMarkets.map((m, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-[#FFFDF8] text-[#171717] border border-[#D8D2C7] font-mono text-[11px]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-2.5">
                <button
                  onClick={() => setRfqOpen(true)}
                  className="flex-1 py-3 rounded-xl bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] font-bold text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#171717]/10 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Quotation (RFQ)</span>
                </button>
                <button
                  onClick={handleDirectChat}
                  className="px-4 py-3 rounded-xl bg-[#F3EFE7] hover:bg-[#EBE5DA] text-[#171717] font-semibold text-xs border border-[#D8D2C7] transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-[#FF5A36]" />
                  <span>Chat</span>
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#6B6B63]">
              Commercial & Technical Description
            </h4>
            <p className="text-[#171717] text-xs sm:text-sm leading-relaxed bg-[#F3EFE7] p-4 rounded-2xl border border-[#D8D2C7]">
              {product.description}
            </p>
          </div>

          {/* Incoterms & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7] space-y-2">
              <div className="flex items-center gap-1.5 text-[#171717] text-xs font-bold uppercase tracking-wider font-mono">
                <Anchor className="w-4 h-4 text-[#FF5A36]" /> Shipping & Incoterms
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.shippingIncoterms.map((term, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#FFFDF8] text-[#171717] border border-[#D8D2C7] font-mono"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7] space-y-2">
              <div className="flex items-center gap-1.5 text-[#171717] text-xs font-bold uppercase tracking-wider font-mono">
                <Award className="w-4 h-4 text-[#A8C7B5]" /> Trade Certifications
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.certifications.map((cert, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[#FFFDF8] text-[#171717] border border-[#D8D2C7] font-mono flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#A8C7B5]" />
                    <span>{cert}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Specs Table if available */}
          {product.specs && (
            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#6B6B63]">
                Verified Product Specifications
              </h4>
              <div className="rounded-2xl border border-[#D8D2C7] overflow-hidden text-xs">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-[#D8D2C7] bg-[#FFFDF8]">
                    {Object.entries(product.specs).map(([k, v]) => (
                      <tr key={k}>
                        <td className="py-2.5 px-4 font-mono font-semibold text-[#6B6B63] w-1/3 bg-[#F3EFE7]">
                          {k}
                        </td>
                        <td className="py-2.5 px-4 text-[#171717]">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#D8D2C7] bg-[#FFFDF8] flex items-center justify-between">
          <button
            onClick={() => setReportOpen(true)}
            className="text-xs text-[#6B6B63] hover:text-rose-600 transition-colors flex items-center gap-1 font-mono"
          >
            <Flag className="w-3 h-3" />
            <span>Report Listing</span>
          </button>

          <button
            onClick={() => setRfqOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] font-bold text-xs font-mono tracking-wider uppercase transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Request Formal RFQ</span>
          </button>
        </div>

        {/* RFQ Modal */}
        <RFQModal
          product={product}
          isOpen={rfqOpen}
          onClose={() => setRfqOpen(false)}
        />

        {/* Report Modal */}
        <ReportModal
          isOpen={reportOpen}
          onClose={() => setReportOpen(false)}
          targetId={product.id}
          targetTitle={product.name}
          targetType="product"
        />
      </div>
    </div>
  );
};
