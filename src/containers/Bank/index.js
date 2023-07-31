import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image
} from "react-native";
import styles from "./styles";
import { TextInput } from "react-native-paper";
import colors from "../../config/color/color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

class Bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'Type One',
    };
  }

  render() {
    return (
      <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrolledview}
          showsVerticalScrollIndicator={false}
        >
        <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View>
            <Image
              style={styles.menuImage}
              source={require("../../../assets/images/Bank.png")}
            />
            <View style={styles.separator} />
            <Text style={styles.text}>
                We are currently looking for an established money transfer application to allow users
                and businesses to exchange currency. If you are an established business in this field,
                we would appreciate hearing from you. 
            </Text>
            <View style={styles.separator} />
            <Text style={styles.textBold}>
              Please send us a message below.
            </Text>
            <TextInput
                underlineColor='transparent'
                theme={{ colors: { primary: colors.primary } }}
                multiline
                numberOfLines={8}
                style={styles.postTextarea}
                placeholder="Feedback or Suggestions"
            />
          </View>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnText}>Send</Text>
          </TouchableOpacity>
        </ScrollView>
        
        </View>
      </KeyboardAwareScrollView>
    );
  }
}


export default Bank;