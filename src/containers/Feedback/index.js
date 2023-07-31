import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import styles from "./styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LifeWidget, Color } from "@common";

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      loader:false
    };
  }
  submitFeedBack = async () => {
    let data = { message: this.state.message };
    this.setState({loader:true})
    const json = await LifeWidget.submitFeedback(data);
    this.setState({loader:false})
    Alert.alert("Thank You", "Feedback received.", [
      { text: "OK", onPress: () => this.props.navigation.goBack() },
    ]);
  };
  setFeedbackData = (text) => {
    this.setState({ message: text });
  };
  render() {
    const {loader} = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrolledview}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topWidget}>
            <Text style={styles.heading}>
              We welcome your comments, feedback or suggestions. Thanks for
              being part of our community
            </Text>
            <TextInput
              multiline
              placeholder="Feedback or Suggestions"
              style={styles.textInput}
              value={this.state.message}
              onChangeText={this.setFeedbackData}
            />
            <TouchableOpacity
              disabled={loader}
              onPress={this.submitFeedBack}
              style={styles.primaryBtn}
              disabled={this.state.message.length > 3 ? false : true}
            >
            {loader?
            <ActivityIndicator color={Color.white} />:
              <Text style={styles.primaryBtnText}>Send</Text>
            }
            </TouchableOpacity>
          </View>
          <View></View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default Feedback;