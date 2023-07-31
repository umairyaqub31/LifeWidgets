import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./styles";
import { Divider, RadioButton } from "react-native-paper";
import { FontAwesome5, Fontisto, AntDesign } from "@expo/vector-icons";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { ScrollView } from "react-native-gesture-handler";



const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

class ChoosePrivacyPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "first",
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrolledview}>
          <Text style={styles.heading}>Who can see your post?</Text>
          <Divider style={styles.separator}/>
          <RadioButton.Group
                onValueChange={(value) => this.setState({ value })}
                value={this.state.value}
              >
                  <View style={[styles.modallistcontainer,styles.noMargin,styles.noPadding]}>
                      <View style={styles.customchipicons}>
                        <Fontisto name="earth" size={22} color={colors.black} />
                      </View>
                      <View style={styles.modallistcontainerRight}>
                          <View>
                            <Text
                              style={[
                                styles.modallist,
                                { fontFamily: FontFamily.Medium },
                              ]}
                            >
                              Public
                            </Text>
                            <Text style={styles.graytext}>
                              Anyone can see who's.
                            </Text>
                          </View>
                          <TouchableOpacity>
                            <RadioButton.Android uncheckedColor={colors.primary} color={colors.primary} value="first" />
                          </TouchableOpacity>
                      </View>
                  </View>
                  <View style={styles.modallistcontainer}>
                      <View style={styles.customchipicons}>
                        <FontAwesome5 name="users" size={22} color={colors.black} />
                      </View>
                      <View style={styles.modallistcontainerRight}>
                          <View style={{flex:1}}>
                            <Text
                              style={[
                                styles.modallist,
                                { fontFamily: FontFamily.Medium },
                              ]}
                            >
                              Friends
                            </Text>
                            <Text style={styles.graytext}>
                             Only friends can see your post.
                            </Text>
                          </View>
                          <TouchableOpacity>
                            <RadioButton.Android uncheckedColor={colors.primary} color={colors.primary} value="second" />
                          </TouchableOpacity>
                      </View>
                  </View>
                  <View style={styles.modallistcontainer}>
                      <View style={styles.customchipicons}>
                      <FontAwesome5 name="lock" size={22} color={colors.black} />
                      </View>
                      <View style={styles.modallistcontainerRight}>
                          <View>
                            <Text
                              style={[
                                styles.modallist,
                                { fontFamily: FontFamily.Medium },
                              ]}
                            >
                              Only Me
                            </Text>
                            <Text style={styles.graytext}>
                              Only me.
                            </Text>
                          </View>
                          <TouchableOpacity>
                            <RadioButton.Android uncheckedColor={colors.primary} color={colors.primary} value="third" />
                          </TouchableOpacity>
                      </View>
                  </View>
              </RadioButton.Group>
        </ScrollView>
      </View>
    );
  }
}

export default ChoosePrivacyPost;
