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
import {ConceptNotes} from './ConceptNotes';

type Props = {
  project: Project | null;
  onClose: () => void;
};

/**
 * 프로젝트 상세 팝업.
 * 목록 카드는 대표 화면과 요약만 보여주고, 화면 전체·맡은 일·기술 스택·개념은 여기서 다룬다.
 */
export function ProjectDialog({project, onClose}: Props) {
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
            <HStack gap={2} wrap="wrap" vAlign="center">
              <Badge label={project.period} variant="neutral" />
              <Text type="supporting" color="secondary">
                {project.org} · {project.role}
              </Text>
            </HStack>

            <Text type="body" color="secondary" display="block">
              {project.summary}
            </Text>

            <Divider />

            <VStack gap={4}>
              <Text type="label" weight="semibold" display="block">
                화면
              </Text>
              {project.media.map(item => (
                <VStack key={item.src} gap={1.5}>
                  <AspectRatio ratio={16 / 9} fit="cover">
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

            <VStack gap={2}>
              <Text type="label" weight="semibold" display="block">
                맡은 일
              </Text>
              <BulletList items={project.contributions} />
            </VStack>

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
