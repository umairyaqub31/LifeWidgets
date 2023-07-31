import * as React from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import styles from "./styles";
import { TextInput } from "react-native-paper";
import colors from "../../config/color/color";
import CountryPicker from "react-native-country-picker-modal";
import { Config } from "@common";
import { connect } from "react-redux";
import moment from "moment";

class AddBar extends React.Component {
  constructor() {
    super();
    this.state = {
      keywordsList: [],
      selectedButton: null,
    };
    this.selectionOnPress = this.selectionOnPress.bind(this);
  }

  componentDidMount() {
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

    this.props.fetchBarTypes();
    this.props.fetchBarServices();
    if (this.props.route.params) {
      let form = {};
      let hours = [];
      let item = this.props.route.params.item;
      form.b_id = item.id;
      form.b_name = item.name;
      form.b_address = item.address;
      form.b_city = item.city;
      form.b_state = item.state;
      form.b_postal_code = item.postal_code;
      form.b_country = item.country;
      form.b_type_id = item.bar_type_id;
      form.services = item.bar_services.map((service) => service.id);

      form.o_first_name = item.owner.first_name;
      form.o_last_name = item.owner.last_name;
      form.o_email_address = item.owner.email_address;
      form.o_state = item.owner.state;
      form.o_country = item.owner.country;
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

      this.props.addBarForm(form);
      console.log(form);
    }
  }

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
    this.props.addBarForm(form);
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
      "b_name",
      "b_address",
      "b_city",
      "b_state",
      "b_postal_code",
      "b_country",
      "b_type_id",
      "services",
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
      this.props.navigation.navigate("BarEdit");
    }
  };

  render() {
    let services = Object.assign([], this.props.form.services);
    const {
      activecustomchip,
      customchip,
      customchiptext,
      activecustomchiptext,
    } = styles;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrolledView}>
          <TextInput
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[
              styles.textinputrounded,
              styles.boxShadow,
              this.state.b_name ? { borderColor: "red", borderWidth: 1 } : {},
            ]}
            label="Business Name"
            value={this.props.form.b_name}
            onChangeText={(text) => this.addBarForm("b_name", text)}
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
            value={this.props.form.b_address}
            onChangeText={(text) => this.addBarForm("b_address", text)}
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
            value={this.props.form.b_city}
            onChangeText={(text) => this.addBarForm("b_city", text)}
          />
          <TextInput
            underlineColor={colors.lightGray}
            theme={{ colors: { primary: colors.primary } }}
            style={[
              styles.textinputrounded,
              styles.boxShadow,
              this.state.b_state ? { borderColor: "red", borderWidth: 1 } : {},
            ]}
            label="State"
            value={this.props.form.b_state}
            onChangeText={(text) => this.addBarForm("b_state", text)}
          />
          <TextInput
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
            value={this.props.form.b_postal_code}
            onChangeText={(text) => this.addBarForm("b_postal_code", text)}
          />

          <CountryPicker
            onSelect={(value) => {
              this.addBarForm("b_country", value.cca2);
            }}
            cca2={
              this.props.form.b_country != "null"
                ? this.props.form.b_country
                : ""
            }
            countryCode={
              this.props.form.b_country != "null"
                ? this.props.form.b_country
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
          <View style={[styles.BusinessConsider]}>
            <Text
              style={[
                styles.text,
                styles.textBold,
                this.state.b_type_id ? { color: "red" } : {},
              ]}
            >
              Bar Types:
            </Text>
          </View>
          {this.props.types.length > 0 && (
            <View style={styles.barSearchChips}>
              {this.props.types.map((item, key) => (
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
                  onPress={() => this.addBarForm("b_type_id", item.id)}
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
              Services:
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
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ Bar, User }) => {
  return {
    form: Bar.form,
    services: Bar.services,
    types: Bar.types,
    user: typeof User.user !== "undefined" ? User.user : {},
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/BarRedux");
  return {
    ...ownProps,
    ...stateProps,
    submitBar: (data) => {
      actions.submitBar(dispatch, data);
    },
    addBarForm: (data) => {
      dispatch(actions.addBarForm(data));
    },
    fetchBarTypes: () => {
      actions.fetchBarTypes(dispatch);
    },
    fetchBarServices: () => {
      actions.fetchBarServices(dispatch);
    },
    fetchBars: (per_page, page) => {
      actions.fetchBars(dispatch, per_page, page);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(AddBar);