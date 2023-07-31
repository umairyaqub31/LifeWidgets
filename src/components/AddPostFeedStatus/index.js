import * as React from "react";
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
  FlatList,
} from "react-native";
import styles from "./styles";
import { Ionicons, FontAwesome5, Feather } from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Divider, Avatar, RadioButton } from "react-native-paper";
import { Modalize } from "react-native-modalize";
import FontFamily from "../../config/fonts/fontfamily";
import { Portal } from "react-native-portalize";
import { connect } from "react-redux";
import { OptimizeImage } from "@helpers";
import moment from "moment";

class AddPostFeedStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.modalizeRef = React.createRef();
    this.flatListRef;
    this.per_page = 10;
    this.page = 1;
  }

  componentDidMount() {
    this.props.fetchCategories();
    this.props.fetchGroups(this.per_page, this.page);
  }

  modalizeOpen = () => {
    this.modalizeRef.current?.open();
    // setTimeout(() => {
    //   if(this.flatListRef){
    //     if(this.props.defaultPostDestination.id===0){
    //       this.flatListRef.scrollToIndex({ index: 1 });
    //     }
    //   }
    // }, 1000)
  };

  newsfeedHandler = () => {
    this.props.newsfeedHandler();
    this.flatListRef.scrollToIndex({ index: 0 });
    this.modalizeRef.current?.close();
  };
  groupHandler = () => {
    this.props.groupHandler();
    this.flatListRef.scrollToIndex({ index: 0 });
    this.modalizeRef.current?.close();
  };
  groupHandler1 = () => {
    this.props.groupHandler1();
    this.flatListRef.scrollToIndex({ index: 0 });
    this.modalizeRef.current?.close();
  };
  groupHandler2 = () => {
    this.props.groupHandler2();
    this.flatListRef.scrollToIndex({ index: 0 });
    this.modalizeRef.current?.close();
  };

  setPostDestination = () => {
    this.props.setPostDestination({ name: "News Feed", id: 0 });
    this.props.setPostPrivacy({ name: "Public", id: 1 });
    this.modalizeRef.current?.close();
  };

  setDefaultList = (item) => {
    if (this.props.defaultList === item.id) {
      this.props.setPostPrivacy({ name: "Public", id: 1 });
      this.props.setPostDestination({ name: "News Feed", id: 0 });
      this.props.setDefaultList(null);
    } else {
      this.props.setPostPrivacy({ name: item.label, id: item.id });
      this.props.setPostDestination({ name: "List", id: 0 });
      this.props.setDefaultList(item.id);
    }
  };

  selectGroup = (item) => {
    this.props.setPostPrivacy({ name: item.title, id: item.id });
    this.props.setPostDestination({ name: "Group", id: 0 });
    this.props.setDefaultList(item.id);
  };

  renderEmptyContainer = () => {
    if (!this.props.isFetching) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>No group found</Text>
        </View>
      );
    }
    return null;
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isFetching) {
      if (this.props.total > this.props.data.length) {
        this.page++;
        this.props.fetchGroups(this.per_page, this.page);
      }
    }
  };

  renderItem = ({ item, index }) => {
    let banner =
      "https://library.kissclipart.com/20180913/qq/kissclipart-friends-illustration-png-clipart-clip-art-dc26e1a3f72f4ebd.jpg";
    if (item.attachments) {
      banner = OptimizeImage(item.attachments.attachment_url);
    }
    return (
      <View>
        <TouchableOpacity
          style={styles.profileimage}
          onPress={() => this.selectGroup(item)}
        >
          <View>
            <Image style={styles.avatarimageGroup} source={{ uri: banner }} />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <View>
                <Text style={styles.username}>{item.title}</Text>
              </View>
              {!!item.member_since && (
                <Text style={styles.graytext}>
                  Member since{" "}
                  {moment.utc(item.member_since).local().format("MMMM Y")}
                </Text>
              )}
            </View>
          </View>
          <RadioButton
            uncheckedColor={colors.primary}
            color={colors.primary}
            status={
              this.props.defaultPostDestination.name==="Group" && this.props.defaultList === item.id ? "checked" : "unchecked"
            }
            onPress={() => this.selectGroup(item)}
          />
        </TouchableOpacity>
        <Divider style={[styles.separator]} />
      </View>
    );
  };

  render() {
    const { data } = this.props;
    return (
      <>
        <Portal>
          <Modalize ref={this.modalizeRef} adjustToContentHeight={true}>
            <FlatList
              ref={(ref) => (this.flatListRef = ref)}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              data={[{ key: "0" }, { key: "1" }, { key: "2" }]}
              renderItem={({ index }) => {
                if (index == 0) {
                  return (
                    <View style={styles.windowWidth}>
                      <View style={styles.popUpHead}>
                        <TouchableOpacity style={styles.touchOpacity}>
                          <Text style={styles.textPrimary}></Text>
                        </TouchableOpacity>
                        <Text style={styles.heading}>Select destination</Text>
                        <TouchableOpacity style={styles.touchOpacity}>
                          <Text style={styles.textPrimary}></Text>
                        </TouchableOpacity>
                      </View>
                      <Divider style={styles.separator} />
                      <TouchableOpacity
                        onPress={this.setPostDestination}
                        style={[
                          styles.modallistcontainer,
                          styles.noMargin,
                          styles.noPadding,
                        ]}
                      >
                        <Avatar.Image
                          size={42}
                          style={styles.option}
                          source={{
                            uri:
                              "https://live.lifewidgets.com/assets/starterHeader.jpg",
                          }}
                        />
                        <View style={styles.modallistcontainerRight}>
                          <Text style={styles.modallistText}>News Feed</Text>
                          <Ionicons
                            name="ios-arrow-forward"
                            size={24}
                            color={colors.gray}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modallistcontainer}
                        onPress={() =>
                          this.flatListRef.scrollToIndex({ index: 1 })
                        }
                      >
                        <View
                          style={[styles.customchipicons, styles.groupsIcon]}
                        >
                          <FontAwesome5
                            name="list"
                            size={22}
                            color={colors.white}
                          />
                        </View>
                        <View style={styles.modallistcontainerRight}>
                          <Text style={styles.modallistText}>List</Text>
                          <Ionicons
                            name="ios-arrow-forward"
                            size={24}
                            color={colors.gray}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modallistcontainer}
                        onPress={() =>
                          this.flatListRef.scrollToIndex({ index: 2 })
                        }
                      >
                        <View
                          style={[styles.customchipicons, styles.groupsIcon]}
                        >
                          <FontAwesome5
                            name="users"
                            size={22}
                            color={colors.white}
                          />
                        </View>
                        <View style={styles.modallistcontainerRight}>
                          <Text style={styles.modallistText}>Group</Text>
                          <Ionicons
                            name="ios-arrow-forward"
                            size={24}
                            color={colors.gray}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                }
                if (index == 1) {
                  return (
                    <View style={styles.windowWidth}>
                      <View style={styles.popUpHead}>
                        <TouchableOpacity
                          style={styles.touchOpacity}
                          onPress={() =>
                            this.flatListRef.scrollToIndex({ index: 0 })
                          }
                        >
                          <Ionicons
                            name="ios-arrow-back"
                            size={24}
                            color={colors.primary}
                          />
                        </TouchableOpacity>
                        <Text style={styles.heading}>List</Text>
                        <TouchableOpacity
                          style={styles.touchOpacity}
                          onPress={() => this.modalizeRef.current?.close()}
                        >
                          <Text style={styles.textPrimary}>Done</Text>
                        </TouchableOpacity>
                      </View>
                      {/* <Divider style={[styles.separator,styles.nomarginBottom]}/>
                      <View style={styles.groupTextinputContainer}>
                          <AntDesign name="search1" size={20} color={colors.gray} />
                          <TextInput 
                          style={styles.groupTextinput}
                            placeholder='Search group'
                          />
                      </View> */}
                      <Divider style={[styles.separator]} />
                      {this.props.categories.length > 0 &&
                        this.props.categories.map((item, key) => (
                          <TouchableOpacity
                            key={key}
                            style={styles.modallistcontainerNext}
                            onPress={() => this.setDefaultList(item)}
                          >
                            <View>
                              <Text
                                style={[
                                  styles.modallist,
                                  { fontFamily: FontFamily.Medium },
                                ]}
                              >
                                {item.label}
                              </Text>
                            </View>

                            <RadioButton
                              uncheckedColor={colors.primary}
                              color={colors.primary}
                              status={
                                this.props.defaultList === item.id
                                  ? "checked"
                                  : "unchecked"
                              }
                              onPress={() => this.setDefaultList(item)}
                            />
                          </TouchableOpacity>
                        ))}
                    </View>
                  );
                }

                if (index == 2) {
                  return (
                    <View style={styles.windowWidth}>
                      <View style={styles.popUpHead}>
                        <TouchableOpacity
                          style={styles.touchOpacity}
                          onPress={() =>
                            this.flatListRef.scrollToIndex({ index: 0 })
                          }
                        >
                          <Ionicons
                            name="ios-arrow-back"
                            size={24}
                            color={colors.primary}
                          />
                        </TouchableOpacity>
                        <Text style={styles.heading}>Group</Text>
                        <TouchableOpacity
                          style={styles.touchOpacity}
                          onPress={() => this.modalizeRef.current?.close()}
                        >
                          <Text style={styles.textPrimary}>Done</Text>
                        </TouchableOpacity>
                      </View>

                      <Divider style={[styles.separator]} />
                      <FlatList
                        contentContainerStyle={{
                          paddingLeft: 15,
                          paddingRight: 15,
                        }}
                        keyExtractor={(_, index) => index.toString()}
                        onEndReached={this.onEndReached}
                        ListEmptyComponent={this.renderEmptyContainer}
                        onEndReachedThreshold={0.5}
                        data={data}
                        showsVerticalScrollIndicator={false}
                        renderItem={this.renderItem}
                      />
                    </View>
                  );
                }
              }}
            />
          </Modalize>
        </Portal>
      </>
    );
  }
}

const mapStateToProps = ({ Post, Group }) => {
  return {
    defaultPostDestination: Post.defaultPostDestination,
    categories: Post.categories,
    defaultList: Post.defaultList,

    data: Group.data,
    isFetching: Group.isFetching,
    total: Group.total,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/PostRedux");
  const { actions: groupAction } = require("@redux/GroupRedux");
  return {
    ...ownProps,
    ...stateProps,
    setPostDestination: (item) => {
      dispatch(actions.setPostDestination(item));
    },
    fetchCategories:()=>{
      actions.fetchCategories(dispatch);
    },
    setDefaultList: (item) => {
      dispatch(actions.setDefaultList(item));
    },
    setPostPrivacy: (item) => {
      dispatch(actions.setPostPrivacy(item));
    },
    fetchGroups: (per_page, page) => {
      groupAction.fetchGroups(dispatch, per_page, page);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps, {
  forwardRef: true,
})(AddPostFeedStatus);