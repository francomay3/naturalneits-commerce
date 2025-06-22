import styled from "styled-components";

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  padding-inline: 35px;
`;

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
    <Wrapper>
      <PageItem>Home</PageItem>
      <PageItem>About</PageItem>
      <PageItem>Shop</PageItem>
      <PageItem>FAQS</PageItem>
      <PageItem>Contact</PageItem>
    </Wrapper>
  );
};

export default PagesList;
