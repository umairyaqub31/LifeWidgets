import * as React from "react";
import {
  Alert,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
  TextInput,
  Keyboard,
  LayoutAnimation,
  KeyboardAvoidingView,
  ActivityIndicator,
  NativeModules,
  StatusBarIOS,
  ImageBackground,
} from "react-native";
import styles from "./styles";
import {
  Feather,
  Ionicons,
  FontAwesome5,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import Dialog, {
  DialogContent,
  DialogTitle,
  ScaleAnimation,
} from "react-native-popup-dialog";
import colors from "../../config/color/color";
import { Divider, Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { AddPostFeedStatus, AddPostPrivacyStatus, UserImage } from "@components";
import { connect } from "react-redux";
import { Video } from "expo-av";
import { ScrollView } from "react-native-gesture-handler";
import * as Permissions from "expo-permissions";
import { Capitalize, OptimizeImage } from "@helpers";
import { Config } from "@common";

const windowWidth = Dimensions.get("window").width;
const { StatusBarManager } = NativeModules;

class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {},
      show: false,
      flexDirection: "column",
      isKeyboardShowed: false,
      setImage: [],
      Image: [],
      translateValue: new Animated.Value(0),
      text: "",
      files: [],
      user_ids: [],
      tags: [],
      statusBarHeight: 0,
      triggerDelay: false,
    };
    this.selectStatusactionSheetRef = React.createRef();
    this.privacyactionSheetRef = React.createRef();
    this.triggerDelay;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        this.state.translateValue.setValue(Math.max(0, 0 + gestureState.dy));
      },
      onPanResponderRelease: (e, gesture) => {
        if (gesture.moveY > 400) {
          this.setState({ show: true });
        }

        //this.changeLayout();
        const shouldOpen = gesture.vy <= 0;
        Animated.spring(this.state.translateValue, {
          toValue: shouldOpen ? 0 : 0,
          velocity: gesture.vy,
          tension: 0,
          friction: 8,
          useNativeDriver: true,
        }).start();
      },
    });
  }

  componentDidMount() {
    this.setState({triggerDelay:false})
    this.props.fetchCategories();
    this.props.setDefaultFetchStatus();
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headRightOpacity}
          onPress={this.submitPost}
        >
          {this.props.route.params ? (
            <Text style={styles.headRightText}>Save</Text>
          ) : (
            <Text style={styles.headRightText}>Post</Text>
          )}
        </TouchableOpacity>
      ),
    });

    this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({ tabBarVisible: false });
    StatusBarManager.getHeight((statusBarFrameData) => {
      this.setState({ statusBarHeight: statusBarFrameData.height });
    });
    this.statusBarListener = StatusBarIOS.addListener(
      "statusBarFrameWillChange",
      (statusBarData) => {
        this.setState({ statusBarHeight: statusBarData.frame.height });
      }
    );

    if (this.props.route.params) {

      if(typeof this.props.route.params.group !== "undefined"){

      } else {

        const item = this.props.route.params.item;
        console.log(item);
        if (item.general_privacy_id === 1) {
          this.props.setPostPrivacy({ name: "Public", id: 1 });
        } else if (item.general_privacy_id === 2) {
          this.props.setPostPrivacy({ name: "Friends", id: 2 });
        } else {
          this.props.setPostPrivacy({ name: "Only Me", id: 3 });
        }
        this.props.setPostDestination({ name: "News Feed", id: 0 });

        if (item.category_id) {
          this.props.setDefaultList(item.category_id);
          this.props.setPostPrivacy({ name: item.category.label, id: 3 });
          this.props.setPostDestination({ name: "List", id: 1 });
        }

        let form = {};
        form.post_id = item.id;
        form.post_text = item.post_text;
        form.tags = item.post_tags;
        var files = [];
        if (item.attachments.length > 0) {
          item.attachments.map((item, key) => {
            files.push({
              ...item,
              uri: OptimizeImage(item.attachment_url),
            });
          });
        }
        form.files = files;
        this.props.addPostForm(form);
      }

    } else {
      this.props.setDefaultList(null);
      this.props.setPostDestination({ name: "News Feed", id: 0 });
      this.props.setPostPrivacy({ name: "Public", id: 1 });
      this.props.addPostForm({});
    }
  }
  componentWillUnmount() {
    this.statusBarListener.remove();
  }
  toolsPopupButton = () => {
    Animated.spring(this.state.translateValue, {
      toValue: 0,
      velocity: 0,
      tension: 0,
      friction: 6,
      useNativeDriver: true,
    }).start();
    Keyboard.dismiss();
    this.changeLayout();
    this.setState({ show: false });
  };
  onPressKeyboardButton = () => {
    if (this.textInputField.isFocused()) {
      this.textInputField.blur();
    } else {
      this.textInputField.focus();
    }
  };

  requestCameraPermission = async () => {
    let permission = await Permissions.getAsync(Permissions.CAMERA);
    if (permission.status !== "granted") {
      permission = await Permissions.askAsync(Permissions.CAMERA);
    }

    return permission;
  };

  requestCameraRollPermission = async () => {
    let permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    return permission;
  };

  _takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    let files = Object.assign([], this.props.form.files);

    console.log(pickerResult);
    if (!pickerResult.cancelled) {
      files.push(pickerResult);
    }
    this.addPostForm("files", files);
  };

  _takeVideo = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      videoMaxDuration: 180,
    });
    let files = Object.assign([], this.props.form.files);

    console.log(pickerResult);
    if (!pickerResult.cancelled) {
      files.push(pickerResult);
    }
    this.addPostForm("files", files);
  };

  _takeLive = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      videoMaxDuration: 180,
    });
    let files = Object.assign([], this.props.form.files);

    console.log(pickerResult);
    if (!pickerResult.cancelled) {
      files.push(pickerResult);
    }
    this.addPostForm("files", files);
  };

  _addMedia = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      videoExportPreset: ImagePicker.VideoExportPreset.H264_640x480
    });
    let files = Object.assign([], this.props.form.files);

    console.log(pickerResult);
    if (!pickerResult.cancelled) {
      files.push(pickerResult);
    }
    this.addPostForm("files", files);
  };

  handleKeyboardDidHide = (event) => {
    //this.changeLayout();
    this.setState({ isKeyboardShowed: false });
  };

  handleKeyboardDidShow = (event) => {
    Animated.spring(this.state.translateValue, {
      toValue: 0,
      velocity: 10,
      tension: 1,
      friction: 9,
    }).start();
    this.changeLayout();
    this.setState({ show: true, isKeyboardShowed: true });
  };

  changeLayout = () => {
    if (this.state.flexDirection === "column" && this.state.show === false) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ flexDirection: "row" });
    } else {
      //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ flexDirection: "column" });
    }
  };

  groupClick = () => {
    this.props.groupClick(this.props.group);
  };

  groupClick1 = () => {
    this.props.groupClick1(this.props.group1);
  };

  groupClick2 = () => {
    this.props.groupClick2(this.props.group2);
  };

  newsfeedClick = () => {
    this.props.newsfeedClick(this.props.post_status);
  };

  onChangeHandler = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.interval = setTimeout(() => this.setState({ show: true }), 500);
  };

  _handlePress = (text) => {
    this.setState({ text });
  };

  createFormData = (files, body, tags = []) => {
    const data = new FormData();
    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    files.forEach((item, i) => {
      var uri = Platform.OS === "android" ? item.uri : item.uri.replace("", "");
      data.append("files[" + i + "]", {
        uri: uri,
        type: item.type,
        name: item.filename || `filename${i}.` + uri.split(".").pop(),
      });
    });

    tags.forEach((item, i) => {
      data.append("user_ids[" + i + "]", item);
    });

    return data;
  };

  submitPost = () => {
    var formData = new FormData();
    formData.append(
      "general_privacy_id",
      this.props.defaultPrivacy ? this.props.defaultPrivacy.id : 1
    );
    if(this.props.defaultPostDestination.name==="Group"){
      formData.append("group_id", this.props.defaultList);
    }
    if(this.props.defaultPostDestination.name==="List"){
      formData.append("category", this.props.defaultList);
    }

    let form = this.props.form;
    Object.keys(form).map(function (key) {
      if (key === "files" && form[key]) {
        form[key].forEach((item, i) => {
          var uri =
            Platform.OS === "android" ? item.uri : item.uri.replace("", "");
          formData.append("files[" + i + "]", {
            uri: uri,
            type: Platform.OS === "android" ? "image/jpg" : item.type,
            name: item.filename || `filename${i}.` + uri.split(".").pop(),
          });
        });
      } else if (key === "tags") {
        form[key].forEach((item, i) => {
          formData.append("user_ids[" + i + "]", item.id);
        });
      } else {
        formData.append(key, form[key]);
      }
    });

    if(!this.props.isProcessing){
      clearTimeout(this.triggerDelay);
      this.triggerDelay = setTimeout(() => {
        this.setState({ triggerDelay: true });
      }, 7000);

      this.props.submitPost(formData);
    }


  };

  removeMedia = (index) => {
    let files = [...this.props.form.files];
    files.splice(index, 1);
    this.addPostForm("files", files);
  };

  submitTags = (tags) => {
    let user_ids = [];
    tags.map((item, key) => {
      user_ids.push(item.id);
    });
    this.addPostForm("tags", tags);
  };

  addPostForm = (key, value) => {
    let form = Object.assign({}, this.props.form);
    form[key] = value;
    this.props.addPostForm(form);
  };

  render() {
    const form = Object.assign({}, this.props.form);
    let list = null;
    if (this.props.defaultList) {
      list = this.props.categories.filter(
        (e) => e.id === this.props.defaultList
      )[0];
    }

    let is_visible = false;
    if(this.props.isProcessing){
      if(this.state.triggerDelay){
        is_visible = false;
      } else {
        is_visible = true;
      }
    } else {
      is_visible = false;
    }
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={44 + this.state.statusBarHeight}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.scrolledview}>
              <View style={styles.profileimage}>
              <UserImage item={this.props.user}  style={styles.avatarimage} size={52} />
                <View>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <Text style={styles.username}>
                      {Capitalize(this.props.user.first_name)}{" "}
                      {Capitalize(this.props.user.last_name)}
                    </Text>
                    {form && form.tags &&
                      form.tags.length > 0 && (
                        <Text style={[styles.textgray, styles.withText]}>
                          is with
                        </Text>
                      )}
                  </TouchableOpacity>
                  {form && form.tags && (
                    <Text style={[styles.username]}>
                      {typeof form.tags[0] !== "undefined"
                        ? form.tags[0].first_name
                        : ""}{" "}
                      {form.tags.length > 1 &&
                        ` and ${form.tags.length - 1} others`}
                    </Text>
                  )}
                  <View style={styles.statusgridcontainer}>
                    <TouchableOpacity
                      style={styles.statusgrid}
                      onPress={() =>
                        this.selectStatusactionSheetRef.current.modalizeOpen()
                      }
                    >
                      <Text style={[styles.textgray, styles.statusSpacing]}>
                        {this.props.defaultPostDestination
                          ? this.props.defaultPostDestination.name
                          : "News Feed"}
                      </Text>
                      <Ionicons
                        name="caret-down"
                        size={15}
                        color={colors.gray}
                      />
                    </TouchableOpacity>
                    <View
                      pointerEvents={this.props.pointerEvents}
                      style={{ opacity: this.props.opacity }}
                    >
                      <TouchableOpacity
                        style={styles.statusgrid}
                        onPress={() =>
                          this.privacyactionSheetRef.current.modalizeOpen()
                        }
                      >
                        <FontAwesome5
                          name={this.props.icon}
                          size={12}
                          color={colors.gray}
                        />
                        <Text style={[styles.textgray, styles.statusSpacing]}>
                          {this.props.defaultPrivacy
                            ? this.props.defaultPrivacy.name
                            : "Public"}
                        </Text>
                        <Ionicons
                          name="caret-down"
                          size={15}
                          color={colors.gray}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
              <TouchableOpacity>
                <TextInput
                  multiline
                  numberOfLines={4}
                  style={styles.postTextarea}
                  placeholder="What's on your mind?"
                  onChange={this.onChangeHandler}
                  onFocus={this.onChangeHandler}
                  value={form.post_text??""}
                  returnKeyLabel={"next"}
                  onChangeText={(text) => this.addPostForm("post_text", text)}
                  ref={(ref) => {
                    this.textInputField = ref;
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.mediaContainer}>
              {form.files &&
                form.files.map((item, index) => (
                  <View key={index} style={{ width: "50%" }}>
                    {item.type === "image" && (
                      <ImageBackground
                        key={index}
                        style={{
                          width: windowWidth,
                          height: 200,
                          resizeMode: "cover",
                          borderWidth: 1,
                          borderColor: "#ccc",
                        }}
                        source={{ uri: item.uri }}
                      >
                        <TouchableOpacity
                          style={styles.mediaBoxButton}
                          onPress={() => this.removeMedia(index)}
                        >
                          <MaterialIcons
                            name="cancel"
                            size={24}
                            color={colors.primary}
                          />
                        </TouchableOpacity>
                      </ImageBackground>
                    )}
                    {item.type === "video" && (
                      <View>
                        <TouchableOpacity
                          style={[
                            styles.mediaBoxButton,
                            { position: "absolute" },
                          ]}
                          onPress={() => this.removeMedia(index)}
                        >
                          <MaterialIcons
                            name="cancel"
                            size={24}
                            color={colors.primary}
                          />
                        </TouchableOpacity>
                        <Video
                          source={{ uri: item.uri }}
                          rate={1.0}
                          volume={1.0}
                          isMuted={true}
                          resizeMode="cover"
                          useNativeControls
                          isLooping={false}
                          PlaybackStatus={false}
                          style={{
                            width: "100%",
                            height: 200,
                            alignSelf: "center",
                          }}
                        />
                      </View>
                    )}
                  </View>
                ))}
            </View>

            <AddPostFeedStatus
              ref={this.selectStatusactionSheetRef}
              {...this.props}
              newsfeedHandler={this.newsfeedClick}
              groupHandler={this.groupClick}
              groupHandler1={this.groupClick1}
              groupHandler2={this.groupClick2}
            />
            <AddPostPrivacyStatus ref={this.privacyactionSheetRef} />
          </ScrollView>
          {this.state.show ? (
            <>
              <View
                style={[
                  {
                    flexDirection: "row",
                    paddingTop: 10,
                    paddingBottom: 10,
                    borderWidth: 1,
                    borderColor: "#D3D3D3",
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 1,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    flex: 1,
                  }}
                >
                  <TouchableOpacity onPress={this._takePhoto}>
                    <Feather color={colors.primary} name="camera" size={22} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this._takeVideo}>
                    <Feather color="#F02849" name="video" size={22} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this._addMedia}>
                    <Ionicons name="images" size={24} color="#45BD62" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.toolsPopupButton}>
                    <Feather color="grey" name="more-horizontal" size={22} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={this.onPressKeyboardButton}
                    style={{ flex: 0.2, alignItems: "flex-end" }}
                  >
                    <MaterialIcons name="keyboard" size={22} color="grey" />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <Animated.View
              {...this.panResponder.panHandlers}
              style={[
                styles.animatedview,
                { transform: [{ translateY: this.state.translateValue }] },
              ]}
            >
              <View style={styles.popupclosehead}>
                <View style={styles.popupcloseLine}></View>
              </View>
              <View>
                <View style={styles.modallist}>
                  <TouchableOpacity
                    style={styles.modallistOpacity}
                    onPress={this._addMedia}
                  >
                    <View style={[styles.chipicon, styles.photochipicon]}>
                      <Ionicons name="images" size={24} color="#45BD62" />
                    </View>
                    <Text style={styles.text}>Photo/Video</Text>
                  </TouchableOpacity>
                </View>
                <Divider style={styles.separator} />
                <View style={styles.modallist}>
                  <TouchableOpacity
                    style={styles.modallistOpacity}
                    onPress={this._takeLive}
                  >
                    <View style={styles.chipicon}>
                      <Entypo name="camera" size={24} color={colors.primary} />
                    </View>
                    <Text style={styles.text}>Camera</Text>
                  </TouchableOpacity>
                </View>
                <Divider style={styles.separator} />
                <View style={styles.modallist}>
                  <TouchableOpacity
                    style={styles.modallistOpacity}
                    onPress={() =>
                      this.props.navigation.navigate("Tag", {
                        tags: Object.assign([], form.tags),
                        submitTags: this.submitTags,
                      })
                    }
                  >
                    <View style={styles.chipicon}>
                      <FontAwesome5
                        name="user-tag"
                        size={24}
                        color={colors.primary}
                      />
                    </View>
                    <Text style={styles.text}>Tag Friends </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          )}
        </View>
        <Dialog
          dialogStyle={{ borderRadius: 24 }}
          width={0.7}
          visible={is_visible}
          dialogAnimation={new ScaleAnimation()}
          onDismiss={() => {

            if (this.state.triggerDelay) {
              clearTimeout(this.triggerDelay);
              this.props.setTriggerReady();
              this.props.navigation.navigate("Feed");
              Alert.alert(
                "Warning!",
                "Your post taking longer than expected. We will notify you when your post is ready",
                [{ text: "OK" }]
              );
            } else {
              clearTimeout(this.triggerDelay);
              this.props.navigation.navigate("Feed");
            }
          }}
          dialogTitle={<DialogTitle title={"Posting..."} hasTitleBar={false} />}
        >
          <DialogContent>
            <ActivityIndicator size="large" color={colors.primary} />
          </DialogContent>
        </Dialog>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    defaultList: state.Post.defaultList,
    categories: state.Post.categories,
    defaultPostDestination: state.Post.defaultPostDestination,
    defaultPrivacy: state.Post.defaultPrivacy,
    isProcessing: state.Feed.isProcessing,
    form: state.Post.form,
    user: typeof state.Profile.data !== "undefined" ? state.Profile.data : state.User.user,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PostRedux");
  const { actions:feedActions } = require("@redux/FeedRedux");
  return {
    ...ownProps,
    ...stateProps,
    submitPost: (data) => {
      feedActions.submitPost(dispatch, data);
    },
    fetchCategories: () => {
      actions.fetchCategories(dispatch);
    },
    addPostForm: (form) => {
      dispatch(actions.addPostForm(form));
    },
    setPostPrivacy: (item) => {
      dispatch(actions.setPostPrivacy(item));
    },
    setPostDestination: (item) => {
      dispatch(actions.setPostDestination(item));
    },
    setDefaultList: (item) => {
      dispatch(actions.setDefaultList(item));
    },
    setDefaultFetchStatus: () => {
      dispatch(feedActions.setDefaultFetchStatus());
    },
    setTriggerReady: () => {
      dispatch(feedActions.feedTriggerReady());
    }
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(AddPost);
