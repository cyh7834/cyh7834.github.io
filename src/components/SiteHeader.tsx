import {Code, Moon, Sun} from 'lucide-react';
import {HStack} from '@astryxdesign/core/Stack';
import {Icon} from '@astryxdesign/core/Icon';
import {IconButton} from '@astryxdesign/core/IconButton';
import {NavIcon} from '@astryxdesign/core/NavIcon';
import {TopNav, TopNavHeading, TopNavItem} from '@astryxdesign/core/TopNav';
import {navSections, profile} from '../data/profile';
import {GithubIcon} from './icons';

type Props = {
  activeId: string;
  isDark: boolean;
  onToggleMode: () => void;
};

export function SiteHeader({activeId, isDark, onToggleMode}: Props) {
  return (
    <TopNav
      label="주요 메뉴"
      heading={
        <TopNavHeading
          heading={profile.name}
          subheading={profile.headline === '' ? undefined : profile.headline}
          headingHref="#about"
          logo={<NavIcon icon={<Icon icon={Code} size="sm" />} />}
        />
      }
      /* 항목을 Stack 으로 감싸지 않는다. 모바일 드로어에서 TopNav 가 항목을 세로로 다시 배치한다. */
      centerContent={navSections.map(section => (
        <TopNavItem
          key={section.id}
          label={section.label}
          href={`#${section.id}`}
          isSelected={activeId === section.id}
        />
      ))}
      endContent={
        <HStack gap={1} vAlign="center">
          <IconButton
            variant="ghost"
            label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
            tooltip={isDark ? '라이트 모드' : '다크 모드'}
            icon={<Icon icon={isDark ? Sun : Moon} />}
            onClick={onToggleMode}
          />
          <IconButton
            variant="ghost"
            label="GitHub 프로필 열기"
            tooltip="GitHub"
            icon={<Icon icon={GithubIcon} />}
            onClick={() => window.open(profile.links.github, '_blank', 'noopener,noreferrer')}
          />
        </HStack>
      }
    />
  );
}
