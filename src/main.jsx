import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.jsx";

import FrontPage from "./pages/Frontpage/FrontPage.jsx";
import FeaturesPage from "./pages/FeaturesPage/FeaturesPage.jsx";
import HowItWorksPage from "./pages/HowItWorksPage/HowItWorksPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import UsersPage from "./pages/UsersPage/UsersPage.jsx";
import UserDetailsPage from "./pages/UserDetailsPage/UserDetailsPage.jsx";
import UserEditPage from "./pages/UserEditPage/UserEditPage.jsx";

import CompaniesPage from "./pages/CompaniesPage/CompaniesPage.jsx";
import CompanyDetailsPage from "./pages/CompanyDetailsPage/CompanyDetailsPage.jsx";
import CompanyEditPage from "./pages/CompanyEditPage/CompanyEditPage.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<FrontPage />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route
            path="users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="users/:id"
            element={
              <ProtectedRoute>
                <UserDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="users/:id/edit"
            element={
              <ProtectedRoute>
                <UserEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="companies"
            element={
              <ProtectedRoute>
                <CompaniesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="companies/:id"
            element={
              <ProtectedRoute>
                <CompanyDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="companies/:id/edit"
            element={
              <ProtectedRoute>
                <CompanyEditPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
