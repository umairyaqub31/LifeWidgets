import * as React from "react";
import { View, Image, Modal, Pressable } from "react-native";
import styles from "./styles";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { OptimizeImage } from "@helpers";
import ImageViewer from "react-native-image-zoom-viewer";
import { Avatar } from "react-native-paper";
import { CachedImage } from "@components";


class RestaurantsGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      index: 0,
    };
  }

  componentDidMount(){
  }

  render() {
    let banner = null;
    let logo = null;
    let bannerObject = Object.assign({}, this.props.item.banner);
    if (bannerObject.attachment_url) {
      banner = bannerObject;
    }

    let logoObject = Object.assign({}, this.props.item.logo);
    if (logoObject.attachment_url) {
      logo = OptimizeImage(logoObject.attachment_url);
    }

    let attaches = [];
    let photos = Object.assign([], this.props.item.photos);
    if (banner) {
      photos.unshift(banner);
    }
    for (var i = 0; i < photos.length; i++) {
      attaches[i] = {
        ...photos[i],
        url: OptimizeImage(photos[i].attachment_url, photos[i].type),
      };
    }

    return (
      <>
        {logo && (
          <Avatar.Image
            style={{ position: "absolute", zIndex: 10, top: 5, left: 10 }}
            size={52}
            source={{uri:logo}}
          />
        )}
        <Swiper
          style={styles.Swiper}
          showsButtons={true}
          showsPagination={false}
          loadMinimal={true}
          
          nextButton={
            <Entypo name="chevron-thin-right" size={24} color="white" />
          }
          prevButton={
            <Entypo name="chevron-thin-left" size={24} color="white" />
          }
        >
          {attaches &&
            attaches.map((item, key) => (
              <View key={key} style={styles.arrayImagesGrid}>
                <Pressable
                  onPress={() => this.setState({ visible: true, index: key })}
                >
                  <View>
                    <CachedImage
                      style={styles.ImagesGridphoto}
                      
                      source={{
                        uri: item.url,
                      }}
                    />
                  </View>
                </Pressable>
              </View>
            ))}
        </Swiper>
        <Modal visible={this.state.visible} transparent={true}>
          <Pressable
            onPress={() => this.setState({ visible: false })}
            style={styles.close}
          >
            <AntDesign name="close" size={24} color="white" />
          </Pressable>
          <ImageViewer
            useNativeDriver={true}
            imageUrls={attaches}
            index={this.state.index}
          />
        </Modal>
      </>
    );
  }
}

export default RestaurantsGallery;