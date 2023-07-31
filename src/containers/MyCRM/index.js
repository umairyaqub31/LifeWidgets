import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Image
} from "react-native";
import styles from "./styles";

class MyCRM extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
              source={require("../../../assets/images/MyCRM.png")}
            />
            <View style={styles.separator} />
            <Text style={styles.text}>
               The Life Widgets CRM platform will be a unique and customized for each business segment. As we launch different widgets, each
               business segment will be provided with an easy-to-use tool that will allow your business to interact with potential clients
               as they connect with you through the Life Widgets application. This widget will be launching throughout 2021
            </Text>
            <View style={styles.separator} />
            <Text style={styles.text}>
                In the meantime, go ahead and create a company profile in the "Add My Company" widget and we will notify you when
                have created tools for your market segment.</Text>
          </View>
        </ScrollView>

        </View>
      </>
    );
  }
}


export default MyCRM;
