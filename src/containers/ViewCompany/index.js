import * as React from "react";
import { Text, TouchableOpacity, View, ScrollView, Image } from "react-native";
import styles from "./styles";
import { Config, Color } from "@common";
import moment from "moment";
import {
  Feather,
} from "@expo/vector-icons";
import { connect } from "react-redux";
import {  OptimizeImage } from "@helpers";

class ViewCompany extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    if (typeof this.props.route.params.item !=="undefined") {
      this.props.navigation.setOptions({
        headerRight: () => (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("AddCompany", {item:this.props.route.params.item})}
              style={[styles.headRight, styles.chipOpcity]}
            >
              <Feather name="edit" size={18} color={Color.primary}  />
            </TouchableOpacity>
          </View>
        ),
        headerTitle: () => (
          <View style={styles.headertitle}>
            <Text numberOfLines={1} style={styles.headertitleText}>{item.name}</Text>
          </View>
        ),
      });

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
      form.type = item.type;
      form.services = item.bar_services.map((service) => service.id);
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
    }
  }

  navigateTohours = () => {
    this.props.navigation.navigate("BusinessHour")
  }

  navigateToSetup = () => {
    this.props.navigation.navigate("AddCompanySetup")
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.pillscontainer}>
            <TouchableOpacity
              style={styles.menuscreenpills}
              onPress={this.navigateTohours}
            >
              <Image
                style={styles.menuImage}
                source={require("../../../assets/images/BizHours.png")}
              />
              <Text style={styles.menuscreenpillstext}>Biz Hours</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuscreenpills}
              onPress={this.navigateToSetup}
            >
              <Image
                style={styles.menuImage}
                source={require("../../../assets/images/LogoPhotos.png")}
              />
              <Text style={styles.menuscreenpillstext}>Logo & Banner</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuscreenpills}
              onPress={() => this.props.navigation.navigate("PostJob")}
            >
              <Image
                style={styles.menuImage}
                source={require("../../../assets/images/PostJob.png")}
              />
              <Text style={styles.menuscreenpillstext}>Post a Job</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuscreenpills}
              onPress={() => this.props.navigation.navigate("MyJobPosting")}
            >
              <Image
                style={styles.menuImage}
                source={require("../../../assets/images/MyJobsPosting.png")}
              />
              <Text style={styles.menuscreenpillstext}>My Job Postings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuscreenpills}
              onPress={() => this.props.navigation.navigate("Advertising")}
            >
              <Image
                style={styles.menuImage}
                source={require("../../../assets/images/Advertising.png")}
              />
              <Text style={styles.menuscreenpillstext}>Advertising</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuscreenpills}
            >
              <Image
                style={styles.menuImage}
                source={require("../../../assets/images/my_employees.png")}
              />
              <Text style={styles.menuscreenpillstext}>My Employees</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.menuscreenpills}
              onPress={() => this.props.navigation.navigate("MyJobPosting")}
            >
              <Image
                style={styles.menuImage}
                source={require("../../../assets/images/my_keywords.png")}
              />
              <Text style={styles.menuscreenpillstext}>My Keywords</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CompanyRedux");
  return {
    ...ownProps,
    ...stateProps,
    addCompanyForm: (data) => {
      dispatch(actions.addCompanyForm(data));
    },
  };
};
export default connect(undefined, undefined, mergeProps)(ViewCompany);
