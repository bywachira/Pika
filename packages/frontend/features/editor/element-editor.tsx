import React from "react";
import { css } from "goober";
import Accordion from "../../components/accordion";
import { MetaSplit } from "./styled-components";
import CircleStateEditor from "./circle-state";
import { useEffect } from "react";
export interface IElementEditorProps {
  layers: any[];
  canvas: any;
  objectState: any;
}

const Item = css`
  width: 100%;
  padding: 4px 8px;
  border: 1px solid #fff;
  cursor: pointer;
  transition: 0.2s all;

  &:hover {
    border: 1px solid #ff0000;
  }
`;

const ActiveItem = css`
  width: 100%;
  padding: 4px 8px;
  border: 1px solid #fff;
  color: #ff0000;
  cursor: pointer;
  transition: 0.2s all;

  &:hover {
    border: 1px solid #ff0000;
  }
`;

export default React.memo(function ElementEditor(
  props: IElementEditorProps
): React.ReactElement {
  function selectObject(canvasObjectId: string) {
    props.canvas.getObjects().forEach((object: any) => {
      console.log(object);
      if (object.id === canvasObjectId) {
        props.canvas.setActiveObject(object);
        props.canvas.requestRenderAll();
      }
    });
  }

  function propertyUpdate(
    name: string,
    value: number | string | { id: string; value: string | number }
  ) {}

  console.log(props.objectState);

  useEffect(() => {
    console.log("changed");
  }, [props.canvas, props.canvas?.getActiveObject()]);

  return (
    <MetaSplit>
      <Accordion title="Customize">
        <section className="overflow-clip overflow-hidden w-full">
          {props.objectState?.objectType === "circle" && (
            <CircleStateEditor
              object={props.objectState}
              propertyUpdate={propertyUpdate}
            />
          )}
        </section>
      </Accordion>
      <Accordion title="Layers">
        <section className="overflow-clip overflow-hidden w-full">
          {props.canvas?.getObjects()?.map((object: any, idx: number) => {
            return (
              <section
                key={idx}
                onClick={() => selectObject(object.id)}
                className={Item}
              >
                <p className="">{object?.name}</p>
              </section>
            );
          })}
        </section>
      </Accordion>
    </MetaSplit>
  );
});
