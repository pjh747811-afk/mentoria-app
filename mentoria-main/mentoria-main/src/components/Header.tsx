import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenNotifications: () => void;
  hasUnreadNotifications?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenNotifications,
  hasUnreadNotifications = true,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#f7f9fb]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e6e8ea]">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand logo & mobile menu toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="홈으로 이동"
            onClick={() => onSelectTab('home')}
            className="flex items-center gap-1.5 focus:outline-none"
          >
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#004ac6]">
              멘토리아
            </span>
            <span className="text-[11px] font-semibold tracking-widest text-[#4f5e81] uppercase mt-0.5 hidden sm:inline">
              Mentoria
            </span>
          </button>
        </div>

        {/* Desktop Responsive Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#eceef0]/60 p-1 rounded-xl">
          <button
            onClick={() => onSelectTab('home')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentTab === 'home'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#191c1e]'
            }`}
          >
            홈 대시보드
          </button>
          <button
            onClick={() => onSelectTab('mentors')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentTab === 'mentors'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#191c1e]'
            }`}
          >
            멘토 찾기
          </button>
          <button
            onClick={() => onSelectTab('grants')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentTab === 'grants'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#191c1e]'
            }`}
          >
            추천 지원사업
          </button>
          <button
            onClick={() => onSelectTab('session-detail')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentTab === 'session-detail'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#191c1e]'
            }`}
          >
            세션 상세
          </button>
          <button
            onClick={() => onSelectTab('profile')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              currentTab === 'profile'
                ? 'bg-white text-[#004ac6] shadow-sm'
                : 'text-[#434655] hover:text-[#191c1e]'
            }`}
          >
            마이페이지
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Notification Button */}
          <button
            type="button"
            aria-label="알림"
            onClick={onOpenNotifications}
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#434655] hover:text-[#004ac6] hover:bg-[#eceef0] transition-colors relative"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {hasUnreadNotifications && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#f7f9fb]" />
            )}
          </button>

          {/* Profile Avatar / Quick Nav to MY */}
          <button
            type="button"
            aria-label="마이페이지로 이동"
            onClick={() => onSelectTab('profile')}
            className="w-9 h-9 rounded-full bg-[#004ac6] text-white flex items-center justify-center shadow-sm hover:ring-2 hover:ring-[#004ac6]/30 transition-all overflow-hidden"
          >
            <span className="material-symbols-outlined text-[19px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
