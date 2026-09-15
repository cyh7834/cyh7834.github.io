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
  /**
   * 16:9 자리에 어떻게 담을지. 가로 스크린샷은 기본값 'cover' 로 꽉 채우고,
   * 세로 사진처럼 잘리면 안 되는 이미지만 'contain' 으로 전체를 보여준다.
   */
  fit?: 'cover' | 'contain';
};

/** 프로젝트를 이해하는 데 필요한 도메인 개념 설명 */
export type ConceptNote = {
  term: string;
  detail: string;
};

/**
 * 판단이 있었던 작업 하나를 문제–원인–변경–결과로 펼친 기록.
 * 이력서가 "무엇을 했는가"를 압축한다면 이쪽은 "왜 그렇게 했는가"를 남긴다.
 */
export type CaseNote = {
  title: string;
  /** 겪은 증상. 원인이 아니라 드러난 현상만 적는다. */
  problem: string;
  /** 그 증상을 만든 구조. problem 을 다시 쓰지 않는다. */
  cause: string;
  change: string;
  /** 변경 후 관측된 것. problem 에 답해야 한다. 감수한 비용이 있으면 함께 적는다. */
  result: string;
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
  /** 회사 프로젝트는 소속/발주처, 개인 프로젝트는 'Personal' 등. 적을 내용이 없으면 생략한다. */
  org?: string;
  role?: string;
  summary: string;
  /** 담당 범위의 경계. 요약 바로 아래에 한 줄로 붙는다. */
  scopeNote?: string;
  /** 담당 업무와 성과 */
  contributions?: string[];
  /** 개선 사례. contributions 가 목록이라면 이쪽은 그중 판단이 있었던 몇 건을 풀어 쓴 것. */
  cases?: CaseNote[];
  /** 도메인 개념 설명 — 해당 분야를 모르는 독자도 이해할 수 있도록 */
  concepts: ConceptNote[];
  stack: string[];
  media: ProjectMedia[];
  links?: ProjectLink[];
};
