import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  Platform,
  Picker,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ImageBackground,
} from "react-native";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Switch } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Color } from "@common";
import moment from "moment";
import {
  MaterialIcons,
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  Feather,
  Entypo,
  FontAwesome5,
  Zocial,
  createIconSetFromFontello,
} from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { RadioButton } from "react-native-paper";
import { connect } from "react-redux";
import { Checkbox } from "react-native-paper";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Touchable } from "react-native";
import Geocoder from "react-native-geocoding";
import Dialog, {
  DialogContent,
  DialogTitle,
  ScaleAnimation,
  DialogFooter,
  DialogButton,
} from "react-native-popup-dialog";

Geocoder.init("AIzaSyBi1vr84ffSSHUhmtNdxea9sZNROw3QZho");

class CreateCalenderEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStart: false,
      showStartTime: false,
      showEnd: false,
      showEndTime: false,

      checkedCustomer: false,
      checkedFamily: false,
      checkedBusiness: false,
      checkedWorkers: false,
      checkedFriends: false,

      selectedGroup: null,

      startDate: new Date(),
      startTime: new Date(),
      endDate: new Date(),
      endTime: new Date(),
      imageUrl: null,
    };
    this.modalizeRef = React.createRef();
    this.alertModalizeRef = React.createRef();
    this.inviteeRef = React.createRef();
    this.listInviteeRef = React.createRef();
    this.groupInviteeRef = React.createRef();
    this.groupFlatlistRef = null;
  }

  // openImagePickerAsync = async () => {
  //   const { status } = await ImagePicker.requestCameraPermissionsAsync();

  //   if (status !== "granted") {
  //     alert("Permission to access camera roll is required!");
  //     return;
  //   }

  //   let pickerResult = await ImagePicker.launchImageLibraryAsync();
  //   if (!pickerResult.cancelled) {
  //     this.addEventForm("image", pickerResult);
  //     this.setState({
  //       imageUrl: pickerResult.uri,
  //     });
  //   }
  // };

  addPhotos = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access camera roll is required!");
      return;
    }
    let photos = Object.assign([], this.props.form.photos);

    if (photos.length >= 10) {
      Alert.alert("Photos limit", "You have to upload upto 10 pictures", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    console.log(pickerResult);
    if (!pickerResult.cancelled) {
      photos.push(pickerResult);
    }
    this.addEventForm("photos", photos);
  };
  removePhoto = (index) => {
    let photos = [...this.props.form.photos];
    photos.splice(index, 1);
    this.addEventForm("photos", photos);
  };
  componentDidMount() {
    let is_edit = false;
    if (typeof this.props.route !== "undefined") {
      if (typeof this.props.route.params !== "undefined") {
        if (typeof this.props.route.params.item !== "undefined") {
          is_edit = true;
        }
      }
    }

    this.props.navigation.setOptions({
      headerTintColor: colors.primary,
      headerBackTitleStyle: { fontSize: 18 },
      headerStyle: {
        backgroundColor: colors.white,
        borderBottomColor: "transparent",
        borderWidth: 0,
        elevation: 0,
      },
      headerTitle: () => (
        <View>
          <Text style={styles.headertitleText}>
            {is_edit ? "Edit Event" : "New Event"}
          </Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.headRightOpacity}
          onPress={this.validation}
        >
          <Text style={styles.headRightText}>Save</Text>
        </TouchableOpacity>
      ),
    });

    this.props.fetchGroups(10, 1);

    if (typeof this.props.route !== "undefined") {
      if (typeof this.props.route.params !== "undefined") {
        console.log("item...", this.props.route.params.item);
        if (typeof this.props.route.params.item !== "undefined") {
          let form = {};
          let item = this.props.route.params.item;
          form.id = item.id;
          form.name = item.name;

          Geocoder.from(item.latitude, item.longitude)
            .then((json) => {
              var addressComponent = json.results[0].address_components[0];
              this.props.saveAddress(addressComponent.long_name);
            })
            .catch((error) => console.warn(error));

          form.latitude = item.latitude;
          form.longitude = item.longitude;

          if (item.privacy === "public") {
            form.privacy = true;
          } else if (item.privacy === "private") {
            form.privacy = false;
          }

          form.e_alert = item.e_alert;
          form.e_repeat = item.e_repeat;
          form.description = item.description;
          form.e_allDay = item.e_allDay;

          if (item.start_date) {
            const res = item.start_date.split(" ");
            form.start_date = res[0];
            // form.start_time = res[1];
          }

          if (item.end_date) {
            const res = item.end_date.split(" ");
            form.end_date = res[0];
            // form.end_time = res[1];
          }

          form.b_country = item.country;
          if (item.bar_type_id) {
            form.b_type_id = item.bar_type_id;
          }
          var invites = [];
          if (item.invites && item.invites.length > 0) {
            item.invites.map((item, key) => {
              invites.push(item);
            });
          }
          form.invites = invites;

          var attachments = [];
          if (item.attachments && item.attachments.length > 0) {
            item.attachments.map((item, key) => {
              attachments.push({
                ...item,
                attachment_url: item.attachment_url,
              });
            });
          }
          form.attachments = attachments;

          this.props.addEventForm(form);
          console.log("newForm", form);
        }
      } else {
        this.props.addEventForm({});
        // this.props.saveAddress("");
        this.addEventForm("privacy", true);
      }
    }
  }

  setStartDate = () => {
    this.setState({ showStart: true });
  };

  setStartTime = () => {
    this.setState({ showStartTime: true });
  };

  setEndDate = () => {
    this.setState({ showEnd: true });
  };

  setEndTime = () => {
    this.setState({ showEndTime: true });
  };

  isSwitchOnClick = (e) => {
    this.setState({ isSwitchOn: !this.state.isSwitchOn });
  };

  _repeatPopup = () => {
    this.modalizeRef.current?.open();
  };

  _alertPopup = () => {
    this.alertModalizeRef.current?.open();
  };

  _inviteePopup = () => {
    this.inviteeRef.current?.open();
  };

  _listInviteeRef = () => {
    this.listInviteeRef.current?.open();
    this.inviteeRef.current?.close();
  };

  _groupInviteeRef = () => {
    this.groupInviteeRef.current?.open();
    this.inviteeRef.current?.close();
  };

  _groupBackRef = () => {
    this.groupInviteeRef.current?.close();
    this.inviteeRef.current?.open();
  };

  _listBackRef = () => {
    this.listInviteeRef.current?.close();
    this.inviteeRef.current?.open();
  };

  _doneRef = () => {
    this.inviteeRef.current?.close();
    this.listInviteeRef.current?.close();
    this.groupInviteeRef.current?.close();
    this.alertModalizeRef.current?.close();
    this.modalizeRef.current?.close();
  };

  addEventForm = (key, value) => {
    let form = Object.assign({}, this.props.form);
    form[key] = value;
    this.props.addEventForm(form);
  };

  handleStartDateChange = (event, date) => {
    var d = String(date);
    this.setState({
      startDate: date,
    });
    this.addEventForm("start_date", d);
  };

  handleStartTimeChange = (event, date) => {
    var d = String(date);
    this.setState({
      startTime: date,
    });

    this.addEventForm("start_time", d);
  };

  handleEndDateChange = (event, date) => {
    var d = String(date);
    this.setState({
      endDate: date,
    });

    this.addEventForm("end_date", d);
  };

  handleEndTimeChange = (event, date) => {
    var d = String(date);
    this.setState({
      endTime: date,
    });

    this.addEventForm("end_time", d);
  };

  _alert = (text) => {
    Alert.alert("Cannot Submit!", text, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  handleSelectList = (data) => {
    if (data === "invite_customer") {
      if (this.state.checkedCustomer === true) {
        this.addEventForm(data, false);
      } else {
        this.addEventForm(data, true);
      }
      this.setState({
        checkedCustomer: !this.state.checkedCustomer,
      });
    } else if (data === "invite_family") {
      if (this.state.checkedFamily === true) {
        this.addEventForm(data, false);
      } else {
        this.addEventForm(data, true);
      }
      this.setState({
        checkedFamily: !this.state.checkedFamily,
      });
    } else if (data === "invite_business") {
      if (this.state.checkedBusiness === true) {
        this.addEventForm(data, false);
      } else {
        this.addEventForm(data, true);
      }
      this.setState({
        checkedBusiness: !this.state.checkedBusiness,
      });
    } else if (data === "invite_workers") {
      if (this.state.checkedWorkers === true) {
        this.addEventForm(data, false);
      } else {
        this.addEventForm(data, true);
      }
      this.setState({
        checkedWorkers: !this.state.checkedWorkers,
      });
    } else if (data === "invite_friends") {
      if (this.state.checkedFriends === true) {
        this.addEventForm(data, false);
      } else {
        this.addEventForm(data, true);
      }
      this.setState({
        checkedFriends: !this.state.checkedFriends,
      });
    }
  };

  validation = () => {
    console.log("submit...", this.props.form);
    let flag = true;
    let array = [
      "name",
      "lat_lng",
      // "latitude",
      // "longitude",
      "start_date",
      "end_date",
      // "e_repeat",
      // "e_alert",
      "photos",
      // "attachments",
      "start_time",
      "end_time",
      // "privacy",
    ];
    let form = Object.assign({}, this.props.form);

    array.map((item, key) => {
      if (!Object.keys(form).some((index) => index === item)) {
        this.setState({ [item]: true });
        flag = false;
      }
    });
    Object.keys(form).map((item) => {
      if (array.some((index) => index === item)) {
        if (
          form[item] === null ||
          form[item] === "null" ||
          form[item] === "" ||
          form[item].length === 0
        ) {
          this.setState({ [item]: true });
          flag = false;
        } else {
          this.setState({ [item]: false });
        }
      }
    });

    let formData = new FormData();

    if (flag) {
      let form = this.props.form;
      Object.keys(form).map(function (key) {
        if (key === "photos" && form[key]) {
          form[key].forEach((item, i) => {
            var uri =
              Platform.OS === "android" ? item.uri : item.uri.replace("", "");
            formData.append("photos[" + i + "]", {
              uri: uri,
              type: Platform.OS === "android" ? "image/jpg" : item.type,
              name: item.filename || `filename${i}.` + uri.split(".").pop(),
            });
          });
        } else if (key === "lat_lng" && form[key]) {
          formData.append("latitude", form[key].lat);
          formData.append("longitude", form[key].lng);
        } else {
          formData.append(key, form[key]);
        }
      });

      console.log("Screen..");

      this.props.submitEvent(formData);
    }
  };

  handleSelectGroup = (item, index) => {
    const { selectedGroup } = this.state;

    if (selectedGroup !== item.id) {
      this.setState({
        selectedGroup: item.id,
      });
      this.addEventForm("group_id", item.id);
    } else {
      this.setState({
        selectedGroup: null,
      });
      this.addEventForm("group_id", null);
    }
  };

  renderGroupItem = ({ item, index }) => {
    const { selectedGroup } = this.state;
    let avatarUrl =
      "https://library.kissclipart.com/20180913/qq/kissclipart-friends-illustration-png-clipart-clip-art-dc26e1a3f72f4ebd.jpg";
    if (item.attachments) {
      avatarUrl = item.attachments;
    }
    return (
      <>
        <TouchableOpacity
          style={
            selectedGroup === item.id
              ? [
                  styles.list,
                  {
                    backgroundColor: colors.primary,
                    padding: 5,
                    borderRadius: 5,
                  },
                ]
              : styles.list
          }
          onPress={() => this.handleSelectGroup(item, index)}
        >
          <View style={styles.listInline}>
            <View style={styles.listInlineIcon}>
              <Avatar.Image size={54} source={{ uri: avatarUrl }} />
            </View>
            <Text
              style={
                selectedGroup === item.id
                  ? [
                      styles.textBold,
                      {
                        color: colors.white,
                      },
                    ]
                  : styles.textBold
              }
            >
              {item.title}
            </Text>
          </View>
          <Checkbox
            color={colors.primary}
            status={this.state.checked ? "checked" : "unchecked"}
            onPress={(index) => this.handleSelectGroup(index)}
          />
        </TouchableOpacity>
        <View style={styles.separator} />
      </>
    );
  };
  renderGroupList = () => {
    const { groupData } = this.props;

    return (
      <FlatList
        ref={(ref) => {
          this.groupFlatlistRef = ref;
        }}
        // onScrollEndDrag={this.onScrollEndDrag}
        contentContainerStyle={{ flexGrow: 1 }}
        pagingEnabled
        extraData={groupData}
        showsHorizontalScrollIndicator={false}
        data={groupData}
        onEndReachedThreshold={0.5}
        initialNumToRender={50}
        // onEndReached={this._onEndReached}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderGroupItem}
        disableVirtualization={false}
        // refreshControl={
        //   <RefreshControl refreshing={false} onRefresh={this._onRefresh} />
        // }
        ListFooterComponent={() =>
          this.props.isFetching ? (
            <ActivityIndicator
              style={{ flex: 1, justifyContent: "center" }}
              size="large"
              color={Color.gray}
            />
          ) : null
        }
      />
    );
  };

  iviteeList = (form) => {
    let arr = [];

    if (form.invite_customer) {
      if (form.invite_customer === true) {
        arr.push("Customers");
      } else {
        const index = arr.indexOf("Customers");
        if (index !== -1) arr.splice(index, 1);
      }
    }

    if (form.invite_family) {
      if (form.invite_family === true) {
        arr.push("Family");
      } else {
        const index = arr.indexOf("Family");
        if (index !== -1) arr.splice(index, 1);
      }
    }

    if (form.invite_business) {
      if (form.invite_business === true) {
        arr.push("Business");
      } else {
        const index = arr.indexOf("Business");
        if (index !== -1) arr.splice(index, 1);
      }
    }

    if (form.invite_workers) {
      if (form.invite_workers === true) {
        arr.push("Workers");
      } else {
        const index = arr.indexOf("Workers");
        if (index !== -1) arr.splice(index, 1);
      }
    }

    if (form.invite_friends) {
      if (form.invite_friends === true) {
        arr.push("Friends");
      } else {
        const index = arr.indexOf("Friends");
        if (index !== -1) arr.splice(index, 1);
      }
    }

    if (arr.length > 0) {
      return (
        <>
          {arr.map((i, index) => (
            <Text key={index}>{i}, </Text>
          ))}
        </>
      );
    } else return <Text style={styles.graytext}>Invitee</Text>;
  };

  render() {
    const { form, selectedAddress } = this.props;
    console.log("formData", form);
    let is_visible = false;
    if (this.props.isProcessing) {
      is_visible = true;
    } else {
      is_visible = false;
    }

    let repeat = "";
    let alert = "";

    if (form.e_repeat) {
      if (form.e_repeat === "dont-repeat") {
        repeat = "Don't Repeat";
      } else if (form.e_repeat === "every-day") {
        repeat = "Every Day";
      } else if (form.e_repeat === "every-week") {
        repeat = "Every Week";
      } else if (form.e_repeat === "every-month") {
        repeat = "Every Month";
      } else if (form.e_repeat === "every-year") {
        repeat = "Every Year";
      }
    }

    if (form.e_alert) {
      if (form.e_alert === "no-alert") {
        alert = "No Alert";
      } else if (form.e_alert === "on-time") {
        alert = "At the time of event";
      } else if (form.e_alert === "30-minute-before") {
        alert = "30 Minutes before";
      } else if (form.e_alert === "24-hour-before") {
        alert = "1 Day before";
      }
    }
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrolledview}
          extraScrollHeight={Platform.OS === "ios" ? 100 : 0}
        >
          <View style={[styles.boxShadow, styles.roundedContainer]}>
            <View
              style={[
                styles.roundedtextinputcontainer,
                styles.boxShadow,
                this.state.name ? { borderColor: "red", borderWidth: 1 } : {},
              ]}
            >
              <View style={styles.listInlineIcon}>
                <MaterialCommunityIcons
                  name="format-title"
                  size={20}
                  color={colors.gray}
                />
              </View>
              <TextInput
                style={styles.roundedtextinput}
                placeholder="Enter Title"
                value={form.name}
                placeholderTextColor={colors.gray}
                onChangeText={(text) => this.addEventForm("name", text)}
              />
            </View>
            <View style={styles.spacing} />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Map")}
              style={[
                styles.roundedtextinputcontainer,
                styles.boxShadow,
                this.state.lat_lng
                  ? { borderColor: "red", borderWidth: 1 }
                  : {},
              ]}
            >
              <View
                style={[
                  styles.listInlineIcon,
                  styles.listInline,
                  { paddingVertical: 5 },
                ]}
              >
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={colors.gray}
                />
                {selectedAddress ? (
                  <Text
                    style={[
                      styles.text,
                      { fontSize: 14, flex: 1, marginHorizontal: 10 },
                    ]}
                  >
                    {selectedAddress}
                  </Text>
                ) : (
                  <Text
                    style={{ color: colors.gray, fontSize: 14, marginLeft: 12 }}
                  >
                    Location
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.spacing} />
          <View style={[styles.boxShadow, styles.roundedContainer]}>
            <View style={styles.list}>
              <Text style={styles.graytext}>All Day</Text>
              <Switch
                value={this.props.form.e_allDay}
                color={colors.primary}
                onValueChange={(value) => this.addEventForm("e_allDay", value)}
              />
            </View>
            <View style={styles.spacing} />

            <View style={styles.list}>
              <TouchableOpacity
                onPress={this.setStartDate}
                style={[
                  styles.roundedtextinputcontainer,
                  styles.boxShadow,
                  { width: 100 },
                  this.state.start_date
                    ? { borderColor: "red", borderWidth: 1 }
                    : {},
                ]}
              >
                <View style={styles.listInlineIcon}>
                  <MaterialIcons
                    name="date-range"
                    size={20}
                    color={colors.gray}
                  />
                </View>
                {form.start_date ? (
                  <Text
                    style={[styles.graytext, { color: colors.black, flex: 1 }]}
                  >
                    {moment(form.start_date).format("MMMM Do YYYY")}
                  </Text>
                ) : (
                  <Text style={styles.graytext}>Start Date</Text>
                )}
              </TouchableOpacity>
              {form.e_allDay ? null : (
                <TouchableOpacity
                  onPress={this.setStartTime}
                  style={[
                    styles.roundedtextinputcontainer,
                    styles.boxShadow,
                    { marginLeft: 10 },
                    this.state.start_time
                      ? { borderColor: "red", borderWidth: 1 }
                      : {},
                  ]}
                >
                  <View style={styles.listInlineIcon}>
                    <Feather name="clock" size={20} color={colors.gray} />
                  </View>
                  {form.start_time ? (
                    <Text style={[styles.graytext, { color: colors.black }]}>
                      {moment(form.start_time).format("h:mm:ss a")}
                    </Text>
                  ) : (
                    <Text style={styles.graytext}>Start Time</Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.spacing} />

            <View style={styles.list}>
              <TouchableOpacity
                onPress={this.setEndDate}
                style={[
                  styles.roundedtextinputcontainer,
                  styles.boxShadow,
                  this.state.end_date
                    ? { borderColor: "red", borderWidth: 1 }
                    : {},
                ]}
              >
                <View style={styles.listInlineIcon}>
                  <MaterialIcons
                    name="date-range"
                    size={20}
                    color={colors.gray}
                  />
                </View>
                {form.end_date ? (
                  <Text
                    style={[styles.graytext, { color: colors.black, flex: 1 }]}
                  >
                    {moment(form.end_date).format("MMMM Do YYYY")}
                  </Text>
                ) : (
                  <Text style={styles.graytext}>End Date</Text>
                )}
              </TouchableOpacity>

              {form.e_allDay ? null : (
                <TouchableOpacity
                  onPress={this.setEndTime}
                  style={[
                    styles.roundedtextinputcontainer,
                    styles.boxShadow,
                    { marginLeft: 10 },
                    this.state.end_time
                      ? { borderColor: "red", borderWidth: 1 }
                      : {},
                  ]}
                >
                  <View style={styles.listInlineIcon}>
                    <Feather name="clock" size={20} color={colors.gray} />
                  </View>
                  {form.end_time ? (
                    <Text style={[styles.graytext, { color: colors.black }]}>
                      {moment(form.end_time).format("h:mm:ss a")}
                    </Text>
                  ) : (
                    <Text style={styles.graytext}>End Time</Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.spacing} />
          <View style={[styles.boxShadow, styles.roundedContainer]}>
            <View style={styles.list}>
              {form.privacy ? (
                <Text style={styles.graytext}>Public</Text>
              ) : (
                <Text style={styles.graytext}>Private</Text>
              )}

              <Switch
                value={this.props.form.privacy}
                color={colors.primary}
                onValueChange={(value) => this.addEventForm("privacy", value)}
              />
            </View>
            <View style={styles.spacing} />
            <View style={[styles.roundedtextinputcontainer, styles.boxShadow]}>
              <View style={styles.listInlineIcon}>
                <AntDesign name="filetext1" size={18} color={colors.gray} />
              </View>
              <TextInput
                multiline
                style={[styles.roundedtextinput]}
                value={form.description}
                placeholder="Notes"
                placeholderTextColor={colors.gray}
                onChangeText={(text) => this.addEventForm("description", text)}
              />
            </View>
            <View style={styles.spacing} />
            <TouchableOpacity
              style={[styles.roundedtextinputcontainer, styles.boxShadow]}
              onPress={this._repeatPopup}
            >
              <View style={styles.listInline}>
                <View style={styles.listInlineIcon}>
                  <Feather name="repeat" size={20} color={colors.gray} />
                </View>
                {form.e_repeat ? (
                  <Text style={[styles.graytext, { color: colors.black }]}>
                    {repeat}
                  </Text>
                ) : (
                  <Text style={styles.graytext}>Repeat</Text>
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.spacing} />
            <TouchableOpacity
              style={[styles.roundedtextinputcontainer, styles.boxShadow]}
              onPress={this._alertPopup}
            >
              <View style={styles.listInline}>
                <View style={styles.listInlineIcon}>
                  <Feather name="bell" color={colors.gray} size={18} />
                </View>
                {form.e_alert ? (
                  <Text style={[styles.graytext, { color: colors.black }]}>
                    {alert}
                  </Text>
                ) : (
                  <Text style={styles.graytext}>Alert</Text>
                )}
              </View>
            </TouchableOpacity>
            <View style={styles.spacing} />
            <TouchableOpacity
              style={[styles.roundedtextinputcontainer, styles.boxShadow]}
              onPress={this._inviteePopup}
            >
              <View style={styles.listInline}>
                <View style={styles.listInlineIcon}>
                  <Zocial name="guest" color={colors.gray} size={18} />
                </View>

                {this.iviteeList(form)}
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.spacing} />
          {this.props.form.photos && this.props.form.photos.length > 0 ? (
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {this.props.form.photos.map((item, key) => (
                <View style={{ marginTop: 10 }}>
                  <ImageBackground
                    style={styles.uploadImages}
                    imageStyle={{ borderRadius: 6 }}
                    source={{
                      uri: item.uri,
                    }}
                  >
                    <TouchableOpacity
                      style={styles.uploadImagesClose}
                      onPress={() => this.removePhoto(key)}
                    >
                      <AntDesign name="close" size={16} color={colors.white} />
                    </TouchableOpacity>
                  </ImageBackground>
                </View>
              ))}
            </ScrollView>
          ) : null}

          {/* {this.props.form.photos && this.props.form.photos.length > 0 ? (
            <View
              style={[
                styles.boxShadow,
                styles.roundedContainer,
                {
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                },
              ]}
            >
              {this.props.form.photos.map((item, key) => (
                <TouchableOpacity
                  style={[styles.list, styles.boxShadow, { width: "48%" }]}
                >
                  <TouchableOpacity
                    onPress={() => this.removePhoto(key)}
                    style={{
                      position: "absolute",
                      right: 0,
                      zIndex: 1,
                      top: 0,
                    }}
                  >
                    <Feather name="trash-2" size={24} color={colors.gray} />
                  </TouchableOpacity>
                  <Image style={styles.photos} source={{ uri: item.uri }} />
                </TouchableOpacity>
              ))}
            </View>
          ) : null} */}

          <View style={styles.spacing} />
          <View style={[styles.boxShadow, styles.roundedContainer]}>
            <TouchableOpacity
              style={[
                styles.uploadImagesContainer,
                this.state.image ? { borderColor: "red", borderWidth: 1 } : {},
              ]}
              onPress={this.addPhotos}
            >
              <Feather name="upload" size={54} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>

        {/* Start Date */}

        {Platform.OS === "ios" ? (
          <Dialog
            visible={this.state.showStart}
            width={0.8}
            onTouchOutside={() => {
              this.setState({ showStart: false });
            }}
            footer={
              <DialogFooter>
                <DialogButton
                  text="OK"
                  onPress={() => {
                    this.setState({ showStart: false });
                  }}
                />
              </DialogFooter>
            }
          >
            <DialogContent>
              <RNDateTimePicker
                style={{
                  shadowColor: "#000000",
                  shadowRadius: 0,
                  shadowOpacity: 1,
                  shadowOffset: { height: 0, width: 0 },
                }}
                textColor={colors.black}
                value={this.state.startDate}
                mode="date"
                minimumDate={new Date()}
                is24Hour={true}
                display="spinner"
                onChange={this.handleStartDateChange}
              />
            </DialogContent>
          </Dialog>
        ) : this.state.showStart ? (
          <RNDateTimePicker
            value={this.state.startDate}
            mode="date"
            minimumDate={new Date()}
            onChange={this.handleStartDateChange}
          />
        ) : null}

        {/* Start Time */}

        {Platform.OS === "ios" ? (
          <Dialog
            visible={this.state.showStartTime}
            width={0.8}
            onTouchOutside={() => {
              this.setState({ showStartTime: false });
            }}
            footer={
              <DialogFooter>
                <DialogButton
                  text="OK"
                  onPress={() => {
                    this.setState({ showStartTime: false });
                  }}
                />
              </DialogFooter>
            }
          >
            <DialogContent>
              <RNDateTimePicker
                style={{
                  shadowColor: "#000000",
                  shadowRadius: 0,
                  shadowOpacity: 1,
                  shadowOffset: { height: 0, width: 0 },
                }}
                textColor={colors.black}
                value={this.state.startTime}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={this.handleStartTimeChange}
              />
            </DialogContent>
          </Dialog>
        ) : this.state.showStartTime ? (
          <RNDateTimePicker
            value={this.state.startTime}
            mode="time"
            // minimumDate={new Date()}
            onChange={this.handleStartTimeChange}
          />
        ) : null}

        {/* End Date */}

        {Platform.OS === "ios" ? (
          <Dialog
            visible={this.state.showEnd}
            width={0.8}
            onTouchOutside={() => {
              this.setState({ showEnd: false });
            }}
            footer={
              <DialogFooter>
                <DialogButton
                  text="OK"
                  onPress={() => {
                    this.setState({ showEnd: false });
                  }}
                />
              </DialogFooter>
            }
          >
            <DialogContent>
              <RNDateTimePicker
                style={{
                  shadowColor: "#000000",
                  shadowRadius: 0,
                  shadowOpacity: 1,
                  shadowOffset: { height: 0, width: 0 },
                }}
                textColor={colors.black}
                value={this.state.endDate}
                mode="date"
                minimumDate={new Date()}
                is24Hour={true}
                display="spinner"
                onChange={this.handleEndDateChange}
              />
            </DialogContent>
          </Dialog>
        ) : this.state.showEnd ? (
          <RNDateTimePicker
            value={this.state.endDate}
            mode="date"
            minimumDate={new Date()}
            onChange={this.handleEndDateChange}
          />
        ) : null}

        {/* End Time */}

        {Platform.OS === "ios" ? (
          <Dialog
            visible={this.state.showEndTime}
            width={0.8}
            onTouchOutside={() => {
              this.setState({ showEndTime: false });
            }}
            footer={
              <DialogFooter>
                <DialogButton
                  text="OK"
                  onPress={() => {
                    this.setState({ showEndTime: false });
                  }}
                />
              </DialogFooter>
            }
          >
            <DialogContent>
              <RNDateTimePicker
                style={{
                  shadowColor: "#000000",
                  shadowRadius: 0,
                  shadowOpacity: 1,
                  shadowOffset: { height: 0, width: 0 },
                }}
                textColor={colors.black}
                value={this.state.endTime}
                mode="time"
                is24Hour={true}
                display="spinner"
                onChange={this.handleEndTimeChange}
              />
            </DialogContent>
          </Dialog>
        ) : this.state.showEndTime ? (
          <RNDateTimePicker
            value={this.state.endTime}
            mode="time"
            // minimumDate={new Date()}
            onChange={this.handleEndTimeChange}
          />
        ) : null}

        <Portal>
          <Modalize ref={this.inviteeRef} adjustToContentHeight={true}>
            <View style={styles.modalizeContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[styles.heading, { textAlign: "center", flex: 1 }]}
                >
                  Select Invitee
                </Text>
                <TouchableOpacity onPress={this._doneRef}>
                  <Text style={styles.primaryText}>Done</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.list}
                onPress={this._listInviteeRef}
              >
                <View style={styles.listInline}>
                  <View style={[styles.listInlineIcon, styles.inviteeIcon]}>
                    <Feather name="list" size={28} color={colors.white} />
                  </View>
                  <Text style={styles.textBold}>List</Text>
                </View>
                <Entypo name="chevron-thin-right" size={16} color="black" />
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.list}
                onPress={this._groupInviteeRef}
              >
                <View style={styles.listInline}>
                  <View style={[styles.listInlineIcon, styles.inviteeIcon]}>
                    <FontAwesome5 name="users" size={24} color={colors.white} />
                  </View>
                  <Text style={styles.textBold}>Groups</Text>
                </View>
                <Entypo name="chevron-thin-right" size={16} color="black" />
              </TouchableOpacity>
            </View>
          </Modalize>
        </Portal>

        <Portal>
          <Modalize ref={this.groupInviteeRef} adjustToContentHeight={true}>
            <View style={styles.modalizeContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity onPress={this._groupBackRef}>
                  <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text
                  style={[styles.heading, { textAlign: "center", flex: 1 }]}
                >
                  Invite Groups
                </Text>
                <TouchableOpacity onPress={this._doneRef}>
                  <Text style={styles.primaryText}>Done</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />

              {this.renderGroupList()}
            </View>
          </Modalize>
        </Portal>

        <Portal>
          <Modalize ref={this.listInviteeRef} adjustToContentHeight={true}>
            <View style={styles.modalizeContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity onPress={this._listBackRef}>
                  <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text
                  style={[styles.heading, { textAlign: "center", flex: 1 }]}
                >
                  Select Invite List
                </Text>
                <TouchableOpacity onPress={this._doneRef}>
                  <Text style={styles.primaryText}>Done</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.list}
                onPress={() => this.handleSelectList("invite_customer")}
              >
                <Text style={styles.textBold}>Inivte Customer</Text>
                <Checkbox
                  color={colors.primary}
                  status={this.state.checkedCustomer ? "checked" : "unchecked"}
                  onPress={() => this.handleSelectList("invite_customer")}
                />
              </TouchableOpacity>

              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.list}
                onPress={() => this.handleSelectList("invite_family")}
              >
                <Text style={styles.textBold}>Invite Family & Relatives</Text>
                <Checkbox
                  color={colors.primary}
                  status={this.state.checkedFamily ? "checked" : "unchecked"}
                  onPress={() => this.handleSelectList("invite_family")}
                />
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.list}
                onPress={() => this.handleSelectList("invite_business")}
              >
                <Text style={styles.textBold}>Inivte Business Associate</Text>
                <Checkbox
                  color={colors.primary}
                  status={this.state.checkedBusiness ? "checked" : "unchecked"}
                  onPress={() => this.handleSelectList("invite_business")}
                />
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.list}
                onPress={() => this.handleSelectList("invite_workers")}
              >
                <Text style={styles.textBold}>Inivte Co-Workers</Text>
                <Checkbox
                  color={colors.primary}
                  status={this.state.checkedWorkers ? "checked" : "unchecked"}
                  onPress={() => this.handleSelectList("invite_workers")}
                />
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.list}
                onPress={() => this.handleSelectList("invite_friends")}
              >
                <Text style={styles.textBold}>Inivte All Friends</Text>
                <Checkbox
                  color={colors.primary}
                  status={this.state.checkedFriends ? "checked" : "unchecked"}
                  onPress={() => this.handleSelectList("invite_friends")}
                />
              </TouchableOpacity>
              <View style={styles.separator} />
              {/* <TouchableOpacity
                style={styles.list}
                onPress={this.handleSelectList}
              >
                <Text style={styles.textBold}>
                  Allow Friends to invite others
                </Text>
                <Checkbox
                  color={colors.primary}
                  status={this.state.checked ? "checked" : "unchecked"}
                  onPress={this.handleSelectList}
                />
              </TouchableOpacity> */}
            </View>
          </Modalize>
        </Portal>

        <Portal>
          <Modalize ref={this.modalizeRef} adjustToContentHeight={true}>
            <View style={styles.modalizeContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[styles.heading, { textAlign: "center", flex: 1 }]}
                >
                  Repeat Event
                </Text>
                <TouchableOpacity onPress={this._doneRef}>
                  <Text style={styles.primaryText}>Done</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <RadioButton.Group
                onValueChange={(value) => this.addEventForm("e_repeat", value)}
                value={this.props.form.e_repeat}
              >
                <TouchableOpacity
                  style={styles.listInline}
                  onPress={() => this.addEventForm("e_repeat", "dont-repeat")}
                >
                  <View style={styles.listInlineIcon}>
                    <RadioButton.Android
                      uncheckedColor={colors.gray}
                      color={colors.primary}
                      value="dont-repeat"
                    />
                  </View>
                  <Text style={styles.text}>Don't Repeat</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity
                  style={styles.listInline}
                  onPress={() => this.addEventForm("e_repeat", "every-day")}
                >
                  <View style={styles.listInlineIcon}>
                    <RadioButton.Android
                      uncheckedColor={colors.gray}
                      color={colors.primary}
                      value="every-day"
                    />
                  </View>
                  <Text style={styles.text}>Every Day</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity
                  style={styles.listInline}
                  onPress={() => this.addEventForm("e_repeat", "every-week")}
                >
                  <View style={styles.listInlineIcon}>
                    <RadioButton.Android
                      uncheckedColor={colors.gray}
                      color={colors.primary}
                      value="every-week"
                    />
                  </View>
                  <Text style={styles.text}>Every Week</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity
                  style={styles.listInline}
                  onPress={() => this.addEventForm("e_repeat", "every-month")}
                >
                  <View style={styles.listInlineIcon}>
                    <RadioButton.Android
                      uncheckedColor={colors.gray}
                      color={colors.primary}
                      value="every-month"
                    />
                  </View>
                  <Text style={styles.text}>Every Month</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity
                  style={styles.listInline}
                  onPress={() => this.addEventForm("e_repeat", "every-year")}
                >
                  <View style={styles.listInlineIcon}>
                    <RadioButton.Android
                      uncheckedColor={colors.gray}
                      color={colors.primary}
                      value="every-year"
                    />
                  </View>
                  <Text style={styles.text}>Every Year</Text>
                </TouchableOpacity>
              </RadioButton.Group>
            </View>
          </Modalize>
        </Portal>

        <Portal>
          <Modalize ref={this.alertModalizeRef} adjustToContentHeight={true}>
            <View style={styles.modalizeContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[styles.heading, { textAlign: "center", flex: 1 }]}
                >
                  Event Alert
                </Text>
                <TouchableOpacity onPress={this._doneRef}>
                  <Text style={styles.primaryText}>Done</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.separator} />
              <RadioButton.Group
                onValueChange={(value) => this.addEventForm("e_alert", value)}
                value={this.props.form.e_alert}
              >
                <TouchableOpacity
                  style={styles.listInline}
                  onPress={() => this.addEventForm("e_alert", "no-alert")}
                >
                  <View style={styles.listInlineIcon}>
                    <RadioButton.Android
                      uncheckedColor={colors.gray}
                      color={colors.primary}
                      value="no-alert"
                    />
                  </View>
                  <Text style={styles.text}>No alert</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity
                  style={styles.listInline}
                  onPress={() => this.addEventForm("e_alert", "on-time")}
                >
                  <View style={styles.listInlineIcon}>
                    <RadioButton.Android
                      uncheckedColor={colors.gray}
                      color={colors.primary}
                      value="on-time"
                    />
                  </View>
                  <Text style={styles.text}>At time of event</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity
                  style={styles.listInline}
                  onPress={() =>
                    this.addEventForm("e_alert", "30-minute-before")
                  }
                >
                  <View style={styles.listInlineIcon}>
                    <RadioButton.Android
                      uncheckedColor={colors.gray}
                      color={colors.primary}
                      value="30-minute-before"
                    />
                  </View>
                  <Text style={styles.text}>30 minutes before</Text>
                </TouchableOpacity>
                <View style={styles.separator} />
                <TouchableOpacity
                  style={styles.listInline}
                  onPress={() => this.addEventForm("e_alert", "24-hour-before")}
                >
                  <View style={styles.listInlineIcon}>
                    <RadioButton.Android
                      uncheckedColor={colors.gray}
                      color={colors.primary}
                      value="24-hour-before"
                    />
                  </View>
                  <Text style={styles.text}>1 Day before</Text>
                </TouchableOpacity>
              </RadioButton.Group>
            </View>
          </Modalize>
        </Portal>

        <Dialog
          dialogStyle={{ borderRadius: 24 }}
          width={0.7}
          visible={is_visible}
          dialogAnimation={new ScaleAnimation()}
          onDismiss={() => {
            if (this.props.message) {
              Alert.alert("", this.props.message, [{ text: "OK" }]);
            }
          }}
          dialogTitle={<DialogTitle title={"Posting..."} hasTitleBar={false} />}
        >
          <DialogContent>
            <ActivityIndicator size="large" color={colors.primary} />
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

const mapStateToProps = ({ Event, Group }) => {
  return {
    form: Event.form,
    isProcessing: Event.isProcessing,
    error: Event.error,
    message: Event.message,
    groupData: Group.data,
    selectedAddress: Event.selectedAddress,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/EventRedux");
  const { actions: groupActions } = require("@redux/GroupRedux");
  return {
    ...ownProps,
    ...stateProps,
    addEventForm: (data) => {
      dispatch(actions.addEventForm(data));
    },
    submitEvent: (data) => {
      actions.submitEvent(dispatch, data);
    },
    fetchGroups: (per_page, page) => {
      groupActions.fetchGroups(dispatch, per_page, page);
    },
    saveAddress: (data) => {
      dispatch(actions.saveAddress(data));
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(CreateCalenderEvent);
