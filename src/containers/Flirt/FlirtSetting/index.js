import * as React from "react";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import Dialog, {
  DialogContent,
  DialogTitle,
  ScaleAnimation,
} from "react-native-popup-dialog";
import styles from "./styles";
import { RadioButton, Divider, Switch } from "react-native-paper";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
import { connect } from "react-redux";
import RangeSlider from "react-native-range-slider-expo";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { OptimizeImage } from "@helpers";

class FlirtSetting extends React.Component {
  constructor(props) {
    super(props);
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

    this.props.setDefaultLoader();
    this.props.flirtSettings();
  }

  addPhotos = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access camera roll is required!");
      return;
    }

    let photos = Object.assign([], this.props.form.photos);

    if (photos.length >= 5) {
      Alert.alert("Picture limit", "You have to upload upto 5 pictures", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!pickerResult.cancelled) {
      photos.push(pickerResult);
    }
    this.addFlirtForm("photos", photos);
  };

  addFlirtForm = (key, value) => {
    let form = Object.assign({}, this.props.form);
    form[key] = value;
    this.props.addFlirtForm(form);
  };

  removePhoto = (index) => {
    let photos = [...this.props.form.photos];
    photos.splice(index, 1);
    this.addFlirtForm("photos", photos);
  };

  submitFlirt = () => {
    var formData = new FormData();
    const form = Object.assign({}, this.props.form);

    Object.keys(form).map(function (key) {
      if (key === "photos" && form[key]) {
        form[key].forEach((item, i) => {
          var uri =
            Platform.OS === "android"
              ? item.id
                ? OptimizeImage(item.attachment_url)
                : item.uri
              : item.id
              ? OptimizeImage(item.attachment_url).replace("", "")
              : item.uri.replace("", "");
          formData.append("photos[" + i + "]", {
            uri: uri,
            type: Platform.OS === "android" ? "image/jpg" : item.type,
            name: item.filename || `filename${i}.` + uri.split(".").pop(),
          });
        });
      } else {
        formData.append(key, form[key]);
      }
    });

    this.props.submitFlirt(formData);
  };

  validation = () => {
    let flag = true;
    let array = [
      "is_fname_visible",
      "is_lname_visible",
      "is_age_visible",
      "looking_for_gender",
      "looking_for",
      "about_me",
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
      this.submitFlirt();
      if(this.props.route && this.props.route.params &&
          typeof(this.props.route.params.onRefresh !== 'undefined')){
        this.props.route.params.onRefresh();
      }
    }
  };

  render() {
    const form = Object.assign({}, this.props.form);
    const photos = Object.assign([], this.props.form.photos);
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView style={styles.scrolledview}>
          <View style={styles.flirtList}>
            <Text style={styles.textBold}>Flirt Mode</Text>
            <Switch
              value={form.in_flirt_mode == 1 ? true : false}
              onValueChange={(e) =>
                this.addFlirtForm("in_flirt_mode", e ? 1 : 0)
              }
            />
          </View>
          {form.in_flirt_mode == 1 ? (
            <>
              <View style={[styles.list, styles.noMargin]}>
                <Text style={styles.text}></Text>
                <View style={styles.RadioButton}>
                  <Text
                    style={[styles.text, { fontFamily: FontFamily.Medium }]}
                  >
                    On
                  </Text>
                  <Text
                    style={[styles.text, { fontFamily: FontFamily.Medium }]}
                  >
                    Off
                  </Text>
                </View>
              </View>
              <View style={styles.list}>
                <Text
                  style={[
                    styles.text,
                    this.state.is_fname_visible ? { color: "red" } : {},
                  ]}
                >
                  My First Name
                </Text>
                <RadioButton.Group
                  onValueChange={(e) =>{

                    this.addFlirtForm("is_fname_visible", e)
                    if(e===0){
                      setTimeout(
                        () => this.addFlirtForm("is_lname_visible", 1),
                        200
                      );
                    }

                  }
                  }
                  value={form.is_fname_visible}
                >
                  <View style={styles.RadioButton}>
                    <RadioButton.Android
                      uncheckedColor={colors.primary}
                      color={colors.primary}
                      value={1}
                    />
                    <RadioButton.Android
                      uncheckedColor={colors.primary}
                      color={colors.primary}
                      value={0}
                    />
                  </View>
                </RadioButton.Group>
              </View>
              <View style={styles.list}>
                <Text
                  style={[
                    styles.text,
                    this.state.is_lname_visible ? { color: "red" } : {},
                  ]}
                >
                  My Last Name
                </Text>
                <RadioButton.Group
                  onValueChange={(e) =>{
                    this.addFlirtForm("is_lname_visible", e)
                    if(e===0){
                      setTimeout(
                        () => this.addFlirtForm("is_fname_visible", 1),
                        200
                      );
                    }
                  }}
                  value={form.is_lname_visible}
                >
                  <View style={styles.RadioButton}>
                    <RadioButton.Android
                      uncheckedColor={colors.primary}
                      color={colors.primary}
                      value={1}
                    />
                    <RadioButton.Android
                      uncheckedColor={colors.primary}
                      color={colors.primary}
                      value={0}
                    />
                  </View>
                </RadioButton.Group>
              </View>
              <View style={[styles.list, styles.noMargin]}>
                <Text
                  style={[
                    styles.text,
                    this.state.is_age_visible ? { color: "red" } : {},
                  ]}
                >
                  My Age
                </Text>
                <RadioButton.Group
                  onValueChange={(e) => this.addFlirtForm("is_age_visible", e)}
                  value={form.is_age_visible}
                >
                  <View style={styles.RadioButton}>
                    <RadioButton.Android
                      uncheckedColor={colors.primary}
                      color={colors.primary}
                      value={1}
                    />
                    <RadioButton.Android
                      uncheckedColor={colors.primary}
                      color={colors.primary}
                      value={0}
                    />
                  </View>
                </RadioButton.Group>
              </View>
              <Divider style={styles.separator} />
              <View style={styles.list}>
                <Text
                  style={[
                    styles.text,
                    this.state.nick_name ? { color: "red" } : {},
                  ]}
                >
                  Nickname
                </Text>
                <TextInput
                  style={[styles.roundedtextinput, styles.boxShadow]}
                  placeholder="Nickname"
                  placeholderTextColor={colors.gray}
                  value={form.nick_name}
                  onChangeText={(text) => this.addFlirtForm("nick_name", text)}
                />
              </View>
              <View style={styles.list}>
                <Text
                  style={[
                    styles.text,
                    this.state.looking_for_gender ? { color: "red" } : {},
                  ]}
                >{"I am looking for"}</Text>
                <RadioButton.Group
                  onValueChange={(e) =>
                    this.addFlirtForm("looking_for_gender", e)
                  }
                  value={form.looking_for_gender}
                >
                  <View style={[styles.RadioButton, { minWidth: 160 }]}>
                    <View style={styles.genderSelect}>
                      <Text style={styles.genderSelectText}>Men</Text>
                      <RadioButton.Android
                        uncheckedColor={colors.primary}
                        color={colors.primary}
                        value="male"
                      />
                    </View>
                    <View style={styles.genderSelect}>
                      <Text style={styles.genderSelectText}>Women</Text>
                      <RadioButton.Android
                        uncheckedColor={colors.primary}
                        color={colors.primary}
                        value="female"
                      />
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              <TextInput
                multiline
                numberOfLines={3}
                style={[
                  styles.roundedtextArea,
                  this.state.looking_for
                    ? { borderColor: "red", borderWidth: 1 }
                    : {},
                ]}
                placeholder="Looking For"
                placeholderTextColor={colors.gray}
                value={form.looking_for}
                onChangeText={(text) => this.addFlirtForm("looking_for", text)}
              />
              <View style={styles.list}>
                <Text style={styles.text}>About Me</Text>
              </View>
              <TextInput
                multiline
                numberOfLines={3}
                style={[
                  styles.roundedtextArea,
                  this.state.about_me
                    ? { borderColor: "red", borderWidth: 1 }
                    : {},
                ]}
                placeholder="About"
                placeholderTextColor={colors.gray}
                value={form.about_me}
                onChangeText={(text) => this.addFlirtForm("about_me", text)}
              />
              <View style={[styles.list, styles.noMargin]}>
                <View>
                  <Text style={styles.text}>Pictures</Text>
                  <Text style={styles.textGray}>(Choose upto 5)</Text>
                </View>
                <View style={styles.addImageGrid}>
                  <View style={styles.uploadedImage}>
                    {photos &&
                      photos.map((item, key) => (
                        <View key={key}>
                          <TouchableOpacity
                            style={styles.close}
                            onPress={() => this.removePhoto(key)}
                          >
                            <AntDesign
                              name="closecircle"
                              size={18}
                              color="red"
                            />
                          </TouchableOpacity>
                          <Image
                            style={styles.addImage}
                            source={{
                              uri: item.id
                                ? OptimizeImage(item.attachment_url)
                                : item.uri,
                            }}
                          />
                        </View>
                      ))}
                  </View>
                  <TouchableOpacity
                    style={styles.addImage}
                    onPress={this.addPhotos}
                  >
                    <AntDesign name="plus" size={18} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
              <Divider style={styles.separator} />

              <Text style={styles.textBold}>Criteria </Text>
              <View>
                <Text style={[styles.textGray, styles.alignCenter]}>
                  Age Search
                </Text>
                <>
                  <View style={{ height: 60 }}>
                    <RangeSlider
                      min={18}
                      max={65}
                      fromValueOnChange={(e) => this.addFlirtForm("min_age", e)}
                      toValueOnChange={(e) => this.addFlirtForm("max_age", e)}
                      initialFromValue={form.min_age}
                      initialToValue={form.max_age}
                      step={1}
                      inRangeBarColor={colors.primary}
                      fromKnobColor={colors.primary}
                      toKnobColor={colors.primary}
                      valueLabelsBackgroundColor={colors.primary}
                      outOfRangeBarColor={colors.gray}
                      styleSize={35}
                      showRangeLabels={false}
                    />
                  </View>
                  <View style={[styles.list,{marginTop:10}]}>
                    <Text style={styles.textBold}>{form.min_age} Years</Text>
                    <Text style={styles.textBold}>
                      {form.max_age} {form.max_age > 64 ? "+Years" : "Year"}
                    </Text>
                  </View>
                </>
              </View>
              <Divider style={[styles.separator, styles.noMarginTop]} />
              <View style={{ marginBottom: 30 }}>
                <Text style={[styles.textGray, styles.alignCenter]}>
                  Distance
                </Text>
                <>
                  <View>
                    <Picker
                      selectedValue={form.max_distance}
                      onValueChange={(itemValue, itemIndex) =>
                        this.addFlirtForm("max_distance", itemValue)
                      }
                    >
                      <Picker.Item label="Select distance" value="" />
                      <Picker.Item label="50 feet" value={50} />
                      <Picker.Item label="300 feet" value={300} />
                      <Picker.Item label="500 feet" value={500} />
                      <Picker.Item label="1 mile" value={1} />
                      <Picker.Item label="3 miles" value={3} />
                      <Picker.Item label="5 miles" value={5} />
                      <Picker.Item label="10 miles" value={10} />
                    </Picker>

                    {/* <RangeSlider
                      min={0}
                      max={10}
                      fromValueOnChange={(e) =>
                        this.addFlirtForm("min_distance", e)
                      }
                      toValueOnChange={(e) =>
                        this.addFlirtForm("max_distance", e)
                      }
                      initialFromValue={form.min_distance}
                      initialToValue={form.max_distance}
                      step={1}
                      inRangeBarColor={colors.primary}
                      fromKnobColor={colors.primary}
                      toKnobColor={colors.primary}
                      valueLabelsBackgroundColor={colors.primary}
                      outOfRangeBarColor={colors.gray}
                      styleSize={22}
                      showRangeLabels={false}
                    /> */}
                  </View>
                  {/* <View style={styles.list}>
                    <Text style={styles.textBold}>
                      {form.min_distance} {form.min_distance>1?"Feets":"Feet"}
                    </Text>
                    <Text style={styles.textBold}>
                      {form.max_distance} {form.max_distance>1?"Miles":"Mile"}
                    </Text>
                  </View> */}
                </>
              </View>
            </>
          ) : null}
        </KeyboardAwareScrollView>
        <Dialog
          dialogStyle={{ borderRadius: 24 }}
          width={0.7}
          visible={this.props.isProcessing}
          dialogAnimation={new ScaleAnimation()}
          onDismiss={() => {
            this.props.navigation.navigate("FlirtCandidates");
          }}
          dialogTitle={<DialogTitle title={"Saving..."} hasTitleBar={false} />}
        >
          <DialogContent>
            <ActivityIndicator size="large" color={colors.primary} />
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.User.user,
    form: state.Flirt.form,
    isProcessing: state.Flirt.isProcessing,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/FlirtRedux");
  return {
    ...ownProps,
    ...stateProps,
    addFlirtForm: (items) => {
      dispatch(actions.addFlirtForm(items));
    },
    setDefaultLoader: () => {
      dispatch(actions.setDefaultLoader());
    },
    submitFlirt: (items) => {
      actions.submitFlirt(dispatch, items);
    },
    flirtSettings: () => {
      actions.flirtSettings(dispatch);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(FlirtSetting);
