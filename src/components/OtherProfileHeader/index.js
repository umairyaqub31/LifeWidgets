import * as React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
import { Avatar } from "react-native-paper";
import PropTypes from "prop-types";
import Lightbox from "react-native-lightbox";
import { wrapperZoomImages, ImageInWraper } from "../../../react-native-zoom-lightbox";
import { UserImage } from "@components";
import { connect } from "react-redux";
import { OptimizeImage } from "@helpers";
import { Ionicons } from '@expo/vector-icons';

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
      arrayImages: [
        {
          url: this.props.data.profile_banner
            ? OptimizeImage(this.props.data.profile_banner)
            : "https://live.lifewidgets.com/assets/starterHeader.jpg",
        },
      ],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.id !== this.props.data.id) {
      this.setState({
        arrayImages: [
          {
            url: nextProps.data.profile_banner
              ? OptimizeImage(nextProps.data.profile_banner)
              : "https://live.lifewidgets.com/assets/starterHeader.jpg",
          },
        ],
      });
    }
  }
  printLargeProfilePic = () => {
      return (<Image style={{flex:1}} resizeMode="contain" source={{
        uri: this.props.data.profile_photo
          ? OptimizeImage(this.props.data.profile_photo)
          : "https://live.lifewidgets.com/assets/starterHeader.jpg",
      }} />
     )
  }
  
  renderHeader = (close) => {
    this.closeCallback = close
      return (<TouchableOpacity style={{padding:10,marginTop:10}} onPress={close}><Ionicons name="md-close-outline" size={34} color="white" /></TouchableOpacity>
     )
  }

  render() {
    const { getOpacity, captureCarouselItem, indexState, open } = this.props;
    const { arrayImages } = this.state;
    return (
      <>
        <TouchableOpacity style={styles.opacitydots}>
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
            <Lightbox renderContent={this.printLargeProfilePic} pinchToZoom={true} 
            renderHeader={this.renderHeader}>
              <UserImage item={this.props.data} style={styles.ProfileAvatar} size={75} />
            </Lightbox>
          </TouchableOpacity>
        </View>
        {/*!!this.props.data.intro_video && (
          <>
            <Video
              source={{
                uri: OptimizeImage(this.props.data.intro_video, "video"),
              }}
              rate={1.0}
              volume={1.0}
              isMuted={true}
              resizeMode={Video.RESIZE_MODE_CONTAIN}
              useNativeControls
              isLooping={false}
              PlaybackStatus={false}
              style={{
                flex: 1,
                backgroundColor: "#fff",
                aspectRatio: 16 / 9,
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </>
      )*/}
      </>
    );
  }
}
const mapStateToProps = ({ Profile }, ownProps) => {
  const { user_id } = ownProps;

  return {
    data: typeof Profile.user !== "undefined"
    ? typeof Profile.user[user_id] !== "undefined"
      ? Profile.user[user_id]
      : {}
    : {},
  };
};

export default connect(mapStateToProps)(wrapperZoomImages(UserProfileHeader));
