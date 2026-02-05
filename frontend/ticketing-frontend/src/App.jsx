import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layout/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import MyTickets from "./pages/MyTickets";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";
import Profile from "./pages/Profile";

import AdminUsers from "./pages/admin/AdminUsers";
import AllUsers from "./pages/admin/AllUsers";
import UserDetails from "./pages/admin/UserDetails";


import { useAuth  } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import MyTicketsGuard from "./routes/MyTicketsGuard";


import { GlobalStyles } from "./styles/GlobalStyles";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />

      <Routes>

        <Route path="/" element={<Home />} />


        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="tickets/:ticketId" element={<TicketDetails />} />
          {/* <Route path="my-tickets" element={<MyTickets />} /> */}

          <Route
            path="my-tickets"
            element={
              <MyTicketsGuard>
                <MyTickets />
              </MyTicketsGuard>
            }
          />

          <Route path="profile" element={<Profile />} />


          <Route
            path="create-ticket"
            element={
              <AdminRoute>
                <CreateTicket />
              </AdminRoute>
            }
          />

          <Route
            path="admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />

          <Route
            path="admin/all-users"
            element={
              <AdminRoute>
                <AllUsers />
              </AdminRoute>
            }
          />

          <Route
            path="admin/users/:userId"
            element={
              <AdminRoute>
                <UserDetails />
              </AdminRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
