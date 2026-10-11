import React, { useState } from 'react';

interface SessionDetailViewProps {
  onBack: () => void;
  onShowToast: (message: string) => void;
  onOpenApplyModal?: () => void;
}

export const SessionDetailView: React.FC<SessionDetailViewProps> = ({
  onBack,
  onShowToast,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(38);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const handleToggleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      onShowToast('관심 멘토링 목록에 추가되었습니다.');
    } else {
      setIsLiked(false);
      setLikeCount((prev) => Math.max(0, prev - 1));
      onShowToast('관심 멘토링 목록에서 제외되었습니다.');
    }
  };

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onShowToast(
      !isBookmarked
        ? '세션이 북마크에 보관되었습니다.'
        : '세션 북마크가 해제되었습니다.'
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: '현직 대기업 백엔드 리드 개발자의 주니어/취준생 이력서 및 커리어 패스 집중 리뷰',
          text: '멘토리아에서 마감 임박한 백엔드 실시간 멘토링을 확인해 보세요!',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText?.(window.location.href);
      onShowToast('세션 링크가 클립보드에 복사되었습니다.');
    }
  };

  const handleSubmitApply = () => {
    if (isApplied) {
      onShowToast('이미 신청 완료된 세션입니다. 등록된 이메일과 알림톡을 확인해 주세요.');
      return;
    }
    setIsApplied(true);
    onShowToast('신청이 성공적으로 완료되었습니다! 세션 시작 15분 전 입장 링크가 전송됩니다.');
  };

  return (
    <div className="flex flex-col w-full pb-28 lg:pb-16 pt-0">
      {/* Sub Header for Session Detail */}
      <div className="sticky top-16 z-40 bg-[#f7f9fb]/90 backdrop-blur-xl border-b border-[#e6e8ea] h-14 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              aria-label="뒤로 가기"
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center text-[#191c1e] hover:text-[#004ac6] transition-colors -ml-2 rounded-full hover:bg-[#eceef0]"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <h1 className="text-base sm:text-lg font-bold text-[#191c1e] truncate">
              Session Detail
            </h1>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="북마크에 저장"
              onClick={handleToggleBookmark}
              className={`w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#eceef0] transition-colors ${
                isBookmarked ? 'text-[#004ac6]' : 'text-[#434655]'
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
            <button
              type="button"
              aria-label="공유하기"
              onClick={handleShare}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#434655] hover:text-[#004ac6] hover:bg-[#eceef0] transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">share</span>
            </button>
          </div>
        </div>
      </div>

      <div className="responsive-container pt-3 sm:pt-5">
        {/* Responsive Desktop Split: Left main content, Right sticky booking card */}
        <div className="desktop-detail-split">
          {/* LEFT COLUMN: Media, Overview, Curriculum, Reviews */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {/* 세션 대표 이미지 배너 */}
            <div className="relative w-full h-56 sm:h-72 lg:h-80 rounded-2xl overflow-hidden bg-[#e0e3e5] shadow-xs">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQJOdSuuZf7lYAD8n-XX8bRBx3lUWzpGvdKTP23b0w2qTgykgmzVJxEv02SY5Qz8zJgczCUDciSRry7eRkSpVWeSCCZsC-fhZHc4vgDMG8dtxkkQnzfCwZYg8IvSsd0SeVh02HTQGN1pvxuAbTsOr0ahWuvZBa0KgHpNsyuDMJI2LyIw17B0QHa1eAh8fs7Hvfi9aQjs1J230uhBtBA9bEv4o4uyeX1nL3PpEkMsUJGhw5RS0ZT3J5"
                alt="세션 배경 이미지"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#004ac6]/90 backdrop-blur-md text-xs font-bold shadow-sm">
                  <span className="material-symbols-outlined text-[15px]">videocam</span>
                  온라인 LIVE 화상 클래스
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
                  <span
                    className="material-symbols-outlined text-[15px] text-amber-300"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  4.9 (후기 58개)
                </span>
              </div>
            </div>

            {/* 메타 상태 및 타이틀 카드 */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e6e8ea] flex flex-col gap-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#d9e2ff] text-[#0a1a3a] text-xs font-bold px-2.5 py-1 rounded-full">
                  IT/개발 · 백엔드 커리어 리뷰
                </span>
                <span className="bg-[#004ac6] text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  D-3 모집 마감 임박
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#191c1e] leading-snug">
                현직 대기업 백엔드 리드 개발자의 주니어/취준생 이력서 및 커리어 패스 집중 리뷰
              </h2>

              {/* 모집 인원 게이지 바 */}
              <div className="bg-[#f2f4f6] rounded-xl p-3.5 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-[#434655] font-medium">모집 현황 (선착순)</span>
                  <span className="text-[#004ac6] font-bold">
                    정원 5명 중 4명 신청{' '}
                    <span className="text-[#ba1a1a] font-extrabold">(잔여 1자리)</span>
                  </span>
                </div>
                <div className="w-full bg-[#e0e3e5] rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[#004ac6] h-full rounded-full transition-all duration-500"
                    style={{ width: '80%' }}
                  />
                </div>
              </div>

              {/* 일정 및 장소 정보 */}
              <div className="pt-1 flex flex-col gap-2 text-xs sm:text-sm text-[#434655]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#004ac6] text-[20px]">
                    calendar_today
                  </span>
                  <span className="font-semibold text-[#191c1e]">
                    2024.10.12 (목) 19:00 ~ 21:00 (2시간 소요)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#006058] text-[20px]">
                    devices
                  </span>
                  <span className="font-semibold text-[#191c1e]">
                    Google Meet 온라인 실시간 화상 세션
                  </span>
                </div>
              </div>
            </div>

            {/* 멘토 프로필 카드 */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e6e8ea] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#191c1e]">멘토 프로필</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006058] bg-[#89f5e7]/40 px-2.5 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  현직 인증 완료
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 shadow-xs border border-[#e6e8ea]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmYoXfa4H0oD6_3gwcy9b312WTzDKmumJ6OtWU4FOQekmXajWD2ZRnsLPwT2e7A4wpCQ3uJ5VaKKoV3CeSNjLvBqatJfigdphIEA5QTBGCNuVjudVVNqw4lljVILPpdT1W6FLTqK7h_aP6BKVTuMSl_pcqV0rMDRtYOHty24dQ46nFXjsUDtuC9cLf0Q4QwtaOikdiF4OLhgxRlDr9mIl5NnJaSL0aJ9yTXqx1TmIlWGGdFWe-bJq4"
                    alt="김현직 멘토"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-[#191c1e]">김현직 멘토</h3>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-[#d9e2ff] text-[#0a1a3a] font-bold">
                      멘토링 9년차
                    </span>
                  </div>
                  <p className="text-xs text-[#434655] truncate mt-0.5">
                    네카라쿠배 현직 시니어 백엔드 엔지니어 / 테크 리드
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#191c1e] bg-[#f2f4f6] p-3.5 rounded-xl leading-relaxed">
                “실무에서 직접 겪은 시행착오를 바탕으로, 서류 탈락 없는 이력서와 지속 가능한 성장 전략을 함께 고민해 드립니다.”
              </p>

              {/* 멘토 신뢰 지표 박스 */}
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="bg-[#f2f4f6] rounded-xl py-3 px-2">
                  <div className="text-2xl sm:text-3xl text-[#004ac6] font-extrabold">
                    4.9<span className="text-xs text-[#434655] font-normal">/5.0</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#434655] mt-0.5 font-medium">
                    평균 리뷰 평점
                  </div>
                </div>

                <div className="bg-[#f2f4f6] rounded-xl py-3 px-2">
                  <div className="text-2xl sm:text-3xl text-[#191c1e] font-extrabold">
                    142<span className="text-xs text-[#434655] font-normal">회</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#434655] mt-0.5 font-medium">
                    누적 멘토링 완료
                  </div>
                </div>

                <div className="bg-[#f2f4f6] rounded-xl py-3 px-2">
                  <div className="text-2xl sm:text-3xl text-[#006058] font-extrabold">
                    98<span className="text-xs text-[#434655] font-normal">%</span>
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#434655] mt-0.5 font-medium">
                    멘티 추천 만족도
                  </div>
                </div>
              </div>
            </div>

            {/* 이런 분께 추천해요 카드 */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e6e8ea] flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#004ac6] text-[22px]">target</span>
                <h3 className="text-base font-bold text-[#191c1e]">이런 분께 추천해요</h3>
              </div>

              <div className="flex flex-col gap-2.5 pt-1">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f2f4f6]">
                  <div className="w-6 h-6 rounded-full bg-[#004ac6]/10 text-[#004ac6] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#191c1e] font-medium leading-relaxed">
                    신입/주니어 백엔드 포지션 취업 및 이직을 본격적으로 준비 중인 분
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f2f4f6]">
                  <div className="w-6 h-6 rounded-full bg-[#004ac6]/10 text-[#004ac6] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#191c1e] font-medium leading-relaxed">
                    서류 합격률이 낮아 포트폴리오와 이력서의 뼈대 있는 피드백이 절실한 분
                  </p>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f2f4f6]">
                  <div className="w-6 h-6 rounded-full bg-[#004ac6]/10 text-[#004ac6] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">check</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#191c1e] font-medium leading-relaxed">
                    기술 면접에서 주도적으로 답변을 이끌어가는 현직자의 시각과 노하우가 궁금한 분
                  </p>
                </div>
              </div>
            </div>

            {/* 상세 커리큘럼 및 진행 순서 (타임라인) */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e6e8ea] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#004ac6] text-[22px]">
                    format_list_bulleted
                  </span>
                  <h3 className="text-base font-bold text-[#191c1e]">세션 진행 커리큘럼</h3>
                </div>
                <span className="text-xs text-[#434655] font-semibold bg-[#eceef0] px-2.5 py-1 rounded-full">
                  총 120분 밀착 진행
                </span>
              </div>

              <div className="relative pl-7 space-y-6 before:content-[''] before:absolute before:left-3 before:top-3 before:bottom-3 before:w-[2px] before:bg-[#e0e3e5]">
                {/* 1부 */}
                <div className="relative">
                  <div className="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-[#004ac6] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">
                    1
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#004ac6] font-bold bg-[#dbe1ff] px-2 py-0.5 rounded">
                        1부 (40분)
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-[#191c1e]">
                        개발자 채용 트렌드 & 합불 사례
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#434655] leading-relaxed">
                      최근 주요 IT 기업 백엔드 채용 트렌드 분석 및 주니어 이력서 합격/불합격 실사례 심층 비교
                    </p>
                  </div>
                </div>

                {/* 2부 */}
                <div className="relative">
                  <div className="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-[#004ac6] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">
                    2
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#004ac6] font-bold bg-[#dbe1ff] px-2 py-0.5 rounded">
                        2부 (50분)
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-[#191c1e]">
                        1:1 라이브 피드백 & 질의응답
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#434655] leading-relaxed">
                      사전 제출한 참여자별 이력서/포트폴리오 화면 공유 1:1 라이브 첨삭 및 아키텍처/코드 질의응답
                    </p>
                  </div>
                </div>

                {/* 3부 */}
                <div className="relative">
                  <div className="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-[#006058] text-white flex items-center justify-center text-xs font-bold ring-4 ring-white">
                    3
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#006058] font-bold bg-[#89f5e7]/40 px-2 py-0.5 rounded">
                        3부 (30분)
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-[#191c1e]">
                        자유 Q&A 및 세션 랩업
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-[#434655] leading-relaxed">
                      실무 개발자 커리어 로드맵 조언, 멘토와의 허심탄회한 자유 Q&A 및 핵심 요약 랩업
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 사전 준비물 & 유의사항 */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e6e8ea] flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#006058] text-[22px]">info</span>
                <h3 className="text-base font-bold text-[#191c1e]">사전 준비물 & 유의사항</h3>
              </div>
              <div className="bg-[#f2f4f6] rounded-xl p-3.5 space-y-2.5 text-xs sm:text-sm text-[#191c1e]">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#004ac6] text-[19px] shrink-0 mt-0.5">
                    assignment_turned_in
                  </span>
                  <span>
                    사전 질문 1가지 및 검토받을 <strong>깃허브(GitHub)</strong> 또는{' '}
                    <strong>노션(Notion)</strong> 이력서 링크를 신청서 제출 시 남겨주세요.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#004ac6] text-[19px] shrink-0 mt-0.5">
                    schedule
                  </span>
                  <span>
                    원활한 진행을 위해 <strong>세션 시작 15분 전</strong> 알림톡 및 등록된 이메일로 온라인 구글 밋 입장 링크가 전달됩니다.
                  </span>
                </div>
              </div>
            </div>

            {/* 생생 참여 후기 */}
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#e6e8ea] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-amber-500 text-[22px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    reviews
                  </span>
                  <h3 className="text-base font-bold text-[#191c1e]">생생 참여 후기</h3>
                </div>
                <button
                  type="button"
                  onClick={() => onShowToast('전체 58개 리뷰 모달이 열립니다.')}
                  className="text-xs text-[#004ac6] font-bold hover:underline"
                >
                  후기 전체보기 (58)
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {/* 후기 1 */}
                <div className="bg-[#f2f4f6] p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-[#191c1e]">
                        수강생 이*민
                      </span>
                      <span className="text-xs text-[#434655]">2주 전 참여</span>
                    </div>
                    <div className="flex items-center text-amber-500 text-[14px]">
                      {'★★★★★'}
                      <span className="text-xs font-bold text-[#191c1e] ml-1">5.0</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#191c1e] leading-relaxed">
                    “서류 합격률이 3배 올랐습니다! 멘토님이 짚어주신 프로젝트 트러블슈팅 정리가 결정적이었어요. 무엇보다 막연했던 취준 방향이 확실해졌습니다.”
                  </p>
                </div>

                {/* 후기 2 */}
                <div className="bg-[#f2f4f6] p-4 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-bold text-[#191c1e]">
                        수강생 박*준
                      </span>
                      <span className="text-xs text-[#434655]">1개월 전 참여</span>
                    </div>
                    <div className="flex items-center text-amber-500 text-[14px]">
                      {'★★★★★'}
                      <span className="text-xs font-bold text-[#191c1e] ml-1">5.0</span>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-[#191c1e] leading-relaxed">
                    “실제 현업 기술 면접관 관점에서 제 이력서를 봐주셔서 시야가 완전히 트였습니다. 질문마다 왜 그렇게 답해야 하는지 맥락을 짚어주셔서 감동했습니다.”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Desktop Sticky Booking Action Card */}
          <div className="desktop-sticky-side hidden lg:flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-md border border-[#e6e8ea] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#004ac6] bg-[#dbe1ff] px-2.5 py-1 rounded-full">
                  선착순 모집중
                </span>
                <span className="text-sm font-extrabold text-[#ba1a1a]">잔여 1자리</span>
              </div>

              <div>
                <span className="text-xs text-[#434655]">세션 참가비 (2시간 밀착 코칭)</span>
                <div className="text-2xl font-black text-[#191c1e] mt-0.5">
                  75,000원
                  <span className="text-xs font-normal text-[#434655] ml-1">/ 바우처 포인트 사용 가능</span>
                </div>
              </div>

              <div className="p-3.5 bg-[#f7f9fb] rounded-xl border border-[#e6e8ea] text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[#434655]">일시</span>
                  <span className="font-bold text-[#191c1e]">10.12 (목) 19:00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#434655]">방식</span>
                  <span className="font-bold text-[#006058]">Google Meet 화상 1:1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#434655]">정원</span>
                  <span className="font-bold text-[#191c1e]">소수정예 5명 (4명 확정)</span>
                </div>
              </div>

              {/* Main Apply Button */}
              <button
                type="button"
                onClick={handleSubmitApply}
                disabled={isApplied}
                className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                  isApplied
                    ? 'bg-[#006058] text-white cursor-default'
                    : 'bg-[#004ac6] text-white hover:bg-[#003ea8]'
                }`}
              >
                {isApplied ? (
                  <>
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    <span>신청 완료 (접수됨)</span>
                  </>
                ) : (
                  <>
                    <span>멘토링 신청하기</span>
                    <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      잔여 1석
                    </span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 pt-2 border-t border-[#eceef0]">
                <button
                  type="button"
                  onClick={handleToggleLike}
                  className={`flex-1 py-2 rounded-xl border border-[#e6e8ea] flex items-center justify-center gap-1.5 text-xs font-semibold transition-colors ${
                    isLiked ? 'text-[#ba1a1a] bg-[#ffdad6]/30' : 'text-[#434655] hover:bg-[#eceef0]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                  <span>찜하기 ({likeCount})</span>
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex-1 py-2 rounded-xl border border-[#e6e8ea] flex items-center justify-center gap-1.5 text-xs font-semibold text-[#434655] hover:bg-[#eceef0] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                  <span>공유하기</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Floating Bar (Screens < 1024px) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#f7f9fb]/95 backdrop-blur-md pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.06)] border-t border-[#e6e8ea]">
        <div className="h-20 px-4 flex items-center justify-between gap-3 max-w-md mx-auto">
          {/* Sub actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              aria-label="찜하기"
              onClick={handleToggleLike}
              className={`w-12 h-12 rounded-xl bg-[#e6e8ea] flex flex-col items-center justify-center transition-transform active:scale-95 ${
                isLiked ? 'text-[#ba1a1a]' : 'text-[#434655]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
              <span className="text-[10px] leading-tight font-bold">{likeCount}</span>
            </button>

            <button
              type="button"
              aria-label="공유하기"
              onClick={handleShare}
              className="w-12 h-12 rounded-xl bg-[#e6e8ea] flex items-center justify-center text-[#434655] active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[22px]">share</span>
            </button>
          </div>

          {/* Main 신청 버튼 */}
          <button
            type="button"
            onClick={handleSubmitApply}
            disabled={isApplied}
            className={`flex-1 h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-1.5 shadow-md active:scale-[0.98] transition-all ${
              isApplied
                ? 'bg-[#006058] text-white cursor-default'
                : 'bg-[#004ac6] text-white hover:bg-[#003ea8]'
            }`}
          >
            {isApplied ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>신청 완료 (접수됨)</span>
              </>
            ) : (
              <>
                <span>멘토링 신청하기</span>
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                  잔여 1석
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
