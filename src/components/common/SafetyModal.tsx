import React from 'react';
import { ShieldCheck, AlertTriangle, Scale, Lock, FileText, X } from 'lucide-react';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/65 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#FFFDF8] border border-[#D8D2C7] rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#171717]">
        {/* Header */}
        <div className="p-6 border-b border-[#D8D2C7] flex items-center justify-between bg-[#FFFDF8]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7] text-[#171717]">
              <ShieldCheck className="w-6 h-6 text-[#A8C7B5]" />
            </div>
            <div>
              <h3 className="font-editorial text-xl font-bold text-[#171717]">Trust, Safety & Legal Governance</h3>
              <p className="text-xs text-[#6B6B63] font-mono">Standards, verified trade credentials, and risk guidelines</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#6B6B63] hover:text-[#171717] hover:bg-[#F3EFE7] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#171717]">
          {/* No Success Guarantee Alert */}
          <div className="p-4 rounded-2xl bg-[#FFFDF8] border border-amber-500/40 flex items-start gap-3 shadow-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-900 font-mono uppercase">No Guarantee of Commercial Success</h4>
              <p className="text-xs text-[#6B6B63] mt-1 leading-relaxed">
                All business ideas, proposals, and trade opportunities published on IMR are presented for exploratory and partnership evaluation purposes. IMR does not certify, guarantee, or underwrite financial returns, profitability, or venture success. Users must conduct their own independent legal, financial, and technical due diligence before entering contracts.
              </p>
            </div>
          </div>

          {/* Intellectual Property Protection */}
          <div className="space-y-1.5 p-4 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7]">
            <div className="flex items-center gap-2 text-[#171717] font-bold text-xs uppercase font-mono tracking-wider">
              <Scale className="w-4 h-4 text-[#FF5A36]" />
              <h4>Intellectual Property & Licensing Protocols</h4>
            </div>
            <p className="text-xs text-[#6B6B63] leading-relaxed">
              Publishing high-level concepts on IMR does not automatically transfer ownership of patents, trade secrets, or proprietary source code. Creators are strongly advised to execute formal Non-Disclosure Agreements (NDAs) and definitive Licensing Agreements drafted by qualified legal counsel before disclosing technical schematics or confidential blueprints.
            </p>
          </div>

          {/* Verification Badges Policy */}
          <div className="space-y-1.5 p-4 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7]">
            <div className="flex items-center gap-2 text-[#171717] font-bold text-xs uppercase font-mono tracking-wider">
              <Lock className="w-4 h-4 text-[#A8C7B5]" />
              <h4>Business Verification Tiers</h4>
            </div>
            <p className="text-xs text-[#6B6B63] leading-relaxed">
              Verification badges (such as IEC Verified, FSSAI Certified, EU Bio-Siegel, and Accredited Investor) indicate that administrative or corporate documentation was audited at the time of review. Always verify cross-border payment instruments (such as Irrevocable Letters of Credit / LC) through recognized tier-1 international trade banks.
            </p>
          </div>

          {/* Anti-Fraud & Scam Reporting */}
          <div className="space-y-1.5 p-4 rounded-2xl bg-[#F3EFE7] border border-[#D8D2C7]">
            <div className="flex items-center gap-2 text-[#171717] font-bold text-xs uppercase font-mono tracking-wider">
              <FileText className="w-4 h-4 text-[#171717]" />
              <h4>Reporting Suspicious Activities</h4>
            </div>
            <p className="text-xs text-[#6B6B63] leading-relaxed">
              If an account requests unescrowed wire transfers, promotes speculative investment schemes, or infringes upon copyrighted materials, report them immediately using the in-app "Report" button. Our compliance desk takes action within 12 hours.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#D8D2C7] bg-[#FFFDF8] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#171717] hover:bg-[#FF5A36] text-[#FFFDF8] font-bold font-mono text-xs uppercase tracking-wider transition-colors"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
