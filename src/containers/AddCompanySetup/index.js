import * as React from "react";
import {
  Alert,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import styles from "./styles";
import { Divider } from "react-native-paper";
import colors from "../../config/color/color";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Dialog, {
  DialogContent,
  DialogTitle,
  ScaleAnimation,
} from "react-native-popup-dialog";
import { connect } from "react-redux";

class AddCompanySetup extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headRightOpacity}
          onPress={this.validation}
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
      this.addCompanyForm("logo", pickerResult);
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
      this.addCompanyForm("banner", pickerResult);
    }
  };

  addPhotos = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access camera roll is required!");
      return;
    }
    let photos = Object.assign([], this.props.form.photos);

    if (photos.length >= 10) {
      Alert.alert("Photos limit", "You have to upload upto 10 pictures", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    console.log(pickerResult);
    if (!pickerResult.cancelled) {
      photos.push(pickerResult);
    }
    this.addCompanyForm("photos", photos);
  };

  addCompanyForm = (key, value) => {
    let form = Object.assign({}, this.props.form);
    form[key] = value;
    this.props.addCompanyForm(form);
    console.log(form);
  };

  validation = () => {
    let flag = true;
    let array = ["photos"];
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
      if (key === "photos" && form[key]) {
        form[key].forEach((item, i) => {
          var uri =
            Platform.OS === "android" ? item.uri : item.uri.replace("", "");
          formData.append("photos[" + i + "]", {
            uri: uri,
            type: Platform.OS === "android" ? "image/jpg" : item.type,
            name: item.filename || `filename${i}.` + uri.split(".").pop(),
          });
        });
      } else if (key === "logo" && form[key]) {
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
    formData.append("screen","logoSetup");
    this.props.submitCompany(formData);
  };

  removeLogo = () => {
    let form = Object.assign({}, this.props.form);
    form["logo"] = null;
    this.props.addCompanyForm(form);
  };

  removeBanner = () => {
    let form = Object.assign({}, this.props.form);
    form["banner"] = null;
    this.props.addCompanyForm(form);
  };

  removePhoto = (index) => {
    let photos = [...this.props.form.photos];
    photos.splice(index, 1);
    this.addCompanyForm("photos", photos);
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.scrolledView}>
          <Divider style={styles.separator} />
          <View style={styles.Label}>
            <Text style={styles.heading}>Logo</Text>

            {this.props.form.logo ? (
              <View style={styles.list}>
                <TouchableOpacity
                  onPress={this.removeLogo}
                  style={{
                    position: "absolute",
                    right: 0,
                    top: -24,
                    zIndex: 1,
                  }}
                >
                  <Feather name="trash-2" size={24} color="black" />
                </TouchableOpacity>
                <Image
                  style={styles.logo}
                  source={{ uri: this.props.form.logo.uri }}
                />
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.list, styles.boxShadow]}
                onPress={this.addLogo}
              >
                <View style={styles.textinputrounded}>
                  <Feather name="upload" size={34} color={colors.primary} />
                  {this.state.logo && (
                    <Text style={{ color: "red" }}>Please upload logo</Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
          </View>
          <Divider style={styles.separator} />
          <View style={styles.Label}>
            <Text style={styles.heading}>Banner</Text>
            {this.props.form.banner ? (
              <TouchableOpacity style={styles.list}>
                <TouchableOpacity
                  onPress={this.removeBanner}
                  style={{
                    position: "absolute",
                    right: 0,
                    zIndex: 1,
                    top: -24,
                  }}
                >
                  <Feather name="trash-2" size={24} color="black" />
                </TouchableOpacity>
                <Image
                  style={styles.banner}
                  source={{ uri: this.props.form.banner.uri }}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.list, styles.boxShadow]}
                onPress={this.addBanner}
              >
                <View style={styles.textinputrounded}>
                  <Feather name="upload" size={34} color={colors.primary} />
                  {this.state.banner && (
                    <Text style={{ color: "red" }}>Please upload banner</Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
          </View>
          <Divider style={styles.separator} />
          <Text
            style={[styles.heading, this.state.photos ? { color: "red" } : {}]}
          >
            Photos
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {this.props.form.photos &&
              this.props.form.photos.length > 0 &&
              this.props.form.photos.map((item, key) => (
                <TouchableOpacity style={[styles.list]}>
                  <TouchableOpacity
                    onPress={() => this.removePhoto(key)}
                    style={{
                      position: "absolute",
                      right: 0,
                      zIndex: 1,
                      top: 0,
                    }}
                  >
                    <Feather name="trash-2" size={24} color={colors.gray} />
                  </TouchableOpacity>
                  <Image style={styles.photos} source={{ uri: item.uri }} />
                </TouchableOpacity>
              ))}
          </View>
          <TouchableOpacity
            style={[styles.list, styles.boxShadow]}
            onPress={this.addPhotos}
          >
            <View style={styles.textinputrounded}>
              <Feather name="upload" size={34} color={colors.primary} />
              {this.state.banner && (
                <Text style={{ color: "red" }}>Upload photos</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <Dialog
          dialogStyle={{ borderRadius: 24 }}
          width={0.7}
          visible={this.props.isProcessing}
          dialogAnimation={new ScaleAnimation()}
          onDismiss={() => {
            this.props.navigation.navigate("MyCompany");
          }}
          dialogTitle={
            <DialogTitle title={"Processing..."} hasTitleBar={false} />
          }
        >
          <DialogContent>
            <ActivityIndicator size="large" color={colors.primary} />
          </DialogContent>
        </Dialog>
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ Company, User }) => {
  return {
    form: Company.form,
    isProcessing: Company.isProcessing,
    user: typeof User.user !== "undefined" ? User.user : {},
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CompanyRedux");
  return {
    ...ownProps,
    ...stateProps,
    addCompanyForm: (data) => {
      dispatch(actions.addCompanyForm(data));
    },
    submitCompany: (data) => {
      actions.submitCompany(dispatch, data);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(AddCompanySetup);