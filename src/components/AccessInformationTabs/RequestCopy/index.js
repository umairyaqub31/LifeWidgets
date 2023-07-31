import * as React from "react";
import { Alert, Text, TouchableOpacity, View, ScrollView } from "react-native";
import styles from "./styles";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";
import colors from "../../../config/color/color";
import { Checkbox } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as RootNavigation from "../../../common/NavigationService";
import { connect } from "react-redux";
import {LifeWidget} from "@common";

class RequestCopy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      visible: false,
      type:"from"
    };
  }

  componentDidMount(){
    let  settings  = Object.assign({},this.props.settings);
    if(!settings.from){
      settings.from = new Date();
    }
    if(!settings.to){
      settings.to = new Date();
    }
    
    this.props.requestCopySettings(settings)
  }

  onConfirm = (date) => {
    const {type} = this.state;
    this.setState({ visible: false });
    if(type=="from"){
      this.setFromDate(date);
    } else {
      this.setToDate(date);
    }
    
  };

  getRandomInt = (min, max) =>{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  selectToggleAll = () => {
    let  settings  = Object.assign({},this.props.settings);
    if(this.checkToggle()){
      settings.posts = true;
      settings.photos_videos = true;
      settings.comments = true;
      settings.likes = true;
      settings.friends = true;
      settings.groups = true;
      settings.profile = true;
      this.props.requestCopySettings(settings)
    } else {
      settings.posts = false;
      settings.photos_videos = false;
      settings.comments = false;
      settings.likes = false;
      settings.friends = false;
      settings.groups = false;
      settings.profile = false;
      this.props.requestCopySettings(settings)
    }    
  }

  checkToggle = () => {
    const { settings } = this.props;
    if(settings.posts && settings.photos_videos && settings.comments && settings.likes && settings.friends && settings.groups && settings.profile){
      return false;
    }
    return true;
  }

  setFromDate = (from) => {
    let  settings  = Object.assign({},this.props.settings);
    settings.from = from;
    this.props.requestCopySettings(settings)
  }

  setToDate = (to) => {
    let  settings  = Object.assign({},this.props.settings);
    settings.to = to;
    this.props.requestCopySettings(settings)
  }

  createSchedule = async () => {
    const { settings } = this.props;
    if(settings.from >= settings.to){
      Alert.alert(
        "Invalid Date range",
        "From date must be less then to date",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      return;
    }
    let flag = false;
    let array = [
      "posts",
      "photos_videos",
      "comments",
      "likes",
      "friends",
      "groups",
      "profile",
    ];
    let form = Object.assign({}, this.props.settings);

    Object.keys(form).map((item) => {
      if (array.some((index) => index === item)) {
        if (
          form[item] === true
        ) {
          flag = true;
        }
      }
    });
    if(!flag) {
      Alert.alert(
        "Access information",
        "please select one of the information",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
      return;
    }
    const json = LifeWidget.accessYourInformation(form);


    Alert.alert(
      "Submitted",
      "Your request has been scheduled. We will email you once copy ready to download",
      [
        { text: "OK", onPress: () => RootNavigation.navigate("Menu") }
      ]
    );
  }

  render() {
    const { settings } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrolledview}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.list, styles.listPanel, styles.boxShadow]}>
            <Text style={styles.textBold}>
              Your Information{" "}
              <Ionicons
                name="information-circle-sharp"
                size={20}
                color="black"
              />
            </Text>
            <TouchableOpacity onPress={this.selectToggleAll}>
              <Text style={styles.textPrimary}>{this.checkToggle()?"Select All":"Unselect All"}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.list, styles.listPanel, styles.boxShadow]}>
            <View style={styles.listIcon}>
              <MaterialCommunityIcons
                name="post-outline"
                size={24}
                color="black"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textBold}>Posts</Text>
              <Text style={styles.textGray}>
                Post you've shared on Light Widgets, posts that are hidden from
                your timeline and polls you've created
              </Text>
            </View>
            <Checkbox.Android
              onPress={() => this.props.requestCopySettings("posts")}
              uncheckedColor={colors.primary}
              color={colors.primary}
              status={settings.posts ? "checked" : "unchecked"}
            />
          </View>
          <View style={[styles.list, styles.listPanel, styles.boxShadow]}>
            <View style={styles.listIcon}>
              <MaterialIcons name="photo-library" size={24} color="black" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textBold}>Photos and videos</Text>
              <Text style={styles.textGray}>
                Photos and videos that you've uploaded and shared
              </Text>
            </View>
            <Checkbox.Android
              onPress={() => this.props.requestCopySettings("photos_videos")}
              uncheckedColor={colors.primary}
              color={colors.primary}
              status={settings.photos_videos ? "checked" : "unchecked"}
            />
          </View>
          <View style={[styles.list, styles.listPanel, styles.boxShadow]}>
            <View style={styles.listIcon}>
              <MaterialCommunityIcons
                name="comment-outline"
                size={24}
                color="black"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textBold}>Comments</Text>
              <Text style={styles.textGray}>
                Comments you've posted on your own posts, on other people's
                posts or in groups that you belong to
              </Text>
            </View>
            <Checkbox.Android
              onPress={() => this.props.requestCopySettings("comments")}
              uncheckedColor={colors.primary}
              color={colors.primary}
              status={settings.comments ? "checked" : "unchecked"}
            />
          </View>
          <View style={[styles.list, styles.listPanel, styles.boxShadow]}>
            <View style={styles.listIcon}>
              <AntDesign name="like2" size={24} color="black" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textBold}>Likes</Text>
              <Text style={styles.textGray}>
                Posts, comments and Pages that you've liked
              </Text>
            </View>
            <Checkbox.Android
              onPress={() => this.props.requestCopySettings("likes")}
              uncheckedColor={colors.primary}
              color={colors.primary}
              status={settings.likes ? "checked" : "unchecked"}
            />
          </View>
          <View style={[styles.list, styles.listPanel, styles.boxShadow]}>
            <View style={styles.listIcon}>
              <FontAwesome5 name="user-friends" size={24} color="black" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textBold}>Friends</Text>
              <Text style={styles.textGray}>
                The people you are connected to on Life Widgets
              </Text>
            </View>
            <Checkbox.Android
              onPress={() => this.props.requestCopySettings("friends")}
              uncheckedColor={colors.primary}
              color={colors.primary}
              status={settings.friends ? "checked" : "unchecked"}
            />
          </View>
          <View style={[styles.list, styles.listPanel, styles.boxShadow]}>
            <View style={styles.listIcon}>
              <FontAwesome5 name="users" size={24} color="black" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textBold}>Groups</Text>
              <Text style={styles.textGray}>
                Groups you belong to, group you manage, and your posts and
                comments within the groups that you belong to
              </Text>
            </View>
            <Checkbox.Android
              onPress={() => this.props.requestCopySettings("groups")}
              uncheckedColor={colors.primary}
              color={colors.primary}
              status={settings.groups ? "checked" : "unchecked"}
            />
          </View>
          <View style={[styles.list, styles.listPanel, styles.boxShadow]}>
            <View style={styles.listIcon}>
              <FontAwesome5 name="user-cog" size={24} color="black" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textBold}>Profile information</Text>
              <Text style={styles.textGray}>
                Your contact information, information in your profile's "About"
                section
              </Text>
            </View>
            <Checkbox.Android
              onPress={() => this.props.requestCopySettings("profile")}
              uncheckedColor={colors.primary}
              color={colors.primary}
              status={settings.profile ? "checked" : "unchecked"}
            />
          </View>
          {/* <View style={[styles.list, styles.listPanel, styles.boxShadow]}>
            <View style={styles.listIcon}>
              <Ionicons name="location-outline" size={24} color="black" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.textBold}>Your places</Text>
              <Text style={styles.textGray}>
                A list of places you've created
              </Text>
            </View>
            <Checkbox.Android
              uncheckedColor={colors.primary}
              color={colors.primary}
              status="checked"
            />
          </View> */}
          <View style={[styles.list, styles.listPanel, styles.boxShadow]}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.textBold}>Data Range:</Text>
              </View>
              <View style={styles.list}>
                <TouchableOpacity
                  onPress={() => this.setState({ visible: true, type:"from" })}
                  style={[styles.DatePicker, styles.boxShadow]}
                >
                  <Text style={styles.text}>
                    {new Date(settings.from).toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
                <View style={styles.horizontalSpace} />
                <TouchableOpacity
                  onPress={() => this.setState({ visible: true, type:"to" })}
                  style={[styles.DatePicker, styles.boxShadow]}
                >
                  <Text style={styles.text}>
                  {new Date(settings.to).toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
              </View>
              <DateTimePickerModal
                isVisible={this.state.visible}
                maximumDate={new Date()}
                mode="date"
                date={this.state.type=="from"?settings.from:settings.to}
                onConfirm={this.onConfirm}
                onCancel={() => this.setState({ visible: false })}
              />
            </View>
          </View>
          <View style={[styles.list, styles.listPanel, styles.boxShadow]}>
            <View style={styles.list}>
              <Text style={styles.textBold}>Format:</Text>
              <Text style={styles.textGray}> JSON</Text>
            </View>
            <View style={styles.list}>
              <Text style={styles.textBold}>Quality:</Text>
              <Text style={styles.textGray}> High</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.primaryBtn} onPress={this.createSchedule}>
            <Text style={styles.primaryBtnText}>CREATE FILE</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    settings:
      typeof User.accessInformation !== "undefined"
        ? User.accessInformation
        : {},
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/UserRedux");
  return {
    ...ownProps,
    ...stateProps,
    requestCopySettings: (data) => {
      dispatch(actions.requestCopySettings(data));
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(RequestCopy);