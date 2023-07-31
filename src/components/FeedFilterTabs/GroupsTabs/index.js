import * as React from "react";
import {
  ActivityIndicator,
  DeviceEventEmitter,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  RefreshControl,
} from "react-native";
import {
  AntDesign,
} from "@expo/vector-icons";
import { connect } from "react-redux";
import { Color } from "@common";
import { OptimizeImage } from "@helpers";
import { Avatar } from "react-native-paper";
import styles from "./styles";
import * as RootNavigation from "../../../common/NavigationService";

class GroupsTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {search:""};
    this.savePostSheetRef = React.createRef();
    this.per_page = 10;
    this.page = 1;
    this.params = [];
  }

  componentDidMount() {
    this.props.searchGroups(this.per_page, this.page, this.params);
    DeviceEventEmitter.addListener("event.group.search", this.group_search);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener("event.group.search");
  }

  groupJoinRequest = (group_id) => {
    this.props.groupJoinRequest(group_id);
  }

  group_search = (search) => {
    if(this.props.selectedTab=="group"){
        this.setState({ search });
        this.page = 1;
        this.params["s"] = search;

        this.props.searchGroups(this.per_page, this.page, this.params);
    }
    
  }

  onRefresh = () => {
    this.page = 1;
    this.props.searchGroups(this.per_page, this.page, this.params);
  };

  renderEmptyContainer = () => {
    if (!this.props.isSearching) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>No group found</Text>
        </View>
      );
    }
    return null;
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isSearching) {
      if (this.props.totalSearch > this.props.search.length) {
        this.page++;
        this.props.searchGroups(this.per_page, this.page, this.params);
      }
    }
  };

  renderItem = ({ item, index }) => {
    let banner =
      "https://library.kissclipart.com/20180913/qq/kissclipart-friends-illustration-png-clipart-clip-art-dc26e1a3f72f4ebd.jpg";
    if (item.attachments) {
      banner = OptimizeImage(item.attachments.attachment_url);
    }
    return (<View style={styles.listContainer} >
        <Avatar.Image style={styles.avatarImage} size={42} source={{uri:banner}} />      
        <View style={styles.listContainerRight}>
            <TouchableOpacity style={styles.listtitleContainer} onPress={()=>RootNavigation.navigate("GroupDetail", {item:item})}>
                <Text style={styles.titleBold}>{item.title}</Text>
                <Text style={styles.textGray}>{item.members_count} Members</Text>
            </TouchableOpacity>
            {!item.member &&
            <TouchableOpacity
                  style={styles.customchip}
                  onPress={()=>this.groupJoinRequest(item.id)}
                >
                  <AntDesign
                    name="plus"
                    size={24}
                    size={14}
                    color={Color.white}
                  />
                  <Text style={styles.customchiptext}>Join</Text>
                </TouchableOpacity>
            }
            {item.member && item.member.joined==1 &&
            <TouchableOpacity
                  style={[styles.customchip, {backgroundColor:Color.lightGray}]}
                >
                  <Text style={[styles.customchiptext, {color:Color.primary}]}>Joined</Text>
                </TouchableOpacity>
            }
            {item.member && item.member.requested==1 &&
            <TouchableOpacity
                  style={[styles.customchip, {backgroundColor:Color.lightGray}]}
                >
                  <Text style={[styles.customchiptext, {color:Color.primary}]}>Sent</Text>
                </TouchableOpacity>
            }
        </View>
        
    </View>);
  };

  render() {
    const { search, isSearching } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.scrolledview}>

          <FlatList
          contentContainerStyle={{ paddingLeft: 15, paddingRight: 15 }}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
          }
          onEndReached={this.onEndReached}
          ListEmptyComponent={this.renderEmptyContainer}
          onEndReachedThreshold={0.5}
          data={search}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() =>
            isSearching ? (
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
    search: state.Group.search,
    isSearching: state.Group.isSearching,
    totalSearch: state.Group.totalSearch,
    selectedTab: state.User.selectedTab,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/GroupRedux");
  return {
    ...ownProps,
    ...stateProps,
    searchGroups: (per_page, page, params) => {
      actions.searchGroups(dispatch, per_page, page, params);
    },
    groupJoinRequest:(group_id) => {
      actions.groupJoinRequest(dispatch, group_id);
    },

  };
};
export default connect(mapStateToProps, undefined, mergeProps)(GroupsTabs);

