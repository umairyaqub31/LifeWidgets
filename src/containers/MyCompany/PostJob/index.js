import * as React from "react";
import {
  Text,
  View,
  ScrollView,
  Image
} from "react-native";
import styles from "./styles";

class PostJob extends React.Component {
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
              source={require("../../../../assets/images/Jobs.png")}
            />
            <View style={styles.separator} />
            <Text style={styles.text}>
                Employer and applicants are going to love our job listing servicel! Go ahead and create a company profile on Life Widgets
                and we will notify you when our jobs widget launches in Summer of 2021.
            </Text>
          </View>
        </ScrollView>
        </View>
      </>
    );
  }
}


export default PostJob;
