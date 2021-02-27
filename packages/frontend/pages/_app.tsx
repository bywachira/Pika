import React from "react";
import { setup } from "goober";
import { prefix } from "goober-autoprefixer";
import "tailwindcss/tailwind.css";
import AppLayout from "../layouts";
import "../public/global.css";

setup(React.createElement, prefix);

function MyApp({ Component, pageProps }: any): React.ReactElement {
  return (
    <AppLayout>
      <div>
        <Component {...pageProps} />
      </div>
    </AppLayout>
  );
}

export default MyApp;
