import api from "./axios";

export const getGuests = async () => {
  const response = await api.get("/guests");

  return response.data;
};

export const getGuestById = async (
  guestId
) => {
  const response = await api.get(
    `/guests/${guestId}`
  );

  return response.data;
};

export const createGuest = async (
  guestData
) => {
  const response = await api.post(
    "/guests",
    guestData
  );

  return response.data;
};

export const updateGuest = async (
  guestId,
  guestData
) => {
  const response = await api.put(
    `/guests/${guestId}`,
    guestData
  );

  return response.data;
};

export const deleteGuest = async (
  guestId
) => {
  await api.delete(
    `/guests/${guestId}`
  );
};