import api from "./axios";

export const login = async (credentials) => {
  const response = await api.post(
    "/auth/login",
    credentials
  );

  return response.data;
};

export const logout = () => {
  localStorage.removeItem("access_token");
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const isAuthenticated = () => {
  return Boolean(
    localStorage.getItem("access_token")
  );
};