import * as React from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import styles from "./styles";
import { TextInput } from "react-native-paper";
import colors from "../../../config/color/color";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Feather, Entypo, AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import Dialog, { DialogContent } from "react-native-popup-dialog";

const Services = [
  "Invite Customer",
  "Invite Family Relatives",
  "Invite Business Associate",
  "Invite Co-Workers",
  "Invite Friends",
  "Allow Friends to invite others",
];

class CreateEvent extends React.Component {
  constructor() {
    super();
    this.state = {
      keywordsList: [],
      show: false,
      date: new Date("2020-06-12T14:42"),
      mode: "time",
      value: "first",
    };
  }

  serviceChipHandle = (keyword) => {
    const { keywordsList } = this.state;
    let list = keywordsList;
    let index = -1;
    if ((index = keywordsList.indexOf(keyword)) != -1) {
      list.splice(index, 1);
    } else {
      list.push(keyword);
    }
    this.setState({ keywordsList: list });
  };

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === "ios" ? true : false,
      date,
    });
  };

  show = (mode) => {
    this.setState({
      show: true,
      mode,
    });
  };

  timepicker = () => {
    this.show("date");
  };

  openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  };

  render() {
    const { date, mode } = this.state;
    const { keywordsList } = this.state;
    const {
      activecustomchip,
      customchip,
      customchiptext,
      activecustomchiptext,
    } = styles;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrolledView}>
          <TextInput
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[styles.textinputrounded, styles.boxShadow]}
            label="Event Name"
          />
          <TouchableOpacity
            onPress={this.timepicker}
            style={[styles.customTextInput, styles.boxShadow]}
          >
            <Text style={styles.customTextInputText}>
              Start Date & Time {this.state.date.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.timepicker}
            style={[styles.customTextInput, styles.boxShadow]}
          >
            <Text style={styles.customTextInputText}>End Date & Time</Text>
          </TouchableOpacity>
          <TextInput
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[styles.textinputrounded, styles.boxShadow]}
            label="Event Cost"
          />
          <TextInput
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[styles.textinputrounded, styles.boxShadow]}
            label="Location"
          />
          <TextInput
            multiline={true}
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[styles.boxShadow, styles.textarea]}
            label="Description"
          />
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <Text style={[styles.text, styles.textBold]}>
            Select Invite List:
          </Text>
          <View style={styles.separator} />
          <View style={styles.barSearchChips}>
            {Services.map((item) => (
              <TouchableOpacity
                style={
                  keywordsList.find((element) => element == item)
                    ? activecustomchip
                    : customchip
                }
                onPress={() => this.serviceChipHandle(item)}
              >
                <Text
                  style={
                    keywordsList.find((element) => element == item)
                      ? activecustomchiptext
                      : customchiptext
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <Text style={styles.textBold}>Upload Images:</Text>
          <View style={styles.separator} />
          <TouchableOpacity
            style={[styles.boxShadow, styles.uploadImagesContainer]}
            onPress={this.openImagePickerAsync}
          >
            <Feather name="upload" size={54} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <View style={styles.list}>
            <Text style={styles.textBold}>Invited Friends:</Text>
            <TouchableOpacity style={styles.list}>
              <AntDesign name="plus" size={18} color={colors.primary} />
              <Text style={styles.primaryText}>Invite Friends</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <View style={styles.spacing} />
          <TouchableOpacity style={styles.profileImageContainer}>
            <View style={styles.userNameContainer}>
              <Avatar.Image
                style={styles.avatar}
                size={52}
                source={require('../../../../assets/images/block.jpg')}
              />
              <Text style={styles.userName}>User Name</Text>
            </View>
            <TouchableOpacity style={styles.dotsOpacity}>
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={colors.black}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.profileImageContainer}>
            <View style={styles.userNameContainer}>
              <Avatar.Image
                style={styles.avatar}
                size={52}
                source={require('../../../../assets/images/block.jpg')}
              />
              <Text style={styles.userName}>User Name</Text>
            </View>
            <TouchableOpacity style={styles.dotsOpacity}>
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={colors.black}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.profileImageContainer}>
            <View style={styles.userNameContainer}>
              <Avatar.Image
                style={styles.avatar}
                size={52}
                source={require('../../../../assets/images/block.jpg')}
              />
              <Text style={styles.userName}>User Name</Text>
            </View>
            <TouchableOpacity style={styles.dotsOpacity}>
              <Entypo
                name="dots-three-horizontal"
                size={20}
                color={colors.black}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <View style={styles.spacing} />
        </ScrollView>
        {Platform.OS === "ios" ? (
          <Dialog
            visible={this.state.show}
            width={0.8}
            onTouchOutside={() => {
              this.setState({ show: false });
            }}
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
                value={date}
                mode={mode}
                is24Hour={true}
                display="spinner"
                onChange={this.setDate}
              />
            </DialogContent>
          </Dialog>
        ) : this.state.show ? (
          <RNDateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={this.setDate}
          />
        ) : null}
      </View>
    );
  }
}
export default CreateEvent;
