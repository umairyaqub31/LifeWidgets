import * as React from "react";
import { Alert, Text, TouchableOpacity, View, Animated } from "react-native";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { Avatar, Badge } from "react-native-paper";
import moment from "moment";
import Swipeable from "react-native-gesture-handler/Swipeable";
import * as RootNavigation from "../../common/NavigationService";
import { connect } from "react-redux";

class Item extends React.Component {
  deleteDialog = (e) => {
    this.swipeableRef.close();
    Alert.alert(
      "Delete conversation",
      "Are you sure you want to delete this conversation?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => this.props._deleteDialog(e),
        },
      ]
    );
  };

  getUserId = (data) => {
    return data.occupants_ids.filter(
      (val) => val != this.props.user.cube_user_id
    )[0];
  };

  navigateToChat = () => {
    const { item } = this.props;
    RootNavigation.navigate("Message", {
        connectyCubeId: this.getUserId(item),
        chatName: item.name,
        userImg: item.photo,
        dialogId: item,
        chatType: item.type,
      })
  }

  render() {
    const { item } = this.props;
    const LeftActions = ({ progress, dragX, onPress }) => {
      const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
        extrapolate: "clamp"
      });
      return (
        <Animated.View style={[{ transform: [{ scale }] }]}>
          <TouchableOpacity style={styles.rightAction} onPress={onPress}>
              <FontAwesome size={24} color="#fff" name="trash-o" />
          </TouchableOpacity>
        </Animated.View>
      );
    };

    return (
      <Swipeable
        ref={(ref) => (this.swipeableRef = ref)}
        renderLeftActions={(progress, dragX) => (
          <LeftActions
            progress={progress}
            dragX={dragX}
            onPress={() => this.deleteDialog(item._id)}
          />
        )}
      >
        <TouchableOpacity
        style={styles.profileimage}
        onPress={this.navigateToChat}
      >
        {item.photo ? (
          <Avatar.Image
            size={62}
            source={{
              uri: item.photo,
            }}
          />
        ) : (
          <Avatar.Image size={62} source={require("@images/avatar.png")} />
        )}
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.username}>{item.name}</Text>
          <View style={styles.timeslotstatus}>
            <Text
              style={[
                styles.text,
                { flex: 1 },
                item.unread_messages_count > 0 && styles.bold,
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.last_message}
            </Text>
            <View style={styles.timeagodot}></View>
            <Text style={styles.timeago}>
              {moment(new Date(item.last_message_date_sent * 1000)).format(
                "h:mm a"
              )}
            </Text>
            {item.unread_messages_count > 0 && (
              <Badge style={styles.badge}>{item.unread_messages_count}</Badge>
            )}
          </View>
        </View>
      </TouchableOpacity>
      </Swipeable>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.User.user,
  };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/ChatRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchData: (per_page) => {
      actions.fetchRecentChatDialog(dispatch, per_page);
    },
    fetchOnlineUser: (data) => {
      actions.fetchOnlineUser(dispatch, data);
    },
  };
};
export default connect(mapStateToProps)(Item);
