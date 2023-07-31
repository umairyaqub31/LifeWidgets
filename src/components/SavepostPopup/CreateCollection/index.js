import * as React from "react";
import {
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView,
  Animated
} from "react-native";
import styles from "./styles";
import colors from "../../../config/color/color";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { connect } from "react-redux";

class CreateCollection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { post_id: null, title: "" };
    this.modalizeRef = React.createRef();
  }

  createCollection = (post_id) => {
    this.setState({ post_id: post_id });
    this.modalizeRef.current?.open();
  };

  snackbarHandler = () => {
    this.props.snackbarHandler();
    this.modalizeRef.current.close();
  };

  SavepostOption = () => {
    this.props.SavepostOption();
    this.modalizeRef.current.close();
  };

  submitCollection = () => {
    const data = { post_id: this.state.post_id, title: this.state.title };
    this.props.submitCollection(data);
    if(typeof this.props.snackbarHandler === "function"){
      this.snackbarHandler();
    } else {
      this.modalizeRef.current.close();
    }
    
  };

  render() {
    return (
      <>
        <Portal>
          <Modalize ref={this.modalizeRef} modalTopOffset={100} adjustToContentHeight={true}>
            <View style={styles.scrolledView}>
              <View>
                <Text style={styles.textBold}>Create a collection</Text>
                <Text style={styles.text}>Enter a name for your collection</Text>
                <View
                  style={[styles.roundedtextinputcontainer, styles.boxShadow]}
                >
                  <TextInput
                    style={styles.roundedtextinput}
                    placeholder="Add Collection Name"
                    placeholderTextColor={colors.gray}
                    onChangeText={(text) => this.setState({ title: text })}
                  />
                </View>
                <View style={styles.multiBtn}>
                  <TouchableOpacity
                    style={styles.grayBtn}
                    onPress={this.SavepostOption}
                  >
                    <Text style={styles.grayBtnText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={this.submitCollection}
                  >
                    <Text style={styles.primaryBtnText}>Create</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modalize>
        </Portal>
      </>
    );
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CollectionRedux");
  return {
    ...ownProps,
    ...stateProps,
    submitCollection: (data) => {
      actions.submitCollection(dispatch, data);
    },
  };
};
export default connect(undefined, undefined, mergeProps, {
  forwardRef: true,
})(CreateCollection);
