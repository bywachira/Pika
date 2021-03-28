import React from "react";
import Accordion from "../../components/accordion";
import { MetaSplit } from "./styled-components";

export default function ElementEditor(): React.ReactElement {
  return (
    <MetaSplit>
      <Accordion title="Customize">
        <section className="overflow-clip overflow-hidden w-full"></section>
      </Accordion>
      <Accordion title="Layers">
        <section className="overflow-clip overflow-hidden w-full"></section>
      </Accordion>
    </MetaSplit>
  );
}
