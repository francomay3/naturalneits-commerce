import { ProductOption, ProductVariant } from "@/lib/shopify/types";
import { ButtonGroup } from "@mantine/core";
import Option from "./Option";

type OptionsProps = {
  option: ProductOption;
  options: ProductOption[];
  variants: ProductVariant[];
};

const Options = ({ option, options, variants }: OptionsProps) => {
  return (
    <form key={option.id} style={{ marginBottom: 24 }}>
      <dl>
        <dt>
          <h5 style={{ marginBottom: 8 }}>{option.name}</h5>
        </dt>
        <dd>
          <ButtonGroup>
            {option.values.map((value) => (
              <Option
                options={options}
                option={option}
                variants={variants}
                value={value}
                key={value}
              />
            ))}
          </ButtonGroup>
        </dd>
      </dl>
    </form>
  );
};

export default Options;
