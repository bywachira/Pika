import * as React from "react";
import { css } from "goober";
import { useAuth } from "../../auth";
import { LogoSection, ProfileDetailsSection } from "./styled-components";

const NavContainer = css`
  padding: 12px 4px;
  align-items: center;
`;

export default function Nav(): React.ReactElement {
  const { account } = useAuth();

  return (
    <nav className={NavContainer}>
      <LogoSection className="flex">
        <img src="/bowl.png" alt="pika: generate images through api" />
        <div className="text-gray-600">
          <svg
            viewBox="0 0 24 24"
            width="32"
            height="32"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="currentColor"
            shape-rendering="geometricPrecision"
          >
            <path d="M16.88 3.549L7.12 20.451"></path>
          </svg>
        </div>
        <ProfileDetailsSection>
          <img src={account?.avatar} alt="avatar" className="rounded-full" />
          <p className="text-white font-regular my-auto">{account?.name}</p>
        </ProfileDetailsSection>
      </LogoSection>
    </nav>
  );
}
