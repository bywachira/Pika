import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../auth";
import { AppContainer } from "./styled-components";

export default function AppLayout(props: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <AppContainer>
      <Toaster position="top-center" />
      {props.children}
    </AppContainer>
  );
}

const getLayout = (page: any) => <AppLayout>{page}</AppLayout>;

export function AuthenticatedLayout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export const getCurrentPageLayout = (page: any) =>
  getLayout(<AuthenticatedLayout>{page}</AuthenticatedLayout>);
