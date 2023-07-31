import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
} from "react-native";
import styles from "./styles";
import { Divider, Switch } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../../config/color/color";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { AddGroupPrivacyStatus } from "@components";
import { connect } from "react-redux";

class Groupcreate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "first",
    };
    this.actionSheetRef = React.createRef();
  }

  addGroupForm = (key, value) => {
    let form = Object.assign({}, this.props.form);
    form[key] = value;
    this.props.addGroupForm(form);
  };

  submitGroup = () => {
    let form = Object.assign({}, this.props.form);
    form.general_privacy_id = this.props.privacy.id??0;

    
    this.props.submitGroup(form);
    this.props.navigation.goBack();
  }

  render() {
    const form = Object.assign({}, this.props.form);

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrolledview}>
          <View style={{ flex: 1 }}>
            <View>
              <Text style={styles.labeltext}>Name</Text>
              <TextInput
                style={[styles.roundedtextinput, styles.boxShadow]}
                placeholder="Name your group"
                placeholderTextColor={colors.gray}
                value={form.title}
                onChangeText={(text)=>this.addGroupForm("title", text)}
              />
            </View>
            <Divider style={styles.separator} />
            <View>
              <Text style={styles.labeltext}>Privacy</Text>
              <TouchableOpacity
                style={[styles.choosePrivacytextinput, styles.boxShadow]}
                onPress={() => this.actionSheetRef.current.modalizeOpen()}
              >
                <Text style={styles.graytext}>{this.props.privacy ? this.props.privacy.name : "Public"}</Text>
                <MaterialIcons
                  name="arrow-drop-down"
                  size={24}
                  color={colors.gray}
                />
              </TouchableOpacity>
              
            </View>
            
          </View>
          <View style={styles.list}>
                <Text style={styles.textBold}>Allow members to post in a group</Text>
                <View style={{ margin: 20 }}>
                <Switch
                  value={form.is_post}
                  onValueChange={(text)=>this.addGroupForm("is_post", text)}
                />
                </View>
              </View>
              <View style={styles.list}>
                <Text style={styles.textBold}>Members can invite other members</Text>
                <View style={{ margin: 20 }}>
                <Switch
                  value={form.is_invite}
                  onValueChange={(text)=>this.addGroupForm("is_invite", text)}
                />
                </View>
              </View>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <TouchableOpacity
              disabled={form.title?false:true}
              style={[styles.primaryfilledbtn, form.title?{}:{backgroundColor:colors.gray}]}
              onPress={this.submitGroup}
            >
              <Text style={styles.primaryfilledbtntext}>Create Group</Text>
            </TouchableOpacity>

          </View>
        </KeyboardAwareScrollView>

        <AddGroupPrivacyStatus ref={this.actionSheetRef} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    form: state.Group.form,
    privacy:state.Group.privacy,
    user: typeof state.User.user !== "undefined" ? state.User.user : {},
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/GroupRedux");
  return {
    ...ownProps,
    ...stateProps,
    submitGroup: (data) => {
      actions.submitGroup(dispatch, data);
    },
    addGroupForm: (data) => {
      dispatch(actions.addGroupForm(data));
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(Groupcreate);