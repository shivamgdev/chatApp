import React from "react";
import { View, Text, StyleSheet, Modal, Image } from "react-native";

const ParticipantSheet = ({ visible, participant, onClose }) => {
  if (!participant) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <Image source={{ uri: participant.avatarUrl }} style={styles.avatar} />
        <Text style={styles.name}>{participant.name}</Text>
        <Text>{participant.email}</Text>
        <Text>{participant.bio}</Text>
        <Text>{participant.jobTitle}</Text>
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
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  close: {
    color: "#075E54",
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
});

export default ParticipantSheet;
