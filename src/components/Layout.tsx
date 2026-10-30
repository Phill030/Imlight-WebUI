import { Outlet, useNavigate } from "react-router";
import { UseAuth } from "../context/AuthContext";

export function Layout() {
  const { account, logout, hasScope } = UseAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      {/* Header with navbar */}
      <main>
        <Outlet></Outlet>
      </main>
    </div>
  );
}
