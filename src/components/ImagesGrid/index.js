import * as React from "react";
import {
  View,
  Image,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { Video } from "expo-av";
import { OptimizeImage } from "@helpers";
import ImageViewer from "react-native-image-zoom-viewer";
import { AntDesign } from "@expo/vector-icons";
import { VideoPlayer } from "@components";

class ImagesGrid extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      index: 0,
    };
  }

  pauseVideo = () => {
    if (typeof this.videoPlayerRef !== "undefined") {
      if (this.props.item.attachments) {
        this.props.item.attachments
          .filter((attach) => attach.type === "video")
          .map((item, _) => {
            if (this.videoPlayerRef[`REF-PLAYER${item.id}`].isPlaying()) {
              this.videoPlayerRef[`REF-PLAYER${item.id}`].videoPause();
            }
          });
      }
    }
  };

  _stopOtherPlayer = (id) => {
    const { attachments } = this.props.item;
    attachments.filter((attach) => attach.type === "video").forEach((item) => {
      if (item.id !== id) {
        if (
          typeof this.videoPlayerRef[`REF-PLAYER${item.id}`] !== "undefined" &&
          this.videoPlayerRef[`REF-PLAYER${item.id}`].isPlaying()
        ) {
          this.videoPlayerRef[`REF-PLAYER${item.id}`].videoPause();
        }
      }
    });
  };

  render() {
    let attaches = [];
    let attachments = this.props.item.attachments ?? [];
    for (var i = 0; i < attachments.length; i++) {
      attaches[i] = {
        ...attachments[i],
        url: OptimizeImage(attachments[i].attachment_url, attachments[i].type),
      };
    }
    return (
      <>
        <Modal visible={this.state.visible} transparent={true}>
          <TouchableOpacity
            onPress={() => this.setState({ visible: false })}
            style={styles.close}
          >
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
          <ImageViewer
            useNativeDriver={true}
            imageUrls={attaches.filter((attach) => attach.type === "image")}
            index={this.state.index}
          />
        </Modal>
        <View style={styles.ImagesGrid}>
          {attaches &&
            attaches
              .filter((attach) => attach.type === "image")
              .map((item, key) => (
                <View key={key} style={styles.arrayImagesGrid}>
                  <TouchableWithoutFeedback
                    onPress={() => this.setState({ visible: true, index: key })}
                  >
                    <View>
                      <Image
                        style={styles.ImagesGridphoto}
                        source={{
                          uri: item.url,
                        }}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              ))}
        </View>

        {attaches &&
          attaches
            .filter((attach) => attach.type === "video")
            .map((item, key) => (
              <View key={key} style={{marginBottom:10}}>
                <VideoPlayer
                  ref={(ref) =>
                    (this.videoPlayerRef = {
                      ...this.videoPlayerRef,
                      [`REF-PLAYER${item.id}`]: ref,
                    })
                  }
                  id={item.id}
                  stopOtherPlayer={this._stopOtherPlayer}
                  uri={item.url}
                />
              </View>
            ))}
      </>
    );
  }
}

export default ImagesGrid;