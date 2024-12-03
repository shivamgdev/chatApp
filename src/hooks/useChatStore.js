import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../api";

const useChatStore = create((set) => ({
  messages: [],
  participants: [],
  sessionUuid: null,
  fetchInitialData: async () => {
    const { data: info } = await api.getInfo();
    const storedSessionUuid = await AsyncStorage.getItem("sessionUuid");

    if (storedSessionUuid !== info.sessionUuid) {
      AsyncStorage.clear();
      await AsyncStorage.setItem("sessionUuid", info.sessionUuid);
    }

    const { data: messages } = await api.getMessages();
    const { data: participants } = await api.getParticipants();

    set({ messages, participants, sessionUuid: info.sessionUuid });
    await AsyncStorage.setItem("messages", JSON.stringify(messages));
    await AsyncStorage.setItem("participants", JSON.stringify(participants));
  },
  addMessage: async (message) => {
    const { data: newMessage } = await api.postNewMessage(message);
    set((state) => ({ messages: [newMessage, ...state.messages] }));
  },
  loadOldMessages: async (messages) => {
    const oldestMessage = messages[0];
    const { data: oldMessages } = await api.getOlderMessages(
      oldestMessage?.uuid
    );
    if (oldMessages?.length > 0) {
      set((state) => ({ messages: [oldMessages, ...state.messages] }));
    }
  },
}));

export const ChatProvider = ({ children }) => {
  return children; // Placeholder provider
};

export default useChatStore;
