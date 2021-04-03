import React from "react";
import { FullInput, SplitInput } from "./styled-components";
import Input from "../../components/input/input";

export default function CircleStateEditor({
  object,
  propertyUpdate,
}: {
  object: {
    top: number;
    left: number;
    fill: string;
    width: number;
    height: number;
    angle: number;
    name: string;
  };
  propertyUpdate: (
    name: string,
    value: string | number | { id: string; value: string | number }
  ) => void;
}): React.ReactElement {
  function onChange(
    name: string,
    value: number | string | { id: string; value: string | number }
  ) {
    propertyUpdate(name, value);
  }

  return (
    <section>
      <SplitInput>
        <Input
          name="width"
          value={object.width}
          onChange={onChange}
          type="number"
        />
        <Input
          name="height"
          value={object.height}
          onChange={onChange}
          type="number"
        />
      </SplitInput>
      <SplitInput>
        <Input
          name="top"
          value={object.top}
          onChange={onChange}
          type="number"
        />
        <Input
          name="left"
          value={object.left}
          onChange={onChange}
          type="number"
        />
      </SplitInput>

      <FullInput>
        <Input
          name="name"
          value={object.name}
          onChange={onChange}
          type="text"
        />
      </FullInput>
      <SplitInput>
        <Input
          name="fill"
          value={object.fill}
          onChange={onChange}
          type="color"
        />
        <Input
          name="angle"
          value={object.angle}
          onChange={onChange}
          type="number"
        />
      </SplitInput>
    </section>
  );
}
