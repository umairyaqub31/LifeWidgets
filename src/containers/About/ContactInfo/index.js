import * as React from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import styles from "./styles";
import { Divider } from "react-native-paper";
import { Fontisto } from "@expo/vector-icons";
import colors from "../../../config/color/color";
import { GeneralPrivacyStatus } from "@components";
import CountryPicker from "react-native-country-picker-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneInput from "react-native-phone-number-input";
import { connect } from "react-redux";
import { PrivacyStatusIcon } from "@helpers";

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: "2016-05-15" };
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

  render() {
    const data = this.props.data;
    return (
      <KeyboardAwareScrollView behavior="padding" style={styles.container}>
        <ScrollView style={styles.scrolledview}>
          <View style={styles.ListPanel}>
            <View style={styles.ListPanelHeader}>
              <Text style={styles.heading}>CURRENT PHONE NUMBERS</Text>
              <TouchableOpacity
                style={[styles.chipOpacity, styles.boxShadow]}
                onPress={() =>
                  this.privacyactionSheetRef.current.modalizeOpen(
                    "phone_number_privacy",
                    data.phone_number_privacy
                  )
                }
              >
                {PrivacyStatusIcon(data.phone_number_privacy)}
              </TouchableOpacity>
            </View>
            <View style={styles.ListPanelBody}>
              <TouchableOpacity style={[styles.listContainer, styles.noBorder]}>
                <View style={styles.listtitleContainer}>
                  <PhoneInput
                    containerStyle={[
                      styles.roundedtextinput,
                      styles.boxShadow,
                      styles.noMargin,
                    ]}
                    value={data.phone_number}
                    disabled={true}
                    defaultCode={data.cca2 ?? "US"}
                    layout="first"
                    withDarkTheme={false}
                    // onChangeText={(text) =>
                    //   this.setProfileData("phone_number", text)
                    // }
                    // onChangeCountry={(text) => {
                    //   this.setProfileData("cca2", text.cca2);
                    //   setTimeout(() => {
                    //     this.setProfileData(
                    //       "calling_code",
                    //       text.callingCode[0]
                    //     );
                    //   }, 2000);
                    // }}
                  />

                  {/* <TextInput
                    style={[
                      styles.roundedtextinput,
                      styles.boxShadow,
                      styles.noMargin,
                    ]}
                    underlineColor={colors.lightGray}
                    theme={{ colors: { primary: colors.primary } }}
                    value={data.phone_number}
                    keyboardType="number-pad"
                    label="Phone number"
                    placeholderTextColor={colors.gray}
                    onChangeText={(text) =>
                      this.setProfileData("phone_number", text)
                    }
                  /> */}
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.ListPanel}>
            <View style={styles.ListPanelHeader}>
              <Text style={styles.heading}>ADDRESS</Text>
              <TouchableOpacity
                style={[styles.chipOpacity, styles.boxShadow]}
                onPress={() =>
                  this.privacyactionSheetRef.current.modalizeOpen(
                    "address_privacy",
                    data.address_privacy
                  )
                }
              >
                {PrivacyStatusIcon(data.address_privacy)}
              </TouchableOpacity>
            </View>
            <View style={styles.ListPanelBody}>
              <CountryPicker
                onSelect={(value) => {
                  this.setProfileData("country_code", value.cca2);
                }}
                cca2={data.country_code != "null" ? data.country_code : ""}
                countryCode={
                  data.country_code != "null" ? data.country_code : ""
                }
                withCountryNameButton
                withAlphaFilter
                containerButtonStyle={[
                  styles.roundedtextinput,
                  styles.boxShadow,
                  { justifyContent: "center", paddingLeft: 10 },
                ]}
              />
              <TextInput
                style={[styles.roundedtextinput, styles.boxShadow]}
                underlineColor={colors.lightGray}
                theme={{ colors: { primary: colors.primary } }}
                label="Street"
                placeholderTextColor={colors.gray}
                value={data.street}
                onChangeText={(text) => this.setProfileData("street", text)}
              />
              <TextInput
                style={[styles.roundedtextinput, styles.boxShadow]}
                underlineColor={colors.lightGray}
                theme={{ colors: { primary: colors.primary } }}
                label="City"
                placeholderTextColor={colors.gray}
                value={data.city}
                onChangeText={(text) => this.setProfileData("city", text)}
              />
              <TextInput
                style={[styles.roundedtextinput, styles.boxShadow]}
                underlineColor={colors.lightGray}
                theme={{ colors: { primary: colors.primary } }}
                label="Zip Code"
                placeholderTextColor={colors.gray}
                value={data.zip_code}
                onChangeText={(text) => this.setProfileData("zip_code", text)}
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
export default connect(mapStateToProps, undefined, mergeProps)(ContactInfo);