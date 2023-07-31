import * as React from "react";
import {
  Alert,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import styles from "./styles";
import { Avatar } from "react-native-paper";
import {  AntDesign } from "@expo/vector-icons";
import { connect } from "react-redux";
import { OptimizeImage, Capitalize } from "@helpers";
import { Color } from "@common";
import { UserImage } from "@components";

class RequestFlirts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.per_page = 10;
    this.page = 1;
  }

  componentDidMount() {
    this.props.fetchPendingFlirts(this.per_page, this.page);
  }
  cancelFlirtRequest = (item) => {
    this.props.cancelFlirtRequest(item.id);
  };
  removeActionFlirt = (item) => {
    const { flirt_setting } = item;
    let name = "";
    if (
      flirt_setting.is_fname_visible == 1 &&
      flirt_setting.is_lname_visible == 1
    ) {
      name = Capitalize(item.first_name) + " " + Capitalize(item.last_name);
    }
    if (
      flirt_setting.is_fname_visible == 1 &&
      flirt_setting.is_lname_visible != 1
    ) {
      name = Capitalize(item.first_name);
    }
    if (
      flirt_setting.is_fname_visible != 1 &&
      flirt_setting.is_lname_visible == 1
    ) {
      name = Capitalize(item.last_name);
    }
    if (
      flirt_setting.is_fname_visible != 1 &&
      flirt_setting.is_lname_visible != 1
    ) {
      name = Capitalize(flirt_setting.nick_name);
    }

    Alert.alert(
      "Remove flirt",
      `Are you sure you want to remove ${name} from flirt`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Remove", onPress: () => this.removeFlirt(item.id) }
      ]
    );
  }

  onRefresh = () => {
    this.page = 1;
    this.props.fetchPendingFlirts(this.per_page, this.page);
  };

  renderEmptyContainer = () => {
    if (!this.props.isActiveFetching) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>No request found</Text>
        </View>
      );
    }
    return null;
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isActiveFetching) {
      if (this.props.totalActive > this.props.actives.length) {
        this.page++;
        this.props.fetchPendingFlirts(this.per_page, this.page);
      }
    }
  };

  renderItem = ({ item, index }) => {
    if(item.is_flirt){
      return;
    }
    const { flirt_setting } = item;
    let banner = "https://png.pngtree.com/thumb_back/fh260/back_pic/04/48/50/00585a3568a0a7d.jpg";
    if (item.profile_banner) {
      banner = OptimizeImage(item.profile_banner);
    }
    return (
      <>
        <TouchableOpacity
          style={[styles.candidateContainerGrid, styles.boxShadow]}
          onPress={() =>
            this.props.navigation.navigate("FlirtDetail", { item: item })
          }
        >
            <TouchableOpacity
              style={styles.CancelBtn}
              onPress={() => {
                this.cancelFlirtRequest(item);
              }}
            >
              <AntDesign name="closecircle" size={22} color="black" />
            </TouchableOpacity>
          <ImageBackground
            imageStyle={{ borderTopRightRadius: 6, borderTopLeftRadius: 6 }}
            style={styles.coverImage}
            source={{
              uri: banner,
            }}
          >
          </ImageBackground>
          <View style={styles.candidateContainerBody}>
          <UserImage item={item} style={styles.avatarImg} size={52} />

            {flirt_setting.is_fname_visible == 1 &&
              flirt_setting.is_lname_visible == 1 && (
                <Text style={styles.userName}>
                  {Capitalize(item.first_name)} {Capitalize(item.last_name)}
                </Text>
              )}
            {flirt_setting.is_fname_visible == 1 &&
              flirt_setting.is_lname_visible != 1 && (
                <Text style={styles.userName}>
                  {Capitalize(item.first_name)}
                </Text>
              )}
            {flirt_setting.is_fname_visible != 1 &&
              flirt_setting.is_lname_visible == 1 && (
                <Text style={styles.userName}>
                  {Capitalize(item.last_name)}
                </Text>
              )}
            {flirt_setting.is_fname_visible != 1 &&
              flirt_setting.is_lname_visible != 1 && (
                <Text style={styles.userName}>
                  {Capitalize(flirt_setting.nick_name)}
                </Text>
              )}
          </View>
        </TouchableOpacity>
      </>
    );
  };

  render() {
    const { actives, isActiveFetching } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.scrolledview}>
          <View style={styles.candidateContainer}>
            <FlatList
              numColumns={2}
              keyExtractor={(_, index) => index.toString()}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
              }
              onEndReached={this.onEndReached}
              ListEmptyComponent={this.renderEmptyContainer}
              onEndReachedThreshold={0.5}
              data={actives}
              showsVerticalScrollIndicator={false}
              ListFooterComponent={() =>
                isActiveFetching ? (
                  <ActivityIndicator
                    color={Color.gray}
                    style={{ margin: 10 }}
                  />
                ) : null
              }
              renderItem={this.renderItem}
            />
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    actives: state.Flirt.requestFlirts,
    totalActive: state.Flirt.totalRequest,
    isActiveFetching: state.Flirt.isRequestFetching,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/FlirtRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchPendingFlirts: (per_page, page) => {
      actions.fetchPendingRequestFlirts(dispatch, per_page, page);
    },
    cancelFlirtRequest: (friend_id) => {
      actions.cancelAndDelFlirtRequest(dispatch, friend_id);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(RequestFlirts);
