import {Card} from '@astryxdesign/core/Card';
import {MetadataList, MetadataListItem} from '@astryxdesign/core/MetadataList';
import {VStack} from '@astryxdesign/core/Stack';
import {Text} from '@astryxdesign/core/Text';
import type {CaseNote} from '../types';

type Props = {
  cases: CaseNote[];
};

/**
 * 개선 사례를 문제–원인–변경–결과로 보여준다.
 * 라벨을 문자열에 섞지 않고 MetadataList 의 dt/dd 로 두어,
 * 값이 몇 줄로 늘어나도 라벨 열이 그대로 정렬되게 한다.
 */
export function CaseNotes({cases}: Props) {
  if (cases.length === 0) {
    return null;
  }

  return (
    <VStack gap={2}>
      <Text type="label" weight="semibold" display="block">
        개선 사례
      </Text>
      <VStack gap={2}>
        {cases.map(item => (
          <Card key={item.title} variant="muted" width="100%">
            <VStack gap={2}>
              <Text type="label" weight="semibold" display="block">
                {item.title}
              </Text>
              <MetadataList columns="single" label={{position: 'start', width: 44}}>
                <MetadataListItem label="문제">{item.problem}</MetadataListItem>
                <MetadataListItem label="원인">{item.cause}</MetadataListItem>
                <MetadataListItem label="변경">{item.change}</MetadataListItem>
                <MetadataListItem label="결과">{item.result}</MetadataListItem>
              </MetadataList>
            </VStack>
          </Card>
        ))}
      </VStack>
    </VStack>
  );
}
