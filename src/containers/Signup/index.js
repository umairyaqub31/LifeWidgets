import * as React from "react";
import {
  Platform,
  Keyboard,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Linking,
  Image
} from "react-native";
import styles from "./styles";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { TextInput, Checkbox, RadioButton } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import PhoneInput from "react-native-phone-number-input";
import { LifeWidget } from "@common";
import { connect } from "react-redux";

const pad = (n) => {
  return n < 10 ? "0" + n : n;
};

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      loading: false,
      user_name: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      c_password: "",
      gender: "",
      phone_number: "",
      date_of_birth: new Date(),
      errorMessage: [],
      position: [],
      dateShow: false,
    };
  }

  register = async () => {
    let position = [];
    const {
      user_name,
      first_name,
      last_name,
      email,
      password,
      c_password,
      gender,
      phone_number,
      date_of_birth,
      cca2,
      calling_code
    } = this.state;
    const {phoneObject} = this.props.User; 
    if (user_name === null || user_name === "") {
      //position[0] = true;
    }
    if (first_name === null || first_name === "") {
      position[1] = true;
    }
    if (last_name === null || last_name === "") {
      position[2] = true;
    }
    if (email === null || email === "") {
      position[3] = true;
    }
    if (password === null || password === "") {
      position[4] = true;
    }
    if (c_password === null || c_password === "") {
      position[5] = true;
    }
    if (phone_number === null || phone_number === "") {
      //position[6] = true;
    }
    if (date_of_birth.getFullYear() > new Date().getFullYear() - 13) {
      //position[10] = true;
    }
    this.setState({ position });
    if (position.length > 0) {
      return;
    }
    let data = {
      user_name: user_name,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      c_password: c_password,
      gender: gender,
      phone_number: phoneObject.phone_number,
      cca2:phoneObject.cca2,
      calling_code:phoneObject.calling_code,
      date_of_birth:
        date_of_birth.getFullYear() +
        "-" +
        pad(date_of_birth.getUTCMonth() + 1) +
        "-" +
        pad(date_of_birth.getUTCDate()),
    };
    this.setState({ loading: true });
    let json = await LifeWidget.register(data);
    if (json.status === 404) {
      this.setState({ errorMessage: json.data.data });
    } else {
      this.props.navigation.navigate("Signin");
    }
    console.log(json);
    this.setState({ loading: false });
    Keyboard.dismiss();
  };

  _onChangeText = (value, field, e) => {
    console.log(e);
    if (typeof e !== "undefined" && Platform.OS === "android") {
      if (e.type === "dismissed") {
        this.setState({ dateShow: false });
        return;
      }
    }
    const state = this.state;
    if (typeof e !== "undefined" && Platform.OS === "android") {
      state["dateShow"] = false;
    }
    state[field] = value;
    this.setState(state);
  };

  changePhoneNumber = () => {
    this.props.navigation.navigate("SignupPhone")
  }

  render() {
    const {phoneObject} = this.props.User;
    return (
      <SafeAreaView >
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{flexGrow:1,backgroundColor:colors.white,}}>
          <View style={styles.container}>
            <View style={styles.widgetsText}>
              <Image
                  style={styles.logo}
                  source={require('../../../assets/images/logo.png')}
                />
            </View>

            <View style={styles.widgetsForm}>
            <Text style={styles.registrationtext}>Registration</Text>
              {/* <TextInput
                style={[
                  styles.textinputrounded,
                  this.state.position[0]
                    ? { borderColor: "red", borderWidth: 1 }
                    : {},
                ]}
                underlineColor={"transparent"}
                label="Username"
                theme={{ colors: { primary: colors.primary } }}
                onChangeText={(text) => this._onChangeText(text, "user_name")}
              />
              {this.state.errorMessage.user_name &&
                this.state.errorMessage.user_name.map((err, i) => (
                  <Text style={{ color: "#B22222" }}>{err}</Text>
                ))} */}
              <TextInput
                style={[
                  styles.textinputrounded,styles.boxShadow,
                  this.state.position[1]
                    ? { borderColor: "red", borderWidth: 1 }
                    : {},
                ]}
                underlineColor={"transparent"}
                label="First Name"
                theme={{ colors: { primary: colors.primary } }}
                onChangeText={(text) => this._onChangeText(text, "first_name")}
              />
              {this.state.errorMessage.first_name &&
                this.state.errorMessage.first_name.map((err, i) => (
                  <Text key={i} style={{ color: "#B22222" }}>{err}</Text>
                ))}
              <TextInput
                style={[
                  styles.textinputrounded,styles.boxShadow,
                  this.state.position[2]
                    ? { borderColor: "red", borderWidth: 1 }
                    : {},
                ]}
                underlineColor={"transparent"}
                label="Last Name"
                theme={{ colors: { primary: colors.primary } }}
                onChangeText={(text) => this._onChangeText(text, "last_name")}
              />
              {this.state.errorMessage.last_name &&
                this.state.errorMessage.last_name.map((err, i) => (
                  <Text key={i} style={{ color: "#B22222" }}>{err}</Text>
                ))}
              <TextInput
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
                spellCheck={false}
                style={[
                  styles.textinputrounded,styles.boxShadow,
                  this.state.position[3]
                    ? { borderColor: "red", borderWidth: 1 }
                    : {},
                ]}
                underlineColor={"transparent"}
                label="E-mail"
                theme={{ colors: { primary: colors.primary } }}
                onChangeText={(text) => this._onChangeText(text, "email")}
              />
              {this.state.errorMessage.email &&
                this.state.errorMessage.email.map((err, i) => (
                  <Text key={i} style={{ color: "#B22222" }}>{err}</Text>
                ))}
              <TextInput
                secureTextEntry
                style={[
                  styles.textinputrounded,styles.boxShadow,
                  this.state.position[4]
                    ? { borderColor: "red", borderWidth: 1 }
                    : {},
                ]}
                underlineColor={"transparent"}
                label="Password"
                theme={{ colors: { primary: colors.primary } }}
                onChangeText={(text) => this._onChangeText(text, "password")}
              />
              <Text style={styles.textGray}>Minimum 8 characters</Text>
              {this.state.errorMessage.password &&
                this.state.errorMessage.password.map((err, i) => (
                  <Text key={i} style={{ color: "#B22222" }}>{err}</Text>
                ))}
              <TextInput
                secureTextEntry
                style={[
                  styles.textinputrounded,styles.boxShadow,
                  this.state.position[5]
                    ? { borderColor: "red", borderWidth: 1 }
                    : {},
                ]}
                underlineColor={"transparent"}
                label="Confirm Password"
                theme={{ colors: { primary: colors.primary } }}
                onChangeText={(text) => this._onChangeText(text, "c_password")}
              />
              {this.state.errorMessage.c_password &&
                this.state.errorMessage.c_password.map((err, i) => (
                  <Text key={i} style={{ color: "#B22222" }}>{err}</Text>
                ))}
              <View style={[
                  styles.textinputrounded,styles.boxShadow,
                  this.state.position[6]
                    ? { borderColor: "red", borderWidth: 1 }
                    : {},
                ]}>
              <PhoneInput
              textContainerStyle={{backgroundColor:colors.lightGray, borderColor:"#fff"}}
                defaultCode={phoneObject.cca2??"US"}
                layout="first"
                disabled={true}
                withDarkTheme={false}
                value={phoneObject.phone_number}
              />
              <TouchableOpacity style={{position:"absolute", right:10, top:17}} onPress={this.changePhoneNumber}>
                <Text style={{color:colors.primary,fontFamily:FontFamily.Regular,fontSize:12}}>Change</Text>
              </TouchableOpacity>
              </View>
              {/* <TextInput
                keyboardType="phone-pad"
                style={[
                  styles.textinputrounded,
                  this.state.position[6]
                    ? { borderColor: "red", borderWidth: 1 }
                    : {},
                ]}
                underlineColor={"transparent"}
                label="Mobile Number"
                theme={{ colors: { primary: colors.primary } }}
                onChangeText={(text) =>
                  this._onChangeText(text, "phone_number")
                }
              /> */}
              {/* <Text style={{ color: "#fff" }}>
                Required for text/sms validation.
              </Text> */}
              {this.state.errorMessage.phone_number &&
                this.state.errorMessage.phone_number.map((err, i) => (
                  <Text key={i} style={{ color: "#B22222" }}>{err}</Text>
                ))}
              {/* <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  marginTop: 10,
                }}
              >
                {Platform.OS === "ios" ? (
                  <View>
                    <Text style={{ color: colors.gray, margin: 10 }}>DOB</Text>

                    <RNDateTimePicker
                      textColor={colors.black}
                      style={{ flex: 1 }}
                      onChange={(e, d) =>
                        this._onChangeText(d, "date_of_birth")
                      }
                      value={this.state.date_of_birth}
                      display="spinner"
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                  >
                    <Text style={{ color: colors.gray, margin: 10 }}>DOB</Text>
                    {this.state.dateShow && (
                      <RNDateTimePicker
                        style={{ flex: 1 }}
                        onChange={(e, d) =>
                          this._onChangeText(d, "date_of_birth", e)
                        }
                        value={this.state.date_of_birth}
                        display="spinner"
                      />
                    )}
                    <TouchableOpacity
                      onPress={() =>
                        this.setState({ dateShow: !this.state.dateShow })
                      }
                    >
                      <Text
                        style={{
                          fontFamily: FontFamily.Regular,
                          color: colors.gray,
                        }}
                      >
                        {this.state.date_of_birth.toLocaleDateString()}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
                {this.state.position[10] && (
                  <Text style={{ color: "red", textAlign: "center" }}>
                    Please select valid DOB
                  </Text>
                )}
              </View> */}

              {/* <View style={{ borderRadius: 10, marginTop: 10 }}>
                <Text style={{ color: "#fff", margin: 10 }}>
                  Gender (Optional)
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "row" }}>
                    <RadioButton.Android
                      uncheckedColor={colors.white}
                      color={colors.white}
                      status={
                        this.state.gender === "male" ? "checked" : "unchecked"
                      }
                      onPress={() => this.setState({ gender: "male" })}
                    />
                    <Text style={{ color: "#fff", marginTop: 10 }}>Male</Text>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <RadioButton.Android
                      uncheckedColor={colors.white}
                      color={colors.white}
                      status={
                        this.state.gender === "female" ? "checked" : "unchecked"
                      }
                      onPress={() => this.setState({ gender: "female" })}
                    />
                    <Text style={{ color: "#fff", marginTop: 10 }}>Female</Text>
                  </View>
                </View>
                {this.state.errorMessage.gender &&
                  this.state.errorMessage.gender.map((err, i) => (
                    <Text style={{ color: "#B22222" }}>{err}</Text>
                  ))}
              </View> */}
              {/* <View style={styles.checkboxtext}>
                <Checkbox.Android
                  uncheckedColor={colors.white}
                  color={colors.white}
                  status={this.state.checked ? "checked" : "unchecked"}
                  onPress={() =>
                    this.setState({ checked: !this.state.checked })
                  }
                />
                <Text style={[styles.text, { textAlign: "left" }]}>
                  I agree to Life Widgets{" "}
                  <Text
                    style={styles.hyperlinkStyle}
                    onPress={() => {
                      Linking.openURL(
                        "https://www.lifewidgets.com/?page_id=469"
                      );
                    }}
                  >
                    Privacy Policies
                  </Text>
                  ,{" "}
                  <Text
                    style={styles.hyperlinkStyle}
                    onPress={() => {
                      Linking.openURL(
                        "https://www.lifewidgets.com/?page_id=481"
                      );
                    }}
                  >
                    Terms & Condition{" "}
                  </Text>{" "}
                  and{" "}
                  <Text
                    style={styles.hyperlinkStyle}
                    onPress={() => {
                      Linking.openURL(
                        "https://www.lifewidgets.com/?page_id=474"
                      );
                    }}
                  >
                    Content Policy / EULA
                  </Text>
                </Text>
              </View> */}
             
              <TouchableOpacity
                onPress={this.register}
                disabled={this.state.loading}
                style={styles.filledbtn}
              >
                {this.state.loading ? (
                  <ActivityIndicator color={colors.white}/>
                ) : (
                  <Text style={styles.filledbtnText}>Sign Up</Text>
                )}
              </TouchableOpacity>
              </View>
              <View>
              <View style={styles.horizontalDivider}>
                <View style={styles.divider}/>
                <Text style={styles.textGray}>Already have account?</Text>
                <View style={styles.divider}/>
              </View>
              <View style={styles.spacing} />
                <TouchableOpacity
                  style={styles.signUpBtn}
                  onPress={() => this.props.navigation.navigate("Signin")}
                >
                  <Text
                    style={[styles.primaryText, { fontFamily: FontFamily.Medium }]}
                  >
                    {" "}
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = ({ User }) => ({ User });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@redux/UserRedux");

  return {
    setPhoneObject: (data) => dispatch(actions.setPhoneObject(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);