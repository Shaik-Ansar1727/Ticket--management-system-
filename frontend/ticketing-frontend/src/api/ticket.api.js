import instance from "./axios";

export const createTicketApi = async (formValues) => {
  const payload = {
    title: formValues.title,
    description: formValues.description,
    label: formValues.label,
    assignedToUserId: 1,
    attachments: [],
  };

  const response = await instance.post("/tickets", payload);
  return response.data;
};

export const getAllTicketsApi = async () => {
  const response = await instance.get("/tickets");
  return response.data;
};


export const getMyTicketsApi = async () => {
  const response = await instance.get("/tickets/assigned-to-me");
  return response.data;
};


export const getTicketByIdApi = async (ticketId) => {
  const response = await instance.get(`/tickets/${ticketId}`);
  return response.data;
};


export const updateTicketStatusApi = async (ticketId, status) => {
  const response = await instance.patch(
    `/tickets/${ticketId}/status`,
    { newStatus: status }
  );

  return response.data;
};


