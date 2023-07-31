import React, { Component } from "react";
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
  Dimensions,
  Pressable,
  Keyboard,
  Alert,
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

import { GiftedChat, Send, Bubble } from "react-native-gifted-chat";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import ChatService from "../../services/chat-service";

import {  ChatBox } from "@components";
import { LifeWidget, Config } from "@common";
import * as ImagePicker from "expo-image-picker";
import { DIALOG_TYPE } from "../../helpers/constants";
import ConnectyCube from "react-native-connectycube";
import store from "../../store";
import moment from "moment";
import { Avatar } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import * as mime from "react-native-mime-types";
import * as Notifications from "expo-notifications";
import { Message, FakeMessage } from "../../models/message";
import Dialog from "react-native-dialog";
import { ImageBackground } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export class Chat extends Component {
  constructor(props, route) {
    super(props);
    ConnectyCube.chat.onMessageListener = this.onMessageListener.bind(this);
    ConnectyCube.chat.onReadStatusListener = this.onReadStatus.bind(this);
    //ConnectyCube.chat.onMessageDeleteListener = this.onMessageDeleteListener.bind(this);
    ConnectyCube.chat.onMessageTypingListener =
      this.onMessageTypingListener.bind(this);
    this.state = {
      activIndicator: true,
      isModal: false,
      messageText: "",
      dialogs: [],
      history: [],
      dateChat: [],
      pushToken: "",
      visible: true,
      setVisible: "",
      cbId: this.props.route.params.connectyCubeId,
      dare: [],
      typing: false,
      isType: false,
      showSelected: false,
      deleteColor: [],
      temparr: [],
      selectedCount: "",
      friends: [],
      disbletext: false,
      userBlockData: "",
      dailogStateVisible: false,
      wallpeparDailog: false,
      backgroundProfile: "",
      GalleryPreview: false,
      //GalleryPreview:true,
      // SelectedGalleryImage:'http://lifewidgets.chetu.com/uploads/profile/1619870516.jpg',
      SelectedGalleryImage: "",
      PassoriginalImageData: "",
      userblockstatuscheck: false,
      dialog: "",
      isChatGroupOrNot: this.props.route.params.chatType,
    };
    if (this.props.navigation) {
      if (this.props.navigation.addListener) {
        this.props.navigation.addListener("focus", () => {
          this.getWallpeparImage();
        });
      }
    }
  }
  needToGetMoreMessage = null;
  componentWillUnmount(){
    this.blurListener();
  }

  //call one time when the page load
  async componentDidMount() {
    const {chatName, userImg, dialogId, chatType} = this.props.route.params;
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
      headerLeft: () => (<View style={[styles.headertitle,styles.messageTitleView,{flex:1}]}>
        <View style={styles.rowDirection}>
          <Pressable onPress={()=>this.props.navigation.goBack()}>
          <Entypo  name="chevron-left" size={24} color="black"  />
          </Pressable>
          {userImg?
          <Avatar.Image
            size={52}
            source={{
              uri: userImg,
            }}
          />
          :
          <Avatar.Image
            size={52}
            source={require("@images/avatar.png")}
          />
          }
          <Text style={[styles.headertitlename,styles.chatUserName]}>{chatName}</Text>
        </View>
      </View>),
      headerRight:()=> <View style={[styles.headericon,{flexDirection:'row', justifyContent:'space-evenly' }]}>
      <TouchableOpacity onPress={() => { Alert.alert("Comming Soon", "This feauture will come soon!")}}>
        <Feather name="phone-call" size={20} color={colors.primary} style={{marginLeft:25}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {Alert.alert("Comming Soon", "This feauture will come soon!")}}>
        <FontAwesome name="video-camera" size={22} color={colors.primary} style={{marginLeft:25}} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {Alert.alert("Comming Soon", "This feauture will come soon!")}}>
        <Ionicons name="md-information-circle" size={22} color={colors.primary} style={{marginLeft:15,marginRight:10}} />
      </TouchableOpacity>
    </View>,
    });
    this.props.fetchChatMessage();

    // this.getWallpeparImage();
    // this.getCheckStatus();
    // console.log(store.getState(), "check");

    // if (this.props.route.params.chatType == 2) {
    //   this.setState({
    //           dialog: this.props.route.params.dialogId,
    //           activIndicator: false,
    //         });
    // } else {
    //   let json = await LifeWidget.getToken(this.state.cbId);

    //   this.setState({ pushToken: json.data.cube_token });
    //   console.log(json.data.cube_token, "pushnotificationtoken");
    //   var check = ChatService.createPrivateDialog(this.state.cbId);
    //   check.then(async (dialog) => {
    //     ChatService.getMessages(dialog)
    //       .catch((e) => console.log(e))
    //       .then((amountMessages) => {
    //         amountMessages === 1000
    //           ? (this.needToGetMoreMessage = true)
    //           : (this.needToGetMoreMessage = false);
    //       });
    //   });
    // }
    // setTimeout(async () => {
    //   await this.getMessage();
    // }, 500);
  }

  //   //Navigation to details screen
  //   static goToDetailsScreen = (props) => {
  //     const isNeedFetchUsers = props.getParam('isNeedFetchUsers', false)
  //     if (this.state.dialog.type === DIALOG_TYPE.PRIVATE) {
  //       props.push('ContactDetails', { dialog: this.state.dialog })
  //     } else {
  //       props.push('GroupDetails', { dialog: this.state.dialog, isNeedFetchUsers })
  //     }
  //   }

  //get check Status
  getCheckStatus = async () => {
    let data1 = {
      from_id: this.state.cbId,
      block_id: store.getState().currentUser.user.id,
    };
    console.log("getCheckStatus", data1);
    let json = await LifeWidget.getblockuserstatus(data1);
    console.log(json, "getCheckStatusResult");
    if (json.data.status_code === 200) {
      var statusmain = json.data.user;
      // console.log('reshu1',statusmain);
      if (statusmain == null) {
        console.log("reshu1");
        this.setState({ userblockstatuscheck: false });
      } else {
        if (json.data.user.status == "block") {
          console.log("reshu2");
          this.setState({
            userblockstatuscheck: true,
          });
          console.log("reshu2", this.state.userblockstatuscheck);
        } else {
          console.log("reshu3");
          this.setState({
            userblockstatuscheck: false,
          });
        }
      }
    }
  };

  //get Wallpepar Image
  getWallpeparImage = async () => {
    let data1 = {
      user_id: store.getState().currentUser.user.id,
      old_user_id: this.state.cbId,
      type: "",
    };
    console.log("savedata", data1);
    let json = await LifeWidget.getWallpeparImage(data1);
    console.log(json, "getWallpeparImage");
    if (json.status_code === 200) {
      this.setState({ backgroundProfile: json.user.profile });
      console.log(this.state.backgroundProfile, "backgroundProfile");
    }
  };

  onMessageListener(senderId, msg) {
    console.log("11111111", msg);
    //const message = new Message(msg)
    //message.sender_id = senderId
    // const user = store.getState().currentUser
    // const dialog = this.getSelectedDialog();

    ConnectyCube.chat.message
      .list({
        chat_dialog_id: this.state.dialog.id,
        sort_desc: "date_sent",
      })
      .then((messages) => {
        console.log("reshu1111", messages.items);
        var messages1 = messages.items.map(
          (elem) => new Message(elem, store.getState().currentUser.user.id)
        );
        //this.setState({ history: messages1 });
        console.log("hsitroty77777", messages1);
        console.log(
          this.createSectionListData(this.state.history),
          "mychat history"
        );
      })
      .catch((error) => {
        console.log(error, "errorr");
      });
  }

  // ConnectyCube listeners
  onReadStatus(messageId, dialogId, userId) {
    console.log("message read", msg);

    store.dispatch(
      updateMessages(dialogId, messageId, { send_state: STATUS_READ })
    );
    ConnectyCube.chat.message
      .list({
        chat_dialog_id: this.state.dialog.id,
        sort_desc: "date_sent",
      })
      .then((messages) => {
        console.log("rsshutasklistbind", message.items);
        var messages1 = messages.items.map(
          (elem) => new Message(elem, store.getState().currentUser.user.id)
        );
        //this.setState({ history: messages1 });
        this.createSectionListData(this.state.history);
        console.log("mychat history");
      })
      .catch((error) => {
        console.log(error, "errorr");
      });
  }

  getSelectedDialog = () => {
    return store.getState().selectedDialog;
  };

  onMessageDeleteListener = (messageId) => {
    this.props.deleteChatMessage(messageId)
    //const history = this.state.history.filter((message) => message._id !== messageId);
    //this.setState({history})
  }

  //convert data into the section list formate
  createSectionListData(data) {
    console.log("7042706285111111111111", data);
    data.reduce((re, o) => {
      let existObj = re.find(
        (obj) =>
          obj.title ===
          moment(new Date(o.date_sent * 1000)).format("YYYY MMM D")
      );
      if (existObj) {
        existObj.data.push(o);
      } else {
        re.push({
          title: moment(new Date(o.date_sent * 1000)).format("YYYY MMM D"),
          data: [o],
        });
      }
      console.log(re, "789ffff789");
      this.setState({ dateChat: re, activIndicator: false });
      return re;
    }, []);
  }

  //for getting the messages
  async getMessage() {
    if (this.props.route.params.chatType == 2) {
      await ConnectyCube.chat.message
        .list({
          chat_dialog_id: this.props.route.params.dialogId._id,
          sort_desc: "date_sent",
        })
        .then((messages) => {

            let history = [];
            let items = messages.items ?? [];
            for (var i = 0; i < items.length; i++) {
              history[i] = {
                ...items[i],
                text: items[i].message,
                createdAt: items[i].created_at,
                user: { _id: items[i].recipient_id },
                image:
                  items[i].attachments.length > 0
                    ? ConnectyCube.storage.privateUrl(
                        items[i].attachments[0].uid
                      )
                    : "",
              };
            }
            this.setState({ history: history });
        })
        .catch((error) => {
          console.log(error, "errorr");
        });
      this.setState({ activIndicator: false });

      this.setState({ monthToStart: 1, activIndicator: false });
      // console.log(this.state.history, 'mychat history');
    } else {
      var check = ChatService.createPrivateDialog(this.state.cbId);
      check.then(async (newDialog) => {
        await ConnectyCube.chat.message
          .list({
            chat_dialog_id: newDialog.id,
            sort_desc: "date_sent",
          })
          .then((messages) => {
            //alert(JSON.stringify(messages.items, null,2))
            //ConnectyCube.storage.privateUrl

            let history = [];
            let items = messages.items ?? [];
            for (var i = 0; i < items.length; i++) {
              history[i] = {
                ...items[i],
                text: items[i].message,
                createdAt: items[i].created_at,
                user: { _id: items[i].recipient_id },
                image:
                  items[i].attachments.length > 0
                    ? ConnectyCube.storage.privateUrl(
                        items[i].attachments[0].uid
                      )
                    : "",
              };
            }
            this.setState({ history: history });
            console.log("reshu1111", messages.items);

            var messages1 = messages.items.map(
              (elem) => new Message(elem, store.getState().currentUser.user.id)
            );

            console.log(
              this.createSectionListData(this.state.history),
              "mychat history"
            );
          })
          .catch((error) => {
            console.log(error, "errorr");
          });
        this.setState({ dialog: newDialog, activIndicator: false });
      });
      this.setState({ monthToStart: 1, activIndicator: false });
      console.log(this.state.history, "mychat history");
    }
  }

  //for downloading the attachment
  downloadFile = async (remoteUrl, localPath, name) => {
    const fileUri = FileSystem.documentDirectory + filename;
    const url = fileRoute;

    let downloadObject = FileSystem.createDownloadResumable(url, fileUri);
    let response = await downloadObject.downloadAsync();
    console.log(response, "ddddd888888888888");
  };

  //Sending Push Notification
  sendPushNotification = async (textMessage) => {
    console.log(this.state.pushToken, "testpushnotification");
    const message = {
      to: this.state.pushToken,
      sound: "default",
      title: store.getState().currentUser.user.email,
      body: textMessage,
      data: {
        connectyCubeId: store.getState().currentUser.user.id,
        chatName: store.getState().currentUser.user.full_name,
        userImg: store.getState().currentUser.user.avatar,
        refreshList: this.props.route.params.refreshList(),
        type:"chat"
      },
    };
    let response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    console.log(response, "testpushnotification");
  };

  //Getting more message form connectycube
  getMoreMessages = () => {
    const { dialog } = this.state;
    this.createSectionListData(
      store.getState().messages[this.props.route.params.dialogId.id]
    );

    if (this.needToGetMoreMessage) {
      this.setState({ activIndicator: true });
      ChatService.getMoreMessages(dialog).then((amountMessages) => {
        amountMessages === 100
          ? (this.needToGetMoreMessage = true)
          : (this.needToGetMoreMessage = false);
      });
    }
  };

  // //set value while typing message
  onTypeMessage = (messageText) => this.setState({ messageText });

  //Send message when click on the send button
  sendMessage = async (message) => {
    Keyboard.dismiss();
    const { dialog } = this.state;
    let { messageText } = this.state;
    messageText = message.length > 0 ? message[0].text : messageText;
    if (messageText.length <= 0) return;
    console.log("here", dialog);
    await ChatService.sendMessage(dialog, messageText);
    this.sendPushNotification(messageText);
    this.setState({ messageText: "" });

    console.log(store.getState(), "tytytytytytytytytytytyty");
    await this.getMessage();
  };

  //send attachment when click on attachment button
  sendAttachment = async () => {
    Keyboard.dismiss();
    const { dialog } = this.state;
    const img = await this.pickDocument();
    await ChatService.sendMessage(dialog, "", img);
    console.log("ChteuImagesend", img);
    console.log(store.getState(), "dhjsdhjsdhjsdhjsdhjsd");
    await this.getMessage();
    this.getMoreMessages();
    ConnectyCube.chat.message
      .list({
        chat_dialog_id: this.state.dialog.id,
        sort_desc: "date_sent",
      })
      .then((messages) => {
        //this.setState({ history: messages });
        this.sendPushNotification("Attachment");
        console.log(
          this.createSectionListData(this.state.history),
          "mychat history"
        );
      })
      .catch((error) => {
        console.log(error, "errorr");
      });
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
    let result = await DocumentPicker.getDocumentAsync({});
    console.log("documentresult", mime.lookup(result.name));
    var documentData = {
      name: result.name,
      size: result.size,
      type: mime.lookup(result.name),
      uri: result.uri,
    };
    console.log("documentresult", documentData);
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
      <View>
        <View style={[styles.bottomInputView]}>
        <TouchableOpacity
            style={[styles.button, styles.sendIcon]}
            onPress={this.sendAttachment}
          >
          <AntDesign name="pluscircle" size={24} color="black" />
          </TouchableOpacity>
          <Send {...props} containerStyle={{ height: 30, width: 30}}>
          <View style={{backgroundColor:colors.primary,width:35,marginLeft:-10,borderRadius:40,height:35,alignItems:'center',justifyContent:'center'}}>
            <MaterialIcons name="send" size={18} color="white" />
          </View>
          </Send>
        </View>
      </View>
    );
  };

  onLongPress = (context, message) => {
    if(message.sender_id===this.state.cbId){
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
      { text: "Delete", style: "destructive",  onPress: () => this.deleteMessage(message) },
    ]);
  };

  deleteMessage = (message) => {
    this.onMessageDeleteListener(message._id);
  }

  render() {
    const { messageText, activIndicator, isModal } = this.state;
    //console.log(this.state.dateChat,"this.state.dateChat");
    const openMenu = () => {
      this.setState({ setVisible: true });
    };
    if(this.props.isChatFetching){
      return <View style={styles.indicator}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>;
    }
    return (
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "white" }}
        behavior={Platform.OS === "android" ? "padding" : null}
        //keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 120}
      >
        <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,.2)" translucent = {true}/>
        {/* {activIndicator && (
          <View style={styles.indicator}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )} */}
        {/* <View style={styles.mainHeaderContainer}>
<View style={{width:'10%'}}>
<Entypo style={{marginTop:10,marginLeft:7}}  name="chevron-left" size={24} color="black" onPress={()=> {this.props.route.params.refreshList(); this.props.navigation.navigate('ChatUserList')}} />
</View>
<View style={{marginLeft:3,width:'15%'}}>
{this.state.userblockstatuscheck ?
<Image style={styles.chatImage1} source={require('../../../assets/images/block.jpg')}  />
           :
           <View>
      { this.props.route.params.userImg ?
            <Image style={styles.chatImage1} source={{ uri: this.props.route.params.userImg }} />
          :
            <Image style={styles.chatImage1} source={require('../../../assets/images/avatar.png')} />
         }
           </View>
       }
</View>
<View style={{marginLeft:1,width:'35%'}}>
     <Text numberOfLines={1}  style={[styles.chatUserName]}>{  this.props.route.params.chatName}</Text>
        {this.state.isType ?
       <Text style={{fontSize:15,color:'green'}}>Typing....</Text>
        :
        null
      }
      </View>
<View style={{paddingTop:10,width:'10%',marginLeft:20}}>
<TouchableOpacity onPress={() => { Alert.alert("Comming Soon", "This feauture will come soon!")}}>
        <Feather name="phone-call" size={22} color={colors.black} style={{marginLeft:10}} />
      </TouchableOpacity>
</View>
<View style={{paddingTop:10,width:'10%',marginLeft:5}}>
<TouchableOpacity onPress={() => {Alert.alert("Comming Soon", "This feauture will come soon!")}}>
        <FontAwesome name="video-camera" size={25} color={colors.black} style={{marginLeft:10}} />
      </TouchableOpacity>
</View>
<View  style={{paddingTop:10,width:'10%',marginLeft:5}}>
<TouchableOpacity onPress={this.dailogDots}>
        <Ionicons name="md-information-circle" size={25} color={colors.black} style={{marginLeft:10}} />
      </TouchableOpacity>
</View>
       </View> */}

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
          source={{ uri: this.state.backgroundProfile }}
        >
          <View style={{ flex: 1}}>
            <GiftedChat
              messages={this.props.history}
              onSend={(messages) => this.sendMessage(messages)}
              renderSend={this.renderSend}
              // textInputStyle={{marginLeft:40}}
              user={{
                _id: this.state.cbId,
              }}
              onLongPress={this.onLongPress}
              renderBubble={props => {
                return (
                  <Bubble
                    {...props}

                    textStyle={{
                      right: {
                        color: colors.white,
                        fontFamily: FontFamily.Regular,
                        fontSize:15
                      },
                      left: {
                        color: colors.black,
                        fontFamily: FontFamily.Regular,
                        fontSize:15
                      },
                    }}
                    wrapperStyle={{
                      left: {
                        padding:6,
                        borderTopLeftRadius:0,
                        borderTopRightRadius:20,
                        borderBottomLeftRadius:20,
                        borderBottomRightRadius:20,
                        backgroundColor: colors.white,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 6,
                        },
                          shadowOpacity: 0.37,
                          shadowRadius: 7.49,
                          elevation: 12,
                        },
                      right: {
                        padding:6,
                        borderTopLeftRadius:20,
                        borderTopRightRadius:20,
                        borderBottomLeftRadius:20,
                        borderBottomRightRadius:0,
                        backgroundColor: colors.primary,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 0,
                          height: 6,
                        },
                          shadowOpacity: 0.37,
                          shadowRadius: 7.49,
                          elevation: 12,
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
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  mainHeaderContainer: {
    flexDirection: "row",
  },

  buttonContainerInner: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 20,
  },

  buttonContainerInnerTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#168BFC",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonContainerInnerText: {
    color: "#fff",
    alignItems: "center",
    //paddingHorizontal: 5,
    alignItems: "center",
    fontFamily: FontFamily.Medium,
  },
  innerContainer: {
    alignItems: "center",
  },
  ImageStyles: {
    marginTop: 10,
    width: 300,
    height: 400,
    // borderRadius:140,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  iconfiles: {
    marginTop: 10,
  },
  DailogMainContainer1: {
    marginTop: -10,
  },
  DailogMainContainer: {
    marginTop: -20,
  },
  insideContainerDailog: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
  },
  iconDailogscontaint: {},
  testcontentinnerDailog: {
    marginHorizontal: 15,
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "lightgrey",
    paddingVertical: 12,
  },
  activityIndicator: {
    position: "absolute",
    alignSelf: "center",
    paddingTop: 25,
  },
  sendIcon: { justifyContent: "center", alignItems:"center" },
  bottomInputView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "300",
    color: "#8c8c8c",
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingTop: Platform.OS === "ios" ? 14 : 10,
    paddingBottom: Platform.OS === "ios" ? 14 : 10,
    paddingRight: 30,
    backgroundColor: "whitesmoke",
  },
  button: {
    width: 30,
    height: 30,
    //marginBottom: Platform.OS === "ios" ? 15 : 0,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  attachment: {
    width: 40,
    height: 50,
    position: "absolute",
    right: 5,
    bottom: 0,
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    marginBottom: Platform.OS === "ios" ? 15 : 0,
    flexDirection: "row",
    width: "70%",
  },
  chatContainer: {
    borderRadius: 15,
    margin: 5,
  },
  chatTxt: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 5,
    fontWeight: "500",
    padding: 8,
  },
  activityIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  senderMessage: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  sendImage: {
    borderColor: "#03a5fc",
    marginBottom: 3,
    borderWidth: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  sendImageTime: {
    alignSelf: "flex-end",
    textAlign: "right",
    paddingHorizontal: 3,
    paddingTop: 10,
    fontSize: 13,
    color: "#ffffff",
    marginTop: -40,
    marginRight: 10,
    marginBottom: 10,
  },
  sendMessageText: {
    backgroundColor: "#03a5fc",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  recieveMessageTime: {
    alignSelf: "flex-end",
    textAlign: "right",
    paddingTop: 1,
    paddingHorizontal: 3,
    fontSize: 12,
    color: "lightcyan",
  },
  recieveMessageView: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  recieveMessageText: {
    backgroundColor: "#cae8ed",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  recieveTextTime: {
    alignSelf: "flex-end",
    textAlign: "right",
    paddingTop: 1,
    paddingHorizontal: 3,
    fontSize: 12,
    color: "#171717",
  },
  recieveImage: {
    borderColor: "#cae8ed",
    marginBottom: 3,
    borderWidth: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  chatImage: { width: 300, height: 150 },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#25539c",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  dateHeader: {
    backgroundColor: "#8fd4eb",
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 15,
    marginBottom: 10,
  },
  headertitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageTitleView: {
    marginTop: 10,
    // height: 55,
  },

  rowDirection: {
    flexDirection: "row",
    justifyContent:"center", alignItems:"center"
    //paddingVertical:20
  },

  chatImage1: { height: 50, width: 50, borderRadius: 25 },
  chatUserName: { fontSize: 18, marginLeft:10  },
});

const mapStateToProps = (state, ownProps) => {
  const {chatType, dialogId, connectyCubeId} = ownProps.route.params;
  let communicate_id;
  if(dialogId){
    communicate_id = dialogId._id;
  } else {
    communicate_id = state.Message.lastDialogId??null;
  }
  return {
    currentUser: state.currentUser,
    history:
      typeof state.Message.history !== "undefined"
        ? typeof state.Message.history[communicate_id] !== "undefined"
          ? state.Message.history[communicate_id]
          : []
        : [],
    isChatFetching:typeof state.Message.isChatFetching !== "undefined"?state.Message.isChatFetching:false
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {chatType, dialogId, connectyCubeId} = ownProps.route.params;
  const { actions } = require("@redux/ChatRedux");
  let communicate_id;
  if(dialogId){
    communicate_id = dialogId._id;
  }
  return {
    fetchChatMessage: () => {
      actions.fetchChatMessage(dispatch, communicate_id, connectyCubeId);
    },
    deleteChatMessage: (message_id) => {
      actions.deleteChatMessage(dispatch, message_id, communicate_id);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
