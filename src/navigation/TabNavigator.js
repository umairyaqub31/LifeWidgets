import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Badge } from "react-native-paper";
import {
  MainStackNavigator,
  GroupStackNavigator,
  BarStackNavigator,
  FriendsStackNavigator,
  MenuStackNavigator,
  AddPostStackNavigator,
  NotificationStackNavigator,
} from "./StackNavigator";
import { Ionicons, FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import colors from "../config/color/color";
import { DeviceEventEmitter, View } from "react-native";
import { connect } from "react-redux";
import * as firebase from "firebase";
import * as Notifications from "expo-notifications";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props) => {
  const responseListener = React.useRef();

  React.useEffect(() => {
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const { notification } = response;
        const { data } = notification.request.content;
        if (data.type === "friend_request") {
          props.navigation.navigate("Notifications");
          return;
        }
        if (data.type === "accept_friend_request") {
          props.navigation.navigate("Friends", {
            screen: "AllFriends",
            initial: false,
          });
          return;
        }
        if (data.type === "group_invite_request") {
          props.navigation.navigate("GroupInvite");
          return;
        }
        if (
          data.type === "flirt_request" ||
          data.type === "accept_flirt_request" ||
          data.type === "reject_flirt_request"
        ) {
          props.navigation.navigate("Notifications");
          return;
        }
        if (data.type === "chat") {
          props.navigation.navigate("Message", {
            connectyCubeId: data.connectyCubeId,
            chatName: data.chatName,
            userImg: typeof data.userImg === "undefined"?null:data.userImg,
            refreshList: () => data.refreshList,
          });
          return;
        }
        if (data.type === "copy_ready") {
          props.navigation.navigate("Menu", {screen:"AccessInformation", params:{is_ready:true}});
          return;
        }
        props.navigation.navigate("FeedDetail", {
                  item: data.data,
                  highlight: data.highlight,
                }
        );
      }
    );
    var starCountRef = firebase
      .database()
      .ref("counter/" + props.me.id + "/total");
    starCountRef.on("value", (snapshot) => {
      props.setCounter(snapshot.val());
    });
    return () => {
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <Tab.Navigator
      
      tabBarOptions={{
        showLabel: false,
        activeTintColor: colors.primary,
        inactiveTintColor: colors.gray,

        style: {
          backgroundColor: colors.white,
        },
      }}
      labeled={false}
      activeColor={colors.primary}
      inactiveColor={colors.gray}
      initialRouteName="Menu"
      barStyle={[{ backgroundColor: colors.white }]}
    >
      <Tab.Screen
        name="Feed"
        component={MainStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-home" color={color} size={24} />
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Feed", {screen:"Feed"});
          },
        })}
      />
      <Tab.Screen
        name="Bars"
        component={BarStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-albums" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 style={{ width:30 }} name="users" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Friends"
        component={FriendsStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 style={{ width:30 }} name="user-friends" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              {!!props.counter && (
                <Badge
                  style={{
                    position: "absolute",
                    zIndex: 1,
                    bottom: 10,
                    left: 15,
                  }}
                >
                  {props.counter}
                </Badge>
              )}
              <Ionicons name="ios-notifications" color={color} size={24} />
            </View>
          ),
        }}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            firebase
              .database()
              .ref("counter/" + props.me.id)
              .update({ total: 0 });
          },
        })}
      />
      <Tab.Screen
        name="Menu"
        component={MenuStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <SimpleLineIcons name="menu" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const mapStateToProps = (state) => {
  return { counter: state.Notification.counter, me: state.User.user };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/NotificationRedux");
  return {
    ...ownProps,
    ...stateProps,
    setCounter: (counter) => {
      dispatch(actions.setCounter(counter));
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(BottomTabNavigator);
