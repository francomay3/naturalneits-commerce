const productSimpleFragment = /* GraphQL */ `
  fragment productSimple on Product {
    id
    handle
    availableForSale
    title
    description
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          currentlyNotInStock
          quantityAvailable
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      url
      altText
      width
      height
    }
    tags
    updatedAt
  }
`;

export default productSimpleFragment;
