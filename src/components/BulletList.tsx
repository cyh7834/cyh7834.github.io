import {Item} from '@astryxdesign/core/Item';
import {List} from '@astryxdesign/core/List';
import {Text} from '@astryxdesign/core/Text';

type Props = {
  items: readonly string[];
  color?: 'primary' | 'secondary';
};

/** 담당 업무·성과처럼 여러 줄로 늘어나는 항목을 위한 글머리 목록. */
export function BulletList({items, color = 'secondary'}: Props) {
  return (
    <List listStyle="none" density="compact">
      {items.map(item => (
        <Item
          key={item}
          as="li"
          align="start"
          density="compact"
          marker={
            <Text type="body" color="accent" aria-hidden="true">
              ·
            </Text>
          }
          label={
            <Text type="body" color={color} display="block">
              {item}
            </Text>
          }
        />
      ))}
    </List>
  );
}
