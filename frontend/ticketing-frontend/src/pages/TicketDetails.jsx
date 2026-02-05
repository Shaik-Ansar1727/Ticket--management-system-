import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Spin, Button, message } from "antd";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

import {
  getTicketByIdApi,
  getAssignableUsersApi,
} from "../api/ticket.api";

import TicketComments from "../components/tickets/TicketComments";
import TicketActions from "../components/tickets/TicketActions";
import TicketInfo from "../components/tickets/TicketInfo";
import EditTicketModal from "../components/tickets/EditTicketModal";

const { Text } = Typography;

const TicketDetails = () => {
  const { ticketId } = useParams();
  const { role } = useAuth();
  const queryClient = useQueryClient();

  const [isEditOpen, setIsEditOpen] = useState(false);

  const { data: users = [] } = useQuery({
    queryKey: ["assignable-users"],
    queryFn: getAssignableUsersApi,
    enabled: role === "ADMIN",
    onError: () => {
      message.error("Failed to load users");
    },
  });

  const {
    data: ticket,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () => getTicketByIdApi(ticketId),
    enabled: !!ticketId,
  });

  const getUsernameById = (id) => {
    if (!id) return "—";
    const user = users.find((u) => u.id === id);
    return user ? user.username : "—";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-10 text-center">
        <Text type="danger">
          {error?.response?.data?.message || "Failed to load ticket"}
        </Text>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Ticket not found
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-80px)] bg-gray-100 px-4 py-4">
      <div className="mx-auto max-w-5xl h-full rounded-xl bg-white shadow-sm flex flex-col">


        <div className="sticky top-0 z-10 bg-white border-b px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            {ticket.title}
          </h1>

          {role === "ADMIN" && (
            <Button type="primary" onClick={() => setIsEditOpen(true)}>
              Edit Ticket
            </Button>
          )}
        </div>

        {role === "ADMIN" && (
          <EditTicketModal
            open={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            ticket={ticket}
            users={users}
            onUpdated={() => {
              queryClient.invalidateQueries(["ticket", ticketId]);
            }}
          />
        )}


        <div className="flex-1 overflow-y-auto p-6 space-y-8">

          <div className="rounded-lg bg-gray-50 p-4">
            <TicketInfo
              ticket={{
                ...ticket,
                createdByName: getUsernameById(ticket.createdByUser),
                assignedToName: getUsernameById(ticket.assignedToUser),
              }}
            />
          </div>

          <div className="rounded-lg border bg-white p-4">
            <TicketActions ticket={ticket} role={role} />
          </div>

          <div className="rounded-lg border bg-white p-4">
            <TicketComments ticketId={ticketId} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
