import type {Project} from '../types';

/**
 * 아래 내용은 구조를 보여주기 위한 예시 데이터입니다.
 * 실제 프로젝트 내용/스크린샷으로 교체하세요.
 *
 * - media.src 는 public/ 기준 절대 경로 (`/images/projects/...`)
 * - concepts 는 "GIS를 모르는 사람이 읽어도 이해되는" 개념 설명 자리입니다.
 */

export const companyProjects: Project[] = [
  {
    id: 'integrated-gis-platform',
    title: '통합 공간정보 플랫폼',
    tagline: '지자체 공간데이터를 하나의 지도 위에서 조회·분석하는 웹 플랫폼',
    period: '2023.04 — 2024.11',
    org: 'Heliosen · 지자체 발주',
    role: '지도 뷰어 · 공간분석 API 담당',
    summary:
      '흩어져 있던 지적도, 행정경계, 건물, 인허가 데이터를 하나의 지도 뷰어에서 겹쳐 보고, ' +
      '버퍼·중첩 같은 공간분석을 브라우저에서 바로 실행할 수 있게 만든 플랫폼입니다. ' +
      '담당 부서가 GIS 전문가가 아니어도 쓸 수 있도록 분석 시나리오를 화면으로 정형화했습니다.',
    contributions: [
      '지도 뷰어 전면 재작성 — 레이어 트리, 필터, 속성 조회, 인쇄/내보내기 구현',
      'PostGIS 기반 공간분석 API 설계 (버퍼 · 중첩 · 통계 격자)',
      '레이어별 스타일 규칙을 서버에서 내려주는 스타일 스펙 정의',
      '대용량 레이어에 대한 뷰포트 단위 요청·캐싱 전략 적용',
    ],
    concepts: [
      {
        term: '레이어(Layer) 중첩',
        detail:
          '지도는 투명 필름을 겹치듯 여러 데이터를 쌓아 만듭니다. 배경지도 위에 행정경계, 그 위에 지적도를 올리는 식입니다. ' +
          '겹치는 순서와 투명도가 곧 화면의 가독성이 되기 때문에 레이어 순서 자체가 기능입니다.',
      },
      {
        term: '공간 중첩 분석(Overlay)',
        detail:
          '"이 개발 예정지와 겹치는 농림지역이 몇 ㎡인가" 같은 질문을 푸는 연산입니다. ' +
          '두 도형의 교집합 면적을 계산하는 작업으로, PostGIS의 ST_Intersection / ST_Area 로 처리했습니다.',
      },
      {
        term: '버퍼(Buffer)',
        detail:
          '기준 도형에서 일정 거리만큼 확장한 영역입니다. "학교 반경 200m 내 시설"처럼 거리 조건을 공간 질의로 바꿔 줍니다. ' +
          '미터 단위 계산이 필요하므로 위경도(EPSG:4326)가 아닌 투영 좌표계(EPSG:5186)에서 수행합니다.',
      },
      {
        term: '공간 인덱스(GiST)',
        detail:
          '공간 검색은 전체 데이터를 훑으면 느립니다. 도형을 감싸는 사각형(MBR)을 트리로 색인해 후보를 먼저 좁힌 뒤 ' +
          '정밀 연산을 수행하는 방식으로, 인덱스 유무에 따라 응답 시간이 자릿수 단위로 달라집니다.',
      },
    ],
    stack: ['React', 'TypeScript', 'OpenLayers', 'Spring Boot', 'PostGIS', 'GeoServer', 'Redis'],
    media: [
      {
        src: '/images/projects/gis-platform-01.svg',
        alt: '통합 공간정보 플랫폼의 지도 뷰어 화면',
        caption: '지도 뷰어 — 좌측 레이어 트리에서 켠 레이어가 순서대로 겹쳐 그려집니다.',
      },
      {
        src: '/images/projects/gis-platform-02.svg',
        alt: '통합 공간정보 플랫폼의 공간분석 결과 화면',
        caption: '공간분석 — 버퍼 영역과 중첩 결과를 등급별로 시각화하고 표로 함께 제공합니다.',
      },
    ],
  },
  {
    id: 'vector-tile-pipeline',
    title: '벡터 타일 파이프라인',
    tagline: '수백만 건 공간 객체를 지도에서 즉시 그리기 위한 타일 생성·배포 체계',
    period: '2024.01 — 2024.08',
    org: 'Heliosen · 내부 인프라',
    role: '설계 및 구현',
    summary:
      '레이어를 켤 때마다 원본 도형을 통째로 내려받던 구조를 벡터 타일 기반으로 바꿨습니다. ' +
      '타일 생성 배치, 실패 타일 추적, 캐시 무효화까지 운영 관점에서 관리할 수 있는 파이프라인으로 만들었습니다.',
    contributions: [
      'PostGIS → MVT 타일 생성 배치 파이프라인 구축',
      '줌 레벨별 도형 단순화(Simplify) 기준 수립 — 확대 정도에 맞는 정밀도만 전송',
      '타일 캐시 무효화 규칙 정의 (데이터 갱신 범위만 선택적으로 재생성)',
      '타일 생성 상태를 확인하는 운영 대시보드 제작',
    ],
    concepts: [
      {
        term: '타일(Tile)',
        detail:
          '지도를 바둑판처럼 정사각형 조각으로 잘라 필요한 조각만 내려받는 방식입니다. ' +
          '화면에 보이는 영역의 조각만 요청하므로, 데이터가 아무리 커져도 전송량은 화면 크기에 비례합니다.',
      },
      {
        term: '래스터 타일 vs 벡터 타일',
        detail:
          '래스터 타일은 서버가 미리 그린 이미지, 벡터 타일은 좌표와 속성이 담긴 데이터입니다. ' +
          '벡터 타일은 브라우저가 직접 그리기 때문에 스타일 변경·조건부 표출·클릭 조회를 서버 왕복 없이 처리할 수 있습니다.',
      },
      {
        term: '줌 레벨과 일반화(Generalization)',
        detail:
          '전국을 보는 화면에서 건물 외곽선의 1cm 굴곡은 의미가 없습니다. ' +
          '줌 레벨마다 표현에 필요한 만큼만 도형을 단순화해 저장하면, 화질 손실 없이 전송량을 크게 줄일 수 있습니다.',
      },
    ],
    stack: ['PostGIS', 'Java', 'Mapbox Vector Tile', 'MapLibre GL', 'Docker', 'MinIO'],
    media: [
      {
        src: '/images/projects/tile-pipeline-01.svg',
        alt: '벡터 타일 생성 상태를 보여주는 운영 대시보드 화면',
        caption: '운영 대시보드 — 줌 레벨별 타일 생성 상태와 실패 타일을 한눈에 확인합니다.',
      },
    ],
  },
  {
    id: 'field-survey-app',
    title: '현장조사 지원 시스템',
    tagline: '오프라인 환경에서도 조사 결과를 기록하고 복귀 후 동기화하는 현장 도구',
    period: '2022.06 — 2023.03',
    org: 'Heliosen · 공공기관 발주',
    role: '웹 클라이언트 · 동기화 로직',
    summary:
      '통신이 불안정한 현장에서 조사원이 위치와 사진, 조사 항목을 기록하고, ' +
      '네트워크가 복구되면 서버와 충돌 없이 병합하는 시스템입니다. 오프라인 우선 설계가 핵심이었습니다.',
    contributions: [
      '오프라인 타일 캐시 + 로컬 저장소 기반 조사 화면 구현',
      '동기화 충돌 해결 규칙 설계 (최종 수정 시각 + 조사원 우선순위)',
      '조사 지점의 위치 정확도 표기 및 보정 UI 제작',
    ],
    concepts: [
      {
        term: '오프라인 우선(Offline-first)',
        detail:
          '네트워크를 "있으면 좋은 것"으로 두고, 모든 조작을 로컬에 먼저 반영한 뒤 나중에 서버와 맞추는 설계입니다. ' +
          '현장에서 통신이 끊겨도 작업이 멈추지 않습니다.',
      },
      {
        term: 'GPS 정확도와 좌표 보정',
        detail:
          'GPS 좌표에는 항상 오차 반경이 함께 옵니다. 오차가 큰 지점은 화면에 원으로 표시하고, ' +
          '조사원이 지도를 보며 직접 위치를 보정할 수 있게 했습니다. 기록에는 원본 좌표와 보정 좌표를 모두 남깁니다.',
      },
    ],
    stack: ['React', 'TypeScript', 'IndexedDB', 'Service Worker', 'Spring Boot', 'PostgreSQL'],
    media: [
      {
        src: '/images/projects/field-survey-01.svg',
        alt: '현장조사 지원 시스템의 조사 이력 화면',
        caption: '조사 이력 — 동기화 대기 중인 지점과 완료된 지점을 상태별로 구분합니다.',
      },
    ],
  },
];

export const personalProjects: Project[] = [
  {
    id: 'terrain-viewer',
    title: '3D 지형 뷰어',
    tagline: '공개 DEM 데이터로 지형을 3D로 띄우고 가시권을 계산해 보는 실험',
    period: '2024.05 — 진행 중',
    org: 'Personal',
    role: '전체 구현',
    summary:
      '국토지리정보원 수치표고모델을 타일로 가공해 브라우저에서 3D 지형으로 렌더링합니다. ' +
      '특정 지점에서 어디까지 보이는지 계산하는 가시권 분석을 GPU에서 처리해 보는 것이 목표였습니다.',
    contributions: [
      'DEM → 지형 타일 변환 스크립트 작성',
      'WebGL 기반 지형 메시 렌더링 및 LOD 처리',
      '가시권 분석 셰이더 구현',
    ],
    concepts: [
      {
        term: 'DEM (수치표고모델)',
        detail:
          '격자마다 해발고도가 들어 있는 데이터입니다. 이 격자를 높이로 해석해 삼각형 면을 만들면 지형이 됩니다.',
      },
      {
        term: '가시권 분석(Viewshed)',
        detail:
          '관측 지점에서 시야가 닿는 영역을 지형 높이만으로 계산하는 분석입니다. ' +
          '전망대 위치 선정, 통신 중계기 배치 같은 문제에 쓰입니다.',
      },
    ],
    stack: ['TypeScript', 'WebGL', 'Three.js', 'GDAL', 'Vite'],
    media: [
      {
        src: '/images/projects/geo-viewer-01.svg',
        alt: '3D 지형 뷰어 화면',
        caption: '지형 뷰어 — 등고선·경사도 레이어를 지형 위에 함께 표시합니다.',
      },
    ],
    links: [{label: 'GitHub', href: 'https://github.com/cyh7834'}],
  },
  {
    id: 'coord-converter',
    title: '좌표 변환 도구',
    tagline: '국내에서 자주 쓰는 좌표계 사이를 일괄 변환하는 웹 도구',
    period: '2023.11 — 2024.02',
    org: 'Personal',
    role: '전체 구현',
    summary:
      'CSV나 붙여넣은 좌표 목록을 EPSG:4326 / 5186 / 3857 사이에서 일괄 변환합니다. ' +
      '변환 결과를 바로 지도에 찍어 눈으로 검증할 수 있게 만든 것이 핵심입니다.',
    contributions: [
      'proj4 기반 일괄 변환 로직과 오류 행 처리',
      '변환 전후 좌표를 지도에 동시에 표시하는 검증 화면',
      '변환 이력 로컬 저장 및 재실행',
    ],
    concepts: [
      {
        term: '좌표계(CRS)와 EPSG 코드',
        detail:
          '같은 장소도 어떤 기준으로 재느냐에 따라 숫자가 달라집니다. 이 기준을 좌표계라 하고, ' +
          'EPSG 코드로 구분합니다. 4326은 위경도, 5186은 국내 중부원점 미터 좌표, 3857은 웹 지도용 좌표입니다.',
      },
      {
        term: '왜 변환이 필요한가',
        detail:
          '거리·면적 계산은 미터 좌표계에서, 지도 표출은 웹 좌표계에서 해야 정확합니다. ' +
          '데이터마다 좌표계가 다르기 때문에 파이프라인 곳곳에서 변환이 필요합니다.',
      },
    ],
    stack: ['React', 'TypeScript', 'proj4js', 'MapLibre GL'],
    media: [
      {
        src: '/images/projects/geo-viewer-02.svg',
        alt: '좌표 변환 도구 화면',
        caption: '변환 검증 — 입력 좌표와 변환 좌표를 같은 지도에 겹쳐 확인합니다.',
      },
    ],
    links: [{label: 'GitHub', href: 'https://github.com/cyh7834'}],
  },
];
