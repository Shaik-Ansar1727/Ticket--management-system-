import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import DashboardLayout from "./layout/DashboardLayout"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRouter"
import Login from "./auth/Login"
import Register from "./auth/Register"
import "./App.css"
import Home from "./pages/Home"
import Tickets from "./pages/Tickets"
import MyTickets from "./pages/MyTickets"
import CreateTicket from "./pages/CreateTicket"
import TicketDetails from "./pages/TicketDetails"
import AdminRoute from "./components/AdminRoute";
import AdminUsers from "./pages/admin/AdminUsers";
import AllUsers from "./pages/admin/AllUsers";
import UserDetails from "./pages/admin/UserDetails";
import Profile from "./pages/Profile";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


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
          <Route path="my-tickets" element={<MyTickets />} />
          <Route
            path="create-ticket"
            element={
              <AdminRoute>
                <CreateTicket />
              </AdminRoute>
            }
          />

          <Route path="tickets/:ticketId" element={<TicketDetails />} />
          <Route path="profile" element={<Profile />} />

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
  )
}

export default App
