import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToDetail: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onNavigateToDetail,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border border-[#e6e8ea]">
        <div className="flex items-center justify-between pb-3 border-b border-[#eceef0]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[22px]">notifications</span>
            <h3 className="text-base font-bold text-[#191c1e]">새로운 알림</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#737686] hover:bg-[#eceef0]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="mt-3 flex flex-col gap-3">
          {/* Notification 1 */}
          <div
            onClick={() => {
              onClose();
              onNavigateToDetail();
            }}
            className="p-3 bg-[#dbe1ff]/30 hover:bg-[#dbe1ff]/50 rounded-xl border border-[#004ac6]/20 cursor-pointer transition-colors flex items-start gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-[#004ac6] text-white flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">videocam</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#191c1e]">김현직 멘토 세션 확정</span>
                <span className="text-[10px] text-[#004ac6] font-bold">10분 전</span>
              </div>
              <p className="text-xs text-[#434655] mt-1 leading-snug">
                10.12 (목) 19:00 [백엔드 커리어 리뷰] 세션 예약이 확정되었습니다. 시작 15분 전 입장 링크가 발송됩니다.
              </p>
            </div>
          </div>

          {/* Notification 2 */}
          <div className="p-3 bg-[#f7f9fb] hover:bg-[#eceef0] rounded-xl border border-[#e6e8ea] cursor-pointer transition-colors flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#006058] text-white flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px]">policy</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#191c1e]">추천 지원사업 마감 D-5</span>
                <span className="text-[10px] text-[#ba1a1a] font-bold">1시간 전</span>
              </div>
              <p className="text-xs text-[#434655] mt-1 leading-snug">
                [2024년 초기창업패키지] 접수 마감이 5일 남았습니다. 전담 멘토 첨삭을 서둘러 신청하세요.
              </p>
            </div>
          </div>

          {/* Notification 3 */}
          <div className="p-3 bg-[#f7f9fb] hover:bg-[#eceef0] rounded-xl border border-[#e6e8ea] cursor-pointer transition-colors flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#89f5e7] text-[#005049] flex items-center justify-center shrink-0 mt-0.5 font-bold">
              <span className="material-symbols-outlined text-[16px]">monetization_on</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#191c1e]">바우처 포인트 적립 가능</span>
                <span className="text-[10px] text-[#737686]">어제</span>
              </div>
              <p className="text-xs text-[#434655] mt-1 leading-snug">
                지난 박정우 멘토와의 세션 리뷰를 남기시면 즉시 3,000P가 지급됩니다.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#eceef0] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#eceef0] text-[#191c1e] text-xs font-bold hover:bg-[#e0e3e5] transition-colors"
          >
            확인 완료
          </button>
        </div>
      </div>
    </div>
  );
};
