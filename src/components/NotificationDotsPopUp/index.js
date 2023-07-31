import * as React from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import styles from "./styles";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import * as firebase from "firebase";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

class NotificationDotsPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: null,
    };
    this.modalizeRef = React.createRef();
  }

  NotificationDotsPopUp = (key) => {
    this.setState({ key });
    this.modalizeRef.current?.open();
  };

  removeNotification = () => {
    this.modalizeRef.current?.close();
    firebase
      .database()
      .ref("notifications/" + this.state.key)
      .remove();
  };
  render() {
    return (
      <>
        <Portal>
          <Modalize ref={this.modalizeRef} adjustToContentHeight={true}>
            <View style={styles.scrollView}>
              <TouchableOpacity
                style={styles.modallistcontainer}
                onPress={this.removeNotification}
              >
                <View style={styles.customchipicons}>
                  <Feather name="trash-2" size={24} color={colors.black} />
                </View>
                <View style={styles.pendinginvitesnamecontainer}>
                  <View style={{ marginLeft: 10 }}>
                    <Text style={styles.modallist}>
                      Remove this notification
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.modallistcontainer}>
                    <View style={styles.customchipicons}>
                         <MaterialCommunityIcons name="comment-remove" size={24} color={colors.black} />
                    </View>
                    <View  style={styles.pendinginvitesnamecontainer}>
                        <View style={{marginLeft:10}}>
                            <Text style={styles.modallist}>Turn off notification of this post</Text>
                        </View>
                    </View>
                </TouchableOpacity> */}
            </View>
          </Modalize>
        </Portal>
      </>
    );
  }
}

export default NotificationDotsPopUp;