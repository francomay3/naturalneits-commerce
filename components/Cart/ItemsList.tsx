import { Flex } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import Image from "next/image";
import styled from "styled-components";
import IconButton from "../ui/IconButton";
import Separator from "./Separator";

const QuantityInput = styled.div`
  /* TODO: add quantity input component */
  font-size: 16px;
  font-weight: 400;
  color: var(--brand-color);
`;

const Item = () => {
  return (
    <Flex gap="15px" pos="relative">
      <Image
        src="/images/cart/item-1.png"
        alt="item"
        width={70}
        height={70}
        style={{ border: "1px solid red" }}
      />
      <Flex direction="column" flex="1" gap="10px">
        <a>Blanche Swaddle</a>
        <QuantityInput>1</QuantityInput>
      </Flex>
      <p style={{ marginTop: "auto", color: "var(--brand-color)" }}>$10.00</p>
      <IconButton
        Icon={IconTrash}
        style={{ position: "absolute", right: -14, top: -14 }}
      />
    </Flex>
  );
};

const ItemsList = () => {
  // TODO: get the items from the cart context and handle if there are no items
  return (
    <Flex direction="column">
      <Item />
      <Separator m="20" />
      <Item />
      <Separator m="20" />
      <Item />
    </Flex>
  );
};

export default ItemsList;
