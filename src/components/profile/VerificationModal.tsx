import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import { ShieldCheck, X, Upload, FileText, CheckCircle2 } from 'lucide-react';
import type { VerificationRequest } from '../../types';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({ isOpen, onClose }) => {
  const { submitVerification, currentUser } = useIMR();

  const [documentType, setDocumentType] = useState<VerificationRequest['documentType']>('Import Export Code (IEC)');
  const [documentNumber, setDocumentNumber] = useState('');
  const [companyName, setCompanyName] = useState(currentUser.company);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentNumber.trim()) return;

    submitVerification({
      documentType,
      documentNumber,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-teal-400">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="font-bold text-base text-white">Apply for Verified Business Badge</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs sm:text-sm">
          <div>
            <label className="text-slate-400 font-semibold block mb-1">Company / Entity Name</label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
            />
          </div>

          <div>
            <label className="text-slate-400 font-semibold block mb-1">Verification Document Type</label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white"
            >
              <option value="Import Export Code (IEC)">Import Export Code (IEC / Customs EORI)</option>
              <option value="Business Registration">Company Registration / Articles of Incorporation</option>
              <option value="Tax / GST Certificate">Federal Tax / VAT / GST Certificate</option>
              <option value="Factory License">Industrial Factory License / GMP Certificate</option>
            </select>
          </div>

          <div>
            <label className="text-slate-400 font-semibold block mb-1">Official Document Registration Number</label>
            <input
              type="text"
              required
              placeholder="e.g. IEC-0504018892 or EORI-DE1234567"
              value={documentNumber}
              onChange={(e) => setDocumentNumber(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-white font-mono"
            />
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-dashed border-slate-700 text-center space-y-1">
            <Upload className="w-6 h-6 text-teal-400 mx-auto" />
            <p className="font-semibold text-white text-xs">Simulated PDF Document Upload</p>
            <span className="text-[11px] text-slate-500 block">Drag & drop scanned certificate (Max 10MB)</span>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold"
            >
              Submit for Admin Audit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
