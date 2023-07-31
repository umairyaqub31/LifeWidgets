import * as React from "react";
import { Alert, Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import styles from "./styles";
import colors from "../../config/color/color";
import { TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LifeWidget } from "@common";

class ChangePassword extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      password:"",
      confirm_password:"",
      loading:false,
    };
  }

  changePasswordRequest = async () => {
    const { password, confirm_password } = this.state;
    let data = {};
    if(password){
      if(password.length<8){
        Alert.alert(
          "Error",
          "Password length must be greater or equal to 8",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
        return;
      }
      if(confirm_password !== password){
        Alert.alert(
          "Error",
          "Password and confirm password must be same",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
        return;
      }
      this.setState({loading:true});
      data['email'] = this.props.route.params.email;
      data['password'] = password;
      data['c_password'] = confirm_password;

      const json = await LifeWidget.changePasswordRequest(data);
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
        Alert.alert(
          "Success",
          json.message,
          [
            { text: "OK", onPress: () => this.props.navigation.navigate("Signin")}
          ]
        );
      }
    }
  }


  

  render() {
    const {password, loading, confirm_password} = this.state;
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View style={styles.widgetsText}>
            <Text style={styles.forgotpswdtext}>Change Password</Text>
          </View>
          <View style={styles.widgetsForm}>
            <TextInput
              secureTextEntry
              autoCapitalize="none"
              style={styles.textinputrounded}
              underlineColor={"transparent"}
              label="New Password"
              onChangeText={(text)=>this.setState({password:text})}
              theme={{ colors: { primary: colors.primary } }}
            />
            <TextInput
              secureTextEntry
              autoCapitalize="none"
              style={styles.textinputrounded}
              underlineColor={"transparent"}
              label="Confirm Password"
              onChangeText={(text)=>this.setState({confirm_password:text})}
              theme={{ colors: { primary: colors.primary } }}
            />
            <TouchableOpacity
              style={styles.filledbtn}
              onPress={this.changePasswordRequest}
            >
            {loading?
            <ActivityIndicator color={colors.gray} />
            :
              <Text style={styles.filledbtnText}>Change password</Text>
            }
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.filledbtn}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={styles.filledbtnText}>Go back</Text>
            </TouchableOpacity>
          
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default ChangePassword;