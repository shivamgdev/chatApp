import React from "react";
import { View, Text, StyleSheet, FlatList, Modal } from "react-native";
import useChatStore from "../hooks/useChatStore";

const ReactionSheet = ({ visible, reactions, onClose }) => {
  const { participants } = useChatStore();

  const renderReaction = ({ item }) => {
    const participant = participants.find(
      (p) => p.uuid === item.participantUuid
    );
    return (
      <View style={styles.reactionItem}>
        <Text style={styles.reaction}>{item.value}</Text>
        <Text style={styles.name}>{participant.name}</Text>
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <FlatList
          data={reactions}
          renderItem={renderReaction}
          keyExtractor={(item) => item.uuid}
        />
        <Text style={styles.close} onPress={onClose}>
          Close
        </Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  reactionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  reaction: {
    fontSize: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
  },
  close: {
    color: "#075E54",
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
});

export default ReactionSheet;
