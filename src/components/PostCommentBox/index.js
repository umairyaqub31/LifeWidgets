import * as React from "react";
import {
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  View,
  Keyboard,
  Text,
} from "react-native";
import styles from "./styles";
import colors from "../../config/color/color";
import { Feather, AntDesign } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";
import EmojiBoard from 'react-native-emoji-board'



class PostCommentBox extends React.Component {
  constructor(props) {
    super(props);
  }

  openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();

    if (!pickerResult.cancelled) {
      var formData = new FormData();
      var uri =
        Platform.OS === "android"
          ? pickerResult.uri
          : pickerResult.uri.replace("", "");

      formData.append("file", {
        uri: uri,
        type: Platform.OS === "android" ? "image/jpeg" : pickerResult.type,
        name: pickerResult.filename || `filename${0}.` + uri.split(".").pop(),
      });
      formData.append("post_id", this.props.post_id);
      formData.append("comment", this.props.commentText);
      if (this.props.comment) {
        formData.append("parent_comment_id", this.props.comment.id);
      }
      this.props.postCommentByPostId(formData);
    }
  };

  submitComment = () => {
    if (this.props.commentText && !this.props.isPosting) {
      const data = {
        post_id: this.props.post_id,
        comment: this.props.commentText,
      };
      if (this.props.comment) {
        data["parent_comment_id"] = this.props.comment.id;
      }
      this.props.postCommentByPostId(data);
      Keyboard.dismiss();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.comment !== nextProps.comment) {
      if (nextProps.comment && this.props.commentText === "") {
        this.secondTextInput.focus();
      }
    }
  }

  componentDidMount(){
    if(this.props.focus){
      setTimeout(() => {this.secondTextInput.focus()}, 2000)
    }
    
  }

  componentWillUnmount() {
    this.props.replyComment(null);
  }

  onSelectEmoji = (emoji) => {
    console.log("emoji")
    console.log(emoji)
    const text = this.props.commentText+emoji.code;
    this.props.typeComment(text);
    
  }

  render() {
    const { comment } = this.props;
    return (
      <>
      {this.props.emojiOpen &&
      <EmojiBoard hideBackSpace={true} tabBarPosition="top" containerStyle={{zIndex:20, bottom:60}} showBoard={this.props.emojiOpen} onClick={this.onSelectEmoji}/>
      }
      <View style={[styles.writeCommentTextarea]}>
        {this.props.isPosting ? (
          <ActivityIndicator />
        ) : (
          <>
          
            <TouchableOpacity
              style={styles.avatarimage}
              onPress={this.openImagePickerAsync}
            >
              <Feather name="camera" size={20} color={colors.gray} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundedTextareaContainer}>
              {comment && (
                <TouchableOpacity
                  style={{ paddingRight: 5 }}
                  onPress={() => this.props.replyComment(null)}
                >
                  <Text style={{ backgroundColor: "#e8f4f8" }}>
                    {comment && comment.user.first_name}
                  </Text>
                </TouchableOpacity>
              )}
              <TextInput
                ref={(input) => {
                  this.secondTextInput = input;
                }}
                multiline
                style={styles.roundedTextarea}
                placeholder="Write a Comment..."
                returnKeyLabel={"next"}
                onChangeText={(text) => this.props.typeComment(text)}
                blurOnSubmit={true}
              >
                {this.props.commentText}
              </TextInput>
              <TouchableOpacity style={styles.roundedTextareaIcons} onPress={() => this.props.emojiToggle(!this.props.emojiOpen)}>
                <Feather name="smile" size={18} color={colors.gray} />
              </TouchableOpacity>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roundedTextareaIcons, styles.sendIcon]}
              onPress={this.submitComment}
            >
              <Feather name="send" size={16} color={colors.white}  />
            </TouchableOpacity>
          </>
        )}
        
      </View>
      
      </>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.User.user,
    commentText: state.Comment.commentText,
    comment: state.Comment.comment,
    emojiOpen:state.Comment.emojiOpen,
    isPosting: state.Comment.isPosting,
    post_id: ownProps.post_id,
    
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CommentRedux");
  return {
    ...ownProps,
    ...stateProps,
    typeComment: (text) => {
      dispatch(actions.typeComment(text));
    },
    postCommentByPostId: (data) => {
      actions.postCommentByPostId(dispatch, data);
    },
    replyComment: (comment) => {
      dispatch(actions.replyComment(comment));
    },
    emojiToggle: (toggle) => {
      dispatch(actions.emojiToggle(toggle));
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(PostCommentBox);