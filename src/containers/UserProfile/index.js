import * as React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  FlatList,
  Modal,
  Dimensions
} from "react-native";
import styles from "./styles";
import {
  FontAwesome,
  AntDesign,
  FontAwesome5,
  Entypo,
  Feather,
  MaterialCommunityIcons,
  Ionicons
} from "@expo/vector-icons";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { Divider, Button, Avatar } from "react-native-paper";
import {
  OtherProfileHeader,
  ProfileDottedPopup,
  SavepostPopup,
  SharePopup,
  UserPost,
  FbGrid,
  UserImage,
} from "@components";
import { Config } from "@common";
import { Capitalize, OptimizeImage } from "@helpers";
import moment from "moment";
import { connect } from "react-redux";
import { Video } from "expo-av";

const windowWidth = Dimensions.get('window').width-10;


class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      introModalVisible: false,
    };
    this.actionSheetRef = React.createRef();
    this.actionSheetRef2 = React.createRef();
    this.actionSheetRef3 = React.createRef();
  }

  componentDidMount() {
    const { user_id } = this.props.route.params;
    const data = this.props.user;
    this.props.otherUserProfile(user_id);
    this.props.allUserMedia(10, 1, user_id);
    this.props.navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headertitle}>
          <Text style={styles.headertitleText}>
            {Capitalize(data.first_name)} {Capitalize(data.last_name)}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              this.actionSheetRef3.current.profileDotsAction({ user: data })
            }
            style={[styles.headRight, styles.chipOpcity]}
          >
            {/* <Feather name="edit" size={18} color={colors.primary}  /> */}
            <MaterialCommunityIcons
              name="dots-vertical"
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }
  sharePopupButton = () => {
    this.actionSheetRef2.current.sharePopupButton();
  };
  toggleIntroModal = (vis) => {
    this.setState({ introModalVisible: vis });
  };

  navigateToChat = () => {
    const data = this.props.user;
    this.props.navigation.navigate("Message", {
      connectyCubeId: data.cube_user_id,
      chatName: data.first_name,
      userImg: data.profile_photo,
    });
  };

  printIntroVideo = (data) => {
    if (!!data.interoVideo) {
      return null;
    }
    return (
      <>
        <Divider style={styles.separator} />
        <View>
          <Text style={styles.heading}>Intro</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Video
            source={{
              uri: data.intro_video,
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            useNativeControls
            isLooping={false}
            ignoreSilentSwitch={"ignore"}
            PlaybackStatus={false}
            style={{
              flex: 1,
              backgroundColor: "#fff",
              aspectRatio: 4 / 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </View>
      </>
    );
  };
  listHeaderComponent = () => {
    const data = this.props.user;
    const media = this.props.media.data ? this.props.media.data : [];

    const attachments = [];
    for (var i = 0; i < media.length; i++) {
      attachments[i] = OptimizeImage(media[i].attachment_url, media[i].type);
    }

    if (Object.keys(data).length === 0) {
      return (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          color={colors.gray}
        />
      );
    }
    return (
      <>
        <OtherProfileHeader user_id={data.id} />
        <View style={styles.scrolledview}>
        <View style={{ flex: 1, flexDirection: "column",marginTop:30 }}>
            <View style={{ alignItems: "flex-start" }}>
              <Text style={[styles.username]}>
                {Capitalize(data.first_name)} {Capitalize(data.last_name)}
                {data.verified && (
                  <AntDesign name="star" size={18} color={colors.gold} />
                )}
              </Text>
              {data.verified && (
                <Text style={{ color: colors.gray }}>
                  {data.verified_status}
                </Text>
              )}
            </View>
            {!!data.intro_video && (
              <View style={styles.userBtnGrid}>
                <TouchableOpacity
                  onPress={() => {
                      this.toggleIntroModal(true);
                    }}
                  style={styles.primaryBtn}
                >
                  <FontAwesome5 name="play" size={14} color={colors.white}  />
                  <Text
                    style={styles.primaryBtnText}
                  >
                    Intro Video
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1,marginLeft:30}}></TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.userBtnGrid}>
            {data.is_friend && (
              <>
                {!!data.cube_user_id && data.cube_user_id > 0 && (
                  <TouchableOpacity
                    onPress={this.navigateToChat}
                    style={[
                      styles.primaryBtn,
                      { backgroundColor: colors.primary},
                    ]}
                  >
                    <AntDesign name="message1" size={18} color={colors.white}  />
                    <Text
                      style={[styles.primaryBtnText, { color: colors.white }]}
                    >
                      Message
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => this.props.cancelFriendRequest(data.id)}
                  style={[
                    styles.primaryBtn,
                    { backgroundColor: colors.lightGray, marginLeft: 5 },
                  ]}
                >
                  <Feather name="user-minus" size={18} color={colors.primary} />
                  <Text
                    style={[styles.primaryBtnText, { color: colors.primary }]}
                  >
                    Unfriend
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {!data.is_friend && !data.request.is_entry && (
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => this.props.sendFriendRequest(data.id)}
              >
                <Text style={styles.primaryBtnText}>Add Friend</Text>
              </TouchableOpacity>
            )}
            {!data.is_friend &&
              data.request.is_send_request &&
              data.request.is_entry && (
                <TouchableOpacity
                  style={[
                    styles.primaryBtn,
                    { backgroundColor: colors.lightGray },
                  ]}
                  onPress={() => this.props.cancelFriendRequest(data.id)}
                >
                  <Text style={[styles.primaryBtnText, { color: colors.black }]}>Cancel friend request</Text>
                </TouchableOpacity>
              )}
            {!data.is_friend &&
              data.request.is_send_request === false &&
              data.request.is_entry && (
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    style={[styles.primaryBtn, { margin: 5 }]}
                    onPress={() => this.props.acceptFriendRequest(data.id)}
                  >
                    <Text style={styles.primaryBtnText}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.primaryBtn,
                      { backgroundColor: colors.lightGray, margin: 5 },
                    ]}
                    onPress={() => this.props.cancelFriendRequest(data.id)}
                  >
                    <Text
                      style={[styles.primaryBtnText, { color: colors.black }]}
                    >
                      Reject
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            {/* <TouchableOpacity
              style={styles.dottedBtn}
              onPress={() =>
                this.actionSheetRef3.current.profileDotsAction({ user: data })
              }
            >
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={colors.black}
              />
            </TouchableOpacity> */}
          </View>
          <Divider style={styles.separator} />
          {!!data.city && data.city != "null" && (
            <TouchableOpacity style={[styles.list, styles.firstList]}>
              <FontAwesome
                style={styles.listIcon}
                name="home"
                size={22}
                color={colors.gray}
              />
              <View style={styles.listText}>
                <Text style={styles.text}>
                  Lives in{" "}
                  <Text style={styles.textBold}>
                    {data.city}, {data.country_code}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.list}>
            <AntDesign
              style={styles.listIcon}
              name="clockcircle"
              size={22}
              color={colors.gray}
            />
            <View style={styles.listText}>
              <Text style={styles.text}>
                Joined {moment.utc(data.created_at).local().format("MMMM Y")}
              </Text>
            </View>
          </TouchableOpacity>
          {(data.marital_status_privacy === 1 ||
            (data.marital_status_privacy === 2 && data.is_friend)) && (
            <View style={[styles.list]}>
              <FontAwesome
                style={styles.listIcon}
                name="heart"
                size={22}
                color={colors.gray}
              />
              <View style={styles.listText}>
                <Text style={styles.text}>
                  {Capitalize(data.marital_status)}
                </Text>
              </View>
              {data.marital_status === "in_relationship" &&
                Object.keys(Object.assign({}, data.relationship)).length >
                  0 && (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        if (this.props.user.id != data.relationship.id) {
                          this.props.navigation.push("UserProfile", {
                            user_id: data.relationship.id,
                          });
                        }
                      }}
                      style={[{ alignItems: "center", flexDirection: "row" }]}
                    >
                      <Text>{" with "}</Text>
                      <Text
                        style={{ fontFamily: FontFamily.Medium, fontSize: 17 }}
                      >
                        {Capitalize(data.relationship.first_name)}{" "}
                        {Capitalize(data.relationship.last_name)}
                      </Text>
                      {/* {data.relationship.profile_photo ? (
                        <Avatar.Image
                          style={styles.avatarimage}
                          size={42}
                          source={{
                            uri: data.relationship.profile_photo,
                          }}
                        />
                      ) : (
                        <Avatar.Image
                          style={styles.avatarimage}
                          size={42}
                          source={require("@images/avatar.png")}
                        />
                      )} */}
                    </TouchableOpacity>
                  </View>
                )}
            </View>
          )}
          {!!data.total_followers > 0 && (
            <TouchableOpacity style={styles.list}>
              <FontAwesome5
                style={styles.listIcon}
                name="user-check"
                size={22}
                color={colors.gray}
              />
              <View style={styles.listText}>
                <Text style={styles.text}>
                  Followed by {data.total_followers} people
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {/* <TouchableOpacity
            style={[styles.list, styles.lastList]}
            onPress={() => this.props.navigation.navigate("MoreProfile")}
          >
            <Entypo
              style={styles.listIcon}
              name="dots-three-horizontal"
              size={22}
              color={colors.gray}
            />
            <View style={styles.listText}>
              <Text style={styles.text}>See more about</Text>
            </View>
          </TouchableOpacity> */}
          {(data.friends_privacy === 1 ||
            (data.friends_privacy === 2 && data.is_friend)) && (
            <>
              <Divider style={styles.separator} />
              <View style={styles.findFriends}>
                <View>
                  <Text style={styles.heading}>Friends</Text>
                  <Text style={styles.graytext}>
                    {data.accepted_friend_count - 1} friends
                  </Text>
                </View>
              </View>
              <View style={styles.friendsGridContainer}>
                {typeof data.accepted_friend !== "undefined" &&
                  data.accepted_friend.length > 0 &&
                  data.accepted_friend.map((item, key) => {
                    if (data.id === item.id) return null;
                    return (
                      <View style={[styles.friendsGrid]} key={key}>
                        <TouchableOpacity
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          onPress={() =>
                            this.props.navigation.push("UserProfile", {
                              user_id: item.id,
                            })
                          }
                        >
                          <UserImage item={item} size={52} />
                          <Text
                            style={[styles.textBold, styles.friendsGridName]}
                          >
                            {Capitalize(item.first_name)}{" "}
                            {Capitalize(item.last_name)}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
              </View>
            </>
          )}
          
          {!!this.props.media.total > 0 && (
            <>
              <Divider style={styles.separator} />
              <View
                style={[
                  styles.picturesList,
                  { flexDirection: "row", justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.heading}>Pictures</Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("MyPictures", {
                      user_id: data.id,
                    })
                  }
                >
                  <Text style={styles.lightPrimaryBtnText}>See All</Text>
                </TouchableOpacity>
              </View>

              <View style={{ height: 300 }}>
                <FbGrid
                  images={attachments}
                  onPress={() =>
                    this.props.navigation.navigate("MyPictures", {
                      user_id: data.id,
                    })
                  }
                  count={
                    typeof this.props.media.total !== "undefined"
                      ? this.props.media.total
                      : 0
                  }
                />
              </View>
            </>
          )}
        </View>
        <Divider style={styles.separator} />
      </>
    );
  };

  sharePopupButton = (id) => {
    this.actionSheetRef2.current.modalizeOpen(id);
  };

  savePostPopup = (id) => {
    this.actionSheetRef.current.SavepostPopup(id);
  };

  render() {
    const data = this.props.user;
    const { introModalVisible } = this.state;
    if (Object.keys(data).length === 0) {
      return (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          color={colors.gray}
        />
      );
    }

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <UserPost
            navigation={this.props.navigation}
            user_id={data.id}
            listHeaderComponent={this.listHeaderComponent}
            _sharePopupButton={this.sharePopupButton}
            _savePostPopup={this.savePostPopup}
          />
        </View>
        <SavepostPopup ref={this.actionSheetRef} {...this.props} />
        <SharePopup ref={this.actionSheetRef2} {...this.props} />
        <ProfileDottedPopup ref={this.actionSheetRef3} {...this.props} />
        {!!data.intro_video && (
          <Modal
            animationType="slide"
            transparent={false}
            visible={introModalVisible}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, .7)",
              }}
            >
              <Video
                source={{
                  uri: OptimizeImage(data.intro_video, "video"),
                }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode={Video.RESIZE_MODE_CONTAIN}
                useNativeControls
                isLooping={false}
                ignoreSilentSwitch={"ignore"}
                playsInSilentLockedModeIOS={true}
                PlaybackStatus={false}
                style={{
                  width:windowWidth,
                  backgroundColor: "#fff",
                  aspectRatio: 16 / 9,
                }}
              />
              <TouchableOpacity
                style={{ position: "absolute", left: 10, top: 20 , zIndex:11}}
                onPress={() => {
                    this.toggleIntroModal(false);
                  }}
                >
                <Ionicons name="md-close-outline" size={36} color="white" />
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </View>
    );
  }
}

const mapStateToProps = ({ Profile }, ownProps) => {
  const { user_id } = ownProps.route.params;
  return {
    user:
      typeof Profile.user !== "undefined"
        ? typeof Profile.user[user_id] !== "undefined"
          ? Profile.user[user_id]
          : {}
        : {},
    isFetching: Profile.userFetching,
    media:
      typeof Profile.media !== "undefined"
        ? typeof Profile.media[user_id] !== "undefined"
          ? Profile.media[user_id]
          : {}
        : {},
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/ProfileRedux");
  return {
    ...ownProps,
    ...stateProps,
    otherUserProfile: (user_id) => {
      actions.otherUserProfile(dispatch, { user_id: user_id }, user_id);
    },
    sendFriendRequest: (friend_id) => {
      actions.sendUserFriendRequest(dispatch, friend_id);
    },
    cancelFriendRequest: (friend_id) => {
      actions.cancelUserFriendRequest(dispatch, friend_id);
    },
    acceptFriendRequest: (friend_id) => {
      actions.acceptUserFriendRequest(dispatch, friend_id);
    },
    allUserMedia: (per_page, page, user_id) => {
      actions.allUserMedia(dispatch, per_page, page, user_id);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(MyProfile);