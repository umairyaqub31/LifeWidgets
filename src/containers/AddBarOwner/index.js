import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./styles";
import { TextInput } from "react-native-paper";
import colors from "../../config/color/color";
import CountryPicker from "react-native-country-picker-modal";

import { connect } from "react-redux";

class AddBarOwner extends React.Component {

  constructor() {
    super();
    this.state = {};
  }


  componentDidMount(){
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headRightOpacity}
          onPress={this.validation}
        >
          <Text style={styles.headRightText}>Next</Text>
        </TouchableOpacity>
      ),
    });

    let form = Object.assign({}, this.props.form);
    if(!this.props.form.o_first_name){
      form['o_first_name'] = this.props.user.first_name;
      this.props.addBarForm(form);
    }
    if(!this.props.form.o_last_name){
      form['o_last_name'] = this.props.user.last_name;
      this.props.addBarForm(form);
    }
    if(!this.props.form.o_email_address){
      form['o_email_address'] = this.props.user.email;
      this.props.addBarForm(form);
    }
    if(!this.props.form.o_state){
      form['o_state'] = form.b_state;
      this.props.addBarForm(form);
    }
    if(!this.props.form.o_country || this.props.form.o_country==="null"){
      form['o_country'] = form.b_country;
      this.props.addBarForm(form);
    }
  }
  addBarForm = (key, value) => {
    let form = Object.assign({}, this.props.form);
    form[key] = value;
    this.props.addBarForm(form);
    console.log(form);
  };

  validation = () => {
    let flag = true;
    let array = [
      "o_first_name",
      "o_last_name",
      "o_email_address",
      "o_state",
      "o_country",
    ];
    let form = Object.assign({}, this.props.form);
    array.map((item, key) => {
      if (!Object.keys(form).some((index) => index === item)) {
          this.setState({ [item]: true });
          flag = false;
      }
    });
    Object.keys(form).map((item) => {
      if (array.some((index) => index === item)) {
        if (
          form[item] === null ||
          form[item] === "null" ||
          form[item] === ""
        ) {
          this.setState({ [item]: true });
          flag = false;
        } else {
          this.setState({ [item]: false });
        }
      }
    });

    if (flag) {
      this.props.navigation.navigate("BarLogoSetup");
    }
  };

  render() {
    console.log(this.props.form)
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <View style={styles.scrolledView}>
          <TextInput
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[styles.textinputrounded, styles.boxShadow, this.state.o_first_name ? { borderColor: "red", borderWidth: 1 } : {},]}
            label="First Name"
            value={this.props.form.o_first_name}
            onChangeText={(text)=>this.addBarForm('o_first_name', text)}
          />
          <TextInput
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[styles.textinputrounded, styles.boxShadow, this.state.o_last_name ? { borderColor: "red", borderWidth: 1 } : {},]}
            label="Last Name"
            value={this.props.form.o_last_name}
            onChangeText={(text)=>this.addBarForm('o_last_name', text)}
          />
          <TextInput
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[styles.textinputrounded, styles.boxShadow, this.state.o_email_address ? { borderColor: "red", borderWidth: 1 } : {},]}
            label="E-mail"
            value={this.props.form.o_email_address}
            onChangeText={(text)=>this.addBarForm('o_email_address', text)}
          />
          <TextInput
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[styles.textinputrounded, styles.boxShadow, this.state.o_state ? { borderColor: "red", borderWidth: 1 } : {},]}
            label="State"
            value={this.props.form.o_state}
            onChangeText={(text)=>this.addBarForm('o_state', text)}
          />
          <CountryPicker
            onSelect={(value) => {
              console.log(value.cca2)
              this.addBarForm("o_country", value.cca2);
            }}
            cca2={(this.props.form.o_country!="null")?this.props.form.o_country:""}
            countryCode={(this.props.form.o_country!="null")?this.props.form.o_country:""}
            withCountryNameButton
            withAlphaFilter
            containerButtonStyle={[
              
              styles.textinputrounded,
              {justifyContent:"center",paddingLeft:10},
              this.state.o_country
                ? { borderColor: "red", borderWidth: 1 }
                : {},
            ]}
            
          />
          {/* <View style={styles.VipStatus}>
            <Text style={[styles.text, styles.textBold]}>
              VIP Status Lifetime Spend:
            </Text>
            <Text style={[styles.text, styles.textBold]}>$10,000</Text>
          </View>
          <View style={styles.list}>
            <Text style={styles.text}>
              This feature allows you to save reservations for your VIP’S. You
              may also award VIP status to any person of your choosing from the
              customer ranking report on your dash.
            </Text>
          </View> */}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({ Bar, User }) => {
  return {
    form: Bar.form,
    user: typeof User.user !== "undefined" ? User.user : {},
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/BarRedux");
  return {
    ...ownProps,
    ...stateProps,
    addBarForm: (data) => {
      dispatch(actions.addBarForm(data));
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(AddBarOwner);