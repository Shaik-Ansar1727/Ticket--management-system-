import React, { useState } from "react";
import { Typography, Spin, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { getMyTicketsApi } from "../api/ticket.api";
import { useQuery } from "@tanstack/react-query";

const { Title, Text } = Typography;

const MyTickets = () => {

  const navigate = useNavigate();

  const {
    data: tickets = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ["my-tickets"],
    queryFn: getMyTicketsApi,
  });


if (isLoading) return <Spin size="large" />;
if (isError) return <Text type="danger">Failed to load tickets</Text>;


  return (
    <div>
      <Title level={2}>My Tickets</Title>

      {tickets.map((ticket) => (
        <Card
          key={ticket.id}
          hoverable
          style={{ marginBottom: 12, cursor: "pointer" }}
          onClick={() => navigate(`/dashboard/tickets/${ticket.id}`)}
        >
          <strong>{ticket.title}</strong>
          <Text type="secondary"> — {ticket.status}</Text>
        </Card>
      ))}
    </div>
  );
};

export default MyTickets;
