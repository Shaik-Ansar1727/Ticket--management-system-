import instance from "./axios";


export const addCommentApi = async (ticketId, content) => {
  const response = await instance.post(
    `/tickets/${ticketId}/comments`,
    { content }
  );
  return response.data;
};


export const getTicketCommentsApi = async (ticketId) => {
  const response = await instance.get(
    `/tickets/${ticketId}/comments`
  );
  return response.data;
};
