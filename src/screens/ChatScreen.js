import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import useChatStore from "../hooks/useChatStore";
import ChatBubble from "../components/ChatBubble";
import InputBar from "../components/InputBar";
import ImageViewer from "../components/ImageViewer";

const ChatScreen = () => {
  const { messages, fetchInitialData, addMessage, loadOldMessages } =
    useChatStore();
  const [isImageViewerVisible, setImageViewerVisible] = useState(false);
  const [imageToPreview, setImageToPreview] = useState(null);

  const openImageViewer = (image) => {
    setImageToPreview(image);
    setImageViewerVisible(true);
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const loadOlderMessages = async () => {
    loadOldMessages(messages);
  };

  const renderMessage = ({ item, index }) => {
    const isGrouped =
      index > 0 &&
      item.authorUuid === messages[index - 1].authorUuid &&
      new Date(item.sentAt).getTime() -
        new Date(messages[index - 1].sentAt).getTime() <
        60000;

    const previousMessage = messages[index - 1];
    const isDifferentDay =
      !previousMessage ||
      new Date(item.sentAt).toDateString() !==
        new Date(previousMessage.sentAt).toDateString();
    return (
      <>
        {isDifferentDay && (
          <Text style={styles.dateText}>
            {new Date(item.sentAt).toDateString()}
          </Text>
        )}
        <ChatBubble
          message={item}
          isGrouped={isGrouped}
          onImagePress={(image) => openImageViewer(image)}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.uuid}
        inverted
        onEndReached={loadOlderMessages}
        onEndReachedThreshold={0.5}
      />
      <InputBar onSend={addMessage} />
      {isImageViewerVisible && (
        <ImageViewer
          visible={isImageViewerVisible}
          image={imageToPreview}
          onClose={() => setImageViewerVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  dateText: { alignSelf: "center", marginVertical: 10, color: "gray" },
});
export default ChatScreen;
