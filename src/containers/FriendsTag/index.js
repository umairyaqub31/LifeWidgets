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
import { Avatar, Checkbox } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Capitalize, OptimizeImage } from "@helpers";
import { Color } from "@common";

class FriendsTag extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      item: {},
      checked: [],
    };

    (this.page = 1), (this.per_page = 10);
    this.onEndReachedCalledDuringMomentum = true;
    (this.params = []), (this.item = {});
    this.friendSearchEvent;
  }

  componentDidMount() {
    this.setState({ checked: this.props.route.params.tags });
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headRightOpacity}
          onPress={this.submitDone}
        >
          <Text style={styles.headRightText}>Done</Text>
        </TouchableOpacity>
      ),
    });
    this.params["f"] = true;
    this.props.fetchFriends(this.per_page, this.page, this.params);
  }

  submitDone = () => {
    this.props.route.params.submitTags(this.state.checked);
    this.props.navigation.goBack();
  };

  people_search = (search) => {
    this.setState({ search });
    this.page = 1;
    this.props.fetchFriends(this.per_page, this.page, this.params);
    this.onEndReachedCalledDuringMomentum = false;
  };

  handleChange = (item) => {
    let { checked } = this.state;
    let found = checked.find((data) => data.id === item.id);
    if (!found) {
      checked.push(item);
    } else {
      checked = checked.filter((data) => data.id !== item.id);
    }
    this.setState({ checked });
    this.forceUpdate();
  };

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        index={index}
        style={styles.friendscontainer}
        onPress={() => this.handleChange(item)}
      >
        <View style={styles.profileimage}>
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

          <View style={styles.friendscontainerRight}>
            <View style={{ flex: 1 }}>
              <Text style={styles.username}>
                {Capitalize(item.first_name)} {Capitalize(item.last_name)}
              </Text>
            </View>
            <Checkbox
              onPress={() => this.handleChange(item)}
              uncheckedColor={Color.primary}
              color={Color.primary}
              status={
                this.state.checked.find((data) => data.id === item.id)
                  ? "checked"
                  : "unchecked"
              }
            />
          </View>
        </View>
      </TouchableOpacity>
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

const mapStateToProps = ({ People }) => {
  return { People };
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
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(FriendsTag);