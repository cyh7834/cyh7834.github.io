import type {ReactNode} from 'react';
import {Section} from '@astryxdesign/core/Section';
import {VStack} from '@astryxdesign/core/Stack';
import {Heading, Text} from '@astryxdesign/core/Text';

const CONTENT_MAX_WIDTH = 1080;

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  variant?: 'section' | 'muted' | 'transparent';
  hasTopDivider?: boolean;
  children: ReactNode;
};

/**
 * 모든 섹션의 공통 껍데기.
 * 앵커 id, 폭 제한, 제목 블록을 한 곳에서 관리해 섹션마다 간격이 어긋나지 않게 한다.
 */
export function PageSection({
  id,
  eyebrow,
  title,
  description,
  variant = 'section',
  hasTopDivider = true,
  children,
}: Props) {
  return (
    <Section
      id={id}
      data-scroll-anchor="true"
      variant={variant}
      paddingBlock={10}
      dividers={hasTopDivider ? ['top'] : undefined}
      width="100%">
      <VStack gap={6} width="100%" maxWidth={CONTENT_MAX_WIDTH} style={{marginInline: 'auto'}}>
        <VStack gap={2}>
          <Text type="supporting" color="accent" weight="semibold" display="block">
            {eyebrow}
          </Text>
          <Heading level={2}>{title}</Heading>
          {description !== undefined && (
            <VStack maxWidth={720}>
              <Text type="body" color="secondary" display="block">
                {description}
              </Text>
            </VStack>
          )}
        </VStack>
        {children}
      </VStack>
    </Section>
  );
}
