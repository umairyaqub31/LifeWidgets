import * as React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
import { Avatar } from "react-native-paper";
import PropTypes from "prop-types";
import Lightbox from "react-native-lightbox";
import { wrapperZoomImages, ImageInWraper } from "react-native-zoom-lightbox";
import { UserImage } from "@components";
import { connect } from "react-redux";
import { OptimizeImage } from "@helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Video } from "expo-av";

class UserProfileHeader extends React.Component {
  static propTypes = {
    getOpacity: PropTypes.func,
    captureCarouselItem: PropTypes.func,
    indexState: PropTypes.number,
    open: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      defaultImage: "",
      arrayImages: [
        {
          url: this.props.data.profile_banner
            ? OptimizeImage(this.props.data.profile_banner)
            : "https://live.lifewidgets.com/assets/starterHeader.jpg",
        },
      ],
    };
    this.props.navigation.addListener("focus", () => {
      this.getProfileImage();
    });
  }
  printLargeProfilePic = () => {
      return (<Image style={{flex:1}} resizeMode="contain" source={{
          uri: this.props.data.profile_photo
            ? OptimizeImage(this.props.data.profile_photo)
            : "https://live.lifewidgets.com/assets/starterHeader.jpg",
      }} />
     )
  }
  getProfileImage = async () => {
    var userImg = await AsyncStorage.getItem("UserProfileImage");
    console.log("userimg", userImg);
    this.setState({ deafultImage: userImg });
  };

  render() {
    const { getOpacity, captureCarouselItem, indexState, open } = this.props;
    const { arrayImages } = this.state;
    console.log(this.props);
    return (
      <>
        <TouchableOpacity>
          {arrayImages.map((item, index) => (
            <ImageInWraper
              key={index}
              open={open}
              indexState={indexState}
              getOpacity={getOpacity}
              captureCarouselItem={captureCarouselItem}
              index={index}
              url={item.url}
              style={styles.ProfileImageBackground}
            />
          ))}
        </TouchableOpacity>

        <View style={styles.ProfileAvatarContainer}>
          <TouchableOpacity style={styles.ProfileAvatarOpactiy}>
            <Lightbox renderContent={this.printLargeProfilePic}>
              <UserImage item={this.props.data} style={styles.ProfileAvatar} size={75} />
            </Lightbox>
          </TouchableOpacity>
        </View>

      </>
    );
  }
}
const mapStateToProps = ({ Profile }) => {
  return {
    data: Profile.data,
  };
};

export default connect(mapStateToProps)(wrapperZoomImages(UserProfileHeader));
