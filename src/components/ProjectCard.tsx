import {ClickableCard} from '@astryxdesign/core/ClickableCard';
import {VStack} from '@astryxdesign/core/Stack';
import {Heading, Text} from '@astryxdesign/core/Text';
import type {Project} from '../types';
import {ProjectThumbnail} from './ProjectThumbnail';

type Props = {
  project: Project;
  onSelect: (project: Project) => void;
};

/**
 * 목록에 놓이는 프로젝트 카드.
 * 화면·제목·요약까지만 보여주고, 자세한 내용은 카드를 눌러 여는 상세 팝업에서 다룬다.
 */
export function ProjectCard({project, onSelect}: Props) {
  return (
    <ClickableCard
      label={`${project.title} 상세 보기`}
      onClick={() => onSelect(project)}
      elevation="low"
      padding={4}
      width="100%">
      <VStack gap={4} height="100%">
        <ProjectThumbnail media={project.media[0]} />

        {/*
          제목 / 한 줄 요약 / 개요가 서로 구분되도록 세 단계를 다르게 둔다.
          - 제목: heading-2 크기(20px, semibold), 문서 구조상으로는 h3
          - 한 줄 요약: label 17px, medium, accent — 제목과 한 덩어리로 붙인다
          - 개요: body 14px, normal, secondary — 간격을 벌려 분리한다
        */}
        <VStack gap={3}>
          <VStack gap={1}>
            <Heading level={2} accessibilityLevel={3}>
              {project.title}
            </Heading>
            <Text type="label" size="lg" color="accent" display="block">
              {project.tagline}
            </Text>
          </VStack>
          <Text type="body" color="secondary" display="block" maxLines={3}>
            {project.summary}
          </Text>
        </VStack>
      </VStack>
    </ClickableCard>
  );
}
