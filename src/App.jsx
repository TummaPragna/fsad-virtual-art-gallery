import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import Tour from "./pages/Tour";
import Artist from "./pages/Artist";
import Admin from "./pages/Admin";
import Curator from "./pages/Curator";
import Details from "./pages/Details";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminNotifications from "./components/AdminNotifications";
function App() {
  const location = useLocation();

  // Hide navbar ONLY on landing page
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<Auth />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRole="Visitor">
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/artist"
          element={
            <ProtectedRoute allowedRole="Artist">
              <Artist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/curator"
          element={
            <ProtectedRoute allowedRole="Curator">
              <Curator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="Admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path="/tour" element={<Tour />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;