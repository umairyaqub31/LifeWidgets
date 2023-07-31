import * as React from "react";
import { View, ScrollView, TouchableWithoutFeedback, Text } from "react-native";
import styles from "./styles";
import ImageLayout from "react-native-image-layout";
import { Ionicons } from "@expo/vector-icons";
import { Config } from "@common";

class EventsPictures extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { item } = this.props.route.params;
    let images = [];
    if (item.photos) {
      if (item.photos.length > 0) {
        item.photos.map((i) => {
          images.push({
            uri: Config.lifeWidget.image_url + "/" + i.attachment_url,

            // dimensions: { width: 1080, height: 1220 },
          });
        });
      }
    }

    // console.log("images...", images);
    return (
      <View style={styles.container}>
        <ImageLayout
          enableModal
          columns={3}
          spacing={2}
          imageContainerStyle={{ borderRadius: 6 }}
          images={images}
          renderPageHeader={(image, i, onClose) => {
            return (
              <View
                style={[styles.statusBarTop, styles.header, styles.pageHeader]}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    onClose();
                  }}
                >
                  <Ionicons
                    style={{ marginLeft: 10 }}
                    name="close"
                    size={32}
                    color="white"
                  />
                </TouchableWithoutFeedback>
              </View>
            );
          }}
        />
      </View>
    );
  }
}
export default EventsPictures;
