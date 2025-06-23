import IconButton from "@/components/ui/IconButton";
import { IconX } from "@tabler/icons-react";
import styled from "styled-components";
import Button from "../ui/Button";
import ItemsList from "./ItemsList";
import Separator from "./Separator";

const Wrapper = styled.div`
  background-color: var(--background-color);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  position: relative;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: 400;
  color: var(--brand-color);
  line-height: 1;
`;

const CartSummary = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CartSummaryText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SubtotalText = styled.span`
  font-size: 21px;
  font-weight: 400;
  color: var(--brand-color);
`;

const TaxesAndShippingText = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: var(--brand-color);
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
      <h3>Cart ({numberOfItems})</h3>
      <Separator m="20" />
      <ItemsList />
      <Separator m="20" />
      <CartSummary>
        <CartSummaryText>
          <h5>Subtotal</h5>
          <p
            style={{
              fontSize: "12px",
              color: "var(--brand-color)",
            }}
          >
            Taxes and shipping calculated at checkout
          </p>
        </CartSummaryText>
        <h3>$30.00</h3>
      </CartSummary>
      <Button
        secondary
        style={{
          paddingInline: "40px",
          marginLeft: "auto",
          marginTop: "20px",
        }}
      >
        Checkout
      </Button>
    </Wrapper>
  );
};

export default Cart;
