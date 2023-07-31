import * as React from "react";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import styles from "./styles";
import { Divider } from "react-native-paper";
import colors from "../../config/color/color";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { connect } from "react-redux";

class AddBarLogoSetup extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headRightOpacity}
          onPress={this.submitBar}
        >
          <Text style={styles.headRightText}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }

  addLogo = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      this.addBarForm("logo", pickerResult);
    }
  };

  addBanner = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      this.addBarForm("banner", pickerResult);
    }
  };

  addBarForm = (key, value) => {
    let form = Object.assign({}, this.props.form);
    form[key] = value;
    this.props.addBarForm(form);
    console.log(form);
  };

  validation = () => {
    let flag = true;
    let array = [
      "logo",
      "banner",
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
          form[item] === "" ||
          form[item].length === 0
        ) {
          this.setState({ [item]: true });
          flag = false;
        } else {
          this.setState({ [item]: false });
        }
      }
    });

    if (flag) {
      this.submitBar();
    }
  };

  submitBar = () => {
    console.log(this.props.form);
    var formData = new FormData();
    let form = this.props.form;
    Object.keys(form).map(function (key) {
      if (key === "logo" && form[key]) {
        
        formData.append("logo", {
          uri: form[key].uri,
          type: form[key].type,
          name:
            form[key].filename ||
            `filename${key}.` + form[key].uri.split(".").pop(),
        });
      } else if (key === "banner" && form[key]) {
        formData.append("banner", {
          uri: form[key].uri,
          type: form[key].type,
          name:
            form[key].filename ||
            `filename${key}.` + form[key].uri.split(".").pop(),
        });
      } else if (key === "services") {
        form[key].forEach((item, i) => {
          formData.append("services[" + i + "]", item);
        });
      } else if (key === "hours") {
        form[key].forEach((item, i) => {
          formData.append("hours[" + i + "]", JSON.stringify(item));
        });
      } else {
        formData.append(key, form[key]);
      }
    });
    this.props.submitBar(formData);
    this.props.navigation.navigate("Bars");
  };

  removeLogo = () => {
    let form = Object.assign({}, this.props.form);
    form['logo'] = null;
    this.props.addBarForm(form);
  }

  removeBanner = () => {
    let form = Object.assign({}, this.props.form);
    form['banner'] = null;
    this.props.addBarForm(form);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.scrolledView}>
          <Divider style={styles.separator} />
          <View style={styles.Label}>
            <Text style={styles.heading}>Logo</Text>
            
            {this.props.form.logo?
              <View style={styles.list}>
                <TouchableOpacity onPress={this.removeLogo} style={{position:"absolute",right:0, top:-24,zIndex:1}}>
                  <Feather name="trash-2" size={24} color="black" />
                </TouchableOpacity>
                <Image
                  style={styles.logo}
                  source={{ uri: this.props.form.logo.uri }}
                />
              </View>
              :
              <TouchableOpacity
              style={[styles.list, styles.boxShadow]}
              onPress={this.addLogo}
            >
              <View style={styles.textinputrounded}>
                <Feather name="upload" size={34} color={colors.primary} />
                {this.state.logo &&
                <Text style={{color:"red"}}>Please upload logo</Text>
                }
              </View>
              </TouchableOpacity>
            }
              
            
          </View>
          <Divider style={styles.separator} />
          <View style={styles.Label}>
            <Text style={styles.heading}>Banner</Text>
            {this.props.form.banner?
              <TouchableOpacity style={styles.list}>
              <TouchableOpacity onPress={this.removeBanner} style={{position:"absolute",right:0,zIndex:1, top:-24}}>
                  <Feather name="trash-2" size={24}  color="black"  />
                </TouchableOpacity>
                <Image
                  style={styles.banner}
                  source={{ uri: this.props.form.banner.uri }}
                />
              </TouchableOpacity>:
              <TouchableOpacity
              style={[styles.list, styles.boxShadow]}
              onPress={this.addBanner}
            >
              <View style={styles.textinputrounded}>
                <Feather name="upload" size={34} color={colors.primary} />
                {this.state.banner &&
                <Text style={{color:"red"}}>Please upload banner</Text>
                }
              </View>
            </TouchableOpacity>
            }
            
          </View>
        </View>
      </ScrollView>
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
    submitBar: (data) => {
      actions.submitBar(dispatch, data);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(AddBarLogoSetup);