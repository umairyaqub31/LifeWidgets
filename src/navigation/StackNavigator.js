import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View, Image, StyleSheet, Alert } from "react-native";
import {
  Feather,
  Ionicons,
  FontAwesome,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { FeedFilterHeader } from "@components";
import colors from "../config/color/color";
import FontFamily from "../config/fonts/fontfamily";
import FeedScreen from "./FeedScreen";
import FeedFilterScreen from "./FeedFilterScreen";
import FeedDetailScreen from "./FeedDetailScreen";
import SigninScreen from "./SigninScreen";
import SignupScreen from "./SignupScreen";
import ForgotpswdScreen from "./ForgotpswdScreen";
import TabTwoScreen from "./TabTwoScreen";
import Authscreen from "./Authscreen";
import MenuScreen from "./MenuScreen";
import MenuSettingScreen from "./MenuSettingScreen";
import FriendScreen from "./FriendScreen";
import SuggestionsScreen from "./SuggestionsScreen";
import AllFriendsScreen from "./AllFriendsScreen";
import PendingInivteScreen from "./PendingInivteScreen";
import PeopleNearMeScreen from "./PeopleNearMeScreen";
import FamilyAndRelativesScreen from "./FamilyAndRelativesScreen";
import BusinessAssociateScreen from "./BusinessAssociateScreen";
import CoWorkersScreen from "./CoWorkersScreen";
import GroupScreen from "./GroupScreen";
import GrounpInviteScreen from "./GrounpInviteScreen";
import GroupMyScreen from "./GroupMyScreen";
import JoingroupsScreen from "./JoingroupsScreen";
import GroupCreateScreen from "./GroupCreateScreen";
import GroupDetailScreen from "./GroupDetailScreen";
import GroupMembersScreen from "./GroupMembersScreen";
import GroupDescriptionScreen from "./GroupDescriptionScreen";
import GroupCreatedScreen from "./GroupCreatedScreen";
import BarScreen from "./BarScreen";
import BarEditScreen from "./BarEditScreen";
import FlirtScreen from "./FlirtScreen";
import FlirtCandidatesScreen from "./FlirtCandidatesScreen";
import FlirtsActiveScreen from "./FlirtsActiveScreen";
import FlirtsPendingScreen from "./FlirtsPendingScreen";
import FlirtDetailScreen from "./FlirtDetailScreen";
import FlirtSettingScreen from "./FlirtSettingScreen";
import AddBarScreen from "./AddBarScreen";
import AddBarOwnerScreen from "./AddBarOwnerScreen";
import AddBarLogoSetupScreen from "./AddBarLogoSetupScreen";
import BarAboutScreen from "./BarAboutScreen";
import BarsFilterScreen from "./BarsFilterScreen";
import AddPostScreen from "./AddPostScreen";
import NotificationScreen from "./NotificationScreen";
import MyProfileScreen from "./MyProfileScreen";
import MyPicturesScreen from "./MyPicturesScreen";
import PeopleReactedScreen from "./PeopleReactedScreen";
import AboutScreen from "./AboutScreen";
import BasicInfoScreen from "./BasicInfoScreen";
import ContactInfoScreen from "./ContactInfoScreen";
import RelationshipInfoScreen from "./RelationshipInfoScreen";
import EditProfileScreen from "./EditProfileScreen";
import UserProfileScreen from "./UserProfileScreen";
import MoreProfileScreen from "./MoreProfileScreen";
import ShareInGroupScreen from "./ShareInGroupScreen";
import ShareToFriendsScreen from "./ShareToFriendsScreen";
import ReportScreen from "./ReportScreen";
import FriendsTagScreen from "./FriendsTagScreen";
import CountryListScreen from "./CountryListScreen";
import SavedPostScreen from "./SavedPostScreen";
import RightBillsScreen from "./RightBillsScreen";
import FeedbackScreen from "./FeedbackScreen";
import CelebrityScreen from "./CelebrityScreen";
import AccessInformationScreen from "./AccessInformationScreen";
import RelationshipUserScreen from "./RelationshipUserScreen";
import ChangePasswordScreen from "./ChangePasswordScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import MessageScreen from "./MessageScreen";
import ChatUserListScreen from "./ChatUserListScreen";
import ChatUsersScreen from "./ChatUsersScreen";
import ChatPreviewScreen from "./ChatPreviewScreen";
import ViewFullImageScreen from "./ViewFullImageScreen";
import CommingSoonScreen from "./CommingSoonScreen";
import FriendsCustomersScreen from "./FriendsCustomersScreen";
import FriendsFollowersScreen from "./FriendsFollowersScreen";
import CreateGroupScreen from "./CreateGroupScreen";
import GroupAddScreen from "./GroupAddScreen";
import EventsScreen from "./EventsScreen";
import MapScreen from "./MapScreen";
import CreateCalenderEventScreen from "./CreateCalenderEventScreen";
import MyEventScreen from "./MyEventScreen";
import AllEventsScreen from "./AllEventsScreen";
import EventsCalendarScreen from "./EventsCalendarScreen";
import PendingEventsScreen from "./PendingEventsScreen";
import CreateEventScreen from "./CreateEventScreen";
import EventsNearMeScreen from "./EventsNearMeScreen";
import EventsGoingScreen from "./EventsGoingScreen";
import EventsDetailsScreen from "./EventsDetailsScreen";
import EventsPicturesScreen from "./EventsPicturesScreen";
import EventsInterestedScreen from "./EventsInterestedScreen";
import AnimationScreen from "./AnimationScreen";
import PostByCollectionScreen from "./PostByCollectionScreen";
import GroupInviteFriendScreen from "./GroupInviteFriendScreen";
import MyCompanyEditScreen from "./MyCompanyEditScreen";
import BizHoursScreen from "./BizHoursScreen";
import PostJobScreen from "./PostJobScreen";
import MyJobPostingScreen from "./MyJobPostingScreen";
import BankScreen from "./BankScreen";
import CarsScreen from "./CarsScreen";
import ApartmentsScreen from "./ApartmentsScreen";
import VacationScreen from "./VacationScreen";
import MyCRMScreen from "./MyCRMScreen";
import SocialSellercreen from "./SocialSellercreen";
import MyHomesScreen from "./MyHomesScreen";
import AdvertisingScreen from "./AdvertisingScreen";
import CalendarScreen from "./CalendarScreen";
import RestaurantsScreen from "./RestaurantsScreen";
import RestaurantsStartedScreen from "./RestaurantsStartedScreen";
import RestaurantsFiltersScreen from "./RestaurantsFiltersScreen";
import ShareUsScreen from "./ShareUsScreen";
import AddCompanyScreen from "./AddCompanyScreen";
import AddCompanySetupScreen from "./AddCompanySetupScreen";
import FlirtsRequestPendingScreen from "./FlirtsRequestPendingScreen";
import MyCompanyScreen from "./MyCompanyScreen";
import ViewCompanyScreen from "./ViewCompanyScreen";
import PhoneValidateScreen from "./PhoneValidateScreen";
import FriendsContactsScreen from "./FriendsContactsScreen";
import InvitedContactsScreen from "./InvitedContactsScreen";
import HowToScreen from "./HowToScreen";
import RewardScreen from "./RewardScreen";
import TopLeadboardsScreen from "./TopLeadboardsScreen";
import SignupPhoneScreen from "./SignupPhoneScreen";
import DeleteAccountScreen from "./DeleteAccountScreen";

import store from "../store";
const Stack = createStackNavigator();

const AuthStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={Authscreen}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="PhoneValidate"
        component={PhoneValidateScreen}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="SignupPhone"
        component={SignupPhoneScreen}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="Forgotpswd"
        component={ForgotpswdScreen}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerLeft: () => (
            <View style={{ paddingLeft: 10 }}>
              <Image
                style={styles.headerlogo}
                source={require("../../assets/images/logo.png")}
              />
            </View>
          ),
          headerTitle: (props) => null,
        }}
      />
    </Stack.Navigator>
  );
};

const MainStackNavigator = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerLeft: () => (
            <View style={{ paddingLeft: 10 }}>
              <Image
                style={styles.headerlogo}
                source={require("../../assets/images/logo.png")}
              />
            </View>
          ),
          headerTitle: (props) => null,
        }}
      />
      <Stack.Screen
        name="BarAbout"
        component={BarAboutScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          //headerRight:()=> <TouchableOpacity style={styles.headRightOpacity} onPress={()=> navigation.navigate('BarEdit')}><Feather name="settings" size={20} color="black" /></TouchableOpacity>,
        }}
      />
      <Stack.Screen
        name="FeedFilter"
        component={FeedFilterScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => <FeedFilterHeader />,
        }}
      />
      <Stack.Screen
        name="FeedDetail"
        component={FeedDetailScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Sharp Doe</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="PeopleReacted"
        component={PeopleReactedScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Reactions</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ShareInGroup"
        component={ShareInGroupScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => null,
          headerRight: () => (
            <TouchableOpacity style={styles.headRightOpacity}>
              <Text style={styles.headRightText}>Done</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ShareToFriends"
        component={ShareToFriendsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => null,
          headerRight: () => (
            <TouchableOpacity style={styles.headRightOpacity}>
              <Text style={styles.headRightText}>Done</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Report</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headRightOpacity}>
              <AntDesign name="close" size={22} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="GroupDetail"
        component={GroupDetailScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Group Detail</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="GroupInviteFriend"
        component={GroupInviteFriendScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Invites Friend</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Auth"
        component={Authscreen}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="Signin"
        component={SigninScreen}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="Forgotpswd"
        component={ForgotpswdScreen}
        options={{
          header: (props) => null,
        }}
      />
      <Stack.Screen
        name="MyPictures"
        component={MyPicturesScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Pictures</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Profile</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="MoreProfile"
        component={MoreProfileScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Details</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Create Post</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headRightOpacity}>
              <Text style={styles.headRightText}>POST</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Tag"
        component={FriendsTagScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Tag Friends</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="SavedPost"
        component={SavedPostScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Saved Posts</Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const BarStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Bars"
        component={BarScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Bars</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="BarsFilter"
        component={BarsFilterScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>My Criteria</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AddCompany"
        component={AddCompanyScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Add Company</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.headRightOpacity}
              onPress={() => navigation.navigate("BusinessHour")}
            >
              <Text style={styles.headRightText}>Next</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="MyCompany"
        component={MyCompanyScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>My Companies</Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddCompany", { new: true })}
                style={[styles.headRight, styles.chipOpcity]}
              >
                <AntDesign name="pluscircle" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="BusinessHour"
        component={BizHoursScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Business Hours</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.headRightOpacity}
              onPress={() => navigation.navigate("AddCompanySetup")}
            >
              <Text style={styles.headRightText}>Next</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="AddCompanySetup"
        component={AddCompanySetupScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Logo & Banner</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headRightOpacity}>
              <Text style={styles.headRightText}>Save</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddBar"
        component={AddBarScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Bar Info</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.headRightOpacity}
              onPress={() => navigation.navigate("BarEdit")}
            >
              <Text style={styles.headRightText}>Next</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddBarOwner"
        component={AddBarOwnerScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Owner Info</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.headRightOpacity}
              onPress={() => navigation.navigate("BarLogoSetup")}
            >
              <Text style={styles.headRightText}>Next</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="BarLogoSetup"
        component={AddBarLogoSetupScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Bar Logos</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.headRightOpacity}
              onPress={() => navigation.navigate("Bars")}
            >
              <Text style={styles.headRightText}>Save</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="MyCompanyEdit"
        component={MyCompanyEditScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>New Bar Claim</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="BarAbout"
        component={BarAboutScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Blondies</Text>
            </View>
          ),
          //headerRight:()=> <TouchableOpacity style={styles.headRightOpacity} onPress={()=> navigation.navigate('BarEdit')}><Feather name="settings" size={20} color="black" /></TouchableOpacity>,
        }}
      />
      <Stack.Screen
        name="BarEdit"
        component={BarEditScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Business Hours</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.headRightOpacity}
              onPress={() => navigation.navigate("AddBarOwner")}
            >
              <Text style={styles.headRightText}>Next</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="CountryList"
        component={CountryListScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Search</Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const AddPostStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Create Post</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headRightOpacity}>
              <Text style={styles.headRightText}>POST</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Tag"
        component={FriendsTagScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Tag Friends</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headRightOpacity}>
              <Text style={styles.headRightText}>Done</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const NotificationStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Notifications</Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const FriendsStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Friends"
        component={FriendScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Friends</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AllFriends"
        component={AllFriendsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>My Friends</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="PendingInvites"
        component={PendingInivteScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Pending Invites</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Nearme"
        component={PeopleNearMeScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>People Around Me</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Suggestions"
        component={SuggestionsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Suggestions</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="FamilyAndRelatives"
        component={FamilyAndRelativesScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Family & Relatives</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="BusinessAssociate"
        component={BusinessAssociateScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Business Associate</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="CoWorkers"
        component={CoWorkersScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Co-Workers</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="FriendsCustomers"
        component={FriendsCustomersScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Customers</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="FriendsFollowers"
        component={FriendsFollowersScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Followers</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="FriendsContacts"
        component={FriendsContactsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Contacts</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="InvitedContacts"
        component={InvitedContactsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Invited Contacts</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Profile</Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const GroupStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Groups"
        component={GroupScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Groups</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="GroupInvite"
        component={GrounpInviteScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => null,
        }}
      />
      <Stack.Screen
        name="Groupmy"
        component={GroupMyScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>My Groups</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Joingroup"
        component={JoingroupsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="CreateGroup"
        component={GroupCreateScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Create Group</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="GroupDetail"
        component={GroupDetailScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Group Detail</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Create Post</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headRightOpacity}>
              <Text style={styles.headRightText}>POST</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="FeedDetail"
        component={FeedDetailScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="GroupInviteFriend"
        component={GroupInviteFriendScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Invite Friends</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="GroupDescription"
        component={GroupDescriptionScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => null,
        }}
      />
      <Stack.Screen
        name="GroupMembers"
        component={GroupMembersScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Members</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="GroupCreated"
        component={GroupCreatedScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => null,
        }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Profile</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>About</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Edit Profile</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="MoreProfile"
        component={MoreProfileScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Details</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Profile</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Report</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headRightOpacity}>
              <AntDesign name="close" size={22} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const MenuStackNavigator = ({ navigation, route }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Menu"
        component={MenuScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerLeft: () => (
            <View style={{ paddingLeft: 10 }}>
              <Image
                style={styles.headerlogo}
                source={require("../../assets/images/logo.png")}
              />
            </View>
          ),
          headerTitle: () => null,
        }}
      />
      <Stack.Screen
        name="FeedDetail"
        component={FeedDetailScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}></Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="MenuSetting"
        component={MenuSettingScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Menu Settings</Text>
            </View>
          ),
        }}
      />
      {/*<Stack.Screen
        name="Friends"
        component={FriendScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Friends</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AllFriends"
        component={AllFriendsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>My Friends</Text>
            </View>
          ),
        }}
      />*/}
      <Stack.Screen
        name="PendingInvites"
        component={PendingInivteScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Pending Invites</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Nearme"
        component={PeopleNearMeScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>People Around Me</Text>
            </View>
          ),
        }}
      />
      {/*<Stack.Screen
        name="Groups"
        component={GroupScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Groups</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="GroupInvite"
        component={GrounpInviteScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => null,
        }}
      />
      <Stack.Screen
        name="Groupmy"
        component={GroupMyScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>My Groups</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Joingroup"
        component={JoingroupsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="CreateGroup"
        component={GroupCreateScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Create Group</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="GroupDetail"
        component={GroupDetailScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Group Detail</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="GroupInviteFriend"
        component={GroupInviteFriendScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Invite Friends</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="GroupDescription"
        component={GroupDescriptionScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => null,
        }}
      />
      <Stack.Screen
        name="GroupMembers"
        component={GroupMembersScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Members</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="GroupCreated"
        component={GroupCreatedScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => null,
        }}
      /> */}
      <Stack.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Create Post</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headRightOpacity}>
              <Text style={styles.headRightText}>POST</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="MyProfile"
        component={MyProfileScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Sharp Doe</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="MyPictures"
        component={MyPicturesScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Pictures</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>About</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="BasicInfo"
        component={BasicInfoScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Edit Profile</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ContactInfo"
        component={ContactInfoScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Edit Profile</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="RelationshipInfo"
        component={RelationshipInfoScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Edit Profile</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="RelationshipUser"
        component={RelationshipUserScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Select Person</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Edit Profile</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="MoreProfile"
        component={MoreProfileScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Details</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Profile</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="SavedPost"
        component={SavedPostScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Saved Posts</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="PostByCollection"
        component={PostByCollectionScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="Flirt"
        component={FlirtScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Flirt</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.chipOpcity}
              onPress={() => navigation.navigate("FlirtSetting")}
            >
              <Feather name="sliders" size={20} color={colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="FlirtCandidates"
        component={FlirtCandidatesScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Flirt</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="FlirtsActive"
        component={FlirtsActiveScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Active Flirt</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="FlirtsPending"
        component={FlirtsPendingScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Pending Flirt</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="FlirtsRequestPending"
        component={FlirtsRequestPendingScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Request</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="FlirtDetail"
        component={FlirtDetailScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>John Smith</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="FlirtSetting"
        component={FlirtSettingScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Settings</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.headRightOpacity}
              onPress={() => navigation.navigate("FlirtSetting")}
            >
              <Text style={styles.headRightText}>SAVE</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="RightBills"
        component={RightBillsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Bill of Rights</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Feedback</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Celebrity"
        component={CelebrityScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Celebrity</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="CreateChatGroup"
        component={CreateGroupScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Create Group</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="GroupAdd"
        component={GroupAddScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Add Group</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="AccessInformation"
        component={AccessInformationScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>
                Access your information
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccountScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Delete Account</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ChatUserList"
        component={ChatUserListScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerLeft: () => (
            <View style={styles.headertitle}>
              <View style={styles.rowDirection}>
                <Entypo
                  style={{ marginTop: 10 }}
                  name="chevron-left"
                  size={24}
                  color="black"
                  onPress={() => navigation.goBack()}
                />
                {store.getState().currentUser != null ? (
                  store.getState().currentUser.user.avatar != null ? (
                    <Image
                      style={styles.chatUserImage}
                      source={{ uri: store.getState().currentUser.user.avatar }}
                    />
                  ) : (
                    <Image
                      style={styles.chatUserImage}
                      source={require("../../assets/images/avatar.png")}
                    />
                  )
                ) : (
                  <Image
                    style={styles.chatUserImage}
                    source={require("../../assets/images/avatar.png")}
                  />
                )}
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.headertitlemessage}>MESSAGE/CHAT</Text>
                  {store.getState().currentUser ? (
                    <Text style={styles.headertitlename}>
                      {store.getState().currentUser.user.full_name}
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
          ),
          headerTitle: () => <View style={styles.headertitle}></View>,
        }}
      />
      <Stack.Screen
        name="Message"
        component={MessageScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}></Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Events"
        component={EventsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerTitle: () => (
            <View style={styles.headertitle1}>
              <Text style={styles.headertitleText}>Events</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.headRightOpacity}
              onPress={() => navigation.navigate("CreateCalenderEvent")}
            >
              <Text style={styles.headRightText}>Create</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="EventsCalendar"
        component={EventsCalendarScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.headertitleText}>Calendar</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.headRightOpacity}
              onPress={() => navigation.navigate("CreateCalenderEvent")}
            >
              <Text style={styles.headRightText}>Create</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ChatUsers"
        component={ChatUsersScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => null,
          headerLeft: () => (
            <View
              style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
            >
              <TouchableOpacity
                style={{ flex: 1, justifyContent: "center" }}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back-outline" size={30} color="black" />
              </TouchableOpacity>
              <Avatar.Image
                size={48}
                source={require("../../assets/images/block.jpg")}
              />
              <Text style={styles.userName}>User Name</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ChatPreview"
        component={ChatPreviewScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => null,
        }}
      />

      <Stack.Screen
        name="ViewFullImage"
        component={ViewFullImageScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => <View style={styles.headertitle}></View>,
        }}
      />
      <Stack.Screen
        name="CommingSoon"
        component={CommingSoonScreen}
        getId={({ params }) => params.soonWidget}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Coming Soon</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="CreateCalenderEvent"
        component={CreateCalenderEventScreen}
        // options={{
        //     headerTintColor: colors.primary,
        //     headerBackTitleStyle:{fontSize: 18},
        //     headerStyle: {backgroundColor:colors.white,borderBottomColor:'transparent',borderWidth: 0,elevation: 0},
        //     headerTitle:()=> <View><Text style={styles.headertitleText}>New Event</Text></View>,
        //     headerRight: () => (
        //     <TouchableOpacity
        //       style={styles.headRightOpacity}
        //     >
        //       <Text style={styles.headRightText}>Save</Text>
        //     </TouchableOpacity>
        //   ),
        // }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.headertitleText}>Map</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headRightOpacity}>
              <Text style={styles.headRightText}>Next</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="AllEvents"
        component={AllEventsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerTitle: () => null,
        }}
      />
      <Stack.Screen
        name="MyEvent"
        component={MyEventScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerTitle: () => null,
        }}
      />
      <Stack.Screen
        name="PendingEvents"
        component={PendingEventsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerTitle: () => (
            <View style={styles.headertitle1}>
              <Text style={styles.headertitleText}>Pending</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.headRightOpacity}
              onPress={() => navigation.navigate("CreateCalenderEvent")}
            >
              <Text style={styles.headRightText}>Create</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="CreateEvent"
        component={CreateEventScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerTitle: () => (
            <View>
              <Text style={styles.headertitleText}>Create Event</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="EventsNearMe"
        component={EventsNearMeScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerTitle: () => (
            <View style={styles.headertitle1}>
              <Text style={styles.headertitleText}>Near Me</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.headRightOpacity}
              onPress={() => navigation.navigate("CreateCalenderEvent")}
            >
              <Text style={styles.headRightText}>Create</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="EventsGoing"
        component={EventsGoingScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerTitle: () => (
            <View style={styles.headertitle1}>
              <Text style={styles.headertitleText}>Going In</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.headRightOpacity}
              onPress={() => navigation.navigate("CreateCalenderEvent")}
            >
              <Text style={styles.headRightText}>Create</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="EventsDetails"
        component={EventsDetailsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          header: () => null,
          // headerTitle: () => (
          //   <View style={styles.headertitle1}>
          //     <Text style={styles.headertitleText}>Events Details</Text>
          //   </View>
          // ),
          // headerRight: () => (
          //   <TouchableOpacity
          //     style={styles.headRightOpacity}
          //     onPress={() => navigation.navigate("CreateCalenderEvent")}
          //   >
          //     <Text style={styles.headRightText}>Create</Text>
          //   </TouchableOpacity>
          // ),
        }}
      />

      <Stack.Screen
        name="EventsPictures"
        component={EventsPicturesScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerTitle: () => (
            <View style={styles.headertitle1}>
              <Text style={styles.headertitleText}>Event Pictures</Text>
            </View>
          ),
          // headerRight: () => (
          //   <TouchableOpacity
          //     style={styles.headRightOpacity}
          //     onPress={() => navigation.navigate("CreateCalenderEvent")}
          //   >
          //     <Text style={styles.headRightText}>Create</Text>
          //   </TouchableOpacity>
          // ),
        }}
      />
      <Stack.Screen
        name="Animation"
        component={AnimationScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerTitle: () => (
            <View style={styles.headertitle1}>
              <Text style={styles.headertitleText}>Reactions</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="EventsInterested"
        component={EventsInterestedScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerTitle: () => (
            <View style={styles.headertitle1}>
              <Text style={styles.headertitleText}>Interested In</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="MyCompanyEdit"
        component={MyCompanyEditScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>New Bar Claim</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="BizHours"
        component={BizHoursScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Biz Hours</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="PostJob"
        component={PostJobScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Coming Soon</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="MyJobPosting"
        component={MyJobPostingScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Coming Soon</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Bank"
        component={BankScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Coming Soon</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Cars"
        component={CarsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Coming Soon</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Apartments"
        component={ApartmentsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Coming Soon</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Vacation"
        component={VacationScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Coming Soon</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="MyCRM"
        component={MyCRMScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Coming Soon</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="SocialSeller"
        component={SocialSellercreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Coming Soon</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="MyHomes"
        component={MyHomesScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Coming Soon</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Advertising"
        component={AdvertisingScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Coming Soon</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Coming Soon</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Restaurants</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="RestaurantsStarted"
        component={RestaurantsStartedScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Get Started</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="RestaurantsFilters"
        component={RestaurantsFiltersScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Filters</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ShareUs"
        component={ShareUsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Share Us</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Report</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headRightOpacity}>
              <AntDesign name="close" size={22} color="black" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="AddCompany"
        component={AddCompanyScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Add Company</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.headRightOpacity}
              onPress={() => navigation.navigate("BusinessHour")}
            >
              <Text style={styles.headRightText}>Next</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="MyCompany"
        component={MyCompanyScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>My Companies</Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("AddCompany", { new: true })}
                style={[styles.headRight, styles.chipOpcity]}
              >
                <AntDesign name="pluscircle" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="BusinessHour"
        component={BizHoursScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Business Hours</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={styles.headRightOpacity}
              onPress={() => navigation.navigate("AddCompanySetup")}
            >
              <Text style={styles.headRightText}>Next</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="AddCompanySetup"
        component={AddCompanySetupScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Logo & Banner</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headRightOpacity}>
              <Text style={styles.headRightText}>Save</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="ViewCompany"
        component={ViewCompanyScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Company Detail</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="HowTo"
        component={HowToScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>How To</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="Reward"
        component={RewardScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Reward</Text>
            </View>
          ),
        }}
      />

      <Stack.Screen
        name="TopLeadboards"
        component={TopLeadboardsScreen}
        options={{
          headerTintColor: colors.primary,
          headerBackTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: "transparent",
            borderWidth: 0,
            elevation: 0,
          },
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View style={styles.headertitle}>
              <Text style={styles.headertitleText}>Leaderboard</Text>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerlogo: {
    width: 150,
    height: "95%",
    resizeMode: "contain",
  },
  headertitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headertitleText: {
    color: colors.black,
    fontSize: 20,
    fontFamily: FontFamily.Medium,
    textAlign: "center",
  },
  goBack: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 4,
    borderWidth: 1,
  },
  goBackIcon: {
    fontSize: 25,
    marginRight: 6,
  },
  goBackText: {
    color: colors.primary,
    fontSize: 20,
    fontFamily: FontFamily.Regular,
  },
  chipOpcity: {
    backgroundColor: colors.lightGray,
    borderRadius: 30,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  headRightOpacity: {
    minWidth: 60,
    paddingRight: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headRightText: {
    fontFamily: FontFamily.Medium,
    color: colors.primary,
    fontSize: 15,
  },
  userName: {
    fontFamily: FontFamily.Medium,
    color: colors.black,
    fontSize: 15,
    marginLeft: 5,
  },
  rowDirection: { flexDirection: "row" },
  chatImage: { height: 50, width: 50, borderRadius: 25 },
  messageTitleView: { marginTop: 20, height: 50 },
  chatUserImage: { height: 40, width: 40, borderRadius: 25 },
});

export {
  MainStackNavigator,
  BarStackNavigator,
  AuthStackNavigator,
  GroupStackNavigator,
  FriendsStackNavigator,
  MenuStackNavigator,
  AddPostStackNavigator,
  NotificationStackNavigator,
};
