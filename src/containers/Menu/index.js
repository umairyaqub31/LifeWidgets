import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
import styles from "./styles";
import colors from "../../config/color/color";
import { Avatar } from "react-native-paper";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { Divider, List } from "react-native-paper";
import { connect } from "react-redux";
import { Config, LifeWidget } from "@common";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConnectyCube from "react-native-connectycube";
import appConfig from "../../../connectycube-config.json";
import AuthService from "../../services/auth-service";
import ChatService from "../../services/chat-service";
import { Badge } from "react-native-paper";
import { UserImage } from "@components";
import { OptimizeImage } from "@helpers";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unreadBadgeCount: "",
      deafultImage: "",
    };
    // this.props.navigation.addListener('focus', () => {
    //   this.getProfileImage();
    // });
  }

  componentDidMount() {
    let params = [];
    params["my_company"] = true;
    this.props.fetchCompany(10, 1, params);

    this.props.uploadProfile();
    this.unreadMessageCount();
  }
  getProfileImage = async () => {
    var userImg = await AsyncStorage.getItem("UserProfileImage");
    console.log("userimg", userImg);
    this.setState({ deafultImage: userImg });
  };

  FeedNavigate = () => {
    // hard navigate to feed as you can get stuck in sub screen.
    // i.e from notification going to feed detail... no back button.
    setTimeout(() => {
      this.props.navigation.navigate("Feed", { screen: "Feed" });
    }, 600);
  };
  BarNavigate = () => {
    setTimeout(() => {
      this.props.navigation.navigate("Bars");
    }, 600);
  };
  CommingSoonNavigate = (soonWidget) => {
    this.props.navigation.navigate("CommingSoon", { soonWidget: soonWidget });
  };

  LogoutConnectycube = () => {
    AuthService.logout();
    this.props.logout();
  };
  LogoutResetState = () => {
    AuthService.logout(true);
    this.props.logoutResetState();
  };

  unreadMessageCount = async () => {
    const dialogsFromServer = await ConnectyCube.chat.dialog.list();
    const dialogs = dialogsFromServer.items.map((elem) => elem._id);
    const params = { dialogs_ids: dialogs };
    ConnectyCube.chat.message
      .unreadCount(params)
      .then((result) => {
        this.setState({ unreadBadgeCount: result.total });
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  navigateChatScreen = async () => {
    if (this.props.User.user.cube_user_id == null) {
      var value = await AsyncStorage.getItem("userdata");
      var parse = JSON.parse(value);
      // alert(JSON.stringify(parse, null,2));
      // return;
      let json = await LifeWidget.createConnectycubeId(parse);

      if (json.status === 200) {
        if (json.data.status_code === 200) {
          await ConnectyCube.init(...appConfig.connectyCubeConfig);
          await AuthService.signIn(parse)
            .then(() => {
              ChatService.setUpListeners();
              this.props.navigation.navigate("ChatUsers");
            })
            .catch((error) => {
              console.log("connectycube login", JSON.stringify(error));
            });
        } else {
          this.props.navigation.navigate("ChatUsers");
        }
      } else {
        alert("Error Occurd");
        return;
      }
    } else {
      this.props.navigation.navigate("ChatUsers");
    }
  };

  render() {
    let { menu } = this.props;
    const { gender } = this.props.User.user;

    //since we introduced... new settings check if existing state might not have this data.
    if (typeof menu.comms == "undefined") {
      menu.comms = true;
    }
    if (typeof menu.saved == "undefined") {
      menu.saved = true;
    }
    if (typeof menu.groups == "undefined") {
      menu.groups = true;
    }
    if (typeof menu.how_to == "undefined") {
      menu.how_to = true;
    }
    if (typeof menu.rewards == "undefined") {
      menu.rewards = true;
    }
    return (
      <>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity
              style={styles.profileimage}
              onPress={() => this.props.navigation.navigate("MyProfile")}
            >
              <UserImage
                item={this.props.data}
                size={52}
                style={styles.avatarimage}
              />
              <View>
                <Text style={styles.username}>
                  {this.props.data.first_name} {this.props.data.last_name}
                  {this.props.data.verified && (
                    <AntDesign name="star" size={18} color={colors.gold} />
                  )}
                </Text>
                <Text style={styles.seeprofile}>See your profile</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.pillscontainer}>
              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() => this.FeedNavigate()}
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/SocialFeed.png")}
                />
                <Text style={styles.menuscreenpillstext}>Social Feed</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() =>
                  this.props.navigation.navigate("Friends", {
                    screen: "Friends",
                  })
                }
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/MyFriends.png")}
                />
                <Text style={styles.menuscreenpillstext}>Friends</Text>
              </TouchableOpacity>

              {menu.groups && (
                <TouchableOpacity
                  style={styles.menuscreenpills}
                  onPress={() =>
                    this.props.navigation.navigate("Groups", {
                      screen: "Groups",
                    })
                  }
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/groups.png")}
                  />
                  <Text style={styles.menuscreenpillstext}>Groups</Text>
                </TouchableOpacity>
              )}
              {menu.saved && (
                <TouchableOpacity
                  style={styles.menuscreenpills}
                  onPress={() => this.props.navigation.navigate("SavedPost")}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/saved.png")}
                  />
                  <Text style={styles.menuscreenpillstext}>Saved</Text>
                </TouchableOpacity>
              )}
              {menu.comms && (
                <TouchableOpacity
                  style={styles.menuscreenpills}
                  onPress={() => this.navigateChatScreen()}
                >
                  {this.state.unreadBadgeCount > 0 ? (
                    <Badge
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        bottom: 0,
                        right: 0,
                      }}
                    >
                      {this.state.unreadBadgeCount}
                    </Badge>
                  ) : null}
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Mymessages.png")}
                  />
                  <Text style={styles.menuscreenpillstext}>Comms</Text>
                </TouchableOpacity>
              )}
              {menu.flirt && (
                <TouchableOpacity
                  style={styles.menuscreenpills}
                  onPress={() =>
                    this.props.navigation.navigate("FlirtCandidates")
                  }
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Flirt.png")}
                  />
                  <Text style={styles.menuscreenpillstext}>Flirts</Text>
                </TouchableOpacity>
              )}
              {menu.bars && (
                <TouchableOpacity
                  style={styles.menuscreenpills}
                  onPress={() => this.BarNavigate()}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Bars.png")}
                  />
                  <Text style={styles.menuscreenpillstext}>Bars</Text>
                </TouchableOpacity>
              )}

              {menu.restaurant && (
                <TouchableOpacity
                  style={styles.menuscreenpills}
                  onPress={() => this.props.navigation.navigate("Restaurants")}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Restaurant.png")}
                  />
                  <Text style={styles.menuscreenpillstext}>Restaurants</Text>
                </TouchableOpacity>
              )}

              {this.props.total > 0 && menu.company && (
                <TouchableOpacity
                  style={styles.menuscreenpills}
                  onPress={() => this.props.navigation.navigate("MyCompany")}
                >
                  {gender === "female" ? (
                    <Image
                      style={styles.menuImage}
                      source={require("../../../assets/images/MyCompanyFemale.png")}
                    />
                  ) : (
                    <Image
                      style={styles.menuImage}
                      source={require("../../../assets/images/MyCompany.png")}
                    />
                  )}
                  <Text style={styles.menuscreenpillstext}>My Company</Text>
                </TouchableOpacity>
              )}
              {menu.company && this.props.total === 0 && (
                <TouchableOpacity
                  style={styles.menuscreenpills}
                  onPress={() =>
                    this.props.navigation.navigate("AddCompany", { new: true })
                  }
                >
                  {gender === "female" ? (
                    <Image
                      style={styles.menuImage}
                      source={require("../../../assets/images/MyCompanyFemale.png")}
                    />
                  ) : (
                    <Image
                      style={styles.menuImage}
                      source={require("../../../assets/images/MyCompany.png")}
                    />
                  )}
                  <Text style={styles.menuscreenpillstext}>Add My Company</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() => this.props.navigation.navigate("ShareUs")}
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/WhoWantstoJoin.png")}
                />
                <Text style={styles.menuscreenpillstext}>Share Us</Text>
              </TouchableOpacity>
              {menu.feedback && (
                <TouchableOpacity
                  style={styles.menuscreenpills}
                  onPress={() => this.props.navigation.navigate("Feedback")}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/feedback.png")}
                  />
                  <Text style={styles.menuscreenpillstext}>Feedback</Text>
                </TouchableOpacity>
              )}
              {menu.bill_of_rights && (
                <TouchableOpacity
                  style={styles.menuscreenpills}
                  onPress={() => this.props.navigation.navigate("RightBills")}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/billofRights.png")}
                  />
                  <Text style={styles.menuscreenpillstext}>Bill of Rights</Text>
                </TouchableOpacity>
              )}
              {menu.how_to && (
                <TouchableOpacity
                  style={styles.menuscreenpills}
                  onPress={() => this.props.navigation.navigate("HowTo")}
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/HowtoPhotos.png")}
                  />
                  <Text style={styles.menuscreenpillstext}>How To</Text>
                </TouchableOpacity>
              )}
              {menu.reward && (
                <TouchableOpacity
                  style={styles.menuscreenpills}
                  onPress={() =>
                    this.props.navigation.navigate("TopLeadboards")
                  }
                >
                  <Image
                    style={styles.menuImage}
                    source={require("../../../assets/images/Menu1000Photos.png")}
                  />
                  <Text style={styles.menuscreenpillstext}>Win $1000</Text>
                </TouchableOpacity>
              )}
            </View>
            {/* {this.props.total>0 &&
            <>
            <Text
              style={[
                styles.menuscreenpillstext,
                { fontSize: 24, marginTop: 15, textAlign: "center" },
              ]}
            >
              Company
            </Text>
            <View style={styles.pillscontainer}>
              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() => this.props.navigation.navigate("MyCompany")}
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/MyCompany.png")}
                />
                <Text style={styles.menuscreenpillstext}>My Company</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() => this.props.navigation.navigate("PostJob")}
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/PostJob.png")}
                />
                <Text style={styles.menuscreenpillstext}>Post a Job</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() => this.props.navigation.navigate("MyJobPosting")}
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/MyJobsPosting.png")}
                />
                <Text style={styles.menuscreenpillstext}>My Job Postings</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() => this.props.navigation.navigate("Advertising")}
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/Advertising.png")}
                />
                <Text style={styles.menuscreenpillstext}>Advertising</Text>
              </TouchableOpacity>
            </View>
            </>
            } */}
            <Text
              style={[
                styles.menuscreenpillstext,
                { fontSize: 26, marginTop: 20, textAlign: "center" },
              ]}
            >
              Coming Soon
            </Text>
            <View style={styles.pillscontainer}>
              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() => this.props.navigation.navigate("Bank")}
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/Bank.png")}
                />
                <Text style={styles.menuscreenpillstext}>Bank</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() => this.props.navigation.navigate("Cars")}
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/Cars.png")}
                />
                <Text style={styles.menuscreenpillstext}>Cars</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() => this.props.navigation.navigate("Apartments")}
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/Apartments.png")}
                />
                <Text style={styles.menuscreenpillstext}>Apartments</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() => this.props.navigation.navigate("MyHomes")}
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/Homes.png")}
                />
                <Text style={styles.menuscreenpillstext}>Homes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() => this.props.navigation.navigate("Vacation")}
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/Vacation.png")}
                />
                <Text style={styles.menuscreenpillstext}>Vacation</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() => this.props.navigation.navigate("PostJob")}
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/Jobs.png")}
                />
                <Text style={styles.menuscreenpillstext}>Jobs</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() => this.props.navigation.navigate("Events")}
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/Events.png")}
                />
                <Text style={styles.menuscreenpillstext}>Events</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() => this.props.navigation.navigate("Calendar")}
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/Calendar.png")}
                />
                <Text style={styles.menuscreenpillstext}>Calendar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() => this.props.navigation.navigate("SocialSeller")}
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/Social_Seller.png")}
                />
                <Text style={styles.menuscreenpillstext}>Social Seller</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuscreenpills}
                onPress={() => this.props.navigation.navigate("MyCRM")}
              >
                <Image
                  style={styles.menuImage}
                  source={require("../../../assets/images/MyCRM.png")}
                />
                <Text style={styles.menuscreenpillstext}>My CRM</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.menubottom}>
            <List.Section style={{ marginBottom: 0 }}>
              <List.Accordion
                style={styles.accordion}
                titleStyle={styles.accordionTitle}
                title="Settings"
                left={(props) => (
                  <Ionicons
                    name="settings"
                    {...props}
                    color={colors.black}
                    size={22}
                    style={[styles.accordionLeftIcon, { paddingLeft: 15 }]}
                  />
                )}
              >
                <TouchableOpacity
                  style={[styles.listPanel, styles.boxShadow]}
                  onPress={() => this.props.navigation.navigate("MenuSetting")}
                >
                  <AntDesign
                    name="setting"
                    size={22}
                    color={colors.black}
                    style={styles.listPanelIcon}
                  />
                  <Text style={[styles.menuscreenpillstext, { fontSize: 14 }]}>
                    Menu Settings
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.listPanel, styles.boxShadow]}
                  onPress={() => this.props.navigation.navigate("Celebrity")}
                >
                  <MaterialCommunityIcons
                    name="account-star-outline"
                    size={22}
                    color={colors.black}
                    style={styles.listPanelIcon}
                  />
                  <Text style={[styles.menuscreenpillstext, { fontSize: 14 }]}>
                    Celebrity
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.listPanel, styles.boxShadow]}
                  onPress={() =>
                    this.props.navigation.navigate("AccessInformation", {
                      is_ready: false,
                    })
                  }
                >
                  <FontAwesome
                    name="id-card-o"
                    size={20}
                    color={colors.black}
                    style={styles.listPanelIcon}
                  />
                  <Text style={[styles.menuscreenpillstext, { fontSize: 14 }]}>
                    Access your information
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.listPanel, styles.boxShadow]}
                  onPress={() =>
                    this.props.navigation.navigate("DeleteAccount")
                  }
                >
                  <FontAwesome
                    name="id-card-o"
                    size={20}
                    color={colors.black}
                    style={styles.listPanelIcon}
                  />
                  <Text style={[styles.menuscreenpillstext, { fontSize: 14 }]}>
                    Delete Account
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.listPanel, styles.boxShadow]}
                  onPress={() => this.LogoutResetState()}
                >
                  <FontAwesome
                    name="sign-out"
                    size={20}
                    color={colors.black}
                    style={styles.listPanelIcon}
                  />
                  <Text style={[styles.menuscreenpillstext, { fontSize: 14 }]}>
                    Logout & Reset App
                  </Text>
                </TouchableOpacity>
              </List.Accordion>
            </List.Section>
            <Divider style={styles.separator} />
            <TouchableOpacity
              style={styles.menubottomlist}
              onPress={() => this.LogoutResetState()}
            >
              <AntDesign
                name="logout"
                size={22}
                color={colors.black}
                style={{ marginRight: 15 }}
              />
              <Text style={styles.menuscreenpillstext}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    User: state.User,
    data: state.Profile.data,
    menu:
      typeof state.User.menu !== "undefined"
        ? state.User.menu
        : {
            flirt: true,
            bars: true,
            restaurant: true,
            feedback: true,
            share_us: true,
            bill_of_rights: true,
            company: true,
            reward: true,
            how_to: true,
            groups: true,
            saved: true,
            comms: true,
          },
    flirtsMenuHide: state.PopupReducers.flirtsMenuHide,
    BarMenuHide: state.PopupReducers.BarMenuHide,
    billRightMenuHide: state.PopupReducers.billRightMenuHide,
    FeedbackMenuHide: state.PopupReducers.FeedbackMenuHide,
    total: state.Company.total,
    RestaurantsMenuHide: state.PopupReducers.RestaurantsMenuHide,
    CompanyMenuHide: state.PopupReducers.CompanyMenuHide,
  };
};
const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@redux/UserRedux");
  const { actions: ProfileAction } = require("@redux/ProfileRedux");
  const { actions: companyActions } = require("@redux/CompanyRedux");

  return {
    logout: () => dispatch(actions.logout()),
    logoutResetState: () => dispatch(actions.logoutResetState()),
    uploadProfile: () => {
      ProfileAction.uploadProfile(dispatch);
    },
    fetchCompany: (per_page, page, params = []) => {
      companyActions.fetchCompany(dispatch, per_page, page, params);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
