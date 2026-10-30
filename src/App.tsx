import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
