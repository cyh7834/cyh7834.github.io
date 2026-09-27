import type {CareerEntry, NavSection} from '../types';

/**
 * 사이트 전체의 텍스트 콘텐츠는 이 파일과 projects.ts 에만 있다.
 * 컴포넌트를 건드리지 않고 여기 값만 바꾸면 사이트 내용이 바뀐다.
 */

export const profile = {
  name: '최윤호',
  /** 이름 위에 붙는 한 줄. 빈 문자열로 두면 표시되지 않는다. */
  headline: 'Backend Developer' as string,
  location: 'Seoul, KR',
  /**
   * public/ 기준 절대 경로. 파일이 없으면 이름 이니셜이 대신 표시된다.
   * 다른 파일명을 쓰면 확장자까지 맞춰서 바꿀 것.
   */
  avatarSrc: '/images/profile.jpg' as string,
  intro:
    '시스템의 구조와 흐름을 설계하는 백엔드 개발자입니다. 10년간 GIS와 실시간 관제 시스템을 중심으로 ' +
    '대용량 파일 처리, 실시간 통신, 비동기 작업 처리가 필요한 서비스를 만들어 왔습니다.',
  /** 소개 글 아래에 이어지는 문단. 배열의 각 항목이 한 문단으로 렌더링된다. */
  detail: [
    '서비스의 요구사항과 데이터 특성에 맞춰 API와 통신 구조를 설계하고, 메시지 큐·캐시·비동기 처리로 ' +
      '시스템 간 의존성과 처리 부하를 줄입니다. 기능을 만드는 데서 멈추지 않고, 실제로 드러나는 성능 병목과 ' +
      '운영 문제를 찾아 고치는 일을 중요하게 생각합니다.',
    '현재는 파트리더로서 시스템 설계와 기술 방향을 정하고 직접 구현합니다. 백엔드를 중심으로 실시간 통신, ' +
      '데이터 처리, GIS, 프론트엔드와 인프라까지 필요한 영역을 직접 다룹니다.',
  ],
  /** 프로필 옆에 보여줄 핵심 키워드 */
  focus: [
    'Spring Boot · Java',
    'Fast API · Python',
    'React · JavaScript',
    'Nginx',
    'Apache',
    'RabbitMQ',
    'Redis',
    'JPA',
    'MyBatis',
    'Docker',
    'GIS',
  ],
  links: {
    github: 'https://github.com/cyh7834',
    email: 'cyh7834@gmail.com',
  },
} as const;

export const navSections: NavSection[] = [
  {id: 'about', label: 'About'},
  {id: 'career', label: 'Career'},
  {id: 'work', label: 'Work'},
  {id: 'personal', label: 'Personal'},
  {id: 'contact', label: 'Contact'},
];

/** 가로 타임라인에 왼쪽부터 놓이므로 오래된 경력이 앞에 온다. */
export const career: CareerEntry[] = [
  {
    start: '2016.09',
    role: '백엔드 개발 · 대리',
    domain: '드론 · CCTV 단방향 관제',
    highlights: [
      'GIS·관제 시스템의 데이터 모델과 API 구현',
      'Thymeleaf 기반 관리 화면과 SSE 실시간 지도 관제 개발',
      'Jenkins 기반 CI/CD 구축과 JPA 조회 성능 개선',
    ],
  },
  {
    start: '2022.12',
    end: 'Present',
    role: '파트리더 · 백엔드 개발 · 과장',
    domain: '대용량 3D 공간데이터 · 실시간 드론 영상 · 실내 측위 · 클라우드 서비스',
    highlights: [
      '시스템 아키텍처 설계와 프로젝트별 기술 방향 결정',
      '온프레미스·클라우드를 아우르는 대용량 파일 업로드·변환·스트리밍 구조 설계',
      '영상·이벤트·제어 통신을 특성별로 분리한 실시간 통신 구조 설계',
      '결제·사용량 집계의 부분 실패를 고려한 메시지 큐 기반 비동기 처리·장애 복구 설계',
      '공간 인덱스·쿼리 튜닝과 캐시 적용으로 성능 병목 개선',
      'Thymeleaf 서버 렌더링에서 React 기반 SPA 개발까지 프론트엔드 영역 확장',
    ],
  },
];
