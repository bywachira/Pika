import { styled } from "goober";

export const EditorContainer = styled("section")`
  display: grid;
  grid-template-columns: 48px 1fr 300px;
  grid-template-rows: 600px;
  grid-column-gap: 8px;
  grid-row-gap: 0px;
`;

export const CanvasContainer = styled("main")`
  background: #e0e0e0;
  height: 100%;
  width: 100%;
  flex: 1 1 auto;
  overflow-y: scroll;
  overflow-x: scroll;
  display: flex;
  justify-content: center;
  place-items: center;

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #b30000;
  }
`;

export const ElementEditor = styled("aside")``;

export const MetaSplit = styled("section")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, auto);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

export const SplitInput = styled("section")`
  display: grid;
  grid-template-columns: repeat(2, 140px);
  grid-template-rows: 40px;
  grid-column-gap: 8px;
  grid-row-gap: 4px;
  margin: 0px 0px 16px 0px;
`;

export const FullInput = styled("section")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px;
  grid-column-gap: 0px;
  margin: 0px 0px 16px 0px;
  grid-row-gap: 0px;
`;
