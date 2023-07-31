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
  Platform,
  Linking,
  LayoutAnimation,
  UIManager,
  Image,
} from "react-native";
import styles from "./styles";
import { Avatar, Checkbox } from "react-native-paper";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { Capitalize } from "@helpers";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Color } from "@common";
import { UserImage, ContactPopup } from "@components";
import * as Contacts from "expo-contacts";
import { LifeWidget } from "@common";
import * as SMS from "expo-sms";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class FriendsContacts extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      friendRequestBtnText: "Add Friend",
      cancelRequestBtnText: "Cancel",
      item: {},
      deviceContacts: [],
      appFriends: {},
      selected: [],
      data: [],
      total: 0,
      loading: false,
      enable_check: false,
      message:`[[firstname]], I just wanted to let you know that I have switched my social media over to this cool new app -- Life Widgets. You should come check it out: bit.ly/3uCStJC`
    };

    (this.page = 1), (this.per_page = 10000);
    this.contact_per_page = 300;
    this.onEndReachedCalledDuringMomentum = true;
    this.actionSheetRef = React.createRef();
    this.modalizeRef = React.createRef();
    (this.params = []), (this.item = {});
    this.friendSearchEvent;
  }

  async componentDidMount() {
    this.setHeaderRight();
    const { status } = await Contacts.requestPermissionsAsync();
    this.props.fetchContacts(this.contact_per_page, this.page, this.params);
    if (status === "granted") {
      this.fetchContacts();
    }
  }

  setHeaderRight = () => {

    const { selected } = this.state;
    if (selected.length>1) {
      this.props.navigation.setOptions({
        headerRight: () => (<TouchableOpacity
                  style={styles.primarybtn}
                  onPress={this.openMessageBox}
                >
                    <Text style={styles.primarybtntext}>
                      Invite ({selected.length})
                    </Text>
                </TouchableOpacity>),
      }, LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut));
    } else {
      this.props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={this.selectAllPeople}
          >
            <Text style={{ color: Color.primary }}>Select all</Text>
          </TouchableOpacity>
        ),
      },LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut));
    }
  };

  handelInviteBtnClick = async (item) => {
    let smsAvailable = await SMS.isAvailableAsync();

    if (item.contact_number.length > 0) {
      let smsURl =
        (Platform.OS === "ios" ? "sms:" : "sms://") +
        item.contact_number +
        (Platform.OS === "ios" ? "&" : "?") +
        "body=" +
        encodeURIComponent(
          "I just wanted to let you know that I have switched my social media over to this cool new app -- Life Widgets. You should come check it out: bit.ly/3uCStJC"
        );
      await Linking.openURL(smsURl);
    } else {
      this.props.navigation.navigate("ShareUs");
    }
  };

  openMessageBox = ()=> {
    this.modalizeRef.current?.open();
  }

  invitesToSelectedContact = async () => {
    const {selected, message} = this.state;
    this.setState({ loading: true });
    const json = await LifeWidget.shareMessage({ data: selected, message:message });
    this.setState({ loading: false });
    this.clearAllPeople();
    if (json.status) {
      Alert.alert("Invitation sent", "Invitation sent successfully", [
        { text: "OK"},
      ]);
    }
  };

  handleAddFriendBtnClick = (friend_id) => {
    if (this.state.friendRequestBtnText == "Add Friend") {
      this.sendFriendRequest(friend_id);
      this.setState({
        friendRequestBtnText: "Cancel",
      });
    } else {
      this.setState({
        friendRequestBtnText: "Add Friend",
      });
      this.cancelFriendRequest(friend_id);
    }
  };
  handleCancelBtnClick = (friend_id) => {
    if (this.state.cancelRequestBtnText == "Add Friend") {
      this.sendFriendRequest(friend_id);
      this.setState({
        cancelRequestBtnText: "Cancel",
      });
    } else {
      this.setState({
        cancelRequestBtnText: "Add Friend",
      });
      this.cancelFriendRequest(friend_id);
    }
  };
  sendFriendRequest = async (friend_id) => {
    const json = await LifeWidget.sendFriendRequest(friend_id);
  };
  cancelFriendRequest = async (friend_id) => {
    const json = await LifeWidget.cancelFriendRequest(friend_id);
  };
  fetchContacts = async () => {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
      pageSize: this.per_page,
      pageOffset: this.page == 1 ? 0 : this.page * this.per_page,
    });
    await LifeWidget.syncContacts({ contacts: data });
    this.page = 1;
    this.props.fetchContacts(this.contact_per_page, this.page, this.params);
  };

  openPopup = (item) => {
    this.setState({ item });
    this.actionSheetRef.current.open();
  };

  renderItem = ({ item, index }) => {
    const { selected } = this.state;
    return (
      <View>
        <View style={styles.pendinginvitescontainer}>
          <View style={styles.pendinginvitesnamecontainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {selected.length>1 > 0 && (
                <Checkbox.Android
                  disabled={item.user ? true : false}
                  status={
                    this.state.selected.find(
                      (data) => data.contact_number === item.contact_number
                    )
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => this.selectContactToggle(item)}
                  color={Color.primary}
                />
              )}
              <UserImage
                item={item.user ? item.user : item}
                style={styles.avatarimage}
              />
              {item.user ? (
                <TouchableOpacity>
                  <Text
                    style={styles.username}
                    onPress={() =>
                      this.props.navigation.navigate("UserProfile", {
                        user_id: item.user.id,
                      })
                    }
                  >
                    {Capitalize(item.user.first_name)}
                    {Capitalize(item.user.last_name)}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.username}>
                  {Capitalize(item.contact_first_name)}{" "}
                  {Capitalize(item.contact_last_name)}
                </Text>
              )}

              {item.user && item.user.is_friend && (
                <Text style={[styles.graytext, { alignItems: "center" }]}>
                  {" "}
                  Already friend
                </Text>
              )}
            </View>
            {item.user && (
              <TouchableOpacity
                style={styles.optionsopacity}
                onPress={() => this.openPopup(item.user)}
              >
                <Image
                  style={styles.optionsimage}
                  source={require("@images/options.png")}
                />
              </TouchableOpacity>
            )}
            {!item.user && (
              <View style={styles.multibtns}>
                <TouchableOpacity
                  style={styles.graybtn}
                  onPress={() => this.handelInviteBtnClick(item)}
                >
                  <Text style={styles.graybtntext}>Invite</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

  selectContactToggle = (data) => {
    let selected = [...this.state.selected];
    let found = selected.find(
      (item) => item.contact_number === data.contact_number
    );
    if (!found) {
      selected.push(data);
    } else {
      selected = selected.filter(
        (item) => item.contact_number !== data.contact_number
      );
    }
    this.setState({ selected },this.setHeaderRight);
  };

  selectAllToggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let selected = this.props.data.filter((item) => !item.user);
    if (this.state.selected.length > 0) {
      this.setState({ selected: [] },this.setHeaderRight);
    } else {
      this.setState({ selected },this.setHeaderRight);
    }
  };

  selectAllPeople = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    let selected = this.props.data.filter((item) => !item.user);
    if (selected.length > 0) {
      this.setState({ selected },this.setHeaderRight);
    }
  }

  clearAllPeople = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ selected:[] },this.setHeaderRight);
    this.modalizeRef.current?.close();
  }

  onRefresh = () => {
    this.page = 1;
    this.props.fetchContacts(this.contact_per_page, this.page, this.params);
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isFetching) {
      if (this.props.total > this.props.data.length) {
        this.page++;
        this.props.fetchContacts(this.contact_per_page, this.page, this.params);
      }
    }
  };

  checkSelectAll = () => {
    if (
      this.props.data.filter((item) => !item.user).length ===
      this.state.selected.length
    ) {
      return true;
    }
    return false;
  };

  renderEmptyContainer = () => {
    if (this.props.isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            Fetching Contacts
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
      this.props.fetchContacts(this.contact_per_page, this.page, this.params);
    }, 1000);
  };

  static getDerivedStateFromProps(props, state) {
    if (Object.keys(state.item).length > 0) {
      var result = props.data.find((obj) => {
        return obj.user && obj.user.id === state.item.id;
      });
      if (result) {
        if (result.user) {
          return {
            item: result.user,
          };
        }
      }
    }
    return null;
  }

  listHeaderComponent = () => {
    const { total } = this.props;
    const { selected } = this.state;
    return (
      <>
        <View style={[styles.roundedtextinputcontainer, styles.boxShadow]}>
          <Ionicons name="ios-search" size={24} color={Color.gray} />
          <TextInput
            style={styles.roundedtextinput}
            placeholder="Search Contacts"
            placeholderTextColor={Color.gray}
            onChangeText={this.onChangeText}
          />
        </View>

        <View
          style={{
            marginTop: 13,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.heading}>
            {total} {total > 1 ? "Contacts" : "Contact"}
          </Text>
          {selected.length>1 && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={this.selectAllToggle}
              >
                <Text style={{ color: Color.primary }}>
                  {"Unselect all"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </>
    );
  };

  setMesage = (message) => {
    this.setState({message})
  }

  render() {
    let { data, isFetching } = this.props;
    let { item, loading, selected,message } = this.state;
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
              ListFooterComponent={() => {
                if (isFetching) {
                  return <ActivityIndicator color={Color.gray} />;
                }
                return null;
              }}
              onEndReachedThreshold={0.5}
              data={data}
              showsVerticalScrollIndicator={false}
              renderItem={this.renderItem}
            />
          </View>
        </View>
        <ContactPopup
          ref={this.actionSheetRef}
          item={item}
          sendFriendRequest={this.props.sendFriendRequest}
          acceptFriendRequest={this.props.acceptFriendRequest}
          cancelFriendRequest={this.props.cancelFriendRequest}
        />
        <Portal>
          <Modalize ref={this.modalizeRef} adjustToContentHeight={true}>
          <View style={styles.topWidget}>
            <Text style={styles.headingMessage}>
              Invite to {selected.length} people
            </Text>
            <TextInput
              multiline
              style={styles.textInput}
              value={message}
              onChangeText={(text)=>this.setMesage(text)}
            />
            <Text style={{alignSelf:"flex-end", color:Color.gray, margin:5}}>{message.length}</Text>
            {this.state.message.length>10 &&
            <TouchableOpacity
              onPress={this.invitesToSelectedContact}
              style={styles.primaryBtnMessage}
            >
            {loading?
            <ActivityIndicator color={Color.white} />
            :
              <Text style={styles.primaryBtnTextMessage}>Send</Text>
            }
            </TouchableOpacity>
            }
          </View>
          </Modalize>
        </Portal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.People.isContactFetching,
    data: state.People.contacts,
    total: state.People.totalContact,
    user:state.User.user
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PeopleRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchContacts: (per_page, page, params = []) => {
      actions.fetchContacts(dispatch, per_page, page, params);
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

export default connect(mapStateToProps, undefined, mergeProps)(FriendsContacts);
