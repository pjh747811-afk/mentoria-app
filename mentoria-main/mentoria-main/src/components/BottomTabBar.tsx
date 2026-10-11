import React from 'react';
import { TabType } from '../types';

interface BottomTabBarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#f7f9fb]/90 backdrop-blur-xl border-t border-[#e6e8ea] shadow-[0_-1px_12px_rgba(0,0,0,0.04)] mobile-only-tabbar">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        <button
          type="button"
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center w-16 h-12 gap-0.5 transition-colors ${
            currentTab === 'home'
              ? 'text-[#004ac6] font-bold'
              : 'text-[#434655] hover:text-[#191c1e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{
              fontVariationSettings: currentTab === 'home' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            home
          </span>
          <span className="text-[11px] leading-tight font-medium">홈</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('mentors')}
          className={`flex flex-col items-center justify-center w-16 h-12 gap-0.5 transition-colors ${
            currentTab === 'mentors'
              ? 'text-[#004ac6] font-bold'
              : 'text-[#434655] hover:text-[#191c1e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{
              fontVariationSettings: currentTab === 'mentors' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            groups
          </span>
          <span className="text-[11px] leading-tight font-medium">멘토 찾기</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('grants')}
          className={`flex flex-col items-center justify-center w-16 h-12 gap-0.5 transition-colors ${
            currentTab === 'grants'
              ? 'text-[#004ac6] font-bold'
              : 'text-[#434655] hover:text-[#191c1e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{
              fontVariationSettings: currentTab === 'grants' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            assured_workload
          </span>
          <span className="text-[11px] leading-tight font-medium">지원사업</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('session-detail')}
          className={`flex flex-col items-center justify-center w-16 h-12 gap-0.5 transition-colors ${
            currentTab === 'session-detail'
              ? 'text-[#004ac6] font-bold'
              : 'text-[#434655] hover:text-[#191c1e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{
              fontVariationSettings: currentTab === 'session-detail' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            calendar_month
          </span>
          <span className="text-[11px] leading-tight font-medium">멘토링 내역</span>
        </button>

        <button
          type="button"
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center w-16 h-12 gap-0.5 transition-colors ${
            currentTab === 'profile'
              ? 'text-[#004ac6] font-bold'
              : 'text-[#434655] hover:text-[#191c1e]'
          }`}
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={{
              fontVariationSettings: currentTab === 'profile' ? "'FILL' 1" : "'FILL' 0",
            }}
          >
            account_circle
          </span>
          <span className="text-[11px] leading-tight font-medium">MY</span>
        </button>
      </div>
    </nav>
  );
};
