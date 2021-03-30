import React from "react";
import Accordion from "../../components/accordion";
import { IObject } from "./editor";
import { MetaSplit } from "./styled-components";

export interface IElementEditorProps {
  layers: IObject[];
}

export default function ElementEditor(
  props: IElementEditorProps
): React.ReactElement {
  return (
    <MetaSplit>
      <Accordion title="Customize">
        <section className="overflow-clip overflow-hidden w-full"></section>
      </Accordion>
      <Accordion title="Layers">
        <section className="overflow-clip overflow-hidden w-full">
          {props.layers?.map((object, idx) => {
            return (
              <section className="" key={idx}>
                {object?.name}
              </section>
            );
          })}
        </section>
      </Accordion>
    </MetaSplit>
  );
}
