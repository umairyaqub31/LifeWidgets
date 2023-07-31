import * as React from "react";
import { Text, TouchableOpacity, View, Pressable  } from "react-native";
import styles from "./styles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import colors from "@common/Color";
import { connect } from "react-redux";
import { LifeWidget } from "@common";
import { Reactions, Reactions3, Reactions2 } from "@components"

class Footericons extends React.Component {
  constructor(props) {
    super(props);
    this.delayLikeTimer;
    this.delayDislikeTimer;
  }

  liked = async () => {
    this.props.item.isLiked = !this.props.item.isLiked;
    this.props.item.isDisliked = false;
    this.forceUpdate();
    clearTimeout(this.delayLikeTimer);
    this.delayLikeTimer = setTimeout(() => {
      requestAnimationFrame(async () => {
        await LifeWidget.postLiked(this.props.item.id);
      });
    }, 2000);

    //this.props.like(this.props.item);
  };
  dislike = async () => {
    this.props.item.isDisliked = !this.props.item.isDisliked;
    this.props.item.isLiked = false;
    this.forceUpdate();
    clearTimeout(this.delayDislikeTimer);
    this.delayDislikeTimer = setTimeout(() => {
      requestAnimationFrame(async () => {
        await LifeWidget.postDisliked(this.props.item.id);
      });
    }, 2000);

    //this.props.unlike(this.props.item);
  };


  navigateDetail = () => {
    this.props.navigation.navigate("FeedDetail", {
      item: this.props.item,
      focus:true
    })
  }

  render() {
    const likedColor = !this.props.item.isLiked ? colors.gray : "green";
    const dislikedColor = !this.props.item.isDisliked ? colors.gray : "#F33E58";
    return (
      <>
        <View style={styles.footerstats}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("PeopleReacted", {
                item: this.props.item,
              })
            }
          >
            {/* <View style={styles.foottotallikes}>
              <View
                style={[styles.footstatsopacity, styles.footiconopacityleft]}
              >
                {(this.props.item.isLiked || this.props.item.likes_count > 1) && (
                  <View style={styles.footerStatslikeIconChip}>
                    <AntDesign name="like1" size={12} color={colors.white} />
                  </View>
                )}

                <Text style={styles.graytext}>
                  {this.props.item.isLiked && "You"}
                  {this.props.item.isLiked && this.props.item.likes_count > 1
                    ? " and "
                    : ""}
                  {this.props.item.likes_count > 1
                    ? `${this.props.item.likes_count} others`
                    : ""}
                </Text>
              </View>
            </View> */}
          <Reactions2 item={this.props.item} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("FeedDetail", {
                item: this.props.item,
              })
            }
          >
            <View style={styles.foottotallikes}>
              <View style={styles.footstatsopacity}>
                <Text style={styles.graytext}>
                  {this.props.item.shares_count} Shares
                </Text>
              </View>
              <View style={styles.dot}></View>
              <View style={styles.footstatsopacity}>
                <Text style={styles.graytext}>
                  {this.props.item.comments_count} Comments
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
          {/* <Reactions /> */}
        <View style={[styles.footer]}>
          <Reactions3 item={this.props.item} />
          {/* <Pressable onLongPress={(evt) => this.props.reactionsPopupButton(evt)}><Text>Reactions</Text></Pressable> */}

          <View style={[styles.footerleft,{zIndex:-1}]}>
          {/* <Pressable
              style={styles.footiconopacity}
              delayLongPress={120}
              onLongPress={(evt) => this.props.reactionsPopupButton(evt)}
            >
            <Ionicons name="md-chatbox-outline" size={20} color={colors.gray} />
              <Text style={[styles.graytext]}>
                Like
              </Text>
            </Pressable> */}
            {/* <TouchableOpacity
              style={[styles.footiconopacity, styles.footiconopacityleft]}
              onPress={this.liked}
            >
              <AntDesign name="like2" size={20} color={likedColor} />
              <Text style={[styles.graytext, { color: likedColor }]}>Like</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              style={styles.footiconopacity}
              onPress={this.dislike}
            >
              <AntDesign name="dislike2" size={20} color={dislikedColor} />
              <Text style={[styles.graytext, { color: dislikedColor }]}>
                Dislike
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.footiconopacity}
              onPress={this.navigateDetail}
            >
            <Ionicons name="md-chatbox-outline" size={20} color={colors.gray} />
              <Text style={[styles.graytext]}>
                Comment
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.footerright,{zIndex:-1}]}>
            <TouchableOpacity
              style={[styles.footiconopacity, styles.footiconopacityRight]}
              onPress={this.props.sharePopupButton}
            >
              <AntDesign name="sharealt" size={20} color={colors.gray} />
              <Text style={styles.graytext}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.Post
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PostRedux");
  return {
    ...ownProps,
    ...stateProps,
    like: (item) => {
      actions.like(dispatch, item);
    },
    unlike: (item) => {
      actions.unlike(dispatch, item);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(Footericons);
