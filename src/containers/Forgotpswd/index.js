import * as React from "react";
import { Alert, Text, TouchableOpacity, View, ActivityIndicator ,Image} from "react-native";
import styles from "./styles";
import colors from "../../config/color/color";
import { TextInput } from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";
import * as firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LifeWidget, FirebaseConfig } from "@common";
import { AntDesign } from '@expo/vector-icons';
import {
  FirebaseRecaptcha,
  FirebaseRecaptchaBanner,
  FirebaseRecaptchaVerifier,
  FirebaseRecaptchaVerifierModal,
  FirebaseAuthApplicationVerifier,
} from "expo-firebase-recaptcha";

class Forgotpswd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email:"",
      loading:false,
      verify:false,
      code:"",
      validtionCode:""
    };
    this.recaptchaVerifier = React.createRef();
  }

  forgetPasswordRequest = async () => {
    const { email } = this.state;
    let data = {};
    if(email){
      this.setState({loading:true});
      data['email'] = email;
      const json = await LifeWidget.forgetPasswordRequest(data);
      this.setState({loading:false});
      if(!json.status){
        Alert.alert(
          "Error",
          json.message,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      } else {
        this.setState({verify:true})
        Alert.alert(
          "Success",
          json.message,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
    }
  }

  forgetPasswordRequestBySms = async () => {
    const { email } = this.state;
    let that = this;
    if(email){
      this.setState({loading:true});
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(email, this.recaptchaVerifier.current)
      .then(function (code) {
        Alert.alert(
          "Success",
          "code sent to your mobile number",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
        that.setState({ verify: true, validtionCode: code, loading: false });
      })
      .catch(function (error) {
        Alert.alert(
          "Error",
          error.message,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
        that.setState({ verify: false, loading: false });
      });
    }
  };

  verifyPasswordRequest = async () => {
    const { email, code } = this.state;
    let data = {};
    if(code){
      this.setState({loading:true});
      data['email'] = email;
      data['code'] = code;
      const json = await LifeWidget.verifyPasswordRequest(data);
      this.setState({loading:false});
      if(!json.status){
        Alert.alert(
          "Error",
          json.message,
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      } else {
        this.props.navigation.navigate("ChangePassword", {email:email});
      }
    }
  }

  verifyPhoneNumberCode = () => {
    const { validtionCode, code, email } = this.state;
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
        that.props.navigation.navigate("ChangePassword", {email:email});
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
    const {email, loading, verify, code} = this.state;
    return (
      <KeyboardAwareScrollView contentContainerStyle={{backgroundColor:colors.white,flex:1}}>
        <View style={styles.container}>
          <View style={styles.widgetsText}>
                <Image
                  style={styles.logo}
                  source={require('../../../assets/images/logo.png')}
                />
          </View>
          <FirebaseRecaptchaVerifierModal
              ref={this.recaptchaVerifier}
              firebaseConfig={FirebaseConfig}
            />
          <View style={styles.widgetsForm}>
            <Text style={styles.forgotpswdtext}>Forgot Password</Text>
            <View style={styles.spacing} />
          {!verify?
          <>
            {/* <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              style={styles.textinputrounded}
              underlineColor={"transparent"}
              label="Email Address"
              onChangeText={(text)=>this.setState({email:text})}
              theme={{ colors: { primary: colors.primary } }}
            /> */}
            <View style={[styles.textinputrounded,styles.boxShadow,]}>
              <PhoneInput
                style={{ flex: 1 }}
                defaultCode={"US"}
                layout="first"
                withDarkTheme={false}
                onChangeFormattedText={(text)=>this.setState({email:text})}
              />
            </View>
            <TouchableOpacity
              style={styles.filledbtn}
              onPress={this.forgetPasswordRequestBySms}
            >
            {loading?
            <ActivityIndicator color={colors.white} />
            :
              <Text style={styles.filledbtnText}>Reset password</Text>
            }
            </TouchableOpacity>
            <View style={{alignItems:'center'}}>
              <TouchableOpacity
                style={styles.listInline}
                onPress={() => this.props.navigation.navigate("Signin")}
              >
                <AntDesign name="arrowleft" size={20} color={colors.primary} />
                <Text style={[styles.filledbtnText,{color:colors.primary}]}>Back</Text>
              </TouchableOpacity>
            </View>
            </>
            :
            <>
            <TextInput
              keyboardType="phone-pad"
              value={code}
              style={styles.textinputrounded}
              underlineColor={"transparent"}
              label="Please enter 6 digit code to verify"
              onChangeText={(text)=>this.setState({code:text})}
              theme={{ colors: { primary: colors.primary } }}
            />
            <TouchableOpacity
              style={styles.filledbtn}
              onPress={this.verifyPhoneNumberCode}
            >
            {loading?
            <ActivityIndicator color={colors.white} />
            :
              <Text style={styles.filledbtnText}>Verify</Text>
            }
            </TouchableOpacity>
            <View style={{alignItems:'center'}}>
              <TouchableOpacity
                style={styles.listInline}
                onPress={() => this.setState({verify:false})}
              >
                <AntDesign name="arrowleft" size={20} color={colors.primary} />
                <Text style={[styles.filledbtnText,{color:colors.primary}]}>Back</Text>
              </TouchableOpacity>
            </View>
            </>
          }
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Forgotpswd;
