import * as React from 'react';
import { Text, TouchableOpacity, View,  ScrollView, Image, Animated,PanResponder, TouchableWithoutFeedback, Dimensions,
  Platform,
  UIManager,
  LayoutAnimation
} from 'react-native';
import styles from './styles';
import { AntDesign,MaterialCommunityIcons } from '@expo/vector-icons';
import colors from "../../config/color/color";
import { Avatar , Divider   } from 'react-native-paper';


const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;


class UnfriendsPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backdrop: false,
      translateValue: new Animated.Value(350),
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

  UnfriendsPopupButton = () => {
    Animated.spring(this.state.translateValue, {
      toValue: 0,
      velocity: 0,
      tension: 0,
      friction: 6,
      useNativeDriver:true
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
                style={[styles.animatedview,{transform: [{ translateY: this.state.translateValue }]}]}>
                <View
                    style={{
                        backgroundColor: colors.gray,
                        borderRadius: 90,
                        height: 7,
                        width: 80,
                        alignSelf: "center",
                    }}
                ></View>
                <TouchableOpacity style={styles.pendinginvitescontainer}>
                    <Avatar.Image size={52} style={styles.avatarimage} source={require('../../../assets/images/avatar.png')} />
                    <View  style={styles.pendinginvitesnamecontainer}>
                        <View>
                            <Text style={styles.username}>John Doe</Text>
                            <Text style={styles.graytext}>Friends since November 2014</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <Divider style={{marginTop:13}}/>
                <TouchableOpacity style={styles.modallistcontainer}>
                        <MaterialCommunityIcons name="heart-outline" size={28} color={colors.black} />
                    <View style={{marginLeft:10}}>
                        <Text style={styles.modallist}>Add To Favorites</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modallistcontainer}>
                <MaterialCommunityIcons name="close-box-multiple-outline" size={28} color={colors.black} />
                    <View  style={styles.pendinginvitesnamecontainer}>
                        <View style={{marginLeft:10}}>
                            <Text style={styles.modallist}>Unfollow for 30 Days</Text>
                            <Text style={styles.graytext}>Stop seeing posts for 30 days but stay friends</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modallistcontainer}>
                        <MaterialCommunityIcons name="close-box-multiple-outline" size={28} color={colors.black} />
                    <View  style={styles.pendinginvitesnamecontainer}>
                        <View style={{marginLeft:10}}>
                            <Text style={styles.modallist}>Unfollow </Text>
                            <Text style={styles.graytext}>Stop seeing posts but stay friends</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modallistcontainer}>
                            <AntDesign name="deleteuser" size={28} color='red' />
                            <View  style={styles.pendinginvitesnamecontainer}>
                                <View style={{marginLeft:10}}>
                                    <Text style={[styles.modallist,{color:'red'}]}>Unfriend John</Text>
                                    <Text style={styles.graytext}>Remove John as a friend</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
            </Animated.View>
          {this.state.backdrop ? (
            <TouchableWithoutFeedback onPress={this.backdropclose}>
              <View
                style={{
                  backgroundColor: "rgba(0, 0, 0, .2)",
                  width: windowWidth,
                  position: "absolute",
                  height: windowHeight,
                  zIndex:1
                }}
              ></View>
            </TouchableWithoutFeedback>
          ) : null}
 
        </>
      );
  }
}

export default UnfriendsPopup;