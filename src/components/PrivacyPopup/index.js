import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  PanResponder,
  Dimensions,
  TouchableWithoutFeedback,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";
import styles from "./styles";
import { Divider, RadioButton } from "react-native-paper";
import { FontAwesome, Fontisto } from "@expo/vector-icons";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

class PrivacyPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrop: false,
      translateValue: new Animated.Value(350),
      value: "first",
    };

    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        this.state.translateValue.setValue(Math.max(0, 0 + gestureState.dy));
      },
      onPanResponderRelease: (e, gesture) => {
        if (gesture.moveY > 400) {
          this.setState({ backdrop: false });
        }

        //this.changeLayout();
        const shouldOpen = gesture.vy <= 0;
        Animated.spring(this.state.translateValue, {
          toValue: shouldOpen ? 0 : 350,
          velocity: gesture.vy,
          tension: 0,
          friction: 8,
          useNativeDriver: true,
        }).start();
      },
    });
  }

  choosePrivacy = () => {
    Animated.spring(this.state.translateValue, {
      toValue: 0,
      velocity: 10,
      tension: 1,
      friction: 9,
      useNativeDriver: true,
    }).start();
    this.setState({ backdrop: true });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  backdropclose = () => {
    Animated.spring(this.state.translateValue, {
      toValue: 350,
      velocity: 10,
      tension: 1,
      friction: 9,
      useNativeDriver: true,
    }).start();
    this.setState({ backdrop: false });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };
  render() {
    return (
      <>
        
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[
              styles.animatedview,
              { transform: [{ translateY: this.state.translateValue }] },
            ]}
          >
            <View
              style={{
                backgroundColor: colors.lightGray,
                borderRadius: 90,
                height: 6,
                width: 80,
                alignSelf: "center",
              }}
            ></View>
            <TouchableWithoutFeedback>
              <View style={styles.animatedviewheader}>
                <Text style={{ color: colors.white }}>Done</Text>
                <Text style={[styles.labeltext, { fontSize: 18 }]}>
                  Choose Privacy
                </Text>
                <TouchableOpacity onPress={this.backdropclose}>
                  <Text style={styles.primarytext}>Done</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
            <Divider />
            <RadioButton.Group
              onValueChange={(value) => this.setState({ value })}
              value={this.state.value}
            >
              <TouchableWithoutFeedback>
                <View style={styles.modallistcontainer}>
                  <View style={styles.modallistcontainerleft}>
                    <View style={styles.customchipicons}>
                      <Fontisto name="earth" size={22} color={colors.black} />
                    </View>
                    <View style={{ marginLeft: 10, flex: 1 }}>
                      <Text
                        style={[
                          styles.modallist,
                          { fontFamily: FontFamily.Medium },
                        ]}
                      >
                        Public
                      </Text>
                      <Text style={styles.graytext}>
                        Anyone can see who's in the group and what they post
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.iphoneradiobtnoutline} onPress={this.backdropclose}>
                    <RadioButton color={colors.primary} value="first" />
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <View style={styles.modallistcontainer}>
                  <View style={styles.modallistcontainerleft}>
                    <View style={styles.customchipicons}>
                      <FontAwesome name="lock" size={22} color={colors.black} />
                    </View>
                    <View style={{ marginLeft: 10, flex: 1 }}>
                      <Text
                        style={[
                          styles.modallist,
                          { fontFamily: FontFamily.Medium },
                        ]}
                      >
                        Private
                      </Text>
                      <Text style={styles.graytext}>
                        Only members can see who's in the group and what they
                        post
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.iphoneradiobtnoutline} >
                    <RadioButton color={colors.primary} value="second" />
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </RadioButton.Group>
          </Animated.View>
          {this.state.backdrop ? (
            <TouchableWithoutFeedback onPress={this.backdropclose}>
              <View
                style={{
                  backgroundColor: "rgba(0, 0, 0, .09)",
                  width: windowWidth,
                  position: "absolute",
                  height: windowHeight,
                }}
              ></View>
            </TouchableWithoutFeedback>
          ) : null}
     
      </>
    );
  }
}

export default PrivacyPopup;
