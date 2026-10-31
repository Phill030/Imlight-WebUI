import { Outlet } from "react-router";
import Header from "./Header/Header";

export function Layout() {
  return (
    <div>
      <Header />

      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}
