import IconButton from "@/components/ui/IconButton";
import { IconX } from "@tabler/icons-react";
import styled from "styled-components";
import PagesList from "./PagesList";

const Wrapper = styled.div`
  background-color: var(--background-color);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const CloseSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Navbar = ({ toggleNavbar }: { toggleNavbar: () => void }) => {
  return (
    <Wrapper>
      <CloseSection>
        <IconButton
          onClick={toggleNavbar}
          Icon={IconX}
          color="var(--brand-color)"
        />
      </CloseSection>

      <PagesList />
    </Wrapper>
  );
};

export default Navbar;
