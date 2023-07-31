import * as React from "react";
import * as Location from "expo-location";
import {
  TextInput,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Button
} from "react-native";
import styles from "./styles";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign,
  Feather,
  FontAwesome5,
  Octicons
} from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import colors from "../../config/color/color";
import { Divider } from "react-native-paper";
import { RestaurantsFavorites, DistanceSlider } from "@components";
import { Config } from "@common";
import { connect } from "react-redux";
import { MinMaxAge } from "@helpers";
import BarWelcome from "./BarWelcome.js";

const barChipFilter = [
  "Dancing",
  "Live Music",
  "DJ",
  "Beer Special",
  "Drink Special",
  "Wine Special",
  "Food Special",
  "My Favorites",
  "My Friends",
];

const { activecustomchip, customchip, customchiptext, activecustomchiptext } =
  styles;

class Bar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywordsList: [],
      isSwitchOn: false,
      setIsSwitchOn: false,
      checked: [],
      filters: [],
      Distance: 10,
      WelcomeScreenShown: false,
      locationSubscriber: null,
    };
    this.wecomeScreenShown = 0;
    this.barSearchEvent, (this.params = { Distance: this.state.Distance });
    (this.per_page = 10), (this.page = 1);
  }
  updateLocation = (location) => {
    (this.params["latitude"] = location.coords.latitude),
      (this.params["longitude"] = location.coords.longitude);
  };

  async componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headertitle}>
          <Text style={styles.headertitleText}>
            Bars
          </Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={[styles.headRight, styles.chipOpcity]}
            onPress={() =>
              this.props.navigation.navigate("BarsFilter", {
                applyFilterServices: this.applyFilterServices,
                applyFilters: this.applyFilters,
                filters: this.state.filters,
                Distance: this.state.Distance,
                checked: this.state.checked,
              })
            }
          >
            <Feather name="sliders" size={18} color={colors.primary}  />
          </TouchableOpacity>
        </View>
      ),
    });



    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      this.updateLocation(location);
      this.locationSubscriber = await Location.watchPositionAsync(
        { enableHighAccuray: true, distanceInternal: 10 },
        this.updateLocation
      );
      console.log(this.params);
    } catch (error) {
      console.log(error);
    }
    this.props.fetchBarServices();
    this.params["type"] = "bar";
    this.props.fetchBars(this.per_page, this.page, this.params);
  }

  componentWillUnmount() {
    if (this.locationSubscriber) {
      this.locationSubscriber.remove();
    }
  }
  componentDidCatch(error, info) {
    console.log("..............componentDidCatch....................");
    console.log(error);
    console.log(info);
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

  applyFilters = (items, Distance) => {
    this.params["occupancy_rate"] = false;
    this.params["opposite_ratio"] = false;
    this.params["friend_present"] = false;
    this.params["hide_my_self"] = false;
    this.params["young_to_oldest"] = false;
    this.params["my_company"] = false;
    this.params["my_favorites"] = false;
    this.params.Distance = Distance;
    items.map((item) => {
      this.params[item] = true;
    });
    this.page = 1;
    this.props.fetchBars(this.per_page, this.page, this.params);
    this.setState({ filters: items, Distance: Distance });
  };

  onRefresh = () => {
    this.page = 1;
    this.props.fetchBars(this.per_page, this.page, this.params);
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isFetching) {
      if (!this.onEndReachedCalledDuringMomentum) {
        if (this.props.total >= this.props.bars.length) {
          this.page++;
          this.props.fetchBars(this.per_page, this.page, this.params);
          this.onEndReachedCalledDuringMomentum = true;
        }
      }
    }
  };

  renderEmptyContainer = () => {
    if (!this.props.isFetching) {
      return (
        <View style={{ flex: 1 }}>
          <Text style={[styles.heading,{textAlign:'center',marginTop:20}]}>
            No Bars found in your area, please try updating your filters.
          </Text>
          <Text style={[styles.text,{ marginTop: 20,textAlign:'center' }]}>
            Please let your favorite bar owners know they should create a
            company profile on Life widgets.
          </Text>
        </View>
      );
    }
    return null;
  };

  onChangeText = (text) => {
    clearTimeout(this.barSearchEvent);
    this.barSearchEvent = setTimeout(() => {
      this.params["s"] = text;
      this.page = 1;
      this.props.fetchBars(this.per_page, this.page, this.params);
    }, 500);
  };

  changeFilters = (keyword) => {
    let { filters } = this.state;
    let found = filters.find((data) => data === keyword);
    if (!found) {
      filters.push(keyword);
    } else {
      filters = filters.filter((data) => data !== keyword);
    }
    this.applyFilters(filters, this.state.Distance);
  };

  applyFilterServices = (item) => {
    let { checked } = this.state;
    console.log(item);
    let found = checked.find((data) => data.id === item.id);
    if (!found) {
      checked.push(item);
    } else {
      checked = checked.filter((data) => data.id !== item.id);
    }
    this.setState({ checked });
    let services = checked.map((check) => check.id);
    this.barSearchEvent = setTimeout(() => {
      this.params["services"] = services;
      this.page = 1;
      this.props.fetchBars(this.per_page, this.page, this.params);
    }, 500);
  };
  

  listHeaderComponent = () => {
    return (
      <>
        <ScrollView
          style={styles.barSearchChips}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
        >
          <TouchableOpacity
            style={
              this.state.filters.find((filter) => filter === "my_favorites")
                ? activecustomchip
                : customchip
            }
            onPress={() => this.changeFilters("my_favorites")}
          >
            <Text
              style={
                this.state.filters.find((filter) => filter === "my_favorites")
                  ? activecustomchiptext
                  : customchiptext
              }
            >
              My favorites
            </Text>
          </TouchableOpacity>
          {this.props.services.length > 0 &&
            this.props.services.map((item, key) => (
              <TouchableOpacity
                key={key}
                style={
                  this.state.checked.find((data) => data.id === item.id)
                    ? activecustomchip
                    : customchip
                }
                onPress={() => this.applyFilterServices(item)}
              >
                <Text
                  style={
                    this.state.checked.find((data) => data.id === item.id)
                      ? activecustomchiptext
                      : customchiptext
                  }
                >
                  {item.service_name}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>

        <View style={styles.roundedfilterinputcontainer}>
          <View style={[styles.roundedtextinputcontainer, styles.boxShadow]}>
            <Ionicons name="ios-search" size={24} color={colors.gray} />
            <TextInput
              style={styles.roundedtextinput}
              placeholder="Search for Bar"
              placeholderTextColor={colors.gray}
              onChangeText={this.onChangeText}
            />
          </View>
        </View>
        <Divider style={styles.separator} />
      </>
    );
  };

  renderItem = ({ item, index }) => {
    let banner =
      "https://images.all-free-download.com/images/graphiclarge/bar_wines_514430.jpg";
    let bannerObject = Object.assign({}, item.banner);
    if (bannerObject.attachment_url) {
      banner = Config.lifeWidget.url + "/" + bannerObject.attachment_url;
    }

    let live = item.bar_services.some(
      (service) => service.service_code === "dot-circle"
    );

    return (
      <TouchableOpacity
        key={index}
        style={styles.restaurantsContainer}
        onPress={() =>
          this.props.navigation.navigate("BarAbout", { item: item })
        }
      >
        <ImageBackground
          imageStyle={{ borderRadius: 8 }}
          style={styles.barImage}
          source={{ uri: banner }}
        >
          <View style={styles.labelFavList}>
            <View style={styles.startLabelContainer}>
              {live && (
                <View style={styles.primaryLabel}>
                  <Text style={styles.primaryLabelText}>Live Music</Text>
                </View>
              )}
              {/* <View style={styles.primaryLabel}>
                    <Text style={styles.primaryLabelText}>18km away</Text>
                  </View> */}
            </View>
            <RestaurantsFavorites item={item} />
          </View>
        </ImageBackground>
        <View style={styles.barTitleRatingContainer}>
          <Text style={styles.barTitleList} numberOfLines={1}>
            <Text style={styles.barTitle}>{item.name}</Text>
            {item.city && (
              <>
                {/* <View style={styles.barTitleDash} /> */}
                <AntDesign name="minus" size={15} color={colors.gray} style={styles.barTitleDash} />
                <Text style={styles.barTitle} numberOfLines={1}>{item.city}</Text>
              </>
            )}
          </Text>
          <View style={styles.barRatingComment}>
            <FontAwesome name="star" size={14} color={colors.primary} />
            <Text style={styles.textBold}>0</Text>
            <Text style={styles.textGray}>(0)</Text>
          </View>
        </View>
        <View style={styles.flavourContainer}>
          <View style={styles.genderRatioContainer}>
            {item.checkins.length > 0 && (
              <Text style={styles.textGray}>{MinMaxAge(item.checkins)}</Text>
            )}
            {item.opposite_rate && (
              <View style={styles.genderRatio}>
                <Text style={styles.textGray}>{item.opposite_rate}</Text>
              </View>
            )}
          </View>

          {item.bar_services.length > 0 && (
            <View style={styles.flavourAvailable}>
              {item.bar_services.map((item, key) => (
                <>
                  <FontAwesome5
                    name={item.service_code}
                    size={14}
                    color={colors.primary}
                  />
                  <View style={styles.dot} />
                </>
              ))}
            </View>
          )}
        </View>
        {item.distance && (
          <Text style={styles.textGray}>
            Distance: {parseFloat(item.distance).toFixed(2)} mi
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  render() {
    const {user} = this.props;
    if (user.is_bar_message == 1) {
      return <BarWelcome />;
    }
    return (
      <>
        <View style={{ backgroundColor: colors.white, paddingLeft:15, paddingRight:15 }}>
          {this.listHeaderComponent()}
        </View>
        <KeyboardAwareScrollView style={styles.container}>
          <View style={styles.scrolledview}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
              }
              onEndReached={this.onEndReached}
              ListEmptyComponent={this.renderEmptyContainer}
              onMomentumScrollBegin={() => {
                this.onEndReachedCalledDuringMomentum = false;
              }}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={false}
              data={this.props.bars}
              ListFooterComponent={() =>
                this.props.isFetching ? (
                  <ActivityIndicator style={{ margin: 10 }} />
                ) : null
              }
              renderItem={this.renderItem}
            />
          </View>
        </KeyboardAwareScrollView>
      </>
    );
  }
}

const mapStateToProps = ({ Bar, User }) => {
  return {
    bars: Bar.items,
    isFetching: Bar.isFetching,
    services: Bar.services,
    total: Bar.total,
    getStarted: Bar.getStarted,
    user: typeof User.user !== "undefined" ? User.user : {},
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/BarRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchBars: (per_page, page, params = []) => {
      console.log(params);
      actions.fetchBars(dispatch, per_page, page, params);
    },
    fetchBarServices: () => {
      actions.fetchBarServices(dispatch);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(Bar);