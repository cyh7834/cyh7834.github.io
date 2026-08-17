import {useState} from 'react';
import {Mail} from 'lucide-react';
import {AspectRatio} from '@astryxdesign/core/AspectRatio';
import {Center} from '@astryxdesign/core/Center';
import {Button} from '@astryxdesign/core/Button';
import {Grid} from '@astryxdesign/core/Grid';
import {HStack, VStack} from '@astryxdesign/core/Stack';
import {Icon} from '@astryxdesign/core/Icon';
import {Section} from '@astryxdesign/core/Section';
import {Heading, Text} from '@astryxdesign/core/Text';
import {Token} from '@astryxdesign/core/Token';
import {profile} from '../data/profile';
import {GithubIcon} from './icons';

/** 프로필 이미지가 커질 수 있는 최대 폭. 열이 이보다 넓어도 원은 이 크기까지만 커진다. */
const PROFILE_IMAGE_MAX_WIDTH = 340;

/**
 * 첫 화면. 프로필 이미지 + 소개 글 + 바로가기.
 * 페이지의 h1 은 여기 한 번만 등장한다.
 */
export function AboutSection() {
  const [hasImageError, setHasImageError] = useState(false);
  const hasPhoto = profile.avatarSrc !== '' && !hasImageError;

  return (
    <Section id="about" data-scroll-anchor="true" variant="section" paddingBlock={10} width="100%">
      <VStack gap={8} width="100%" maxWidth={1080} style={{marginInline: 'auto'}}>
        <Grid columns={{minWidth: 280, max: 2}} gap={8} align="center" width="100%">
          {/* 프로필 이미지가 좌측. 폭이 좁아지면 Grid 가 1열로 접히면서 이미지가 위로 온다. */}
          <VStack gap={4} align="center" width="100%">
            <VStack width="100%" maxWidth={PROFILE_IMAGE_MAX_WIDTH}>
              <AspectRatio ratio={1} shape="ellipse" fit="cover">
                {hasPhoto ? (
                  <img
                    src={profile.avatarSrc}
                    alt={profile.name}
                    /* 파일이 아직 없거나 경로가 틀리면 깨진 이미지 대신 이니셜로 되돌린다. */
                    onError={() => setHasImageError(true)}
                  />
                ) : (
                  /* 사진이 없을 때의 자리. Avatar 는 180px 까지만 커지므로 같은 크기의 원으로 대체한다. */
                  <Center style={{backgroundColor: 'var(--color-background-muted)'}}>
                    <Heading level={2} type="display-1" color="secondary">
                      {profile.name.slice(0, 1)}
                    </Heading>
                  </Center>
                )}
              </AspectRatio>
            </VStack>
            <Text type="supporting" color="secondary" justify="center" display="block">
              {profile.location}
            </Text>
          </VStack>

          <VStack gap={5}>
            <VStack gap={2}>
              {profile.headline !== '' && (
                <Text type="supporting" color="accent" weight="semibold" display="block">
                  {profile.headline}
                </Text>
              )}
              <Heading level={1} type="display-3">
                {profile.name}
              </Heading>
            </VStack>

            <VStack gap={3} maxWidth={620}>
              <Text type="body" display="block">
                {profile.intro}
              </Text>
              <Text type="body" color="secondary" display="block">
                {profile.detail}
              </Text>
            </VStack>

            <HStack gap={2} wrap="wrap">
              <Button
                variant="primary"
                label="프로젝트 보기"
                onClick={() => {
                  document.getElementById('work')?.scrollIntoView({behavior: 'smooth'});
                }}
              />
              <Button
                label="GitHub"
                icon={<Icon icon={GithubIcon} />}
                onClick={() => window.open(profile.links.github, '_blank', 'noopener,noreferrer')}
              />
              <Button
                variant="ghost"
                label="Email"
                icon={<Icon icon={Mail} />}
                onClick={() => {
                  window.location.href = `mailto:${profile.links.email}`;
                }}
              />
            </HStack>
          </VStack>
        </Grid>

        <VStack gap={3}>
          <Text type="label" color="secondary" display="block">
            주로 다루는 것
          </Text>
          <HStack gap={1.5} wrap="wrap">
            {profile.focus.map(item => (
              <Token key={item} label={item} size="md" />
            ))}
          </HStack>
        </VStack>
      </VStack>
    </Section>
  );
}
