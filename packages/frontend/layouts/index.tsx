import React, { ReactNode } from "react";
import { AppContainer } from "./styled-components";

export default function AppLayout(props: {
  children: ReactNode;
}): React.ReactElement {
  return <AppContainer>{props.children}</AppContainer>;
}
