import * as React from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import styles from "./styles";
import { Feather, AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { connect } from "react-redux";
import { Capitalize } from "@helpers";

class SavepostPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
    };
    this.modalizeRef = React.createRef();
  }

  SavepostPopup = (item) => {
    this.setState({ item });
    this.modalizeRef.current?.open();
  };
  ReportScreen = () => {
    this.modalizeRef.current.close();
    this.props.navigation.navigate("Report", { item: this.state.item });
  };
  snackbarHandler = () => {
    this.props.snackbarHandler();
    this.modalizeRef.current.close();
  };

  SavepostOption = () => {
    this.props.SavepostOption(this.state.item.id);
    this.modalizeRef.current.close();
  };

  UnsavepostOption = async () => {
    const data = { post_id: this.state.item.id, save_id: this.props.save_id };
    this.modalizeRef.current.close();
    this.props.unsavePost(data);
  };

  deletePost = () => {
    this.props.deletePost(this.state.item);
    this.modalizeRef.current.close();
    if (this.props.detail) {
      this.props.navigation.goBack();
    }
  };

  editPost = () => {
    this.modalizeRef.current.close();
    this.props.navigation.navigate("AddPost", { item: this.state.item });
  };

  render() {
    const { item } = this.state;
    const user = typeof item.user === "undefined" ? {} : item.user;
    return (
      <>
        <Portal>
          <Modalize ref={this.modalizeRef} adjustToContentHeight={true}>
            <View style={styles.scrolledView}>
              {this.state.item.user_id === this.props.user.id && (
                <>
                  <TouchableOpacity
                    style={styles.modallistcontainer}
                    onPress={this.editPost}
                  >
                    <View style={styles.customchipicons}>
                      <Feather name="edit" size={26} color={colors.black} />
                    </View>
                    <View style={styles.pendinginvitesnamecontainer}>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={styles.modallist}>Edit post</Text>
                        <Text style={styles.graytext}>
                          Edit text, images, video and visibility
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modallistcontainer}
                    onPress={this.deletePost}
                  >
                    <View style={styles.customchipicons}>
                      <Feather name="trash" size={26} color={colors.black} />
                    </View>
                    <View style={styles.pendinginvitesnamecontainer}>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={styles.modallist}>Delete post</Text>
                        <Text style={styles.graytext}>
                          Delete post permanently
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              )}
              {/* <TouchableOpacity style={styles.modallistcontainer} onPress={this.snackbarHandler}>
                    <View style={styles.customchipicons}>
                        <MaterialIcons name="report" size={26} color={colors.black} />
                    </View>
                    <View  style={styles.pendinginvitesnamecontainer}>
                        <View style={{marginLeft:10}}>
                            <Text style={styles.modallist}>Unfollow for 30 Days</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modallistcontainer} onPress={this.snackbarHandler}>
                    <View style={styles.customchipicons}>
                        <Feather name="bell" size={22} color={colors.black} />
                    </View>
                    <View  style={styles.pendinginvitesnamecontainer}>
                        <View style={{marginLeft:10}}>
                            <Text style={styles.modallist}>Trun on notification for this post </Text>
                        </View>
                    </View>
                </TouchableOpacity> */}
              {this.props.unsave ? (
                <TouchableOpacity
                  style={styles.modallistcontainer}
                  onPress={this.UnsavepostOption}
                >
                  <View style={styles.customchipicons}>
                    <Feather name="bookmark" size={20} color={colors.black} />
                  </View>
                  <View style={styles.pendinginvitesnamecontainer}>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.modallist}>Unsave post</Text>
                      <Text style={styles.graytext}>
                        remove this to your saved items.
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.modallistcontainer}
                  onPress={this.SavepostOption}
                >
                  <View style={styles.customchipicons}>
                    <Feather name="bookmark" size={20} color={colors.black} />
                  </View>
                  <View style={styles.pendinginvitesnamecontainer}>
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.modallist}>Save post</Text>
                      <Text style={styles.graytext}>
                        Add this to your saved items.
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}

              {this.state.item.user_id !== this.props.user.id && (
                <>
                  {user.is_friend ? (
                    <>
                      {!user.is_snoozed ? (
                        <TouchableOpacity
                          style={styles.modallistcontainer}
                          onPress={()=>this.props.snoozeFriend(user.id)}
                        >
                          <View style={styles.customchipicons}>
                            <Feather
                              name="clock"
                              size={20}
                              color={colors.black}
                            />
                          </View>
                          <View style={styles.pendinginvitesnamecontainer}>
                            <View style={{ marginLeft: 10 }}>
                              <Text style={styles.modallist}>
                                Unfollow for 30 days
                              </Text>
                              <Text style={styles.graytext}>
                                {"Stop seeing posts but stay friend."}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={styles.modallistcontainer}
                          onPress={()=>this.props.unsnoozeFriend(user.id)}
                        >
                          <View style={styles.customchipicons}>
                            <Feather
                              name="clock"
                              size={20}
                              color={colors.black}
                            />
                          </View>
                          <View style={styles.pendinginvitesnamecontainer}>
                            <View style={{ marginLeft: 10 }}>
                              <Text style={styles.modallist}>
                                Undo Unfollow for 30 days
                              </Text>
                              <Text style={styles.graytext}>
                                {"Start seeing posts."}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={styles.modallistcontainer}
                        onPress={()=>this.props.unfriend(user.id)}
                      >
                        <View style={[styles.customchipicons]}>
                          <AntDesign
                            name="deleteuser"
                            size={20}
                            color={colors.danger}
                          />
                        </View>
                        <View style={styles.pendinginvitesnamecontainer}>
                          <View style={{ marginLeft: 10 }}>
                            <Text style={[styles.modallist]}>Unfriend</Text>
                            <Text style={styles.graytext}>
                              Remove {Capitalize(user.first_name)} as a friend
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      {/* <TouchableOpacity
                        style={styles.modallistcontainer}
                        //onPress={this.ReportScreen}
                      >
                        <View style={styles.customchipicons}>
                          <SimpleLineIcons
                            name="user-unfollow"
                            size={20}
                            color={colors.black}
                          />
                        </View>
                        <View style={styles.pendinginvitesnamecontainer}>
                          <View style={{ marginLeft: 10 }}>
                            <Text style={styles.modallist}>Block</Text>
                            <Text style={styles.graytext}>
                              {
                                "You won't be able to see or contact each other."
                              }
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity> */}
                    </>
                  ) : null}
                  <TouchableOpacity
                    style={styles.modallistcontainer}
                    onPress={this.ReportScreen}
                  >
                    <View style={styles.customchipicons}>
                      <Feather name="flag" size={20} color={colors.black} />
                    </View>
                    <View style={styles.pendinginvitesnamecontainer}>
                      <View style={{ marginLeft: 10 }}>
                        <Text style={styles.modallist}>Report</Text>
                        <Text style={styles.graytext}>
                          {"I'm concerned about this post."}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </Modalize>
        </Portal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.User.user,
    posts: state.Post.posts,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PostRedux");
  const { actions: FeedAction } = require("@redux/FeedRedux");

  return {
    ...ownProps,
    ...stateProps,
    deletePost: (item) => {
      actions.deletePost(dispatch, item);
      FeedAction.deletePostFeed(dispatch, item);
    },
    unfriend: (friend_id) => {
      actions.unfriend(dispatch, friend_id);
      FeedAction.unfriend(dispatch, friend_id);
    },
    snoozeFriend: (item) => {
      actions.snoozeFriend(dispatch, item);
      FeedAction.snoozeFriend(dispatch, item);
      
    },
    unsnoozeFriend: (item) => {
      actions.unsnoozeFriend(dispatch, item);
      FeedAction.unsnoozeFriend(dispatch, item);
    },
    unsavePost: (item) => {
      actions.unsavePost(dispatch, item);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps, {
  forwardRef: true,
})(SavepostPopup);
