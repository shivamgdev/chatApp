import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import useChatStore from "../hooks/useChatStore";

const ChatBubble = ({ message, isGrouped, onImagePress }) => {
  const { participants } = useChatStore();
  const author = participants.find((p) => p.uuid === message.authorUuid);
  const isEdited = message.updatedAt > message.sentAt;
  const sentTime = new Date(message.sentAt).toLocaleTimeString();

  return (
    <View style={[styles.container, isGrouped && styles.groupedContainer]}>
      {!isGrouped && (
        <View style={styles.header}>
          <Image source={{ uri: author?.avatarUrl }} style={styles.avatar} />
          <View>
            <Text style={styles.name}>{author?.name}</Text>
            <Text style={styles.time}>{sentTime}</Text>
          </View>
        </View>
      )}
      <View style={styles.messageContent}>
        {message?.replyToMessage && (
          <View style={styles.reply}>
            <Text style={styles.replyText}>
              {message?.replyToMessage?.text}
            </Text>
          </View>
        )}
        <Text style={styles.text}>
          {message?.text}{" "}
          {isEdited && <Text style={styles.edited}>(edited)</Text>}
        </Text>
        {message?.attachments?.map((att) => (
          <TouchableOpacity
            key={att.uuid}
            onPress={() => onImagePress(att?.url)}
          >
            <Image source={{ uri: att?.url }} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
      {message?.reactions?.length > 0 && (
        <View style={styles.reactions}>
          {message?.reactions.map((reaction) => (
            <Text key={reaction?.uuid} style={styles.reaction}>
              {reaction?.value}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 15,
  },
  groupedContainer: {
    marginVertical: 5,
    marginLeft: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
  },
  time: {
    color: "#777",
    fontSize: 12,
  },
  messageContent: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
  edited: {
    fontSize: 12,
    color: "#777",
  },
  reply: {
    borderLeftWidth: 3,
    borderLeftColor: "#075E54",
    paddingLeft: 5,
    marginBottom: 5,
  },
  replyText: {
    color: "#075E54",
    fontStyle: "italic",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 10,
  },
  reactions: {
    flexDirection: "row",
    marginTop: 5,
  },
  reaction: {
    marginRight: 5,
    fontSize: 16,
  },
});

export default ChatBubble;
