import api from "./axios";

export const getEpisodes = async () => {
  const response = await api.get(
    "/episodes"
  );

  return response.data;
};

export const getEpisodeById = async (
  episodeId
) => {
  const response = await api.get(
    `/episodes/${episodeId}`
  );

  return response.data;
};

export const createEpisode = async (
  episodeData
) => {
  const response = await api.post(
    "/episodes",
    episodeData
  );

  return response.data;
};

export const updateEpisode = async (
  episodeId,
  episodeData
) => {
  const response = await api.put(
    `/episodes/${episodeId}`,
    episodeData
  );

  return response.data;
};

export const deleteEpisode = async (
  episodeId
) => {
  await api.delete(
    `/episodes/${episodeId}`
  );
};