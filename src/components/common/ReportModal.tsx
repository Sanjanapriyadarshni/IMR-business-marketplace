import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import { AlertOctagon, X } from 'lucide-react';
import type { ReportItem } from '../../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetId: string;
  targetTitle: string;
  targetType: ReportItem['targetType'];
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetId,
  targetTitle,
  targetType,
}) => {
  const { submitReport } = useIMR();
  const [reason, setReason] = useState<ReportItem['reason']>('Scam / Fraud');
  const [details, setDetails] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim()) return;

    submitReport({
      targetId,
      targetTitle,
      targetType,
      reason,
      details,
    });
    setDetails('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-rose-400">
            <AlertOctagon className="w-5 h-5" />
            <h3 className="font-bold text-base text-white">File Compliance Report</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-sm">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider block font-semibold">
              Reporting Subject ({targetType})
            </span>
            <p className="mt-1 font-medium text-slate-200 bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/60 truncate">
              {targetTitle}
            </p>
          </div>

          <div>
            <label className="text-xs text-slate-400 uppercase tracking-wider block font-semibold mb-1.5">
              Violation Category
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as ReportItem['reason'])}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-teal-500 text-sm"
            >
              <option value="Scam / Fraud">Scam / Fraudulent Solicitation</option>
              <option value="IP Infringement">Intellectual Property Infringement / Copyright</option>
              <option value="Misleading Claims">Misleading Financial or Technical Claims</option>
              <option value="Spam">Spam / Unsolicited Promotion</option>
              <option value="Unverified Safety Issue">Unverified Safety / Hazardous Product</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 uppercase tracking-wider block font-semibold mb-1.5">
              Detailed Evidence / Explanation
            </label>
            <textarea
              rows={4}
              required
              placeholder="Describe the issue, suspicious payment requests, or copyright evidence..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-teal-500 text-sm placeholder:text-slate-600 resize-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors shadow-lg shadow-rose-900/30"
            >
              Submit Report to Compliance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
