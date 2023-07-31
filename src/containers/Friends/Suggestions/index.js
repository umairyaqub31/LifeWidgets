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

class Suggestions extends React.PureComponent {
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
    this.params["fs"] = true;
    this.props.fetchSuggestions(this.per_page, this.page, this.params);
  }

  people_search = (search) => {
    this.setState({ search });
    this.page = 1;
    this.props.fetchSuggestions(this.per_page, this.page, this.params);
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
    this.props.fetchSuggestions(this.per_page, this.page, this.params);
  };

  onEndReached = ({ distanceFromEnd }) => {
    const { data, total, isFetching } = this.props;
    if (!isFetching) {
      if (!this.onEndReachedCalledDuringMomentum) {
        if (
          total >= data.length
        ) {
          this.page++;
          this.props.fetchSuggestions(this.per_page, this.page, this.params);
          this.onEndReachedCalledDuringMomentum = true;
        }
      }
    }
  };

  renderEmptyContainer = () => {
    const { isFetching } = this.props;
    if (!isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            No Suggestion
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
      this.props.fetchSuggestions(this.per_page, this.page, this.params);
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
            People you may know
          </Text>
        </View>
      </>
    );
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
                isFetching ? (
                  <ActivityIndicator style={{ margin: 10 }} />
                ) : null
              }
              renderItem={this.renderItem}
            />
           {/* <View style={[styles.roundedtextinputcontainer, styles.boxShadow]}>
              <Ionicons name="ios-search" size={24} color={Color.gray} />
              <TextInput
                style={styles.roundedtextinput}
                placeholder="Search Friends"
                placeholderTextColor={Color.gray}
                onChangeText={this.onChangeText}
              />
            </View>
            <View style={styles.spacing} />
            <Text style={styles.heading}>
              People you may know
            </Text>
            <View style={styles.pendinginvitescontainer}>
              <UserImage item={item} style={styles.avatarimage} />
              <View style={{ flex: 1 }}>
                <View style={styles.pendinginvitesnamecontainer}>
                  <View>
                    <TouchableOpacity>
                      <Text style={styles.username}>
                        Test
                      </Text>
                      <Text style={styles.textgray}>10 mutual friends</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.multibtns}>
                  <TouchableOpacity style={styles.primarybtn}>
                    <Text style={styles.primarybtntext}>Add Friend</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.graybtn}>
                    <Text style={styles.graybtntext}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.pendinginvitescontainer}>
              <UserImage item={item} style={styles.avatarimage} size={82} />
              <View style={{ flex: 1 }}>
                <View style={styles.pendinginvitesnamecontainer}>
                  <View>
                    <TouchableOpacity>
                      <Text style={styles.username}>
                        Test
                      </Text>
                      <Text style={styles.textgray}>10 mutual friends</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.multibtns}>
                  <TouchableOpacity style={styles.primarybtn}>
                    <Text style={styles.primarybtntext}>Add Friend</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.graybtn}>
                    <Text style={styles.graybtntext}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={styles.pendinginvitescontainer}>
              <UserImage item={item} style={styles.avatarimage} />
              <View style={{ flex: 1 }}>
                <View style={styles.pendinginvitesnamecontainer}>
                  <View>
                    <TouchableOpacity>
                      <Text style={styles.username}>
                        Test
                      </Text>
                      <Text style={styles.textgray}>10 mutual friends</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.multibtns}>
                  <TouchableOpacity style={styles.primarybtn}>
                    <Text style={styles.primarybtntext}>Add Friend</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.graybtn}>
                    <Text style={styles.graybtntext}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View> */}
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = ({ People }) => {
  return { 
    data:typeof People.suggestions !== "undefined"?People.suggestions:[], 
    total:typeof People.totalSuggestion !== "undefined"?People.totalSuggestion:0, 
    isFetching:typeof People.isSuggestionFetching !=="undefined"?People.isSuggestionFetching:false,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PeopleRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchSuggestions: (per_page, page, params = []) => {
      actions.fetchSuggestions(dispatch, per_page, page, params);
    },
    sendFriendRequest: (friend_id) => {
      actions.sendFriendRequest(dispatch, friend_id);
    },
    cancelFriendRequest: (friend_id) => {
      actions.cancelFriendRequest(dispatch, friend_id);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(Suggestions);