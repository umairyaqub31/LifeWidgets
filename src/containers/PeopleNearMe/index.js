import * as React from "react";
import {
  Alert,
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
import * as Location from "expo-location";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Capitalize, OptimizeImage } from "@helpers";
import { Color, LifeWidget } from "@common";
import { UserImage } from "@components";

class PeopleNearMe extends React.PureComponent {
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
    this.updateCurrentLocation();
    this.params["o"] = true;
    this.params["max_distance"] = 50;
    this.props.fetchPeopleAround(this.per_page, this.page, this.params);
  }

  people_search = (search) => {
    this.setState({ search });
    this.page = 1;
    this.params["max_distance"] = 0;
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

  updateCurrentLocation = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Location permission",
          "Please allow location permission for this app",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const data = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };
      const json = await LifeWidget.updateCurrentLocation(data);
    } catch (error) {
    }
  };

  renderItem = ({ item, index }) => {
    return (
          <View style={styles.pendinginvitescontainer} key={index}>
          <UserImage item={item} style={styles.avatarimage} />
            <View style={{ flex: 1 }}>
              <View style={styles.pendinginvitesnamecontainer}>
                <View>
                  <TouchableOpacity>
                    <Text style={styles.username} onPress={() =>
                        this.props.navigation.navigate("UserProfile", {
                          user_id: item.id,
                        })}>
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
              </View>
              {!item.is_friend && !item.request.is_entry && (
                <View style={styles.multibtns}>
                  <TouchableOpacity
                    style={styles.primarybtn}
                    onPress={() => this.props.sendFriendRequest(item.id)}
                  >
                    <Text style={styles.primarybtntext}>Add Friend</Text>
                  </TouchableOpacity>
                  <View style={{flex:1}} />

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
                  <View style={{flex:1}} />

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
        if (
          this.props.total > this.props.data.length
        ) {
          this.page++;
          this.props.fetchPeopleAround(this.per_page, this.page, this.params);
        }
    }
  };

  renderEmptyContainer = () => {
    if (!this.props.isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>No People Around</Text>
        </View>
      );
    }
    return null;
  };

  onChangeText = (text) => {
    clearTimeout(this.friendSearchEvent);
    this.friendSearchEvent = setTimeout(() => {
      this.params["s"] = text;
      if (text.length > 0) {
          this.params["max_distance"] = 0;
      } else {
          this.params["max_distance"] = 50;
      }
      this.page = 1;
      this.props.fetchPeopleAround(this.per_page, this.page, this.params);
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
            {this.props.total}{" "}
            {this.props.total > 1 ? "results" : "result"}
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
              onEndReachedThreshold={0.5}
              data={this.props.data}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() =>
                this.props.isFetching ? (
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

const mapStateToProps = ({People}) => {
  return { data:People.peopleAround, total:People.peopleAroundTotal, isFetching:People.isFetching};
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

export default connect(mapStateToProps, undefined, mergeProps)(PeopleNearMe);
