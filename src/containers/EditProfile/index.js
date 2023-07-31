import * as React from "react";
import {
  Platform,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { Avatar, Divider } from "react-native-paper";
import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  Fontisto,
  Feather,
} from "@expo/vector-icons";
import { Video } from "expo-av";
import colors from "../../config/color/color";
import * as ImagePicker from "expo-image-picker";
import { UserImage } from "@components";
import * as FileSystem from "expo-file-system";
import ConnectyCube from "react-native-connectycube";
import moment from "moment";
import { Capitalize, PrivacyStatusName, OptimizeImage, getRandomString } from "@helpers";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";


class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intro_video: null,
      deafultImage:''
    };
    this.props.navigation.addListener('focus', () => {
      this.getProfileImage();
    });
  }

  getProfileImage = async () =>{
   var userImg =  await AsyncStorage.getItem("UserProfileImage");
   console.log('userimg',userImg);
    this.setState({deafultImage:userImg});
  }


  updateConnectyCubeUser = (uploadedFile) => {
    const updatedUserProfile = { avatar: uploadedFile.uid };
    return ConnectyCube.users.update(updatedUserProfile);
  };


  openImagePickerAsync = async (type) => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.cancelled) {
      // const imageName = pickerResult.uri.replace(/^.*[\\\/]/, '');
      // const fileType = pickerResult.type;
      // const access = { level: "public", contentType: fileType, };
      // fetch(pickerResult.uri).then(response => {
      //   response.blob()
      //     .then(blob => {
      //       Storage.put(`yasir/${imageName}`, blob, access)
      //         .then(succ => console.log(succ))
      //         .catch(err => console.log(err));
      //     });
      // });

      // const fileSystem = await FileSystem.getInfoAsync(pickerResult.uri);
      // console.log(fileSystem);
      // if (fileSystem.size > 2000000) {
      //   Alert.alert(
      //     "File size",
      //     "File size must be less or equal to 2MB",
      //     [
      //       {
      //         text: "OK",
      //       },
      //     ],
      //     { cancelable: false }
      //   );
      //   return false;
      // }
      if (type === "profile") {
        this.setState({deafultImage:pickerResult.uri});
        this.uploadPhoto(pickerResult);
        const fileSystem = await FileSystem.getInfoAsync(pickerResult.uri)
        const fileParams = {
          name: getRandomString(20),
          file: pickerResult,
          type: pickerResult.type,
          size: fileSystem.size,
          public: false,
        };

        ConnectyCube.storage
        .createAndUpload(fileParams)
        .then((updatedUser) => {
          this.updateConnectyCubeUser(updatedUser);
        })
        .catch((error) => {});
      } else {
        this.uploadBanner(pickerResult);
      }
    }
  };

  uploadPhoto = async (data) => {
    var formData = new FormData();
    var uri = Platform.OS === "android" ? data.uri : data.uri.replace("", "");
    var value = await AsyncStorage.getItem("userdata");
    var parse = JSON.parse(value);

    formData.append("profile_photo", {
      uri: uri,
      type: Platform.OS === "android" ? "image/jpeg" : data.type,
      name: data.filename || `filename${0}.` + uri.split(".").pop(),
    });

    this.props.uploadProfilePhoto(formData);
  };

  uploadBanner = (data) => {
    var formData = new FormData();
    var uri = Platform.OS === "android" ? data.uri : data.uri.replace("", "");
    formData.append("profile_banner", {
      uri: uri,
      type: Platform.OS === "android" ? "image/jpeg" : data.type,
      name: data.filename || `filename${0}.` + uri.split(".").pop(),
    });
    this.props.uploadProfileBanner(formData);
  };

  openVideoPickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      videoMaxDuration: 180,
      quality: 0.8,
    });

    if (!pickerResult.cancelled) {
      this.setState({ intro_video: pickerResult.uri });
      var formData = new FormData();
      var uri =
        Platform.OS === "android"
          ? pickerResult.uri
          : pickerResult.uri.replace("", "");
      formData.append("intro_video", {
        uri: uri,
        type: Platform.OS === "android" ? "image/jpeg" : pickerResult.type,
        name: pickerResult.filename || `filename${0}.` + uri.split(".").pop(),
      });
      this.props.uploadIntroVideo(formData);
    }
  };

  render() {
    const data = this.props.data;
    console.log('this.props.data',data);
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrolledview}>
          <View>
            <View style={styles.editHeading}>
              <Text style={styles.heading}>Profile Picture</Text>
              <TouchableOpacity
                onPress={() => this.openImagePickerAsync("profile")}
              >
                {this.props.photo_uploading ? (
                  <ActivityIndicator color={colors.gray} />
                ) : (
                  <Text style={styles.primarytext}>Edit</Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.ProfileAvatarContainer}>
              <TouchableOpacity
                onPress={() => this.openImagePickerAsync("profile")}
              >
              <UserImage size={144} item={data} />
              </TouchableOpacity>
            </View>
          </View>
          <Divider style={styles.separator} />
          <View>
            <View style={styles.editHeading}>
              <Text style={styles.heading}>Cover Photo</Text>
              <TouchableOpacity
                onPress={() => this.openImagePickerAsync("banner")}
              >
                {this.props.banner_uploading ? (
                  <ActivityIndicator color={colors.gray} />
                ) : (
                  <Text style={styles.primarytext}>Edit</Text>
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => this.openImagePickerAsync("banner")}
            >
              <Image
                source={{
                  uri: data.profile_banner
                    ? OptimizeImage(data.profile_banner)
                    : "https://live.lifewidgets.com/assets/starterHeader.jpg",
                }}
                style={styles.ProfileImageBackground}
              />
            </TouchableOpacity>
          </View>
          <Divider style={styles.separator} />

          <View>
            <View style={styles.editHeading}>
              <Text style={styles.heading}>Intro Video</Text>
              <Text style={{fontSize:12}}>(max 60 seconds)</Text>
              <TouchableOpacity onPress={this.openVideoPickerAsync}>
                {this.props.video_uploading ? (
                  <ActivityIndicator color={colors.gray} />
                ) : (
                  <Text style={styles.primarytext}>Edit</Text>
                )}
              </TouchableOpacity>
            </View>

            {!!!data.intro_video && this.state.intro_video ? (
              <TouchableOpacity onPress={this.openVideoPickerAsync}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <Feather name="video" size={100} color="black" />
                </View>
              </TouchableOpacity>
            ) : (
              <>
                <Video
                  source={{
                    uri:
                      this.state.intro_video ??
                      OptimizeImage(data.intro_video, "video"),
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
                    aspectRatio: 3 / 2,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                />
              </>
            )}
          </View>
          <Divider style={styles.separator} />
          <View>
            <View style={styles.editHeading}>
              <Text style={styles.heading}>Details</Text>
            </View>
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
                      {" "}
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
            {data.total_followers > 0 && (
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
          </View>
          <Divider style={styles.separator} />
          <View>
            <View style={styles.editHeading}>
              <Text style={styles.heading}>Basic Info</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("BasicInfo")}
              >
                <Text style={styles.primarytext}>Edit</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.listContainer}>
              <View style={styles.chipOpacity}>
                <FontAwesome5 name="user-alt" size={22} color={colors.black} />
              </View>
              <View style={styles.listContainerRight}>
                <View style={styles.listtitleContainer}>
                  <Text style={styles.titleBold}>
                    {Capitalize(data.gender)}
                  </Text>
                  <Text style={styles.textGray}>Gender</Text>
                </View>
              </View>
            </TouchableOpacity>
            {!!data.languages && data.languages != "null" && (
              <TouchableOpacity style={styles.listContainer}>
                <View style={styles.chipOpacity}>
                  <MaterialIcons
                    name="speaker-notes"
                    size={22}
                    color={colors.black}
                  />
                </View>
                <View style={styles.listContainerRight}>
                  <View style={styles.listtitleContainer}>
                    <Text style={styles.titleBold}>{data.languages}</Text>
                    <Text style={styles.textGray}>Languages</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.listContainer}>
              <View style={styles.chipOpacity}>
                <FontAwesome5
                  name="birthday-cake"
                  size={22}
                  color={colors.black}
                />
              </View>
              <View
                style={[
                  styles.listContainerRight,
                  styles.noBorder,
                  styles.noPadding,
                ]}
              >
                <View style={styles.listtitleContainer}>
                  <Text style={styles.titleBold}>
                    {data.date_of_birth?moment
                      .utc(data.date_of_birth)
                      .local()
                      .format("MMMM DD, Y"):"Change your birthday"}
                  </Text>
                  <Text style={styles.textGray}>Birthday</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <Divider style={styles.separator} />
          <View>
            <View style={styles.editHeading}>
              <Text style={styles.heading}>Contact Info</Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("ContactInfo")}
              >
                <Text style={styles.primarytext}>Edit</Text>
              </TouchableOpacity>
            </View>
            {!!data.phone_number && data.phone_number != "null" && (
              <TouchableOpacity style={styles.listContainer}>
                <View style={styles.chipOpacity}>
                  <FontAwesome name="phone" size={22} color={colors.black} />
                </View>
                <View style={styles.listContainerRight}>
                  <View style={styles.listtitleContainer}>
                    <Text style={styles.titleBold}>{data.phone_number}</Text>
                    <Text style={styles.textGray}>Mobile</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.listContainer}>
              <View style={styles.chipOpacity}>
                <MaterialIcons name="email" size={22} color={colors.black} />
              </View>
              <View
                style={[
                  styles.listContainerRight,
                  styles.noBorder,
                  styles.noPadding,
                ]}
              >
                <View style={styles.listtitleContainer}>
                  <Text style={styles.titleBold}>{data.email}</Text>
                  <Text style={styles.textGray}>Email</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <Divider style={styles.separator} />
          <View>
            <View style={styles.editHeading}>
              <Text style={styles.heading}>Relationship</Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("RelationshipInfo")
                }
              >
                <Text style={styles.primarytext}>Edit</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.listContainer}>
              <View style={styles.chipOpacity}>
                <FontAwesome5
                  name="hand-holding-heart"
                  size={22}
                  color={colors.black}
                />
              </View>
              <View
                style={[
                  styles.listContainerRight,
                  styles.noBorder,
                  styles.noPadding,
                ]}
              >
                <View style={styles.listtitleContainer}>
                  <Text style={styles.titleBold}>
                    {Capitalize(data.marital_status)}
                  </Text>
                  <View style={styles.reslationShipStatus}>
                    <Fontisto
                      style={styles.statusIcon}
                      name="earth"
                      size={12}
                      color={colors.gray}
                    />
                    <Text style={styles.textGray}>
                      {PrivacyStatusName(data.marital_status_privacy)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <Divider style={styles.separator} />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ Profile }) => {
  return {
    data: Profile.data,
    photo_uploading: Profile.photo_uploading,
    banner_uploading: Profile.banner_uploading,
    video_uploading: Profile.video_uploading,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/ProfileRedux");
  return {
    ...ownProps,
    ...stateProps,
    uploadProfilePhoto: (data) => {
      actions.uploadProfilePhoto(dispatch, data);
    },
    uploadProfileBanner: (data) => {
      actions.uploadProfileBanner(dispatch, data);
    },
    uploadIntroVideo: (data) => {
      actions.uploadIntroVideo(dispatch, data);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(EditProfile);
