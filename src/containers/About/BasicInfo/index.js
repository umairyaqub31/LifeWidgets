import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { TextInput } from "react-native-paper";
import { Divider, RadioButton } from "react-native-paper";
import { Fontisto } from "@expo/vector-icons";
import colors from "../../../config/color/color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { GeneralPrivacyStatus } from "@components";
import { connect } from "react-redux";
import { PrivacyStatusIcon } from "@helpers";

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: "2016-05-15", visible: false };
    this.privacyactionSheetRef = React.createRef();
    this.delayTyping;
  }

  setProfileData = (key, value) => {
    let form = {};
    form[key] = value;
    this.props.userProfileUpdate(form);
    clearTimeout(this.delayTyping);
    this.delayTyping = setTimeout(() => {
      this.props.sendRequestToServer(form);
    }, 2000);
  };

  onChangeText = (text) => {
    this.setProfileData("languages", text);
  };

  onConfirm = (date) => {
    this.setProfileData("date_of_birth", date.toISOString());
    this.setState({ visible: false });
  };

  render() {
    const data = this.props.data;
    return (
      <KeyboardAwareScrollView behavior="padding" style={styles.container}>
          <ScrollView style={styles.scrolledview}>
            <View style={styles.ListPanel}>
              <View style={styles.ListPanelHeader}>
                <Text style={styles.heading}>Personal info</Text>
              </View>
              <View style={[styles.ListPanelBody,{marginBottom:10}]}>
                <View>
                  <TextInput
                    style={[styles.roundedtextinput, styles.boxShadow]}
                    underlineColor={colors.lightGray}
                    theme={{ colors: { primary: colors.primary } }}
                    label="First name"
                    value={data.first_name}
                    placeholderTextColor={colors.gray}
                    onChangeText={(text) =>
                      this.setProfileData("first_name", text)
                    }
                  />
                </View>
                <View>
                  <TextInput
                    style={[styles.roundedtextinput, styles.boxShadow]}
                    underlineColor={colors.lightGray}
                    theme={{ colors: { primary: colors.primary } }}
                    label="Last name"
                    value={data.last_name}
                    placeholderTextColor={colors.gray}
                    onChangeText={(text) =>
                      this.setProfileData("last_name", text)
                    }
                  />
                </View>
                <View>
                  <TextInput
                    editable={false}
                    style={[
                      styles.roundedtextinput,
                      styles.boxShadow,,
                    ]}
                    underlineColor={colors.lightGray}
                    theme={{ colors: { primary: colors.primary } }}
                    label="Last name"
                    value={data.email}
                    placeholderTextColor={colors.gray}
                  />
                </View>
              </View>
            </View>
            <View style={styles.ListPanel}>
              <View style={styles.ListPanelHeader}>
                <Text style={styles.heading}>Friends</Text>
                <TouchableOpacity
                  style={[styles.chipOpacity, styles.boxShadow]}
                  onPress={() =>
                    this.privacyactionSheetRef.current.modalizeOpen(
                      "friends_privacy",
                      data.friends_privacy
                    )
                  }
                >
                  {PrivacyStatusIcon(data.friends_privacy)}
                </TouchableOpacity>
                
              </View>
              <Text style={[styles.text, {margin:10, textAlign:"center"}]}>My friends visibility to others people</Text>
            </View>
            <Divider style={styles.separator} />
            <View style={styles.ListPanel}>
              <View style={styles.ListPanelHeader}>
                <Text style={styles.heading}>GENDER</Text>
                <TouchableOpacity
                  style={[styles.chipOpacity, styles.boxShadow]}
                  onPress={() =>
                    this.privacyactionSheetRef.current.modalizeOpen(
                      "gender_privacy",
                      data.gender_privacy
                    )
                  }
                >
                  {PrivacyStatusIcon(data.gender_privacy)}
                </TouchableOpacity>
              </View>
              <View style={styles.ListPanelBody}>
                <TouchableOpacity
                  style={[styles.listContainer, { borderWidth: 0 }]}
                  onPress={() => this.setProfileData("gender", "female")}
                >
                  <View style={[styles.listtitleContainer]}>
                    <Text style={styles.text}>Female</Text>
                  </View>
                  <RadioButton
                    color={colors.primary}
                    status={data.gender === "female" ? "checked" : "unchecked"}
                    onPress={() => this.setProfileData("gender", "female")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.listContainer}
                  onPress={() => this.setProfileData("gender", "male")}
                >
                  <View style={styles.listtitleContainer}>
                    <Text style={styles.text}>Male</Text>
                  </View>
                  <RadioButton
                    color={colors.primary}
                    status={data.gender === "male" ? "checked" : "unchecked"}
                    onPress={() => this.setProfileData("gender", "male")}
                  />
                </TouchableOpacity>
                
              </View>
            </View>
            <View style={styles.ListPanel}>
              <View style={styles.ListPanelHeader}>
                <Text style={styles.heading}>BIRTHDAY</Text>
                <TouchableOpacity
                  style={[styles.chipOpacity, styles.boxShadow]}
                  onPress={() =>
                    this.privacyactionSheetRef.current.modalizeOpen(
                      "date_of_birth_privacy",
                      data.date_of_birth_privacy
                    )
                  }
                >
                  {PrivacyStatusIcon(data.date_of_birth_privacy)}
                </TouchableOpacity>
              </View>
              <View style={styles.ListPanelBody}>
                <TouchableOpacity style={styles.birthdayList}>
                  <Text style={styles.titleBold}>Select Birthday:</Text>
                  <TouchableOpacity
                    onPress={() => this.setState({ visible: true })}
                    style={[
                      styles.DatePicker,
                      styles.boxShadow,
                      { padding: 10 },
                    ]}
                  >
                    <Text>
                      {new Date(data.date_of_birth).toLocaleDateString()}
                    </Text>
                  </TouchableOpacity>

                  <DateTimePickerModal
                    isVisible={this.state.visible}
                    mode="date"
                    date={new Date(data.date_of_birth)}
                    onConfirm={this.onConfirm}
                    onCancel={() => this.setState({ visible: false })}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.ListPanel}>
              <View style={styles.ListPanelHeader}>
                <Text style={styles.heading}>LANGUAGES</Text>
                <TouchableOpacity
                  style={[styles.chipOpacity, styles.boxShadow]}
                  onPress={() =>
                    this.privacyactionSheetRef.current.modalizeOpen(
                      "languages_privacy",
                      data.languages_privacy
                    )
                  }
                >
                  {PrivacyStatusIcon(data.languages_privacy)}
                </TouchableOpacity>
              </View>
              <View style={styles.ListPanelBody}>
                <TextInput
                  style={[styles.roundedtextinput, styles.boxShadow]}
                  underlineColor={colors.lightGray}
                    theme={{ colors: { primary: colors.primary } }}
                  placeholder="add languages"
                  value={data.languages}
                  placeholderTextColor={colors.gray}
                  onChangeText={this.onChangeText}
                />
              </View>
            </View>

            
            <Divider style={styles.separator} />
          </ScrollView>
          <GeneralPrivacyStatus
            ref={this.privacyactionSheetRef}
            {...data}
            setProfileData={this.setProfileData}
          />
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ Profile }) => {
  return {
    data: Profile.data,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/ProfileRedux");
  return {
    ...ownProps,
    ...stateProps,
    userProfileUpdate: (data) => {
      actions.userProfileUpdate(dispatch, data);
    },
    sendRequestToServer: (data) => {
      actions.sendRequestToServer(dispatch, data);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(BasicInfo);
