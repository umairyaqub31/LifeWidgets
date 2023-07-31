import * as React from "react";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import styles from "./styles";
import colors from "../../../config/color/color";
import { TextInput } from "react-native-paper";
import CountryPicker from "react-native-country-picker-modal";
import { Picker } from "@react-native-picker/picker";
import { StateModal } from "@components";

class RestaurantsFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Distance: 50,
      min_distance: 0,
      max_distance: 10,
      filter_country: "",
      filter_state: "",
      filter_city: "",
      filter_zip_code: "",
      filter_distance: 0,
    };
  }

  componentDidMount() {
    const {
      filter_country,
      filter_state,
      filter_city,
      filter_zip_code,
      filter_distance,
    } = this.props.route.params;
    this.setState({
      filter_country,
      filter_state,
      filter_city,
      filter_zip_code,
      filter_distance,
    },this.toggleClearButton);
  }

  distanceSliderChange = (Distance) => {
    this.setState({ Distance: Distance });
  };

  distanceFromSliderChange = (Distance) => {
    this.setState({ min_distance: Distance });
  };

  distanceToSliderChange = (Distance) => {
    this.setState({ max_distance: Distance });
  };

  applyFilters = (key, value) => {
    this.setState({ [key]: value }, this.toggleClearButton);
    this.props.route.params.applyFilters(key, value);
  };

  toggleClearButton = () => {
    const {
      filter_country,
      filter_state,
      filter_city,
      filter_zip_code,
      filter_distance,
    } = this.state;
    if (
      !!filter_country ||
      !!filter_state ||
      !!filter_city ||
      !!filter_zip_code ||
      !!filter_distance != 0
    ) {
      this.props.navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={styles.headRightOpacity}
            onPress={this.clearFilter}
          >
            <Text style={styles.headRightText}>Clear</Text>
          </TouchableOpacity>
        ),
      });
    } else {
      this.props.navigation.setOptions({
        headerRight: () => null,
      });
    }
  };

  clearFilter = () => {
    this.setState({
      filter_country: "",
      filter_state: "",
      filter_city: "",
      filter_zip_code: "",
      filter_distance: 0,
    });
    this.props.route.params.clearFilter();
  };

  render() {
    const {
      filter_country,
      filter_state,
      filter_city,
      filter_zip_code,
      filter_distance,
    } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrolledview} showsVerticalScrollIndicator={false}>
          <View>
            <TouchableOpacity>
              <Text style={styles.text}>Distance:</Text>
            </TouchableOpacity>

            <Picker
              selectedValue={filter_distance}
              onValueChange={(itemValue, itemIndex) =>
                this.applyFilters("filter_distance", itemValue)
              }
            >
              <Picker.Item
                color={colors.gray}
                label="Select distance"
                value={0}
              />
              <Picker.Item label="50 feet" value={50} />
              <Picker.Item label="300 feet" value={300} />
              <Picker.Item label="500 feet" value={500} />
              <Picker.Item label="1 mile" value={1} />
              <Picker.Item label="3 miles" value={3} />
              <Picker.Item label="5 miles" value={5} />
              <Picker.Item label="10 miles" value={10} />
            </Picker>
          </View>
          {filter_distance == 0 && (
            <>
              <CountryPicker
                onSelect={(value) => {
                  this.applyFilters("filter_country", value.cca2);
                  //this.setState({ country_code: value.cca2, b_state: "" });
                }}
                cca2={
                  filter_country && filter_country != "null"
                    ? filter_country ?? ""
                    : ""
                }
                countryCode={
                  filter_country && filter_country != "null"
                    ? filter_country ?? ""
                    : ""
                }
                withCountryNameButton
                withAlphaFilter
                containerButtonStyle={[
                  styles.textinputrounded,
                  { justifyContent: "center", paddingLeft: 10 },
                ]}
              />
              <StateModal
                style={[
                  styles.textinputrounded,
                  { justifyContent: "center", paddingLeft: 10 },
                ]}
                b_state={filter_state}
                addCompanyForm={(_, value) =>
                  this.applyFilters("filter_state", value)
                }
                countryCode={filter_country}
              />
              <TextInput
                underlineColor={colors.lightGray}
                theme={{ colors: { primary: colors.primary } }}
                style={[styles.textinputrounded, styles.boxShadow]}
                label="City"
                value={filter_city}
                onChangeText={(text) => this.applyFilters("filter_city", text)}
              />
              <TextInput
                underlineColor={colors.lightGray}
                theme={{ colors: { primary: colors.primary } }}
                style={[styles.textinputrounded, styles.boxShadow]}
                label="Zip Code"
                value={filter_zip_code}
                onChangeText={(text) =>
                  this.applyFilters("filter_zip_code", text)
                }
              />
            </>
          )}
        </ScrollView>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text style={styles.btnPrimaryText}>Apply</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default RestaurantsFilters;