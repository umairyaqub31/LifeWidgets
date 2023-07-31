import React from 'react';
import {
  Ionicons, AntDesign
} from "@expo/vector-icons";
import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
import { ChatUsersTab, ChatGroupTab } from '@components'
import { connect } from "react-redux";
import styles from "./styles";
import {FriendsList} from "@components"


class ChatUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "first", title: "Chat" },
        { key: "second", title: "Group Chat" },
      ],
    };
    this.per_page = 1000;
    this.friendsListRef = React.createRef();
  }

  componentDidMount() {
    this.setHeaderRight();
    this.blurListener = this.props.navigation.addListener("blur", () => {
      this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({ tabBarVisible: true });
    });
    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({ tabBarVisible: true });

    this.props.fetchRecentChatDialog(this.per_page);
    this.props.fetchGroupChatDialog(this.per_page);

    });


  }

  componentWillUnmount(){
    this.blurListener();
    this.focusListener();
  }

  


  renderScene = ({ route }) => {


    switch (route.key) {
      case "first":
        return (
          <ChatUsersTab key={route.key} {...this.props} />
        );
      case "second":
        return (
          <ChatGroupTab key={route.key} {...this.props} />
        );
      default:
        return null;
    }
  };

  setHeaderRight = () => {
    const {index} = this.state;
    if(index===0){
      this.props.navigation.setOptions({
        headerRight:()=>
        <TouchableOpacity
        onPress={() => this.friendsListRef.current.open()}
         style={[styles.headRight, styles.chipOpcity]}
       >
         <AntDesign name="pluscircle" size={18} color={colors.primary} />
       </TouchableOpacity>
      })
    } else {
      this.props.navigation.setOptions({
        headerRight:()=>
        <TouchableOpacity
            style={[styles.headRight, styles.chipOpcity]}
            onPress={() => this.props.navigation.navigate("CreateChatGroup")}
          >
            <AntDesign name="pluscircle" size={18} color={colors.primary} />
        </TouchableOpacity>
      })
    }
  }


  setIndex = (index) => {
    this.setState({ index }, this.setHeaderRight);
  };
  render(){

    const { index, routes } = this.state;

    return (
      <>
      <TabView
        // swipeEnabled={false}
        tabBarPosition='bottom'
        navigationState={{ index, routes }}
        renderScene={this.renderScene}
        onIndexChange={this.setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            navigation={this.props.navigation}
            tabStyle={{borderTopWidth:1,borderColor:colors.lightGray}}
            indicatorStyle={{ backgroundColor: colors.primary }}
            indicatorContainerStyle={{ backgroundColor: colors.white }}
            activeColor={colors.primary}
            inactiveColor={colors.black}
            labelStyle={{ fontFamily: FontFamily.Medium, fontSize: 10 }}
            renderIcon={({ route, focused, colors }) => (
            <Ionicons name={focused ? 'chatbubble-ellipses-outline' : 'chatbubble-ellipses-outline'} size={18} color={focused ? '#168bfc'  : 'black'} />
          )}
          />
        )}
      />
      <FriendsList type="navigate" ref={this.friendsListRef} />
      </>
    );
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/ChatRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchRecentChatDialog: (per_page) => {
      actions.fetchRecentChatDialog(dispatch, per_page);
    },
    fetchGroupChatDialog: (per_page) => {
      actions.fetchGroupChatDialog(dispatch, per_page);
    },
  };
};
export default connect(undefined, undefined, mergeProps)(ChatUsers);
