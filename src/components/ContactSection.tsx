import { Mail } from "lucide-react";
import { Button } from "@astryxdesign/core/Button";
import { HStack, VStack } from "@astryxdesign/core/Stack";
import { Icon } from "@astryxdesign/core/Icon";
import { Text } from "@astryxdesign/core/Text";
import { profile } from "../data/profile";
import { PageSection } from "./PageSection";
import { GithubIcon } from "./icons";

export function ContactSection() {
  return (
    <PageSection
      id="contact"
      eyebrow="Contact"
      title="언제든 연락 부탁드립니다"
      description="새로운 기회와 프로젝트, 기술에 대한 이야기를 기다리고 있습니다."
    >
      <VStack gap={4}>
        <HStack gap={2} wrap="wrap">
          <Button
            variant="primary"
            label={profile.links.email}
            icon={<Icon icon={Mail} />}
            onClick={() => {
              window.location.href = `mailto:${profile.links.email}`;
            }}
          />
          <Button
            label="GitHub"
            icon={<Icon icon={GithubIcon} />}
            onClick={() =>
              window.open(profile.links.github, "_blank", "noopener,noreferrer")
            }
          />
        </HStack>
        <Text type="supporting" color="secondary" display="block">
          © {new Date().getFullYear()} {profile.name}. Built with React + Astryx
          Design System.
        </Text>
      </VStack>
    </PageSection>
  );
}
