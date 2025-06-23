import { IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import styled from "styled-components";
import IconButton from "../ui/IconButton";
import Separator from "./Separator";

const ItemWrapper = styled.div`
  display: flex;
  gap: 15px;
  position: relative;
`;

const TitleAndQuantity = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
`;

const Text = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: var(--brand-color);
`;

const QuantityInput = styled.div`
  /* TODO: add quantity input component */
  font-size: 16px;
  font-weight: 400;
  color: var(--brand-color);
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = () => {
  return (
    <ItemWrapper>
      <Image
        src="/images/cart/item-1.png"
        alt="item"
        width={70}
        height={70}
        style={{ border: "1px solid red" }}
      />
      <TitleAndQuantity>
        <a>Blanche Swaddle</a>
        <QuantityInput>1</QuantityInput>
      </TitleAndQuantity>
      <p style={{ marginTop: "auto", color: "var(--brand-color)" }}>$10.00</p>
      <IconButton
        Icon={IconTrash}
        color="var(--brand-color)"
        style={{ position: "absolute", right: -14, top: -14 }}
      />
    </ItemWrapper>
  );
};

const ItemsList = () => {
  // TODO: get the items from the cart context and handle if there are no items
  return (
    <ListWrapper>
      <Item />
      <Separator m="20" />
      <Item />
      <Separator m="20" />
      <Item />
    </ListWrapper>
  );
};

export default ItemsList;
