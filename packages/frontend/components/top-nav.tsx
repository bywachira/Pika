import Link from "next/link";
import React from "react";

export default function LandingNav(): React.ReactElement {
  return (
    <nav className="flex justify-between w-full py-4 px-4">
      <Link href={"/"} passHref={true}>
        <a>
          <img className="w-28" src="/logo-light.png" alt="Pika" />
        </a>
      </Link>
      <div>
        <Link href={"/early-access"} passHref={true}>
          <a className="font-inter text-black font-bold">Early Access</a>
        </Link>
      </div>
    </nav>
  );
}
