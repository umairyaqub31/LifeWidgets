import * as React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
  Alert,
} from "react-native";
import styles from "./styles";
import { Avatar } from "react-native-paper";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Capitalize, OptimizeImage } from "@helpers";
import { Color, Config } from "@common";
import { UnfriendsPopup } from "@components";

class GroupMembers extends React.PureComponent {
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
    const { item } = this.props.route.params;
    this.props.navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headertitle}>
          <Text numberOfLines={1} style={styles.headertitleText}>
            {item.title}
          </Text>
        </View>
      ),
    });

    this.params["group_id"] = item.id;
    this.props.fetchMembers(this.per_page, this.page, this.params);
  }

  people_search = (search) => {
    this.setState({ search });
    this.page = 1;
    this.props.fetchMembers(this.per_page, this.page, this.params);
  };

  sendFriendRequest = (friend_id) => {
    this.props.sendFriendRequest(friend_id);
  };

  openPopup = (item) => {
    this.setState({ item });
    this.actionSheetRef.current.UnfriendsPopupButton();
  };

  removeFromGroup = (friend_id) => {
    const { item } = this.props.route.params;
    Alert.alert(
      "Remove",
      "Are you sure you remove this member from group",

      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Remove", style: "destructive",  onPress: () => this.props.removeFromGroup(item.id, friend_id) },

      ]
    );
    ;
  };

  renderItem = ({ item, index }) => {
    const group = this.props.route.params.item??{};
    const { user } = this.props;
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
              <TouchableOpacity
                onPress={() => {
                  if (user.id === item.id) {
                    this.props.navigation.navigate("MyProfile");
                  } else {
                    this.props.navigation.navigate("UserProfile", {
                      user_id: item.id,
                    });
                  }
                }}
              >
                <Text style={styles.username}>
                  {Capitalize(item.first_name)} {Capitalize(item.last_name)}
                  {item.verified && (
                    <AntDesign name="star" size={18} color={Color.gold} />
                  )}
                </Text>
              </TouchableOpacity>
              {group.owner && user.id !== item.id &&
              <TouchableOpacity
                style={[styles.dangerBtn]}
                onPress={() => this.removeFromGroup(item.id)}
              >
                <Text style={[styles.primarybtntext, { color: "#fff" }]}>
                  {"Remove"}
                </Text>
              </TouchableOpacity>
              }
              {item.mutual_friends_count > 0 && (
                <Text style={styles.textgray}>
                  {item.mutual_friends_count} mutual friend
                </Text>
              )}
            </View>
            {user.id !== item.id ? (
              !item.is_friend ? (
                item.request.is_entry ? (
                  item.request.is_send_request ? (
                    <TouchableOpacity
                      style={[
                        styles.primarybtn,
                        { backgroundColor: Color.lightGray },
                      ]}
                      onPress={() => this.props.cancelFriendRequest(item.id)}
                    >
                      <Text
                        style={[
                          styles.primarybtntext,
                          { color: Color.primary },
                        ]}
                      >
                        {"Cancel"}
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
                        <Text
                          style={[styles.primarybtntext, { color: "#fff" }]}
                        >
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
            ) : null

            ) : null}
          </View>
        </View>
      </View>
    );
  };

  onRefresh = () => {
    this.page = 1;
    this.props.fetchMembers(this.per_page, this.page, this.params);
  };

  onEndReached = ({ distanceFromEnd }) => {
    const { isFetching, data, total } = this.props;
    if (!isFetching) {
      if (total > data.length) {
        this.page++;
        this.props.fetchMembers(this.per_page, this.page, this.params);
      }
    }
  };

  renderEmptyContainer = () => {
    const { isFetching } = this.props;
    if (!isFetching) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ textAlign: "center", fontSize: 16 }}>No Members</Text>
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
      this.props.fetchMembers(this.per_page, this.page, this.params);
    }, 1000);
  };

  listHeaderComponent = () => {
    const { total } = this.props;
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
        <View>
          <Text style={styles.heading}>
            {total} {total > 1 ? "Members" : "Member"}
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
    const { data, isFetching } = this.props;
    return (
      <>
        <View style={styles.container}>
          <View style={styles.scrolledview}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              keyExtractor={(_, index) => index.toString()}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
              }
              onEndReached={this.onEndReached}
              ListEmptyComponent={this.renderEmptyContainer}
              ListHeaderComponent={this.listHeaderComponent}
              onEndReachedThreshold={0.5}
              data={data}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() =>
                isFetching ? <ActivityIndicator style={{ margin: 10 }} /> : null
              }
              renderItem={this.renderItem}
            />
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.People.members,
    total: state.People.totalMember,
    isFetching: state.People.isMemberFetching,
    user: state.User.user,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PeopleRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchMembers: (per_page, page, params = []) => {
      actions.fetchMembers(dispatch, per_page, page, params);
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
    removeFromGroup: (group_id, friend_id) => {
      actions.removeFromGroup(dispatch, group_id, friend_id);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(GroupMembers);
