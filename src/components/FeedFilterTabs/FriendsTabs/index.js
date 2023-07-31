import * as React from "react";
import {
  ActivityIndicator,
  DeviceEventEmitter,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from "react-native";
import styles from "./styles";
import { Avatar } from "react-native-paper";
import { connect } from "react-redux";
import { Capitalize, OptimizeImage } from "@helpers";
import * as RootNavigation from "../../../common/NavigationService";
import { Color } from "@common";

class FriendsTabs extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };

    (this.page = 1), (this.per_page = 10);
    this.onEndReachedCalledDuringMomentum = true;
    this.params = [];
  }

  componentDidMount() {
    this.props.fetchPeoples(this.per_page, this.page);
    DeviceEventEmitter.addListener("event.people.search", this.people_search);
    console.log(this.props.People);
  }

  people_search = (search) => {

    if (this.props.selectedTab == "people") {
      this.setState({ search });
      this.page = 1;
      this.params["s"] = search;

      this.props.fetchPeoples(this.per_page, this.page, this.params);
      this.onEndReachedCalledDuringMomentum = false;
    }
  };

  componentWillUnmount() {
    DeviceEventEmitter.removeListener("event.people.search");
  }

  sendFriendRequest = (friend_id) => {
    this.props.sendFriendRequest(friend_id);
  };

  renderItem = ({ item, index }) => {
    return (
      <View
        index={index}
        style={[styles.profileimagewithoption, { paddingTop: 0 }]}
      >
        <TouchableOpacity
          style={styles.profileimage}
          onPress={() =>
            RootNavigation.navigate("UserProfile", {
              user_id: item.id,
            })
          }
        >
          <View style={styles.avataroverly}>
            {item.profile_photo ? (
              <Avatar.Image
                style={styles.avatarimage}
                size={42}
                source={{
                  uri: OptimizeImage(item.profile_photo),
                }}
              />
            ) : (
              <Avatar.Image
                style={styles.avatarimage}
                size={42}
                source={require("@images/avatar.png")}
              />
            )}
          </View>
          <View>
            <Text style={styles.username}>
              {Capitalize(item.first_name)} {Capitalize(item.last_name)}
            </Text>
            {/* {!item.is_friend && item.is_pending_request.pending && 
              <Text style={styles.textgray}>
                Pending
              </Text>
            } */}
            {item.mutual_friends_count > 0 && (
              <Text style={styles.textgray}>
                {item.mutual_friends_count} mutual friend
              </Text>
            )}
          </View>
        </TouchableOpacity>
        {!item.is_friend ? (
          item.request.is_entry ? (
            item.request.is_send_request ? (
              <TouchableOpacity
                style={[
                  styles.primarybtn,
                  { backgroundColor: Color.lightGray },
                ]}
                onPress={() => this.props.cancelFriendRequest(item.id)}
              >
                <Text style={[styles.primarybtntext, { color: Color.primary }]}>
                  {"Cancel friend request"}
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={[styles.primarybtn]}
                  onPress={() => this.props.acceptFriendRequest(item.id)}
                >
                  <Text style={[styles.primarybtntext]}>{"Accept"}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.primarybtn,
                    { backgroundColor: "#DC143C", marginLeft: 5 },
                  ]}
                  onPress={() => this.props.cancelFriendRequest(item.id)}
                >
                  <Text style={[styles.primarybtntext, { color: "#fff" }]}>
                    {"Reject"}
                  </Text>
                </TouchableOpacity>
              </View>
            )
          ) : (
            <TouchableOpacity
              style={[styles.primarybtn]}
              onPress={() => this.props.sendFriendRequest(item.id)}
            >
              <Text style={[styles.primarybtntext]}>{"Add Friend"}</Text>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity
            style={[styles.primarybtn, { backgroundColor: Color.lightGray }]}
            onPress={() => this.props.cancelFriendRequest(item.id)}
          >
            <Text style={[styles.primarybtntext, { color: Color.primary }]}>
              {"Unfriend"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  onRefresh = () => {
    this.page = 1;
    this.props.fetchPeoples(this.per_page, this.page, this.params);
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (this.props.People.items.length === this.props.People.total) {
      return;
    }
    if (!this.props.People.isFetching) {
      if (this.props.People.total > this.props.People.items.length) {
        this.page++;
        this.props.fetchPeoples(this.per_page, this.page, this.params);
        this.onEndReachedCalledDuringMomentum = true;
      }
    }
  };

  renderEmptyContainer = () => {
    if (!this.props.People.isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>No People</Text>
        </View>
      );
    }
    return null;
  };

  render() {
    console.log("render");
    return (
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
            onMomentumScrollBegin={() => {
              this.onEndReachedCalledDuringMomentum = false;
            }}
            onEndReachedThreshold={0.5}
            data={this.props.People.items}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() =>
              this.props.People.isFetching ? (
                <ActivityIndicator style={{ margin: 10 }} />
              ) : null
            }
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = ({ People, User }) => {

  return { People, User, selectedTab: User.selectedTab };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PeopleRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchPeoples: (per_page, page, params) => {
      actions.fetchPeoples(dispatch, per_page, page, params);
    },
    setPeopleSearch: (search) => {
      dispatch(actions.setPeopleSearch(search));
    },
    sendFriendRequest: (friend_id) => {
      actions.sendFriendRequest(dispatch, friend_id);
    },
    cancelFriendRequest: (friend_id) => {
      actions.cancelFriendRequest(dispatch, friend_id);
    },
    acceptFriendRequest: (friend_id) => {
      actions.acceptFriendRequest(dispatch, friend_id);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(FriendsTabs);