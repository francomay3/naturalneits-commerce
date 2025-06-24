import { Flex } from "@mantine/core";
import styled from "styled-components";

const PageItem = styled.li`
  font-size: 18px;
  color: var(--brand-color);
  padding-block: 20px;
  border-bottom: 1px solid var(--brand-color);
  text-transform: uppercase;
  list-style: none;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    color: var(--secondary-color);
  }
`;

// TODO: add links and create the pages

const PagesList = () => {
  return (
    <Flex direction="column" bg="var(--background-color)" w="100%" h="100%">
      <PageItem>Home</PageItem>
      <PageItem>About</PageItem>
      <PageItem>Shop</PageItem>
      <PageItem>FAQS</PageItem>
      <PageItem>Contact</PageItem>
    </Flex>
  );
};

export default PagesList;
