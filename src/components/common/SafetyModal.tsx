import React from 'react';
import { ShieldCheck, AlertTriangle, Scale, Lock, FileText, X } from 'lucide-react';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Trust, Safety & Legal Governance</h3>
              <p className="text-xs text-slate-400">Standards, verified trade credentials, and risk guidelines</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* No Success Guarantee Alert */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-amber-300">No Guarantee of Commercial Success</h4>
              <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
                All business ideas, proposals, and trade opportunities published on IMR are presented for exploratory and partnership evaluation purposes. IMR does not certify, guarantee, or underwrite financial returns, profitability, or venture success. Users must conduct their own independent legal, financial, and technical due diligence before entering contracts.
              </p>
            </div>
          </div>

          {/* Intellectual Property Protection */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Scale className="w-4 h-4 text-teal-400" />
              <h4>Intellectual Property & Licensing Protocols</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Publishing high-level concepts on IMR does not automatically transfer ownership of patents, trade secrets, or proprietary source code. Creators are strongly advised to execute formal Non-Disclosure Agreements (NDAs) and definitive Licensing Agreements drafted by qualified legal counsel before disclosing technical schematics or confidential blueprints.
            </p>
          </div>

          {/* Verification Badges Policy */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Lock className="w-4 h-4 text-teal-400" />
              <h4>Business Verification Tiers</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Verification badges (such as IEC Verified, FSSAI Certified, EU Bio-Siegel, and Accredited Investor) indicate that administrative or corporate documentation was audited at the time of review. Always verify cross-border payment instruments (such as Irrevocable Letters of Credit / LC) through recognized tier-1 international trade banks.
            </p>
          </div>

          {/* Anti-Fraud & Scam Reporting */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <FileText className="w-4 h-4 text-teal-400" />
              <h4>Reporting Suspicious Activities</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              If an account requests unescrowed wire transfers, promotes speculative investment schemes, or infringes upon copyrighted materials, report them immediately using the in-app "Report" button. Our compliance desk takes action within 12 hours.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold text-xs transition-colors"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
