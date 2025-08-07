import { BORDER_COLOR } from "@/lib/constants";
import { Box } from "@mantine/core";

// TODO: use divider component from mantine
const Separator = ({ m }: { m?: string }) => (
  <Box h="1px" bg={BORDER_COLOR} my={m || "20"} w="100%" />
);

export default Separator;
