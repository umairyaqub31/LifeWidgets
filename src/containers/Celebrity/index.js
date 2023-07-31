import * as React from "react";
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { TextInput, Divider, Switch } from "react-native-paper";
import colors from "../../config/color/color";
import { connect } from "react-redux";
import { RadioButton } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LifeWidget } from "@common";

class Celebrity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
    };
  }

  celebritySettings = (key, value) => {
    let data = Object.assign({}, this.props.celebrity);
    data[key] = value;

    this.props.celebritySettings(data);
  };

  componentDidMount(){
    this.updateSetting();
  }

  updateSetting = async () =>{
    const json = await LifeWidget.submitCelebrityRequest();
    if(json){
      this.props.celebritySettings(json);
    }
  }

  sendRequest = async () => {
    this.setState({ loader: true });
    let form = Object.assign({}, this.props.celebrity);
    const data = { message: form.status=="Other"?form.other:form.status, submit:true, status:form.status, other:form.other  };
    const json = await LifeWidget.submitCelebrityRequest(data);
    this.setState({ loader: false });
    Alert.alert(
      "Submitted",
      "Your celebrity request has been submitted successfuly. Please wait for the admin review.",
      [{ text: "OK", onPress: this.goBack }]
    );
  };

  goBack = () => {
    this.updateSetting();
    setTimeout(() => this.props.navigation.goBack(), 500);
  };

  render() {
    const { celebrity } = this.props;
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.scrolledview}>
          <View style={{ flex: 1 }}>
            <View style={styles.filterToggle}>
              <Text style={[styles.textBold, { flex: 1 }]}>
                I would like to become a verified celebrity and have a star
                added to my profile
              </Text>
              <Switch
                style={{ flex: 1 / 6 }}
                value={celebrity.is_on}
                onValueChange={(flag) => this.celebritySettings("is_on", flag)}
              />
            </View>
            {celebrity.is_on ? (
              <>
                <Text style={styles.textBold}>
                  Please click the box that best defines your celebrity status:
                </Text>
                <View style={styles.spacing}></View>
                <View style={styles.list}>
                  <RadioButton.Android
                    uncheckedColor={colors.primary}
                    color={colors.primary}
                    status={
                      celebrity.status == "Actor/Actress"
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() =>
                      this.celebritySettings("status", "Actor/Actress")
                    }
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.celebritySettings("status", "Actor/Actress")
                    }
                  >
                    <Text style={styles.text}>Actor/Actress</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.list}>
                  <RadioButton.Android
                    uncheckedColor={colors.primary}
                    color={colors.primary}
                    status={
                      celebrity.status == "Musician" ? "checked" : "unchecked"
                    }
                    onPress={() => this.celebritySettings("status", "Musician")}
                  />
                  <TouchableOpacity
                    onPress={() => this.celebritySettings("status", "Musician")}
                  >
                    <Text style={styles.text}>Musician</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.list}>
                  <RadioButton.Android
                    uncheckedColor={colors.primary}
                    color={colors.primary}
                    status={
                      celebrity.status == "Professional Athlete"
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() =>
                      this.celebritySettings("status", "Professional Athlete")
                    }
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.celebritySettings("status", "Professional Athlete")
                    }
                  >
                    <Text style={styles.text}>Professional Athlete</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.list}>
                  <RadioButton.Android
                    uncheckedColor={colors.primary}
                    color={colors.primary}
                    status={
                      celebrity.status == "Published Author"
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() =>
                      this.celebritySettings("status", "Published Author")
                    }
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.celebritySettings("status", "Published Author")
                    }
                  >
                    <Text style={styles.text}>Published Author</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.list}>
                  <RadioButton.Android
                    uncheckedColor={colors.primary}
                    color={colors.primary}
                    status={
                      celebrity.status == "Politician" ? "checked" : "unchecked"
                    }
                    onPress={() =>
                      this.celebritySettings("status", "Politician")
                    }
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.celebritySettings("status", "Politician")
                    }
                  >
                    <Text style={styles.text}>Politician</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.list}>
                  <RadioButton.Android
                    uncheckedColor={colors.primary}
                    color={colors.primary}
                    status={
                      celebrity.status == "Model" ? "checked" : "unchecked"
                    }
                    onPress={() => this.celebritySettings("status", "Model")}
                  />
                  <TouchableOpacity
                    onPress={() => this.celebritySettings("status", "Model")}
                  >
                    <Text style={styles.text}>Model</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.list}>
                  <RadioButton.Android
                    uncheckedColor={colors.primary}
                    color={colors.primary}
                    status={
                      celebrity.status == "Other" ? "checked" : "unchecked"
                    }
                    onPress={() => this.celebritySettings("status", "Other")}
                  />
                  <TouchableOpacity
                    onPress={() => this.celebritySettings("status", "Other")}
                  >
                    <Text style={styles.text}>Other - Please Define:</Text>
                  </TouchableOpacity>
                </View>
                {celebrity.status == "Other" && (
                  <TextInput
                    underlineColor={colors.lightGray}
                    theme={{ colors: { primary: colors.primary } }}
                    style={[styles.textinputrounded, styles.boxShadow]}
                    label="Other"
                    value={celebrity.other ?? ""}
                    onChangeText={(text) =>
                      this.celebritySettings("other", text)
                    }
                  />
                )}
                
                {(!!celebrity.status && celebrity.status !== "Other") ||
                (celebrity.other && celebrity.other.length > 2) ? (
                  <View>
                    <Divider style={styles.separator} />
                    {this.state.loader ? (
                      <ActivityIndicator color={colors.gray} />
                    ) : (
                      <TouchableOpacity
                        disabled={celebrity.disabled}
                        style={[styles.primaryBtn, celebrity.disabled && {backgroundColor:colors.gray}]}
                        onPress={this.sendRequest}
                      >
                        <Text style={styles.primaryBtnText}>Submit</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : null}
              </>
            ) : null}
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ User }) => {
  return {
    celebrity: typeof User.celebrity !== "undefined" ? User.celebrity : {},
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/UserRedux");
  return {
    ...ownProps,
    ...stateProps,
    celebritySettings: (data) => {
      dispatch(actions.celebritySettings(data));
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(Celebrity);