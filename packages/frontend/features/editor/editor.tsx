import React, { useEffect, useRef, useState } from "react";
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
import { useMemo } from "react";
import { useCallback } from "react";

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
  id: string;
}

export default function Editor(): React.ReactElement {
  const [canvas, setCanvas] = useState<any>();
  const [canvasHistory, setCanvasHistory] = useState<any>([]);
  const [canvasState, setCanvasState] = useState<any>([]);
  console.log({ canvasHistory, canvasState });
  const canvasRef: any = useRef();
  // const { editor, onReady, selectedObjects } = useFabricJSEditor();
  const [snapshot] = useState<ISnapshot>({
    canvas_height: 480,
    canvas_width: 480,
    canvas_bg: "#fff",
  });
  const [layers, setLayers] = useState<IObject[]>([]);
  const [currentObject, setCurrentObject] = useState<any>({});
  // const [zoomData, setZoomData] = useState({
  //   type: true,
  //   limitToBounds: true,
  //   panningEnabled: true,
  //   transformEnabled: true,
  //   pinchEnabled: true,
  //   limitToWrapper: false,
  //   disabled: false,
  //   dbClickEnabled: true,
  //   lockAxisX: false,
  //   lockAxisY: false,
  //   velocityEqualToMove: true,
  //   enableWheel: true,
  //   enableTouchPadPinch: true,
  //   enableVelocity: true,
  //   limitsOnWheel: false,
  // });

  const onObjectModified = useCallback(
    (e: any) => {
      const newCanvasState = e.target.canvas.toJSON();
      setCanvasState(newCanvasState);
      setCanvasHistory((history: any) =>
        [...history, newCanvasState].slice(-4)
      );
      setCurrentObject(() => ({ ...e.target }));
      setLayers(() => [...e.target.canvas.getObjects()]);
    },
    [setCanvasState, setCanvasHistory]
  );

  useEffect(() => {
    // setCanvas(initCanvas());
    const canvas: any = new fabric.Canvas(canvasRef.current, {
      height: snapshot.canvas_height,
      width: snapshot.canvas_width,
      fill: snapshot.canvas_bg,
    });

    canvas.loadFromJSON([], () => {});

    canvas.on("object:modified", onObjectModified);
    canvas.on("objects:scaling", (e: any) => handleScaling(e));
    canvas.on("object:added", (e: any) =>
      setCurrentObject(() => ({ ...e.target }))
    );
    canvas.on("object:removed", () =>
      setCurrentObject(() => ({ ...{} }))
    );
    canvas.on("selection:created", () =>
      setCurrentObject(() => ({ ...canvas.getActiveObject() }))
    );
    canvas.on("selection:updated", () =>
      setCurrentObject(() => ({ ...canvas.getActiveObject() }))
    );
    setCanvas(canvas);

    return () => canvas.dispose();
  }, [canvasRef, onObjectModified, setCanvas]);

  function handleScaling(options: any) {
    let obj = options.target;
    let boundingRect = obj.getBoundingRect(true);
    if (
      boundingRect.left < 0 ||
      boundingRect.top < 0 ||
      boundingRect.left + boundingRect.width > canvas.getWidth() ||
      boundingRect.top + boundingRect.height > canvas.getHeight()
    ) {
      obj.top = obj._stateProperties.top;
      obj.left = obj._stateProperties.left;
      obj.angle = obj._stateProperties.angle;
      obj.scaleX = obj._stateProperties.scaleX;
      obj.scaleY = obj._stateProperties.scaleY;
      obj.setCoords();
      obj.saveState();
    }
  }

  useEffect(() => {
    if (canvas) {
      initAligningGuidelines(canvas);
      initCenteringGuidelines(canvas);
    }
  }, [canvas]);

  function onKeyUp(keyname: string, e: any, handle: any) {
    console.log({ keyname, e, handle });
  }

  function onKeyDown(keyname: string, e: any, handle: any) {
    console.log({ keyname, e, handle });
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

  // function ungroupObjects() {
  //   if (!canvas?.getActiveObject()) {
  //     return;
  //   }
  //   if (canvas?.getActiveObject().type !== "group") {
  //     return;
  //   }
  //   canvas?.getActiveObject().toActiveSelection();
  //   canvas?.requestRenderAll();
  // }

  // const CURRENT_STATE = 1;

  const layerComponent = useMemo(
    () => (
      <ElementEditor
        objectState={currentObject}
        canvas={canvas}
        layers={layers}
        setCurrentObject={setCurrentObject}
      />
    ),
    [currentObject]
  );

  // const objectSelection = useMemo(() => {
  //   return ;
  // }, [CURRENT_STATE]);

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
            defaultScale={0.5}
            defaultPositionX={200}
            defaultPositionY={100}
            options={{
              limitToBounds: zoomData.limitToBounds,
              transformEnabled: zoomData.transformEnabled,
              disabled: zoomData.disabled,
              limitToWrapper: zoomData.limitToWrapper,
            }}
            pan={{
              disabled: !zoomData.panningEnabled,
              lockAxisX: zoomData.lockAxisX,
              lockAxisY: zoomData.lockAxisY,
              velocityEqualToMove: zoomData.velocityEqualToMove,
              velocity: zoomData.enableVelocity,
            }}
            pinch={{ disabled: !zoomData.pinchEnabled }}
            doubleClick={{ disabled: !zoomData.dbClickEnabled }}
            wheel={{
              wheelEnabled: zoomData.enableWheel,
              touchPadEnabled: zoomData.enableTouchPadPinch,
              limitsOnWheel: zoomData.limitsOnWheel,
            }}
          >
            {({
              zoomIn,
              zoomOut,
              resetTransform,
              setDefaultState,
              positionX,
              positionY,
              scale,
              previousScale,
              options,
              ...rest
            }: any) => (
              <React.Fragment>
                <TransformComponent> */}
          <div style={{ background: "#fff" }}>
            <canvas ref={canvasRef} />
          </div>
          {/* </TransformComponent>
              </React.Fragment>
            )} */}
          {/* </TransformWrapper> */}
        </CanvasContainer>
      </Hotkeys>
      <AsideSection>{layerComponent}</AsideSection>
    </EditorContainer>
  );
}
