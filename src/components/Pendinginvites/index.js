import * as React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
import { Avatar, Divider } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Capitalize, OptimizeImage } from "@helpers";
import { Color, Config } from "@common";
import { UnfriendsPopup, UserImage } from "@components";


class Pendinginvites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      item: {},
    };
    this.params = [];
    this.actionSheetRef = React.createRef();
    (this.per_page = 10), (this.page = 1);
  }

  cancelFriendRequest = (id) => {
    this.props.cancelFriendRequest(id);
  };

  componentDidMount() {
    const {type} = this.props.route.params;

    this.params[type] = true;
    this.props.navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headertitle}>
          <Text style={styles.headertitleText}>{type==="pr"?"Sent Invites":"Pending Invites"}</Text>
        </View>
      ),
    })
    this.props.fetchPeoples(this.per_page, this.page, this.params);
    console.log(this.props.People);

    const unsubscribe = this.props.navigation.addListener(
      "focus",
      this.didFocus
    );
  }

  didFocus = () => {
    this.props.fetchPeoples(this.per_page, this.page, this.params);
  };

  openPopup = (item) => {
    this.setState({ item });
    this.actionSheetRef.current.UnfriendsPopupButton();
  };

  addFriendToType = (type_ids) => {
    let data = { type_ids: type_ids };
    this.props.addFriendToType(this.state.item.id, data);
  };

  acceptFriendRequest = (item) => {
    this.props.acceptFriendRequest(item.id);
    this.openPopup(item);
  }

  render() {
    const {type} = this.props.route.params;
    const {item} = this.state;
    return (
      <View>
        
        {this.props.People.items.length === 0 && (
          <Text style={{ alignSelf: "center" }}>{type==="pr"?"No sent invites":"No pending invites"}</Text>
        )}
        {this.props.People.items.map((item, index) => (
          <View style={styles.pendinginvitescontainer} key={index}>
            <UserImage item={item} style={styles.avatarimage} />
            <View style={{ flex: 1 }}>
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
                  {item.is_friend && (
                    <Text style={styles.graytext}>You are friends now</Text>
                  )}
                </View>
                
                {/* <Text style={styles.graytext}>15hc</Text> */}
              </View>
              {!item.is_friend && item.request.is_send_request===false && item.request.is_entry && (
                <View style={styles.multibtns}>
                  <TouchableOpacity
                    style={[styles.primarybtn]}
                    onPress={() => this.acceptFriendRequest(item)}
                  >
                    <Text style={styles.primarybtntext}>Confirm</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.graybtn]}
                    onPress={() => this.cancelFriendRequest(item.id)}
                  >
                    <Text style={styles.graybtntext}>Reject</Text>
                  </TouchableOpacity>
                </View>
              )}

              {!item.is_friend && item.request.is_send_request && item.request.is_entry && (
                <View style={styles.multibtns}>
                  <TouchableOpacity
                    style={[styles.graybtn]}
                    onPress={() => this.cancelFriendRequest(item.id)}
                  >
                    <Text style={styles.graybtntext}>Cancel friend request</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            {item.is_friend &&
            <TouchableOpacity
              style={styles.optionsopacity}
              onPress={() => this.openPopup(item)}
            >
              <Image
                style={styles.optionsimage}
                source={require("@images/options.png")}
              />
            </TouchableOpacity>
            }
          </View>
        ))}
        {this.props.People.items.length > 0 && (
          <Divider style={{ marginTop: 13, marginBottom: 13 }} />
        )}
        <UnfriendsPopup
          ref={this.actionSheetRef}
          item={item}
          addFriendToType={this.addFriendToType}
          followFriend={this.props.followFriend}
          unfollowFriend={this.props.unfollowFriend}
          snoozeFriend={this.props.snoozeFriend}
          unsnoozeFriend={this.props.unsnoozeFriend}
          cancelFriendRequest={this.props.cancelFriendRequest}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ People, User }) => {
  return { People };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PeopleRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchPeoples: (per_page, page, search, my) => {
      actions.fetchPeoples(dispatch, per_page, page, search, my);
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
    addFriendToType: (friend_id, data) => {
      actions.addFriendToType(dispatch, friend_id, data);
    },
    followFriend: (friend_id) => {
      actions.followFriend(dispatch, friend_id);
    },
    unfollowFriend: (friend_id) => {
      actions.unfollowFriend(dispatch, friend_id);
    },
    snoozeFriend: (friend_id) => {
      actions.snoozeFriend(dispatch, friend_id);
    },
    unsnoozeFriend: (friend_id) => {
      actions.unsnoozeFriend(dispatch, friend_id);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(Pendinginvites);