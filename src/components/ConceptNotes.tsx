import {Card} from '@astryxdesign/core/Card';
import {Grid} from '@astryxdesign/core/Grid';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import type {ConceptNote} from '../types';

type Props = {
  concepts: ConceptNote[];
};

/**
 * 프로젝트의 도메인 개념 설명.
 * 프로젝트 화면만으로는 "무엇을 푼 문제인지" 전달되지 않으므로,
 * 용어와 그 용어가 왜 필요한지를 상세 팝업 안에 같이 둔다.
 */
export function ConceptNotes({concepts}: Props) {
  if (concepts.length === 0) {
    return null;
  }

  return (
    <VStack gap={2}>
      <Text type="label" weight="semibold" display="block">
        이 프로젝트를 이해하는 개념
      </Text>
      <Grid columns={{minWidth: 280}} gap={2} align="stretch" width="100%">
        {concepts.map(concept => (
          <Card key={concept.term} variant="muted" width="100%">
            <VStack gap={1}>
              <Text type="label" weight="semibold" display="block">
                {concept.term}
              </Text>
              <Text type="supporting" color="secondary" display="block">
                {concept.detail}
              </Text>
            </VStack>
          </Card>
        ))}
      </Grid>
    </VStack>
  );
}
