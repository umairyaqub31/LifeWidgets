import * as React from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  RefreshControl,
  Image,
} from "react-native";
import styles from "./styles";
import { Checkbox } from "react-native-paper";
import colors from "../../config/color/color";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";

class Reward extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
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
      <>
        <ScrollView style={styles.container}>
          <View style={styles.scrolledview}>
          <View style={{flex:1}}>
                <Text style={[styles.text, styles.textp10]}>We are spending 1K on social influencers and we also thought we would have a contest amongst our community to see who can recruit the most people to join the Life Widgets App.
                </Text>
                 <Text style={[styles.text, styles.textp10]}>
                The contest runs from 5/18 until the end May. The person with the most new friends joined wins the $1000.
                </Text>
                 <Text style={[styles.text, styles.textp10]}>
                 Just make sure to tell your joining friend to send you a friend request as soon as they get here; the first person they friend gets credit for them joining.
                 </Text>
                  <Text style={[styles.text, styles.textp10]}>
                 If this is successful, we’ll repeat this contest in June and consider raising the prize money! Good Luck!
                 </Text>
            </View>
            <View>
                <TouchableOpacity style={styles.primarybtn} onPress={()=> this.updateUserData("is_reward_message",0)}>
                  <Text style={styles.primarybtntext}>Show Leaderboard</Text>
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
      </>
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

export default connect(undefined, undefined, mergeProps)(Reward);
