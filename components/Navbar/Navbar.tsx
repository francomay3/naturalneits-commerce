import IconButton from "@/components/ui/IconButton";
import { Box } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import PagesList from "./PagesList";

const Navbar = ({ toggleNavbar }: { toggleNavbar: () => void }) => {
  return (
    <Box bg="var(--background-color)" w="100%" h="100%" pos="relative" p="35px">
      <Box pos="absolute" right={0} top={0}>
        <IconButton onClick={toggleNavbar} Icon={IconX} />
      </Box>

      <PagesList closeSidebars={toggleNavbar} />
    </Box>
  );
};

export default Navbar;
