import React, { useEffect, useRef, useState } from "react";
// import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
// import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import Hotkeys from "react-hot-keys";
import { fabric } from "fabric";
import ElementEditor from "./element-editor";
import SideElements from "./side-elments";
import {
  CanvasContainer,
  EditorContainer,
  ElementEditor as AsideSection,
} from "./styled-components";
import {
  initAligningGuidelines,
  initCenteringGuidelines,
} from "../../helpers/canvas";
import useFonts from "../../hooks/useFonts";

interface ISnapshot {
  canvas_height: number;
  canvas_width: number;
  canvas_bg: string;
}

export interface IObject {
  angle: number;
  backgroundColor: string;
  clipTo: null;
  fill: string;
  fillRule: string;
  flipX: boolean;
  flipY: boolean;
  globalCompositeOperation: string;
  height: number;
  left: number;
  opacity: number;
  originX: string;
  originY: string;
  rx: number;
  ry: number;
  scaleX: number;
  scaleY: number;
  shadow: null;
  stroke: null;
  strokeDashArray: null;
  strokeLineCap: string;
  strokeLineJoin: string;
  strokeMiterLimit: number;
  strokeWidth: number;
  top: number;
  transformMatrix: null;
  type: string;
  visible: boolean;
  width: number;
  src?: string;
  name?: string;
}

export default function Editor(): React.ReactElement {
  const [canvas, setCanvas] = useState<any>(undefined);
  // const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const [snapshot, setSnapshot] = useState<ISnapshot>({
    canvas_height: 360,
    canvas_width: 720,
    canvas_bg: "#fff",
  });
  const [layers, setLayers] = useState<IObject[]>([]);
  const { fonts } = useFonts();

  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  useEffect(() => {
    if (canvas) {
      initAligningGuidelines(canvas);
      initCenteringGuidelines(canvas);
    }
  }, [canvas]);

  function initCanvas() {
    return new fabric.Canvas("image-editor", {
      height: snapshot.canvas_height,
      width: snapshot.canvas_width,
      backgroundColor: snapshot.canvas_bg,
    });
  }

  useEffect(() => {
    if (canvas) {
      setLayers(canvas?.toJSON().objects);
    }
  }, [canvas]);

  console.log(canvas?.getObjects());

  canvas?.on("object:added", () => {
    setLayers(canvas?.toJSON().objects);
  });

  canvas?.on("object:removed", () => {
    setLayers(canvas?.toJSON().objects);
  });

  canvas?.on("selection:cleared", () => {
    ungroupObjects();
  });

  function onKeyUp(keyname: string, e: any, handle: any) {}

  function onKeyDown(keyname: string, e: any, handle: any) {
    console.log({ keyname });
    if (keyname === "backspace" || keyname === "delete") {
      e.preventDefault();
      removeObject();
    }

    if (keyname === "ctrl+a") {
      e.preventDefault();
      selectAll();
    }
  }

  function removeObject() {
    let activeObject: any = canvas?.getActiveObject();
    if (activeObject) {
      canvas?.remove(activeObject);
    }
  }

  function selectAll() {
    let select = new fabric.ActiveSelection(canvas?.getObjects(), {
      canvas,
    });
    canvas?.setActiveObject(select);
    canvas?.requestRenderAll();
    groupObjects();
  }

  function groupObjects() {
    if (!canvas?.getActiveObject()) {
      return;
    }
    if (canvas?.getActiveObject().type !== "activeSelection") {
      return;
    }
    canvas?.getActiveObject().toGroup();
    canvas?.requestRenderAll();
  }

  function ungroupObjects() {
    if (!canvas?.getActiveObject()) {
      return;
    }
    if (canvas?.getActiveObject().type !== "group") {
      return;
    }
    canvas?.getActiveObject().toActiveSelection();
    canvas?.requestRenderAll();
  }

  return (
    <EditorContainer>
      <SideElements canvas={canvas} setCanvas={setCanvas} />
      <Hotkeys
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        keyName="backspace,ctrl+a,delete"
      >
        <CanvasContainer>
          {/* <FabricJSCanvas className="sample-canvas" onReady={onReady} /> */}
          {/* <TransformWrapper
          defaultScale={1}
          defaultPositionX={200}
          defaultPositionY={100}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }: any) => (
            <>
              <TransformComponent> */}
          <canvas id="image-editor" />
          {/* </TransformComponent>
            </>
          )}
        </TransformWrapper> */}
        </CanvasContainer>
      </Hotkeys>
      <AsideSection>
        <ElementEditor layers={layers} />
      </AsideSection>
    </EditorContainer>
  );
}
