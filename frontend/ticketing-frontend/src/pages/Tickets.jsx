import React, { useEffect, useState } from "react";
import { Typography, Spin, Card } from "antd";
import { Link } from "react-router-dom";
import { getAllTicketsApi } from "../api/ticket.api";

const { Title, Text } = Typography;

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getAllTicketsApi();
        setTickets(data);
      } catch (error) {
        console.error("Failed to load tickets", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <Title level={2}>All Tickets</Title>

      {tickets.map((ticket) => (
        <Card key={ticket.id} style={{ marginBottom: 12 }}>
          <Link to={`/dashboard/tickets/${ticket.id}`}>
            <strong>{ticket.title}</strong>
          </Link>
          <Text type="secondary"> — {ticket.status}</Text>
        </Card>
      ))}
    </div>
  );
};

export default Tickets;
