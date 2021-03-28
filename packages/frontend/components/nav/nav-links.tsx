import React from "react";
import { css } from "goober";
import { useRouter } from "next/router";
import Link from "next/link";

const NavItems = css`
  display: flex;
`;

const ActiveNav = css`
  border-bottom: 2px solid #000;
  font-weight: bold;
  padding: 16px 12px;
  color: #000;
`;

const InactiveNav = css`
  padding: 16px 12px;
  color: #888888;
`;

const LINKS: { label: string; route: string }[] = [
  {
    label: "Dashboard",
    route: "/dashboard",
  },
  {
    label: "Editor",
    route: "/editor",
  },
];

export default function NavLinks() {
  const router = useRouter();

  return (
    <header className={NavItems}>
      {LINKS.map((link, idx) => {
        return (
          <div
            key={idx}
            className={link.route === router.pathname ? ActiveNav : InactiveNav}
          >
            <Link href={link.route} passHref={true}>
              <a>{link.label}</a>
            </Link>
          </div>
        );
      })}
    </header>
  );
}
