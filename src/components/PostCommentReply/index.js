import * as React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
import { Feather, AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { TimeAgo, UserImage } from "@components";
import { connect } from "react-redux";
import { Config, Color } from "@common";
import {OptimizeImage} from "@helpers"

class PostCommentReply extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteReplyByCommentId = () => {
    this.props.deleteReplyByCommentId();
  }

  replyToggleLike = () => {
    this.props.replyToggleLike(this.props.replay);
  };

  goToProfile = () => {

    if (this.props.user.id === this.props.replay.user.id) {
      this.props.navigation.navigate("Menu", { screen: "MyProfile" });
    } else {
      this.props.navigation.navigate("UserProfile", {
        user_id: this.props.replay.user.id,
      });
    }
}
  render() {
    const { replay } = this.props;
    if (!replay) return null;

    let backgroundColor = {};

    if(typeof this.props.highlight!=="undefined" && this.props.highlight.id){
      if(this.props.highlight.id==this.props.replyId){
        backgroundColor = {backgroundColor:'#DCDCDC'};
      }
    }


    return (
      <View style={styles.profileimage}>
        <UserImage item={replay.user} style={styles.avatarimage} size={36} />
        <View style={styles.RecentCommentContent}>
          <View style={[styles.RecentCommentBox,backgroundColor]}>
            <TouchableOpacity onPress={this.goToProfile}>
              <Text style={styles.username}>
                {replay.user.first_name} {replay.user.last_name}
                {replay.user.verified && (
                    <AntDesign name="star" size={18} color={Color.gold} />
                  )}
              </Text>
            </TouchableOpacity>
            <Text style={styles.text}>{replay.comment}</Text>
            {replay.attachments &&
            <Image style={{width:200, height:200}} source={{uri:OptimizeImage(replay.attachments.attachment_url)}} />
            }

          </View>

          <View style={[styles.RecentCommentQuickReplyText]}>
            <TouchableOpacity onPress={this.replyToggleLike}>
            <AntDesign name="like2" size={20} color={replay.isLiked?Color.primary:Color.gray} />
            </TouchableOpacity>
            <View style={styles.dot}></View>
            <TouchableOpacity>
              <TimeAgo style={styles.timeago} created_at={replay.created_at} />
            </TouchableOpacity>

            {this.props.user.id === replay.user.id && (
              <>
              <View style={styles.dot}></View>
              <TouchableOpacity  onPress={this.deleteReplyByCommentId}>
                <Feather name="trash-2" size={16} color="black" />
              </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  const { replyId, user } = ownProps;
  const replay = state.Comment.replaysById[replyId];
  return { replay, user };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CommentRedux");
  return {
    ...ownProps,
    ...stateProps,
    deleteReplyByCommentId: () => {
      actions.deleteReplyByCommentId(dispatch, ownProps.replyId);
    },
    replyToggleLike: (data) => {
      actions.replyToggleLike(dispatch, data);
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(PostCommentReply);
