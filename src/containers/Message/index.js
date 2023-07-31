import React, { Component, createRef } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Image,
  Pressable,
  Keyboard,
  Alert,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import {
  Entypo,
  Feather,
  FontAwesome,
  MaterialIcons,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { GiftedChat, Send, Bubble, Actions, ActionsProps, InputToolbar, Composer } from "react-native-gifted-chat";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import ChatService from "../../services/chat-service";
import { getRandomString, OptimizeImage } from "@helpers";
import * as FileSystem from "expo-file-system";
import { ChatBox } from "@components";
import { LifeWidget, Config } from "@common";
import * as ImagePicker from "expo-image-picker";
import ConnectyCube from "react-native-connectycube";
import store from "../../store";
import { Avatar } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import * as mime from "react-native-mime-types";
import * as Notifications from "expo-notifications";
import Dialog from "react-native-dialog";
import { ImageBackground } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "./styles";
import { Modalize } from 'react-native-modalize';
import { Portal } from 'react-native-portalize';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

class Chat extends Component {
  constructor(props) {
    super(props);
    ConnectyCube.chat.onMessageListener = this.onMessageListener.bind(this);
    ConnectyCube.chat.onReadStatusListener = this.onReadStatus.bind(this);
    ConnectyCube.chat.onSentMessageCallback = this.onSentMessageListener.bind(this)
    ConnectyCube.chat.onMessageTypingListener =
      this.onMessageTypingListener.bind(this);
    this.state = {
      cbId: this.props.route.params.connectyCubeId,
      image:false,
      setImage:false,
      uri:null
    };
    this.modalizeRef = React.createRef()
  }

  componentDidMount() {
    const { chatName, userImg, dialogId, chatType } = this.props.route.params;
    this.blurListener = this.props.navigation.addListener("blur", () => {
      this.props.navigation
        .dangerouslyGetParent()
        ?.setOptions({ tabBarVisible: true });
    });
    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.props.navigation
        .dangerouslyGetParent()
        ?.setOptions({ tabBarVisible: false });
    });
    this.props.navigation.setOptions({
      headerLeft: () => (
        <View
          style={{flexDirection: "row",alignItems:'center', height: 70, flex: 1}}
        >
            {Platform.OS === 'ios' ?
            <Ionicons style={{ marginLeft: 5,marginRight:5 }} name="chevron-back" size={32} color={colors.primary}
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
              :
              <Ionicons style={{ marginLeft: 10, marginRight:5 }} name="md-arrow-back-sharp" size={28} color={colors.primary}
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              />
            }
            {userImg ? (
              <Avatar.Image
                size={42}
                style={styles.avatarimage}
                source={{
                  uri: userImg,
                }}
              />
            ) : (
              <Avatar.Image size={42} style={styles.avatarimage} source={require("@images/avatar.png")} />
            )}
            <Text style={[styles.userName, { flex:1,maxWidth:120 }]} numberOfLines={1}>
              {chatName}
            </Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
            style={[styles.headRight, styles.chipOpcity]}
            onPress={this._openModalizePopup}
          >
            <Entypo name="dots-three-vertical" size={18} color={colors.primary} />
        </TouchableOpacity>
      ),
    });
    this.props.fetchChatMessage();
  }

  _openModalizePopup = () => {
    this.modalizeRef.current?.open();
  };

  backgroundImage = () => {
    const {communication_dialog, user} = this.props;
    if(this.state.uri){
      return this.state.uri;
    } else if(typeof communication_dialog.meta_data !=="undefined" && typeof communication_dialog.meta_data[user.id] !=="undefined"){
      return OptimizeImage(communication_dialog.meta_data[user.id].photo);
    }
    return null;
  }

  changeBackground = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [2, 2],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({uri:result.uri})
      var formData = new FormData();
      formData.append("file", {
        uri: result.uri,
        type: Platform.OS === "android" ? "image/jpg" : result.type,
        name: "file1.jpg",
      });
      const meta = await LifeWidget.uploadMetaData(formData);
      if(meta.status){
        const {communication_dialog, user} = this.props;
        const description = {[user.id]:{photo:meta.data}};
        const dialogParams = { description: JSON.stringify(description) };
        
        ConnectyCube.chat.dialog
          .update(communication_dialog._id, dialogParams)
          .then((dialog) => {
            this.props.setBackgroundChatImage(description, communication_dialog);
            //alert(JSON.stringify(dialog, null,2))
          })
          .catch((error) => {});
      }
    }
    
  };

  componentWillUnmount() {
    this.blurListener();
  }

  onMessageListener = (senderId, msg) =>{
    if(senderId!==this.props.user.cube_user_id){
      const params = {
        messageId: msg.id,
        userId: this.props.user.cube_user_id,
        dialogId: msg.dialog_id,
      };
      ConnectyCube.chat.sendReadStatus(params);
    }
    this.props.appendChatMessage(msg, this.props.communication_dialog);
  }

  onSentMessageListener(failedMessage, msg) {
    if(msg.type==="chat"){
      this.props.appendChatMessage(msg, this.props.communication_dialog);
    }
  }

  onReadStatus(messageId, dialogId, userId) {
  }

  onMessageDeleteListener = (messageId) => {
    this.props.deleteChatMessage(messageId, this.props.communication_dialog._id);
  };

  // //set value while typing message
  onTypeMessage = (messageText) => this.setState({ messageText });

  //Send message when click on the send button
  sendMessage = async (message) => {
    //Keyboard.dismiss();
    const { communication_dialog, user } = this.props;
    let { messageText } = this.state;
    messageText = message.length > 0 ? message[0].text : messageText;
    if (messageText.length <= 0) return;
    this.props.sendChatMessage(communication_dialog, messageText, user);


    //this.sendPushNotification(messageText);
    this.setState({ messageText: "" });
  };

  //send attachment when click on attachment button
  sendAttachment = async () => {
    Keyboard.dismiss();
    const img = await this.pickDocument();
    //if(img.file.type==="success"){
      const { communication_dialog, user } = this.props;
      this.props.sendChatMessage(communication_dialog, "", user, img);
    //}

  };

  //picking up nthe image
  onPickImage = () => {
    return ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      return image;
    });
  };

  //Selecting picture from gallery
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("Imagesizze", result);
    const str = result.uri.split(".");
    console.log(str[str.length - 1], "Image");
    return result;
  };

  //select the document from the internal storage
  pickDocument = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();
    const fileSystem = await FileSystem.getInfoAsync(result.uri)
    const documentData = {
      name: getRandomString(20),
      file: result,
      type: result.type,
      size: fileSystem.size,
      public: false,
    };
    return documentData;
  };

  //Get isTyping Status
  getIsTypingStatus = async () => {
    const opponentId = this.state.cbId; // for 1-1 chats
    //const dialogJid = ..; // for group chat
    console.log("istyingcal1111", opponentId);
    var ist = ConnectyCube.chat.sendIsTypingStatus(opponentId);
    var stop = ConnectyCube.chat.sendIsStopTypingStatus(opponentId);
    console.log("istyping", ist);
    console.log("stopping", stop);
    const userId = store.getState().currentUser.user.id;
    const dialogId = this.props.route.params.dialogId;
    const isType = true;
  };
  onMessageTypingListener = function (isTyping, userId, dialogId) {
    if (isTyping === true) {
      this.setState({ isType: true });
      console.log(
        "[ConnectyCube.chat.onMessageTypingListener] callback:",
        isTyping,
        userId,
        dialogId
      );
    } else {
      setTimeout(() => {
        this.setState({ isType: false });
        console.log(
          "[ConnectyCube.chat.onMessageTypingListener] callback:",
          isTyping,
          userId,
          dialogId
        );
      }, 5000);
    }
  };
  dailogDots = async () => {
    this.setState({ activIndicator: true });
    const listName = "myList";
    const userId = this.state.cbId;
    var name, items;
    var newItems = [];
    var respo = await ConnectyCube.chat.privacylist.getList(listName);
    await ConnectyCube.chat.privacylist.getList(listName).then((response) => {
      name = response.name;
      items = response.items;
    });
    if (name != "") {
      var bb = 0;
      for (var i = 0; i < items.length; i++) {
        if (items[i].user_id == userId) {
          if (bb === 0) {
            bb++;
            var aa = 0;
            for (var i = 0; i < items.length; i++) {
              if (items[i].user_id == userId) {
                if (aa === 0) {
                  aa++;
                  var actions = items[i].action;
                  if (actions == "deny") {
                    this.setState({
                      userBlockData: "Un Block",
                      dailogStateVisible: true,
                    });
                  } else {
                    this.setState({
                      userBlockData: "Block",
                      dailogStateVisible: true,
                    });
                  }
                }
              }
            }
          }
        }
      }
      if (bb === 0) {
        this.setState({ userBlockData: "Block", dailogStateVisible: true });
      }
    } else {
      this.setState({ userBlockData: "Block", dailogStateVisible: true });
    }
    console.log(this.state.dailogStateVisible, "dailogStateVisible");
    this.setState({ activIndicator: false });
  };
  dailogClickAlert = async () => {
    Alert.alert(`Do You Want to ${this.state.userBlockData} this user?`, "", [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
        style: "cancel",
      },
      { text: "OK", onPress: () => this.blockUser() },
    ]);
  };
  //block User  List
  blockUser = async () => {
    this.setState({ dailogStateVisible: false, activIndicator: true });
    const listName = "myList";
    const userId = this.state.cbId;
    var name, items;
    var newItems = [];
    var respo = await ConnectyCube.chat.privacylist.getList(listName);
    await ConnectyCube.chat.privacylist.getList(listName).then((response) => {
      name = response.name;
      items = response.items;
    });
    console.log(name, "name");
    if (name != "") {
      console.log(name, "namecheck");
      console.log(items, "items");
      var check = items.includes(userId);
      console.log(check, "asdds");
      var bb = 0;
      for (var i = 0; i < items.length; i++) {
        if (items[i].user_id == userId) {
          if (bb === 0) {
            bb++;
            var aa = 0;
            for (var i = 0; i < items.length; i++) {
              if (items[i].user_id == userId) {
                if (aa === 0) {
                  aa++;
                  console.log(aa, "asdds");
                  console.log(items[i].user_id, "conditionmatch");
                  var actions = items[i].action;
                  console.log(actions, "actions");
                  if (actions == "deny") {
                    items[i].action = "allow";
                    console.log(actions, "allowcase");
                  } else {
                    items[i].action = "deny";
                    console.log(actions, "blockcase");
                  }
                } else {
                  items[i].splice(items[i], 1);
                  console.log(items[i], "splicefsfdsfd");
                }
              }
            }
          }
        }
      }
      if (bb === 0) {
        var obj = { user_id: userId, action: "deny", mutualBlock: true };
        items.push(obj);
      }
      console.log(newItems, "newItems");
      const list = {
        name: name,
        items: items,
      };
      console.log(list, "list");
      var tt = await ConnectyCube.chat.privacylist
        .setAsDefault(null)
        .then(async () => await ConnectyCube.chat.privacylist.update(list))
        .then(
          async () => await ConnectyCube.chat.privacylist.setAsDefault(listName)
        )
        .catch((error) => {
          console.log(error, "Error12345");
        });
      console.log(tt, "result");
      this.updateBlockUserStatus();
    } else {
      console.log(json.data, "namecheck");
      const userId = this.state.cbId;
      var obj = { user_id: json.data[i].user.cube_user_id, action: "deny" };
      usersList.push(obj);
      console.log(usersList, "usersList");
      var list = { name: "myList", items: usersList };
      ConnectyCube.chat.privacylist.create(list).catch((error) => {});
      ConnectyCube.chat.privacylist.setAsDefault(list).catch((error) => {});
      this.updateBlockUserStatus();
    }
    this.setState({ activIndicator: false });
  };
  // update  updateBlockUserStatus
  updateBlockUserStatus = async () => {
    var Pasbloackdatas = "";
    if (this.state.userBlockData == "Un Block") {
      Pasbloackdatas = "unblock";
      console.log("Pasbloackdatas", Pasbloackdatas);
    } else {
      Pasbloackdatas = "block";
      console.log("Pasbloackdatas", Pasbloackdatas);
    }
    var formData = new FormData();
    formData.append("from_id", store.getState().currentUser.user.id);
    formData.append("block_id", this.state.cbId);
    formData.append("status", Pasbloackdatas);
    console.log("formdataparameterupdateBlockUserStatus", formData);
    const token = await AsyncStorage.getItem("usertoken");
    console.log("token", token);
    var instance = axios.create({
      baseURL: Config.lifeWidget.endpoint,
      timeout: 1000,
      headers: {
        "Content-Type": "multipart/form-data;",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    const dataUpload = await instance.post("/v1/store-block-user", formData);
    console.log("apiresponse", dataUpload);
    if (dataUpload.data.status_code === 200) {
    }
  };
  // handle Dailog Box
  handleDailogbox = async () => {
    this.setState({ dailogStateVisible: false });
  };

  // handle Wallpepar Dailog Box
  handleDailogbox1 = async () => {
    this.setState({ wallpeparDailog: false });
  };
  // handle Dailog Wallpepar
  handleWallpeparDailog = async () => {
    this.setState({ wallpeparDailog: !this.state.wallpeparDailog });
  };
  //get Open Default Gallery
  getWallpeparDocumentImage = async () => {
    this.setState({ wallpeparDailog: false });
    let result = await DocumentPicker.getDocumentAsync({ type: "image/*" });
    console.log("getWallpeparDocumentImage", mime.lookup(result.name));
    var documentData = {
      //   name: result.name,
      //   size: result.size,
      //   type: mime.lookup(result.name),
      uri: result.uri,
      type: Platform.OS === "android" ? "image/jpeg" : result.type,
      name: result.name || `filename${0}.` + uri.split(".").pop(),
    };
    console.log("getWallpeparDocumentImage", documentData);

    this.setState({
      GalleryPreview: true,
      SelectedGalleryImage: documentData.uri,
      PassoriginalImageData: documentData,
    });
    return documentData;
  };

  saveasDefailt = async () => {
    this.uploadPhoto();
  };
  saveasChatUser = async () => {
    var formData = new FormData();
    formData.append("user_id", store.getState().currentUser.user.id);

    formData.append("profile", this.state.PassoriginalImageData);
    formData.append("type", "custom");
    formData.append("old_user_id", this.state.cbId);
    formData.append("status", "gallery");
    console.log("formdataparameter", formData);
    const token = await AsyncStorage.getItem("usertoken");
    console.log("token", token);
    var instance = axios.create({
      baseURL: Config.lifeWidget.endpoint,
      timeout: 1000,
      headers: {
        "Content-Type": "multipart/form-data;",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    const dataUpload = await instance.post(
      "/v1/store-chat-wall-image",
      formData
    );
    console.log("apiresponse", dataUpload);
    if (dataUpload.data.status_code === 200) {
      this.setState({
        wallpeparDailog: false,
        dailogStateVisible: false,
        GalleryPreview: false,
      });
      this.getWallpeparImage();
      // this.props.navigation.navigate("ChatUserList");
    }
  };

  uploadPhoto = async () => {
    var formData = new FormData();
    formData.append("user_id", store.getState().currentUser.user.id);
    formData.append("profile", this.state.PassoriginalImageData);
    formData.append("type", "Default");
    formData.append("old_user_id", this.state.cbId);
    formData.append("status", "gallery");
    console.log("formdataparameter", formData);
    // console.log('this.props', this.props);
    const token = await AsyncStorage.getItem("usertoken");
    console.log("token", token);
    var instance = axios.create({
      baseURL: Config.lifeWidget.endpoint,
      timeout: 1000,
      headers: {
        "Content-Type": "multipart/form-data;",
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    });
    const dataUpload = await instance.post(
      "/v1/store-chat-wall-image",
      formData
    );
    console.log("apiresponse", dataUpload);
    if (dataUpload.data.status_code === 200) {
      this.setState({
        wallpeparDailog: false,
        dailogStateVisible: false,
        GalleryPreview: false,
      });
      this.getWallpeparImage();
      //this.props.navigation.navigate("ChatUserList");
    }
  };
  //Close gallery Preview
  CloseGalleryPreviewPopup = () => {
    this.setState({ GalleryPreview: false });
  };
  //gor to Predefined Wallpepar
  gotoWallpeparPredefined = () => {
    this.setState({ wallpeparDailog: false, dailogStateVisible: false });
    this.props.navigation.navigate("ImagePreview", {
      UserID: store.getState().currentUser.user.id,
      ChatUserID: this.state.cbId,
    });
  };

  // shouldComponentUpdate(nextProps, nextState){
  //     return nextState.dateChat != this.state.dateChat;
  //  }

  //render atccahment poup
  renderAttachmentPopup = () => {
    console.log("modalopen");
    this.setState({ modalVisible: true });
  };
  //set modal visible
  setModalVisible(visible) {
    this.setState({
      modalVisible: visible,
    });
  }

  deleteSelected = () => {
    console.log("ttt");
    this.setState({ showSelected: true });
  };

  //Select Message
  selectMessage = (id) => {
    if (this.state.temparr.includes(id) === true) {
      const index = this.state.temparr.indexOf(id);
      if (index > -1) {
        this.state.temparr.splice(index, 1);
      }
    } else {
      // this.state.deleteColor.push(id);
      this.state.temparr.push(id);
    }
    var sCount = this.state.temparr.length;
    this.setState({ deleteColor: this.state.temparr, selectedCount: sCount });
    console.log("deletedArray", this.state.temparr);
  };

  _keyExtractor = (item, index) => index.toString();

  //Delete Selected Item
  deleteSelectedMessage = async () => {
    this.setState({ activIndicator: true });
    var delet = await ConnectyCube.chat.message.delete(this.state.deleteColor);
    await this.getMessage();
    this.getMoreMessages();
    this.setState({
      activIndicator: false,
      deleteColor: [],
      showSelected: false,
      selectedCount: "",
    });
    console.log(delet, "delet");
  };

  //display the sent messages
  _renderMessageItem = (message) => {
    // console.log(message,'8377082821');
    return (
      <View style={{ flexDirection: "row" }}>
        {this.state.showSelected ? (
          <View style={{ width: "7%", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => {
                this.selectMessage(message.id);
              }}
            >
              {this.state.deleteColor.includes(message.id) ? (
                <AntDesign name="checkcircle" size={24} color="black" />
              ) : (
                <Entypo name="circle" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={{ width: this.state.showSelected ? "93%" : "100%" }}>
          <TouchableOpacity
            onPress={() => {
              this.deleteSelected();
            }}
          >
            <ChatBox
              message={message}
              currentUserCubeId={this.props.route.params.connectyCubeId}
              username={123}
              chatType={this.props.route.params.chatType}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderSend = (props) => {
    return (
            <Send {...props}
                disabled={!props.text}
                containerStyle={{
                 width: 35,
                 height: 35,
                 alignItems: 'center',
                 justifyContent: 'center',
                 marginHorizontal: 4,
                 paddingLeft:15,
                 paddingTop:2,
             }}>
              <View style={[styles.chipOpcityPrimary,{marginBottom:5}]}>
                <MaterialIcons name="send" size={18} color="white" />
              </View>
            </Send>
    );
  };
  renderInputToolbar = (props) => (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: colors.lightGray,
          paddingTop: 8,
          paddingBottom:6,
          paddingHorizontal:5
        }}
        primaryStyle={{ alignItems: 'center' }}
      />
    );
  renderComposer = (props) => (
    <>
      <TouchableOpacity
        style={[styles.chipOpcity, styles.sendIcon]}
        onPress={this.sendAttachment}
      >
        <AntDesign name="pluscircle" size={20} color={colors.primary} />
      </TouchableOpacity>
      <Composer
        {...props}
        textInputStyle={{
          color: colors.black,
          backgroundColor: colors.white,
          borderRadius: 6,
          paddingHorizontal: 12,
          height:40,
        }}
      />
    </>
);

  onLongPress = (context, message) => {
    if (message.sender_id === this.state.cbId) {
      //return;
    }
    Alert.alert(`Do You Want to delete this message?`, message.message, [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
        style: "cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => this.deleteMessage(message),
      },
    ]);
  };

  deleteMessage = (message) => {
    this.onMessageDeleteListener(message._id);
  };

  onLoadEarlier = () => {
    const {communication_dialog, history} = this.props;
    const lastMessage = history[history.length - 1];
    this.props.fetchMoreChatMessage(communication_dialog, lastMessage);
  }

  render() {
    const {is_more, is_loading} = this.props;
    const { messageText, activIndicator, isModal } = this.state;
    //console.log(this.state.dateChat,"this.state.dateChat");
    if (this.props.isChatFetching) {
      return (
        <View style={styles.indicator}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }
    return (

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "white" }}
        // keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 120}
        // showsVerticalScrollIndicator={false}
      >
      <View style={{ flex: 1, backgroundColor: "white" }}>
        {/* <StatusBar
          barStyle="light-content"
          backgroundColor="rgba(0,0,0,.2)"
          translucent={true}
        /> */}

        {this.state.showSelected ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: "#e3faf7",
              }}
              onPress={() => {
                this.deleteSelectedMessage();
              }}
            >
              <Text>
                Delete Selected{" "}
                {this.state.selectedCount > 0 ? this.state.selectedCount : null}{" "}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ showSelected: false });
              }}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderWidth: 1,
                borderRadius: 10,
                backgroundColor: "#e3faf7",
              }}
            >
              <Text>Cancle</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <ImageBackground
          style={{ flex: 1, width: null }}
          source={{ uri: this.backgroundImage() }}
        >
          <View style={{ flex: 1 }}>

              <GiftedChat
                loadEarlier={is_more}
                isLoadingEarlier={is_loading}
                onLoadEarlier={this.onLoadEarlier}
                messages={this.props.history}
                onSend={(messages) => this.sendMessage(messages)}

                renderInputToolbar={this.renderInputToolbar}
                 renderComposer={this.renderComposer}
                 renderSend={this.renderSend}
                alwaysShowSend={true}
                isKeyboardInternallyHandled={true}
                user={{
                  _id: this.state.cbId,
                }}
                onLongPress={this.onLongPress}
                renderBubble={(props) => {
                  return (
                    <Bubble
                      {...props}
                      textStyle={{
                        right: {
                          color: colors.white,
                          fontFamily: FontFamily.Regular,
                          fontSize: 15,
                        },
                        left: {
                          color: colors.black,
                          fontFamily: FontFamily.Regular,
                          fontSize: 15,
                        },
                      }}
                      wrapperStyle={{
                        left: {
                          padding: 5,
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 12,
                          borderBottomLeftRadius: 12,
                          borderBottomRightRadius: 12,
                          backgroundColor: colors.white,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                          marginBottom:10
                        },
                        right: {
                          padding: 5,
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                          borderBottomLeftRadius: 12,
                          borderBottomRightRadius: 0,
                          backgroundColor: colors.primary,
                          shadowColor: "#000",
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.22,
                          shadowRadius: 2.22,
                          elevation: 3,
                        },
                      }}
                    />
                  );
                }}
              />
          </View>
          {/* <SectionList
            inverted
            stickySectionHeadersEnabled={false}
            sections={this.state.dateChat}
            keyExtractor={this._keyExtractor}
            extraData={this.state.dateChat}
            renderItem={({ item }) => this._renderMessageItem(item)}
            renderSectionFooter={({ section: { title } }) => (
              <View style={styles.dateHeader}>
                <Text style={{ fontSize: 13 }}>{title}</Text>
              </View>
            )}
          /> */}

          <View>
            <Dialog.Container visible={this.state.dailogStateVisible}>
              <View style={styles.DailogMainContainer}>
                {this.state.isChatGroupOrNot != 2 ? (
                  <View style={styles.insideContainerDailog}>
                    <View style={styles.iconDailogscontaint}>
                      <Entypo name="block" size={30} color="#168BFC" />
                    </View>
                    <View style={styles.testcontentinnerDailog}>
                      <TouchableOpacity onPress={this.dailogClickAlert}>
                        <Text style={{ color: "#168BFC", fontSize: 18 }}>
                          {this.state.userBlockData}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}

                <View style={styles.insideContainerDailog}>
                  <View style={styles.iconDailogscontaint}>
                    <MaterialIcons name="wallpaper" size={30} color="#168BFC" />
                  </View>
                  <View style={styles.testcontentinnerDailog}>
                    <TouchableOpacity onPress={this.handleWallpeparDailog}>
                      <Text style={{ color: "#168BFC", fontSize: 18 }}>
                        Wallpaper
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Dialog.Button label="Cancel" onPress={this.handleDailogbox} />
            </Dialog.Container>
          </View>
          <View>
            <Dialog.Container visible={this.state.wallpeparDailog}>
              <View style={styles.DailogMainContainer}>
                <View style={styles.insideContainerDailog}>
                  <View style={styles.iconDailogscontaint}>
                    <Entypo name="image" size={30} color="#168BFC" />
                  </View>
                  <View style={styles.testcontentinnerDailog}>
                    <TouchableOpacity onPress={this.gotoWallpeparPredefined}>
                      <Text style={{ color: "#168BFC", fontSize: 18 }}>
                        Default
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.insideContainerDailog}>
                  <View style={styles.iconDailogscontaint}>
                    <Entypo name="attachment" size={30} color="#168BFC" />
                  </View>
                  <View style={styles.testcontentinnerDailog}>
                    <TouchableOpacity onPress={this.getWallpeparDocumentImage}>
                      <Text style={{ color: "#168BFC", fontSize: 18 }}>
                        Gallery
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Dialog.Button label="Cancel" onPress={this.handleDailogbox1} />
            </Dialog.Container>
          </View>
          <View>
            <Dialog.Container visible={this.state.GalleryPreview}>
              <View style={{ marginTop: -35, marginLeft: 77 }}>
                <TouchableOpacity
                  onPress={() => {
                    this.CloseGalleryPreviewPopup();
                  }}
                >
                  <Entypo
                    name="cross"
                    size={35}
                    color="#168BFC"
                    style={{ marginLeft: 225 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.DailogMainContainer1}>
                <View style={[styles.innerContainer]}>
                  <Image
                    style={styles.ImageStyles}
                    source={{ uri: this.state.SelectedGalleryImage }}
                  />
                </View>
              </View>
              <View style={styles.buttonContainerInner}>
                <View style={styles.buttonContainerInnerTextContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.saveasDefailt();
                    }}
                  >
                    <Text style={styles.buttonContainerInnerText}>
                      Set For All
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainerInnerTextContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.saveasChatUser();
                    }}
                  >
                    <Text style={styles.buttonContainerInnerText}>
                      Set Only Chat User
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Dialog.Container>
          </View>
        </ImageBackground>
        <Portal>
            <Modalize ref={this.modalizeRef} adjustToContentHeight={true}>
              <View style={styles.scrolledView}>
                  <TouchableOpacity
                    style={styles.listInline}
                    onPress={() => {
                      Alert.alert("Comming Soon", "This feauture will come soon!");
                    }}
                  >
                    <View style={[styles.chipOpcity,{backgroundColor:colors.primary}]}>
                      <Feather
                        name="phone-call"
                        size={16}
                        color={colors.white}
                      />
                    </View>
                    <Text style={styles.text}>Voice Call</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity
                  style={styles.listInline}
                  onPress={() => {
                    Alert.alert("Comming Soon", "This feauture will come soon!");
                  }}
                >
                  <View style={[styles.chipOpcity,{backgroundColor:colors.primary}]}>
                    <FontAwesome
                      name="video-camera"
                      size={18}
                      color={colors.white}
                    />
                    </View>
                  <Text style={styles.text}>video Call</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity
                  style={styles.listInline}
                  onPress={this.changeBackground}
                >
                  <View style={[styles.chipOpcity,{backgroundColor:colors.primary}]}>
                    <Ionicons
                      name="md-information-circle"
                      size={18}
                      color={colors.white}
                    />
                  </View>
                  <Text style={styles.text}>Change background</Text>
                </TouchableOpacity>
              </View>
          </Modalize>
        </Portal>
        </View>
      </KeyboardAvoidingView>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { chatType, dialogId, connectyCubeId } = ownProps.route.params;
  let communication_dialog;
  if (dialogId) {
    communication_dialog= dialogId;
  } else {
    communication_dialog = state.Message.lastDialog? Object.assign({}, state.Message.lastDialog, { _id: state.Message.lastDialog.id }):{};
  }
  return {
    user: state.User.user,
    history:
      typeof state.Message.history !== "undefined"
        ? typeof state.Message.history[communication_dialog._id] !== "undefined"
          ? state.Message.history[communication_dialog._id]
          : []
        : [],
    is_more:
        typeof state.Message.extra !== "undefined"
          ? typeof state.Message.extra[communication_dialog._id] !== "undefined"
            ? state.Message.extra[communication_dialog._id].is_more
            : false
          : false,
    is_loading:
          typeof state.Message.extra !== "undefined"
            ? typeof state.Message.extra[communication_dialog._id] !== "undefined"
              ? state.Message.extra[communication_dialog._id].is_loading
              : false
            : false,
    isChatFetching:
      typeof state.Message.isChatFetching !== "undefined"
        ? state.Message.isChatFetching
        : false,
    communication_dialog:communication_dialog
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const { chatType, dialogId, connectyCubeId } = ownProps.route.params;
  const { actions } = require("@redux/ChatRedux");
  let communication_dialog;
  if (dialogId) {
    communication_dialog = dialogId;
  }
  return {
    fetchChatMessage: () => {
      actions.fetchChatMessage(dispatch, communication_dialog, connectyCubeId);
    },
    fetchMoreChatMessage:(dialog, lastMessage) => {
      actions.fetchMoreChatMessage(dispatch, dialog, lastMessage);
    },
    deleteChatMessage: (message_id, id) => {
      actions.deleteChatMessage(dispatch, message_id, id);
    },
    sendChatMessage:(dialog, message, cube_id, attachment=null) => {
        actions.sendChatMessage(dispatch, dialog, message, cube_id, attachment);
    },
    appendChatMessage:(data, id) => {
        actions.appendChatMessage(dispatch, data, id);
    },
    setBackgroundChatImage:(data, dialog)=>{
      actions.setBackgroundChatImage(dispatch, data, dialog);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
