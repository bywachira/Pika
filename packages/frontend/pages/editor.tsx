import React from "react";
import dynamic from "next/dynamic";
import { css } from "goober";
import { useAuth } from "../auth";
import Nav from "../components/nav";
import { PageLayout } from "../components/nav/styled-components";
import { getCurrentPageLayout as getLayout } from "../layouts";

const EditorComponent = dynamic(() => import("../features/editor"));

function EditorPage(): React.ReactElement {
  return (
    <>
      <Nav />
      <PageLayout>
        <main className="text-black">
          <EditorComponent />
        </main>
      </PageLayout>
    </>
  );
}

EditorPage.getLayout = getLayout;

export default EditorPage;
