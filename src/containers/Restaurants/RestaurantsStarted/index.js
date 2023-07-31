import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import colors from "../../../config/color/color";
import { Checkbox } from "react-native-paper";

class RestaurantsStarted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };
  }

  render() {
    const { checked } = this.state;
    return (
      <>
        <View style={styles.container}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Text style={styles.text}>
                Did you know restaurant owners pay as much as $1 per person every time you use a third party site to make a reservation?  We will eventually be offering a reservation tool that’s going to be less expensive for restaurant owners.  In the meantime, please support your local business by calling to make your reservations.  If you don’t see your favorite restaurant listed in our platform, be sure and let them know.  Restaurant owners, please go to the “Add My Company” widget and add your restaurant to our platform.
            </Text>
          </ScrollView>
          <TouchableOpacity style={styles.primaryBtn} onPress={()=> this.props.navigation.navigate('Restaurants')}>
            <Text style={styles.primaryBtnText}>Get's Started</Text>
          </TouchableOpacity>
          <View style={styles.notShowMsg}>
            <Checkbox.Android
              uncheckedColor={colors.primary}
              color={colors.primary}
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => { this.setState({ checked: !checked }); }}
            />
            <Text style={styles.text}>Do not show me this message again.</Text>
          </View>
        </View>
      </>
    );
  }
}


export default RestaurantsStarted;