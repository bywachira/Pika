import React from "react";
import { css } from "goober";
import Nav from "../../components/nav";
import { AppContent, PageLayout } from "../../components/nav/styled-components";
import { getCurrentPageLayout as getLayout } from "../../layouts";

const SideMenuContainer = css`
  height: 100%;
  border-right: 1px solid #fff;
  background: #000;
`;

const SideMenuList = css`
  padding: 8px 4px;
  list-style-type: none;
`;

const SideMenuListItem = css`
  text-align: center;
`;

function Dashboard(): React.ReactElement {
  const sideMenuItems = [
    {
      link: "/dashboard",
      label: "Overview",
    },
    {
      link: "/dashboard/api",
      label: "API Keys & Tokens"
    },
    {
      link: "/dashboard/billing",
      label: "Billing"
    }
  ];
  return (
    <>
      <Nav />
      <PageLayout>
        <AppContent className="text-black">
          <section className={SideMenuContainer}>
            <ul className={SideMenuList}></ul>
          </section>
          <section className="text-black">
            jlakdjfalkdfdafadfadfadsfasdf adfadf sf <br />
            <br />
            <br />
          </section>
        </AppContent>
      </PageLayout>
    </>
  );
}

Dashboard.getLayout = getLayout;

export default Dashboard;
