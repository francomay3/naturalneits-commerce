"use client";

import { useProduct } from "@/contexts/ProductContext";
import { Box, BoxProps, Title } from "@mantine/core";

const ProductDescription = (props: BoxProps) => {
  const { product } = useProduct();

  return (
    <Box {...props}>
      <Title order={1} mb="18">
        {product.title}
      </Title>
      {product.descriptionHtml && (
        <Box dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
      )}
    </Box>
  );
};

export default ProductDescription;
