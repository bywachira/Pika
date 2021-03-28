import React from "react";
import { css } from "goober";
import { useAuth } from "../auth";
import Nav from "../components/nav";
import { AppContent, PageLayout } from "../components/nav/styled-components";
import { getCurrentPageLayout as getLayout } from "../layouts";

const SideMenuContainer = css`
  height: 100%;
  border-right: 1px solid #fff;
`;

function Dashboard(): React.ReactElement {
  const { account } = useAuth();

  return (
    <>
      <Nav />
      <PageLayout>
        <AppContent className="text-black">
          <section className={SideMenuContainer}>
            <ul>
              <li></li>
            </ul>
          </section>
          <section className="text-black">
            jlakdjfalkdfdafadfadfadsfasdf adfadf sf <br />
            <br />
            <br />
          </section>
        </AppContent>
        <div>dafadfa</div>
      </PageLayout>
    </>
  );
}

Dashboard.getLayout = getLayout;

export default Dashboard;
