import {AspectRatio} from '@astryxdesign/core/AspectRatio';
import type {ProjectMedia} from '../types';

type Props = {
  media: ProjectMedia | undefined;
};

/** 카드 상단의 대표 화면. 클릭 동작은 감싸고 있는 카드가 가진다. */
export function ProjectThumbnail({media}: Props) {
  if (media === undefined) {
    return null;
  }

  return (
    <AspectRatio ratio={16 / 9} fit={media.fit ?? 'cover'}>
      <img
        src={media.src}
        alt={media.alt}
        loading="lazy"
        style={{
          borderRadius: 'var(--radius-element)',
          border: 'var(--border-width) solid var(--color-border)',
        }}
      />
    </AspectRatio>
  );
}
