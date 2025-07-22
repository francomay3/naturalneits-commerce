import { Flex, Text, Title } from "@mantine/core";

const EmptyCart = () => {
  return (
    <Flex
      direction="column"
      bg="var(--background-color)"
      w="100%"
      h="100%"
      p="15px"
      pos="relative"
      align="center"
      justify="center"
      gap="20px"
    >
      <Title order={3}>Your cart is empty</Title>
      <Text ta="center" c="var(--text-color-secondary)">
        Add some items to get started
      </Text>
    </Flex>
  );
};

export default EmptyCart;
