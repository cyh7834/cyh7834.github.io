import {useEffect, useState} from 'react';

/**
 * 스크롤 위치에 따라 현재 보고 있는 섹션 id를 돌려준다.
 * 헤더 메뉴의 선택 상태를 갱신하는 데 쓴다.
 */
export function useActiveSection(ids: string[]): string {
  const [activeId, setActiveId] = useState(ids[0] ?? '');

  useEffect(() => {
    const elements = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      return;
    }

    // 화면 상단 1/3 지점을 지나는 섹션을 "현재 섹션"으로 본다.
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {rootMargin: '-20% 0px -70% 0px', threshold: 0},
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
