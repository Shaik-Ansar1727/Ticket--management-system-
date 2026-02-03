import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Spin, Select, Button, message } from "antd";
import { getTicketByIdApi, updateTicketStatusApi } from "../api/ticket.api";

const { Title, Text } = Typography;


const getAllowedStatuses = (currentStatus, role) => {
  if (currentStatus === "DEPLOYED_DONE") {
    return [];
  }

  const employeeStatuses = [
    "TODO",
    "PAUSED",
    "IN_PROGRESS",
    "PR_REVIEW",
  ];

  const adminOnlyStatuses = [
    "READY_TO_DEPLOY",
    "DEPLOYED_DONE",
  ];

  if (role === "ADMIN") {
    return [...employeeStatuses, ...adminOnlyStatuses];
  }

  return employeeStatuses;
};

const TicketDetails = () => {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");


  const role = localStorage.getItem("role");

  useEffect(() => {
    if (ticket) {
      setStatus(ticket.status);
    }
  }, [ticket]);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const data = await getTicketByIdApi(ticketId);
        setTicket(data);
      } catch (error) {
        message.error("Failed to load ticket");
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticketId]);

  const updateStatus = async () => {

    if (status === ticket.status) {
      message.warning("Status is already set");
      return;
    }

    try {
      await updateTicketStatusApi(ticketId, status);


      setTicket(prev => ({ ...prev, status }));

      message.success("Status updated");
    } catch (error) {
  const backendMessage =
    error.response?.data?.message || "Failed to update status";

  console.log("STATUS UPDATE ERROR:", backendMessage);
  message.error(backendMessage);
}


  };

  if (loading) return <Spin />;

  if (!ticket) return <Text>Ticket not found</Text>;


  const allowedStatuses = getAllowedStatuses(ticket.status, role);

  const statusOptions = allowedStatuses.map((s) => ({
    label: s.replace(/_/g, " "),
    value: s,
  }));

  return (
    <div>
      <Title level={2}>{ticket.title}</Title>

      <Text strong>Status:</Text> {ticket.status}
      <br />
      <Text strong>Label:</Text> {ticket.label}
      <br /><br />

      <Text strong>Description:</Text>
      <p>{ticket.description}</p>

      <br /><br />


      {ticket.status === "DEPLOYED_DONE" ? (
        <p style={{ color: "gray" }}>
          This ticket is completed and cannot be modified.
        </p>
      ) : (
        <>
          <Select
            value={status}
            options={statusOptions}
            onChange={setStatus}
            style={{ width: 220 }}
          />

          <br /><br />

          <Button
            type="primary"
            onClick={updateStatus}
            disabled={status === ticket.status}
          >
            Update Status
          </Button>
        </>
      )}
    </div>
  );
};

export default TicketDetails;
