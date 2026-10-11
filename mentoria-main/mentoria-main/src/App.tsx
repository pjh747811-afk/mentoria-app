/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType, Mentor, Grant } from './types';
import { Header } from './components/Header';
import { BottomTabBar } from './components/BottomTabBar';
import { HomeView } from './components/HomeView';
import { MentorsView } from './components/MentorsView';
import { GrantsView } from './components/GrantsView';
import { SessionDetailView } from './components/SessionDetailView';
import { ProfileView } from './components/ProfileView';
import { Toast } from './components/Toast';
import { ReviewModal } from './components/ReviewModal';
import { ApplyModal } from './components/ApplyModal';
import { NotificationsModal } from './components/NotificationsModal';

import { downloadProjectZip } from './utils/exportProject';

export default function App() {
  const getTabFromHash = (): TabType => {
    const hash = window.location.hash.replace('#', '');
    if (['home', 'mentors', 'grants', 'session-detail', 'profile'].includes(hash)) {
      return hash as TabType;
    }
    return 'home';
  };

  const [currentTab, setCurrentTabState] = useState<TabType>(getTabFromHash);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setCurrentTab = (tab: TabType) => {
    setCurrentTabState(tab);
    window.location.hash = tab;
  };

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentTabState(getTabFromHash());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard?.writeText?.(currentUrl);
    showToast(`현재 화면의 링크가 클립보드에 복사되었습니다: ${currentUrl}`);
  };

  // Review Modal State
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [reviewSessionTitle, setReviewSessionTitle] = useState('정부지원사업 사업계획서 검토');
  const [reviewMentorName, setReviewMentorName] = useState('이전문 멘토');

  // Apply Modal State
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [applyTargetTitle, setApplyTargetTitle] = useState('');
  const [applyTargetSubtitle, setApplyTargetSubtitle] = useState('');

  // Notifications Modal State
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Responsive Device View Simulator mode ('fluid' | 'mobile' | 'tablet' | 'desktop')
  const [previewMode, setPreviewMode] = useState<'fluid' | 'mobile' | 'tablet' | 'desktop'>('fluid');

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const handleOpenReview = (sessionTitle?: string, mentorName?: string) => {
    if (sessionTitle) setReviewSessionTitle(sessionTitle);
    if (mentorName) setReviewMentorName(mentorName);
    setIsReviewOpen(true);
  };

  const handleSubmitReview = (rating: number, content: string) => {
    setIsReviewOpen(false);
    showToast(`리뷰가 성공적으로 등록되었습니다! 3,000P가 적립되었습니다. (평점: ${rating}.0)`);
  };

  const handleApplyMentor = (mentor: Mentor) => {
    setApplyTargetTitle(`${mentor.name} 멘토 1:1 세션`);
    setApplyTargetSubtitle(`${mentor.title} · ${mentor.sessionType} (${mentor.pricePerSession.toLocaleString()}원)`);
    setIsApplyOpen(true);
  };

  const handleApplyGrant = (grant: Grant) => {
    setApplyTargetTitle(grant.title);
    setApplyTargetSubtitle(`주관: ${grant.organization} · 지원규모: ${grant.maxFundingText}`);
    setIsApplyOpen(true);
  };

  const handleSubmitApply = (formData: { name: string; email: string; note: string }) => {
    setIsApplyOpen(false);
    showToast(`[${formData.name}님] 신청서가 성공적으로 접수되었습니다. 안내 링크가 ${formData.email}로 전송됩니다.`);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex flex-col font-sans">
      {/* Top Device Resolution Toolbar (helps user test and inspect responsive layouts seamlessly) */}
      <div className="bg-[#191c1e] text-white text-xs py-1.5 px-4 flex items-center justify-between border-b border-white/10 z-50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#89f5e7] animate-pulse" />
          <span className="font-semibold text-white/90">반응형 뷰포트 프리뷰:</span>
          <span className="text-white/60 hidden sm:inline">CSS 미디어 쿼리 해상도 대응</span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setPreviewMode('fluid')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              previewMode === 'fluid'
                ? 'bg-[#004ac6] text-white'
                : 'text-white/70 hover:bg-white/10'
            }`}
          >
            화면 맞춤 (Fluid)
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode('mobile')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              previewMode === 'mobile'
                ? 'bg-[#004ac6] text-white'
                : 'text-white/70 hover:bg-white/10'
            }`}
          >
            모바일 (390px)
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode('tablet')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              previewMode === 'tablet'
                ? 'bg-[#004ac6] text-white'
                : 'text-white/70 hover:bg-white/10'
            }`}
          >
            태블릿 (768px)
          </button>
          <button
            type="button"
            onClick={() => setPreviewMode('desktop')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors ${
              previewMode === 'desktop'
                ? 'bg-[#004ac6] text-white'
                : 'text-white/70 hover:bg-white/10'
            }`}
          >
            데스크톱 (1200px)
          </button>
          <span className="text-white/20 mx-1">|</span>
          <button
            type="button"
            onClick={handleCopyLink}
            title="현재 화면의 링크 복사"
            className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#006058] hover:bg-[#007b71] text-white flex items-center gap-1 transition-colors shadow-xs"
          >
            <span className="material-symbols-outlined text-[13px]">link</span>
            <span>링크 복사</span>
          </button>
          <button
            type="button"
            onClick={async () => {
              showToast('전체 프로젝트 소스코드 압축파일(ZIP)을 생성하여 다운로드합니다...');
              try {
                await downloadProjectZip();
                showToast('mentoria-source-code.zip 파일 다운로드가 완료되었습니다!');
              } catch (e) {
                showToast('다운로드 중 오류가 발생했습니다.');
              }
            }}
            title="전체 프로젝트 소스코드 ZIP 다운로드"
            className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#ba1a1a] hover:bg-[#93000a] text-white flex items-center gap-1 transition-colors shadow-xs ml-1"
          >
            <span className="material-symbols-outlined text-[13px]">download</span>
            <span>ZIP 다운로드</span>
          </button>
        </div>
      </div>

      {/* Main View Wrapper with simulated device wrapper if selected */}
      <div
        className={`w-full flex-1 transition-all duration-300 mx-auto ${
          previewMode === 'mobile'
            ? 'max-w-[400px] border-x border-[#e0e3e5] shadow-2xl bg-[#f7f9fb] my-2 rounded-3xl overflow-hidden min-h-[844px]'
            : previewMode === 'tablet'
            ? 'max-w-[768px] border-x border-[#e0e3e5] shadow-2xl bg-[#f7f9fb] my-2 rounded-2xl overflow-hidden min-h-[900px]'
            : previewMode === 'desktop'
            ? 'max-w-[1240px] border-x border-[#e0e3e5] shadow-2xl bg-[#f7f9fb] my-2 rounded-xl overflow-hidden min-h-[900px]'
            : 'w-full'
        }`}
      >
        {/* Global Responsive Header */}
        <Header
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          hasUnreadNotifications={true}
        />

        {/* Content Body with top header spacing */}
        <main className="flex-1 w-full pt-16">
          {currentTab === 'home' && (
            <HomeView
              onNavigate={setCurrentTab}
              onShowToast={showToast}
              onOpenSessionDetail={() => setCurrentTab('session-detail')}
              onOpenReviewModal={handleOpenReview}
            />
          )}

          {currentTab === 'mentors' && (
            <MentorsView
              onShowToast={showToast}
              onOpenSessionDetail={() => setCurrentTab('session-detail')}
              onApplyMentor={handleApplyMentor}
            />
          )}

          {currentTab === 'grants' && (
            <GrantsView
              onShowToast={showToast}
              onOpenApplySheet={handleApplyGrant}
              onRequestMentorForGrant={(title) => {
                showToast(`'${title}' 서류 검토 전담 멘토 리스트로 이동합니다.`);
                setCurrentTab('mentors');
              }}
            />
          )}

          {currentTab === 'session-detail' && (
            <SessionDetailView
              onBack={() => setCurrentTab('home')}
              onShowToast={showToast}
              onOpenApplyModal={() => {
                setApplyTargetTitle('김현직 멘토 백엔드 커리어 리뷰');
                setApplyTargetSubtitle('10.12 (목) 19:00 실시간 LIVE 화상 클래스 (75,000원)');
                setIsApplyOpen(true);
              }}
            />
          )}

          {currentTab === 'profile' && (
            <ProfileView
              onShowToast={showToast}
              onOpenSessionDetail={() => setCurrentTab('session-detail')}
              onOpenReviewModal={() => handleOpenReview()}
            />
          )}
        </main>

        {/* Bottom Tab Bar (shown on mobile, hidden on desktop via CSS media query) */}
        {currentTab !== 'session-detail' && (
          <BottomTabBar
            currentTab={currentTab}
            onSelectTab={setCurrentTab}
          />
        )}
      </div>

      {/* Interactive Modals */}
      <ReviewModal
        isOpen={isReviewOpen}
        sessionTitle={reviewSessionTitle}
        mentorName={reviewMentorName}
        onClose={() => setIsReviewOpen(false)}
        onSubmit={handleSubmitReview}
      />

      <ApplyModal
        isOpen={isApplyOpen}
        title={applyTargetTitle}
        subtitle={applyTargetSubtitle}
        onClose={() => setIsApplyOpen(false)}
        onSubmit={handleSubmitApply}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateToDetail={() => {
          setIsNotificationsOpen(false);
          setCurrentTab('session-detail');
        }}
      />

      {/* Global Interactive Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
