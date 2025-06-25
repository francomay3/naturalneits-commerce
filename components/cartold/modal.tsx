"use client";

import { createCartAndSetCookie, redirectToCheckout } from "@/actions/actions";
import { useCart } from "@/providers/cart-context";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import LoadingDots from "components/loading-dots";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal() {
  const { cart, updateCartItem } = useCart();
  const quantityRef = useRef(cart?.totalQuantity);

  useEffect(() => {
    if (!cart) {
      createCartAndSetCookie();
    }
  }, [cart]);

  useEffect(() => {
    if (
      cart?.totalQuantity &&
      cart?.totalQuantity !== quantityRef.current &&
      cart?.totalQuantity > 0
    ) {
      quantityRef.current = cart?.totalQuantity;
    }
  }, [cart?.totalQuantity, quantityRef]);

  if (!cart || cart.lines.length === 0) {
    return (
      <div>
        <ShoppingCartIcon />
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div>
      <ul>
        {cart.lines
          .sort((a, b) =>
            a.merchandise.product.title.localeCompare(
              b.merchandise.product.title
            )
          )
          .map((item, i) => {
            const merchandiseSearchParams = {} as MerchandiseSearchParams;

            item.merchandise.selectedOptions.forEach(({ name, value }) => {
              if (value !== DEFAULT_OPTION) {
                merchandiseSearchParams[name.toLowerCase()] = value;
              }
            });

            const merchandiseUrl = createUrl(
              `/product/${item.merchandise.product.handle}`,
              new URLSearchParams(merchandiseSearchParams)
            );

            return (
              <li key={i}>
                <div>
                  <div>
                    <DeleteItemButton
                      item={item}
                      optimisticUpdate={updateCartItem}
                    />
                  </div>
                  <div>
                    <div>
                      <Image
                        width={64}
                        height={64}
                        alt={
                          item.merchandise.product.featuredImage.altText ||
                          item.merchandise.product.title
                        }
                        src={item.merchandise.product.featuredImage.url}
                      />
                    </div>
                    <Link href={merchandiseUrl} prefetch={true}>
                      <div>
                        <span>{item.merchandise.product.title}</span>
                        {item.merchandise.title !== DEFAULT_OPTION ? (
                          <p>{item.merchandise.title}</p>
                        ) : null}
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Price
                      amount={item.cost.totalAmount.amount}
                      currencyCode={item.cost.totalAmount.currencyCode}
                    />
                    <div>
                      <EditItemQuantityButton
                        item={item}
                        type="minus"
                        optimisticUpdate={updateCartItem}
                      />
                      <p>
                        <span>{item.quantity}</span>
                      </p>
                      <EditItemQuantityButton
                        item={item}
                        type="plus"
                        optimisticUpdate={updateCartItem}
                      />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
      <div>
        <div>
          <p>Taxes</p>
          <Price
            amount={cart.cost.totalTaxAmount.amount}
            currencyCode={cart.cost.totalTaxAmount.currencyCode}
          />
        </div>
        <div>
          <p>Shipping</p>
          <p>Calculated at checkout</p>
        </div>
        <div>
          <p>Total</p>
          <Price
            amount={cart.cost.totalAmount.amount}
            currencyCode={cart.cost.totalAmount.currencyCode}
          />
        </div>
      </div>
      <form action={redirectToCheckout}>
        <CheckoutButton />
      </form>
    </div>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? <LoadingDots /> : "Proceed to Checkout"}
    </button>
  );
}
