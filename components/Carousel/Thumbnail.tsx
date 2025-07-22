import { Box } from "@mantine/core";

const Thumbnail: React.FC<{
  onClick: () => void;
  selected: boolean;
  children: React.ReactNode;
}> = ({ onClick, selected, children }) => {
  return (
    <Box
      onClick={onClick}
      flex="0 0 60px"
      h="60px"
      bd={`2px solid ${selected ? "var(--brand-color)" : "transparent"}`}
      bdrs=""
      bg="none"
      style={{
        transition: "border-color 0.2s ease",
        overflow: "hidden",
        cursor: "pointer",
        borderRadius: "var(--border-radius)",
      }}
    >
      {children}
    </Box>
  );
};

export default Thumbnail;
