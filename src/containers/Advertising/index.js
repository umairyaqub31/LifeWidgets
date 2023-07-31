import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Image
} from "react-native";
import styles from "./styles";

class Advertising extends React.Component {
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
              source={require("../../../assets/images/Advertising.png")}
            />
            <View style={styles.separator} />
            <Text style={styles.text}>
            Life Widgets advertising is going to be easy to setup and we plan to maximize your ROI in a way never seen before.  Stay tuned for a solution that is going to change the way you think about advertising.  Go ahead and create a company profile on Life Widgets and we will notify you when our advertising launches in Spring/Summer of 2021.
            </Text>
          </View>
        </ScrollView>

        </View>
      </>
    );
  }
}


export default Advertising;
