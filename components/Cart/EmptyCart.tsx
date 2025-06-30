import { Flex } from "@mantine/core";

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
      <h3>Your cart is empty</h3>
      <p style={{ textAlign: "center", color: "var(--text-color-secondary)" }}>
        Add some items to get started
      </p>
    </Flex>
  );
};

export default EmptyCart;
