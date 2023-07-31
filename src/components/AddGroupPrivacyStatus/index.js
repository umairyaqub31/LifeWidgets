import * as React from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import styles from "./styles";
import { Fontisto, FontAwesome5, AntDesign } from "@expo/vector-icons";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { Divider, RadioButton } from "react-native-paper";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { connect } from "react-redux";

class AddGroupPrivacyStatus extends React.Component {
  constructor(props) {
    super(props);
    this.modalizeRef = React.createRef();
  }

  modalizeOpen = () => {
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
                <Text style={styles.heading}>Who can see your post?</Text>
                <Divider style={styles.separator} />
                <RadioButton.Group
                  value={
                    this.props.privacy ? this.props.privacy.name : "Public"
                  }
                >
                  <TouchableOpacity
                    style={[
                      styles.modallistcontainer,
                      styles.noMargin,
                      styles.noPadding,
                    ]}
                    onPress={() =>
                      this.props.setGroupPrivacy({ name: "Public", id: 1 })
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
                        value="Public"
                        onPress={() =>
                          this.props.setGroupPrivacy({ name: "Public", id: 1 })
                        }
                      />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modallistcontainer}
                    onPress={() =>
                      this.props.setGroupPrivacy({ name: "Private", id: 0 })
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
                          Private
                        </Text>
                        <Text style={styles.graytext}>Private</Text>
                      </View>

                      <RadioButton
                        uncheckedColor={colors.primary}
                        color={colors.primary}
                        value="Private"
                        onPress={() =>
                          this.props.setGroupPrivacy({ name: "Private", id: 0 })
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

const mapStateToProps = (state) => {
  return {
    privacy: state.Group.privacy,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/GroupRedux");
  return {
    ...ownProps,
    ...stateProps,
    setGroupPrivacy: (data) => {
      dispatch(actions.setGroupPrivacy(data));
    },
  };
};
export default connect(
  mapStateToProps,
  undefined,
  mergeProps,
  {forwardRef: true,}
)(AddGroupPrivacyStatus);