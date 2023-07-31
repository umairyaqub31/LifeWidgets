import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from "react-native";
import styles from "./styles";
import {
  FontAwesome5,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import colors from "../../config/color/color";
import { connect } from "react-redux";
import { OptimizeImage } from "@helpers";
import moment from "moment";

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.savePostSheetRef = React.createRef();
    this.per_page = 10;
    this.page = 1;
  }

  componentDidMount() {
    this.props.fetchGroupsOwner(this.per_page, this.page, { type: "me" });
    this.props.fetchGroupsJoin(this.per_page, this.page, { type: "join" });
    this.props.navigation.addListener("focus", this.focus);
  }
  focus = () => {
    this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({ tabBarVisible: true });
  };
  SavepostPopup = () => {
    this.savePostSheetRef.current.SavepostPopup();
  };

  onRefresh = () => {
    this.page = 1;
    this.props.fetchGroups(this.per_page, this.page);
  };

  renderEmptyContainer = () => {
    if (!this.props.isFetching) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>No group found</Text>
        </View>
      );
    }
    return null;
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isFetching) {
      if (this.props.total > this.props.data.length) {
        this.page++;
        this.props.fetchGroups(this.per_page, this.page);
      }
    }
  };

  renderItem = ({ item, index }) => {
    let banner =
      "https://library.kissclipart.com/20180913/qq/kissclipart-friends-illustration-png-clipart-clip-art-dc26e1a3f72f4ebd.jpg";
    if (item.attachments) {
      banner = OptimizeImage(item.attachments.attachment_url);
    }
    return (
      <View key={index} style={styles.groupInvitefriendscontainer}>
        <View style={styles.profileimage}>
          <TouchableOpacity>
            <Image style={styles.avatarimage} source={{ uri: banner }} />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("GroupDetail", {
                    item: item,
                  })
                }
              >
                <Text style={styles.username}>{item.title}</Text>
              </TouchableOpacity>
              {!!item.member_since && (
                <Text style={styles.graytext}>
                  Member since{" "}
                  {moment.utc(item.member_since).local().format("MMMM Y")}
                </Text>
              )}
            </View>
            {item.owner && (
              <TouchableOpacity
                style={styles.primarybtn}
                onPress={() =>
                  this.props.navigation.navigate("GroupDetail", {
                    item: item,
                  })
                }
              >
                <Text style={styles.primarybtntext}>
                  <Feather name="edit-3" size={15} color={colors.white} />
                  Edit
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { owners, joins } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrolledview}>
          <View style={styles.horizontalscrollview}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              <TouchableOpacity
                style={styles.customchip}
                onPress={() => this.props.navigation.navigate("CreateGroup")}
              >
                <AntDesign name="pluscircle" size={18} color={colors.black} />
                <Text style={styles.customchiptext}>Create</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.customchip}
                onPress={() => this.props.navigation.navigate("GroupInvite")}
              >
                <FontAwesome5
                  name="envelope-open-text"
                  size={14}
                  color={colors.black}
                />
                <Text style={styles.customchiptext}>Invitations</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={styles.customchip}
                onPress={() => this.props.navigation.navigate("Groupmy")}
              >
                <MaterialCommunityIcons
                  name="account-group"
                  size={18}
                  color={colors.black}
                />
                <Text style={styles.customchiptext}>My Groups</Text>
              </TouchableOpacity> */}
            </ScrollView>
          </View>

          {/* <View style={{paddingLeft:15,paddingRight:15,marginTop:13}}>
                  <View style={styles.seealllistcontainer}>
                    <Text style={styles.heading}>Invite Friends to Your Groups</Text>
                    <TouchableOpacity style={styles.textopacity} onPress={() => this.props.navigation.navigate('GroupInvite')}>
                      <Text style={styles.primarytext}>See all</Text>
                    </TouchableOpacity>
                  </View>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      pagingEnabled={true}
                      data={[
                            {key: '1'},{key: '2'}, {key: '3'},{key: '4'},
                        ]}
                      renderItem={({ item }) => (
                        <InviteFriend />
                      )}
                    />
              </View> */}
          <View style={{ paddingLeft: 15, paddingRight: 15 }}>
            <View style={styles.seealllistcontainer}>
              {owners.length > 0 && (
                <Text style={styles.heading}>Groups you managed</Text>
              )}
              {owners.length > 5 && (
                <TouchableOpacity
                  style={styles.textopacity}
                  onPress={() => this.props.navigation.navigate("Groupmy")}
                >
                  <Text style={styles.primarytext}>See all</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ paddingLeft: 15, paddingRight: 15 }}>
            {owners.length > 0 &&
              owners.map((item, key) =>
                this.renderItem({ item: item, index: key })
              )}
          </View>

          <View style={{ paddingLeft: 15, paddingRight: 15 }}>
            <View style={styles.seealllistcontainer}>
              {joins.length > 0 && (
                <Text style={styles.heading}>Groups you joined</Text>
              )}
              {joins.length > 5 && (
                <TouchableOpacity
                  style={styles.textopacity}
                  onPress={() => this.props.navigation.navigate("Joingroup")}
                >
                  <Text style={styles.primarytext}>See all</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ paddingLeft: 15, paddingRight: 15 }}>
            {joins.length > 0 &&
              joins.map((item, key) =>
                this.renderItem({ item: item, index: key })
              )}
          </View>

          {/* <FlatList
          contentContainerStyle={{ paddingLeft: 15, paddingRight: 15 }}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }
          onEndReached={this.onEndReached}
          ListEmptyComponent={this.renderEmptyContainer}
          onEndReachedThreshold={0.5}
          data={data}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            isFetching ? (
              <ActivityIndicator color={Color.gray} style={{ margin: 10 }} />
            ) : null
          }
          renderItem={this.renderItem}
        /> */}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    owners: typeof state.Group.owners !== "undefined" ? state.Group.owners : [],
    joins: typeof state.Group.joins !== "undefined" ? state.Group.joins : [],
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/GroupRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchGroups: (per_page, page) => {
      actions.fetchGroups(dispatch, per_page, page);
    },
    fetchGroupsOwner: (per_page, page, params) => {
      actions.fetchGroupsOwner(dispatch, per_page, page, params);
    },
    fetchGroupsJoin: (per_page, page, params) => {
      actions.fetchGroupsJoin(dispatch, per_page, page, params);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(Groups);
