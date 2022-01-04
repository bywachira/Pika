import React from "react";
import Nav from "../../components/nav";
import { PageLayout } from "../../components/nav/styled-components";
import { getCurrentPageLayout } from "../../layouts";

function ImagesPage(): React.ReactElement {
  return (
    <>
      <Nav />
      <PageLayout>
        <section>How are you</section>
      </PageLayout>
    </>
  );
}

ImagesPage.getLayout = getCurrentPageLayout;

export default ImagesPage;
