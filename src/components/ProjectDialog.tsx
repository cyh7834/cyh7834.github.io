import {ExternalLink} from 'lucide-react';
import {AspectRatio} from '@astryxdesign/core/AspectRatio';
import {Badge} from '@astryxdesign/core/Badge';
import {Button} from '@astryxdesign/core/Button';
import {Dialog, DialogHeader} from '@astryxdesign/core/Dialog';
import {Divider} from '@astryxdesign/core/Divider';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Icon} from '@astryxdesign/core/Icon';
import {Text} from '@astryxdesign/core/Text';
import {Token} from '@astryxdesign/core/Token';
import type {Project} from '../types';
import {BulletList} from './BulletList';
import {CaseNotes} from './CaseNotes';
import {ConceptNotes} from './ConceptNotes';

type Props = {
  project: Project | null;
  onClose: () => void;
};

/**
 * 프로젝트 상세 팝업.
 * 목록 카드는 대표 화면과 요약만 보여주고, 화면 전체·개선 사례·맡은 일·기술 스택·개념은 여기서 다룬다.
 */
export function ProjectDialog({project, onClose}: Props) {
  const meta = [project?.org, project?.role].filter(
    (value): value is string => value !== undefined && value !== '',
  );
  const contributions = project?.contributions ?? [];

  return (
    <Dialog
      isOpen={project !== null}
      onOpenChange={isOpen => {
        if (!isOpen) {
          onClose();
        }
      }}
      width="min(920px, 92vw)"
      maxHeight="88vh">
      {project !== null && (
        <>
          <DialogHeader
            title={project.title}
            subtitle={project.tagline}
            onOpenChange={onClose}
          />

          <VStack gap={6} padding={5} isScrollable>
            {/* 소속·역할은 적을 내용이 있는 프로젝트에서만 기간 옆에 붙인다. */}
            <HStack gap={2} wrap="wrap" vAlign="center">
              <Badge label={project.period} variant="neutral" />
              {meta.length > 0 && (
                <Text type="supporting" color="secondary">
                  {meta.join(' · ')}
                </Text>
              )}
            </HStack>

            <VStack gap={2}>
              <Text type="body" color="secondary" display="block">
                {project.summary}
              </Text>
              {/* 담당 범위는 사례를 읽기 전에 알아야 하므로 요약 바로 아래에 둔다. */}
              {project.scopeNote !== undefined && (
                <Text type="supporting" color="secondary" display="block">
                  담당 범위 — {project.scopeNote}
                </Text>
              )}
            </VStack>

            <Divider />

            {/* 화면이 없는 프로젝트도 있으므로 제목까지 함께 감춘다. */}
            {project.media.length > 0 && (
              <VStack gap={4}>
                <Text type="label" weight="semibold" display="block">
                  화면
                </Text>
                {project.media.map(item => (
                  <VStack key={item.src} gap={1.5}>
                    <AspectRatio ratio={16 / 9} fit={item.fit ?? 'cover'}>
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        style={{
                          borderRadius: 'var(--radius-element)',
                          border: 'var(--border-width) solid var(--color-border)',
                        }}
                      />
                    </AspectRatio>
                    <Text type="supporting" color="secondary" display="block">
                      {item.caption}
                    </Text>
                  </VStack>
                ))}
              </VStack>
            )}

            {/* 담당 범위를 먼저 훑고(맡은 일), 그중 몇 건을 깊게 읽는(개선 사례) 순서로 둔다. */}
            {contributions.length > 0 && (
              <VStack gap={2}>
                <Text type="label" weight="semibold" display="block">
                  맡은 일
                </Text>
                <BulletList items={contributions} />
              </VStack>
            )}

            {project.cases !== undefined && <CaseNotes cases={project.cases} />}

            {project.stack.length > 0 && (
              <VStack gap={2}>
                <Text type="label" weight="semibold" display="block">
                  기술 스택
                </Text>
                <HStack gap={1} wrap="wrap">
                  {project.stack.map(tech => (
                    <Token key={tech} label={tech} size="sm" />
                  ))}
                </HStack>
              </VStack>
            )}

            <ConceptNotes concepts={project.concepts} />

            {project.links !== undefined && project.links.length > 0 && (
              <HStack gap={2} wrap="wrap">
                {project.links.map(link => (
                  <Button
                    key={link.href}
                    size="sm"
                    label={link.label}
                    endContent={<Icon icon={ExternalLink} size="sm" />}
                    onClick={() => window.open(link.href, '_blank', 'noopener,noreferrer')}
                  />
                ))}
              </HStack>
            )}
          </VStack>
        </>
      )}
    </Dialog>
  );
}
