import React, { useState } from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users,
  Lightbulb,
  Package,
  FileCheck,
  TrendingUp,
  Ban,
  Eye,
  Check,
} from 'lucide-react';
import type { BusinessIdea, TradeProduct } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    users,
    ideas,
    products,
    verifications,
    reports,
    adminApproveIdea,
    adminRejectIdea,
    adminApproveProduct,
    adminRejectProduct,
    adminApproveVerification,
    adminResolveReport,
    blockUser,
    addToast,
  } = useIMR();

  const [activeAdminTab, setActiveAdminTab] = useState<'ideas' | 'products' | 'verifications' | 'reports' | 'users'>('ideas');

  const pendingIdeas = ideas.filter((i) => i.status === 'approved' || i.status === 'pending');
  const pendingProducts = products.filter((p) => p.status === 'approved' || p.status === 'pending');

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Governance & Trust Control Center
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            IMR Global Administration & Risk Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Audit compliance, verify merchant credentials, moderate ideas and products, and resolve fraud reports.
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 block text-[11px]">Total Members</span>
          <span className="text-2xl font-extrabold text-white font-mono mt-1 block">
            {users.length * 1420 + 850}
          </span>
          <span className="text-[10px] text-emerald-400 mt-1 block">↑ 14% this month</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 block text-[11px]">Active Business Ideas</span>
          <span className="text-2xl font-extrabold text-teal-400 font-mono mt-1 block">
            {ideas.length}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">22 Active Categories</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 block text-[11px]">Trade Listings</span>
          <span className="text-2xl font-extrabold text-emerald-400 font-mono mt-1 block">
            {products.length}
          </span>
          <span className="text-[10px] text-slate-400 mt-1 block">HS Code Indexed</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 block text-[11px]">Pending Verifications</span>
          <span className="text-2xl font-extrabold text-amber-400 font-mono mt-1 block">
            {verifications.filter((v) => v.status === 'pending').length}
          </span>
          <span className="text-[10px] text-amber-300 mt-1 block">Requires KYC Audit</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 block text-[11px]">Active Scam/IP Flags</span>
          <span className="text-2xl font-extrabold text-rose-400 font-mono mt-1 block">
            {reports.filter((r) => r.status === 'pending').length}
          </span>
          <span className="text-[10px] text-rose-400 mt-1 block">Under Investigation</span>
        </div>
      </div>

      {/* Sub-Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar p-1 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setActiveAdminTab('ideas')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'ideas'
              ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Idea Moderation ({ideas.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('products')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'products'
              ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Product Moderation ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('verifications')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'verifications'
              ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Merchant KYC & IEC ({verifications.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('reports')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'reports'
              ? 'bg-rose-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Reports & Fraud ({reports.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab('users')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeAdminTab === 'users'
              ? 'bg-blue-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Users & Roles ({users.length})</span>
        </button>
      </div>

      {/* Tab Panels */}
      {/* 1. Idea Moderation */}
      {activeAdminTab === 'ideas' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Moderate active marketplace business concepts</span>
          </div>

          <div className="space-y-3">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 font-semibold">
                      {idea.category}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${
                        idea.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {idea.status}
                    </span>
                    <span className="text-xs text-slate-400">Founder: {idea.founderName}</span>
                  </div>
                  <h3 className="font-bold text-white text-base">{idea.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-1">{idea.tagline}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => adminApproveIdea(idea.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => adminRejectIdea(idea.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-rose-300 border border-slate-700 font-semibold text-xs transition-colors flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Flag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 2. Product Moderation */}
      {activeAdminTab === 'products' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="p-4 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-700 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-emerald-400 font-bold">HS {prod.hsCode}</span>
                      <span className="text-xs text-slate-400">Supplier: {prod.supplierName}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm truncate mt-0.5">{prod.name}</h4>
                    <span className="text-xs text-slate-400">MOQ: {prod.minOrderQty} • Origin: {prod.originCountry}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => adminApproveProduct(prod.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => adminRejectProduct(prod.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900 text-rose-300 font-semibold text-xs border border-slate-700"
                  >
                    Flag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Merchant Verifications */}
      {activeAdminTab === 'verifications' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {verifications.map((ver) => (
              <div
                key={ver.id}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-semibold">
                      {ver.documentType}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${
                        ver.status === 'approved'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {ver.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-base">{ver.companyName}</h4>
                  <p className="text-xs text-slate-400">
                    Applicant: <strong className="text-white">{ver.userName}</strong> • Number:{' '}
                    <span className="font-mono text-teal-300 font-semibold">{ver.documentNumber}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {ver.status === 'pending' ? (
                    <button
                      onClick={() => adminApproveVerification(ver.id)}
                      className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md"
                    >
                      Issue Verified Badge
                    </button>
                  ) : (
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Badge Active
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Scam Reports & Fraud Monitoring */}
      {activeAdminTab === 'reports' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {reports.map((rep) => (
              <div
                key={rep.id}
                className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-xs">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Report #{rep.id}: {rep.reason}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
                      rep.status === 'pending'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {rep.status}
                  </span>
                </div>

                <div className="text-xs space-y-1">
                  <p className="text-white font-semibold">Reported Subject: {rep.targetTitle}</p>
                  <p className="text-slate-300 bg-slate-950 p-3 rounded-2xl border border-slate-800 leading-relaxed">
                    "{rep.details}"
                  </p>
                  <span className="text-[11px] text-slate-500 block pt-1">
                    Filed by {rep.reporterName} on {new Date(rep.timestamp).toLocaleDateString()}
                  </span>
                </div>

                {rep.status === 'pending' && (
                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      onClick={() => blockUser(rep.targetId)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900 text-rose-300 text-xs font-semibold flex items-center gap-1"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>Ban Entity</span>
                    </button>
                    <button
                      onClick={() => adminResolveReport(rep.id)}
                      className="px-4 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs"
                    >
                      Resolve & Dismiss
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Users & Roles */}
      {activeAdminTab === 'users' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {users.map((u) => (
              <div
                key={u.id}
                className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-700"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-white truncate">{u.name}</h4>
                    <p className="text-slate-400 text-[11px] truncate">{u.company}</p>
                    <span className="text-teal-300 font-semibold capitalize text-[10px]">
                      {u.role.replace(/_/g, ' ')}
                    </span>
                  </div>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">{u.country}</span>
                  <span className="font-bold text-emerald-400">{u.reputationScore}% Score</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
