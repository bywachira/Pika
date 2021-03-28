import { styled } from "goober";

export const AccordionTitleSection = styled("section")`
  display: grid;
  grid-template-columns: 1fr 40px;
  grid-template-rows: 40px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  height: 40px;
`;

export const AccordionContainer = styled("section")`
  max-width: 300px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  height: 260px;
  overflow-y: scroll;

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
