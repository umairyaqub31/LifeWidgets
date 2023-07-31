import * as React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View, ScrollView } from "react-native";
import styles from "./styles";
import { TextInput } from "react-native-paper";
import colors from "../../config/color/color";
import CountryPicker from "react-native-country-picker-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Picker } from "@react-native-picker/picker";
import { Config } from "@common";
import { connect } from "react-redux";
import moment from "moment";
import {  OptimizeImage } from "@helpers";
import { StateModal } from "@components";
import Dialog, {
  DialogContent,
  DialogTitle,
  ScaleAnimation,
} from "react-native-popup-dialog";

class AddCompany extends React.Component {
  constructor() {
    super();
    this.state = {
      keywordsList: [],
      selectedButton: null,
    };
    this.selectionOnPress = this.selectionOnPress.bind(this);
  }

  componentDidMount() {
    let is_edit = false;
    if (typeof this.props.route.params.item !=="undefined") {
      is_edit = true;
    }
    this.props.navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headertitle}>
          <Text style={styles.headertitleText}>{is_edit?"Edit Company Info":"Add Company"}</Text>
        </View>
      ),
      headerRight: () => (
        <TouchableOpacity
          style={styles.headRightOpacity}
          onPress={this.validation}
        >
          <Text style={styles.headRightText}>Save</Text>
        </TouchableOpacity>
      ),
    });
    this.props.fetchBarTypes();
    this.props.fetchBarServices();
    this.props.fetchCompanyTypes();
    if (typeof this.props.route.params.item !=="undefined") {
      let form = {};
      let hours = [];
      let item = this.props.route.params.item;
      form.b_id = item.id;
      form.b_name = item.name;
      form.b_address = item.address;
      form.b_city = item.city;
      form.b_state = item.state;
      form.b_postal_code = item.postal_code;
      form.phone_number = item.phone_number;
      form.website = item.website=="null"?"":item.website;
      form.b_country = item.country;
      if (item.bar_type_id) {
        form.b_type_id = item.bar_type_id;
      }
      var photos = [];
      if (item.photos && item.photos.length > 0) {
        item.photos.map((item, key) => {
          photos.push({
            ...item,
            uri: OptimizeImage(item.attachment_url),
          });
        });
      }
      form.photos = photos;
      form.type = item.type;
      form.services = item.bar_services.map((service) => service.id);

      if (item.bar_hours.length > 0) {
        item.bar_hours.map((hour, key) => {
          hours.push({
            day: hour.day,
            is_open: hour.is_open,
            open_time: moment.utc(hour.open_time).local().toDate(),
            close_time: moment.utc(hour.close_time).local().toDate(),
          });
        });
      }
      form.hours = hours;

      form.logo = item.logo
        ? {
            ...item.logo,
            uri: Config.lifeWidget.url + "/" + item.logo.attachment_url,
          }
        : null;
      form.banner = item.banner
        ? {
            ...item.banner,
            uri: Config.lifeWidget.url + "/" + item.banner.attachment_url,
          }
        : null;

      this.props.addCompanyForm(form);
      console.log(form);
    } else {
      this.props.addCompanyForm({})      
    }
  }

  focus = () => {};

  serviceChipHandle = (keyword) => {
    const { keywordsList } = this.state;
    let list = keywordsList;
    let index = -1;
    if ((index = keywordsList.indexOf(keyword)) != -1) {
      list.splice(index, 1);
    } else {
      list.push(keyword);
    }
    this.setState({ keywordsList: list });
  };

  selectionOnPress(userType) {
    this.setState({ selectedButton: userType });
  }

  addServices = (id) => {
    let form = Object.assign({}, this.props.form);
    let checked = Object.assign([], form.services);

    let found = checked.find((data) => data === id);
    if (!found) {
      checked.push(id);
    } else {
      checked = checked.filter((data) => data !== id);
    }
    form.services = checked;
    this.props.addCompanyForm(form);
  };

  addCompanyForm = (key, value) => {
    let form = Object.assign({}, this.props.form);
    form[key] = value;
    this.props.addCompanyForm(form);
    if (key == "type" && (value === "bar" || value === "bar_restaurant")) {
      setTimeout(() => this.scrollView.scrollToEnd({ animated: true }), 1000);
    }
  };

  validation = () => {
    let flag = true;
    let array = [
      "b_name",
      "b_address",
      "b_city",
      "b_state",
      "b_postal_code",
      "b_country",
      "type",
      "phone_number",
    ];
    let form = Object.assign({}, this.props.form);
    if (form.type == "bar" || form.type == "bar_restaurant") {
      array.push("b_type_id");
      array.push("services");
    }
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
      console.log(this.props.form);
    var formData = new FormData();
    Object.keys(form).map(function (key) {
      if (key === "services") {
        form[key].forEach((item, i) => {
          formData.append("services[" + i + "]", item);
        });
      }  else {
        formData.append(key, form[key]);
      }
    });
    formData.append("screen", "info");
    //alert(JSON.stringify(formData, null,2))
    this.props.submitCompany(formData);
      //this.props.navigation.navigate("BusinessHour");
    }
  };

  render() {
    let services = Object.assign([], this.props.form.services);
    let form = Object.assign({}, this.props.form);
    const {
      activecustomchip,
      customchip,
      customchiptext,
      activecustomchiptext,
    } = styles;
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <ScrollView
          ref={(ref) => {
            this.scrollView = ref;
          }}
          style={styles.scrolledView}
        >
          <TextInput
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[
              styles.textinputrounded,
              styles.boxShadow,
              this.state.b_name ? { borderColor: "red", borderWidth: 1 } : {},
            ]}
            label="Business Name"
            value={this.props.form.b_name??""}
            onChangeText={(text) => this.addCompanyForm("b_name", text)}
          />
          <TextInput
            keyboardType="phone-pad"
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[
              styles.textinputrounded,
              styles.boxShadow,
              this.state.phone_number
                ? { borderColor: "red", borderWidth: 1 }
                : {},
            ]}
            label="Phone Number"
            value={this.props.form.phone_number??""}
            onChangeText={(text) => this.addCompanyForm("phone_number", text)}
          />

          <TextInput
            keyboardType="url"
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[
              styles.textinputrounded,
              styles.boxShadow,
              this.state.website
                ? { borderColor: "red", borderWidth: 1 }
                : {},
            ]}
            label="Website URL (optional)"
            value={this.props.form.website??""}
            onChangeText={(text) => this.addCompanyForm("website", text)}
          />
          <TextInput
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[
              styles.textinputrounded,
              styles.boxShadow,
              this.state.b_address
                ? { borderColor: "red", borderWidth: 1 }
                : {},
            ]}
            label="Address"
            value={this.props.form.b_address??""}
            onChangeText={(text) => this.addCompanyForm("b_address", text)}
          />
          <TextInput
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[
              styles.textinputrounded,
              styles.boxShadow,
              this.state.b_city ? { borderColor: "red", borderWidth: 1 } : {},
            ]}
            label="City"
            value={this.props.form.b_city??""}
            onChangeText={(text) => this.addCompanyForm("b_city", text)}
          />
          <CountryPicker
            onSelect={(value) => {
              this.addCompanyForm("b_country", value.cca2);
              setTimeout(() => this.addCompanyForm("b_state", ""), 500);
            }}
            cca2={
              (this.props.form.b_country && this.props.form.b_country != "null")
                ? this.props.form.b_country??""
                : ""
            }
            countryCode={
              (this.props.form.b_country && this.props.form.b_country != "null")
                ? this.props.form.b_country??""
                : ""
            }
            withCountryNameButton
            withAlphaFilter
            containerButtonStyle={[
              styles.textinputrounded,
              { justifyContent: "center", paddingLeft: 10 },
              this.state.b_country
                ? { borderColor: "red", borderWidth: 1 }
                : {},
            ]}
          />
          {/* <TextInput
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[
              styles.textinputrounded,
              styles.boxShadow,
              this.state.b_state ? { borderColor: "red", borderWidth: 1 } : {},
            ]}
            label="State"
            value={this.props.form.b_state}
            onChangeText={(text) => this.addCompanyForm("b_state", text)}
          /> */}

          <StateModal
            style={[
              styles.textinputrounded,
              { justifyContent: "center", paddingLeft: 10 },
              this.state.b_state ? { borderColor: "red", borderWidth: 1 } : {},
            ]}
            b_state={this.props.form.b_state}
            addCompanyForm={this.addCompanyForm}
            countryCode={this.props.form.b_country}
          />

          <TextInput
            keyboardType="numbers-and-punctuation"
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[
              styles.textinputrounded,
              styles.boxShadow,
              this.state.b_postal_code
                ? { borderColor: "red", borderWidth: 1 }
                : {},
            ]}
            label="Zip Code"
            value={this.props.form.b_postal_code??""}
            onChangeText={(text) => this.addCompanyForm("b_postal_code", text)}
          />

          

          <View style={[styles.BusinessConsider]}>
            <Text
              style={[
                styles.text,
                styles.textBold,
                this.state.type ? { color: "red" } : {},
              ]}
            >
              Business Type
            </Text>
          </View>
          <View>
            {this.props.types.length > 0 && (
              <Picker
                selectedValue={this.props.form.type}
                //style={{ height: 50, width: 150 }}
                onValueChange={(itemValue, itemIndex) =>
                  this.addCompanyForm("type", itemValue)
                }
              >
                <Picker.Item label={"Select type"} value={""} />
                {this.props.types.map((item, key) => {
                  return (
                    <Picker.Item
                      key={key}
                      label={item.name}
                      value={item.code}
                    />
                  );
                })}
              </Picker>
            )}
          </View>
          {(form.type === "bar" || form.type === "bar_restaurant") && (
            <>
              <View style={[styles.BusinessConsider]}>
                <Text
                  style={[
                    styles.text,
                    styles.textBold,
                    this.state.b_type_id ? { color: "red" } : {},
                  ]}
                >
                  Bar Type
                </Text>
              </View>
              {this.props.bar_types.length > 0 && (
                <View style={styles.barSearchChips}>
                  {this.props.bar_types.map((item, key) => (
                    <TouchableOpacity
                      key={key}
                      style={[
                        styles.customchip,
                        {
                          backgroundColor:
                            this.props.form.b_type_id === item.id
                              ? colors.primary
                              : colors.lightGray,
                        },
                      ]}
                      onPress={() => this.addCompanyForm("b_type_id", item.id)}
                    >
                      <Text
                        style={[
                          styles.customchiptext,
                          {
                            color:
                              this.props.form.b_type_id === item.id
                                ? colors.white
                                : colors.black,
                          },
                        ]}
                      >
                        {item.type_name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              <View style={[styles.BusinessConsider]}>
                <Text
                  style={[
                    styles.text,
                    styles.textBold,
                    this.state.services ? { color: "red" } : {},
                  ]}
                >
                  Bar Services
                </Text>
              </View>
              <View style={styles.barSearchChips}>
                {this.props.services.map((item, key) => (
                  <TouchableOpacity
                    key={key}
                    style={
                      services.find((element) => element == item.id)
                        ? activecustomchip
                        : customchip
                    }
                    onPress={() => this.addServices(item.id)}
                  >
                    <Text
                      style={
                        services.find((element) => element == item.id)
                          ? activecustomchiptext
                          : customchiptext
                      }
                    >
                      {item.service_name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </ScrollView>
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
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = ({ Company, Bar, User }) => {
  return {
    form: Company.form,
    isProcessing: Company.isProcessing,
    types: Company.types,
    services: Bar.services,
    bar_types: Bar.types,
    user: typeof User.user !== "undefined" ? User.user : {},
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CompanyRedux");
  const { actions: barActions } = require("@redux/BarRedux");
  return {
    ...ownProps,
    ...stateProps,
    submitCompany: (data) => {
      actions.submitCompany(dispatch, data);
    },
    addCompanyForm: (data) => {
      dispatch(actions.addCompanyForm(data));
    },
    fetchCompanyTypes: () => {
      actions.fetchCompanyTypes(dispatch);
    },
    fetchBarTypes: () => {
      barActions.fetchBarTypes(dispatch);
    },
    fetchBarServices: () => {
      barActions.fetchBarServices(dispatch);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(AddCompany);