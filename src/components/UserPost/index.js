import * as React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import styles from "./styles";
import {
  Profileimage,
  Footericons,
  Postdescription,
  ImagesGrid,
  RecentComment,
} from "@components";
import { connect } from "react-redux";

class UserPost extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.actionSheetRef = React.createRef();
    this.shareactionSheetRef = React.createRef();
    this.snackbarSheetRef = React.createRef();
    this.collectionOptionActionSheetRef = React.createRef();
    this.createCollectionActionSheetRef = React.createRef();
    (this.page = 0), (this.per_page = 10);
  }
  componentDidMount() {
    this._onRefresh();
  }
  sharePopupButton = (id) => {
    this.props._sharePopupButton(id);
  };

  groupClick = () => {
    this.props.groupClick(this.props.group);
  };

  groupClick1 = () => {
    this.props.groupClick1(this.props.group1);
  };

  groupClick2 = () => {
    this.props.groupClick2(this.props.group2);
  };

  newsfeedClick = () => {
    this.props.newsfeedClick(this.props.post_status);
  };

  snackbarHandler = () => {
    this.snackbarSheetRef.current.snackbarHandler();
  };

  SavepostOption = () => {
    this.collectionOptionActionSheetRef.current.SavepostOption();
  };
  createCollection = () => {
    this.createCollectionActionSheetRef.current.createCollection();
  };

  _onRefresh = () => {
    this.page = 1;
    this.props.fetchUserPosts(
      this.per_page,
      this.page,
      this.props.user_id,
      this.props.save_id,
      this.props.group_id
    );
  };

  renderEmptyContainer = () => {
    if (!this.props.isPublicFetching) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            No Public Post
          </Text>
        </View>
      );
    }
    return null;
  };

  _onEndReached = ({ distanceFromEnd }) => {
    if (
      this.props.isPublicFetching === false &&
      this.props.isNextPosts !== null
    ) {
      this.page++;
      this.props.fetchUserPosts(
        this.per_page,
        this.page,
        this.props.user_id,
        this.props.save_id,
        this.props.group_id
      );
    }
  };

  savePostPopup = (id) => {
    this.props._savePostPopup(id);
  };

  shareContainer = (share) => {
    const item = Object.assign({}, share);
    if (Object.keys(item).length > 0) {
      return (
        <View style={[styles.sherecontainer, { borderWidth: 1 }]}>
          <View style={styles.profileimagewithoption}>
            <View style={{ flex: 1 }}>
              <Profileimage
                item={item}
                me={this.props.me}
                navigation={this.props.navigation}
              />
            </View>
          </View>

          <View style={styles.Postdescriptionheight}>
            <Postdescription item={item} navigation={this.props.navigation} />
          </View>
          <View>
            <ImagesGrid item={item} />
          </View>
          <View></View>
        </View>
      );
    } else {
      return null;
    }
  };

  onViewableItemsChanged = (props) => {
    const changed = props.changed;
    changed.forEach((item) => {
      if (!item.isViewable) {
        if (
          typeof this.imageGridRef[`REF-FLATLIST${item.item.id}`] !==
          "undefined"
        ) {
          try {
              this.imageGridRef[`REF-FLATLIST${item.item.id}`].pauseVideo();
          } catch (e) {
              console.log('could not pause video')
          }
        }
      }
    });
  };

  render() {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={this._onRefresh} />
        }
        onViewableItemsChanged={this.onViewableItemsChanged}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={0.5}
        data={this.props.breakTime ? [] : this.props.posts}
        ListFooterComponent={() =>
          this.props.isPublicFetching ? (
            <ActivityIndicator style={{ margin: 10 }} />
          ) : null
        }
        ListHeaderComponent={this.props.listHeaderComponent}
        renderItem={({ item }) => (
          <>
            <View style={styles.postcontainer}>
              <View style={styles.profileimagewithoption}>
                <View style={{ flex: 1 }}>
                  <Profileimage
                    item={item}
                    me={this.props.me}
                    navigation={this.props.navigation}
                  />
                </View>

                <TouchableOpacity
                  style={styles.optionopacity}
                  onPress={() => this.savePostPopup(item)}
                >
                  <Image
                    style={styles.option}
                    source={require("../../../assets/images/options.png")}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.Postdescriptionheight}>
                <Postdescription
                  item={item}
                  navigation={this.props.navigation}
                />
                {this.shareContainer(item.share)}
              </View>
              <View>
                <ImagesGrid
                  ref={(ref) =>
                    (this.imageGridRef = {
                      ...this.imageGridRef,
                      [`REF-FLATLIST${item.id}`]: ref,
                    })
                  }
                  item={item}
                />
              </View>
              <View>
                <Footericons
                  item={item}
                  sharePopupButton={() => this.sharePopupButton(item.id)}
                  navigation={this.props.navigation}
                />
              </View>
            </View>
            <RecentComment item={item} navigation={this.props.navigation} />
          </>
        )}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { user_id } = ownProps;
  return {
    posts:
      typeof state.Post.posts !== "undefined"
        ? typeof state.Post.posts[user_id] !== "undefined"
          ? state.Post.posts[user_id]
          : []
        : [],
    isNextPosts:
      typeof state.Post.isNextPosts !== "undefined"
        ? typeof state.Post.isNextPosts[user_id] !== "undefined"
          ? state.Post.isNextPosts[user_id]
          : null
        : null,
    me: state.User.user,
    breakTime: state.User.breakTime,
    isPublicFetching: state.Post.isPublicFetching,
    user: state.Profile.user,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PostRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchUserPosts: (per_page = 10, page, user_id, save_id, group_id) => {
      actions.fetchUserPublicPosts(
        dispatch,
        per_page,
        page,
        user_id,
        save_id,
        group_id
      );
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(UserPost);
