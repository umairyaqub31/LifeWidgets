import * as React from "react";
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import styles from "./styles";
import {
  FontAwesome,
  Ionicons,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import { OptimizeImage } from "@helpers";
import { LifeWidget } from "@common";

class GroupProfileHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      this.uploadCoverPhoto(pickerResult);
    }
  };

  uploadCoverPhoto = (res) => {
    const { item } = this.props;
    var formData = new FormData();
    var uri = Platform.OS === "android" ? res.uri : res.uri.replace("", "");
    formData.append("cover", {
      uri: uri,
      type: Platform.OS === "android" ? "image/jpg" : res.type,
      name: res.filename || `filename.` + uri.split(".").pop(),
    });

    this.props.uploadGroupCoverPhoto(item.id, formData);
  };

  componentDidMount() {
    this.getGroupMembers();
    this.props.navigation.addListener("focus", this.focus);
  }

  focus = () => {
    this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({ tabBarVisible: true });
  };

  getGroupMembers = async () => {
    const { item } = this.props;
    const json = await LifeWidget.groupMembers(6, 1, { group_id: item.id });
    if (json.data) {
      this.setState({ data: json.data });
    }
  };

  

  render() {
    const { item } = this.props;
    const { data } = this.state;
    let banner =
      "https://library.kissclipart.com/20180913/qq/kissclipart-friends-illustration-png-clipart-clip-art-dc26e1a3f72f4ebd.jpg";
    if (item.attachments) {
      banner = OptimizeImage(item.attachments.attachment_url);
    }
    return (
      <>
        <ImageBackground
          source={{ uri: banner }}
          style={styles.groupprofileimage}
        >
          <View
            style={[
              styles.overlay,
              item.attachments && { backgroundColor: "transparent" },
            ]}
          ></View>
          <View style={styles.tooldots}>
            {item.owner ? (
              <TouchableOpacity
                style={styles.opacitydots}
                onPress={this.openImagePickerAsync}
              >
                <MaterialCommunityIcons
                  name="camera-plus"
                  size={24}
                  color={colors.white}
                />
              </TouchableOpacity>
            ) : (
              <View />
            )}
            <TouchableOpacity
              style={styles.opacitydots}
              onPress={this.props.toolsPopup}
            >
              <Entypo
                name="dots-three-horizontal"
                size={24}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <View style={styles.groupdeatilheadercontainer}>
          <View style={styles.groupheadertitlecontainer}>
            <View style={{ marginRight: 10 }}>
              <Text style={styles.grouptitle}>{item.title}</Text>
              <View style={styles.groupstutusmember}>
                {item.general_privacy_id === 1 ? (
                  <Ionicons
                    name="earth"
                    size={20}
                    style={{ marginRight: 5 }}
                    color={colors.gray}
                  />
                ) : (
                  <FontAwesome
                    name="lock"
                    size={20}
                    style={{ marginRight: 5 }}
                    color={colors.gray}
                  />
                )}
                {item.general_privacy_id === 1 ? (
                  <Text style={styles.graytext}>Public group</Text>
                ) : (
                  <Text style={styles.graytext}>Private group</Text>
                )}
                <Text style={styles.dot}></Text>
                <Text style={styles.totalmembers}>{item.members_count}</Text>
                <Text style={styles.graytext}>
                  {item.members_count > 1 ? "Members" : "Member"}
                </Text>
              </View>
            </View>
            {/* <Ionicons
                name="ios-arrow-forward"
                size={22}
                color={colors.gray}
                style={{ marginTop: 0 }}
              /> */}
          </View>
          <View style={styles.mutualtextimagescontainer}>
            <Pressable
              style={styles.mutualimagescontainer}
              onPress={() =>
                this.props.navigation.navigate("GroupMembers", {
                  item: item,
                })
              }
            >
              {data.length > 0 &&
                data.map((item, key) =>
                  item.profile_photo ? (
                    <Image
                      size={32}
                      style={[
                        styles.mutualimages,
                        { marginLeft: -2, borderWidth: 1 },
                      ]}
                      source={{ uri: OptimizeImage(item.profile_photo) }}
                    />
                  ) : (
                    <Image
                      size={32}
                      style={[styles.mutualimages, { marginLeft: -2 }]}
                      source={require("../../../assets/images/avatar2.png")}
                    />
                  )
                )}
              {item.members_count > 10 && (
                <TouchableOpacity
                  style={styles.addPlusVIew}
                  onPress={() =>
                    this.props.navigation.navigate("GroupMembers", {
                      item: item,
                    })
                  }
                >
                  <Text style={styles.whiteText}>
                    {item.members_count - 10}
                  </Text>
                  <AntDesign name="plus" size={10} color={colors.white} />
                </TouchableOpacity>
              )}
            </Pressable>
            {item.member &&
              item.member.joined == 1 &&
              ((item.general_privacy_id === 1 && item.is_invite) || item.owner) && (
                <TouchableOpacity
                  style={styles.customchip}
                  onPress={() =>
                    this.props.navigation.navigate("GroupInviteFriend", {
                      group_id: item.id,
                    })
                  }
                >
                  <AntDesign
                    name="plus"
                    size={24}
                    size={14}
                    color={colors.white}
                  />
                  <Text style={styles.customchiptext}>Invite</Text>
                </TouchableOpacity>
              )}
          </View>

          {/* <View style={styles.mutualtextimagescontainer}>
              <View style={styles.mutualimagescontainer}>
                <Avatar.Image
                  size={32}
                  style={styles.mutualimages}
                  source={require("../../../assets/images/avatar2.png")}
                />
                <Avatar.Image
                  size={32}
                  style={[styles.mutualimages, { marginLeft: -2 }]}
                  source={require("../../../assets/images/avatar.png")}
                />
                <Avatar.Image
                  size={32}
                  style={[styles.mutualimages, { marginLeft: -2 }]}
                  source={require("../../../assets/images/avatar2.png")}
                />
                <Avatar.Image
                  size={32}
                  style={[styles.mutualimages, { marginLeft: -2 }]}
                  source={require("../../../assets/images/avatar.png")}
                />
                <Avatar.Image
                  size={32}
                  style={[styles.mutualimages, { marginLeft: -2 }]}
                  source={require("../../../assets/images/avatar2.png")}
                />
                <Avatar.Image
                  size={32}
                  style={[styles.mutualimages, { marginLeft: -2 }]}
                  source={require("../../../assets/images/avatar2.png")}
                />
                <TouchableOpacity style={styles.addPlusVIew}>
                    <AntDesign
                      name="plus"
                      size={18}
                      color={colors.white}
                    />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.customchip}
                onPress={() => this.props.navigation.navigate("GroupInvite")}
              >
                <AntDesign
                  name="plus"
                  size={14}
                  color={colors.white}
                />
                <Text style={styles.customchiptext}>Invites</Text>
              </TouchableOpacity>
            </View> */}
        </View>

        {/* {item.member && item.member.joined==1 &&
            <View style={{margin:10}}>
            <TouchableOpacity
            style={styles.primarybtn}
            onPress={this.selectGroup}
          >
            <AntDesign name="pluscircle" size={20} color={colors.white} />
            <Text style={styles.primarybtntext}>{" Add Post"}</Text>
          </TouchableOpacity>
          </View>
          } */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isUploading: state.Group.isUploading,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/GroupRedux");
  return {
    ...ownProps,
    ...stateProps,
    uploadGroupCoverPhoto: (group_id, data) => {
      actions.uploadGroupCoverPhoto(dispatch, group_id, data);
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(GroupProfileHead);