import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  FlatList,
} from "react-native";
import styles from "./styles";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Divider, Avatar } from "react-native-paper";
import { AddPostFeedStatus, AddPostPrivacyStatus } from "@components";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { connect } from "react-redux";
import { Capitalize } from "@helpers";
import { Config } from "@common";

const windowWidth = Dimensions.get("window").width;

class SharePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.modalizeRef = React.createRef();
    this.flatListRef = React.createRef();
    this.selectStatusactionSheetRef = React.createRef();
    this.privacyactionSheetRef = React.createRef();
  }

  newsfeedHandler = () => {
    this.props.newsfeedHandler();
    this.flatListRef.current.scrollToIndex({ index: 0 });
  };

  groupHandler = () => {
    this.props.groupHandler();
    this.flatListRef.current.scrollToIndex({ index: 0 });
  };
  groupHandler1 = () => {
    this.props.groupHandler1();
    this.flatListRef.current.scrollToIndex({ index: 0 });
  };
  groupHandler2 = () => {
    this.props.groupHandler2();
    this.flatListRef.current.scrollToIndex({ index: 0 });
  };

  modalizeOpen = (id) => {
    this.setState({post_id:id})
    this.modalizeRef.current?.open();
  };


  shareNow = () => {
    const data = {
      post_id:this.state.post_id,
      text:this.state.text,
      general_privacy_id: 1,
      category: this.props.defaultList,
    };
    this.props.sharePost(data);
    this.modalizeRef.current?.close();
  }

  render() {
    return (
      <>
        <Portal>
          <Modalize ref={this.modalizeRef} snapPoint={500}>
            <FlatList
              ref={this.flatListRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              data={[{ key: "1" }, { key: "2" }, { key: "3" }, { key: "4" }]}
              renderItem={({ index }) => {
                if (index == 0) {
                  return (
                    <View
                      style={{
                        paddingLeft: 15,
                        paddingRight: 15,
                        width: windowWidth,
                      }}
                    >
                      <View style={styles.profileimage}>
                        {this.props.user.profile_photo ? (
                          <Avatar.Image
                            style={styles.avatarimage}
                            size={52}
                            source={{
                              uri:
                                Config.lifeWidget.url +
                                "/" +
                                this.props.user.profile_photo,
                            }}
                          />
                        ) : (
                          <Avatar.Image
                            style={styles.avatarimage}
                            size={52}
                            source={require("@images/avatar.png")}
                          />
                        )}

                        <View>
                          <TouchableOpacity onPressItem={this._onPressItem}>
                            <Text style={styles.username}>
                              {Capitalize(this.props.user.first_name)}{" "}
                              {Capitalize(this.props.user.last_name)}
                            </Text>
                          </TouchableOpacity>
                          <View style={styles.statusgridcontainer}>
                            <TouchableOpacity
                              style={styles.statusgrid}
                              onPress={() =>
                                this.selectStatusactionSheetRef.current.modalizeOpen()
                              }
                            >
                              <Text
                                style={[styles.textgray, styles.statusSpacing]}
                              >
                                {this.props.defaultPostDestination
                                  ? this.props.defaultPostDestination.name
                                  : "Public"}
                              </Text>
                              <Ionicons
                                name="caret-down"
                                size={15}
                                color={colors.gray}
                              />
                            </TouchableOpacity>
                            <View
                              pointerEvents={this.props.pointerEvents}
                              style={{ opacity: this.props.opacity }}
                            >
                              <TouchableOpacity
                                style={styles.statusgrid}
                                onPress={() => {
                                  if (
                                    this.props.defaultPrivacy.name ===
                                      "Public" ||
                                    this.props.defaultPrivacy.name ===
                                      "Friends" ||
                                    this.props.defaultPrivacy.name === "Private"
                                  ) {
                                    this.privacyactionSheetRef.current.modalizeOpen();
                                  } else {
                                    this.selectStatusactionSheetRef.current.modalizeOpen()
                                  }
                                }}
                              >
                                <FontAwesome5
                                  name={this.props.icon}
                                  size={12}
                                  color={colors.gray}
                                />
                                <Text
                                  style={[
                                    styles.textgray,
                                    styles.statusSpacing,
                                  ]}
                                >
                                  {this.props.defaultPrivacy
                                    ? this.props.defaultPrivacy.name
                                    : "Public"}
                                </Text>
                                <Ionicons
                                  name="caret-down"
                                  size={15}
                                  color={colors.gray}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View>
                        <TextInput
                          multiline
                          style={styles.popupTextinput}
                          placeholder="Say Something about this..."
                          onChangeText={(text)=>this.setState({text})}
                        />
                      </View>
                      <View style={{ alignItems: "flex-end" }}>
                        <TouchableOpacity style={styles.primaryBtn} onPress={this.shareNow}>
                          <Text style={styles.primaryBtnText}>SHARE NOW</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }
              }}
            />
          </Modalize>
          <AddPostFeedStatus
            ref={this.selectStatusactionSheetRef}
            {...this.props}
            newsfeedHandler={this.newsfeedClick}
            groupHandler={this.groupClick}
            groupHandler1={this.groupClick1}
            groupHandler2={this.groupClick2}
          />
          <AddPostPrivacyStatus ref={this.privacyactionSheetRef} />
        </Portal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.User.user,
    defaultPrivacy: state.Post.defaultPrivacy,
    defaultPostDestination: state.Post.defaultPostDestination,
    defaultList: state.Post.defaultList,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PostRedux");
  return {
    ...ownProps,
    ...stateProps,
    sharePost: (data) => {
      actions.sharePost(dispatch, data);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps, {
  forwardRef: true,
})(SharePopup);