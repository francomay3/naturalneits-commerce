import { ActionIcon, Box } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import PagesList from "./PagesList";

const Navbar = ({ toggleNavbar }: { toggleNavbar: () => void }) => {
  return (
    <Box bg="var(--background-color)" w="100%" h="100%" pos="relative" p="35px">
      <Box pos="absolute" right={0} top={0}>
        <ActionIcon variant="subtle" onClick={toggleNavbar}>
          <IconX size={20} />
        </ActionIcon>
      </Box>

      <PagesList closeSidebars={toggleNavbar} />
    </Box>
  );
};

export default Navbar;
