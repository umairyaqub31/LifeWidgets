import * as React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import styles from "./styles";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Grouppost, SavepostPopup, InviteFriend } from "@components";
import postjson from "../../common/post.json";
import { connect } from "react-redux";
import { Color } from "@common";
import { OptimizeImage } from "@helpers";

import moment from "moment";

class Joingroups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.savePostSheetRef = React.createRef();
    this.per_page = 10;
    this.page = 1;
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: () => <View style={styles.headertitle}><Text style={styles.headertitleText}>Groups you joined</Text></View>
    });
    this.props.fetchGroupsJoin(this.per_page, this.page, {type:"join"});
  }

  SavepostPopup = () => {
    this.savePostSheetRef.current.SavepostPopup();
  };

  onRefresh = () => {
    this.page = 1;
    this.props.fetchGroupsJoin(this.per_page, this.page, {type:"join"});
  };

  renderEmptyContainer = () => {
    if (!this.props.isJoinFetching) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>No group found</Text>
        </View>
      );
    }
    return null;
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isJoinFetching) {
      if (this.props.totalJoin > this.props.joins.length) {
        this.page++;
        this.props.fetchGroupsJoin(this.per_page, this.page, {type:"me"});
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
    const { joins, isJoinFetching } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.scrolledview}>

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
          

          <FlatList
          contentContainerStyle={{ paddingLeft: 15, paddingRight: 15 }}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }
          onEndReached={this.onEndReached}
          ListEmptyComponent={this.renderEmptyContainer}
          onEndReachedThreshold={0.5}
          data={joins}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            isJoinFetching ? (
              <ActivityIndicator color={Color.gray} style={{ margin: 10 }} />
            ) : null
          }
          renderItem={this.renderItem}
        />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    joins: state.Group.joins,
    isJoinFetching: state.Group.isJoinFetching,
    totalJoin: state.Group.totalJoin,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/GroupRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchGroupsJoin: (per_page, page, params) => {
      actions.fetchGroupsJoin(dispatch, per_page, page, params);
    },

  };
};
export default connect(mapStateToProps, undefined, mergeProps)(Joingroups);