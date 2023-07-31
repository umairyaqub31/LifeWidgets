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
import { connect } from "react-redux";
import { Color } from "@common";
import { OptimizeImage } from "@helpers";
import { Avatar } from "react-native-paper";
import styles from "./styles";
import moment from "moment";
import * as RootNavigation from "../../../common/NavigationService";


class BarsTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {search:""};
    this.savePostSheetRef = React.createRef();
    this.per_page = 10;
    this.page = 1;
    this.params = [];
  }

  componentDidMount() {
    this.props.searchBars(this.per_page, this.page, this.params);
    DeviceEventEmitter.addListener("event.bar.search", this.bar_search);
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener("event.bar.search");
  }

  bar_search = (search) => {
    if(this.props.selectedTab=="bar"){
        this.setState({ search });
        this.page = 1;
        this.params["s"] = search;
        this.props.searchBars(this.per_page, this.page, this.params);
    }
  }

  onRefresh = () => {
    this.page = 1;
    this.props.searchBars(this.per_page, this.page, this.params);
  };

  renderEmptyContainer = () => {
    if (!this.props.isSearching) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>No bar found</Text>
        </View>
      );
    }
    return null;
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isSearching) {
      if (this.props.totalSearch > this.props.search.length) {
        this.page++;
        this.props.searchBars(this.per_page, this.page, this.params);
      }
    }
  };

  renderItem = ({ item, index }) => {
    let banner =
      "https://library.kissclipart.com/20180913/qq/kissclipart-friends-illustration-png-clipart-clip-art-dc26e1a3f72f4ebd.jpg";
    if (item.logo) {
      banner = OptimizeImage(item.logo.attachment_url);
    }
    return (
      <TouchableOpacity style={styles.listContainer} onPress={()=>RootNavigation.navigate("BarAbout", { item: item })}>
        <Avatar.Image
          style={styles.avatarImage}
          size={42}
          source={{
            uri:
              "https://images.all-free-download.com/images/graphiclarge/surgery_operation_hospital_216179.jpg",
          }}
        />
        <View style={styles.listContainerRight}>
          <View style={styles.listtitleContainer}>
            <Text style={styles.titleBold}>{item.name}</Text>
            <Text style={styles.textGray}>{item.city}, {item.state}, {item.country}</Text>
            {item.is_check_in && item.visited &&
            <Text style={styles.textGray}>Visited on {moment.utc(item.visited).local().format("MMMM DD, Y")}</Text>
            }
          </View>
        </View>
      </TouchableOpacity>
    );
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
    search: state.Bar.search,
    isSearching: state.Bar.isSearching,
    totalSearch: state.Bar.totalSearch,
    selectedTab: state.User.selectedTab,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/BarRedux");
  return {
    ...ownProps,
    ...stateProps,
    searchBars: (per_page, page, params) => {
      actions.searchBars(dispatch, per_page, page, params);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(BarsTabs);