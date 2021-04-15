import React, { useState } from "react";
import { AccordionContainer, AccordionTitleSection } from "./styled-components";

type AccordionProps = {
  children: React.ReactNode;
  title: string;
};

export default function Accordion({
  children,
  title,
}: AccordionProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <AccordionTitleSection>
        <section className="flex justify-left place-items-center">
          <p className="font-inter font-extrabold text-gray-400">{title}</p>
        </section>
        <button
          className="outline-none flex justify-center place-items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {!isOpen ? (
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              x="0px"
              y="0px"
              viewBox="0 0 52 52"
              className="fill-current text-gray-400"
            >
              <path
                d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M38.5,28H28v11c0,1.104-0.896,2-2,2
	s-2-0.896-2-2V28H13.5c-1.104,0-2-0.896-2-2s0.896-2,2-2H24V14c0-1.104,0.896-2,2-2s2,0.896,2,2v10h10.5c1.104,0,2,0.896,2,2
	S39.604,28,38.5,28z"
              />
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
          ) : (
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              width="24"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              className="fill-current text-gray-400"
            >
              <g>
                <g>
                  <path
                    d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M384,277.333H128.043
			c-11.776,0-21.333-9.557-21.333-21.333s9.557-21.333,21.333-21.333H384c11.776,0,21.333,9.557,21.333,21.333
			S395.776,277.333,384,277.333z"
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
          )}
        </button>
      </AccordionTitleSection>
      {isOpen && (
        <AccordionContainer className="px-1 py-4">
          {children}
        </AccordionContainer>
      )}
    </>
  );
}
