import * as React from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  TextInput,
  Platform,
} from "react-native";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Avatar } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Item from "./Item";
import { connect } from "react-redux";
import { OptimizeImage } from "@helpers";
import ConnectyCube from "react-native-connectycube";

class ChatUserTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
    this.per_page = 1000;
    this.friendsListRef = React.createRef();
  }

  componentDidMount() {
    this.showHeader();
    setTimeout(() => this.getLastUserActivity(), 5000);
  }

  getUserId = (data) => {
    return data.occupants_ids.filter(
      (val) => val != this.props.user.cube_user_id
    )[0];
  };

  

  getLastUserActivity = async () => {
    let ids = [];
    for (var i = 0; i < this.props.data.length; i++) {
      let json = await ConnectyCube.chat.getLastUserActivity(
        this.getUserId(this.props.data[i])
      );
      if (json.userId) {
        if (Math.floor(json.seconds / 60) <= 5) {
          ids.push(json.userId);
        }
      }
    }
    this.props.fetchOnlineUser(ids);
  };

  showHeader = () => {
    this.props.navigation.setOptions({
      headerLeft: () => (
        <View style={{ flexDirection: "row",alignItems:'center', height: 70, flex: 1 }}>
        
           
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
            {this.props.user.profile_photo ? (
              <Avatar.Image
                size={42}
                style={styles.avatarimage}
                source={{
                  uri: OptimizeImage(this.props.user.profile_photo),
                }}
              />
            ) : (
              <Avatar.Image
                size={42}
                style={styles.avatarimage}
                source={require("../../../assets/images/avatar.png")}
              />
            )}
            <Text style={[styles.userName, { flex:1,maxWidth:120 }]} numberOfLines={1}>
              {this.props.user.first_name.substring(0, 20)}
            </Text>
        </View>
      ),
    });
  };

  _onChangeText = (val) => {
    const text = val.toLowerCase();
    this.setState({ text });
  };

  _onRefresh = () => {
    this.props.fetchData(this.per_page);
  };

  deleteDialog = async (dialogId) => {
    this.props.deleteDialog(dialogId);
  };

  _renderHeaderComponent = () => {
    return (
      <View
        style={[
          styles.roundedtextinputcontainer,
          styles.boxShadow,
          { marginBottom: 15,},
        ]}
      >
        <Ionicons name="ios-search" size={24} color={colors.gray} />
        <TextInput
          style={styles.roundedtextinput}
          placeholder="Search"
          placeholderTextColor={colors.gray}
          onChangeText={this._onChangeText}
          value={this.state.text}
        />
        {!!this.state.text &&
        <TouchableOpacity onPress={()=>this.setState({text:""})}>
          <Ionicons name="close-outline" size={24} color="black" />
        </TouchableOpacity>
        }
      </View>
    );
  };

  _renderFooterComponent = () => {
    return null;
  };

  _renderEmptyContainer = () => {
    return (
      <View style={{ marginTop: 10 }}>
        <Text style={[styles.text,{ textAlign: "center", fontSize: 18 }]}>
          No chat history
        </Text>
      </View>
    );
  };

  _renderItem = ({ item, index }) => (<Item _deleteDialog={this.deleteDialog} index={index} item={item} ids={this.props.ids} />);

  render() {
    const { text } = this.state;
    const { data } = this.props;
    const history =
      text.length > 1
        ? data.filter((item) => item.name && item.name.toLowerCase().includes(text))
        : data;
    return (
      <>
        <KeyboardAwareScrollView style={styles.container}>
          <View style={styles.scrolledview}>
            {this._renderHeaderComponent()}
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={this._onRefresh}
                />
              }
              ListEmptyComponent={this._renderEmptyContainer}
              data={history}
              ListFooterComponent={this._renderFooterComponent}
              renderItem={this._renderItem}
            />
          </View>
        </KeyboardAwareScrollView>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    data:
      typeof state.Message.recentChatDialog !== "undefined"
        ? state.Message.recentChatDialog
        : [],
    ids:
      state.Message.onlineUsers !== "undefined"
        ? state.Message.onlineUsers
        : [],
    user: state.Profile.data,
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
    deleteDialog:(dialog, type)=>{
      actions.deleteDialog(dispatch, dialog, type);
    }
  };
};
export default connect(mapStateToProps, undefined, mergeProps, {
  forwardRef: true,
})(ChatUserTab);
