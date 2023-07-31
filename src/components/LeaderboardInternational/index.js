import * as React from "react";
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { Capitalize } from "@helpers";
import { UserImage } from "@components";
import { Color } from "@common";
import { FontAwesome5,Entypo } from '@expo/vector-icons';

class LeaderboardInternational extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }
  componentDidMount() {
    this.props.leaderboards();
  }

  renderItem = ({ item, index }) => {
    return (
      <>
      <View style={
        index === 0 ? [styles.pendinginvitescontainer,{backgroundColor: Color.gold}] :
        index === 1 ? [styles.pendinginvitescontainer,{backgroundColor: "#D9DACA"}] :
        index === 2 ? [styles.pendinginvitescontainer,{backgroundColor: "#F3AA6C"}] :
        styles.pendinginvitescontainer }>
      <View style={styles.profileImage}>
        <View style={
          index === 0 ? [styles.counter,{backgroundColor: Color.white}] :
          index === 1 ? [styles.counter,{backgroundColor: Color.white}] :
          index === 2 ? [styles.counter,{backgroundColor: Color.white}] :
          styles.counter}>
          <Text style={
            index === 0 ? [styles.countText,{color: Color.gold}] :
            index === 1 ? [styles.countText,{color: '#D9DACA'}] :
            index === 2 ? [styles.countText,{color: '#F3AA6C'}] :
            styles.countText}>{index + 1}</Text>
        </View>
        <UserImage item={item.user} style={styles.avatarimage} size={52} />
        <View style={styles.pendinginvitesnamecontainer}>
          <View>
            <TouchableOpacity>
              <Text style={styles.username}>
                {Capitalize(item.user.first_name)}{" "}
                {Capitalize(item.user.last_name)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.coinsTotal}>
        <FontAwesome5 name="coins" size={16}
        style={
          index === 0 ? {color: Color.black} :
          index === 1 ? {color: Color.gold} :
          index === 1 ? {color: Color.gold} :
          {color: Color.gold}
          }
        />
        <Text style={[styles.textBold,{marginLeft:5}]}>{item.point}</Text>
      </View>
    </View>
        </>
    );
  };
  onRefresh = () => {
    this.props.leaderboards();
  };


  setIndex = (index) => {
    this.setState({ index }, this.setHeaderRight);
  };


  renderEmptyContainer = () => {
    if (!this.props.isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            No users found.
          </Text>
        </View>
      );
    }
    return null;
  };

  render() {
    const { data, user } = this.props;
    const { index, routes } = this.state;
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
              ListEmptyComponent={this.renderEmptyContainer}
              data={data}
              showsVerticalScrollIndicator={false}
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
    data:
    typeof state.People.leaderboards !== "undefined"
      ? typeof state.People.leaderboards["others"] !== "undefined"
        ? state.People.leaderboards["others"]
        : []
      : [],
      user:state.User.user 
    };
};
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PeopleRedux");
  return {
    ...ownProps,
    ...stateProps,
    leaderboards: () => {
      actions.fetchLeaderboards(dispatch, {code:"others"});
    },
    sendFriendRequest: (friend_id) => {
      actions.sendFriendRequest(dispatch, friend_id);
    },
    cancelFriendRequest: (friend_id) => {
      actions.cancelFriendRequest(dispatch, friend_id);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(LeaderboardInternational);
