import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Image
} from "react-native";
import styles from "./styles";

class Apartments extends React.Component {
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
              source={require("../../../assets/images/Apartments.png")}
            />
            <View style={styles.separator} />
            <Text style={styles.text}>
                Need to advertise an apartment for rent, we are going to accept all apartment listings from apartment complexes to individuals.
                We will start off as a free listing service and once we have gained market traction, apartment complexes will pay a minimal fee to advertise.
                Look for a launch in Summer of 2021.
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


export default Apartments;
