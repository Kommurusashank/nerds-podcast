import api from "./axios";

export const getQuestions = async () => {
  const response = await api.get(
    "/questions"
  );

  return response.data;
};

export const createQuestion = async (
  questionData
) => {
  const response = await api.post(
    "/questions",
    questionData
  );

  return response.data;
};

export const approveQuestion = async (
  questionId
) => {
  const response = await api.put(
    `/questions/${questionId}/approve`
  );

  return response.data;
};

export const deleteQuestion = async (
  questionId
) => {
  await api.delete(
    `/questions/${questionId}`
  );
};