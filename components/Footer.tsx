import { BORDER_COLOR } from "@/lib/constants";
import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconExternalLink,
} from "@tabler/icons-react";
import Link from "next/link";
import styled from "styled-components";
import Logo from "./Logo";
import Separator from "./Separator";
import IconButton from "./ui/IconButton";

const FooterWrapper = styled.footer`
  background-color: var(--background-color);
  border-top: 1px solid ${BORDER_COLOR};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 10px;
`;

const DeveloperLinks = styled.div`
  display: flex;
  align-items: center;
`;

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <FooterWrapper>
      <Logo size={100} />
      <Separator m="8" />
      <div>© {currentYear}, Bruna A.B.</div>
      <DeveloperLinks>
        Web development by Franco May
        <Link href="https://www.linkedin.com/in/francomay/" target="_blank">
          <IconButton Icon={IconBrandLinkedinFilled} size={32} />
        </Link>
        <Link href="https://github.com/francomay3/" target="_blank">
          <IconButton Icon={IconBrandGithubFilled} size={32} />
        </Link>
      </DeveloperLinks>
      <div>
        <Link
          href="https://github.com/francomay3/naturalneits-commerce"
          target="_blank"
          style={{ display: "flex", alignItems: "center", gap: "4px" }}
        >
          Check out this project&apos;s code <IconExternalLink />
        </Link>
      </div>
    </FooterWrapper>
  );
}
