import { styled } from "goober";

export const PageLayout = styled("section")`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 64px 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
`;

export const AppContent = styled("section")`
  display: grid;
  grid-template-columns: 180px 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 8px;
  grid-row-gap: 0px;
`;

export const LogoSection = styled("section")`
  display: grid;
  grid-template-columns: repeat(2, 32px) 200px;
  grid-template-rows: 32px;
  grid-column-gap: 8px;
  grid-row-gap: 0px;
`;

export const ProfileDetailsSection = styled("div")`
  display: grid;
  grid-template-columns: 30px 170px;
  grid-template-rows: 30px;
  grid-column-gap: 8px;
  grid-row-gap: 0px;
`;
