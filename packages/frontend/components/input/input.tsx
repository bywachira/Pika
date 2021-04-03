import React from "react";

type InputProps = {
  onChange: (
    name: string,
    value: number | string | { id: string; value: string | number }
  ) => void;
  name: string;
  value: string | number;
  type: string;
  inputRef?: React.LegacyRef<HTMLInputElement>;
};

export default function InputComponent(props: InputProps): React.ReactElement {
  return (
    <section className="w-full flex place-items-center">
      <section className="bg-gray-200 px-2 py-2  text-xs rounded text-black font-bold">
        {props.name}
      </section>
      <input
        type={props.type}
        className="w-full bg-gray-100 px-2 py-1 outline-none"
        value={props.value}
        onChange={(e: any) => {
          const value = e.target.value;

          props.onChange(props.name, value);
        }}
        ref={props.inputRef}
      />
    </section>
  );
}
