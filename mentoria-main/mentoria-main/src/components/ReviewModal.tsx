import React, { useState } from 'react';

interface ReviewModalProps {
  sessionTitle: string;
  mentorName: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (score: number, content: string) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  sessionTitle,
  mentorName,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, content);
    setContent('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#e6e8ea]">
        <div className="flex items-center justify-between pb-3 border-b border-[#eceef0]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[24px]">rate_review</span>
            <h3 className="text-lg font-bold text-[#191c1e]">멘토링 생생 리뷰 작성</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#737686] hover:bg-[#eceef0]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
          <div className="bg-[#f7f9fb] p-3 rounded-xl border border-[#e6e8ea]">
            <span className="text-xs text-[#4f5e81] font-medium">{mentorName}</span>
            <p className="text-sm font-bold text-[#191c1e] mt-0.5">{sessionTitle}</p>
            <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full bg-[#89f5e7] text-[#005049] text-[11px] font-bold">
              ★ 리뷰 작성 완료 시 3,000P 즉시 적립
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#191c1e] block mb-1.5">
              세션 만족도 평점
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="text-amber-400 hover:scale-110 transition-transform focus:outline-none"
                >
                  <span
                    className="material-symbols-outlined text-[32px]"
                    style={{ fontVariationSettings: rating >= star ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    star
                  </span>
                </button>
              ))}
              <span className="text-base font-bold text-[#191c1e] ml-2">{rating}.0 / 5.0</span>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-[#191c1e] block mb-1.5">
              솔직한 후기 및 피드백 (최소 20자 이상)
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="멘토님의 피드백 중 가장 실질적인 도움이 되었던 부분이나 이력서/포트폴리오 개선 포인트를 작성해 주세요."
              className="w-full p-3 rounded-xl border border-[#e6e8ea] bg-[#f7f9fb] text-sm text-[#191c1e] placeholder:text-[#737686] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#004ac6]/30"
              required
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-[#eceef0] text-[#434655] font-semibold text-sm hover:bg-[#e0e3e5] transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-[#004ac6] text-white font-bold text-sm hover:bg-[#003ea8] transition-colors shadow-sm"
            >
              리뷰 등록 (+3,000P 받기)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
