import axios from "axios";

const BASE_URL = "http://dummy-chat-server.tribechat.pro/api";

export const api = {
  getInfo: () => axios.get(`${BASE_URL}/info`),
  getMessages: () => axios.get(`${BASE_URL}/messages/all`),
  getLatestMessages: () => axios.get(`${BASE_URL}/messages/latest`),
  getOlderMessages: (refUuid) =>
    axios.get(`${BASE_URL}/messages/older/${refUuid}`),
  getUpdatedMessages: (time) =>
    axios.get(`${BASE_URL}/messages/updates/${time}`),
  postNewMessage: (message) =>
    axios.post(`${BASE_URL}/messages/new`, { text: message }),
  getParticipants: () => axios.get(`${BASE_URL}/participants/all`),
  getUpdatedParticipants: (time) =>
    axios.get(`${BASE_URL}/participants/updates/${time}`),
};
