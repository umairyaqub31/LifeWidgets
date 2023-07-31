import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import styles from "./styles";
import {
  Fontisto,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Divider, RadioButton } from "react-native-paper";
import FontFamily from "../../config/fonts/fontfamily";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";

class GeneralPrivacyStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      privacy:1,
      key:""
    }
    this.modalizeRef = React.createRef();
  }

  setGeneralPrivacy = (privacy) => {
    let {key} = this.state;
    this.props.setProfileData(key, privacy)
    this.setState({privacy})
  }

  modalizeOpen = (key, privacy) => {
    this.setState({key, privacy})
    this.modalizeRef.current?.open();
  };

  render() {
    return (
      <Portal>
        <Modalize ref={this.modalizeRef} snapPoint={310}>
          <View style={styles.windowWidth}>
            <View style={styles.popUpHead}>
              <TouchableOpacity
                style={styles.touchOpacity}
                onPress={() => this.modalizeRef.current?.close()}
              >
                <AntDesign name="close" size={20} color={colors.black} />
              </TouchableOpacity>
              <Text style={styles.heading}>Select Privacy</Text>
              <TouchableOpacity
                style={styles.touchOpacity}
                onPress={() => this.modalizeRef.current?.close()}
              >
                <Text style={styles.textPrimary}>Done</Text>
              </TouchableOpacity>
            </View>
            <Divider style={styles.separator} />

            <View style={styles.container}>
              <ScrollView style={styles.scrolledview}>
                <Text style={styles.heading}>Who can see your privacy?</Text>
                <Divider style={styles.separator} />
                <RadioButton.Group
                  value={this.state.privacy}
                >
                  <TouchableOpacity
                    style={[
                      styles.modallistcontainer,
                      styles.noMargin,
                      styles.noPadding,
                    ]}
                    onPress={() =>
                      this.setGeneralPrivacy(1)
                    }
                  >
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

                      <RadioButton
                        uncheckedColor={colors.primary}
                        color={colors.primary}
                        value={1}
                        onPress={() =>
                      this.setGeneralPrivacy(1)
                    }
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modallistcontainer}
                    onPress={() =>
                      this.setGeneralPrivacy(2)
                    }
                  >
                    <View style={styles.customchipicons}>
                      <FontAwesome5
                        name="user-friends"
                        size={22}
                        color={colors.black}
                      />
                    </View>
                    <View style={styles.modallistcontainerRight}>
                      <View style={{ flex: 1 }}>
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

                      <RadioButton
                        checked="checked"
                        uncheckedColor={colors.primary}
                        color={colors.primary}
                        value={2}
                        onPress={() =>
                      this.setGeneralPrivacy(2)
                    }
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modallistcontainer}
                    onPress={() =>
                      this.setGeneralPrivacy(3)
                    }
                  >
                    <View style={styles.customchipicons}>
                      <FontAwesome5
                        name="lock"
                        size={22}
                        color={colors.black}
                      />
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
                        <Text style={styles.graytext}>Only me.</Text>
                      </View>

                      <RadioButton
                        uncheckedColor={colors.primary}
                        color={colors.primary}
                        value={3}
                        onPress={() =>
                      this.setGeneralPrivacy(3)
                    }
                      />
                    </View>
                  </TouchableOpacity>
                </RadioButton.Group>
              </ScrollView>
            </View>
          </View>
        </Modalize>
      </Portal>
    );
  }
}

export default GeneralPrivacyStatus;