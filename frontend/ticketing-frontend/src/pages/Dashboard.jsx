import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getAllTicketsApi, getMyTicketsApi } from "../api/ticket.api";
import axios from "../api/axios";


const Dashboard = () => {
  const { user, role } = useAuth();

  const {
    data: allTickets = [],
    isLoading: allTicketsLoading,
  } = useQuery({
    queryKey: ["dashboard", "allTickets"],
    queryFn: getAllTicketsApi,
  });

  const {
    data: myTickets = [],
    isLoading: myTicketsLoading,
  } = useQuery({
    queryKey: ["dashboard", "myTickets"],
    queryFn: getMyTicketsApi,
  });

  const totalTickets = allTickets.length;

const openTickets = allTickets.filter(
  t => t.status !== "DEPLOYED_DONE"
).length;

const closedTickets = allTickets.filter(
  t => t.status === "DEPLOYED_DONE"
).length;


  const myTicketsCount = myTickets.length;

  const {
    data: pendingUsers = [],
  } = useQuery({
    queryKey: ["dashboard", "pendingUsers"],
    queryFn: async () => {
      const res = await axios.get("/admin/users/pending");
      return res.data;
    },
    enabled: role === "ADMIN", 
  });
  const pendingUsersCount = pendingUsers.length;


  if (allTicketsLoading || myTicketsLoading) {
    return <div className="text-gray-500">Loading dashboard…</div>;
  }


  return (
    <div className="m-5 flex flex-col items-center space-y-10">


      <div className="text-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          Welcome back, {user?.username}
        </h1>
        <p className="text-gray-600 mt-1">
          Here’s what’s happening with your tickets today.
        </p>
      </div>


      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm text-center">
          <p className="text-sm text-gray-500">Total Tickets</p>
          <p className="text-2xl font-semibold mt-2">{totalTickets}</p>

        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm text-center">
          <p className="text-sm text-gray-500">Open Tickets</p>
          <p className="text-2xl font-semibold mt-2">{openTickets}</p>

        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm text-center">

          <p className="text-sm text-gray-500">Closed Tickets</p>
          <p className="text-2xl font-semibold mt-2">{closedTickets}</p>

        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm text-center">
          <p className="text-sm text-gray-500">My Tickets</p>
          <p className="text-2xl font-semibold mt-2">{myTicketsCount}</p>
        </div>
      </div>


       {role === "ADMIN" && pendingUsersCount > 0 && (

        <div className="bg-white rounded-lg p-6 shadow-sm text-center w-full max-w-6xl">
          <h2 className="text-lg font-semibold text-gray-800">
            Admin Overview
          </h2>
          <p className="text-gray-600 mt-2">
            You have pending user approvals and system tickets to review.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
