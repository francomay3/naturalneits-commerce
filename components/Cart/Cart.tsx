import IconButton from "@/components/ui/IconButton";
import { IconX } from "@tabler/icons-react";
import styled from "styled-components";
import ItemsList from "./ItemsList";

const Wrapper = styled.div`
  background-color: var(--background-color);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  position: relative;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: 400;
  color: var(--brand-color);
  line-height: 1;
`;

const Separator = styled.div`
  height: 1px;
  background-color: var(--brand-color);
  margin-block: 15px;
`;

const Cart = ({ toggleCart }: { toggleCart: () => void }) => {
  const numberOfItems = 0; // TODO: get the number of items from the cart
  return (
    <Wrapper>
      <IconButton
        onClick={toggleCart}
        Icon={IconX}
        color="var(--brand-color)"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
        }}
      />
      <Title>Cart ({numberOfItems})</Title>
      <Separator />
      <ItemsList />
    </Wrapper>
  );
};

export default Cart;
