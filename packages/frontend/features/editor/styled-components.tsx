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

  &::-webkit-scrollbar {
    width: 4px;
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
