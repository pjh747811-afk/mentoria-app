import React, { useState } from 'react';
import { Grant } from '../types';
import { GRANTS } from '../data/mockData';

interface GrantsViewProps {
  onShowToast: (message: string) => void;
  onOpenApplySheet: (grant: Grant) => void;
  onRequestMentorForGrant: (grantTitle: string) => void;
}

export const GrantsView: React.FC<GrantsViewProps> = ({
  onShowToast,
  onOpenApplySheet,
  onRequestMentorForGrant,
}) => {
  const [sortMode, setSortMode] = useState<'match' | 'deadline' | 'available'>('match');
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [alarmReserved, setAlarmReserved] = useState<Record<string, boolean>>({});

  const toggleBookmark = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !bookmarks[id];
    setBookmarks({ ...bookmarks, [id]: next });
    onShowToast(
      next
        ? `[${title}] 공고가 관심 목록에 저장되었습니다.`
        : `[${title}] 스크랩 목록에서 제거되었습니다.`
    );
  };

  const toggleAlarm = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !alarmReserved[id];
    setAlarmReserved({ ...alarmReserved, [id]: next });
    onShowToast(
      next
        ? '오픈 24시간 전 카카오 알림톡 및 사전 가이드북이 전송됩니다.'
        : '오픈 알림 신청이 취소되었습니다.'
    );
  };

  const categories = [
    { key: 'all', label: '전체 분야' },
    { key: 'startup', label: '창업 / R&D' },
    { key: 'marketing', label: '마케팅 / 판로개척' },
    { key: 'employment', label: '고용 / 인건비 지원' },
    { key: 'voucher', label: '바우처 / 멘토링' },
  ];

  const sortedGrants = [...GRANTS].filter((g) => {
    if (selectedCat !== 'all' && g.category !== selectedCat) {
      return false;
    }
    if (sortMode === 'available' && g.status === 'upcoming') {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-20 lg:pb-12 pt-2 sm:pt-4">
      <div className="responsive-container">
        {/* Top Visual Banner & Contextual Greeting */}
        <section className="mb-5">
          <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#e6e8ea] relative overflow-hidden">
            <div className="relative z-10 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#d9e2ff] text-[#0a1a3a] text-xs font-bold">
                  AI 맞춤 분석 완료
                </span>
                <span className="text-xs text-[#4f5e81]">업데이트 10분 전</span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#191c1e] tracking-tight leading-snug">
                김멘티님을 위한 <span className="text-[#004ac6]">추천 정부지원사업</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#434655]">
                등록하신 프로필을 분석해 합격 가능성이 높은 최적 공고를 추렸어요.
              </p>

              {/* Profile Insight Pill Box */}
              <div className="mt-3 bg-[#f7f9fb] border border-[#e6e8ea] rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#004ac6] shrink-0">
                    <span className="material-symbols-outlined text-[20px]">domain</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-semibold text-[#191c1e]">
                      IT/SW · 초기 스타트업 (창업 2년차)
                    </span>
                    <span className="text-xs text-[#4f5e81]">
                      적합 사업 총 <strong className="text-[#004ac6] font-bold">12건</strong> 발굴
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onShowToast('조건 변경 모달: 창업 단계 및 타겟 지원사업 필터')}
                  className="px-3 py-1.5 rounded-full bg-[#eceef0] text-[#191c1e] hover:bg-[#e0e3e5] text-xs font-medium flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>조건 변경</span>
                  <span className="material-symbols-outlined text-[15px]">tune</span>
                </button>
              </div>
            </div>

            <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-[#dbe1ff]/40 blur-2xl pointer-events-none" />
            <div className="absolute right-4 top-4 opacity-10 text-[#004ac6] pointer-events-none">
              <span className="material-symbols-outlined text-[72px]">verified</span>
            </div>
          </div>
        </section>

        {/* Filter & Sort Sticky Section */}
        <section className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xs border border-[#e6e8ea] mb-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <button
                type="button"
                onClick={() => setSortMode('match')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all whitespace-nowrap ${
                  sortMode === 'match'
                    ? 'bg-[#004ac6] text-white shadow-xs'
                    : 'bg-[#eceef0] text-[#434655] hover:bg-[#e0e3e5]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[15px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  auto_awesome
                </span>
                <span>매칭순 (98%~)</span>
              </button>

              <button
                type="button"
                onClick={() => setSortMode('deadline')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all whitespace-nowrap ${
                  sortMode === 'deadline'
                    ? 'bg-[#004ac6] text-white shadow-xs'
                    : 'bg-[#eceef0] text-[#434655] hover:bg-[#e0e3e5]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">timer</span>
                <span>마감임박순</span>
              </button>

              <button
                type="button"
                onClick={() => setSortMode('available')}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1 transition-all whitespace-nowrap ${
                  sortMode === 'available'
                    ? 'bg-[#004ac6] text-white shadow-xs'
                    : 'bg-[#eceef0] text-[#434655] hover:bg-[#e0e3e5]'
                }`}
              >
                <span className="material-symbols-outlined text-[15px]">check_circle</span>
                <span>접수중만 보기</span>
              </button>
            </div>

            <button
              type="button"
              aria-label="필터 모달 열기"
              onClick={() => onShowToast('상세 필터 모달: 지원 규모, 지역, 주관부처')}
              className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#eceef0] text-[#191c1e] flex items-center justify-center hover:bg-[#e0e3e5] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">filter_list</span>
            </button>
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2.5 border-t border-[#eceef0] mt-2.5">
            {categories.map((c) => {
              const active = selectedCat === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  onClick={() => setSelectedCat(c.key)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-[#dbe1ff] text-[#00174b] font-bold'
                      : 'bg-[#eceef0] text-[#434655] hover:bg-[#e0e3e5]'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Notice List Container */}
        <section className="responsive-grid-feed mb-6">
          {sortedGrants.map((grant) => {
            const isBookmarked = bookmarks[grant.id];
            const isAlarmOn = alarmReserved[grant.id];

            return (
              <article
                key={grant.id}
                className="bg-white rounded-2xl p-5 shadow-xs hover:shadow-md border border-[#e6e8ea] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Header: Organization & Deadline Badge & Bookmark */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full bg-[#d9e2ff] text-[#0a1a3a] text-[11px] font-bold">
                          {grant.organization}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-0.5 ${
                            grant.dDay.startsWith('D-')
                              ? 'bg-[#ffdad6] text-[#93000a]'
                              : grant.dDay === '상시 접수'
                              ? 'bg-[#007b71] text-white'
                              : 'bg-[#e0e3e5] text-[#434655]'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[12px]">
                            {grant.dDay.startsWith('D-')
                              ? 'alarm'
                              : grant.dDay === '상시 접수'
                              ? 'all_inclusive'
                              : 'notifications_active'}
                          </span>
                          {grant.dDay}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-[#191c1e] mt-1 leading-snug">
                        {grant.title}
                      </h3>
                    </div>

                    <button
                      type="button"
                      aria-label="스크랩"
                      onClick={(e) => toggleBookmark(grant.id, grant.title, e)}
                      className={`p-1.5 transition-colors ${
                        isBookmarked ? 'text-[#004ac6]' : 'text-[#737686] hover:text-[#004ac6]'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[22px]"
                        style={{
                          fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0",
                        }}
                      >
                        bookmark
                      </span>
                    </button>
                  </div>

                  {/* Match Score & Core Benefit Highlight Box */}
                  <div className="bg-[#f7f9fb] border border-[#e6e8ea] rounded-xl p-3 sm:p-4 my-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#89f5e7] text-[#005049] flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-[18px]">verified</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[11px] text-[#4f5e81]">멘토리아 적합도</span>
                        <span className="text-xs sm:text-sm text-[#006058] font-bold">
                          {grant.matchScore}% 일치
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-[#4f5e81]">지원 규모</span>
                      <div className="text-xl sm:text-2xl text-[#004ac6] font-extrabold tracking-tight">
                        {grant.maxFundingText}{' '}
                        {grant.fundingBadge && (
                          <span className="text-xs text-[#191c1e] font-normal">
                            {grant.fundingBadge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bullets */}
                  <div className="flex flex-col gap-1.5 py-1">
                    {grant.bullets.map((b, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-1.5 text-xs sm:text-sm text-[#434655]"
                      >
                        <span className="material-symbols-outlined text-[15px] text-[#006058] mt-0.5 flex-shrink-0">
                          check
                        </span>
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mentor Advantage Linkage */}
                  <div className="bg-[#d9e2ff]/50 border border-[#d9e2ff] rounded-xl p-2.5 my-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-6 h-6 rounded-full bg-[#004ac6] text-white flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[13px]">psychology</span>
                      </div>
                      <span className="text-xs text-[#0a1a3a] font-medium truncate">
                        {grant.mentorAdvantageText}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRequestMentorForGrant(grant.title)}
                      className="px-2.5 py-1 rounded-md bg-[#004ac6] text-white text-xs font-bold whitespace-nowrap hover:bg-[#003ea8] transition-colors shadow-xs"
                    >
                      멘토 매칭
                    </button>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2">
                  {grant.status === 'upcoming' ? (
                    <button
                      type="button"
                      onClick={(e) => toggleAlarm(grant.id, e)}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
                        isAlarmOn
                          ? 'bg-[#007b71] text-white shadow-sm'
                          : 'bg-[#eceef0] text-[#191c1e] hover:bg-[#e0e3e5]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isAlarmOn ? 'notifications_active' : 'notification_add'}
                      </span>
                      <span>
                        {isAlarmOn
                          ? '오픈 알림 예약 완료 (가이드북 발송)'
                          : '공고 오픈 시 알림 신청 (사전문서 가이드북 증정)'}
                      </span>
                    </button>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onShowToast(`[${grant.title}] 사업계획서 양식 및 세부 지침 다운로드 완료`)
                        }
                        className="w-full py-2.5 rounded-xl bg-[#eceef0] text-[#191c1e] text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 hover:bg-[#e0e3e5] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">visibility</span>
                        <span>공고 요약</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onOpenApplySheet(grant)}
                        className="w-full py-2.5 rounded-xl bg-[#004ac6] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1 shadow-xs hover:bg-[#003ea8] transition-all"
                      >
                        <span>
                          {grant.id === 'grant-3' ? '바우처 신청' : '즉시 신청하기'}
                        </span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        {/* Bottom Delight Banner */}
        <section>
          <div className="rounded-2xl bg-gradient-to-r from-[#004ac6] to-[#2563eb] p-5 sm:p-6 text-white shadow-sm flex items-center justify-between gap-4 relative overflow-hidden">
            <div className="relative z-10 flex flex-col gap-1">
              <span className="text-xs font-bold text-[#dbe1ff] uppercase tracking-wider">
                Mentoria Advantage
              </span>
              <h4 className="text-lg sm:text-xl font-bold">지원사업 탈락이 두려우신가요?</h4>
              <p className="text-xs sm:text-sm text-white/90">
                실제 선정 경험 멘토에게 초안 1:1 무료 피드백을 받아보세요.
              </p>
              <button
                type="button"
                onClick={() =>
                  onShowToast('스타트업 전담 멘토 신청 화면으로 이동합니다.')
                }
                className="mt-2.5 self-start px-4 py-2 rounded-xl bg-white text-[#004ac6] text-xs sm:text-sm font-bold shadow-xs hover:bg-[#dbe1ff] transition-colors"
              >
                전담 멘토 신청하기
              </button>
            </div>
            <div className="relative z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px] text-white">draw</span>
            </div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
          </div>
        </section>
      </div>
    </div>
  );
};
