import * as React from "react";
import {
  Dimensions,
  Animated,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Keyboard,
  DeviceEventEmitter,
  Easing,
  KeyboardAvoidingView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import styles from "./styles";
import { Color } from "@common";
import {
  Profileimage,
  Footericons,
  Postdescription,
  SavepostPopup,
  ImagesGrid,
  SharePopup,
  PostComment,
  PostCommentBox,
} from "@components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FeedLocked from "../Feed/FeedLocked";
import { connect } from "react-redux";
import store from "../../store";

class FeedDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
    this.actionSheetRef = React.createRef();
    this.shareactionSheetRef = React.createRef();
    this.translateValue = new Animated.Value(0);
    this.commentFlatlistRef;
    (this.per_page = 10), (this.page = 1);
    this.params = [];
  }

  componentDidMount() {
    this.props.loadingFirstTime();
    this.props.navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headertitle}>
          <Text style={styles.headertitleText}>
            {this.props.route.params.item.user.first_name}
          </Text>
        </View>
      ),
    });

    this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({ tabBarVisible: false });

    this.params["post_id"] = this.props.route.params.item.id;
    this.props.fetchCommentsByPostId(this.per_page, this.page, this.params);
    this.flatlistCommentListener = DeviceEventEmitter.addListener(
      "event.comment.submitted",
      this.moveToBottom
    );
    this.flatlistCounterListener = DeviceEventEmitter.addListener(
      "event.comment.counter",
      this.eventCommentCounter
    );
    this.flatlistRealtimeListener = DeviceEventEmitter.addListener(
      "event.comment.realtime",
      this.eventCommentRealtime
    );
    this.flatlistRealtimeListener = DeviceEventEmitter.addListener(
      "event.comment.delete",
      this.eventCommentDelete
    );
    this.fetchCommentInterval = setInterval(() => {
      const comment_id =
        this.props.commentIds[this.props.commentIds.length - 1];
      console.log(comment_id);
      const params = {
        post_id: this.props.route.params.item.id,
        id: parseInt(comment_id),
      };
      this.props.fetchCommentsRealTimeByPostId(this.per_page, 1, params);
    }, 5000);
  }

  eventCommentDelete = () => {
    this.clearCommentCounter = setTimeout(() => {
      try {
        this.props.setCommentCounter(
          {
            post_id: this.props.route.params.item.id,
            user_id: this.props.route.params.item.user.id,
          },
          parseInt(this.props.route.params.item.comments_count) - 1
        );
      } catch (e) {
        console.log(e);
      }
    }, 500);
  };

  eventCommentCounter = (comment) => {
    console.log(".............eventCommentCounter..............");
    console.log(this.props);
    setTimeout(() => {
      try {
        this.props.setCommentCounter(
          {
            post_id: this.props.route.params.item.id,
            user_id: this.props.route.params.item.user.id,
          },
          comment.comment_count
        );
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  };

  eventCommentRealtime = () => {
    setTimeout(() => {
      try {
        this.props.setCommentCounter(
          {
            post_id: this.props.route.params.item.id,
            user_id: this.props.route.params.item.user.id,
          },
          parseInt(this.props.route.params.item.comments_count) + 1
        );
      } catch (e) {
        console.log(e);
      }
    }, 2000);
  };

  UNSAFE_componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
  }
  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
    this.flatlistCommentListener.remove();
    this.flatlistCounterListener.remove();
    this.flatlistRealtimeListener.remove();
    clearInterval(this.fetchCommentInterval);
    clearTimeout(this.clearCommentCounter);
  }
  keyboardWillShow = (event) => {
    console.log(event.endCoordinates);
    Animated.timing(this.translateValue, {
      toValue: -event.endCoordinates.height,
      duration: event.duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.elastic(1)),
    }).start();
  };
  keyboardWillHide = (event) => {
    Animated.spring(this.translateValue, {
      toValue: 0,
      duration: event.duration,
      useNativeDriver: true,
      easing: Easing.in(Easing.elastic(1)),
    }).start();
  };

  sharePopupButton = () => {
    this.shareactionSheetRef.current.modalizeOpen(this.props.route.params.item);
  };

  _commenthandlePress = (text) => {
    this.setState({ text });
  };

  moveToBottom = () => {
    if (this.commentFlatlistRef) {
      // const index = this.props.commentIds.length - 1;
      // if (index > -1) {

      // }
      setTimeout(
        () =>
          this.commentFlatlistRef.scrollToEnd({
            animated: true,
          }),
        1000
      );
    }
  };

  _onEndReached = () => {
    if (!this.props.isFetching) {
      console.log("fetching...");
      this.page++;
      this.props.fetchCommentsByPostId(this.per_page, this.page, this.params);
    }
  };

  renderItems = ({ item }) => {
    if (!this.props.firstTimeLoading) {
      return (
        <PostComment
          commentId={item}
          user={this.props.user}
          navigation={this.props.navigation}
          highlight={this.props.route.params.highlight}
        />
      );
    }
  };

  onScroll = (e) => {
    if (
      this.props.isFetching === false &&
      e.nativeEvent.contentOffset.y === 0
    ) {
      console.log("fetching...");
      this.page++;
      this.props.fetchCommentsByPostId(this.per_page, this.page, this.params);
    }
  };

  listFooterComponent = () => {
    if (this.props.isFetching) {
      return null; //<ActivityIndicator size="small" color={Color.primary} />;
    }
    return null;
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
                me={this.props.user}
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

  listHeaderComponent = () => {
    return (
      <View style={[styles.postcontainer]}>
        <View style={[styles.profileimagewithoption]}>
          <View style={{ flex: 1 }}>
            <Profileimage
              item={this.props.route.params.item}
              me={this.props.user}
              navigation={this.props.navigation}
            />
          </View>
          <TouchableOpacity
            style={styles.optionopacity}
            onPress={() =>
              this.actionSheetRef.current.SavepostPopup(
                this.props.route.params.item
              )
            }
          >
            <Image
              style={styles.option}
              source={require("../../../assets/images/options.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.Postdescriptionheight}>
          <Postdescription item={this.props.route.params.item} />
        </View>
        {this.shareContainer(this.props.route.params.item.share)}
        <View>
          <ImagesGrid item={this.props.route.params.item} {...this.props} />
        </View>

        <View>
          <Footericons
            item={this.props.route.params.item}
            {...this.props}
            sharePopupButton={this.sharePopupButton}
          />
        </View>
      </View>
    );
  };

  onRefresh = () => {
    this.page = 1;
    this.props.fetchCommentsByPostId(this.per_page, this.page, this.params);
  };

  scrollToIndexFailed = (error) => {
    const offset = error.averageItemLength * error.index;
    this.flatListRef.scrollToOffset({ offset });
    setTimeout(
      () => this.commentFlatlistRef.scrollToIndex({ index: error.index }),
      100
    ); // You may choose to skip this line if the above typically works well because your average item height is accurate.
  };

  render() {
    const breakTime = this.props.breakTime;
    console.log("detail");
    return (
      <>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          {breakTime && <FeedLocked />}
          {!breakTime && (
            <>
              <View style={[styles.container]}>
                <View>
                  <FlatList
                    ref={(ref) => {
                      this.commentFlatlistRef = ref;
                    }}
                    //refreshControl={<RefreshControl  onRefresh={this.onRefresh} />}
                    contentContainerStyle={[styles.replypostcontainer]}
                    showsVerticalScrollIndicator={false}
                    extraData={this.props.commentIds}
                    data={this.props.commentIds}
                    onEndReachedThreshold={0.5}
                    keyExtractor={(item, index) => item.toString()}
                    renderItem={this.renderItems}
                    ListFooterComponent={this.listFooterComponent}
                    ListHeaderComponent={this.listHeaderComponent}
                    onEndReached={this._onEndReached}
                    removeClippedSubviews={true}
                    initialNumToRender={8}
                    maxToRenderPerBatch={2}
                    //contentOffset = {{x: 0, y: 10}}
                  />
                </View>
                {this.props.firstTimeLoading && (
                  <ActivityIndicator size="small" color={Color.primary} />
                )}
                <SavepostPopup
                  navigation={this.props.navigation}
                  detail={true}
                  ref={this.actionSheetRef}
                />
                <SharePopup {...this.props} ref={this.shareactionSheetRef} />
              </View>
            </>
          )}
        </KeyboardAwareScrollView>
        <Animated.View
          style={{
            transform: [{ translateY: this.translateValue }],
            zIndex: 11,
            bottom: 0,
            width: "100%",
          }}
        >
          <PostCommentBox
            focus={this.props.route.params.focus}
            post_id={this.props.route.params.item.id}
          />
        </Animated.View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    commentIds: state.Comment.commentIds,
    isFetching: state.Comment.isFetching,
    firstTimeLoading: state.Comment.firstTimeLoading,
    user: state.User.user,
    token: state.User.token,
    breakTime: state.User.breakTime,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CommentRedux");
  const { actions: FeedAction } = require("@redux/FeedRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchCommentsByPostId: (per_page, page, params = []) => {
      actions.fetchCommentsByPostId(dispatch, per_page, page, params);
    },
    fetchCommentsRealTimeByPostId: (per_page, page, params = []) => {
      actions.fetchCommentsRealTimeByPostId(dispatch, per_page, page, params);
    },
    postCommentByPostId: (data) => {
      actions.postCommentByPostId(dispatch, data);
    },
    loadingFirstTime: () => {
      dispatch(actions.loadingFirstTime());
    },
    setCommentCounter: (items, total) => {
      dispatch(FeedAction.setCommentCounterFeed(items, total));
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(FeedDetail);