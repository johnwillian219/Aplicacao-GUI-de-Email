import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Inbox from "./pages/Inbox";
import Outbox from "./pages/Outbox";
import Settings from "./pages/Settings";
import Compose from "./pages/Compose";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" replace />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/Aplicacao-GUI-de-Email/dashboard" element={<Dashboard />} />
      <Route path="/Aplicacao-GUI-de-Email/inbox" element={<Inbox />} />
      <Route path="/Aplicacao-GUI-de-Email/outbox" element={<Outbox />} />
      <Route path="/Aplicacao-GUI-de-Email/settings" element={<Settings />} />
      <Route path="/Aplicacao-GUI-de-Email/compose" element={<Compose />} />
      <Route
        path="/Aplicacao-GUI-de-Email/change-password"
        element={<ChangePassword />}
      />
    </Routes>
  );
}

export default App;
