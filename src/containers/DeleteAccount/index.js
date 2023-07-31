import * as React from "react";
import {
  Alert,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import styles from "./styles";
import Dialog, {
  DialogContent,
  DialogTitle,
  SlideAnimation,
  DialogFooter,
  DialogButton,
} from "react-native-popup-dialog";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { Color, LifeWidget } from "@common";

class MenuSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_visible: false,
      loading: false,
      password:""
    };
  }

  deleteAccount = () => {
    this.setState({ is_visible: true });
  };

  proceed = async () => {
    this.setState({ loading: true });
    let data = {password:this.state.password}
    const json = await LifeWidget.deleteAccount(data);
    this.setState({ loading: false });
    if(json.status){
      this.setState({ is_visible: false });
      Alert.alert(
        "Success",
        json.message,
        [
          { text: "OK", onPress: () => this.props.logout() }
        ]
      );
    } else {
      Alert.alert(json.message);
    }
    
  };

  render() {
    const { menu } = this.props;
    const { is_visible, loading } = this.state;
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.scrolledview}>
          <Text style={styles.description}>
            When you delete your LifeWidget account, you won't be able to
            retrieve the content or information you've shared on LifeWidget.
            Your Chat and all of your messages will also be deleted.
          </Text>
          <TouchableOpacity
            style={styles.dangerButton}
            onPress={this.deleteAccount}
          >
            <Text style={styles.text}>Delete My Account</Text>
          </TouchableOpacity>
        </View>

        <Dialog
          dialogStyle={{ borderRadius: 24 }}
          width={0.8}
          visible={is_visible}
          dialogAnimation={
            new SlideAnimation({
              initialValue: 0,
              slideFrom: "top",
              useNativeDriver: true,
            })
          }
          onDismiss={() => {}}
          footer={
            !loading && (
              <DialogFooter>
                <DialogButton
                  text="CANCEL"
                  onPress={() => this.setState({ is_visible: false })}
                />
                <DialogButton
                  text="Proceed"
                  onPress={this.proceed}
                  style={styles.dangerButton}
                  textStyle={{ color: Color.white }}
                />
              </DialogFooter>
            )
          }
          dialogTitle={
            <DialogTitle title={"Account Password"} hasTitleBar={false} />
          }
        >
          <DialogContent>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <>
                <Text>Please enter account password to proceed</Text>
                <TextInput
                  placeholder="Enter password"
                  secureTextEntry
                  style={{
                    borderWidth: 1,
                    borderColor: Color.lightGray,
                    borderRadius: 10,
                    padding: 10,
                    marginTop: 10,
                  }}
                  onChangeText={(password)=>this.setState({password})}
                />
              </>
            )}
          </DialogContent>
        </Dialog>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    menu: typeof User.menu !== "undefined" ? User.menu : {},
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/UserRedux");
  return {
    ...ownProps,
    ...stateProps,
    logout: () => dispatch(actions.logoutResetState()),
    menuSettings: (data) => {
      dispatch(actions.menuSettings(data));
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(MenuSetting);