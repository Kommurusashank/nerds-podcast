import api from "./axios";

export const getHosts = async () => {
  const response = await api.get("/hosts");

  return response.data;
};

export const getHostById = async (
  hostId
) => {
  const response = await api.get(
    `/hosts/${hostId}`
  );

  return response.data;
};

export const createHost = async (
  hostData
) => {
  const response = await api.post(
    "/hosts",
    hostData
  );

  return response.data;
};

export const updateHost = async (
  hostId,
  hostData
) => {
  const response = await api.put(
    `/hosts/${hostId}`,
    hostData
  );

  return response.data;
};

export const deleteHost = async (
  hostId
) => {
  await api.delete(
    `/hosts/${hostId}`
  );
};