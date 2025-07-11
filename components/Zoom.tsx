"use client";

import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

const Zoom = ({ children }: { children: React.ReactNode }) => {
  return (
    <TransformWrapper
      initialScale={1}
      minScale={1}
      maxScale={3}
      centerOnInit={true}
    >
      <TransformComponent
        wrapperStyle={{
          width: "100%",
          height: "100%",
        }}
        contentStyle={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </TransformComponent>
    </TransformWrapper>
  );
};

export default Zoom;
