import React from "react";
import { Typography, Spin, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { getAllTicketsApi } from "../api/ticket.api";
import { useQuery } from "@tanstack/react-query";

const { Title, Text } = Typography;

const Tickets = () => {
  const navigate = useNavigate();

  const {
    data: tickets = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: getAllTicketsApi,
  });

  if (isLoading) {
    return <Spin size="large" />;
  }

  if (isError) {
    return <Text type="danger">Failed to load tickets</Text>;
  }

  return (
    <div className="space-y-4">
      {/* Page Title */}
      <Title level={2} className="mb-6">
        All Tickets
      </Title>

      {/* Ticket List */}
      {tickets.map((ticket) => (
        <Card
          key={ticket.id}
          hoverable
          onClick={() =>
            navigate(`/dashboard/tickets/${ticket.id}`)
          }
          className="cursor-pointer rounded-lg shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center justify-between px-1 py-2">
            <strong className="text-gray-800 text-base">
              {ticket.title}
            </strong>
            <Text className="text-sm text-gray-500">
              {ticket.status}
            </Text>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Tickets;
