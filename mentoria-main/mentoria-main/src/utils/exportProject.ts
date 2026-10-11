import JSZip from 'jszip';

export async function downloadProjectZip() {
  const zip = new JSZip();

  // Root config files
  zip.file(
    'package.json',
    JSON.stringify(
      {
        name: 'mentoria-app',
        private: true,
        version: '1.0.0',
        type: 'module',
        scripts: {
          dev: 'vite',
          build: 'vite build',
          preview: 'vite preview',
        },
        dependencies: {
          react: '^19.0.1',
          'react-dom': '^19.0.1',
          'lucide-react': '^0.546.0',
          '@tailwindcss/vite': '^4.3.3',
          tailwindcss: '^4.3.3',
          jszip: '^3.10.1',
        },
        devDependencies: {
          '@types/react': '^19.3.0',
          '@types/react-dom': '^19.3.0',
          '@vitejs/plugin-react': '^6.1.1',
          typescript: '^7.0.2',
          vite: '^8.3.0',
        },
      },
      null,
      2
    )
  );

  zip.file(
    'vite.config.ts',
    `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
});
`
  );

  zip.file(
    'tsconfig.json',
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'bundler',
          jsx: 'react-jsx',
          strict: true,
          skipLibCheck: true,
          paths: {
            '@/*': ['./src/*'],
          },
        },
        include: ['src'],
      },
      null,
      2
    )
  );

  zip.file(
    'index.html',
    `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <title>멘토리아 (Mentoria) - 현직자 멘토링 & 맞춤 정부지원사업</title>
    <meta name="description" content="네카라쿠배 현직자 1:1 실시간 멘토링과 맞춤형 정부지원사업 매칭 종합 플랫폼" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700;800&family=Noto+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
  </head>
  <body class="bg-[#f7f9fb] text-[#191c1e] antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
  );

  zip.file(
    'README.md',
    `# 멘토리아 (Mentoria) - 현직자 멘토링 & 맞춤 정부지원사업

네카라쿠배 현직자 1:1 실시간 멘토링과 맞춤형 정부지원사업 매칭 종합 플랫폼의 프론트엔드 소스코드입니다.

## 🚀 로컬 실행 방법

1. 의존성 설치:
\`\`\`bash
npm install
\`\`\`

2. 개발 서버 시작:
\`\`\`bash
npm run dev
\`\`\`

3. 브라우저에서 \`http://localhost:3000\` 접속

## 📱 포함된 주요 화면
- **홈 대시보드 (Home)**: 플랫폼 레일 메뉴, 핵심 3종 통계, 최근 멘토링 매칭 현황
- **멘토 찾기 (Mentors)**: 검색 및 직무 필터, 실시간 상담 토글, 4인 멘토 프로필 카드
- **추천 지원사업 (Grants)**: 초창패(1억), 청창사 14기, 비대면 바우처, AI 데이터바우처 공고
- **세션 상세 (Session Detail)**: 김현직 멘토 120분 밀착 커리큘럼, 평점 4.9 지표, 찜/신청 플로팅 바
- **마이페이지 (MY Profile)**: 김멘티 프로필, 바우처 포인트(12,500P), 15분 전 알림 토글
`
  );

  // Fetch or populate src files
  const srcFolder = zip.folder('src');
  if (srcFolder) {
    srcFolder.file(
      'main.tsx',
      `import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
`
    );

    // Fetch live files from the current app
    try {
      const filesToFetch = [
        'App.tsx',
        'index.css',
        'types.ts',
        'data/mockData.ts',
        'components/Header.tsx',
        'components/BottomTabBar.tsx',
        'components/HomeView.tsx',
        'components/MentorsView.tsx',
        'components/GrantsView.tsx',
        'components/SessionDetailView.tsx',
        'components/ProfileView.tsx',
        'components/Toast.tsx',
        'components/ReviewModal.tsx',
        'components/ApplyModal.tsx',
        'components/NotificationsModal.tsx',
      ];

      for (const filePath of filesToFetch) {
        try {
          const res = await fetch(`/src/${filePath}`);
          if (res.ok) {
            const text = await res.text();
            srcFolder.file(filePath, text);
          }
        } catch {
          // ignore individual fetch errors
        }
      }
    } catch {
      // ignore
    }
  }

  // Generate ZIP blob and trigger download
  const content = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(content);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = 'mentoria-source-code.zip';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);
}
