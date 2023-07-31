import * as React from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import styles from "./styles";
import { Feather,MaterialIcons } from "@expo/vector-icons";
import colors from "../../../config/color/color";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { RadioButton } from "react-native-paper";

class TopTabsPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.modalizeRef = React.createRef();
  }

  modalizeOpen = () => {
    this.modalizeRef.current?.open();
  };

  handleOnChange = (value) => {
    this.props.saveResponse(value);
    this.setState({
      radioValue: value,
    });
  };

  render() {
    return (
      <>
        <Portal>
          <Modalize ref={this.modalizeRef} adjustToContentHeight={true}>
          <View style={styles.modelHead}>
              <Text style={styles.heading}>Your News Feed</Text>
          </View>
            <View style={styles.scrolledView}>
            <RadioButton.Group
              onValueChange={(value) => this.handleOnChange(value)}
              value={this.state.radioValue}
            >
              <View style={styles.list}>
                <View style={styles.listInline}>
                  <View style={styles.customchipicons}>
                      <Feather name="home" size={24} color={colors.primary} />
                  </View>
                  <View>
                    <Text style={styles.textBold}>Home</Text>
                    <Text style={styles.graytext}>Show most relevant posts first.</Text>
                  </View>
                </View>
                <View>
                  <RadioButton.Android
                    uncheckedColor={colors.gray}
                    color={colors.primary}
                    value="Home"
                    status='checked'
                  />
                </View>
              </View>
              <View style={styles.list}>
                <View style={styles.listInline}>
                  <View style={styles.customchipicons}>
                      <Feather name="users" size={24} color={colors.primary} />
                  </View>
                  <View>
                    <Text style={styles.textBold}>Friends</Text>
                    <Text style={styles.graytext}>Show only posts from Friends.</Text>
                  </View>
                </View>
                <View>
                  <RadioButton.Android
                    uncheckedColor={colors.gray}
                    color={colors.primary}
                    value="Friends"
                    status='unchecked'
                  />
                </View>
              </View>
              <View style={styles.list}>
                <View style={styles.listInline}>
                  <View style={styles.customchipicons}>
                      <MaterialIcons name="recent-actors" size={24} color={colors.primary}  />
                  </View>
                  <View>
                    <Text style={styles.textBold}>Recent</Text>
                    <Text style={styles.graytext}>Show most recent posts.</Text>
                  </View>
                </View>
                <View>
                  <RadioButton.Android
                    uncheckedColor={colors.gray}
                    color={colors.primary}
                    value="Recent"
                    status='unchecked'
                  />
                </View>
              </View>
            </RadioButton.Group>
            </View>
          </Modalize>
        </Portal>
      </>
    );
  }
}

export default TopTabsPopup;
