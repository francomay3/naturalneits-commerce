"use client";
import Button from "@/components/ui/Button";
import { Flex, Text, Title } from "@mantine/core";

const Error = ({ reset }: { reset: () => void }) => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="1rem"
      p="2rem"
    >
      <Title order={2}>Oh no!</Title>
      <Text ta="center">
        There was an issue with our storefront. This could be a temporary issue,
        please try your action again.
      </Text>
      <Button onClick={reset}>Try Again</Button>
    </Flex>
  );
};

export default Error;
