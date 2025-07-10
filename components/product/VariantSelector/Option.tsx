import { ProductOption } from "@/lib/shopify/types";
import { ButtonGroup } from "@mantine/core";
import Value from "./Value";

type OptionProps = {
  option: ProductOption;
};

const Option = ({ option }: OptionProps) => {
  return (
    <form key={option.id} style={{ marginBottom: 24 }}>
      <dl>
        <dt>
          <h5 style={{ marginBottom: 8 }}>{option.name}</h5>
        </dt>
        <dd>
          <ButtonGroup>
            {option.values.map((value) => (
              <Value option={option} value={value} key={value} />
            ))}
          </ButtonGroup>
        </dd>
      </dl>
    </form>
  );
};

export default Option;
