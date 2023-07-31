import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  Button,
} from "react-native";
import styles from "./styles";
import {
  AntDesign,
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
} from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Avatar, Divider, RadioButton } from "react-native-paper";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Capitalize } from "@helpers";
import FontFamily from "../../config/fonts/fontfamily";
import {UserImage} from "@components";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

class UnfriendsPopup extends React.Component {
  constructor(props) {
    super(props);
    this.modalizeRef = React.createRef();
    this.friendsFlatlist = React.createRef();
  }

  UnfriendsPopupButton = () => {
    
    this.modalizeRef.current?.open();
  };

  closePopup = () => {
    this.modalizeRef.current?.close();
  };

  next = () => {
    this.friendsFlatlist.current.scrollToIndex({ index: 1 });
  };

  previous = (id) => {
    this.friendsFlatlist.current.scrollToIndex({ index: 0 });
  };

  checkedType = (id) => {
    let category_ids = this.props.item.categories_ids;
    const index = category_ids.find((item) => item === id);
    console.log(index);
    if (index) {
      category_ids = category_ids.filter((item) => item !== id);
    } else {
      category_ids.push(id);
    }
    console.log(category_ids);
    this.props.addFriendToType(category_ids);
  };

  followFriend = () => {
    this.props.followFriend(this.props.item.id);
  };

  unfollowFriend = () => {
    this.props.unfollowFriend(this.props.item.id);
  };

  snoozeFriend = () => {
    this.props.snoozeFriend(this.props.item.id);
  };

  unsnoozeFriend = () => {
    this.props.unsnoozeFriend(this.props.item.id);
  };

  cancelFriendRequest = () => {
    this.props.cancelFriendRequest(this.props.item.id);
    this.modalizeRef.current?.close();
  };

  renderItem = ({ item, index }) => {
    if (item === 0) {
      return (
        <View style={[styles.scrolledView, {width:windowWidth}]} key={index} >
          <TouchableOpacity style={styles.pendinginvitescontainer}>
            <UserImage item={this.props.item} style={styles.avatarimage} size={52} />
            <View style={styles.pendinginvitesnamecontainer}>
              <View>
                <Text style={styles.username}>
                  {Capitalize(this.props.item.first_name)}{" "}
                  {Capitalize(this.props.item.last_name)}
                </Text>
                {this.props.item.since_friend && (
                  <Text style={styles.graytext}>
                    Friends since {this.props.item.since_friend}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
          <Divider style={{ marginTop: 13 }} />
          <TouchableOpacity
            style={styles.modallistcontainer}
            onPress={this.next}
          >
            <MaterialCommunityIcons
              name="heart-outline"
              size={28}
              color={colors.black}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.modallist}>Add To List</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modallistcontainer}
            onPress={
              this.props.item.is_snoozed
                ? this.unsnoozeFriend
                : this.snoozeFriend
            }
          >
            <MaterialCommunityIcons
              name="clock-time-nine-outline"
              size={28}
              color={colors.black}
            />
            <View style={styles.pendinginvitesnamecontainer}>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.modallist}>
                  {this.props.item.is_snoozed
                    ? "Snoozed"
                    : "Unfollow for 30 days"}
                </Text>
                <Text style={styles.graytext}>
                  {!this.props.item.is_snoozed
                    ? "You won't see posts from " +
                      Capitalize(this.props.item.first_name) +
                      " in yours Feed for 30 days"
                    : "Temporarily stop seeing posts from "+Capitalize(this.props.item.first_name)+"."}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modallistcontainer}
            onPress={
              this.props.item.is_followed
                ? this.unfollowFriend
                : this.followFriend
            }
          >
            <MaterialCommunityIcons
              name="close-box-multiple-outline"
              size={28}
              color={colors.black}
            />
            <View style={styles.pendinginvitesnamecontainer}>
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.modallist}>
                  {this.props.item.is_followed ? "Unfollow" : "Follow"}{" "}
                </Text>
                <Text style={styles.graytext}>
                  {this.props.item.is_followed
                    ? "Stop seeing posts but stay friends"
                    : "Resume seeing posts"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modallistcontainer}
            onPress={this.cancelFriendRequest}
          >
            <AntDesign name="deleteuser" size={28} color="red" />
            <View style={styles.pendinginvitesnamecontainer}>
              <View style={{ marginLeft: 10 }}>
                <Text style={[styles.modallist, { color: "red" }]}>
                  Unfriend {Capitalize(this.props.item.first_name)}
                </Text>
                <Text style={styles.graytext}>
                  Remove {Capitalize(this.props.item.first_name)} as a friend
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View
          style={[styles.scrolledView, { width: windowWidth, padding: 10 }]}
          key={index}
        >
          <View style={styles.popUpHead}>
            <TouchableOpacity
              style={styles.touchOpacity}
              onPress={this.previous}
            >
              <Ionicons
                name="ios-arrow-back"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
            <Text style={styles.heading}>Add to list</Text>
            <TouchableOpacity style={styles.touchOpacity}>
              <Text style={styles.textPrimary}></Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.modallistcontainer, { marginTop: 0 }]}
            onPress={() => this.checkedType(1)}
          >
            <View style={styles.modallistcontainerRight}>
              <View>
                <Text
                  style={[styles.modallist, { fontFamily: FontFamily.Medium }]}
                >
                  Family & Relatives
                </Text>
                <Text style={styles.graytext}>
                  Categorize your friend to Family & Relatives
                </Text>
              </View>

              <RadioButton
                onPress={() => this.checkedType(1)}
                uncheckedColor={colors.primary}
                color={colors.primary}
                status={
                  this.props.item.categories_ids.includes(1)
                    ? "checked"
                    : "unchecked"
                }
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modallistcontainer, { marginTop: 0 }]}
            onPress={() => this.checkedType(2)}
          >
            <View style={styles.modallistcontainerRight}>
              <View>
                <Text
                  style={[styles.modallist, { fontFamily: FontFamily.Medium }]}
                >
                  Business Associate
                </Text>
                <Text style={styles.graytext}>
                  Categorize your friend to Business Associate
                </Text>
              </View>

              <RadioButton
                onPress={() => this.checkedType(2)}
                uncheckedColor={colors.primary}
                color={colors.primary}
                status={
                  this.props.item.categories_ids.includes(2)
                    ? "checked"
                    : "unchecked"
                }
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modallistcontainer, { marginTop: 0 }]}
            onPress={() => this.checkedType(3)}
          >
            <View style={styles.modallistcontainerRight}>
              <View>
                <Text
                  style={[styles.modallist, { fontFamily: FontFamily.Medium }]}
                >
                  Co-Workers
                </Text>
                <Text style={styles.graytext}>
                  Categorize your friend to Co-Workers
                </Text>
              </View>

              <RadioButton
                onPress={() => this.checkedType(3)}
                uncheckedColor={colors.primary}
                color={colors.primary}
                status={
                  this.props.item.categories_ids.includes(3)
                    ? "checked"
                    : "unchecked"
                }
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modallistcontainer, { marginTop: 0 }]}
            onPress={() => this.checkedType(4)}
          >
            <View style={styles.modallistcontainerRight}>
              <View>
                <Text
                  style={[styles.modallist, { fontFamily: FontFamily.Medium }]}
                >
                  Customers
                </Text>
                <Text style={styles.graytext}>
                  Categorize user to Customers
                </Text>
              </View>

              <RadioButton
                onPress={() => this.checkedType(4)}
                uncheckedColor={colors.primary}
                color={colors.primary}
                status={
                  this.props.item.categories_ids.includes(4)
                    ? "checked"
                    : "unchecked"
                }
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modallistcontainer, { marginTop: 0 }]}
            onPress={() => this.checkedType(5)}
          >
            <View style={styles.modallistcontainerRight}>
              <View>
                <Text
                  style={[styles.modallist, { fontFamily: FontFamily.Medium }]}
                >
                  Followers
                </Text>
                <Text style={styles.graytext}>
                  Categorize user to Followers
                </Text>
              </View>

              <RadioButton
                onPress={() => this.checkedType(5)}
                uncheckedColor={colors.primary}
                color={colors.primary}
                status={
                  this.props.item.categories_ids.includes(5)
                    ? "checked"
                    : "unchecked"
                }
              />
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    return (
      <>
        <Portal>
          <Modalize ref={this.modalizeRef} adjustToContentHeight={true}>
            <FlatList
              ref={this.friendsFlatlist}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              data={[0, 1]}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </Modalize>
        </Portal>
      </>
    );
  }
}

export default UnfriendsPopup;