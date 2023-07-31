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

class BarWelcome extends React.Component {
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
                The Bars widget is going to be unlike anything you’ve ever seen before.  Once we have an established user base,
                you will be able to see the age demographic for each bar, along with the male and female attendance ratio.
              </Text>
              <Text style={styles.text, styles.textp10}>
                You can also see if any of your friends are present.  Want to remain hidden, you can easily click the hide me button in the settings tab.
              </Text>
              <Text style={styles.text, styles.textp10}>
                 The more friends you invite, the quicker the word spreads and this feature becomes relevant.
                 You’ll also be able to see bars closest to you and can search bars up to 10 miles away.
              </Text>
              <Text style={styles.text, styles.textp10}>
                 Bar owners will be able to create a company profile, add pictures and information regarding music and specials.
                 Look for your favorite bar in the search bar, if you don’t find them, go ahead and add them by clicking the add button,
                 the owner can later claim this bar and update the profile
              </Text>
            </View>
            <View>
              <TouchableOpacity style={styles.barWelcomePrimaryBtn} onPress={()=>this.updateUserData("is_bar_message",0)}>
                  <Text style={styles.barWelcomePrimaryBtnText}>Let’s get started</Text>
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

export default connect(undefined, undefined, mergeProps)(BarWelcome);