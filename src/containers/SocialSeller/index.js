import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Image
} from "react-native";
import styles from "./styles";

class SocialSeller extends React.Component {
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
              source={require("../../../assets/images/Social_Seller.png")}
            />
            <View style={styles.separator} />
            <Text style={styles.text}>
               The Life Widgets social seller program will be a unique way for businesses and social influencers to connect for the sole
               purpose of creating sales. Look for launch in Summer of 2021. In the meantime, future social sellers
               should be building their friend network as businesses will be looking to do business with those who have a large friend base.</Text>
            <View style={styles.separator} />
            <Text style={styles.text}>
                Be sure to click on the "Share Us" widget and let your followers on other social media platform know that you have an
                account on Life Widgets. You're going to have an opportunity to make a lot of money!</Text>
          </View>
        </ScrollView>

        </View>
      </>
    );
  }
}


export default SocialSeller;
