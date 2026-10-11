import React, { useState } from 'react';
import { Mentor } from '../types';
import { MENTORS } from '../data/mockData';

interface MentorsViewProps {
  onShowToast: (message: string) => void;
  onOpenSessionDetail: () => void;
  onApplyMentor: (mentor: Mentor) => void;
}

export const MentorsView: React.FC<MentorsViewProps> = ({
  onShowToast,
  onOpenSessionDetail,
  onApplyMentor,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [instantAvailableOnly, setInstantAvailableOnly] = useState(false);
  const [experiencedOnly, setExperiencedOnly] = useState(false);
  const [sortOption, setSortOption] = useState('popular');
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const toggleBookmark = (id: string, name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !bookmarkedIds[id];
    setBookmarkedIds({ ...bookmarkedIds, [id]: nextState });
    if (nextState) {
      onShowToast(`${name} 멘토가 관심 목록에 저장되었습니다.`);
    } else {
      onShowToast(`${name} 멘토가 관심 목록에서 제거되었습니다.`);
    }
  };

  const categories = [
    { key: 'all', label: '전체' },
    { key: 'dev', label: 'IT/개발' },
    { key: 'pm', label: '기획/PM' },
    { key: 'marketing', label: '마케팅/그로스' },
    { key: 'startup', label: '창업/BM' },
    { key: 'ir', label: '투자/IR' },
    { key: 'hr', label: '인사/노무' },
  ];

  // Filtering
  const filteredMentors = MENTORS.filter((m) => {
    if (selectedCategory !== 'all' && m.category !== selectedCategory) {
      return false;
    }
    if (instantAvailableOnly && !m.isAvailableToday) {
      return false;
    }
    if (experiencedOnly && m.reviewCount < 100) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = m.name.toLowerCase().includes(q);
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchCompany = m.company.toLowerCase().includes(q);
      const matchTags = m.tags.some((t) => t.toLowerCase().includes(q));
      return matchName || matchTitle || matchCompany || matchTags;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-20 lg:pb-12 pt-2 sm:pt-4">
      <div className="responsive-container">
        {/* Sticky Search Header & Filter Bar */}
        <section className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-xs border border-[#e6e8ea] mb-5">
          {/* Search Bar */}
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#4f5e81]">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input
              type="text"
              id="mentor-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="직무, 기업명, 키워드 (예: 백엔드, 사업계획서, IR피칭)"
              className="w-full h-11 pl-10 pr-10 rounded-xl bg-[#eceef0] text-[#191c1e] text-sm placeholder:text-[#737686] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#004ac6]/30 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label="검색어 지우기"
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#737686] hover:text-[#191c1e]"
              >
                <span className="material-symbols-outlined text-[18px]">cancel</span>
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-3 pb-1">
            {categories.map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[#004ac6] text-white shadow-xs'
                      : 'bg-[#eceef0] text-[#434655] hover:bg-[#e0e3e5]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Filter Pills / Sorting Controls */}
          <div className="flex items-center justify-between pt-2.5 border-t border-[#eceef0] mt-2.5">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              <button
                type="button"
                onClick={() => setInstantAvailableOnly(!instantAvailableOnly)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-colors whitespace-nowrap shadow-xs ${
                  instantAvailableOnly
                    ? 'bg-[#006058] text-white'
                    : 'bg-[#f7f9fb] text-[#006058] border border-[#006058]/30 hover:bg-[#89f5e7]/20'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#007b71] animate-ping" />
                실시간 상담 가능
              </button>

              <button
                type="button"
                onClick={() => setExperiencedOnly(!experiencedOnly)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors whitespace-nowrap shadow-xs ${
                  experiencedOnly
                    ? 'bg-[#004ac6] text-white'
                    : 'bg-[#f7f9fb] text-[#4f5e81] border border-[#e6e8ea] hover:bg-[#e6e8ea]'
                }`}
              >
                멘토링 50회+
              </button>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0 pl-2">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#434655] focus:outline-none cursor-pointer py-1"
              >
                <option value="popular">인기순</option>
                <option value="rating">리뷰평점 높은순</option>
                <option value="reviews">멘토링 횟수순</option>
                <option value="recent">최신 등록순</option>
              </select>
              <span className="material-symbols-outlined text-[16px] text-[#737686]">
                unfold_more
              </span>
            </div>
          </div>
        </section>

        {/* Live Opportunity Highlight Banner */}
        <section className="mb-5">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#004ac6] to-[#2563eb] p-4 sm:p-5 text-white shadow-sm">
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-[11px] font-bold backdrop-blur-sm">
                    10월 한정 이벤트
                  </span>
                  <span className="text-xs text-[#dbe1ff] font-medium">
                    합격보장 멘토링 매칭
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold leading-tight">
                  정부지원사업 & 대기업 이직
                </h3>
                <p className="text-xs text-white/90 mt-1">
                  검증된 현직자 1:1 세션 최대 30% 바우처 지원
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-[#dbe1ff] shrink-0">
                <span
                  className="material-symbols-outlined text-[28px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  stars
                </span>
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
          </div>
        </section>

        {/* Result Counter & Verified Notice */}
        <div className="flex items-center justify-between pb-3 px-1">
          <div className="flex items-center gap-1.5">
            <span className="text-base font-bold text-[#191c1e]">추천 멘토</span>
            <span className="text-sm text-[#004ac6] font-bold">
              {filteredMentors.length}명
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#4f5e81]">
            <span
              className="material-symbols-outlined text-[15px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <span className="text-xs font-medium">전원 재직/경력 서류 100% 인증</span>
          </div>
        </div>

        {/* Mentor Cards Responsive Feed */}
        <section className="responsive-grid-feed mb-6">
          {filteredMentors.map((mentor) => {
            const isBookmarked = bookmarkedIds[mentor.id];
            return (
              <article
                key={mentor.id}
                className="relative flex flex-col rounded-2xl bg-white p-5 shadow-xs hover:shadow-md border border-[#e6e8ea] transition-all"
              >
                {/* Top Row: Avatar + Info + Bookmark */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-[#eceef0] flex-shrink-0 shadow-xs border border-[#e6e8ea]">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-full h-full object-cover"
                      />
                      {mentor.isAvailableToday && (
                        <div
                          className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#006058] ring-2 ring-white flex items-center justify-center"
                          title="실시간 상담 가능"
                        />
                      )}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-base font-bold text-[#191c1e]">
                          {mentor.name}
                        </span>
                        {mentor.isTopMentor ? (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[#89f5e7] text-[#005049] text-[10px] font-bold">
                            <span
                              className="material-symbols-outlined text-[11px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              workspace_premium
                            </span>
                            TOP 멘토
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-[#d9e2ff] text-[#003ea8] text-[10px] font-bold">
                            <span
                              className="material-symbols-outlined text-[11px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              verified
                            </span>
                            현직인증
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#4f5e81] truncate mt-0.5">
                        {mentor.title} · {mentor.years}년차
                      </span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-0.5 text-[#191c1e] text-xs">
                          <span
                            className="material-symbols-outlined text-[15px] text-amber-500"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span className="font-bold">{mentor.rating}</span>
                          <span className="text-[#737686]">({mentor.reviewCount}회)</span>
                        </div>
                        <span className="text-[#737686] text-xs">·</span>
                        {mentor.highlightText ? (
                          <span className="text-xs text-[#004ac6] font-bold">
                            {mentor.highlightText}
                          </span>
                        ) : (
                          <span className="text-xs text-[#006058] font-medium">
                            응답률 {mentor.responseRate}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    type="button"
                    aria-label="관심 멘토 저장"
                    onClick={(e) => toggleBookmark(mentor.id, mentor.name, e)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                      isBookmarked
                        ? 'bg-[#dbe1ff] text-[#004ac6]'
                        : 'bg-[#f2f4f6] text-[#737686] hover:text-[#004ac6]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{
                        fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0",
                      }}
                    >
                      bookmark
                    </span>
                  </button>
                </div>

                {/* Introduction Quote */}
                <div className="mt-3.5 p-3 rounded-xl bg-[#f2f4f6]">
                  <p className="text-xs sm:text-sm text-[#191c1e] line-clamp-2 leading-relaxed">
                    {mentor.quote}
                  </p>
                </div>

                {/* Skill Tags */}
                <div className="flex items-center gap-1.5 flex-wrap mt-3">
                  {mentor.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#eceef0] text-xs text-[#434655] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Format & Session Highlights */}
                <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-[#eceef0]">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs text-[#4f5e81]">
                      <span className="material-symbols-outlined text-[15px]">videocam</span>
                      {mentor.sessionType}
                    </span>
                    {mentor.nextSessionText && (
                      <span className="px-2 py-0.5 rounded-full bg-[#d9e2ff] text-[#003ea8] text-[11px] font-bold">
                        {mentor.nextSessionText}
                      </span>
                    )}
                  </div>
                  <span className="text-sm sm:text-base font-bold text-[#191c1e]">
                    {mentor.pricePerSession.toLocaleString()}원
                    <span className="text-xs text-[#737686] font-normal"> / 회</span>
                  </span>
                </div>

                {/* Action CTA */}
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (mentor.id === 'kim-hyunjik') {
                        onOpenSessionDetail();
                      } else {
                        onApplyMentor(mentor);
                      }
                    }}
                    className="flex-1 h-11 rounded-xl bg-[#004ac6] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] hover:bg-[#003ea8] transition-all"
                  >
                    <span>{mentor.id === 'kim-hyunjik' ? '1:1 멘토링 신청' : '멘토링 신청하기'}</span>
                    <span className="material-symbols-outlined text-[17px]">
                      {mentor.id === 'kim-hyunjik' ? 'arrow_forward' : 'calendar_add_on'}
                    </span>
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        {/* Floating Match Advisory Card */}
        <section>
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e6e8ea] shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#c5d4fd] text-[#003ea8] flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-[20px]">psychology_alt</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-[#191c1e]">
                  나에게 딱 맞는 멘토를 못 찾으셨나요?
                </span>
                <span className="text-xs text-[#4f5e81]">
                  고민 키워드를 입력하시면 30초 내에 AI가 추천해 드려요.
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onShowToast('AI 맞춤 멘토 매칭 알고리즘이 실행되었습니다.')}
              className="flex-shrink-0 px-3.5 py-2 rounded-xl bg-[#004ac6] text-white text-xs font-bold hover:bg-[#003ea8] transition-colors"
            >
              AI 매칭
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
