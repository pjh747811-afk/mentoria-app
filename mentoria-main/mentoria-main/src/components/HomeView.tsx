import React, { useState } from 'react';
import { TabType } from '../types';
import { RECENT_SESSIONS, MENTORS, GRANTS } from '../data/mockData';

interface HomeViewProps {
  onNavigate: (tab: TabType) => void;
  onShowToast: (message: string) => void;
  onOpenSessionDetail: () => void;
  onOpenReviewModal: (sessionName: string, mentorName: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onShowToast,
  onOpenSessionDetail,
  onOpenReviewModal,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [calendarAlertSet, setCalendarAlertSet] = useState(false);

  const toggleCalendarAlert = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCalendarAlertSet(!calendarAlertSet);
    if (!calendarAlertSet) {
      onShowToast('캘린더 일정 및 알림 설정 완료: 시작 15분 전 푸시 알림과 캘린더 등록이 완료되었습니다.');
    } else {
      onShowToast('알림 예약이 취소되었습니다.');
    }
  };

  return (
    <div className="flex flex-col w-full pb-16 lg:pb-12 pt-2 sm:pt-4">
      {/* Responsive Container */}
      <div className="responsive-container">

        {/* Collapsible Platform Rail Menu */}
        <section className="mb-4">
          <div className="bg-white rounded-xl shadow-xs border border-[#e6e8ea] p-3 sm:p-4 transition-all">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-full flex items-center justify-between text-left focus:outline-none"
              aria-expanded={isMenuOpen}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#004ac6] animate-pulse" />
                <span className="text-sm font-semibold text-[#191c1e]">
                  플랫폼 바로가기 메뉴
                </span>
                <span className="bg-[#c5d4fd] text-[#003ea8] text-xs font-bold px-2 py-0.5 rounded-full">
                  5개 메뉴
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#434655] text-xs font-medium">
                <span>{isMenuOpen ? '메뉴 접기' : '메뉴 펼치기'}</span>
                <span
                  className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${
                    isMenuOpen ? 'rotate-180' : ''
                  }`}
                >
                  expand_more
                </span>
              </div>
            </button>

            {/* Collapsible Menu List */}
            {isMenuOpen && (
              <nav className="mt-3 pt-3 border-t border-[#eceef0] flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-2 animate-fadeIn">
                {/* 1. Active: 홈 대시보드 */}
                <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#dbe1ff]/60 text-[#004ac6]">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="material-symbols-outlined text-[20px] text-[#004ac6]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      dashboard
                    </span>
                    <span className="text-sm font-bold text-[#004ac6]">홈 대시보드</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#004ac6] bg-white px-2 py-0.5 rounded-full">
                    현재 화면
                  </span>
                </div>

                {/* 2. 멘토 탐색·매칭 */}
                <button
                  type="button"
                  onClick={() => onNavigate('mentors')}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#f2f4f6] text-[#434655] hover:bg-[#e6e8ea] hover:text-[#004ac6] transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">manage_search</span>
                    <span className="text-sm font-medium">멘토 탐색·매칭</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>

                {/* 3. 멘토링 세션 상세 */}
                <button
                  type="button"
                  onClick={onOpenSessionDetail}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#f2f4f6] text-[#434655] hover:bg-[#e6e8ea] hover:text-[#004ac6] transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">event_available</span>
                    <span className="text-sm font-medium">멘토링 캘린더</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>

                {/* 4. 지원사업 추천 */}
                <button
                  type="button"
                  onClick={() => onNavigate('grants')}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#f2f4f6] text-[#434655] hover:bg-[#e6e8ea] hover:text-[#004ac6] transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">policy</span>
                    <span className="text-sm font-medium">지원사업 추천</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>

                {/* 5. 프로필 관리 */}
                <button
                  type="button"
                  onClick={() => onNavigate('profile')}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#f2f4f6] text-[#434655] hover:bg-[#e6e8ea] hover:text-[#004ac6] transition-all text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[20px]">person_outline</span>
                    <span className="text-sm font-medium">프로필 관리</span>
                  </div>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </nav>
            )}
          </div>
        </section>

        {/* Desktop Split Container (Left main content, Right sidebar preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Left Column (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            {/* (1) Upper Greeting Card (Verbatim) */}
            <section>
              <div className="bg-white rounded-2xl shadow-xs border border-[#e6e8ea] p-5 sm:p-6 relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-[#dbe1ff]/40 rounded-full blur-2xl pointer-events-none" />
                
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#c5d4fd] text-[#003ea8]">
                    <span className="material-symbols-outlined text-[15px]">waving_hand</span>
                  </span>
                  <span className="text-xs uppercase tracking-wider text-[#4f5e81] font-bold">
                    Mentoria Member
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#191c1e] leading-snug">
                  안녕하세요, 김멘티님! 오늘의 멘토링과 추천 지원사업을 확인하세요.
                </h2>
                
                <p className="text-xs sm:text-sm text-[#434655] mt-2.5 leading-relaxed">
                  신뢰할 수 있는 현직자 멘토링과 맞춤형 정책 자금이 성공적인 성장을 지원합니다.
                </p>

                {/* Quick Action Badges on Tablet & Desktop */}
                <div className="mt-4 pt-3.5 border-t border-[#eceef0] flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => onNavigate('mentors')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#004ac6] text-white text-xs font-semibold hover:bg-[#003ea8] transition-colors shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">search</span>
                    신규 멘토 둘러보기
                  </button>
                  <button
                    onClick={() => onNavigate('grants')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f2f4f6] text-[#191c1e] text-xs font-semibold hover:bg-[#e6e8ea] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    내 맞춤 지원금 확인
                  </button>
                </div>
              </div>
            </section>

            {/* (2) Top 3 Stat Cards in a clean responsive row */}
            <section>
              <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                {/* Card 1: 진행 예정 멘토링 */}
                <div
                  onClick={() => onShowToast('진행 예정인 멘토링 3건이 예약되어 있습니다.')}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-xs border border-[#e6e8ea] p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden transition-all hover:border-[#004ac6]/40 cursor-pointer active:scale-95"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] sm:text-xs text-[#434655] font-medium truncate">
                        진행 예정
                      </span>
                      <span className="w-6 h-6 rounded-md bg-[#dbe1ff]/60 flex items-center justify-center text-[#004ac6] shrink-0">
                        <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                      </span>
                    </div>
                    <div className="flex items-baseline gap-0.5 mt-1">
                      <span className="text-2xl sm:text-3xl text-[#004ac6] font-extrabold tracking-tight leading-none">
                        3
                      </span>
                      <span className="text-xs sm:text-sm text-[#004ac6] font-bold">건</span>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-1.5 border-t border-[#eceef0] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6] shrink-0" />
                    <span className="text-[11px] sm:text-xs text-[#434655] truncate font-medium">
                      10.12 예정
                    </span>
                  </div>
                </div>

                {/* Card 2: 추천 지원사업 */}
                <div
                  onClick={() => onNavigate('grants')}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-xs border border-[#e6e8ea] p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden transition-all hover:border-[#006058]/40 cursor-pointer active:scale-95"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] sm:text-xs text-[#434655] font-medium truncate">
                        추천 지원사업
                      </span>
                      <span className="w-6 h-6 rounded-md bg-[#89f5e7]/50 flex items-center justify-center text-[#006058] shrink-0">
                        <span className="material-symbols-outlined text-[16px]">assured_workload</span>
                      </span>
                    </div>
                    <div className="flex items-baseline gap-0.5 mt-1">
                      <span className="text-2xl sm:text-3xl text-[#006058] font-extrabold tracking-tight leading-none">
                        12
                      </span>
                      <span className="text-xs sm:text-sm text-[#006058] font-bold">건</span>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-1.5 border-t border-[#eceef0] flex items-center gap-1">
                    <span className="bg-[#89f5e7] text-[#005049] text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded font-bold leading-none truncate">
                      매칭 94%
                    </span>
                  </div>
                </div>

                {/* Card 3: 프로필 완성도 */}
                <div
                  onClick={() => onNavigate('profile')}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-xs border border-[#e6e8ea] p-3 sm:p-4 flex flex-col justify-between relative overflow-hidden transition-all hover:border-[#4f5e81]/40 cursor-pointer active:scale-95"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] sm:text-xs text-[#434655] font-medium truncate">
                        프로필 완성도
                      </span>
                      <span className="w-6 h-6 rounded-md bg-[#d9e2ff] flex items-center justify-center text-[#4f5e81] shrink-0">
                        <span className="material-symbols-outlined text-[16px]">badge</span>
                      </span>
                    </div>
                    <div className="flex items-baseline gap-0.5 mt-1">
                      <span className="text-2xl sm:text-3xl text-[#00174b] font-extrabold tracking-tight leading-none">
                        85
                      </span>
                      <span className="text-xs sm:text-sm text-[#00174b] font-bold">%</span>
                    </div>
                  </div>
                  <div className="mt-2.5 pt-1.5 border-t border-[#eceef0] flex flex-col justify-center gap-1">
                    <div className="w-full bg-[#eceef0] rounded-full h-1.5 overflow-hidden">
                      <div className="bg-[#004ac6] h-1.5 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* (3) Recent Mentoring Matches (최근 멘토링 매칭) */}
            <section>
              <div className="bg-white rounded-2xl shadow-xs border border-[#e6e8ea] p-4 sm:p-5">
                <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-[#eceef0]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#004ac6]" />
                    <h3 className="text-base sm:text-lg font-bold text-[#191c1e] tracking-tight">
                      최근 멘토링 매칭
                    </h3>
                  </div>
                  <span className="text-xs font-semibold text-[#4f5e81] bg-[#f2f4f6] px-2.5 py-1 rounded-full">
                    전체 5건
                  </span>
                </div>

                {/* Session Card List */}
                <div className="flex flex-col gap-3">
                  {/* Row 1: 김현직 (IT/개발) */}
                  <div
                    onClick={onOpenSessionDetail}
                    className="bg-[#f7f9fb] hover:bg-white border border-[#e6e8ea] rounded-xl p-4 flex flex-col shadow-xs transition-all hover:border-[#004ac6]/40 cursor-pointer active:scale-[0.99] group"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm sm:text-base font-bold text-[#191c1e] group-hover:text-[#004ac6] transition-colors">
                            김현직
                          </span>
                          <span className="text-xs text-[#004ac6] bg-[#dbe1ff]/60 px-2 py-0.5 rounded-md font-medium">
                            IT/개발
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-[#191c1e] mt-1.5 mb-2 truncate">
                          백엔드 커리어 리뷰
                        </p>
                      </div>
                      <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#dbe1ff] text-[#004ac6] text-xs font-bold border border-[#004ac6]/20">
                        <span className="w-2 h-2 rounded-full bg-[#004ac6] animate-pulse" />
                        확정됨
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#e6e8ea] text-[#434655] text-xs">
                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#004ac6]">
                            schedule
                          </span>
                          <span className="font-medium text-[#191c1e]">10.12 (목) 19:00</span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-[#004ac6] font-medium">
                          <span className="material-symbols-outlined text-[13px]">info</span>
                          <span>시작 15분 전 입장 오픈</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        <button
                          type="button"
                          onClick={toggleCalendarAlert}
                          title="클릭 시 캘린더 등록 및 알림 받기"
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                            calendarAlertSet
                              ? 'bg-[#006058] text-white border-[#006058]'
                              : 'bg-[#dbe1ff]/50 hover:bg-[#dbe1ff] text-[#004ac6] border-[#004ac6]/20'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[13px] animate-pulse">
                            timer
                          </span>
                          <span>{calendarAlertSet ? '알림 설정됨' : '입장까지 02:45:10'}</span>
                          <span className="material-symbols-outlined text-[13px]">notification_add</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenSessionDetail();
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#004ac6] text-white text-xs font-bold shadow-xs hover:bg-[#003ea8] transition-all"
                        >
                          <span className="material-symbols-outlined text-[15px]">videocam</span>
                          <span>입장하기</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: 이전문 (창업/BM) */}
                  <div className="bg-[#f7f9fb] hover:bg-white border border-[#e6e8ea] rounded-xl p-4 flex flex-col shadow-xs transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm sm:text-base font-bold text-[#191c1e]">
                            이전문
                          </span>
                          <span className="text-xs text-[#004ac6] bg-[#dbe1ff]/60 px-2 py-0.5 rounded-md font-medium">
                            창업/BM
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-[#191c1e] mt-1.5 mb-2 truncate">
                          정부지원사업 사업계획서 검토
                        </p>
                      </div>
                      <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#89f5e7] text-[#005049] text-xs font-bold border border-[#006058]/20">
                        <span className="material-symbols-outlined text-[14px] text-[#006058]">
                          check_circle
                        </span>
                        완료됨
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#e6e8ea] text-[#434655] text-xs">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#737686]">
                          event_available
                        </span>
                        일시: 10.08
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          onOpenReviewModal('정부지원사업 사업계획서 검토', '이전문 멘토')
                        }
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#004ac6] text-white text-xs font-bold shadow-xs hover:bg-[#003ea8] transition-all active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[15px]">rate_review</span>
                        <span>리뷰 작성하기</span>
                      </button>
                    </div>
                  </div>

                  {/* Row 3: 박멘토 (마케팅) */}
                  <div className="bg-[#f7f9fb] border border-[#e6e8ea] rounded-xl p-4 flex flex-col shadow-xs opacity-90">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm sm:text-base font-bold text-[#191c1e]">
                            박멘토
                          </span>
                          <span className="text-xs text-[#004ac6] bg-[#dbe1ff]/60 px-2 py-0.5 rounded-md font-medium">
                            마케팅
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-[#191c1e] mt-1.5 mb-2 truncate">
                          퍼포먼스 마케팅 전략 자문
                        </p>
                      </div>
                      <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#89f5e7] text-[#005049] text-xs font-bold border border-[#006058]/20">
                        <span className="material-symbols-outlined text-[14px] text-[#006058]">
                          check_circle
                        </span>
                        완료됨
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[#e6e8ea] text-[#434655] text-xs">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#737686]">
                          event_available
                        </span>
                        일시: 10.04
                      </span>
                      <span className="text-xs text-[#737686] font-medium bg-[#eceef0] px-2.5 py-0.5 rounded border border-[#e6e8ea]">
                        세션 종료
                      </span>
                    </div>
                  </div>

                  {/* Row 4: 최기술 (AI/데이터) */}
                  <div className="bg-[#f7f9fb] border border-[#e6e8ea] rounded-xl p-4 flex flex-col shadow-xs opacity-90">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm sm:text-base font-bold text-[#191c1e]">
                            최기술
                          </span>
                          <span className="text-xs text-[#004ac6] bg-[#dbe1ff]/60 px-2 py-0.5 rounded-md font-medium">
                            AI/데이터
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-[#191c1e] mt-1.5 mb-2 truncate">
                          AI 서비스 PRD 피드백
                        </p>
                      </div>
                      <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#89f5e7] text-[#005049] text-xs font-bold border border-[#006058]/20">
                        <span className="material-symbols-outlined text-[14px] text-[#006058]">
                          check_circle
                        </span>
                        완료됨
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[#e6e8ea] text-[#434655] text-xs">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#737686]">
                          event_available
                        </span>
                        일시: 09.28
                      </span>
                      <span className="text-xs text-[#737686] font-medium bg-[#eceef0] px-2.5 py-0.5 rounded border border-[#e6e8ea]">
                        세션 종료
                      </span>
                    </div>
                  </div>

                  {/* Row 5: 정대표 (경영/투자) */}
                  <div className="bg-[#f7f9fb] border border-[#e6e8ea] rounded-xl p-4 flex flex-col shadow-xs opacity-90">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm sm:text-base font-bold text-[#191c1e]">
                            정대표
                          </span>
                          <span className="text-xs text-[#004ac6] bg-[#dbe1ff]/60 px-2 py-0.5 rounded-md font-medium">
                            경영/투자
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-[#191c1e] mt-1.5 mb-2 truncate">
                          초기 스타트업 IR 피칭 코칭
                        </p>
                      </div>
                      <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#89f5e7] text-[#005049] text-xs font-bold border border-[#006058]/20">
                        <span className="material-symbols-outlined text-[14px] text-[#006058]">
                          check_circle
                        </span>
                        완료됨
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[#e6e8ea] text-[#434655] text-xs">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#737686]">
                          event_available
                        </span>
                        일시: 09.22
                      </span>
                      <span className="text-xs text-[#737686] font-medium bg-[#eceef0] px-2.5 py-0.5 rounded border border-[#e6e8ea]">
                        세션 종료
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Desktop Right Rail (4 cols on lg: Highlights, upcoming notice & mentor spotlight) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col gap-5 sticky top-20">
            {/* Spotlight: 10.12 김현직 멘토링 Live Card */}
            <div className="bg-white rounded-2xl p-5 border border-[#e6e8ea] shadow-xs flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#004ac6] bg-[#dbe1ff] px-2.5 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#004ac6] animate-ping" />
                  D-3 마감 임박 세션
                </span>
                <span className="text-xs text-[#ba1a1a] font-extrabold">잔여 1석</span>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={MENTORS[0].avatar}
                  alt={MENTORS[0].name}
                  className="w-14 h-14 rounded-full object-cover border border-[#e6e8ea]"
                />
                <div>
                  <h4 className="font-bold text-[#191c1e] text-base">{MENTORS[0].name} 멘토</h4>
                  <p className="text-xs text-[#434655]">{MENTORS[0].title}</p>
                  <p className="text-xs text-amber-500 font-bold mt-0.5">★ 4.9 (142회 완료)</p>
                </div>
              </div>

              <p className="text-xs text-[#434655] bg-[#f7f9fb] p-3 rounded-lg leading-relaxed">
                “주니어/취준생 이력서와 코드 리뷰를 1:1로 직접 피드백해 드립니다.”
              </p>

              <button
                type="button"
                onClick={onOpenSessionDetail}
                className="w-full py-2.5 rounded-xl bg-[#004ac6] text-white font-bold text-sm hover:bg-[#003ea8] transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>세션 상세 및 신청하기</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Quick Grant Insight Banner */}
            <div className="bg-gradient-to-br from-[#004ac6] to-[#2563eb] rounded-2xl p-5 text-white shadow-md flex flex-col gap-2.5">
              <span className="text-xs font-bold text-[#89f5e7] uppercase tracking-wider">
                AI Grant Match
              </span>
              <h4 className="text-lg font-bold leading-snug">
                초기창업패키지 최대 1억원 지원금 공고
              </h4>
              <p className="text-xs text-white/90 leading-relaxed">
                김멘티님의 프로필과 98% 일치하는 사업화 자금 공고가 마감 5일 전입니다.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('grants')}
                className="mt-1 self-start px-3.5 py-1.5 rounded-lg bg-white text-[#004ac6] text-xs font-bold hover:bg-[#dbe1ff] transition-all"
              >
                추천 공고 확인하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
