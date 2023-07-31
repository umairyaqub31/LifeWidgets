import * as React from "react";
import {
  Text,
  Animated,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  DeviceEventEmitter,
  ScrollView,
  RefreshControl,
  LayoutAnimation,
  UIManager,
  Platform,
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
  Profileimage,
  Footericons,
  Postdescription,
  ImagesGrid,
  RecentComment,
  ReactionsPopup,
  TopTabsPopup,
  TopTabsScrolling,
  FeedSkeleton
} from "@components";
import { Post } from "@containers";
import { Color, AblyConfig } from "@common";
import { connect } from "react-redux";
import * as Ably from "ably";
import { Feather, FontAwesome, AntDesign } from "@expo/vector-icons";
import FeedLocked from "./FeedLocked";
import { Snackbar } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}


var ably = new Ably.Realtime(AblyConfig);

class FeedVertical extends React.PureComponent {
  scrollX = new Animated.Value(0);
  constructor(props) {
    super(props);
    this.state = {
      progress: null,
      viewableIndex: 0,
      latestPostByName: "",
      snackbarNewMessagesVisible: false,
      animatedTop:-50
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
    this.reactionSheetRef = React.createRef();
    this.topTabsSheetRef = React.createRef();
  }

  ablyTrigger = ably.channels.get(this.props.user.user.id);

  componentDidMount() {
      
    const navigation = this.props.navigation;
    this.props.setProgress(null);
    DeviceEventEmitter.addListener("event.progress", this._onProgress);
    this.eventLatestFeed = DeviceEventEmitter.addListener(
      "event.latest.feed",
      this.latestFeed
    );
    this.eventRefreshFeed = DeviceEventEmitter.addListener(
      "event.feed.refresh",
      this.latestFeed
    );

    this.props.fetchFeed(this.per_page, this.page);
    this.ablyTrigger.subscribe("lastest-feed", this.refreshfeed);
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
    this.props.navigation.addListener("focus", this.focus);
  }
  componentWillUnmount() {
    this.ablyTrigger.unsubscribe();
    this.eventLatestFeed.remove();
    this.eventRefreshFeed.remove();
    DeviceEventEmitter.removeListener("event.progress");
  }
  focus = () => {
    this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({ tabBarVisible: true });
  };

  refreshfeed = (message) => {
    let user_id = parseInt(message.data);
    this.setState({
      snackbarNewMessagesVisible: true,
    });
  };

  latestFeed = () => {
    if (this.feedFlatlistRef) {
      this.feedFlatlistRef.scrollToIndex({ animated: true, index: 0 });
      this.page = 1;
      this.props.fetchFeed(this.per_page, this.page);
    }
  };

  scrollToIndexFailed(error) {
    const offset = error.averageItemLength * error.index;
    setTimeout(
      () => this.feedFlatlistRef.scrollToIndex({ index: error.index }),
      100
    );
  }

  sharePopupButton = (id) => {
    this.shareactionSheetRef.current.modalizeOpen(id);
  };

  reactionsPopupButton = (evt) => {
    this.reactionSheetRef.current.modalizeOpen(evt);
  };
  
  topTabsShowPoup = () => {
    this.topTabsSheetRef.current.modalizeOpen();
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
    this.props.fetchFeed(this.per_page, this.page);
  };

  renderEmptyContainer = () => {
    if (!this.props.feed.isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>No Post</Text>
        </View>
      );
    }
    return null;
  };

  _onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.feed.isFetching) {
      if (this.props.feed.page < this.props.feed.last_page) {
        this.page++;
        this.props.fetchFeed(this.per_page, this.page);
      } else if (!this.props.feed.timeoutTrigger) {
        this.props.addCustomCard({ id: "timeout" });
      }
    }
  };

  shareContainer = (share) => {
    const item = Object.assign({}, share);
    if (Object.keys(item).length > 0) {
      return (
        <View style={[styles.sherecontainer]}>
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
  mediaContainer = (item) => {
    if (item.attachments && item.attachments.length) {
      return (
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
      );
    } else {
      return null;
    }
  };

  renderItems = ({ item, index }) => {
    if (!item) return null;
    if (!item.id) return null;
    if (item.id === "timeout") {
      return null;
      //return <FeedTimeOut />;
    }
    return (
      <>
        <View
          style={[
            styles.postcontainer,
            {
              backgroundColor: "#fff",
              position:'relative'
            },
          ]}
        >
          <View style={styles.profileimagewithoption}>
            <View style={{ flex: 1 }}>
              <Profileimage
                item={item}
                me={this.props.user}
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
            <Postdescription item={item} navigation={this.props.navigation} />
          </View>
            {this.mediaContainer(item)}
            {this.shareContainer(item.share)}
          <View>

            <Footericons
              item={item}
              sharePopupButton={() => this.sharePopupButton(item.id)}
              navigation={this.props.navigation}
              reactionsPopupButton={this.reactionsPopupButton}
            />
          </View>

          <RecentComment item={item} navigation={this.props.navigation} />
        </View>
      </>
    );
  };

  handleViewableItemsChanged = (info) => {
    if (info.viewableItems) {
      let lastPositionIndex = 0;
      if (info.viewableItems.length) {
        this.props.onViewableItems(info.viewableItems[0]);
      }
    }
  };

  _onProgress = (progress) => {
    this.props.setProgress(progress);
    if (progress === 100) {
      setTimeout(() => this.props.setProgress(null), 2000);
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
          } catch(e) {
            console.log('could not pauseVideo');
          }
        }
      }
    });
  };

  handleScroll = (event) => {
    LayoutAnimation.configureNext({
      duration: 100,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      },
    });
    const currentOffset = event.nativeEvent.contentOffset.y;
    const dif = currentOffset - (this.offset || 0);
    if (currentOffset < 20) {
      console.log('unclearrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
      this.setState({animatedTop:-50})
    } else if (dif <= 20) {
      console.log('uppppppppppppppppppppppppppppppppppppppppppppppp');
      this.setState({animatedTop:-55})
    } else {
      console.log('downnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn');
      this.setState({animatedTop:-50})
    }
    this.offset = currentOffset;
  }

  render() {
    const { breakTime } = this.props.user;
    return (
      <View style={[styles.container, { backgroundColor: "#b2bec3" }]}>
      <Animated.View
          style={[styles.animtedTabsWrapper,styles.boxShadow,styles.list,{
            transform: [{ translateY: this.state.animatedTop }],
          }]}
        >
        <TopTabsScrolling topTabsShowPoup={this.topTabsShowPoup} {...this.props}/>
      </Animated.View>
        {breakTime && <FeedLocked />}
        <PostProgressBar />
        {!breakTime && (
          <FlatList
            ref={(ref) => {
              this.feedFlatlistRef = ref;
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={this._onRefresh} />
            }
            onViewableItemsChanged={this.onViewableItemsChanged}
            onEndReached={this._onEndReached}
            onEndReachedThreshold={0.5}
            data={this.props.feed.feed}
            ListFooterComponent={() =>
              this.props.feed.isFetching ? (
                <View style={[styles.postcontainer,{backgroundColor: "#fff"}]}>
                    <FeedSkeleton />
                </View>
              ) : null
            }
            renderItem={this.renderItems}
            onScroll={this.handleScroll}
          />
        )}
        <SnackbarToggle ref={this.snackbarSheetRef} {...this.props} />
        <Snackbar
          duration={7000}
          visible={this.state.snackbarNewMessagesVisible}
          onDismiss={() => this.setState({ snackbarNewMessagesVisible: false })}
          action={{
            label: "view",
            onPress: () => {
              this.latestFeed;
            },
          }}
          style={{ backgroundColor: Color.black }}
        >
          <View>
            <Text style={{ color: "#ffffff" }}>
              New Posts {this.state.latestPostByName}
            </Text>
          </View>
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
        <TopTabsPopup ref={this.topTabsSheetRef} {...this.props}/>

        <ReactionsPopup ref={this.reactionSheetRef} {...this.props}/>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    feed: state.Feed,
    user: state.User,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/FeedRedux");
  const { actions: ProgressActions } = require("@redux/ProgressRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchFeed: (per_page = 10, page) => {
      actions.fetchFeed(dispatch, per_page, page);
    },
    onViewableItems: (items) => dispatch(actions.onViewableItemsChanged(items)),
    setProgress: (progress) => dispatch(ProgressActions.setProgress(progress)),
    addCustomCard: (items) => {
      //dispatch(actions.addCustomCard(items));
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(FeedVertical);
