import * as React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import styles from "./styles";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { TimeAgo, PostCommentReply, UserImage } from "@components";
import { connect } from "react-redux";
import { Config, Color } from "@common";
import { OptimizeImage } from "@helpers";
import color from "../../config/color/color";

class PostComment extends React.Component {
  constructor(props) {
    super(props);
    (this.per_page = 10), (this.page = 1);
  }

  deleteCommentByPostId = () => {
    this.props.deleteCommentByPostId();
  };

  loadMoreReply = () => {
    const comment_id = Math.min.apply(Math, this.props.replayIds);
    const data = { parent_comment_id: this.props.comment.id, id: comment_id };
    this.props.replyLoadMoreByCommentId(this.per_page, this.page, data);
  };

  goToProfile = () => {
    if (this.props.user.id === this.props.comment.user.id) {
      this.props.navigation.navigate("Menu", { screen: "MyProfile" });
    } else {
      this.props.navigation.navigate("UserProfile", {
        user_id: this.props.comment.user.id,
      });
    }
  };

  commentToggleLike = () => {
    this.props.commentToggleLike(this.props.comment);
  };



  render() {
    const { comment, replayIds, isMoreFetching, user } = this.props;
    if (!comment) {
      return null;
    }

    let backgroundColor = "#fff";

    if(typeof this.props.highlight!=="undefined" && this.props.highlight.id){
      if(this.props.highlight.id==this.props.commentId){
        backgroundColor = "#DCDCDC";
      }
    }

    return (
      <View style={[styles.postcontainer]}>
        <View style={[styles.RecentComment]}>
          <View style={styles.profileimage}>
            <UserImage item={comment.user} style={styles.avatarimage} size={52} />
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={this.goToProfile}
                style={{ flexDirection: "row", flexWrap: "wrap" }}
              >
                <Text style={styles.username}>
                  {comment.user.first_name} {comment.user.last_name}
                  {comment.user.verified && (
                    <AntDesign name="star" size={18} color={Color.gold} />
                  )}
                </Text>
              </TouchableOpacity>
              <View style={styles.timeslotstatus}>
                <TimeAgo
                  style={styles.timeago}
                  created_at={comment.created_at}
                />
              </View>
            </View>
            {this.props.user.id === comment.user.id && (
              <TouchableOpacity onPress={this.deleteCommentByPostId} style={{}}>
                <Feather name="trash-2" size={18} color="black" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={[styles.replyleftspaceing]}>
          <View style={[styles.postdescription, {backgroundColor:backgroundColor, borderRadius:15, padding:10}]}>
            <Text style={styles.text}>{comment.comment}</Text>
            {comment.attachments && (
              <Image
                style={{ width: "100%", height: 200 }}
                source={{
                  uri: OptimizeImage(comment.attachments.attachment_url),
                }}
              />
            )}
          </View>
          <View style={{ marginBottom: 20 }}>
            <View style={styles.RecentCommentQuickReplyText}>
              <TouchableOpacity onPress={this.commentToggleLike}>
                <AntDesign
                  name="like1"
                  size={20}
                  color={comment.isLiked ? Color.primary : Color.gray}
                />
              </TouchableOpacity>
              <View style={styles.dot}></View>
              <TouchableOpacity
                onPress={() => this.props.replyComment(comment)}
              >
                <Text style={[styles.text, styles.Medium]}>Reply</Text>
              </TouchableOpacity>
            </View>
          </View>
          {typeof replayIds !== "undefined" &&
            replayIds !== null &&
            this.props.replayIds.map((item, key) => (
              <PostCommentReply
                user={user}
                replyId={item}
                key={key}
                navigation={this.props.navigation}
                highlight={this.props.highlight}
              />
            ))}
          {typeof replayIds !== "undefined" &&
            replayIds !== null &&
            Object.keys(replayIds).length > 0 && (
              <>
                {isMoreFetching ? (
                  <ActivityIndicator
                    style={{ marginTop: 10, marginBottom: 10 }}
                    size="small"
                    color={Color.gray}
                  />
                ) : (
                  comment.replies_count > 1 &&
                  Object.keys(replayIds).length < comment.replies_count && (
                    <TouchableOpacity
                      style={{
                        alignSelf: "flex-start",
                        padding: 8,
                        borderRadius: 20,
                        marginTop: 10,
                        marginBottom: 10,
                        backgroundColor: Color.lightGray,
                      }}
                      onPress={this.loadMoreReply}
                    >
                      <Text
                        style={{ color: Color.primary, textAlign: "center" }}
                      >
                        more...
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </>
            )}
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { commentId, user } = ownProps;
  const comment = state.Comment.commentsById[commentId];
  const replayIds = state.Comment.commentReplayIds[commentId];
  const isMoreFetching = state.Comment.isMoreFetching[commentId];
  return { comment, user, replayIds, isMoreFetching };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CommentRedux");
  const { actions: PostAction } = require("@redux/PostRedux");

  return {
    ...ownProps,
    ...stateProps,
    deleteCommentByPostId: () => {
      actions.deleteCommentByPostId(dispatch, ownProps.commentId);
    },
    replyComment: (comment) => {
      dispatch(actions.replyComment(comment));
    },
    replyLoadMoreByCommentId: (per_page, page, data) => {
      actions.replyLoadMoreByCommentId(dispatch, per_page, page, data);
    },
    commentToggleLike: (data) => {
      actions.commentToggleLike(dispatch, data);
    },

    setCommentCounter:(items, total) => {
      dispatch(PostAction.setCommentCounter(items, total));
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(PostComment);
