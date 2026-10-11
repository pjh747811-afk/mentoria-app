import React, { useState } from 'react';
import { downloadProjectZip } from '../utils/exportProject';

interface ProfileViewProps {
  onShowToast: (message: string) => void;
  onOpenSessionDetail: () => void;
  onOpenReviewModal: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  onShowToast,
  onOpenSessionDetail,
  onOpenReviewModal,
}) => {
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const handleToggleNotification = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationEnabled(e.target.checked);
    onShowToast(
      e.target.checked
        ? '멘토링 시작 15분 전 알림(알림톡/푸시)이 활성화되었습니다.'
        : '멘토링 알림이 해제되었습니다.'
    );
  };

  return (
    <div className="flex flex-col w-full pb-20 lg:pb-12 pt-2 sm:pt-4">
      <div className="responsive-container">
        {/* Responsive Layout: On desktop, 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Main User Profile Card & Stats (Left on lg: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="w-full bg-white rounded-2xl p-5 sm:p-6 shadow-xs border border-[#e6e8ea] flex flex-col gap-5">
              {/* Profile Top Row */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#eceef0] flex-shrink-0 shadow-inner border border-[#e6e8ea]">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVh1ZL_u9v4t0dwcmjh3S4yefRWmhfA-IkLU2RG7WYsSCnCZGPJf8o1xZJcWIrmedmXCMTXKDHhrL4Bkcv9wyUYh4pmlqAe2mix2CE1TsoUArYg7LbbpyGcin-t6OPsNRYiy-NmZR84ZxypsMq7Acq5883vLXXoO0VtJ3zK_1J1D-EXEjSRHlR3mwt3-ibNQHx_IZougoStcXwE26SYxYy98tsnL1y5gy95lB2nYtY9Q11jWbKzaSn"
                      alt="김멘티"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      aria-label="프로필 이미지 변경"
                      onClick={() => onShowToast('프로필 사진 변경 기능이 열립니다.')}
                      className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-[#004ac6] text-white flex items-center justify-center shadow-md"
                    >
                      <span className="material-symbols-outlined text-[12px]">photo_camera</span>
                    </button>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-lg sm:text-xl font-bold text-[#191c1e] truncate">
                        김멘티
                      </span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#dbe1ff] text-[#00174b] text-[11px] font-bold">
                        성장 레벨 2
                      </span>
                    </div>
                    <p className="text-xs text-[#4f5e81] truncate mt-0.5">
                      예비 창업가 · 주니어 백엔드 취준생
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  id="edit-profile-btn"
                  onClick={() => onShowToast('프로필 정보 수정 화면으로 이동합니다.')}
                  className="px-3 py-1.5 rounded-lg bg-[#eceef0] text-[#191c1e] hover:bg-[#e0e3e5] transition-colors text-xs font-semibold flex items-center gap-1 shrink-0"
                >
                  <span className="material-symbols-outlined text-[15px] text-[#4f5e81]">edit</span>
                  수정
                </button>
              </div>

              {/* 3 Metric counters */}
              <div className="grid grid-cols-3 gap-2 bg-[#f2f4f6] rounded-xl p-2.5">
                <div
                  onClick={() => onShowToast('신청 및 진행 중인 멘토링 3건이 있습니다.')}
                  className="flex flex-col items-center justify-center p-2 rounded-lg bg-white text-center shadow-xs cursor-pointer hover:bg-[#f7f9fb] transition-colors"
                >
                  <span className="text-[11px] text-[#4f5e81] font-medium">신청/진행</span>
                  <span className="text-2xl text-[#004ac6] font-extrabold mt-0.5">
                    3<span className="text-xs ml-0.5 font-bold">건</span>
                  </span>
                </div>

                <div
                  onClick={() => onShowToast('지금까지 5건의 세션을 성공적으로 완료했습니다.')}
                  className="flex flex-col items-center justify-center p-2 rounded-lg bg-white text-center shadow-xs cursor-pointer hover:bg-[#f7f9fb] transition-colors"
                >
                  <span className="text-[11px] text-[#4f5e81] font-medium">완료 세션</span>
                  <span className="text-2xl text-[#006058] font-extrabold mt-0.5">
                    5<span className="text-xs ml-0.5 font-bold">건</span>
                  </span>
                </div>

                <div
                  onClick={() => onShowToast('관심 멘토 및 스크랩 8건 목록으로 이동합니다.')}
                  className="flex flex-col items-center justify-center p-2 rounded-lg bg-white text-center shadow-xs cursor-pointer hover:bg-[#f7f9fb] transition-colors"
                >
                  <span className="text-[11px] text-[#4f5e81] font-medium">북마크/찜</span>
                  <span className="text-2xl text-[#191c1e] font-extrabold mt-0.5">
                    8<span className="text-xs ml-0.5 font-bold">건</span>
                  </span>
                </div>
              </div>

              {/* Points Banner */}
              <div
                onClick={() => onShowToast('바우처 포인트 내역 및 충전 센터로 이동합니다.')}
                className="flex items-center justify-between px-4 py-3 rounded-xl bg-[#d9e2ff] text-[#0a1a3a] cursor-pointer hover:bg-[#c5d4fd] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-[19px] text-[#004ac6]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    monetization_on
                  </span>
                  <span className="text-xs sm:text-sm font-semibold">
                    나의 멘토링 바우처 포인트
                  </span>
                </div>
                <span className="text-lg font-bold text-[#004ac6] tracking-tight">
                  12,500 <span className="text-xs">P</span>
                </span>
              </div>
            </div>

            {/* Quick Links / FAQ Card on Desktop */}
            <div className="hidden lg:flex flex-col gap-3 bg-white rounded-2xl p-5 border border-[#e6e8ea] shadow-xs">
              <span className="text-xs font-bold text-[#4f5e81] uppercase tracking-wider">
                고객 지원
              </span>
              <div className="flex flex-col gap-2 text-xs text-[#434655]">
                <button
                  type="button"
                  onClick={() => onShowToast('1:1 고객센터 실시간 문의가 시작됩니다.')}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-[#f2f4f6] text-left"
                >
                  <span>1:1 상담원 연결</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('자주 묻는 질문(FAQ) 센터로 이동합니다.')}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-[#f2f4f6] text-left"
                >
                  <span>취소/환불 규정 및 안내</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Management Sections (Right on lg: 7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* 멘토링 관리 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-[#4f5e81] uppercase tracking-wider">
                  멘토링 관리
                </span>
                <span className="text-xs text-[#737686]">최근 업데이트 오늘</span>
              </div>

              <div className="bg-white rounded-2xl shadow-xs border border-[#e6e8ea] overflow-hidden flex flex-col divide-y divide-[#eceef0]">
                {/* 1. 예약 내역 */}
                <div
                  onClick={onOpenSessionDetail}
                  className="p-4 bg-[#b4c5ff]/15 hover:bg-[#b4c5ff]/25 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#004ac6] text-[22px]">
                      videocam
                    </span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-[#191c1e]">
                          내 멘토링 예약 내역
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white text-[10px] font-bold animate-pulse">
                          입장 대기 1
                        </span>
                      </div>
                      <span className="text-xs text-[#4f5e81] mt-0.5">
                        오늘 오후 7:30 [클라우드 아키텍처 실무] 세션
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#737686] text-[20px]">
                    chevron_right
                  </span>
                </div>

                {/* 2. 사전 질문지 보관함 */}
                <div
                  onClick={() =>
                    onShowToast('작성 완료된 질문지 4건과 임시저장 내역을 불러왔습니다.')
                  }
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#f7f9fb] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#4f5e81] text-[22px]">
                      inventory_2
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-semibold text-[#191c1e]">
                        신청서 및 사전 질문지 보관함
                      </span>
                      <span className="text-xs text-[#4f5e81] mt-0.5">
                        작성 완료된 질문지 4건 · 임시저장 1건
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#737686] text-[20px]">
                    chevron_right
                  </span>
                </div>

                {/* 3. 리뷰 작성 */}
                <div
                  onClick={onOpenReviewModal}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#f7f9fb] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#006058] text-[22px]">
                      rate_review
                    </span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-semibold text-[#191c1e]">
                          작성 가능한 멘토링 리뷰
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#89f5e7] text-[#005049] text-[10px] font-bold">
                          +3,000P 적립
                        </span>
                      </div>
                      <span className="text-xs text-[#4f5e81] mt-0.5">
                        박정우 멘토와의 세션 피드백을 남겨주세요
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#737686] text-[20px]">
                    chevron_right
                  </span>
                </div>
              </div>
            </div>

            {/* 지원사업 연계 현황 */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-[#4f5e81] uppercase tracking-wider">
                  지원사업 연계 현황
                </span>
                <span className="text-xs text-[#006058] font-bold">공공 매칭 활성화</span>
              </div>

              <div className="bg-white rounded-2xl shadow-xs border border-[#e6e8ea] p-4 flex flex-col gap-3">
                {/* 스크랩 목록 링크 */}
                <div
                  onClick={() => onShowToast('스크랩한 지원사업 5건 목록을 확인합니다.')}
                  className="flex items-center justify-between cursor-pointer hover:bg-[#f7f9fb] p-2 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#dbe1ff] flex items-center justify-center text-[#004ac6]">
                      <span className="material-symbols-outlined text-[20px]">bookmark</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-semibold text-[#191c1e]">
                        스크랩한 맞춤 지원사업
                      </span>
                      <span className="text-xs text-[#4f5e81]">접수 마감 임박 2건 포함</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm text-[#004ac6] font-bold">5건</span>
                    <span className="material-symbols-outlined text-[#737686] text-[18px]">
                      chevron_right
                    </span>
                  </div>
                </div>

                {/* 첨삭 카드 */}
                <div className="p-3.5 rounded-xl bg-[#f2f4f6] flex flex-col gap-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#006058] text-[18px]">
                        verified
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#191c1e]">
                        사업계획서 멘토 전문 첨삭
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#006058] text-white text-[11px] font-bold">
                      검토 완료 1건
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs sm:text-sm text-[#191c1e] truncate">
                      2025 청년창업사관학교 제15기 대비 사업계획서
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-[#eceef0] rounded-full h-1.5 overflow-hidden">
                        <div className="bg-[#006058] h-full rounded-full" style={{ width: '100%' }} />
                      </div>
                      <span className="text-xs text-[#4f5e81] font-bold">100%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-[#4f5e81]">
                      담당 멘토: 한수진 심사역 (피드백 리포트 생성됨)
                    </span>
                    <button
                      type="button"
                      onClick={() => onShowToast('첨삭 리포트 PDF 다운로드 중...')}
                      className="px-2.5 py-1 rounded-lg bg-white text-[#006058] text-xs font-bold shadow-xs hover:bg-[#f7f9fb] transition-colors"
                    >
                      리포트 확인
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 계정 및 알림 설정 */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#4f5e81] uppercase tracking-wider px-1">
                계정 및 알림 설정
              </span>

              <div className="bg-white rounded-2xl shadow-xs border border-[#e6e8ea] divide-y divide-[#eceef0] overflow-hidden">
                {/* 15분 전 알림 토글 */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#004ac6] text-[22px]">
                      notifications_active
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-semibold text-[#191c1e]">
                        멘토링 시작 15분 전 알림
                      </span>
                      <span className="text-xs text-[#4f5e81]">
                        카카오 알림톡 및 푸시 알림 발송
                      </span>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationEnabled}
                      onChange={handleToggleNotification}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#eceef0] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004ac6]" />
                  </label>
                </div>

                {/* 소스코드 다운로드 */}
                <div
                  onClick={async () => {
                    onShowToast('전체 소스코드 ZIP 파일 생성을 시작합니다...');
                    try {
                      await downloadProjectZip();
                      onShowToast('mentoria-source-code.zip 다운로드가 완료되었습니다!');
                    } catch (e) {
                      onShowToast('다운로드 중 문제가 발생했습니다.');
                    }
                  }}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#f7f9fb] transition-colors bg-[#dbe1ff]/20"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#004ac6] text-[22px]">
                      folder_zip
                    </span>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-[#004ac6]">
                          전체 프로젝트 소스코드 다운로드
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#004ac6] text-white text-[10px] font-bold">
                          ZIP 파일
                        </span>
                      </div>
                      <span className="text-xs text-[#4f5e81]">
                        React, Tailwind CSS, 전체 5개 화면 소스 일괄 저장
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#004ac6] text-[20px]">
                    download
                  </span>
                </div>

                {/* 관심 직무 설정 */}
                <div
                  onClick={() => onShowToast('관심 직무 및 창업 단계 수정 모달이 열립니다.')}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#f7f9fb] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#4f5e81] text-[22px]">
                      tune
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-semibold text-[#191c1e]">
                        관심 직무 및 창업 단계 설정
                      </span>
                      <span className="text-xs text-[#4f5e81]">
                        IT/소프트웨어 · 예비창업 패키지 타겟
                      </span>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-[#737686] text-[20px]">
                    chevron_right
                  </span>
                </div>

                {/* 고객센터 */}
                <div
                  onClick={() => onShowToast('1:1 멘토리아 고객지원 센터와 연결되었습니다.')}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#f7f9fb] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#4f5e81] text-[22px]">
                      support_agent
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#191c1e]">
                      고객센터 & 자주 묻는 질문
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#737686] text-[20px]">
                    chevron_right
                  </span>
                </div>

                {/* 공지사항 */}
                <div
                  onClick={() => onShowToast('멘토리아 공지사항 및 약관 목록으로 이동합니다.')}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#f7f9fb] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#4f5e81] text-[22px]">
                      campaign
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-[#191c1e]">
                      공지사항 및 이용약관
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[#737686] text-[20px]">
                    chevron_right
                  </span>
                </div>
              </div>
            </div>

            {/* Logout & Version Footer */}
            <div className="flex flex-col items-center gap-2 py-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onShowToast('안전하게 로그아웃 되었습니다.')}
                  className="text-xs font-semibold text-[#4f5e81] hover:text-[#191c1e] transition-colors"
                >
                  로그아웃
                </button>
                <span className="text-[#eceef0]">|</span>
                <button
                  type="button"
                  onClick={() => onShowToast('회원 탈퇴 안내 페이지로 이동합니다.')}
                  className="text-xs font-semibold text-[#4f5e81] hover:text-[#191c1e] transition-colors"
                >
                  회원 탈퇴
                </button>
              </div>
              <span className="text-[11px] text-[#737686]">
                앱 버전 Mentoria v1.2.0 (최신 버전)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
