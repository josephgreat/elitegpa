import axios from "axios";
import { throwAppError } from "../../utils";

const getAllSessions = async (userDetails) => {
  // try {
  let response = await axios.get(
    `${import.meta.env.VITE_API_URL}/get-all-sessions/${userDetails.uid}`
  );
  return response;
  // } catch (error) {
  // throwAppError({ error: error });
  // }
};

const getOneSession = async (resultId) => {
  try {
  const singleData = await axios.get(
    `${import.meta.env.VITE_API_URL}/get-one-session/${resultId}`
  );
  return singleData.data;
  } catch (error) {
  throwAppError({ error: error });
  }
};
const saveResult = async (semesterDetails) => {
  // try {
  const savedResult = await axios.post(
    `${import.meta.env.VITE_API_URL}/save-session-detail`,
    semesterDetails
  );
  return savedResult;
  // } catch (error) {
  //   throwAppError({ error: error });
  // }
};
const updateResult = async (resultId, semesterDetails) => {
  // try {
  const updatedResult = awaitaxios.patch(
    `${import.meta.env.VITE_API_URL}/update-one-session/${resultId}`,
    semesterDetails
  );
  return updatedResult;
  // } catch (error) {
  //   throwAppError({ error: error });
  // }
};

const deleteOneSession = async (index) => {
  // try {
  const response = await axios.delete(
    `${import.meta.env.VITE_API_URL}/delete-one-session/${index}`
  );
  // } catch (error) {
  //   throwAppError({ error: error });
  // }
};

export {
  getAllSessions,
  getOneSession,
  deleteOneSession,
  saveResult,
  updateResult,
};
