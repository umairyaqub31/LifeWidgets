import * as React from "react";
import {
  Text,
  Animated,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  DeviceEventEmitter,
  ScrollView,
} from "react-native";
import styles from "./styles";
import {
  SavepostPopup,
  SavePostCollectionOption,
  CreateCollection,
  PostProgressBar,
  SharePopup,
  SnackbarToggle,
  FeedTimeOut,
} from "@components";
import { Post } from "@containers";
import { Color, AblyConfig } from "@common";
import { connect } from "react-redux";
import * as Ably from 'ably'
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import FeedLocked from "./FeedLocked";
import { Snackbar } from 'react-native-paper';
/* Does not work for performance. Choppy. Do normailzer and see if that fixes things.
import FlatListItem from '@components/_Utils/FlatListItem'; */
var ably = new Ably.Realtime(AblyConfig);

class Feed extends React.Component {
  scrollX = new Animated.Value(0);
  constructor(props) {
    super(props);
    this.state = {
      progress: null,
      viewableIndex: 0,
      latestPostByName: '',
      snackbarNewMessagesVisible: false,
    };
    this.actionSheetRef = React.createRef();
    this.shareactionSheetRef = React.createRef();
    this.snackbarSheetRef = React.createRef();
    this.collectionOptionActionSheetRef = React.createRef();
    this.createCollectionActionSheetRef = React.createRef();
    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };
    (this.page = 1), (this.per_page = 10);
    this.progress = null;
    this.lastRequest;
    this.feedFlatlistRef = null;
  }

  ablyTrigger = ably.channels.get(this.props.user.user.id);

  componentDidMount() {
    this.props.setProgress(null);
    DeviceEventEmitter.addListener("event.progress", this._onProgress);
    this.eventLatestFeed = DeviceEventEmitter.addListener(
      "event.latest.feed",
      this.latestFeed
    );
    /*try {
        if (this.props.lists !== "undefined") {
            if (this.props.lists.lists.length == 0) {
                this.props.fetchPosts(this.per_page, this.page);
            } else if (this.props.lists.viewableItems !== "undefined"
                        && this.props.lists.viewableItems.length > 1
                        && typeof this.feedFlatlistRef !== "undefined"
                        && this.props.lists.lists.length > this.props.lists.viewableItems[1].viewableInex)
                {
                  this.feedFlatlistRef.scrollToIndex({ animated: false, index: this.props.lists.viewableItems[1].viewableInex });
                  console.log('.........Scroll to...........' + this.props.lists.viewableItems[1].viewableInex)
                }

        } else {
            this.props.fetchPosts(this.per_page, this.page);
        }
    } catch (e) {
        this.props.fetchPosts(this.per_page, this.page);
    }*/
    this.props.fetchPosts(this.per_page, this.page);
    this.ablyTrigger.subscribe('lastest-feed', this.refreshfeed);
    this.props.navigation.addListener("focus", this.focus);
  }


componentWillUnmount() {
      this.ablyTrigger.unsubscribe();
      this.eventLatestFeed.remove();
      DeviceEventEmitter.removeListener("event.progress");
}

  refreshfeed = (message) => {
      console.log('..............REFRESH FEED..............')
    let user_id = parseInt(message.data);
    let index = this.props.lists.lists.findIndex((item) => item.id === user_id);
    if (index == -1) {
        this.props.fetchPosts(this.per_page, this.props.lists.feedPage);
    } else {

        this.props.resortFeedUser(this.per_page, 1, user_id);
    }
    this.setState({
        snackbarNewMessagesVisible: true
    })
    console.log('..............REFRESH FEED..............' + this.state.viewableIndex)
    if(typeof this.feedFlatlistRef !== "undefined"){
      //this.feedFlatlistRef.scrollToIndex({ animated: true, index: 0 });
    }

  }

  focus = () => {
    this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({ tabBarVisible: true });
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const navigation = this.props.navigation;
    const nextBreakTime = nextProps.user.breakTime;
    if (!nextBreakTime) {
      this.props.navigation.setOptions({
        headerRight: () => (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("FeedFilter", { navigation })
              }
              style={styles.chipOpcity}
            >
              <FontAwesome name="search" size={18} color={Color.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("AddPost")}
              style={[styles.headRight, styles.chipOpcity]}
            >
              <AntDesign name="pluscircle" size={18} color={Color.primary} />
            </TouchableOpacity>
          </View>
        ),
      });
    } else {
      this.props.navigation.setOptions({
        headerRight: null,
      });
    }
  }


  latestFeed = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (this.lastRequest && now - this.lastRequest < DOUBLE_PRESS_DELAY) {
      if (this.feedFlatlistRef) {
        this.feedFlatlistRef.scrollToIndex({ animated: true, index: 0 });
        this.page = 1;
        this.props.fetchPosts(this.per_page, this.page);
      }
    } else {
      this.lastRequest = now;
    }
  };

  scrollToIndexFailed(error) {
    const offset = error.averageItemLength * error.index;
    setTimeout(() => this.feedFlatlistRef.scrollToIndex({ index: error.index }), 100);
  }

  sharePopupButton = (id) => {
    this.shareactionSheetRef.current.modalizeOpen(id);
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

  SavepostOption = (post_id) => {
    this.collectionOptionActionSheetRef.current.SavepostOption(post_id);
  };
  createCollection = (post_id) => {
    this.createCollectionActionSheetRef.current.createCollection(post_id);
  };

  savePostPopup = (id) => {
    this.actionSheetRef.current.SavepostPopup(id);
  };

  _onRefresh = () => {
    this.props.fetchPosts(1, this.page);
  };

  renderEmptyContainer = () => {
    if (!this.props.lists.isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>No Post</Text>
        </View>
      );
    }
    return null;
  };

  _onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.lists.isFetching) {
      if (this.props.lists.feedPage < this.props.lists.last_page) {
          this.page++;
          this.props.fetchPosts(this.per_page, this.page)
      } else if (!this.props.lists.timeoutTrigger) {
        this.props.addCustomCard({ id: "timeout" });
      }
    }
  };

  /*_flastListItemRenderItem= (data) => {
      const itemView = this.renderItems(data);
      return (
          <FlatListItem viewComponent={itemView} />
      )
  }*/
  renderItems = ({ item, index }) => {
    if(!item) return null;

    if (item.id === "timeout") {
      return <FeedTimeOut />;
    }
    return (
      <Post
        item={item}
        navigation={this.props.navigation}
        user_id={item.id}
        index={index}
        _sharePopupButton={this.sharePopupButton}
        _savePostPopup={this.savePostPopup}
      />
    );
  };

  handleViewableItemsChanged = (info) => {
    if (info.viewableItems) {
        let lastPositionIndex = 0;

      // since the onEndReached does not really work.. roll our own.
      if (info.viewableItems.length) {
          let viewableItem = info.viewableItems[0];
          if (viewableItem.index) {
              if (viewableItem.item && viewableItem.item.id &&
                    viewableItem.item.id != 'timeout') {
                    this.setState({viewableIndex:viewableItem.index});
              }
              if (this.props.lists.feedPage < this.props.lists.last_page
                    && !this.props.lists.isFetching)
              {
                  console.log('...........CACHE ADDITION POSTS.............')
                  this.page++;
                  this.props.fetchPosts(this.per_page, this.page)
              } else if (!this.props.lists.isFetching
                         && !this.props.lists.timeoutTrigger) {
                this.props.addCustomCard({ id: "timeout" });
              }

          }
        }
        let viewableItemWithValidIndex = [info.viewableItems[0], {viewableInex:this.state.viewableIndex}]
        this.props.onViewableItems(viewableItemWithValidIndex);
    }
  };

  onScrollEndDrag = (info) => {
    console.log('...........swipeEnd.....................')
    let viewableItems = this.props.lists.viewableItems[0];
    if (viewableItems) {
      let nextPost = this.props.lists.lists[viewableItems.index + 1];
      if (nextPost) {
        if (
          typeof nextPost.posts !== "undefined" &&
          typeof nextPost !== "undefined" &&
          nextPost.posts.length === 1
        ) {
          this.props.fetchUserPosts(this.per_page, 1, nextPost.id);
        }
      }
    }
  };

  _onProgress = (progress) => {
    this.props.setProgress(progress);
    if (progress === 100) {
      setTimeout(() => this.props.setProgress(null), 2000);
    }
  };



  render() {
    const { breakTime } = this.props.user;
    return (
      <View style={styles.container}>
        {breakTime && <FeedLocked />}
        <PostProgressBar />
        {!breakTime && (
          <FlatList

            ref={(ref) => {
              this.feedFlatlistRef = ref;
            }}
            onScrollEndDrag={this.onScrollEndDrag}
            contentContainerStyle={{ flexGrow: 1 }}
            horizontal
            pagingEnabled
            extraData={this.props.lists.lists}
            showsHorizontalScrollIndicator={false}
            data={this.props.lists.lists}
            onEndReachedThreshold={0.5}
            initialNumToRender={50}
            onEndReached={this._onEndReached}
            ListEmptyComponent={this.renderEmptyContainer}
            keyExtractor={(item, index) => index.toString()}
            renderItem={this.renderItems}
            viewabilityConfig={this.viewabilityConfig}
            onViewableItemsChanged={this.handleViewableItemsChanged}
            onScrollToIndexFailed={this.scrollToIndexFailed.bind(this)}
            disableVirtualization={false}
            ListFooterComponent={() =>
                         this.props.lists.isFetching ? (
                           <ActivityIndicator
                             style={{ flex: 1, justifyContent: "center" }}
                             size="large"
                             color={Color.gray}
                           />
                         ) : null
                       }
          />
        )}

        <SnackbarToggle ref={this.snackbarSheetRef} {...this.props} />
        <Snackbar
              duration={7000}
              visible={this.state.snackbarNewMessagesVisible}
              onDismiss={() => this.setState({ snackbarNewMessagesVisible: false })}
              action={{
                label: 'view',
                onPress: () => {this.feedFlatlistRef.scrollToIndex({ animated: true, index: 0 })},
              }}
              style={{backgroundColor: Color.black}}
            >
            <View><Text style={{color:"#ffffff"}}>New Posts {this.state.latestPostByName}</Text></View>
        </Snackbar>
        <CreateCollection
          ref={this.createCollectionActionSheetRef}
          {...this.props}
          snackbarHandler={this.snackbarHandler}
          SavepostOption={this.SavepostOption}
        />
        <SavePostCollectionOption
          ref={this.collectionOptionActionSheetRef}
          {...this.props}
          snackbarHandler={this.snackbarHandler}
          createCollection={this.createCollection}
        />
        <SavepostPopup
          ref={this.actionSheetRef}
          {...this.props}
          snackbarHandler={this.snackbarHandler}
          SavepostOption={this.SavepostOption}

        />
        <SharePopup
          ref={this.shareactionSheetRef}
          {...this.props}
          newsfeedHandler={this.newsfeedClick}
          groupHandler={this.groupClick}
          groupHandler1={this.groupClick1}
          groupHandler2={this.groupClick2}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lists: state.Post,
    user: state.User,
    last_page: state.last_page
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PostRedux");
  const { actions: ProgressActions } = require("@redux/ProgressRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchPosts: (per_page = 10, page) => {
      try {
          //move out of try catch by checking if stateProps.lists.lists.length exists
          actions.fetchPosts(dispatch, per_page, page, stateProps.lists.lists.length);
      } catch (e) {
          actions.fetchPosts(dispatch, per_page, page, 0);
      }
    },
    fetchUserPosts: (per_page = 10, page, user_id) => {
      actions.fetchUserPosts(dispatch, per_page, page, user_id);
    },
    resortFeedUser: (per_page = 10, page, user_id) => {
      actions.resortUserFeedFetchPosts(dispatch, per_page, page, user_id);
    },
    onViewableItems: (items) => dispatch(actions.onViewableItemsChanged(items)),
    setProgress: (progress) => dispatch(ProgressActions.setProgress(progress)),
    addCustomCard: (items) => {

      dispatch(actions.addCustomCard(items));
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(Feed);
