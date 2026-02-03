import React, { useEffect, useState } from "react";
import { Typography, Spin, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { getMyTicketsApi } from "../api/ticket.api";

const { Title, Text } = Typography;

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const data = await getMyTicketsApi();
        setTickets(data);
      } catch (error) {
        console.error("Failed to load my tickets", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyTickets();
  }, []);

  if (loading) return <Spin size="large" />;

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
