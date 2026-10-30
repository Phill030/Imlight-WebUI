import "./App.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            {/* Public routes */}
            <Route path="/login" element={<div>Login Page (to build)</div>} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute requiredScope="dashboard:read">
                  <div>Dashboard Page (to build)</div>
                </ProtectedRoute>
              }
            />

            {/* Fallbacks */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
