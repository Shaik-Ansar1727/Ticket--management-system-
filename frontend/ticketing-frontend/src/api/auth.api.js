import instance from "./axios";


export const loginApi = async (data) => { 
  const response = await instance.post("/auth/login", data);
  return response.data;
};

export const registerApi = async (data) => { 
  const response = await instance.post("/auth/register", data);
  return response.data;
};
