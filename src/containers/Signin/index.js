import * as React from "react";
import {
  Alert,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Image
} from "react-native";
import styles from "./styles";
import { AntDesign,Ionicons } from "@expo/vector-icons";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { TextInput, Checkbox } from "react-native-paper";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LifeWidget, Config } from "@common";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import AuthService from "../../services/auth-service";
import ChatService from "../../services/chat-service";
import ConnectyCube from "react-native-connectycube";
import appConfig from "../../../connectycube-config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      username: null,
      password: null,
      loading: false,
      position: [],
      token: null,
    };
  }

  componentDidMount() {
    this.registerForPushNotificationsAsync();
  }

  login = async () => {
    let flag = false,
      position = [];
    const { username, password, token } = this.state;
    if (username === null || username === "") {
      position[0] = true;
    }
    if (password.length < 8) {
      Alert.alert(
        "Invalid password",
        "Password must be greater or equal to 8 character long.Click on forgot password to change password",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
    if (password === null || password === "" || password.length < 8) {
      position[1] = true;
    }
    if (position.length > 0) {
      this.setState({ position });
      return;
    }

    let data = {
      email: username.trim(),
      password: password.trim(),
      token: token,
      cube_token: token,
    };
    let connectyCubeData = {
      email: username.trim(),
      password: password.trim(),
    };
    console.log("..................Login.....................");
    console.log(data);
    console.log("apiurllogin", Config.lifeWidget.endpoint);
    //let data = { email: username, password: password, token:token, device:Platform.OS };
    this.setState({ loading: true });
    let json = await LifeWidget.login(data);
    console.log(json);
    if (json.status === 200) {
      if (json.data.status_code === 200) {
        LifeWidget.init({
          url: Config.lifeWidget.endpoint,
        });
        LifeWidget.setClientToken(json.data.access_token);
        await AsyncStorage.setItem("usertoken", json.data.access_token);

        await AsyncStorage.setItem(
          "userdata",
          JSON.stringify(connectyCubeData)
        );
        if (json.data.user.phone_verified == 0) {
          this.props.phoneValidate(json.data.user, json.data.access_token);
          this.props.navigation.navigate("PhoneValidate");
        } else {
          console.log(json.data.user);
          this.props.login(json.data.user, json.data.access_token);
        }
        this.setState({ loading: false });
      } else {
        this.setState({ loading: false });
        flag = true;
      }
    } else {
      flag = true;
      this.setState({ loading: false });
    }

    if (flag) {
      Alert.alert(
        "Invalid Credential!",
        "Email or password are incorrect.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }

    this.setState({ loading: false });

    this.connectyCubeConnection(connectyCubeData);
  };

  //Creating Connectycube Session
  connectyCubeConnection = (parse) => {
    ConnectyCube.init(...appConfig.connectyCubeConfig);
    AuthService.signIn(parse)
      .then(() => {
        ChatService.setUpListeners();
      })
      .catch((error) => {
        console.log("connectycube login", JSON.stringify(error));
      });
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

  validate = (text) => {
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");
      this.setState({ email: text });
      return false;
    } else {
      this.setState({ email: text });
      console.log("Email is Correct");
    }
  };

  registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      this.setState({ token });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  navigateToSignup = () => {
    const { phoneObject } = this.props.User;
    if (
      typeof phoneObject.phone_number === "undefined" ||
      phoneObject.phone_number === null ||
      phoneObject.phone_number === ""
    ) {
      this.props.navigation.navigate("SignupPhone");
    } else {
      this.props.navigation.navigate("Signup");
    }
  };

  render() {
    const { setChecked } = this.state;

    return (
      <KeyboardAwareScrollView
        style={{ flex: 1, backgroundColor: colors.white }}
        {...this.keyboardProps}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.widgetsText}>
                <Image
                  style={styles.logo}
                  source={require('../../../assets/images/logo.png')}
                />
          </View>
          <View style={styles.widgetsForm}>
          <Text style={[styles.textCurrentMembers, { fontFamily: FontFamily.Medium }]}>
            Current Members
          </Text>
            <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoCompleteType="email"
               textContentType="emailAddress"
               keyboardType="email-address"
               spellCheck={false}
              style={[
                styles.textinputrounded,
                this.state.position[0]
                  ? { borderColor: "red", borderWidth: 1 }
                  : {},
              ]}
              underlineColor={"transparent"}
              label="Email address"
              theme={{ colors: { primary: colors.primary } }}
              onChangeText={(text) => this.setState({ username: text })}
            />
            <TextInput
              secureTextEntry
              style={[
                styles.textinputrounded,
                this.state.position[1]
                  ? { borderColor: "red", borderWidth: 1 }
                  : {},
              ]}
              underlineColor={"transparent"}
              label="Password"
              theme={{ colors: { primary: colors.primary } }}
              onChangeText={(text) => this.setState({ password: text })}
            />
            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View style={styles.checkboxtext}>
                <Checkbox.Android
                  uncheckedColor={colors.white}
                  color={colors.white}
                  status={this.state.checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!this.state.checked);
                  }}
                />
                <Text style={styles.text}>Remember Me</Text>
              </View>

            </View> */}
            <TouchableOpacity
              disabled={this.state.loading}
              style={styles.filledbtn}
              onPress={this.login}
            >
              {this.state.loading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <>
                  <Text style={styles.filledbtnText}>Sign In</Text>
                  <AntDesign
                    name="arrowright"
                    size={20}
                    color={colors.white}
                  />
                </>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ margin: 10 }}
              onPress={() => this.props.navigation.navigate("Forgotpswd")}
            >
              <Text style={styles.text}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={{alignItems:'center'}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Auth")}
                style={styles.listInline}
              >
                <AntDesign
                    name="arrowleft"
                    size={16}
                    color={colors.primary}
                  />
                <Text style={styles.text}>Back</Text>
              </TouchableOpacity>
            </View>
            </View>
            <View
              style={{
                flexDirection: "column",
              }}
            >
            <View style={styles.horizontalDivider}>
              <View style={styles.divider}/>
              <Text style={styles.textGray}>or</Text>
              <View style={styles.divider}/>
            </View>
            <View style={styles.spacing} />
              <TouchableOpacity
                style={styles.signUpBtn}
                onPress={this.navigateToSignup}
              >
                <Text style={[styles.text, { fontFamily: FontFamily.Medium }]}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
              <View style={styles.spacing} />
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
    phoneValidate: (user, token) =>
      dispatch(actions.phoneValidate(user, token)),
    logout: () => dispatch(actions.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
