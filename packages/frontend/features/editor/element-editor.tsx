import React from "react";
import { css } from "goober";
import Accordion from "../../components/accordion";
import { MetaSplit } from "./styled-components";
import ObjectStateEditor from "./object-state";
import { scaleUpdate } from "../../helpers/number";
export interface IElementEditorProps {
  layers: any[];
  canvas: any;
  objectState: any;
  setCurrentObject: (object: any) => void;
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

// const ActiveItem = css`
//   width: 100%;
//   padding: 4px 8px;
//   border: 1px solid #fff;
//   color: #ff0000;
//   cursor: pointer;
//   transition: 0.2s all;

//   &:hover {
//     border: 1px solid #ff0000;
//   }
// `;

export default React.memo(function ElementEditor(
  props: IElementEditorProps
): React.ReactElement {
  function selectObject(canvasObjectId: string) {
    props.canvas.getObjects().forEach((object: any) => {
      if (object.id === canvasObjectId) {
        props.canvas.setActiveObject(object);
        props.canvas.requestRenderAll();
      }
    });
  }

  function propertyUpdate(name: string, value: any) {
    const activeObject = props.canvas.getActiveObject();

    if (activeObject) {
      if (name === "width" || name === "height") {
        const data = scaleUpdate(
          name,
          name === "width" ? props.objectState.width : props.objectState.height,
          value
        );
        activeObject.set({
          [data?.name]: data?.value,
          dirty: true,
        });
        props.setCurrentObject((prev: any) => ({ ...activeObject }));
      } else {
        activeObject.set({
          [name]: value,
          dirty: true,
        });
        props.setCurrentObject((prev: any) => ({ ...activeObject }));
      }

      if (name === "top" || name === "left") {
        activeObject.setCoords();
      }

      props.canvas.requestRenderAll();
    }
  }

  return (
    <MetaSplit>
      <Accordion title="Customize">
        <section className="overflow-clip overflow-hidden w-full">
          {props.objectState?.objectType === "circle" && (
            <ObjectStateEditor
              object={props.objectState}
              propertyUpdate={propertyUpdate}
            />
          )}
          {props.objectState?.objectType === "rectangle" && (
            <ObjectStateEditor
              object={props.objectState}
              propertyUpdate={propertyUpdate}
            />
          )}
          {props.objectState?.objectType === "triangle" && (
            <ObjectStateEditor
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
