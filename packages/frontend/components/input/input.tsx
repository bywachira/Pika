import React from "react";

type InputProps = {
  onChange: (name: string, value: number | string, type: string) => void;
  name: string;
  value: string | number;
  type: string;
  inputRef?: React.LegacyRef<HTMLInputElement>;
  max?: number;
  min?: number;
};

export default function InputComponent(props: InputProps): React.ReactElement {
  return (
    <section className="w-full flex place-items-center">
      <section className="bg-gray-200 px-2 py-2  text-xs rounded text-black font-bold">
        {props.name}
      </section>
      <input
        type={props.type}
        className={`w-full bg-gray-100 ${
          props.type !== "color" && "px-2 py-1 text-xs"
        } outline-none`}
        value={props.value}
        onChange={(e: any) => {
          const value = e.target.value;

          if (props.type === "number") {
          }

          props.onChange(
            props.name,
            props.type === "number" ? parseFloat(value) : value,
            props.type
          );
        }}
        ref={props.inputRef}
      />
    </section>
  );
}
