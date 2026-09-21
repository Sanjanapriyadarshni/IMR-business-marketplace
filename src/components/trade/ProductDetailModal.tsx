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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800/80 bg-slate-900/90 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  product.tradeType === 'export'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}
              >
                {product.tradeType === 'export' ? 'Ready for Export' : 'Import Demand / RFP'}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-semibold">
                HS Code: {product.hsCode}
              </span>
              <span className="text-xs text-slate-400">
                Origin: {product.originCountry}
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight leading-snug">
              {product.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* Main Visual & Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 aspect-video md:aspect-square bg-slate-950">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.verifiedSupplier && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/90 backdrop-blur-md border border-teal-500/40 text-teal-300 text-xs font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Verified Merchant</span>
                </div>
              )}
            </div>

            <div className="space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Indicative Price Range</span>
                  <span className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5 block">
                    {product.priceRange}
                  </span>
                  <span className="text-xs text-slate-500 mt-1 block">
                    Minimum Order Quantity (MOQ): <strong className="text-white">{product.minOrderQty}</strong>
                  </span>
                </div>

                {/* Supplier info */}
                <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <span className="text-[11px] text-slate-400 font-medium block">
                    Listing Owner / Manufacturer
                  </span>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-sm">{product.supplierName}</h4>
                      <p className="text-xs text-slate-400">{product.supplierCompany}</p>
                      <span className="text-xs text-slate-300 mt-0.5 block">
                        Location: {product.supplierCountry}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Destination Markets */}
                <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs">
                  <span className="text-slate-400 font-medium block mb-1">
                    Primary Destination Markets
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.destinationMarkets.map((m, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
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
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <FileText className="w-4 h-4" />
                  <span>Request Quotation (RFQ)</span>
                </button>
                <button
                  onClick={handleDirectChat}
                  className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-teal-400" />
                  <span>Chat</span>
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Commercial & Technical Description
            </h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800/80">
              {product.description}
            </p>
          </div>

          {/* Incoterms & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-blue-400 text-xs font-semibold uppercase tracking-wider">
                <Anchor className="w-4 h-4" /> Shipping & Incoterms
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.shippingIncoterms.map((term, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                <Award className="w-4 h-4" /> Trade Certifications
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.certifications.map((cert, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{cert}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Specs Table if available */}
          {product.specs && (
            <div className="space-y-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Verified Product Specifications
              </h4>
              <div className="rounded-2xl border border-slate-800 overflow-hidden text-xs">
                <table className="w-full text-left">
                  <tbody className="divide-y divide-slate-800 bg-slate-950/50">
                    {Object.entries(product.specs).map(([k, v]) => (
                      <tr key={k}>
                        <td className="py-2.5 px-4 font-semibold text-slate-400 w-1/3 bg-slate-950/80">
                          {k}
                        </td>
                        <td className="py-2.5 px-4 text-slate-200">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <button
            onClick={() => setReportOpen(true)}
            className="text-xs text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1"
          >
            <Flag className="w-3 h-3" />
            <span>Report Listing</span>
          </button>

          <button
            onClick={() => setRfqOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
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
