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
import { UnfriendsPopup, UserImage } from "@components";

class FriendsFollowers extends React.PureComponent {
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
    this.params["c"] = 5;
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
    return (
      <View>
        <View style={styles.pendinginvitescontainer}>
        <UserImage item={item} style={styles.avatarimage} />
          <View style={styles.pendinginvitesnamecontainer}>
            <View>
              <TouchableOpacity>
                <Text style={styles.username}>
                  {Capitalize(item.first_name)} {Capitalize(item.last_name)}
                  {item.verified && (
                    <AntDesign name="star" size={18} color={Color.gold} />
                  )}
                </Text>
              </TouchableOpacity>
              {item.mutual_friends_count > 0 && (
                <Text style={styles.textgray}>
                  {item.mutual_friends_count} mutual friend
                </Text>
              )}
            </View>
            <TouchableOpacity
              style={styles.optionsopacity}
              onPress={() => this.openPopup(item)}
            >
              <Image
                style={styles.optionsimage}
                source={require("@images/options.png")}
              />
            </TouchableOpacity>
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
      if (!this.onEndReachedCalledDuringMomentum) {
        if (
          this.props.People.totalFriends >= this.props.People.friends.length
        ) {
          this.page++;
          this.props.fetchFriends(this.per_page, this.page, this.params);
          this.onEndReachedCalledDuringMomentum = true;
        }
      }
    }
  };

  renderEmptyContainer = () => {
    if (!this.props.People.isFriendFetching) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            No Followers
          </Text>
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
            placeholder="Search Followers"
            placeholderTextColor={Color.gray}
            onChangeText={this.onChangeText}
          />
        </View>
        <View style={{ marginTop: 13 }}>
          <Text style={styles.heading}>
            {this.props.People.totalFollowers}{" "}
            {this.props.People.totalFollowers > 1 ? "Followers" : "Follower"}
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
              onMomentumScrollBegin={() => {
                this.onEndReachedCalledDuringMomentum = false;
              }}
              onEndReachedThreshold={0.5}
              data={this.props.People.followers}
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
        <UnfriendsPopup
          ref={this.actionSheetRef}
          item={item}
          addFriendToType={this.addFriendToType}
          followFriend={this.props.followFriend}
          unfollowFriend={this.props.unfollowFriend}
          cancelFriendRequest={this.props.cancelFriendRequest}
        />
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
    cancelFriendRequest: (friend_id) => {
      actions.cancelFriendRequest(dispatch, friend_id);
    },
    addFriendToType: (friend_id, data) => {
      actions.addFriendToType(dispatch, friend_id, data);
    },
    followFriend: (friend_id) => {
      actions.followFriend(dispatch, friend_id);
    },
    unfollowFriend: (friend_id) => {
      actions.unfollowFriend(dispatch, friend_id);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(FriendsFollowers);
