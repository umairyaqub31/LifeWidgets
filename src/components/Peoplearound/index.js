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
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Capitalize, OptimizeImage } from "@helpers";
import { Color, Config } from "@common";
import { UnfriendsPopup } from "@components";

class Peoplearound extends React.PureComponent {
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
    this.params["o"] = true;
    this.props.fetchPeopleAround(this.per_page, this.page, this.params);
  }

  people_search = (search) => {
    this.setState({ search });
    this.page = 1;
    this.props.fetchPeopleAround(this.per_page, this.page, this.params);
    this.onEndReachedCalledDuringMomentum = false;
  };

  sendFriendRequest = (friend_id) => {
    this.props.sendFriendRequest(friend_id);
  };

  openPopup = (item) => {
    this.setState({ item });
    this.actionSheetRef.current.UnfriendsPopupButton();
  };

  goToProfile = (item) => {
    if (this.props.me.id === item.id) {
      this.props.navigation.navigate("Menu", { screen: "MyProfile" });
    } else {
      this.props.navigation.navigate("UserProfile", {
        user_id: item.id,
      });
    }
  };

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.pendinginvitescontainer} key={index}>
        {item.profile_photo ? (
          <Avatar.Image
            style={styles.avatarimage}
            size={68}
            source={{
              uri: OptimizeImage(item.profile_photo),
            }}
          />
        ) : (
          <Avatar.Image
            style={styles.avatarimage}
            size={68}
            source={require("@images/avatar.png")}
          />
        )}

        <View style={{ flex: 1 }}>
          <View style={styles.pendinginvitesnamecontainer}>
            <View>
              <TouchableOpacity onPress={() => this.goToProfile(item)}>
                <Text style={styles.username}>
                  {Capitalize(item.first_name)} {Capitalize(item.last_name)}
                </Text>
              </TouchableOpacity>
              {item.is_friend && (
                <Text style={styles.graytext}>You are friends now</Text>
              )}
            </View>
          </View>
          {!item.is_friend && !item.request.is_entry && (
            <View style={styles.multibtns}>
              <TouchableOpacity
                style={styles.primarybtn}
                onPress={() => this.props.sendFriendRequest(item.id)}
              >
                <Text style={styles.primarybtntext}>Add Friend</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
            </View>
          )}
          {!item.is_friend && item.request.is_entry && (
            <View style={styles.multibtns}>
              <TouchableOpacity
                style={styles.graybtn}
                onPress={() => this.props.cancelFriendRequest(item.id)}
              >
                <Text style={styles.graybtntext}>Cancel friend request</Text>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
            </View>
          )}
        </View>
      </View>
    );
  };

  onRefresh = () => {
    this.page = 1;
    this.props.fetchPeopleAround(this.per_page, this.page, this.params);
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isFetching) {
      if (!this.onEndReachedCalledDuringMomentum) {
        if (this.props.total >= this.props.data.length) {
          this.page++;
          this.props.fetchPeopleAround(this.per_page, this.page, this.params);
          this.onEndReachedCalledDuringMomentum = true;
        }
      }
    }
  };

  renderEmptyContainer = () => {
    if (!this.props.isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            No People Around
          </Text>
        </View>
      );
    }
    return null;
  };

  addFriendToType = (type_ids) => {
    let data = { type_ids: type_ids };
    this.props.addFriendToType(this.state.item.id, data);
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <View style={styles.scrolledview}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={this.listHeaderComponent}
              onMomentumScrollBegin={() => {
                this.onEndReachedCalledDuringMomentum = false;
              }}
              data={this.props.data}
              showsVerticalScrollIndicator={false}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = ({ People, User }) => {
  return {
    data: People.peopleAround,
    total: People.peopleAroundTotal,
    isFetching: People.isFetching,
    me: User.user,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PeopleRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchPeopleAround: (per_page, page, params = []) => {
      actions.fetchPeopleAround(dispatch, per_page, page, params);
    },
    sendFriendRequest: (friend_id) => {
      actions.sendFriendRequest(dispatch, friend_id, true);
    },
    cancelFriendRequest: (friend_id) => {
      actions.cancelFriendRequest(dispatch, friend_id, true);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(Peoplearound);