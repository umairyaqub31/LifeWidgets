import * as React from "react";
import {
  Alert,
  Keyboard,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Linking,
} from "react-native";
import styles from "./styles";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { Checkbox } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as firebase from "firebase";
import PhoneInput from "react-native-phone-number-input";
import { LifeWidget, FirebaseConfig } from "@common";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { connect } from "react-redux";

const pad = (n) => {
  return n < 10 ? "0" + n : n;
};

class SignupPhone extends React.Component {
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
      calling_code:"1",
      cca2:"US",
      date_of_birth: new Date(),
      errorMessage: [],
      position: [],
      verify: false,
      validtionCode:null
    };
    this.recaptchaVerifier = React.createRef();
  }

  _onChangeText = (value, field) => {
    const state = this.state;
    state[field] = value;
    this.setState(state);
  };

  sendCodeRequest = async () => {
    const { phone_number, calling_code, checked } = this.state;
    if(!checked){
      Alert.alert("Terms & Condition ", "Please agree privacy policy", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }
    let that = this;
    if (phone_number) {
      this.setState({ loading: true });
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phoneProvider
        .verifyPhoneNumber(
          "+"+calling_code + phone_number,
          this.recaptchaVerifier.current
        )
        .then(function (code) {
          Alert.alert("Success", "code sent to your mobile number", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          that.setState({ verify: true, validtionCode: code, loading: false });
        })
        .catch(function (error) {
          Alert.alert("Error", error.message, [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
          that.setState({ verify: false, loading: false });
        });
    }
  };

  verifyPhoneNumberCode = () => {
    const { validtionCode, code, cca2, calling_code, phone_number } = this.state;
    let that = this;
    if(code){
      this.setState({loading:true});
    const credential = firebase.auth.PhoneAuthProvider.credential(
      validtionCode,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        that.setState({loading:false});
        let data = {
          cca2:cca2,
          calling_code:calling_code,
          phone_number:phone_number,
        };
        this.props.setPhoneObject(data);
        that.props.navigation.navigate("Signup");
      })
      .catch(function (error) {
        Alert.alert(
          "Error",
          error.message,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
        that.setState({ loading: false });
      });
    }
  };

  render() {
    const {verify} = this.state;
    return (
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" style={{flexGrow:1,borderWidth:1}}>
          <FirebaseRecaptchaVerifierModal
            ref={this.recaptchaVerifier}
            firebaseConfig={FirebaseConfig}
          />
          <View style={styles.container}>
            <View style={styles.widgetsText}>
              <Image
                  style={styles.logo}
                  source={require('../../../assets/images/logo.png')}
                />
            </View>
            <View style={[styles.widgetsForm]}>
            <Text style={styles.registrationtext}>Verify Phone</Text>
            <View style={styles.spacing} />
            {!verify?
            <>
              <View
                style={[
                  styles.textinputrounded,styles.boxShadow,
                  this.state.position[6]
                    ? { borderColor: "red", borderWidth: 1 }
                    : {},
                ]}
              >
                <PhoneInput
                  textContainerStyle={{
                    backgroundColor: colors.lightGray,
                  }}
                  defaultCode={"US"}
                  layout="first"
                  withDarkTheme={false}
                  onChangeText={(text) =>
                    this._onChangeText(text, "phone_number")
                  }
                  onChangeCountry={(text) => {
                    this._onChangeText(text.cca2, "cca2");
                    setTimeout(() => {
                      this._onChangeText(text.callingCode[0], "calling_code");
                    }, 1000);
                  }}
                />
              </View>
              <View style={styles.spacingXS} />
              <Text style={styles.textGray}>
                Required for text/sms validation.
              </Text>
              {this.state.errorMessage.phone_number &&
                this.state.errorMessage.phone_number.map((err, i) => (
                  <Text key={i} style={{ color: "#B22222" }}>
                    {err}
                  </Text>
                ))}
              <View style={styles.spacing} />
              <View style={styles.spacing} />
              <View style={styles.checkboxtext}>
                <Checkbox.Android
                  uncheckedColor={colors.primary}
                  color={colors.primary}
                  status={this.state.checked ? "checked" : "unchecked"}
                  onPress={() =>
                    this.setState({ checked: !this.state.checked })
                  }
                />
                <Text style={[styles.text, { textAlign: "left",flex:1 }]}>
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
              </View>
              <TouchableOpacity
                onPress={this.sendCodeRequest}
                disabled={this.state.loading}
                style={styles.filledbtn}
              >
                {this.state.loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.filledbtnText}>Send code</Text>
                )}
              </TouchableOpacity>
              </>
              :
              <>
              <View
                style={[
                  styles.textinputrounded,
                  this.state.position[6]
                    ? { borderColor: "red", borderWidth: 1 }
                    : {},
                ]}
              >
              <TextInput
              keyboardType="phone-pad"
              style={styles.textinputrounded}
              underlineColor={"transparent"}
              placeholder="Please enter 6 digit code to verify"
              onChangeText={(text)=>this._onChangeText(text, "code")}
            />
              </View>

            
              <TouchableOpacity
                onPress={this.verifyPhoneNumberCode}
                disabled={this.state.loading}
                style={styles.filledbtn}
              >
                {this.state.loading ? (
                  <ActivityIndicator />
                ) : (
                  <Text style={styles.filledbtnText}>Verify code</Text>
                )}
              </TouchableOpacity>
              </>
            }
            </View>
              <View style={{justifyContent:"flex-end"}}>
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
                    style={[styles.text, { fontFamily: FontFamily.Medium, color:colors.primary}]}
                  >
                    {" "}
                    Sign In
                  </Text>
                </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupPhone);
