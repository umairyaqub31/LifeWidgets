import * as React from "react";
import {
  Animated,
  Text,
  View,
  ScrollView,
  Platform,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  useWindowDimensions,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  Keyboard
} from "react-native";
import styles from "./styles";
import moment from "moment";
import ImageViewer from "react-native-image-zoom-viewer";
import { Avatar, Snackbar, Switch } from "react-native-paper";
import { OptimizeImage, Capitalize } from "@helpers";
import { Color } from "@common";
import colors from "../../../config/color/color";
import { connect } from "react-redux";
import { Message } from '@containers';
import FontFamily from "../../../config/fonts/fontfamily";
import { NavigationContainer } from '@react-navigation/native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Swiper from "react-native-swiper";
import { getStatusBarHeight } from "react-native-status-bar-height";
import {
  FontAwesome5,
  AntDesign,
  EvilIcons,
  Entypo,
  MaterialIcons,
  FontAwesome,
  Ionicons,
  Feather
} from "@expo/vector-icons";
import { Modalize } from 'react-native-modalize';
import { Portal } from "react-native-portalize";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";



const height = Dimensions.get('window').height/2;

class FlirtDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      itemIndex: 0,
      snackbar_visible: false,
      message: "",
      index: 0,
      routes: [
        { key: 'flirtDetail', title: 'Detail' },
        { key: 'flirtMessages', title: 'Message' },
      ],

      initialHeader: new Animated.Value(-30)
    };
    this.modalizeRef = React.createRef();
    this.initialPosition = new Animated.Value(height)
  }

  activeFlirtsDetail = () => {
    this.modalizeRef.current?.open();
  };

  componentDidMount() {
    const { item } = this.props.route.params;
    this.props.navigation.setOptions({
      header: () => null,
      // headerTitle: () => (
      //   <View style={styles.headertitle}>
      //     <Text style={styles.headertitleText}>{this.getUserFullName()}</Text>
      //   </View>
      // ),
    });
    // this.setRightHeader(this.props);

    this.props.navigation
    .dangerouslyGetParent()
    ?.setOptions({ tabBarVisible: false });

    this.keyboardWillShowSub = Keyboard.addListener('keyboardDidShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardDidHide', this.keyboardWillHide);
  }


  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (e) => {
    Animated.timing(
      this.initialPosition,
      {
        toValue: 60
      },
    ).start();
  };

  keyboardWillHide = (e) => {
    Animated.timing(
      this.initialPosition,
      {
        toValue: height
      },
    ).start();
  };


  UNSAFE_componentWillReceiveProps(nextProps) {
    const { item } = this.props.route.params;
    const nextItem = nextProps.route.params.item;
    if (nextItem.is_open_to_meet == item.is_open_to_meet) {
      this.setRightHeader(nextProps);
    }
  }

  setRightHeader = (props) => {
    const { item } = props.route.params;
    return;
    if (this.props.user.gender == "female") {
      this.props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={styles.headRightOpacity}
            onPress={this.toggleOpenToMeet}
          >
            {item.is_open_to_meet ? (
              <Text style={styles.headRightText}>Close</Text>
            ) : (
              <Text style={styles.headRightText}>Open</Text>
            )}
          </TouchableOpacity>
        ),
      });
    }
  };



  toggleOpenToMeet = () => {
    const { item } = this.props.route.params;
    this.props.toggleOpenToMeet(item.id);
    this.setState({
      snackbar_visible: true,
      message: item.is_open_to_meet
        ? "You are now open to meet"
        : "Meet closed successfully",
    });
  };

  getUserFullName = () => {
    const { item } = this.props.route.params;
    const { flirt_setting } = item;
    let name = "";
    if (
      flirt_setting.is_fname_visible == 1 &&
      flirt_setting.is_lname_visible == 1
    ) {
      name = Capitalize(item.first_name) + " " + Capitalize(item.last_name);
    }
    if (
      flirt_setting.is_fname_visible == 1 &&
      flirt_setting.is_lname_visible != 1
    ) {
      name = Capitalize(item.first_name);
    }
    if (
      flirt_setting.is_fname_visible != 1 &&
      flirt_setting.is_lname_visible == 1
    ) {
      name = Capitalize(item.last_name);
    }
    if (
      flirt_setting.is_fname_visible != 1 &&
      flirt_setting.is_lname_visible != 1
    ) {
      name = Capitalize(flirt_setting.nick_name);
    }
    return name;
  };

  getUserAddress = () => {
    const { item } = this.props.route.params;
    console.log(item);
    let name = "";
    if(item.city){
      name += item.city;
    }
    /*if(item.street){
      name += name?", "+item.street:item.street;
  }*/
    if(item.cca2){
      name += name?", "+item.cca2:item.cca2;
    }
    return name.replace(/null/i, '');
  };

  sendFlirtRequest = () => {
    const { item } = this.props.route.params;
    this.props.sendFlirtRequest(item.id);
    this.setState({
      snackbar_visible: true,
      message: "Flirt request sent successfully",
    });
  };

  acceptFlirtRequest = () => {
    const { item } = this.props.route.params;
    this.props.acceptFlirtRequest(item.id);
    this.setState({ snackbar_visible: true, message: "You are now connected" });
  };

  cancelFlirtRequest = () => {
    const { item } = this.props.route.params;
    this.props.cancelFlirtRequest(item.id);
    this.setState({
      snackbar_visible: true,
      message: "You cancelled the flirt request",
    });
  };

  rejectFlirtRequest = () => {
    const { item } = this.props.route.params;
    this.props.cancelFlirtRequest(item.id);
    this.setState({
      snackbar_visible: true,
      message: "You rejected the flirt request",
    });
  };



  renderSceneActiveFliter = ({ route }) => {
    const { item } = this.props.route.params;
    const { flirt_setting } = item;
    const gender = this.props.user.gender;
    const photos = Object.assign([], flirt_setting.photos);
    let attaches = [];
    for (var i = 0; i < photos.length; i++) {
      attaches[i] = {
        ...photos[i],
        url: OptimizeImage(photos[i].attachment_url, photos[i].type),
      };
    }
    const years = moment().diff(item.date_of_birth, "years", false);

    const  routePass  = this.props.route;
    routePass.params = {...routePass.params,   connectyCubeId: item.cube_user_id,
      chatName: item.first_name, userImg: ''};
    console.log('.......................................................' + gender);
    console.log(item.is_open_to_meet);
    switch (route.key) {
      case "flirtDetail":
          return (
          <>
          </>
          )
      case "flirtMessages":
          return (
              <Message navigation={this.props.navigation} route={routePass} />
          )
      default:
        return null
    }
  };

  setTabIndex = (index) => {
    this.setState({ index });
  };
  render() {
    const { route } = this.props;
    const { item } = this.props.route.params;
    const { flirt_setting } = item;
    const gender = this.props.user.gender;
    const photos = Object.assign([], flirt_setting.photos);
    let attaches = [];
    for (var i = 0; i < photos.length; i++) {
      attaches[i] = {
        ...photos[i],
        url: OptimizeImage(photos[i].attachment_url, photos[i].type),
      };
    }
    const years = moment().diff(item.date_of_birth, "years", false);
    route.params = {...route.params,   connectyCubeId: item.cube_user_id}
    if (item.is_flirt) {
        return (
          <>
           <View style={{ flex: 1, backgroundColor: colors.white}}>
            <Animated.View style={{ height: this.initialPosition}}>
                  <Swiper
                        showsButtons={true}
                        showsPagination={true}
                        loadMinimal={true}
                        nextButton={
                          <View style={styles.arrowOuter}>
                            <Entypo name="chevron-thin-right" size={20} color={colors.primary} />
                          </View>
                        }
                        prevButton={
                          <View style={styles.arrowOuter}>
                            <Entypo name="chevron-thin-left" size={20} color={colors.primary} />
                          </View>
                        }
                      >
                        {attaches &&
                          attaches
                            .filter((attach) => attach.type === "image")
                            .map((item, key) => (
                              <View key={key} >
                                    <Image
                                      style={styles.profileImages}
                                      source={{
                                        uri: item.url,
                                      }}
                                    />
                              </View>
                            ))}
                  </Swiper>
              </Animated.View>
              {item.is_flirt && (
                <>
                  {!!flirt_setting.is_age_visible &&
                    flirt_setting.is_age_visible === 1 && (
                      <View style={{alignItems:'flex-end'}}>
                        <View style={styles.candidateAge}>
                        <Text style={styles.candidateAgeText}>
                          {years}
                        </Text>
                      </View>
                    </View>
                    )}
                </>
              )}


              <View style={{flex:1}}>
                  <View style={styles.scrolledOverlay}>
                      {item.is_flirt && (
                        <>
                          <View style={[styles.list,styles.headerGray]}>
                              <View style={{alignItems:'flex-start'}}>
                                  <View style={{flexDirection:'row',alignItems:'center'}}>
                                      {Platform.OS === "ios" ?
                                          <TouchableOpacity style={[styles.chipOpcity]} onPress={()=> this.props.navigation.goBack()}>
                                            <Ionicons name="chevron-back-outline" size={28} color={colors.primary} />
                                          </TouchableOpacity>:
                                          <TouchableOpacity style={[styles.chipOpcity,{marginRight:5}]} onPress={()=> this.props.navigation.goBack()}>
                                            <Ionicons name="arrow-back" size={28} color={colors.primary} />
                                          </TouchableOpacity>
                                      }
                                     <View style={{alignItems:'flex-start'}}>
                                       <Text style={[styles.heading,styles.underLine]}>{this.getUserFullName()}</Text>
                                       {!!this.getUserAddress() &&
                                       <Text style={[styles.textGray]}>{this.getUserAddress()}</Text>
                                       }
                                     </View>
                                  </View>

                              </View>
                            <TouchableOpacity style={[styles.chipOpcity,{backgroundColor:colors.gray}]} onPress={this.activeFlirtsDetail}>
                              <Entypo name="dots-three-vertical" size={18} color={colors.black} />
                            </TouchableOpacity>
                          </View>
                        </>
                      )}
                  </View>
                  <Message navigation={this.props.navigation} route={route} />
              </View>

          </View>
          <Portal>
                <Modalize ref={this.modalizeRef} adjustToContentHeight={true}>
                      {gender === "female" && (
                          <View style={[styles.list,styles.headerGray,{justifyContent:'center',}]}>
                            <Text style={[styles.textBold,{marginRight:15}]}>Open To Approach</Text>
                            <Switch
                              value={item.is_open_to_meet == 1 ? true : false}
                              onValueChange={(e) =>
                                this.toggleOpenToMeet()
                              }
                            />
                          </View>
                        )}
                        <View style={{padding:15}}>
                      {item.is_flirt && (
                        <>
                          {!!flirt_setting.about_me && (
                            <>
                              <Text style={styles.textBold}>About Me </Text>
                              <Text style={styles.textGray}>{flirt_setting.about_me}</Text>
                            </>
                          )}
                          {!!flirt_setting.looking_for && (
                            <>
                              <View style={styles.separator} />
                              <Text style={styles.textBold}>Looking For </Text>
                              <Text style={styles.textGray}>{flirt_setting.looking_for}</Text>
                            </>
                          )}
                        </>
                      )}
                      <View style={styles.separator} />
                      <TouchableOpacity  style={styles.listInline} onPress={() => { Alert.alert("Comming Soon", "This feature will come soon!")}}>
                        <View style={[styles.chipOpcity,{marginRight:10}]}>
                          <Feather name="phone-call" size={20} color={colors.white} />
                        </View>
                        <Text style={styles.textBold}>Audio Call</Text>
                      </TouchableOpacity>
                      <View style={styles.separator} />
                      <TouchableOpacity style={styles.listInline} onPress={() => {Alert.alert("Comming Soon", "This feature will come soon!")}}>
                        <View style={[styles.chipOpcity,{marginRight:10}]}>
                          <FontAwesome name="video-camera" size={18} color={colors.white} />
                        </View>
                        <Text style={styles.textBold}>Video Call</Text>
                      </TouchableOpacity>
                      <View style={styles.separator} />
                      <TouchableOpacity style={styles.listInline} onPress={() => {Alert.alert("Comming Soon", "This feauture will come soon!")}}>
                        <View style={[styles.chipOpcity,{marginRight:10}]}>
                          <Ionicons name="md-information-circle" size={22} color={colors.white} />
                        </View>
                        <Text style={styles.textBold}>More Information</Text>
                      </TouchableOpacity>
                      </View>
                </Modalize>
            </Portal>
          </>
        )
    } else {
      return (
        <View style={styles.container}>
              <View style={{height:height}}>
                  <Swiper
                      showsButtons={true}
                      showsPagination={true}
                      loadMinimal={true}
                      nextButton={
                        <View style={styles.arrowOuter}>
                          <Entypo name="chevron-thin-right" size={20} color={colors.primary} />
                        </View>
                      }
                      prevButton={
                        <View style={styles.arrowOuter}>
                          <Entypo name="chevron-thin-left" size={20} color={colors.primary} />
                        </View>
                      }
                      paginationStyle={{marginBottom:20}}
                      dotStyle={{backgroundColor:colors.white}}
                      activeDotStyle={{backgroundColor:colors.primary}}
                    >
                    {attaches &&
                      attaches.filter((attach) => attach.type === "image")
                        .map((item, key) => (
                          <View key={key} >
                                <Image
                                  style={styles.profileImages}
                                  source={{
                                    uri: item.url,
                                  }}
                                />
                          </View>
                        ))}
                  </Swiper>
              </View>
                {!!flirt_setting.is_age_visible &&
                    flirt_setting.is_age_visible === 1 && (
                    <View style={{alignItems:'flex-end'}}>
                      <View style={styles.candidateAge}>
                      <Text style={[styles.candidateAgeText]}>
                        {years}
                      </Text>
                    </View>
                  </View>
                )}
        <View style={[styles.scrolledOverlay,{flex:1}]}>
          <ScrollView style={styles.scrolledview}>
              <View style={[styles.list,styles.headerGray]}>
                  <View style={{alignItems:'flex-start'}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            {Platform.OS === "ios" ?
                                <TouchableOpacity style={[styles.chipOpcity]} onPress={()=> this.props.navigation.goBack()}>
                                  <Ionicons name="chevron-back-outline" size={28} color={colors.primary} />
                                </TouchableOpacity>:
                                <TouchableOpacity style={[styles.chipOpcity,{marginRight:5}]} onPress={()=> this.props.navigation.goBack()}>
                                  <Ionicons name="arrow-back" size={28} color={colors.primary} />
                                </TouchableOpacity>
                            }
                           <View style={{alignItems:'flex-start'}}>
                             <Text style={[styles.heading,styles.underLine]}>{this.getUserFullName()}</Text>
                           </View>
                        </View>

                  </View>
              </View>

              <View style={{padding:15}}>
              <View style={{justifyContent: "center", alignItems: "center" }}>
              {!item.is_flirt &&
                !item.flirt_request.is_send_request &&
                item.flirt_request.is_entry && (
                  <>
                  <Text
                    style={[
                      styles.text,
                      {
                        marginLeft: 10,
                        marginRight: 10,
                        textAlign: "center",
                      },
                    ]}
                  >
                    {"A new flirt request from "}
                    <Text style={styles.textBold}>
                      {this.getUserFullName()}
                    </Text>
                    {", what would you like to do?"}
                  </Text>
                  <View style={styles.spacing} />
                  </>
                )}
              </View>

              {!!flirt_setting.about_me && (
                <>
                  <Text style={styles.textBold}>About Me </Text>
                  <View style={styles.spacingXS} />
                  <Text style={styles.textGray}>{flirt_setting.about_me}</Text>
                </>
              )}
              {!!flirt_setting.looking_for && (
                <>
                  <View style={styles.separator} />
                  <Text style={styles.textBold}>Looking For </Text>
                  <View style={styles.spacingXS} />
                  <Text style={styles.textGray}>{flirt_setting.looking_for}</Text>
                </>
              )}

              </View>
          </ScrollView>
          </View>
          <View style={styles.footer} >

                  {!item.is_flirt && !item.flirt_request.is_entry && (
                    <>
                    <View style={styles.wspacing} />
                    <TouchableOpacity
                      style={[styles.footerItems,styles.boxShadow]}
                      onPress={this.sendFlirtRequest}
                    >
                      <AntDesign name="hearto" size={28} color={colors.gray} />
                    </TouchableOpacity>
                    </>
                  )}

                  {!item.is_flirt &&
                    !item.flirt_request.is_send_request &&
                    item.flirt_request.is_entry && (
                      <>
                      <View style={styles.wspacing} />
                      <TouchableOpacity
                        style={[styles.footerItems,styles.boxShadow]}
                        onPress={this.acceptFlirtRequest}
                      >
                        <AntDesign name="checkcircle" size={28} color={colors.success} />
                      </TouchableOpacity>
                      </>
                    )}

                    {!item.is_flirt && item.flirt_request.is_send_request && (
                      <>
                      <View style={styles.wspacing} />
                      <TouchableOpacity
                        style={[styles.footerItems,styles.boxShadow]}
                        onPress={this.cancelFlirtRequest}
                      >
                        <AntDesign name="heart" size={28} color="#e31b23" />
                      </TouchableOpacity>
                      </>
                    )}

                    {!item.is_flirt &&
                      item.flirt_request.is_entry &&
                      !item.flirt_request.is_send_request && (
                        <>
                        <View style={styles.wspacing} />
                        <TouchableOpacity
                          style={[styles.footerItems,styles.boxShadow]}
                          onPress={this.rejectFlirtRequest}
                        >
                          <FontAwesome5 name="ban" size={24} color={colors.danger} />
                        </TouchableOpacity>
                        </>
                      )}
          </View>
          <Snackbar
            duration={4000}
            visible={this.state.snackbar_visible}
            onDismiss={() => this.setState({ snackbar_visible: false })}
            action={{
              label: "dismiss",
              onPress: () => this.setState({ snackbar_visible: false }),
            }}
            style={{ backgroundColor: Color.black }}
          >
            <View>
              <Text style={{ color: Color.white }}>{this.state.message}</Text>
            </View>
          </Snackbar>
        </View>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.User.user,
    items: state.Flirt.items,
    pendingFlirts: state.Flirt.pendingFlirts,
    actives: state.Flirt.actives,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/FlirtRedux");
  return {
    ...ownProps,
    ...stateProps,
    sendFlirtRequest: (friend_id) => {
      actions.sendFlirtRequest(dispatch, friend_id);
    },
    acceptFlirtRequest: (friend_id) => {
      actions.acceptFlirtRequest(dispatch, friend_id);
    },
    cancelFlirtRequest: (friend_id) => {
      actions.cancelFlirtRequest(dispatch, friend_id);
    },
    toggleOpenToMeet: (friend_id) => {
      actions.toggleOpenToMeet(dispatch, friend_id);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(FlirtDetail);
