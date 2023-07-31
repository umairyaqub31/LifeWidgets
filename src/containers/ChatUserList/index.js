import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  ToastAndroid,
  SafeAreaView,
  Alert,
} from "react-native";
import styles from "./styles";
import { Avatar } from "react-native-paper";
import { LifeWidget } from "@common";
import ConnectyCube from "react-native-connectycube";
import {
  Ionicons,
  AntDesign,
  Octicons,
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import moment from "moment";
import store from "../../store";
import * as RootNavigation from "../../common/NavigationService";
import { DIALOG_TYPE } from "../../helpers/constants";
import UserModel from "../../models/user";
import { fetchUsers } from "../../actions/users";
import Dialog from "../../models/dialogs";
import { fetchDialogs } from "../../actions/dialogs";
import { OptimizeImage } from "@helpers";

import { connect } from "react-redux";
class ChatUserList extends React.Component {
  constructor(props, route) {
    super(props);
    //ConnectyCube.chat.onMessageListener = this.getChatDialogList.bind(this);

    this.state = {
      isSearch: false,
      searchvalue: "",
      searcUserData: [],
      loader: true,
      dialogType: false,
      allDialog: [],
      animating: true,
      friends: [],
      checkonline: [],
      cubeUserId: [],
      photo: [],
      allUsers: [],
      filteredUsers: [],
      showSelected: false,
      globalSearch: false,
      globalSearchedResult: [],
      searchedView: false,
      dailogAll: [],
    };
  }

  //Call oine time while loading the screen
  componentDidMount = async () => {
    this.showHeader();
    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.getChatDialogList();
      this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({ tabBarVisible: true });
    });
    this.setState({ animating: true });
    await this.getChatDialogList();



    this.setState({ animating: false });
    let allUsers = await LifeWidget.friendList(this.props.user.user.id);

    if (allUsers.status_code === 200) {
      var chatUser = allUsers.user.filter((item) => item.cube_user_id != null);
      this.setState({ allUsers: chatUser });
    }
    let json = await LifeWidget.getFriend();
    this.setState({ friends: json.data });
    var onlineUser = [];
    for (var i = 0; i < json.data.length; i++) {
      ConnectyCube.chat
        .getLastUserActivity(json.data[i].user.cube_user_id)
        .then((result) => {
          if (Math.floor(result.seconds / 60) <= 5) {
            onlineUser.push(result.userId);
          }
        })
        .catch((error) => {});
    }
    this.setState({ checkonline: onlineUser });
  };

  //getting connectycube dialog list
  async getChatDialogList() {
    const dialogsFromServer = await ConnectyCube.chat.dialog.list();
    const currentUserId = store.getState()
      ? store.getState().currentUser
      : null;
    let privatChatIdsUser = [];

    const dialogs = dialogsFromServer.items.map((elem) => {
      if (elem.type === DIALOG_TYPE.PRIVATE) {
        elem.occupants_ids.forEach((elem) => {
          elem != currentUserId.id && privatChatIdsUser.push(elem);
        });
      }
      return new Dialog(elem);
    });

    if (privatChatIdsUser.length !== 0) {
      const usersInfo = await this.getUsersList(privatChatIdsUser);
      store.dispatch(fetchUsers(usersInfo));
    }

    var dailogList = fetchDialogs(dialogs);
    var groups = dailogList.dialogs.filter((ele) => ele.type == 2);
    var recentChat = dailogList.dialogs.filter((ele) => ele.type == 3);
    // fetchDialogs(dialogs).map((result) => result.Dialog )
    this.setState({
      allDialog: recentChat,
      groupList: groups,
      dailogAll: dailogList,
    });
  }

  //for delete the dialog
  deleteDailog = async (id) => {
    Alert.alert(`Do You Want to delete this chat ?`, "", [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
        style: "cancel",
      },
      { text: "OK", onPress: () => this.removeDailog(id) },
    ]);
  };

  removeDailog = async (id) => {
    this.setState({ showSelected: false });
    const dialogId = id;

    await ConnectyCube.chat.dialog
      .delete(dialogId)
      .then((result) => {
        this.getChatDialogList();
      })
      .catch((error) => {});
  };

  async getUsersList(ids) {
    const usersList = await ConnectyCube.users.get({
      per_page: 100,
      filter: {
        field: "id",
        param: "in",
        value: ids,
      },
    });
    return usersList.items.map((elem) => {
      return new UserModel(elem.user);
    });
  }

  //used to refresh the list
  refreshChatUserList = async () => {
    await this.getChatDialogList();
  };

  //Search the user
  async getSearch() {
    if (this.state.isSearch === true) {
      let json = await LifeWidget.searchUser(this.state.searchvalue);
      if (json.status_code == 200) {
        this.setState({
          searcUserData: json.user,
        });
      }
    }
  }

  //filter user list
  filterUser = () => {
    var susers = [];
    for (let i = 0; i < this.state.allUsers.length; i++) {
      if (
        this.state.allUsers[i].first_name.indexOf(this.state.searchvalue) >
          -1 ||
        this.state.allUsers[i].email.indexOf(this.state.searchvalue) > -1
      ) {
        susers.push(this.state.allUsers[i]);
      }
    }

    if (this.state.searchvalue.trim().length > 0) {
      var searchwith = this.state.searchvalue.toLowerCase().trim();
      let result = this.state.allUsers.filter((f) =>
        f.first_name
          .toLowerCase()
          .startsWith(this.state.searchvalue.toLowerCase().trim())
      );

      this.setState({ filteredUsers: result });
    } else {
      this.setState({ filteredUsers: [] });
    }
  };

  //Globally Search for msg
  searchMsg = () => {
    const params = {
      search_text: this.state.globalSearchValue,
    };

    ConnectyCube.chat
      .search(params)
      .then((result) => {
        this.setState({ globalSearchedResult: result, searchedView: true });
      })
      .catch((error) => {
      });
  };

  //showHeader
  showHeader = () => {

    this.props.navigation.setOptions({
      headerLeft: () => (
        <View style={{ flexDirection: "row",height:70,flex:1}}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Entypo
              style={{ marginLeft: 10 }}
              name="chevron-left"
              size={24}
              color="black"
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
            {this.props.data.profile_photo ? (
              <Avatar.Image
                size={40}
                style={styles.avatarimage}
                source={{
                  uri: OptimizeImage(this.props.data.profile_photo),
                }}
              />
            ) : (
              <Avatar.Image
                size={40}
                style={styles.avatarimage}
                source={require("../../../assets/images/avatar.png")}
              />
            )}
            <Text style={{ marginLeft: 5, marginRight: 5 }}>
              {this.props.data.first_name.substring(0, 5) + ".."}
            </Text>
          </View>
          {/* <View style={[styles.textInputView]}>
            <TextInput
              placeholder="Search"
              placeholderTextMarginLeft="10"
              placeholderTextColor="#000000"
              style={styles.textinput1}
              onChangeText={(globalSearchValue) =>
                this.setState({ globalSearchValue })
              }
              value={this.state.globalSearchValue}
              onSubmitEditing={this.searchMsg}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState(
                  {
                    globalSearch: false,
                    globalSearchValue: "",
                    searchedView: false,
                  },
                  this.showHeader
                );
              }}
              style={{ position: "absolute", right: 5, top: 6 }}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View> */}
        </View>
      ),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.animating ? (
          <ActivityIndicator
            size="large"
            animating={this.state.animating}
            color="#bc2b78"
            size="large"
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 80,
            }}
          />
        ) : (
          <ScrollView>
          <View style={[styles.textInputView]}>
            <TextInput
              placeholder="Search"
              placeholderTextMarginLeft="10"
              placeholderTextColor="#000000"
              style={styles.textinput1}
              onChangeText={(globalSearchValue) =>
                this.setState({ globalSearchValue })
              }
              value={this.state.globalSearchValue}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState(
                  {
                    globalSearch: false,
                    globalSearchValue: "",
                    searchedView: false,
                  },
                  this.showHeader
                );
              }}
              style={{ position: "absolute", right: 5, top: 10 }}
            >
              <AntDesign name="close" size={22} color="black" />
            </TouchableOpacity>
          </View>
            <View>
              {this.state.searchedView ? (
                <View>
                  <View style={styles.recentChatHeadView}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: "60%" }}>
                        <Text style={styles.recentChatText}>
                          Searched Result
                        </Text>
                      </View>
                      <View
                        style={{ width: "40%", justifyContent: "center" }}
                      ></View>
                    </View>
                  </View>

                  <View style={styles.margin15}>
                    <FlatList
                      data={this.state.globalSearchedResult.dialogs}
                      horizontal={false}
                      renderItem={({ item, index }) => {
                        return (
                          <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity
                              style={styles.userListMainView}
                              onPress={() =>
                                this.props.navigation.navigate("Message", {
                                  connectyCubeId: item.occupants_ids.filter(
                                    (val) =>
                                      val !=
                                      store.getState().currentUser.user.id
                                  )[0],
                                  chatName: item.name,
                                  refreshList: () => this.refreshChatUserList(),
                                  userImg: item.photo,
                                  dialogId: item,
                                  chatType: item.type,
                                })
                              } //key={index} onLongPress={()=>{this.setState({showSelected:true})}
                            >
                              <View style={styles.flexDirection}>
                                <View style={styles.width15}>
                                  {item.photo ? (
                                    <Image
                                      style={styles.userProfileImage}
                                      source={{ uri: item.photo }}
                                    />
                                  ) : (
                                    <Image
                                      style={styles.userProfileImage}
                                      source={require("../../../assets/images/avatar.png")}
                                    />
                                  )}
                                </View>
                                <View style={styles.width60}>
                                  <Text
                                    style={styles.userNameText}
                                    numberOfLines={1}
                                  >
                                    {item.name}
                                  </Text>
                                  {item.unread_messages_count > 0 ? (
                                    <Text
                                      style={[
                                        styles.lastMsg,
                                        { fontWeight: "bold", fontSize: 15 },
                                      ]}
                                    >
                                      {item.last_message}
                                    </Text>
                                  ) : (
                                    <Text
                                      style={styles.lastMsg}
                                      numberOfLines={1}
                                    >
                                      {item.last_message}
                                    </Text>
                                  )}
                                </View>
                                <View style={styles.width20}>
                                  <Text style={styles.mesTime}>
                                    {moment(
                                      new Date(
                                        item.last_message_date_sent * 1000
                                      )
                                    ).format("h:mm a")}{" "}
                                  </Text>
                                  {item.unread_messages_count > 0 ? (
                                    <View style={styles.badge}>
                                      <Text
                                        style={{
                                          color: "#ffffff",
                                          textAlign: "center",
                                          fontWeight: "bold",
                                          fontSize: 15,
                                        }}
                                      >
                                        {item.unread_messages_count}
                                      </Text>
                                    </View>
                                  ) : null}
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />

                    <View style={styles.recentChatHeadView}>
                      <View style={{ flexDirection: "row" }}>
                        <View style={{ width: "60%" }}>
                          <Text style={styles.recentChatText}>
                            Searched Messaged Result
                          </Text>
                        </View>
                      </View>
                    </View>
                    <FlatList
                      data={this.state.globalSearchedResult.messages}
                      horizontal={false}
                      renderItem={({ item, index }) => {
                        return (
                          <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={styles.userListMainView}>
                              <View style={styles.flexDirection}>
                                <View
                                  style={[styles.width60, { width: "80%" }]}
                                >
                                  <Text
                                    style={styles.userNameText}
                                    numberOfLines={1}
                                  >
                                    {
                                      this.state.dailogAll.dialogs.find(
                                        (v) => v.id == item.chat_dialog_id
                                      ).name
                                    }
                                  </Text>
                                  <Text
                                    style={styles.lastMsg}
                                    numberOfLines={1}
                                  >
                                    {item.message}
                                  </Text>
                                </View>
                                <View style={styles.width20}>
                                  <Text style={styles.mesTime}>
                                    {moment(
                                      new Date(item.date_sent * 1000)
                                    ).format("h:mm a")}{" "}
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
              ) : null}

              {!this.state.isSearch ? (
                <View>
                  <View style={styles.onlineUserHead}>
                    <Text
                      style={styles.activeUserText}
                      onPress={() => RootNavigation.navigate("Menu")}
                    >
                      Online Users
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.primaryBtn} onPress={()=> this.props.navigation.navigate('ChatUsers')}>
                    <Text style={styles.primaryBtnText}>Chat user list</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.primaryBtn} onPress={()=> this.props.navigation.navigate('ChatPreview')}>
                    <Text style={styles.primaryBtnText}>Chat Preview</Text>
                  </TouchableOpacity>

                  <View style={styles.topMargin}>
                    {this.state.checkonline.length > 0 ? (
                      <FlatList
                        data={this.state.friends}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                          return (
                            <View key={index}>
                              {this.state.checkonline.indexOf(
                                item.user.cube_user_id
                              ) != -1 ? (
                                <TouchableOpacity
                                  style={styles.margin20}
                                  onPress={() =>
                                    this.props.navigation.navigate("Message", {
                                      connectyCubeId: item.user.cube_user_id,
                                      chatName: item.user.first_name,
                                      refreshList: () =>
                                        this.refreshChatUserList(),
                                      userImg: item.user.profile_photo,
                                    })
                                  }
                                >
                                  <View style={styles.alignCenter}>
                                    {item.user.profile_photo ? (
                                      <Image
                                        style={styles.activeUserImage}
                                        source={{
                                          uri: item.user.profile_photo,
                                        }}
                                      />
                                    ) : (
                                      <Image
                                        style={styles.activeUserImage}
                                        source={require("../../../assets/images/avatar.png")}
                                      />
                                    )}

                                    <Octicons
                                      name="primitive-dot"
                                      size={24}
                                      color="#32CD32"
                                      style={{ marginTop: -15, marginLeft: 20 }}
                                    />

                                    <View>
                                      <Text style={styles.activerUserNameText}>
                                        {item.user.first_name}
                                      </Text>
                                    </View>
                                  </View>
                                </TouchableOpacity>
                              ) : null}
                            </View>
                          );
                        }}
                        keyExtractor={(item) => item.id.toString()}
                      />
                    ) : null}
                  </View>

                  <View style={styles.recentChatHeadView}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: "60%" }}>
                        <Text style={styles.recentChatText}>Group Chat</Text>
                      </View>
                      <TouchableOpacity
                        //style={{ width: "40%" }}
                        onPress={() => {
                          this.props.navigation.navigate("CreateChatGroup");
                        }}
                      >
                        <Text style={styles.recentChatText}>Create Group</Text>
                      </TouchableOpacity>
                      <View style={{ width: "40%", justifyContent: "center" }}>
                        {this.state.showSelected ? (
                          <TouchableOpacity
                            style={{ width: "40%" }}
                            onPress={() =>
                              this.setState({ showSelected: false })
                            }
                            style={{ marginTop: 7 }}
                          >
                            <AntDesign
                              style={{ textAlign: "right", marginRight: 10 }}
                              name="close"
                              size={20}
                              color="black"
                            />
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    </View>
                  </View>
                  {this.state.groupList.length > 0 ? (
                    <View style={styles.margin15}>
                      <FlatList
                        data={this.state.groupList}
                        horizontal={false}
                        refreshControl={
                          <RefreshControl
                            refreshing={false}
                            onRefresh={this.refreshChatUserList}
                          />
                        }
                        renderItem={({ item, index }) => {
                          return (
                            <View style={{ flexDirection: "row" }}>
                              {this.state.showSelected ? (
                                <View
                                  style={{
                                    justifyContent: "center",
                                    paddingVertical: 30,
                                    marginLeft: 5,
                                  }}
                                >
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.deleteDailog(item.id);
                                    }}
                                  >
                                    <AntDesign
                                      name="delete"
                                      size={25}
                                      color="black"
                                    />
                                  </TouchableOpacity>
                                </View>
                              ) : null}

                              <TouchableOpacity
                                style={styles.userListMainView}
                                onPress={() =>
                                  this.props.navigation.navigate("Message", {
                                    connectyCubeId: item.occupants_ids.filter(
                                      (val) =>
                                        val !=
                                        store.getState().currentUser.user.id
                                    )[0],
                                    chatName: item.name,
                                    refreshList: () =>
                                      this.refreshChatUserList(),
                                    userImg: item.photo,
                                    dialogId: item,
                                    chatType: item.type,
                                  })
                                }
                                onLongPress={() => {
                                  this.setState({ showSelected: true });
                                }}
                              >
                                <View style={styles.flexDirection}>
                                  <View style={styles.width15}>
                                    {item.photo ? (
                                      <Image
                                        style={styles.userProfileImage}
                                        source={{ uri: item.photo }}
                                      />
                                    ) : (
                                      <Image
                                        style={styles.userProfileImage}
                                        source={require("../../../assets/images/avatar.png")}
                                      />
                                    )}
                                  </View>
                                  <View style={styles.width60}>
                                    <Text
                                      style={styles.userNameText}
                                      numberOfLines={1}
                                    >
                                      {item.name}
                                    </Text>
                                    {item.unread_messages_count > 0 ? (
                                      <Text
                                        style={[
                                          styles.lastMsg,
                                          { fontWeight: "bold", fontSize: 15 },
                                        ]}
                                      >
                                        {item.last_message}
                                      </Text>
                                    ) : (
                                      <Text
                                        style={styles.lastMsg}
                                        numberOfLines={1}
                                      >
                                        {item.last_message}
                                      </Text>
                                    )}
                                  </View>
                                  <View style={styles.width20}>
                                    <Text style={styles.mesTime}>
                                      {moment(
                                        new Date(
                                          item.last_message_date_sent * 1000
                                        )
                                      ).format("h:mm a")}{" "}
                                    </Text>
                                    {item.unread_messages_count > 0 ? (
                                      <View style={styles.badge}>
                                        <Text
                                          style={{
                                            color: "#ffffff",
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            fontSize: 15,
                                          }}
                                        >
                                          {item.unread_messages_count}
                                        </Text>
                                      </View>
                                    ) : null}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            </View>
                          );
                        }}
                        keyExtractor={(item) => item.id.toString()}
                      />
                    </View>
                  ) : (
                    <View>
                      <Text style={{ textAlign: "center" }}>No Group Chat</Text>
                    </View>
                  )}

                  <View style={styles.recentChatHeadView}>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ width: "60%" }}>
                        <Text style={styles.recentChatText}>Recent Chat</Text>
                      </View>
                      <View style={{ width: "40%", justifyContent: "center" }}>
                        {this.state.showSelected ? (
                          <TouchableOpacity
                            style={{ width: "40%" }}
                            onPress={() =>
                              this.setState({ showSelected: false })
                            }
                            style={{ marginTop: 7 }}
                          >
                            <AntDesign
                              style={{ textAlign: "right", marginRight: 10 }}
                              name="close"
                              size={20}
                              color="black"
                            />
                          </TouchableOpacity>
                        ) : null}
                      </View>
                    </View>
                  </View>
                  {this.state.allDialog.length > 0 ? (
                    <View style={styles.margin15}>
                      <FlatList
                        data={this.state.allDialog}
                        horizontal={false}
                        refreshControl={
                          <RefreshControl
                            refreshing={false}
                            onRefresh={this.refreshChatUserList}
                          />
                        }
                        renderItem={({ item, index }) => {
                          return (
                            <View style={{ flexDirection: "row" }}>
                              {this.state.showSelected ? (
                                <View
                                  style={{
                                    justifyContent: "center",
                                    paddingVertical: 30,
                                    marginLeft: 5,
                                  }}
                                >
                                  <TouchableOpacity
                                    onPress={() => {
                                      this.deleteDailog(item.id);
                                    }}
                                  >
                                    <AntDesign
                                      name="delete"
                                      size={25}
                                      color="black"
                                    />
                                  </TouchableOpacity>
                                </View>
                              ) : null}

                              <TouchableOpacity
                                style={styles.userListMainView}
                                onPress={() =>
                                  this.props.navigation.navigate("Message", {
                                    connectyCubeId: item.occupants_ids.filter(
                                      (val) =>
                                        val !=
                                        store.getState().currentUser.user.id
                                    )[0],
                                    chatName: item.name,
                                    refreshList: () =>
                                      this.refreshChatUserList(),
                                    userImg: item.photo,
                                    dialogId: item,
                                    chatType: item.type,
                                  })
                                } //key={index} onLongPress={()=>{this.setState({showSelected:true})}
                              >
                                <View style={styles.flexDirection}>
                                  <View style={styles.width15}>
                                    {item.photo ? (
                                      <Image
                                        style={styles.userProfileImage}
                                        source={{ uri: item.photo }}
                                      />
                                    ) : (
                                      <Image
                                        style={styles.userProfileImage}
                                        source={require("../../../assets/images/avatar.png")}
                                      />
                                    )}
                                  </View>
                                  <View style={styles.width60}>
                                    <Text
                                      style={styles.userNameText}
                                      numberOfLines={1}
                                    >
                                      {item.name}
                                    </Text>
                                    {item.unread_messages_count > 0 ? (
                                      <Text
                                        style={[
                                          styles.lastMsg,
                                          { fontWeight: "bold", fontSize: 15 },
                                        ]}
                                      >
                                        {item.last_message}
                                      </Text>
                                    ) : (
                                      <Text
                                        style={styles.lastMsg}
                                        numberOfLines={1}
                                      >
                                        {item.last_message}
                                      </Text>
                                    )}
                                  </View>
                                  <View style={styles.width20}>
                                    <Text style={styles.mesTime}>
                                      {moment(
                                        new Date(
                                          item.last_message_date_sent * 1000
                                        )
                                      ).format("h:mm a")}{" "}
                                    </Text>
                                    {item.unread_messages_count > 0 ? (
                                      <View style={styles.badge}>
                                        <Text
                                          style={{
                                            color: "#ffffff",
                                            textAlign: "center",
                                            fontWeight: "bold",
                                            fontSize: 15,
                                          }}
                                        >
                                          {item.unread_messages_count}
                                        </Text>
                                      </View>
                                    ) : null}
                                  </View>
                                </View>
                              </TouchableOpacity>
                            </View>
                          );
                        }}
                        keyExtractor={(item) => item.id.toString()}
                      />
                    </View>
                  ) : (
                    <View>
                      <Text style={{ textAlign: "center" }}>
                        No Recent Chat
                      </Text>
                    </View>
                  )}
                </View>
              ) : this.state.filteredUsers.length > 0 ? (
                <FlatList
                  data={this.state.filteredUsers}
                  horizontal={false}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        style={styles.userListMainView}
                        onPress={() =>
                          this.props.navigation.navigate("Message", {
                            connectyCubeId: item.cube_user_id,
                            chatName: item.first_name + " " + item.last_name,
                            refreshList: () => this.refreshChatUserList(),
                            userImg: item.profile_photo,
                          })
                        }
                        key={index}
                      >
                        <View style={styles.flexDirection}>
                          <View style={styles.width15}>
                            {item.profile_photo ? (
                              <Image
                                style={styles.userProfileImage}
                                source={{ uri: item.profile_photo }}
                              />
                            ) : (
                              <Image
                                style={styles.userProfileImage}
                                source={require("../../../assets/images/avatar.png")}
                              />
                            )}
                          </View>
                          <View style={styles.width60}>
                            <Text style={styles.userNameText}>
                              {item.first_name}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item) => item.id.toString()}
                />
              ) : null}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.User,
    data: state.Profile.data,
  };
};

export default connect(mapStateToProps)(ChatUserList);
