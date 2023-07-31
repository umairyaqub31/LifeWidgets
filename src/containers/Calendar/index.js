import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Image
} from "react-native";
import styles from "./styles";

class Calendar extends React.Component {
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
              source={require("../../../assets/images/Calendar.png")}
            />
            <View style={styles.separator} />
            <Text style={styles.text}>
            The Life Widgets calendar will encompass all social and business needs of our user base.  Look for a launch in Spring of 2021.
            </Text>
          </View>
        </ScrollView>
        
        </View>
      </>
    );
  }
}


export default Calendar;