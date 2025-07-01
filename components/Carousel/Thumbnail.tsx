import styled from "styled-components";

const ThumbnailButton = styled.div<{ selected: boolean }>`
  flex: 0 0 60px;
  height: 60px;
  border: 2px solid
    ${({ selected }) => (selected ? "var(--brand-color)" : "transparent")};
  border-radius: var(--border-radius);
  overflow: hidden;
  cursor: pointer;
  background: none;
  padding: 0;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${({ selected }) =>
      selected ? "var(--color-primary)" : "transparent"};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Thumbnail: React.FC<{
  onClick: () => void;
  selected: boolean;
  children: React.ReactNode;
}> = ({ onClick, selected, children }) => {
  return (
    <ThumbnailButton selected={selected} onClick={onClick}>
      {children}
    </ThumbnailButton>
  );
};

export default Thumbnail;
