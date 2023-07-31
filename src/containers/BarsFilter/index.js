import * as React from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import styles from "./styles";
import colors from "../../config/color/color";
import { Checkbox } from "react-native-paper";
import { connect } from "react-redux";
import RangeSlider from "react-native-range-slider-expo";
import { Picker } from "@react-native-picker/picker";

class BarsFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywordsList: [],
      checked: [],
      Distance: 10,
      min_distance: 0,
      max_distance: 10,
    };
  }

  componentDidMount() {
    console.log(this.props.route.params);
    this.setState({
      keywordsList: this.props.route.params.filters,
      checked: this.props.route.params.checked,
      Distance: this.props.route.params.Distance,
    });
  }

  changeFilters = (keyword) => {
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

  distanceSliderChange = (Distance) => {
    this.setState({ Distance: Distance });
  };

  distanceFromSliderChange = (Distance) => {
    this.setState({ min_distance: Distance });
  };

  distanceToSliderChange = (Distance) => {
    this.setState({ Distance: Distance });
  };

  applyFilters = () => {
    this.props.route.params.applyFilters(
      this.state.keywordsList,
      this.state.Distance
    );
    this.props.navigation.navigate("Bars");
  };

  applyServices = (item) => {
    this.props.route.params.applyFilterServices(item);
    this.props.navigation.navigate("Bars");
  };

  render() {
    const checked = !this.props.checked ? "checked" : "unchecked";
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrolledview}>
          <View style={[styles.filterList, styles.noPadding]}>
            <TouchableOpacity>
              <Text style={styles.text}>Heighest Occupancy Rate</Text>
            </TouchableOpacity>
            <Checkbox.Android
              uncheckedColor={colors.primary}
              color={colors.primary}
              status={
                this.state.keywordsList.find(
                  (data) => data === "occupancy_rate"
                )
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => this.changeFilters("occupancy_rate")}
            />
          </View>
          <View style={styles.filterList}>
            <TouchableOpacity>
              <Text style={styles.text}>Highest Oppiste M/F Ratio</Text>
            </TouchableOpacity>
            <Checkbox.Android
              uncheckedColor={colors.primary}
              color={colors.primary}
              status={
                this.state.keywordsList.find(
                  (data) => data === "opposite_ratio"
                )
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => this.changeFilters("opposite_ratio")}
            />
          </View>
          <View style={styles.filterList}>
            <TouchableOpacity>
              <Text style={styles.text}>My Friends Present</Text>
            </TouchableOpacity>
            <Checkbox.Android
              uncheckedColor={colors.primary}
              color={colors.primary}
              status={
                this.state.keywordsList.find(
                  (data) => data === "friend_present"
                )
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => this.changeFilters("friend_present")}
            />
          </View>
          <View style={styles.filterList}>
            <TouchableOpacity>
              <Text style={styles.text}>Young to Oldest</Text>
            </TouchableOpacity>
            <Checkbox.Android
              uncheckedColor={colors.primary}
              color={colors.primary}
              status={
                this.state.keywordsList.find(
                  (data) => data === "young_to_oldest"
                )
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => this.changeFilters("young_to_oldest")}
            />
          </View>
          {this.props.services.length > 0 &&
            this.props.services
              .filter((book) =>
                ["female", "dot-circle"].includes(book.service_code)
              )
              .map((item, key) => (
                <View style={styles.filterList} key={key}>
                  <TouchableOpacity>
                    <Text style={styles.text}>{item.service_name}</Text>
                  </TouchableOpacity>
                  <Checkbox.Android
                    uncheckedColor={colors.primary}
                    color={colors.primary}
                    onPress={() => this.applyServices(item)}
                    status={
                      this.state.checked.find((data) => data.id === item.id)
                        ? "checked"
                        : "unchecked"
                    }
                  />
                </View>
              ))}

          <View style={styles.filterList}>
            <TouchableOpacity>
              <Text style={styles.text}>Hide my self</Text>
            </TouchableOpacity>
            <Checkbox.Android
              uncheckedColor={colors.primary}
              color={colors.primary}
              status={
                this.state.keywordsList.find((data) => data === "hide_my_self")
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => this.changeFilters("hide_my_self")}
            />
          </View>
          <View
            style={{ flex: 1, alignItems: "stretch", justifyContent: "center" }}
          >
            <TouchableOpacity>
              <Text style={styles.text}>Distance:</Text>
            </TouchableOpacity>
            <Picker
              selectedValue={this.state.Distance}
              onValueChange={(itemValue, itemIndex) =>
                this.distanceToSliderChange(itemValue)
              }
            >
              <Picker.Item label="Select distance" value="" />
              <Picker.Item label="1 mile" value={1} />
              <Picker.Item label="3 miles" value={3} />
              <Picker.Item label="5 miles" value={5} />
              <Picker.Item label="10 miles" value={10} />
              <Picker.Item label="15 miles" value={15} />
              <Picker.Item label="20 miles" value={20} />
              <Picker.Item label="25 miles" value={25} />
              <Picker.Item label="30 miles" value={30} />
              <Picker.Item label="50 miles" value={50} />
              <Picker.Item label="100 miles" value={100} />
            </Picker>
            {/* <RangeSlider
              min={0}
              max={10}
              fromValueOnChange={(e) => this.distanceFromSliderChange(e)}
              toValueOnChange={(e) => this.distanceToSliderChange(e)}
              initialFromValue={this.state.min_distance}
              initialToValue={this.state.max_distance}
              step={1}
              inRangeBarColor={colors.primary}
              fromKnobColor={colors.primary}
              toKnobColor={colors.primary}
              valueLabelsBackgroundColor={colors.primary}
              outOfRangeBarColor={colors.gray}
              styleSize={22}
              showRangeLabels={false}
            />
            <View style={styles.list}>
              <Text style={styles.textBold}>
                {this.state.min_distance}{" "}
                {this.state.min_distance > 1 ? "Feets" : "Feet"}
              </Text>
              <Text style={styles.textBold}>
                {this.state.max_distance}{" "}
                {this.state.max_distance > 1 ? "Miles" : "Mile"}
              </Text>
            </View> */}
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.btnPrimary} onPress={this.applyFilters}>
          <Text style={styles.btnPrimaryText}>Apply</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    services: state.Bar.services,
  };
};

export default connect(mapStateToProps)(BarsFilter);
