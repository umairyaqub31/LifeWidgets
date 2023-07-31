import * as React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
  Image,
} from "react-native";
import styles from "./styles";
import { Avatar } from "react-native-paper";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Capitalize, OptimizeImage } from "@helpers";
import { Color, Config } from "@common";
import { UnfriendsPopup } from "@components";

class GroupInviteFriend extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      item: {},
    };

    (this.page = 1), (this.per_page = 10);
    this.onEndReachedCalledDuringMomentum = true;
    this.actionSheetRef = React.createRef();
    (this.params = []), (this.item = {});
    this.friendSearchEvent;
  }

  componentDidMount() {
    this.params["f"] = true;
    this.params["group_id"] = this.props.route.params.group_id;
    this.props.fetchFriends(this.per_page, this.page, this.params);
  }

  people_search = (search) => {
    this.setState({ search });
    this.page = 1;
    this.props.fetchFriends(this.per_page, this.page, this.params);
    this.onEndReachedCalledDuringMomentum = false;
  };

  sendFriendRequest = (friend_id) => {
    this.props.sendFriendRequest(friend_id);
  };

  openPopup = (item) => {
    this.setState({ item });
    this.actionSheetRef.current.UnfriendsPopupButton();
  };

  renderItem = ({ item, index }) => {
    if (!item.is_friend) return null;
    const {group_id} = this.props.route.params;
    return (
      <View>
        <View style={styles.pendinginvitescontainer}>
        {item.profile_photo ? (
        <Avatar.Image
          style={styles.avatarimage}
          size={52}
          source={{
            uri: OptimizeImage(item.profile_photo),
          }}
        />
      ) : (
        <Avatar.Image
          style={styles.avatarimage}
          size={52}
          source={require("@images/avatar.png")}
        />
      )}

 
          <View style={styles.pendinginvitesnamecontainer}>
            <View>
              <TouchableOpacity onPress={() =>
                        this.props.navigation.navigate("UserProfile", {
                          user_id: item.id,
                        })}>
                <Text style={styles.username}>
                  {Capitalize(item.first_name)} {Capitalize(item.last_name)}
                </Text>
              </TouchableOpacity>
              {item.mutual_friends_count > 0 && (
                <Text style={styles.textgray}>
                  {item.mutual_friends_count} mutual friend
                </Text>
              )}
            </View>
            {!item.group_invited?
            <TouchableOpacity
                style={styles.customchip}
                onPress={() => this.props.sendGroupInvite(group_id, item.id)}
              >
                <AntDesign
                  name="plus"
                  size={24}
                  size={14}
                  color={Color.white}
                />
                <Text style={styles.customchiptext}>Invite</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={[styles.customchip, {backgroundColor:Color.lightGray}]}
              >
                <Text style={[styles.customchiptext, {color:Color.gray}]}>Sent</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    );
  };

  onRefresh = () => {
    this.page = 1;
    this.props.fetchFriends(this.per_page, this.page, this.params);
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.People.isFriendFetching) {
        if (
          this.props.People.totalFriends > this.props.People.friends.length
        ) {
          this.page++;
          this.props.fetchFriends(this.per_page, this.page, this.params);
          this.onEndReachedCalledDuringMomentum = true;
        }
      
    }
  };

  renderEmptyContainer = () => {
    if (!this.props.People.isFriendFetching) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>No Friends</Text>
        </View>
      );
    }
    return null;
  };

  onChangeText = (text) => {
    clearTimeout(this.friendSearchEvent);
    this.friendSearchEvent = setTimeout(() => {
      this.params["s"] = text;
      this.page = 1;
      this.props.fetchFriends(this.per_page, this.page, this.params);
    }, 1000);
  };

  listHeaderComponent = () => {
    return (
      <>
        <View style={[styles.roundedtextinputcontainer, styles.boxShadow]}>
          <Ionicons name="ios-search" size={24} color={Color.gray} />
          <TextInput
            style={styles.roundedtextinput}
            placeholder="Search Friends"
            placeholderTextColor={Color.gray}
            onChangeText={this.onChangeText}
          />
        </View>
        <View style={{ marginTop: 13 }}>
          <Text style={styles.heading}>
            {this.props.People.totalFriends}{" "}
            {this.props.People.totalFriends > 1 ? "Friends" : "Friend"}
          </Text>
        </View>
      </>
    );
  };

  addFriendToType = (type_ids) => {
    let data = { type_ids: type_ids };
    this.props.addFriendToType(this.state.item.id, data);
  };

  render() {
    let { item } = this.state;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.scrolledview}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
              }
              onEndReached={this.onEndReached}
              ListEmptyComponent={this.renderEmptyContainer}
              ListHeaderComponent={this.listHeaderComponent}
              onEndReachedThreshold={0.5}
              data={this.props.People.friends}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() =>
                this.props.People.isFriendFetching ? (
                  <ActivityIndicator style={{ margin: 10 }} />
                ) : null
              }
              renderItem={this.renderItem}
            />
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = ({ People, User }) => {
  return { People, User };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PeopleRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchFriends: (per_page, page, params = []) => {
      actions.fetchFriends(dispatch, per_page, page, params);
    },
    sendGroupInvite: (group_id, friend_id) => {
      actions.sendGroupInvite(dispatch, group_id, friend_id);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(GroupInviteFriend);