import React from "react";
import ImageViewing from "react-native-image-viewing";

const ImageViewer = ({ visible, imageUrl, onClose }) => {
  return (
    <ImageViewing
      images={[{ uri: imageUrl }]}
      imageIndex={0}
      visible={visible}
      onRequestClose={onClose}
    />
  );
};

export default ImageViewer;
