import Image from "next/image";
import Label from "../label";

export function GridTileImage({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isInteractive = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: "bottom" | "center";
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div>
      {props.src ? <Image width={80} height={80} {...props} /> : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
        />
      ) : null}
    </div>
  );
}
