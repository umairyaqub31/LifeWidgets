import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import styles from "./styles";
import { Avatar, Divider } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import { NotificationDotsPopUp, NotificationDots, TimeAgo } from "@components";
import { connect } from "react-redux";
import * as firebase from "firebase";
import { OptimizeImage, Capitalize } from "@helpers";
import { Color, LifeWidget } from "@common";
import FontFamily from "../../config/fonts/fontfamily";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      loading: false,
    };
    this.dotActionRef = React.createRef();
  }

  dotNotifyButton = (key) => {
    this.dotActionRef.current.NotificationDotsPopUp(key);
  };

  componentDidMount() {
    firebase
      .database()
      .ref("notifications/" + this.props.me.id)
      .orderByChild("created_at")
      //.limitToLast(10)
      .on("value", (snapshot) => {
        var li = [];
        snapshot.forEach((child) => {
          li.push({
            key: child.key,
            value: child.val(),
          });
        });
        this.setState({ notifications: li.reverse() });
      });
  }

  readNotification = (key, item) => {
    firebase
      .database()
      .ref("notifications/" + this.props.me.id + "/" + key)
      .update({ is_read: true });
      console.log('Notification Type.......: ' + item.type);

    if (item.type === "accept_friend_request") {
      this.props.navigation.navigate("Friends", {
        screen: "AllFriends",
        initial: false,
      });
    } else if (item.type === "accept_flirt_request") {
      this.props.navigation.navigate("Menu", {screen: "FlirtsActive",  initial: false});
    } else if (item.type === "reject_flirt_request") {
      this.props.navigation.navigate("Menu", {screen: "FlirtCandidates",  initial: false});
    } else if (item.type === "group_invite_request") {
      this.props.navigation.navigate("GroupInvite");
    } else if (item.type === "group_accept_request") {

    } else {
      this.props.navigation.navigate("Feed", {screen: "FeedDetail", initial: false, params: {
        item: item.data,
        highlight: item.highlight,
        }});
    }
  };


  removeNotification = (key) => {
    firebase
      .database()
      .ref("notifications/" + key)
      .remove();
  };

  acceptFriendRequest = async (id, notificationKey) => {
    this.removeNotification(notificationKey);
    const json = await LifeWidget.acceptFriendRequest(id);
  };

  acceptFlirtRequest = async (id, notificationKey) => {
    const json = await LifeWidget.acceptFlirtRequest(id);
    this.removeNotification(notificationKey);
  };

  cancelFlirtRequest = async (id, notificationKey) => {
    const json = await LifeWidget.cancelFlirtRequest(id);
    this.removeNotification(notificationKey);
  };

  renderItem = ({ item, index }) => {
    switch (item.value.type) {
      case "flirt_request": {
        return (
          <View style={styles.sideSpace}>
            <View style={styles.pendinginvitescontainer}>
              {item.value.user.profile_photo ? (
                <Avatar.Image
                  style={styles.avatarimage}
                  size={52}
                  source={{
                    uri: OptimizeImage(item.value.user.profile_photo),
                  }}
                />
              ) : (
                <Avatar.Image
                  style={styles.avatarimage}
                  size={52}
                  source={require("@images/avatar.png")}
                />
              )}
              <View style={{ flex: 1,marginLeft:10 }}>
                <View style={styles.pendinginvitesnamecontainer}>
                  <View>
                    <TouchableOpacity onPress={() =>
                        this.props.navigation.navigate("UserProfile", {
                          user_id: item.value.user.id,
                        })}>
                      <Text style={styles.username}>
                        {Capitalize(item.value.user.first_name)}{" "}
                        {Capitalize(item.value.user.last_name)}
                      </Text>
                      <Text style={styles.text}>Sent you a flirt request</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.multibtns}>
                  <TouchableOpacity
                    style={styles.primarybtn}
                    onPress={() => this.acceptFlirtRequest(item.value.user.id, item.value.user.id, this.props.me.id + "/" + item.key)}
                  >
                    <Text style={styles.primarybtntext}>Connect</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.graybtn}
                    onPress={() => this.cancelFlirtRequest(item.value.user.id, this.props.me.id + "/" + item.key)}
                  >
                    <Text style={styles.graybtntext}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
      }
      case "friend_request": {
        return (
          <View style={styles.sideSpace}>
            <View style={styles.pendinginvitescontainer}>
              {item.value.user.profile_photo ? (
                <Avatar.Image
                  style={styles.avatarimage}
                  size={52}
                  source={{
                    uri: OptimizeImage(item.value.user.profile_photo),
                  }}
                />
              ) : (
                <Avatar.Image
                  style={styles.avatarimage}
                  size={52}
                  source={require("@images/avatar.png")}
                />
              )}
              <View style={{ flex: 1,marginLeft:10 }}>
                <View style={styles.pendinginvitesnamecontainer}>
                  <View>
                    <TouchableOpacity onPress={() =>
                        this.props.navigation.navigate("UserProfile", {
                          user_id: item.value.user.id,
                        })}>
                      <Text style={styles.username}>
                        {Capitalize(item.value.user.first_name)}{" "}
                        {Capitalize(item.value.user.last_name)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.multibtns}>
                  <TouchableOpacity
                    style={styles.primarybtn}
                    onPress={() =>
                      this.acceptFriendRequest(
                        item.value.user.id,
                        this.props.me.id + "/" + item.key
                      )
                    }
                  >
                    <Text style={styles.primarybtntext}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.graybtn}
                    onPress={() =>
                      this.removeNotification(this.props.me.id + "/" + item.key)
                    }
                  >
                    <Text style={styles.graybtntext}>Cancel friend request</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        );
      }
      default: {
        return (
          <TouchableOpacity
            style={[
              styles.list,
              item.value.is_read ? {} : styles.unreadNotification,
            ]}
            onPress={() => this.readNotification(item.key, item.value)}
          >
            <View style={styles.listLeft}>
              {item.value.user.profile_photo ? (
                <Avatar.Image
                  style={styles.avatarimage}
                  size={52}
                  source={{
                    uri: OptimizeImage(item.value.user.profile_photo),
                  }}
                />
              ) : (
                <Avatar.Image
                  style={styles.avatarimage}
                  size={52}
                  source={require("@images/avatar.png")}
                />
              )}
            </View>
            <View style={styles.listRight}>
              <View style={styles.listContent}>
                <View style={styles.listNameContent}>
                  <View style={{ flexDirection: "row"}}>
                    <Text style={styles.textBold}>
                      {Capitalize(item.value.user.first_name)}{" "}
                      {Capitalize(item.value.user.last_name)}
                      <Text style={styles.text}> {item.value.message} </Text>
                    </Text>
                  </View>
                  
                  {!!item.value.title && (
                    <View>
                      <Text numberOfLines={1} style={[styles.textBold, {}]}>
                        {item.value.title}
                      </Text>
                    </View>
                  )}
                  
                  {!!item.value.subtitle && (
                    <View style={{ width: "100%" }}>
                      <Text numberOfLines={1} style={[styles.text]}>
                        {item.value.subtitle}
                      </Text>
                    </View>
                  )}
                </View>
                <TimeAgo
                  style={styles.textGray}
                  created_at={item.value.created_at}
                />
              </View>
              <NotificationDots
                dotNotifyButton={() =>
                  this.dotNotifyButton(this.props.me.id + "/" + item.key)
                }
              />
            </View>
          </TouchableOpacity>
        );
      }
    }
  };

  onEndReached = () => {};

  listEmptyComponent = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          marginTop: 100,
        }}
      >
        <Entypo name="bell" size={150} color={Color.primary} />
        <Text
          style={{
            color: "#a9a9a9",
            fontSize: 20,
            fontFamily: FontFamily.Medium,
          }}
        >
          No notifications yet
        </Text>
        <Text
          style={{
            color: Color.gray,
            fontSize: 18,
            textAlign: "center",
            fontFamily: FontFamily.Regular,
          }}
        >
          When you get notifications, they'll show up here
        </Text>
      </View>
    );
  };

  render() {
    console.log(this.state.notifications);
    return (
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.5}
          data={this.state.notifications}
          renderItem={this.renderItem}
          ListEmptyComponent={this.listEmptyComponent}
        />
        <NotificationDotsPopUp ref={this.dotActionRef} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return { me: state.User.user };
};

export default connect(mapStateToProps)(Notifications);
