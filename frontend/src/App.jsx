import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/admin/ProtectedRoute";

import Home from "./pages/Home";
import Episodes from "./pages/Episodes";
import EpisodeDetails from "./pages/EpisodeDetails";
import Guests from "./pages/Guests";
import GuestDetails from "./pages/GuestDetails";
import Hosts from "./pages/Hosts";
import Categories from "./pages/Categories";
import AskQuestion from "./pages/AskQuestion";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEpisodes from "./pages/admin/ManageEpisodes";
import ManageGuests from "./pages/admin/ManageGuests";
import ManageHosts from "./pages/admin/ManageHosts";
import ManageCategories from "./pages/admin/ManageCategories";
import ManageQuestions from "./pages/admin/ManageQuestions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/episodes"
            element={<Episodes />}
          />

          <Route
            path="/episodes/:episodeId"
            element={<EpisodeDetails />}
          />

          <Route
            path="/guests"
            element={<Guests />}
          />

          <Route
            path="/guests/:guestId"
            element={<GuestDetails />}
          />

          <Route
            path="/hosts"
            element={<Hosts />}
          />

          <Route
            path="/categories"
            element={<Categories />}
          />

          <Route
            path="/ask-question"
            element={<AskQuestion />}
          />
        </Route>

        {/* Admin Login */}
        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/episodes"
          element={
            <ProtectedRoute>
              <ManageEpisodes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/guests"
          element={
            <ProtectedRoute>
              <ManageGuests />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/hosts"
          element={
            <ProtectedRoute>
              <ManageHosts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <ManageCategories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/questions"
          element={
            <ProtectedRoute>
              <ManageQuestions />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;