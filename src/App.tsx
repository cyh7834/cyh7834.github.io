import {useEffect, useMemo, useState} from 'react';
import {AppShell} from '@astryxdesign/core/AppShell';
import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import {Theme} from '@astryxdesign/core/theme';
import {neutralTheme} from '@astryxdesign/theme-neutral/built';
import {navSections} from './data/profile';
import {companyProjects, personalProjects} from './data/projects';
import {useActiveSection} from './hooks/useActiveSection';
import {AboutSection} from './components/AboutSection';
import {ContactSection} from './components/ContactSection';
import {PageSection} from './components/PageSection';
import {ProjectCard} from './components/ProjectCard';
import {ProjectDialog} from './components/ProjectDialog';
import {SiteHeader} from './components/SiteHeader';
import type {Project} from './types';

const MODE_STORAGE_KEY = 'portfolio-color-mode';

type ColorMode = 'light' | 'dark';

function readInitialMode(): ColorMode {
  const stored = window.localStorage.getItem(MODE_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function App() {
  const [mode, setMode] = useState<ColorMode>(readInitialMode);
  /** 상세 팝업에 띄울 프로젝트. null 이면 닫힌 상태. */
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionIds = useMemo(() => navSections.map(section => section.id), []);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    window.localStorage.setItem(MODE_STORAGE_KEY, mode);
  }, [mode]);

  return (
    <Theme theme={neutralTheme} mode={mode}>
      <AppShell
        height="auto"
        contentPadding={0}
        topNav={
          <SiteHeader
            activeId={activeId}
            isDark={mode === 'dark'}
            onToggleMode={() => setMode(current => (current === 'dark' ? 'light' : 'dark'))}
          />
        }
        /* mobileNav 를 지정하지 않으면 AppShell 이 TopNav 항목으로 드로어를 자동 구성한다. */
        mobileNav={{breakpoint: 'md'}}>
        <VStack gap={0} width="100%">
          <AboutSection />

          <PageSection
            id="work"
            eyebrow="Work"
            title="회사 프로젝트"
            description="실제 서비스로 운영된 프로젝트입니다. 카드를 누르면 화면 전체와 맡은 일, 기술 스택을 볼 수 있습니다.">
            <Grid columns={{minWidth: 340}} gap={5} align="stretch" width="100%">
              {companyProjects.map(project => (
                <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
              ))}
            </Grid>
          </PageSection>

          <PageSection
            id="personal"
            eyebrow="Personal"
            title="개인 프로젝트"
            description="업무에서 다루기 어려운 주제를 직접 만들어 보며 익힌 것들입니다."
            variant="muted">
            <Grid columns={{minWidth: 340}} gap={5} align="stretch" width="100%">
              {personalProjects.map(project => (
                <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
              ))}
            </Grid>
          </PageSection>

          <ContactSection />
        </VStack>

        <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
      </AppShell>
    </Theme>
  );
}
