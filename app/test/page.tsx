import Link from "@/components/ui/Link";
import { ActionIcon, Button, Text, Title, Tooltip } from "@mantine/core";
import { IconBrandGoogle } from "@tabler/icons-react";

export default async function TestPage() {
  return (
    <div>
      <Button>test button</Button>
      <Text>test text</Text>
      <Link href="https://www.google.com">test anchor</Link>
      <Tooltip label="test tooltip">
        <Title order={1}>
          Whereas disregard and contempt for human rights have resulted
        </Title>
      </Tooltip>
      <ActionIcon color="var(--mantine-color-brand-filled)">
        <IconBrandGoogle size={20} />
      </ActionIcon>
    </div>
  );
}
