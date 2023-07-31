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

class Cars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'Type One',
    };
  }

  render() {
    return (
      <>
        <View style={styles.container}>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View>
            <Image
              style={styles.menuImage}
              source={require("../../../assets/images/Cars.png")}
            />
            <View style={styles.separator} />
            <Text style={styles.text}>
                We believe dealership pay way too much for current products. These third-party companies also do not have your best
                interest at heart. We plan to allow your dealership to advertise your entire inventory to our users for a fee that is a fraction
                of what you are currently paying. Look for a launch in Summer of 2021.
            </Text>
            <View style={styles.separator} />
            <Text style={styles.text}>
                In the meantime, go ahead and create a company profile in the "Add My Company" widget and we will notify you when we are ready
                for an inventory feed. It will start off as a free service.
            </Text>
          </View>
        </ScrollView>

        </View>
      </>
    );
  }
}


export default Cars;
