import React from "react";
import { FullInput, SplitInput } from "./styled-components";
import Input from "../../components/input/input";
import { singleDecimal } from "../../helpers/number";

export default function ObjectStateEditor({
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
    scaleX: number;
    scaleY: number;
  };
  propertyUpdate: (
    name: string,
    value: string | number | { id: string; value: string | number }
  ) => void;
}): React.ReactElement {
  function onChange(name: string, value: any, type: string) {
    if (type === "number") {
      propertyUpdate(name, parseFloat(value));
    } else {
      propertyUpdate(name, value);
    }
  }

  return (
    <section>
      <SplitInput>
        <Input
          name="width"
          value={singleDecimal(
            object.scaleX ? object.width * object.scaleX : object.width
          )}
          onChange={onChange}
          type="number"
        />
        <Input
          name="height"
          value={singleDecimal(
            object.scaleY ? object.height * object.scaleY : object.height
          )}
          onChange={onChange}
          type="number"
        />
      </SplitInput>
      <SplitInput>
        <Input
          name="top"
          value={singleDecimal(object.top)}
          onChange={onChange}
          type="number"
        />
        <Input
          name="left"
          value={singleDecimal(object.left)}
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
          max={360}
          min={-360}
        />
      </SplitInput>
    </section>
  );
}
