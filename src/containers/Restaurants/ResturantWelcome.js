import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from "react-native";
import styles from "./styles";
import { Checkbox } from "react-native-paper";
import colors from "../../config/color/color";
import { connect } from "react-redux";

class RestaurantWelcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }

  updateUserData = (key, value) => {
    let form = {};
    form[key] = value;
    
    this.props.updateUserData(form);
    if(this.state.checked){
      clearTimeout(this.delayTyping);
      this.delayTyping = setTimeout(() => {
        this.props.sendRequestToServer(form);
      }, 1000);
    }
  };

  render() {

    return (
      <ScrollView style={styles.container}>
        <View style={styles.scrolledview}>
            <View style={{flex:1, marginTop:30}}>
              <Text style={styles.text, styles.textp10}>
                 Did you know restaurant owners pay as much as $1 per person each time you use a third party site to make a reservation?
              </Text>
              <Text style={styles.text, styles.textp10}>
                We will eventually be offering a reservation tool that’s going to be less expensive for restaurant owners
              </Text>
              <Text style={styles.text, styles.textp10}>
                 In the meantime, please support your local business by calling to make your reservations.  If you don’t see your favorite restaurant listed in our platform, be sure and let somebody know next time you eat there.
              </Text>
              <Text style={styles.text, styles.textp10}>
                Restaurant owners, please go to the “Add My Company” widget and add your restaurant to our platform.  Until restaurants create their company profiles, this widget will start off slow.  Help us get the word out buy using the "Share Us" widget.
              </Text>
            </View>
            <View>
              <TouchableOpacity style={styles.welcomePrimaryBtn} onPress={()=>this.updateUserData("is_restaurant_message",0)}>
                  <Text style={styles.welcomePrimaryBtnText}>Let’s get started</Text>
              </TouchableOpacity>
              <View style={styles.messageShow}>
                <Checkbox.Android
                  uncheckedColor={colors.primary}
                  color={colors.primary}
                  status={this.state.checked ? "checked" : "unchecked"}
                  onPress={() => {this.setState({checked:!this.state.checked})}}
                />
                <Text style={[styles.grayText, { marginTop:10}]}>
                Don’t show this message again
                </Text>
              </View>
            </View>
        </View>
      </ScrollView>
    );
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/UserRedux");
  const { actions:actionsProfile } = require("@redux/ProfileRedux");
  return {
    ...ownProps,
    ...stateProps,
    updateUserData: (data) => {
      actions.updateUserData(dispatch, data);
    },
    sendRequestToServer: (data) => {
      actionsProfile.sendRequestToServer(dispatch, data);
    },
  };
};

export default connect(undefined, undefined, mergeProps)(RestaurantWelcome);
