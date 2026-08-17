export type NavSection = {
  /** 앵커 id. 헤더 메뉴의 href(`#id`)와 섹션 id가 같아야 스크롤 스파이가 동작한다. */
  id: string;
  label: string;
};

export type ProjectMedia = {
  src: string;
  alt: string;
  /** 화면이 무엇을 보여주는지 한 줄 설명. Lightbox 캡션으로도 쓰인다. */
  caption: string;
};

/** 프로젝트를 이해하는 데 필요한 도메인 개념 설명 */
export type ConceptNote = {
  term: string;
  detail: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  title: string;
  /** 한 줄 요약 */
  tagline: string;
  period: string;
  /** 회사 프로젝트는 소속/발주처, 개인 프로젝트는 'Personal' 등 */
  org: string;
  role: string;
  summary: string;
  /** 담당 업무와 성과 */
  contributions: string[];
  /** 도메인 개념 설명 — 해당 분야를 모르는 독자도 이해할 수 있도록 */
  concepts: ConceptNote[];
  stack: string[];
  media: ProjectMedia[];
  links?: ProjectLink[];
};
