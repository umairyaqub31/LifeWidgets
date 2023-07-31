import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import colors from "../../config/color/color";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { RadioButton } from "react-native-paper";
import { Touchable } from "react-native";

class EventInterestedPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: "",
    };
    this.modalizeRef = React.createRef();
  }

  _invitationPopup = () => {
    this.modalizeRef.current?.open();
  };
  _doneRef = () => {
    this.modalizeRef.current?.close();
    this.props.submitResponse();
  };

  handleOnChange = (value) => {
    this.props.addResponse(value);
    this.setState({
      radioValue: value,
    });
  };

  render() {
    return (
      <Portal>
        <Modalize ref={this.modalizeRef} adjustToContentHeight={true}>
          <View style={styles.modalizeContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={[styles.heading, { textAlign: "center", flex: 1 }]}>
                Interested In
              </Text>
              <TouchableOpacity onPress={this._doneRef}>
                <Text style={styles.primaryText}>Done</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <RadioButton.Group
              onValueChange={(value) => this.handleOnChange(value)}
              value={this.state.radioValue}
            >
              <TouchableOpacity
                style={styles.listInline}
                onPress={() => this.handleOnChange("interested")}
              >
                <View style={styles.listInlineIcon}>
                  <RadioButton.Android
                    uncheckedColor={colors.gray}
                    color={colors.primary}
                    value="interested"
                  />
                </View>
                <Text style={styles.text}>May be</Text>
              </TouchableOpacity>

              <View style={styles.separator} />

              <TouchableOpacity
                style={styles.listInline}
                onPress={() => this.handleOnChange("going")}
              >
                <View style={styles.listInlineIcon}>
                  <RadioButton.Android
                    uncheckedColor={colors.gray}
                    color={colors.primary}
                    value="going"
                  />
                </View>
                <Text style={styles.text}>Going</Text>
              </TouchableOpacity>

              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.listInline}
                onPress={() => this.handleOnChange("cantAttend")}
              >
                <View style={styles.listInlineIcon}>
                  <RadioButton.Android
                    uncheckedColor={colors.gray}
                    color={colors.primary}
                    value="cantAttend"
                  />
                </View>
                <Text style={styles.text}>Can't Attend</Text>
              </TouchableOpacity>
            </RadioButton.Group>
          </View>
        </Modalize>
      </Portal>
    );
  }
}

export default EventInterestedPopup;
