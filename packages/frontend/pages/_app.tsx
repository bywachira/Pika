import React from "react";
import { setup } from "goober";
import { prefix } from "goober-autoprefixer";
import "tailwindcss/tailwind.css";
import AppLayout from "../layouts";
import "../public/global.css";

setup(React.createElement, prefix);

function MyApp({ Component, pageProps }: any): React.ReactElement {
  const getLayout =
    Component.getLayout || ((page: any) => <AppLayout children={page} />);
  // return (
  //   <AppLayout>
  //     <div>
  //       <Toaster position="top-center" />
  //       <Component {...pageProps} />
  //     </div>
  //   </AppLayout>
  // );

  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
