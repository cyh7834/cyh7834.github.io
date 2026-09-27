import {Divider} from '@astryxdesign/core/Divider';
import {Grid} from '@astryxdesign/core/Grid';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {StatusDot} from '@astryxdesign/core/StatusDot';
import {Text} from '@astryxdesign/core/Text';
import {career} from '../data/profile';
import type {CareerEntry} from '../types';
import {BulletList} from './BulletList';
import {PageSection} from './PageSection';

/**
 * 경력 요약을 가로 타임라인으로 보여준다. 회사명 없이 기간·직무·분야·주요 작업만 둔다.
 * 구간마다 한 열을 차지하고 열 간격을 0 으로 두어 선이 끊기지 않고 이어지게 한다.
 * 폭이 좁아지면 Grid 가 1열로 접히면서 구간이 위아래로 쌓인다.
 */
export function CareerSection() {
  return (
    <PageSection
      id="career"
      eyebrow="Career"
      title="경력">
      <Grid
        columns={{minWidth: 300, max: career.length}}
        columnGap={0}
        rowGap={8}
        width="100%">
        {career.map((entry, index) => (
          <CareerSegment
            key={entry.start}
            entry={entry}
            isCurrent={index === career.length - 1}
          />
        ))}
      </Grid>
    </PageSection>
  );
}

type SegmentProps = {
  entry: CareerEntry;
  /** 마지막 구간. 끝 눈금을 함께 그리고 점을 강조한다. */
  isCurrent: boolean;
};

function CareerSegment({entry, isCurrent}: SegmentProps) {
  const dotVariant = isCurrent ? 'accent' : 'neutral';

  return (
    <VStack gap={4}>
      <VStack gap={2}>
        <HStack justify="between" vAlign="center">
          <Text type="label" weight="semibold" color="secondary">
            {entry.start}
          </Text>
          {entry.end !== undefined && (
            <Text type="label" weight="semibold" color="accent">
              {entry.end}
            </Text>
          )}
        </HStack>

        {/* 눈금 점 + 선. 다음 구간의 시작 점이 이 구간의 끝 눈금 역할을 한다. */}
        <HStack gap={0} vAlign="center" width="100%">
          <StatusDot variant={dotVariant} label={`${entry.start} 시작`} />
          <VStack width="100%">
            <Divider variant="strong" />
          </VStack>
          {entry.end !== undefined && (
            <StatusDot variant="accent" label={entry.end} isPulsing />
          )}
        </HStack>
      </VStack>

      {/* 열 간격이 0 이라 오른쪽 여백을 직접 두어 옆 구간의 글과 붙지 않게 한다. */}
      <VStack gap={3} style={{paddingInlineEnd: 'var(--spacing-8)'}}>
        <VStack gap={1}>
          <Text type="label" size="lg" weight="semibold" display="block">
            {entry.role}
          </Text>
          <Text type="supporting" color="accent" display="block">
            {entry.domain}
          </Text>
        </VStack>
        <BulletList items={entry.highlights} />
      </VStack>
    </VStack>
  );
}
