import React from 'react';
import { useIMR } from '../../context/IMRContext';
import {
  Home,
  Lightbulb,
  Globe2,
  Compass,
  MessageSquare,
  User,
  Shield,
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, threads, currentUser } = useIMR();

  const unreadMessagesCount = threads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'ideas', label: 'Ideas', icon: Lightbulb },
    { id: 'trade', label: 'Global Trade', icon: Globe2 },
    { id: 'matching', label: 'Matching', icon: Compass },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadMessagesCount },
    {
      id: currentUser.role === 'admin' ? 'admin' : 'profile',
      label: currentUser.role === 'admin' ? 'Admin' : 'Profile',
      icon: currentUser.role === 'admin' ? Shield : User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800/90 max-w-7xl mx-auto px-2 py-1.5 transition-all">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative group ${
                isActive
                  ? 'text-teal-400 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-teal-400' : 'group-hover:scale-105'
                  }`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-emerald-500 text-slate-950 text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${isActive ? 'text-teal-300' : 'text-slate-400'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-6 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
