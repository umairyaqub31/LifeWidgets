import * as React from "react";
import { View, Alert, TouchableWithoutFeedback, FlatList } from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import ImageLayout from "react-native-image-layout";
import { OptimizeImage } from "@helpers";
import { connect } from "react-redux";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { RequestCopy, AvailableCopy } from "@components";
import { Video } from "expo-av";

class MyPictures extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "first", title: "Pictures" },
        { key: "second", title: "Videos" },
      ],
    };
    (this.per_page = 100), (this.page = 1);
  }

  componentDidMount() {
    this.page = 1;
    this.props.allUserMedia(this.per_page, this.page, this.props.user_id);
    this.props.allUserVideo(this.per_page, this.page, this.props.user_id);
  }

  onEndReached = () => {
    const media = this.props.media.data ? this.props.media.data : [];
    if (!this.props.mediaFetching && media.length !== this.props.media.total) {
      this.page++;
      this.props.allUserMedia(this.per_page, this.page, this.props.user_id);
    }
  };

  onDelete = (id, onClose) => {
    Alert.alert(
      "Delete photo",
      "Are you sure you want to delete this photo",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", style:"destructive", onPress: () => this.deleteMedia(id, onClose) }
      ]
    );
  }

  deleteMedia = (id, onClose) => {
    onClose();
    this.props.deleteMedia(id, this.props.user_id);
  }

  renderScene = ({ route }) => {
    const attachment = [];
    const media = this.props.media.data ? this.props.media.data : [];
    for (var i = 0; i < media.length; i++) {
      attachment[i] = {
        ...media[i],
        url: OptimizeImage(media[i].attachment_url, media[i].type)
        
      };
    }
    
    
    switch (route.key) {
      case "first":
        return (
          <ImageLayout
            enableModal={true}
            columns={2}
            images={attachment}
            imageContainerStyle={{ borderRadius: 6 }}
            //onEndReachedThreshold={0.5}
            //onEndReached={this.onEndReached}
            // imagePageComponent={(image)=>{
            //   alert(JSON.stringify(image.image.dimensions.height,null,3))
            //   return <Image source={image.source} width={image.image.dimensions.width} height={image.image.dimensions.height} />;
            // }}
            renderPageHeader={(image, i, onClose) => {
              return (
                <View
                  style={[
                    styles.statusBarTop,
                    styles.header,
                    styles.pageHeader,
                    {
                      justifyContent:"space-between"
                    }
                  ]}
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
                  {this.props.user.id===this.props.user_id &&
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.onDelete(image.media_id, onClose);
                    }}
                  >
                    <Ionicons
                      style={{ marginLeft: 10 }}
                      name="ios-trash-outline"
                      size={32}
                      color="white"
                    />
                  </TouchableWithoutFeedback>
                  }
                </View>
              );
            }}
          />
        );
      case "second":
        const video = typeof this.props.video ==="undefined" ? []: typeof this.props.video.data === "undefined"? []: this.props.video.data;
        return (
          <FlatList
            data={video}
            numColumns={2}
            contentContainerStyle={{ padding: 10 }}
            renderItem={this.renderItem}
          />
        );
      default:
        return null;
    }
  };

  setIndex = (index) => {
    this.setState({ index });
  };

  renderItem = ({item, key}) => {
    const uri = OptimizeImage(item.attachment_url, item.type);

    return (
      <Video
        key={key}
        source={{
          uri: uri,
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
          aspectRatio: 2 / 3,
          margin: 2,
        }}
      />
    );
  };

  render() {
    const { index, routes } = this.state;

    return (
      <View style={styles.container}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={this.renderScene}
          onIndexChange={this.setIndex}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              indicatorStyle={{ backgroundColor: colors.primary }}
              indicatorContainerStyle={{ backgroundColor: colors.white }}
              activeColor={colors.primary}
              inactiveColor={colors.black}
              labelStyle={{ fontFamily: FontFamily.Medium, fontSize: 12 }}
            />
          )}
        />
        

      </View>
    );
  }
}

const mapStateToProps = ({ Profile, User }, ownProps) => {
  const { user_id } = ownProps.route.params;
  return {
    user_id: user_id,
    user:User.user,
    mediaFetching: Profile.mediaFetching,
    media: typeof Profile.media !== "undefined" ? Profile.media[user_id] : {},
    video: typeof Profile.video !== "undefined" ? Profile.video[user_id] : {},
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/ProfileRedux");
  return {
    ...ownProps,
    ...stateProps,
    allUserMedia: (per_page, page, user_id) => {
      actions.allUserMedia(dispatch, per_page, page, user_id);
    },
    allUserVideo: (per_page, page, user_id) => {
      actions.allUserVideo(dispatch, per_page, page, user_id);
    },
    deleteMedia:(id, user_id)=>{
      actions.deleteMedia(dispatch, id, user_id);
    }
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(MyPictures);