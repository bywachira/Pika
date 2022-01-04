import React from "react";
import { css, styled } from "goober";
import { useRouter } from "next/router";
import Nav from "../../components/nav";
import { AppContent, PageLayout } from "../../components/nav/styled-components";
import { getCurrentPageLayout as getLayout } from "../../layouts";

const SideMenuContainer = css`
  height: 100%;
  border-right: 1px solid #fff;
  background: #fff;
`;

const SideMenuList = css`
  list-style-type: none;
  padding: 0px;
`;

const SideMenuListItem = styled("li")`
  text-align: left;
  padding: 8px 4px;
  border-radius: 8px;
  color: ${
    // @ts-ignore
    (props: { routeId: string; activeRouteId: string }) => {
      return props.routeId !== props.activeRouteId
        ? "rgba(0, 0, 0, 0.7)"
        : "rgba(0, 0, 0, 0.9)";
    }
  };
  font-weight: ${
    // @ts-ignore
    (props: { routeId: string; activeRouteId: string }) => {
      return props.routeId !== props.activeRouteId
        ? "normal"
        : "bold";
    }
  };
  &:hover {
    cursor: pointer;
  }
`;

function Dashboard(): React.ReactElement {
  const sideMenuItems = [
    {
      link: "/dashboard",
      label: "Overview",
    },
    {
      link: "/dashboard/api",
      label: "API Keys & Tokens",
    },
    {
      link: "/dashboard/billing",
      label: "Billing",
    },
  ];

  const currentRoute = useRouter().pathname;

  return (
    <>
      <Nav />
      <PageLayout>
        <AppContent className="text-black">
          <section className={SideMenuContainer}>
            <ul className={SideMenuList}>
              {sideMenuItems.map((item, idx) => {
                return (
                  <SideMenuListItem
                    activeRouteId={currentRoute}
                    routeId={item.link}
                    key={idx}
                  >
                    {item.label}
                  </SideMenuListItem>
                );
              })}
            </ul>
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
