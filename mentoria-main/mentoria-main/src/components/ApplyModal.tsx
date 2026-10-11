import React, { useState } from 'react';

interface ApplyModalProps {
  title: string;
  subtitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: { name: string; email: string; note: string }) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  title,
  subtitle,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('김멘티');
  const [email, setEmail] = useState('pjh747811@gmail.com');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, note });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#e6e8ea]">
        <div className="flex items-center justify-between pb-3 border-b border-[#eceef0]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#004ac6] text-[24px]">assignment</span>
            <h3 className="text-lg font-bold text-[#191c1e]">신청서 작성</h3>
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
          <div className="bg-[#f7f9fb] p-3.5 rounded-xl border border-[#e6e8ea]">
            <span className="text-xs text-[#004ac6] font-bold">신청 대상</span>
            <p className="text-base font-bold text-[#191c1e] mt-0.5">{title}</p>
            <p className="text-xs text-[#4f5e81] mt-1">{subtitle}</p>
          </div>

          <div>
            <label className="text-xs font-bold text-[#191c1e] block mb-1">신청자 성명</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#e6e8ea] bg-[#f7f9fb] text-sm text-[#191c1e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004ac6]/30"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#191c1e] block mb-1">
              안내 수신 이메일 (구글 밋 링크 전송)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#e6e8ea] bg-[#f7f9fb] text-sm text-[#191c1e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004ac6]/30"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-[#191c1e] block mb-1">
              사전 질문 또는 검토받을 링크 (GitHub / Notion / 사업계획서)
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="예: 백엔드 스프링부트 아키텍처 포트폴리오 노션 링크 및 이직 시 기술면접 고민 질문"
              className="w-full p-2.5 rounded-xl border border-[#e6e8ea] bg-[#f7f9fb] text-sm text-[#191c1e] placeholder:text-[#737686] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#004ac6]/30"
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
              신청서 제출 완료
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
