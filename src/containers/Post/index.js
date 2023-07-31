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
import { Color } from "@common";
import { connect } from "react-redux";

class Post extends React.PureComponent {
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
    if (this.props.index === 0) {
      this.timeout = setTimeout(() => {
        this._onRefresh();
      }, 1000);
    }
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
      if (this.props.item.posts_count === this.props.item.posts.length) {
        return;
      }
    this.page = 1;
    this.props.fetchUserPosts(this.per_page, this.page, this.props.user_id);
  };

  renderEmptyContainer = () => {
    if (!this.props.lists.isPostFetching) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>No Post</Text>
        </View>
      );
    }
    return null;
  };

  _onEndReached = ({ distanceFromEnd }) => {
    let viewableItem = this.props.lists.viewableItems.find(
      (item) => item.index === this.props.index
    );

    if (this.props.item.posts_count === this.props.item.posts.length) {
      return;
    }

    if (viewableItem) {
      if (!this.props.lists.isPostFetching) {
        this.page++;
        this.props.fetchUserPosts(this.per_page, this.page, this.props.user_id);
      }
    }
  };

  handleScroll = ({ nativeEvent }) => {

    if(typeof this.props.lists!=="undefined" && typeof this.props.lists.viewableItems !=="undefined"){
      let viewableItem = this.props.lists.viewableItems.find(
        (item) => item.index === this.props.index
      );
      if (viewableItem) {

        if (!this.props.lists.isPostFetching && this.props.item.posts_count < this.props.item.posts.length) {
          this.page++;
          this.props.fetchUserPosts(this.per_page, this.page, this.props.user_id);
        }
      }
    }

  };

  savePostPopup = (id) => {
    this.props._savePostPopup(id);
  };

  shareContainer = (share) => {
    const item = Object.assign({}, share);
    if (Object.keys(item).length > 0) {
      return (
        <View style={[styles.sherecontainer, {borderWidth:1}]}>
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
  mediaContainer = (item)  => {
     if (item.attachments && item.attachments.length) {
         return (
             <View>
               <ImagesGrid item={item} />
             </View>
         )
     } else {
       return null;
     }
  }
  render() {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={this._onRefresh} />
        }
        onEndReached={this._onEndReached}
        onEndReachedThreshold={0.5}
        data={this.props.item.posts}
        ListFooterComponent={() =>
          this.props.lists.isPostFetching ? (
            <ActivityIndicator style={{ margin: 10 }} color={Color.gray} />
          ) : null
        }
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

              </View>
              {this.mediaContainer(item)}
              {this.shareContainer(item.share)}
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

const mapStateToProps = (state) => {
  return {
    lists: state.Post,
    me: state.User.user,
    token: state.User.token,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PostRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchUserPosts: (per_page = 10, page, user_id) => {
        console.log('...............Fetching...............' + user_id);
      actions.fetchUserPosts(dispatch, per_page, page, user_id);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(Post);
