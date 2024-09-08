import MenuBar from "../components/MenuBar";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import Links from "@/components/Link";

export const Route = createRootRoute({
  component: () => (
    <>
      <MenuBar>
        <>
          <Links to="/" >Home </Links>
          <Links to="/about" >About </Links>
        </>
      </MenuBar>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
