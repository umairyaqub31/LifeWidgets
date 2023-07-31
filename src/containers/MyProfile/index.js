import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions
} from "react-native";
import styles from "./styles";
import {
  FontAwesome,
  AntDesign,
  FontAwesome5,
  Feather,
  Ionicons
} from "@expo/vector-icons";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { Divider,Avatar,Button } from "react-native-paper";
import {
  UserProfileHeader,
  SavepostPopup,
  UserPost,
  SharePopup,
  FbGrid,
  UserImage
} from "@components";
import { Config } from "@common";
import { Capitalize, OptimizeImage } from "@helpers";
import moment from "moment";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Video } from "expo-av";

const windowWidth = Dimensions.get('window').width-10;

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deafultImage:'',
      introModalVisible: false,
    };
    this.actionSheetRef = React.createRef();
    this.actionSheetRef2 = React.createRef();
    this.props.navigation.addListener('focus', () => {
      this.getProfileImage();
    });
  }

  getProfileImage = async () =>{
    var userImg =  await AsyncStorage.getItem("UserProfileImage");
    console.log('userimg',userImg);
     this.setState({deafultImage:userImg});
   }

  componentDidMount() {
    const data = this.props.data;
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
            onPress={() => this.props.navigation.navigate("EditProfile")}
            style={[styles.headRight, styles.chipOpcity]}
          >
            <Feather name="edit" size={18} color={colors.primary}  />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("AddPost")}
            style={[styles.headRight, styles.chipOpcity]}
          >
            <AntDesign name="pluscircle" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>
      ),
    });
    this.props.allUserMedia(10,1,this.props.user.id);
    this.props.uploadProfile();
    this.props.navigation.addListener("focus", this.focus);
  }


  focus = () => {
    this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({ tabBarVisible: true });
  };


  toggleIntroModal = (vis) => {
       this.setState({ introModalVisible: vis });
  }
  sharePopupButton = (id) => {
    this.actionSheetRef2.current.modalizeOpen(id);
  };

  savePostPopup = (id) => {
    this.actionSheetRef.current.SavepostPopup(id);
  };

  listHeaderComponent = () => {
    const data = this.props.data;
    const media = this.props.media.data?this.props.media.data:[];
    const breakTime = this.props.breakTime;

    const attachments = [];
      for (var i = 0; i < media.length; i++) {
        attachments[i] = OptimizeImage(media[i].attachment_url, media[i].type);
      }

    return (
      <>
        <UserProfileHeader navigation={this.props.navigation} />
        <View style={[styles.scrolledview]}>
            <View style={{flex:1, flexDirection:'column',marginTop:30}}>
                <View style={{alignSelf:"flex-start"}}>
                      <Text style={styles.username}>
                        {Capitalize(data.first_name)} {Capitalize(data.last_name)}
                        {data.verified && (
                          <AntDesign name="star" size={18} color={colors.gold} />
                        )}
                      </Text>
                      {data.verified && (
                        <Text style={{  color: colors.gray }}>
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
          {/* {!breakTime &&
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => this.props.navigation.navigate("AddPost")}
          >
            <AntDesign name="pluscircle" size={20} color={colors.white} />
            <Text style={styles.primaryBtnText}>Add Post</Text>
          </TouchableOpacity>
          } */}

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
          <TouchableOpacity style={styles.list}>
            <FontAwesome
              style={styles.listIcon}
              name="heart"
              size={22}
              color={colors.gray}
            />
            <View style={styles.listText}>
              <Text style={styles.text}>{Capitalize(data.marital_status)}</Text>
            </View>
            {data.marital_status === "in_relationship" &&
                Object.keys(Object.assign({}, data.relationship)).length >
                  0 && (
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        if(this.props.user.id!=data.relationship.id){
                          this.props.navigation.push("UserProfile", {
                            user_id: data.relationship.id,
                          });
                        }

                      }}
                      style={[ { alignItems: "center", flexDirection:"row" }]}
                    >
                    <Text>{" with "}</Text>
                    <Text style={{fontFamily:FontFamily.Medium, fontSize:17}}>{Capitalize(data.relationship.first_name)} {Capitalize(data.relationship.last_name)}</Text>
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
          </TouchableOpacity>
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
            style={styles.lightPrimaryBtn}
            onPress={() => this.props.navigation.navigate("EditProfile")}
          >
            <Text style={styles.lightPrimaryBtnText}>Edit Details</Text>
          </TouchableOpacity> */}
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
              data.accepted_friend.length > 1 &&
              data.accepted_friend.map((item, key) => {
                if (data.id === item.id) return null;
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("UserProfile", {
                        user_id: item.id,
                      })
                    }
                    style={[
                      styles.friendsGrid,
                      { justifyContent: "center", alignItems: "center" },
                    ]}
                    key={key}
                  >
                  <UserImage item={item} size={52} />
                    <Text style={[styles.textBold, styles.friendsGridName]}>
                      {item.first_name} {item.last_name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
          </View>
          {typeof data.accepted_friend !== "undefined" &&
            data.accepted_friend.length > 1 && (
              <TouchableOpacity
                style={styles.grayBtn}
                onPress={() => this.props.navigation.navigate("Friends", {
                  screen: "AllFriends",
                  initial: false,
                })}
              >
                <Text style={styles.grayBtnText}>See All Friends</Text>
              </TouchableOpacity>
            )}
            {!!this.props.media.total>0 &&
            <>
            <Divider style={styles.separator} />
            <View style={styles.picturesList}>
              <Text style={styles.heading}>Pictures</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("MyPictures", {user_id:this.props.user.id})}
              >
                <Text style={styles.lightPrimaryBtnText}>See All</Text>
              </TouchableOpacity>
            </View>

            <View style={{height:300}}>
              <FbGrid
                  images={attachments}
                  onPress={() => this.props.navigation.navigate("MyPictures", {user_id:this.props.user.id})}
                  count={this.props.media.total}
                />
            </View>
            </>
            }
        </View>
        <Divider style={styles.separator} />
      </>
    );
  };

  onPress = (url, index, event) => {
    // url and index of the image you have clicked alongwith onPress event.
  }

  render() {
    const data = this.props.data;
    const breakTime = this.props.breakTime;
    const {introModalVisible} = this.state;
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
          <SavepostPopup ref={this.actionSheetRef} {...this.props} />
          <SharePopup ref={this.actionSheetRef2} {...this.props} />
        </View>
        {!!data.intro_video && (
            <Modal
                animationType="slide"   transparent={false}
                visible={introModalVisible}>
                <View style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "rgba(0, 0, 0, .7)",
                      }}>
                      <Video
                        source={{
                          uri: OptimizeImage(data.intro_video, "video"),
                        }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        ignoreSilentSwitch={"ignore"}
                        playsInSilentLockedModeIOS={ true }
                        resizeMode={Video.RESIZE_MODE_CONTAIN}
                        useNativeControls
                        isLooping={false}
                        PlaybackStatus={false}
                        style={{
                          width:windowWidth,
                          backgroundColor: "#fff",
                          aspectRatio: 4 / 3
                        }}
                      />
                      <TouchableOpacity style={{position:"absolute", left:10, top:20, zIndex:11}} onPress = {() => {this.toggleIntroModal(false)}}>
                          <Ionicons name="md-close-outline" size={36} color="white" />
                      </TouchableOpacity>
            </View>
          </Modal>
      )}
      </View>
    );
  }
}

const mapStateToProps = ({ Profile, User }) => {
  const user_id = User.user.id;
  return {
    user: User.user,
    breakTime:User.breakTime,
    data: Profile.data,
    media: typeof Profile.media !== "undefined" ? typeof Profile.media[user_id]!=="undefined"? Profile.media[user_id]:{} : {},
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/ProfileRedux");
  return {
    ...ownProps,
    ...stateProps,
    uploadProfile: (per_page, page) => {
      actions.uploadProfile(dispatch, per_page, page);
    },
    allUserMedia: (per_page, page, user_id) => {
      actions.allUserMedia(dispatch, per_page, page, user_id);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(MyProfile);
