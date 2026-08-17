import type {NavSection} from '../types';

/**
 * 사이트 전체의 텍스트 콘텐츠는 이 파일과 projects.ts 에만 있다.
 * 컴포넌트를 건드리지 않고 여기 값만 바꾸면 사이트 내용이 바뀐다.
 */

export const profile = {
  name: '최윤호',
  /** 이름 위에 붙는 한 줄. 빈 문자열로 두면 표시되지 않는다. */
  headline: 'Full Stack Web Developer' as string,
  location: 'Seoul, KR',
  /**
   * public/ 기준 절대 경로. 파일이 없으면 이름 이니셜이 대신 표시된다.
   * 다른 파일명을 쓰면 확장자까지 맞춰서 바꿀 것.
   */
  avatarSrc: '/images/profile.jpg' as string,
  intro:
    '웹 프론트엔드와 백엔드를 함께 다루는 개발자입니다. 데이터를 다루는 서버부터 사용자가 실제로 조작하는 화면까지 ' +
    '한 흐름으로 설계하고 구현합니다.',
  detail:
    '많은 양의 데이터를 끊김 없이 다루는 구조, 오래 유지보수할 수 있는 코드, ' +
    '그리고 현장에서 실제로 쓰이는 화면을 만드는 일에 관심이 많습니다. ' +
    '기술 선택의 이유를 문서로 남기고, 복잡한 개념을 팀이 공유할 수 있는 언어로 정리하는 것을 중요하게 생각합니다.',
  /** 프로필 옆에 보여줄 핵심 키워드 */
  focus: [
    'React · TypeScript',
    'Spring Boot · Java',
    'PostgreSQL',
    '데이터 파이프라인',
    '렌더링 최적화',
    'Docker',
  ],
  links: {
    github: 'https://github.com/cyh7834',
    email: 'cyh7834@gmail.com',
  },
} as const;

export const navSections: NavSection[] = [
  {id: 'about', label: 'About'},
  {id: 'work', label: 'Work'},
  {id: 'personal', label: 'Personal'},
  {id: 'contact', label: 'Contact'},
];
