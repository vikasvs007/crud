import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Orders from "scenes/orders";
import Enquiries from "scenes/enquiries";
import Notifications from "scenes/notifications";
import ActiveUsers from "scenes/activeUsers";
import Visitors from "scenes/visitors";
import UserStatistics from "scenes/userStatistics";
import Users from "scenes/users";
import ProfileSettings from "components/ProfileSettings";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/enquiries" element={<Enquiries />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/active-users" element={<ActiveUsers />} />
              <Route path="/visitors" element={<Visitors />} />
              <Route path="/user-statistics" element={<UserStatistics />} />
              <Route path="/users" element={<Users />} />
              <Route path="/profile" element={<ProfileSettings />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
