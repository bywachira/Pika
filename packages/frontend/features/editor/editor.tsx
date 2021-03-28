import React from "react";
import ElementEditor from "./element-editor";
import SideElements from "./side-elments";
import {
  CanvasContainer,
  EditorContainer,
  ElementEditor as AsideSection,
} from "./styled-components";

export default function Editor(): React.ReactElement {
  return (
    <EditorContainer>
      <SideElements />
      <CanvasContainer></CanvasContainer>
      <AsideSection>
        <ElementEditor />
      </AsideSection>
    </EditorContainer>
  );
}
