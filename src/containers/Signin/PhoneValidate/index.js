import * as React from "react";
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Image
} from "react-native";
import {
  FirebaseRecaptcha,
  FirebaseRecaptchaBanner,
  FirebaseRecaptchaVerifier,
  FirebaseRecaptchaVerifierModal,
  FirebaseAuthApplicationVerifier,
} from "expo-firebase-recaptcha";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import PhoneInput from "react-native-phone-number-input";
import { AntDesign } from "@expo/vector-icons";
import * as firebase from "firebase";
import { FirebaseConfig } from "@common";
import { LifeWidget, Config } from "@common";
import colors from "../../../config/color/color";
import { connect } from "react-redux";
import styles from "../styles";

class PhoneValidate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      verify: false,
      validtionCode: null,
      recaptchaToken: "",
      phone_number: "",
      code: "",
    };
    this.recaptchaVerifier = React.createRef();
  }
  sendVerification = async () => {
    this.setState({ loading: true });
    let { phone_number, calling_code } = this.props.User.phoneValidateUser;
    phone_number = "+" + calling_code + phone_number;

    let that = this;
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phone_number, this.recaptchaVerifier.current)
      .then(function (code) {
        console.log("headsfasdfasdfasfadsfadsf.... " + code);
        that.setState({ verify: true, validtionCode: code, loading: false });
      })
      .catch(function (error) {
        alert(error);
        console.log("eerasdfasdfasdf....." + error);
        that.setState({ verify: false, loading: false });
      });

    //this.props.login(this.props.User.phoneValidateUser, this.props.User.token);
  };

  verifyPhoneNumberCode = () => {
    const { validtionCode, code } = this.state;
    let that = this;
    const credential = firebase.auth.PhoneAuthProvider.credential(
      validtionCode,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then((result) => {
        LifeWidget.userProfileUpdate({ phone_verified: 1 });
        this.props.login(
          this.props.User.phoneValidateUser,
          this.props.User.token
        );
      })
      .catch(function (error) {
        alert("Error! invalid code please try again.");
        console.log("eerasdfasdfasdf....." + error);
        that.setState({ loading: false });
      });
  };
  onChangePhoneNumber = (phone_number) => {
    this.setState({ phone_number });
  };
  keyboardProps = Platform.select({
    android: {
      enabled: true,
      keyboardVerticalOffset: 0,
      behavior: "padding",
    },
    ios: {
      enabled: true,
      keyboardVerticalOffset: 0,
      behavior: "padding",
    },
  });
  render() {
    const { phone_number, cca2 } = this.props.User.phoneValidateUser;
    const { loading, verify, code } = this.state;
    const attemptInvisibleVerification = false;
    console.log(".......................");
    //console.log(this.props.User.phoneValidateUser.phone_number);
    console.log(".......................");
    return (
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        {...this.keyboardProps}
      >
        <View style={styles.container}>
          <View style={styles.widgetsText}>
              <Image
                  style={styles.logo}
                  source={require('../../../../assets/images/logo.png')}
                />
          </View>
          <View style={styles.widgetsForm}>
            <Text style={styles.welcometext}>Verify Phone</Text>
            <FirebaseRecaptchaVerifierModal
              ref={this.recaptchaVerifier}
              firebaseConfig={FirebaseConfig}
              
            />
            {!verify ? (
              <>
                <View style={[styles.textinputrounded,styles.boxShadow]}>
                    <PhoneInput
                      defaultValue={phone_number}
                      defaultCode={cca2 ?? "US"}
                      layout="first"
                      disabled
                      withDarkTheme={false}
                      onChangeFormattedText={(text) =>
                        this.onChangePhoneNumber(text)
                      }
                    />
                </View>
                <TouchableOpacity
                  disabled={this.state.loading}
                  style={styles.filledbtn}
                  onPress={this.sendVerification}
                >
                  {loading ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <Text style={styles.filledbtnText}>Validate Number</Text>
                  )}
                  <AntDesign
                    name="arrowright"
                    size={20}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.textGray}>Enter Verification Code</Text>

                <TextInput
                  keyboardType="phone-pad"
                  value={code}
                  style={styles.textinputrounded}
                  underlineColor={"transparent"}
                  label="Please enter 6 digit code to verify"
                  onChangeText={(text) => this.setState({ code: text })}
                  theme={{ colors: { primary: colors.primary } }}
                />
                <TouchableOpacity
                  style={styles.filledbtn}
                  onPress={this.verifyPhoneNumberCode}
                >
                  {loading ? (
                    <ActivityIndicator color={colors.white} />
                  ) : (
                    <Text style={styles.filledbtnText}>Verify</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
            <FirebaseRecaptchaBanner style={{ color: "white" }} />
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
    login: (user, token) => dispatch(actions.login(user, token)),
    logout: () => dispatch(actions.logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PhoneValidate);