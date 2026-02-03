import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

const DashboardLayout = () => {
  return (
    <div>
      <Sidebar />
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
