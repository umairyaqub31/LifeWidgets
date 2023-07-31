import * as React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
import { Feather, AntDesign } from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Avatar } from "react-native-paper";
import { UserImage, TimeAgo } from "@components";
import { Config, Color, LifeWidget } from "@common";
import { Capitalize } from "@helpers";

class RecentComment extends React.Component {
  constructor(props) {
    super(props);
    this.delayCommentLikeTimer;
    this.delayReplyLikeTimer;
  }

  commentToggleLike = () => {
    this.props.item.recent_comments.isLiked = !this.props.item.recent_comments
      .isLiked;
    this.forceUpdate();
    clearTimeout(this.delayCommentLikeTimer);
    this.delayCommentLikeTimer = setTimeout(() => {
      LifeWidget.commentLikeToggle(this.props.item.recent_comments.id);
    }, 2000);
  };

  replyToggleLike = () => {
    this.props.item.recent_comments.recent_replies.isLiked = !this.props.item
      .recent_comments.recent_replies.isLiked;
    this.forceUpdate();
    clearTimeout(this.delayReplyLikeTimer);
    this.delayReplyLikeTimer = setTimeout(() => {
      LifeWidget.commentLikeToggle(
        this.props.item.recent_comments.recent_replies.id
      );
    }, 2000);
  };

  goToProfile = () => {
 
    if (this.props.user.id === this.props.comment.user.id) {
      this.props.navigation.navigate("Menu", { screen: "MyProfile" });
    } else {
      this.props.navigation.navigate("UserProfile", {
        user_id: this.props.comment.user.id,
      });
    }
}

  render() {
    if (!this.props.item.recent_comments) return null;
    const comment = this.props.item.recent_comments;
    const reply = comment.recent_replies;
    return (
      <>
        <View style={styles.RecentComment}>
          <View style={styles.profileimage}>
          <UserImage item={comment.user} style={styles.avatarimage} size={36} />
            <View style={styles.RecentCommentContent}>
              <View style={styles.RecentCommentBox}>
                <TouchableOpacity>
                  <Text style={styles.username}>
                    {Capitalize(comment.user.first_name)}{" "}
                    {Capitalize(comment.user.last_name)}
                    {comment.user.verified && (
                      <AntDesign name="star" size={18} color={Color.gold} />
                    )}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.text}>{comment.comment}</Text>
                {comment.attachments && (
                  <Image
                    style={{ width: "100%", aspectRatio: 2 / 2 }}
                    source={{
                      uri:
                        Config.lifeWidget.url +
                        "/" +
                        comment.attachments.attachment_url,
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
                  <TimeAgo
                    style={styles.timeago}
                    created_at={comment.created_at}
                  />
                </View>
              </View>
              {!!reply && (
                <View style={styles.profileimage}>
                <UserImage item={reply.user} style={styles.avatarimage} size={36} />
                  <View style={styles.RecentCommentContent}>
                    <View style={styles.RecentCommentBox}>
                      <TouchableOpacity>
                        <Text style={styles.username}>
                          {Capitalize(reply.user.first_name)}{" "}
                          {Capitalize(reply.user.last_name)}
                          {reply.user.verified && (
                            <AntDesign name="star" size={18} color={Color.gold} />
                          )}
                        </Text>
                      </TouchableOpacity>

                      <View style={styles.userMentionedBox}>
                        <Text style={styles.text}>{reply.comment}</Text>
                        {reply.attachments && (
                          <Image
                            style={{ width: "100%", aspectRatio: 2 / 2 }}
                            source={{
                              uri:
                                Config.lifeWidget.url +
                                "/" +
                                reply.attachments.attachment_url,
                            }}
                          />
                        )}
                      </View>
                    </View>
                    <View style={styles.RecentCommentQuickReplyText}>
                      <TouchableOpacity onPress={this.replyToggleLike}>
                        <AntDesign
                          name="like2"
                          size={20}
                          color={reply.isLiked ? Color.primary : Color.gray}
                        />
                      </TouchableOpacity>
                      <View style={styles.dot}></View>

                      <TimeAgo
                        style={styles.timeago}
                        created_at={reply.created_at}
                      />
                    </View>
                  </View>
                </View>
              )}
            </View>
          </View>
          <View style={styles.writeCommentTextarea}>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Feather
                name="camera"
                style={styles.avatarimage}
                size={22}
                color={colors.gray}
              />
            </View>

            <TouchableOpacity
              style={styles.roundedTextareaContainer}
              onPress={() =>
                this.props.navigation.navigate("FeedDetail", {
                  item: this.props.item,
                  focus:true
                })
              }
            >
              <Text style={styles.roundedTextarea}>Write a Comment...</Text>
              <View style={styles.roundedTextareaIcons}>
                <Feather name="smile" size={18} color={colors.gray} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

export default RecentComment;