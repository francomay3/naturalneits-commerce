import { ProductOption } from "@/lib/shopify/types";
import { ButtonGroup, Title } from "@mantine/core";
import Value from "./Value";

type OptionProps = {
  option: ProductOption;
};

const Option = ({ option }: OptionProps) => {
  return (
    <form key={option.id} style={{ marginBottom: 24 }}>
      <dl>
        <Title order={5} mb="8" component="dt">
          {option.name}
        </Title>
        <ButtonGroup component="dd">
          {option.values.map((value) => (
            <Value option={option} value={value} key={value} />
          ))}
        </ButtonGroup>
      </dl>
    </form>
  );
};

export default Option;
