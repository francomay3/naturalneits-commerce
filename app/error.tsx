"use client";
import Button from "@/components/ui/Button";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export default function Error({ reset }: { reset: () => void }) {
  return (
    <Wrapper>
      <h2>Oh no!</h2>
      <p style={{ textAlign: "center" }}>
        There was an issue with our storefront. This could be a temporary issue,
        please try your action again.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </Wrapper>
  );
}
