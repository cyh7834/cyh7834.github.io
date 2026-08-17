# cyh7834.github.io

개발자 포트폴리오. React 19 + Vite + [Astryx Design System](https://astryx.atmeta.com) (Meta 오픈소스) 으로 만들었습니다.

## 실행

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ 생성
npm run preview  # 빌드 결과 확인
```

## 구조

한 페이지 스크롤 구성이며, 상단 헤더 메뉴가 각 섹션 앵커로 이동합니다.

| 섹션 | 앵커 | 내용 |
| --- | --- | --- |
| About | `#about` | 프로필 이미지, 소개 글, 주요 키워드 |
| Work | `#work` | 회사 프로젝트 (카드 → 상세 팝업) |
| Personal | `#personal` | 개인 프로젝트 (카드 → 상세 팝업) |
| Contact | `#contact` | 연락처 |

```
src/
├─ data/
│  ├─ profile.ts       # 이름·소개·링크  ← 내용 수정은 여기부터
│  └─ projects.ts      # 회사/개인 프로젝트 데이터
├─ components/
│  ├─ SiteHeader.tsx   # TopNav (스크롤 스파이 + 다크모드 토글)
│  ├─ PageSection.tsx  # 섹션 공통 껍데기 (앵커·폭·제목)
│  ├─ AboutSection.tsx
│  ├─ ProjectCard.tsx     # 목록 카드 (대표 화면 + 제목 + 요약, 누르면 상세 팝업)
│  ├─ ProjectDialog.tsx   # 상세 팝업 (화면 전체 · 맡은 일 · 기술 스택 · 개념)
│  ├─ ProjectThumbnail.tsx
│  ├─ ConceptNotes.tsx    # 도메인 개념 설명
│  └─ BulletList.tsx
├─ hooks/useActiveSection.ts
└─ types.ts
```

## 내용 교체하기

컴포넌트를 건드릴 필요 없이 데이터 파일만 바꾸면 됩니다.

1. **프로필** — `src/data/profile.ts`
   - `profile.avatarSrc` 에 프로필 이미지 경로를 넣습니다. `public/images/profile.jpg` 에 파일을 두고 `'/images/profile.jpg'` 로 지정하세요. 비워 두면 이름 이니셜이 표시됩니다.
2. **프로젝트** — `src/data/projects.ts`
   - `companyProjects` / `personalProjects` 배열에 항목을 추가합니다.
   - `media` 의 스크린샷은 `public/images/projects/` 아래에 두고 `/images/projects/파일명` 으로 참조합니다. 현재 들어 있는 SVG 는 배치 확인용 더미이므로 실제 캡처로 교체하세요.
   - `concepts` 는 해당 도메인을 모르는 사람도 읽을 수 있게 용어와 배경을 적는 자리입니다. 상세 팝업 하단에 표시됩니다.

## 디자인 시스템

Astryx 컴포넌트만 사용하고, 레이아웃도 `VStack` / `HStack` / `Grid` / `Section` / `Card` 로 구성합니다.
색·간격·라운드는 디자인 토큰(`var(--color-*)`, `var(--spacing-*)`, `var(--radius-*)`)을 사용하며 하드코딩하지 않습니다.

```bash
npx astryx component <Name>   # 컴포넌트 props 와 예제
npx astryx search "<검색어>"   # 컴포넌트 / 템플릿 / 문서 검색
npx astryx docs tokens        # 토큰 목록
```

테마는 `@astryxdesign/theme-neutral` 이며, `npx astryx theme list` 로 다른 테마(butter, gothic, matcha, stone 등)를 확인하고 `src/App.tsx` 의 `neutralTheme` 만 교체하면 전체 톤이 바뀝니다.

## 배포

`main` 브랜치에 push 하면 `.github/workflows/deploy.yml` 이 빌드 후 GitHub Pages 로 배포합니다.
저장소 **Settings → Pages → Source** 를 **GitHub Actions** 로 한 번 설정해야 동작합니다.
