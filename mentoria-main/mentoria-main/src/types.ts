export type TabType = 'home' | 'mentors' | 'grants' | 'my-mentoring' | 'profile' | 'session-detail';

export interface Mentor {
  id: string;
  name: string;
  title: string;
  years: number;
  company: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  responseRate?: number;
  pricePerSession: number;
  durationMinutes: number;
  tags: string[];
  quote: string;
  isVerified: boolean;
  isTopMentor?: boolean;
  category: 'dev' | 'pm' | 'marketing' | 'startup' | 'ir' | 'hr';
  sessionType: string;
  nextSessionText?: string;
  isAvailableToday?: boolean;
  highlightText?: string;
}

export interface Grant {
  id: string;
  title: string;
  organization: string;
  dDay: string;
  matchScore: number;
  maxFundingText: string;
  fundingBadge?: string;
  bullets: string[];
  mentorAdvantageText: string;
  category: 'startup' | 'rnd' | 'marketing' | 'employment' | 'voucher';
  isBookmarked: boolean;
  status: 'active' | 'upcoming' | 'always';
}

export interface MentoringSession {
  id: string;
  mentorName: string;
  mentorCategory: string;
  title: string;
  date: string;
  status: '확정됨' | '완료됨';
  timeRemaining?: string;
  hasReviewCTA?: boolean;
}
