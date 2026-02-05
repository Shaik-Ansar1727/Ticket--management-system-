import instance from "./axios";

export const uploadProfilePictureApi = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await instance.post("/users/me/profile-picture", formData);


  return response.data; 
};
