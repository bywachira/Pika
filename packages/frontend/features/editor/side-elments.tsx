import React from "react";
import { fabric } from "fabric";

/**
 * TODO: List of objects to be added
 * - Image -done
 * - Text - done
 * - Rectangle - done
 * - Circle - done
 * - Image Rectangle - done
 * - Image Circle - done
 * */

type SideElementProps = {
  canvas: any;
  setCanvas: (args: any) => void;
};

export default function SideElements(
  props: SideElementProps
): React.ReactElement {
  function addCircle() {
    const circle = new fabric.Circle({
      top: 50,
      left: 50,
      radius: 50,
      fill: "pink",
      name: "Circle",
    });

    circle.toObject = (function (toObject: any) {
      return function () {
        // @ts-ignore
        return fabric.util.object.extend(toObject.call(this), {
          //@ts-ignore
          name: this.name,
        });
      };
    })(circle.toObject);

    Object.assign(circle, {
      name: "circle",
    });
    circle.set("radius", 100);

    props.canvas.add(circle);
    props.setCanvas(props.canvas);
  }

  function addRectangle() {
    const rectangle = new fabric.Rect({
      top: 0,
      left: 0,
      width: 50,
      height: 50,
      fill: "red",
      name: "Rectangle",
      backgroundColor: "red",
    });

    rectangle.toObject = (function (toObject: any) {
      return function () {
        // @ts-ignore
        return fabric.util.object.extend(toObject.call(this), {
          //@ts-ignore
          name: this.name,
        });
      };
    })(rectangle.toObject);

    Object.assign(rectangle, {
      name: "rectangle",
    });

    props.canvas?.add(rectangle);
  }

  function addText() {
    const text = new fabric.Textbox("This is text", {
      top: 0,
      left: 0,
      name: "Text",
    });

    text.toObject = (function (toObject: any) {
      return function () {
        // @ts-ignore
        return fabric.util.object.extend(toObject.call(this), {
          //@ts-ignore
          name: this.name,
        });
      };
    })(text.toObject);

    Object.assign(text, {
      name: "text",
    });

    props.canvas?.add(text);
  }

  function addImage() {
    fabric.Image.fromURL(
      "https://wallpaperaccess.com/full/36627.png",
      (img: fabric.Image) => {
        let image = img.set({ top: 0, left: 0 });
        image.scaleToHeight(150);
        image.scaleToWidth(150);
        image.toObject = (function (toObject: any) {
          return function () {
            // @ts-ignore
            return fabric.util.object.extend(toObject.call(this), {
              //@ts-ignore
              name: this.name,
            });
          };
        })(image.toObject);

        Object.assign(image, {
          name: "image",
        });
        props.canvas?.add(image);
      }
    );
  }

  return (
    <section className="grid grid-rows-8 w-full gap-2 h-full">
      <button className="p-2" onClick={addText}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="34"
          height="34"
          className="fill-current text-gray-400"
        >
          <title>Text</title>
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M5 5v14h14V5H5zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9 7v7h-2v-7H7V8h10v2h-4z"></path>
        </svg>
      </button>
      <button className="p-2" onClick={addRectangle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18 18"
          width="32"
          height="32"
          className="fill-current text-gray-400"
        >
          <defs>
            <style></style>
          </defs>
          <title>Rectangle</title>
          <path
            className="a"
            d="M1 2.5v13a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5h-15a.5.5 0 0 0-.5.5zM16 15H2V3h14z"
          ></path>
        </svg>
      </button>
      <button className="p-2" onClick={addCircle}>
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          height="32"
          width="32"
          className="fill-current text-gray-400"
        >
          <title>Circle</title>
          <g>
            <g>
              <path
                d="M256,0C115.03,0,0,115.05,0,256c0,140.97,115.05,256,256,256c140.97,0,256-115.05,256-256C512,115.03,396.95,0,256,0z
			 M256,482C131.383,482,30,380.617,30,256S131.383,30,256,30s226,101.383,226,226S380.617,482,256,482z"
              />
            </g>
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      </button>
      <button className="p-2" onClick={addImage}>
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 298.73 298.73"
          height="32"
          width="32"
          className="fill-current text-gray-400"
        >
          <title>Rounded Image</title>
          <g>
            <path
              d="M264.959,9.35H33.787C15.153,9.35,0,24.498,0,43.154v212.461c0,18.634,15.153,33.766,33.787,33.766
		h231.171c18.634,0,33.771-15.132,33.771-33.766V43.154C298.73,24.498,283.593,9.35,264.959,9.35z M193.174,59.623
		c18.02,0,32.634,14.615,32.634,32.634s-14.615,32.634-32.634,32.634c-18.025,0-32.634-14.615-32.634-32.634
		S175.149,59.623,193.174,59.623z M254.363,258.149H149.362H49.039c-9.013,0-13.027-6.521-8.964-14.566l56.006-110.93
		c4.058-8.044,11.792-8.762,17.269-1.605l56.316,73.596c5.477,7.158,15.05,7.767,21.386,1.354l13.777-13.951
		c6.331-6.413,15.659-5.619,20.826,1.762l35.675,50.959C266.487,252.16,263.376,258.149,254.363,258.149z"
            />
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      </button>
      <button className="p-2">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 478.407 478.407"
          height="32"
          width="32"
          className="fill-current text-gray-400"
        >
          <title>Avatar</title>
          <g>
            <g>
              <path
                d="M239.608,0C107.649-0.223,0.494,106.57,0.271,238.529c-0.11,65.237,26.459,127.682,73.54,172.84
			c0.137,0.136,0.188,0.341,0.324,0.461c1.382,1.331,2.884,2.458,4.284,3.738c3.84,3.413,7.68,6.946,11.725,10.24
			c2.167,1.707,4.42,3.413,6.639,4.983c3.823,2.85,7.646,5.7,11.639,8.329c2.714,1.707,5.513,3.413,8.294,5.12
			c3.686,2.219,7.356,4.454,11.162,6.485c3.226,1.707,6.519,3.174,9.796,4.727c3.584,1.707,7.117,3.413,10.786,4.949
			c3.669,1.536,7.356,2.731,11.076,4.062s6.929,2.56,10.496,3.652c4.028,1.212,8.158,2.15,12.254,3.157
			c3.413,0.836,6.724,1.792,10.24,2.475c4.71,0.939,9.489,1.536,14.268,2.185c2.953,0.41,5.837,0.99,8.823,1.28
			c7.817,0.768,15.701,1.195,23.654,1.195s15.838-0.427,23.654-1.195c2.987-0.29,5.871-0.87,8.823-1.28
			c4.779-0.649,9.557-1.246,14.268-2.185c3.413-0.683,6.827-1.707,10.24-2.475c4.096-1.007,8.226-1.946,12.254-3.157
			c3.567-1.092,7.014-2.423,10.496-3.652c3.482-1.229,7.441-2.56,11.076-4.062s7.202-3.26,10.786-4.949
			c3.277-1.553,6.571-3.021,9.796-4.727c3.806-2.031,7.475-4.267,11.162-6.485c2.782-1.707,5.581-3.26,8.294-5.12
			c3.994-2.628,7.817-5.478,11.639-8.329c2.219-1.707,4.471-3.243,6.639-4.983c4.045-3.243,7.885-6.69,11.725-10.24
			c1.399-1.28,2.901-2.406,4.284-3.738c0.136-0.119,0.188-0.324,0.324-0.461c46.912-44.929,73.428-107.076,73.404-172.032
			C478.36,107.378,371.567,0.223,239.608,0z M406.013,357.729c-10.952-51.083-44.59-94.39-91.375-117.641
			c38.245-41.661,35.475-106.438-6.186-144.683C266.79,57.16,202.014,59.93,163.769,101.591c-35.954,39.166-35.954,99.332,0,138.497
			c-46.785,23.251-80.423,66.557-91.375,117.641c-65.565-91.946-44.179-219.635,47.768-285.2
			c34.744-24.775,76.369-38.06,119.042-37.992c112.929-0.18,204.621,91.221,204.801,204.15
			C444.073,281.36,430.788,322.985,406.013,357.729z"
              />
            </g>
          </g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      </button>
      <button className="p-2">
        <svg
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          height="32"
          width="32"
          x="0px"
          y="0px"
          className="fill-current text-gray-400"
          viewBox="0 0 490 490"
        >
          <title>Triangle</title>
          <path d="M0,472.982h490L245.015,17.018L0,472.982z M51.212,442.368L245.015,81.684l193.773,360.684H51.212z" />
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
          <g></g>
        </svg>
      </button>
    </section>
  );
}
