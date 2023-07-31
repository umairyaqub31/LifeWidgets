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

class Flirt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
    this.delayTyping = null;
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
            <View style={{flex:1}}>
              <Text style={styles.text}>
                Have you ever been at a bar, the mall or maybe the grocery store and noticed somebody that you found attractive?  It can be intimidating approaching that person, especially since we may not know their relationship status.  The Flirt Widget is a geo-based app that will help singles easily find one another when out and about.  Click on the settings tab in the upper right to set your preferences.  Once completed, you will be shown people who meet your criteria.  If you see somebody you like, click on their image to see more pictures, and send an introduction message.
              </Text>
              <Text style={styles.text}>
                The recipient can either reply or reject your message.  Women have a feature that indicates they are open to approach.  Men, if you see a green dot next to a woman’s picture, this indicates you have been given a green light to approach and meet in person.
              </Text>
              <Text style={styles.text}>
                This is brand new, so give it time to populate. Invite your friends to join and spread the word!
              </Text>
              <Text style={styles.text}>
                If you are happily in love, you can remove the Flirt widget from the settings tab on the main widgets screen.
              </Text>

            </View>
            <View>
              <TouchableOpacity style={styles.primaryBtn} onPress={()=> this.updateUserData("is_flirt_message",0)}>
                  <Text style={styles.primaryBtnText}>Let’s get started</Text>
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

export default connect(undefined, undefined, mergeProps)(Flirt);