import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Image
} from "react-native";
import styles from "./styles";

class Vacation extends React.Component {
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
              source={require("../../../assets/images/Vacation.png")}
            />
            <View style={styles.separator} />
            <Text style={styles.text}>
                Have a vacation property you would like to advertise? We plan to launch a listing and reservation tool by Summer of 2021.
                Our fees will be a fraction of the fees you are currently paying with traditional listing service.
            </Text>
            <View style={styles.separator} />
            <Text style={styles.text}>
                In the meantime, go ahead and create a company profile in the "Add My Company" widget and we will notify you when we are ready
                for you to start posting inventory. It will start off as a free service.
            </Text>
          </View>
        </ScrollView>

        </View>
      </>
    );
  }
}


export default Vacation;
