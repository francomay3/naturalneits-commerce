import { Box } from "@mantine/core";

const PageItem = ({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Box
      fz="18"
      py="20"
      fw="600"
      tt="uppercase"
      lh="1"
      c={active ? "var(--secondary-color)" : "var(--brand-color)"}
      style={{
        borderBottom: "1px solid var(--brand-color)",
        textTransform: "uppercase",
        listStyle: "none",
        cursor: "pointer",
        // TODO: add hover effect. these lines do not work.
        // "&:hover": {
        //   color: "var(--secondary-color)",
        // },
      }}
    >
      {children}
    </Box>
  );
};

export default PageItem;
