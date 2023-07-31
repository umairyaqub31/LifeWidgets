import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TextInput,
  Linking,
  Image
} from "react-native";
import styles from "./styles";
import { OptimizeImage } from "@helpers";
import { CompanyOption, RestaurantsGallery } from "@components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";
import { Divider } from "react-native-paper";
import colors from "../../config/color/color";
import { connect } from "react-redux";
import RestaurantWelcome from "./ResturantWelcome.js";

class Restaurants extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      my_company: false,
      text: "",
      filter_country: "",
      filter_state: "",
      filter_city: "",
      filter_zip_code: "",
      filter_distance: 0,
      WelcomeScreenShown: false,
    };
    this.companyOptionRef = React.createRef();
    this.params = [];
    this.per_page = 10;
    this.page = 1;
    this.wecomeScreenShown= 0;
  }

  componentDidMount() {
    this.params["type"] = "restaurant";
    this.props.fetchCompany(this.per_page, this.page, this.params);
  }

  applyFilters = (key, value) => {
    setTimeout(() => {
      this.setState({ [key]: value }, this.onChangeText);
    }, 1000);
  };

  clearFilter = () => {
    this.setState({filter_country:"", filter_state:"", filter_city:"", filter_zip_code:"", filter_distance:""},this.onChangeText);
  }

  addNew = () => {
    this.props.navigation.navigate("AddCompany", { new: true });
  };

  onRefresh = () => {
    this.page = 1;
    this.props.fetchCompany(this.per_page, this.page, this.params);
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isFetching) {
      if (this.props.total > this.props.data.length) {
        this.page++;
        this.props.fetchCompany(this.per_page, this.page, this.params);
      }
    }
  };

  renderEmptyContainer = () => {
    if (!this.props.isFetching) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ textAlign: "center", fontSize: 16 }}>
            No Restaurants
          </Text>
        </View>
      );
    }
    return null;
  };

  onChangeText = () => {
    const {
      text,
      filter_country,
      filter_state,
      filter_city,
      filter_zip_code,
      filter_distance,
    } = this.state;
    this.params["s"] = text;
    this.params["country"] = filter_country;
    this.params["state"] = filter_state;
    this.params["city"] = filter_city;
    this.params["zip_code"] = filter_zip_code;
    this.params["distance"] = filter_distance;
    this.page = 1;
    this.props.fetchCompany(this.per_page, this.page, this.params);
  };

  listHeaderComponent = () => {
    const {
      filter_country,
      filter_state,
      filter_city,
      filter_zip_code,
      filter_distance,
    } = this.state;
    return (
      <>
        {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
          <TouchableOpacity style={styles.customchip} onPress={()=>this.props.navigation.navigate("AddCompany", {new:true})}>
            <AntDesign
              style={styles.customchipIcon}
              name="pluscircle"
              size={18}
              color={colors.black}
            />
            <Text style={styles.customchiptext}>Add Restaurant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.customchip, this.state.my_company && {backgroundColor:colors.primary}]} onPress={()=>this.applyFilters("my_company",!this.state.my_company)}>
            <Text style={[styles.customchiptext, this.state.my_company && {color:colors.white}]}>My Restaurant</Text>
          </TouchableOpacity>
        </ScrollView> */}
        <View style={styles.roundedfilterinputcontainer}>
          <View style={[styles.roundedtextinputcontainer, styles.boxShadow]}>
            <Ionicons name="ios-search" size={24} color={colors.gray} />
            <TextInput
              style={styles.roundedtextinput}
              placeholder="Search for Restaurant"
              placeholderTextColor={colors.gray}
              onChangeText={(text) => this.applyFilters("text", text)}
            />
          </View>
          <TouchableOpacity
            style={[styles.filterIcon, styles.boxShadow]}
            onPress={() =>
              this.props.navigation.navigate("RestaurantsFilters", {
                filter_country: filter_country,
                filter_state: filter_state,
                filter_city: filter_city,
                filter_zip_code: filter_zip_code,
                filter_distance: filter_distance,
                applyFilters: this.applyFilters,
                clearFilter:this.clearFilter
              })
            }
          >
            <Feather name="sliders" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <Divider style={styles.separator} />
      </>
    );
  };

  openTools = (item) => {
    this.companyOptionRef.current.open(item);
  };

  renderItem = ({ item, index }) => {
    return (
      <View style={[styles.restaurantsContainer,styles.boxShadow]}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <RestaurantsGallery item={item} />
        <View style={styles.restaurantsBody}>

          <TouchableOpacity
            style={styles.callText}
            onPress={() => {
              Linking.openURL(`tel:${item.phone_number}`);
            }}
          >
            {/* <Ionicons
              name="call-outline"
              size={20}
              color={colors.primary}
              style={{ marginRight: 5 }}
            /> */}

            <Text style={styles.textBold}>Call For Reservations</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    const {user} = this.props;
      if (user.is_restaurant_message==1) {
        return (
            <RestaurantWelcome />
        )
      }
    return (
      <View style={styles.container}>
      {this.listHeaderComponent()}
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.scrollView}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={this.onRefresh} />
            }
            onEndReached={this.onEndReached}
            ListEmptyComponent={this.renderEmptyContainer}
            //ListHeaderComponent={this.listHeaderComponent}
            onEndReachedThreshold={0.5}
            data={this.props.data}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() =>
              this.props.isFetching ? (
                <ActivityIndicator style={{ margin: 10 }} />
              ) : null
            }
            renderItem={this.renderItem}
          />
          <View style={[styles.restaurantsContainer,styles.boxShadow]}>

            <View style={styles.restaurantsBody}>
                <Text style={[styles.textBold, {padding:20, fontSize:14}]}>Please let your favorite restaurants know about Life Widgets so they can create a business profile.  We plan to save them a lot of money when we release our reservation system!</Text>
            </View>
          </View>

        </View>
        <CompanyOption ref={this.companyOptionRef} />
      </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ Company, User }) => {
  return {
    data: Company.restaurants,
    isFetching: Company.isRestaurantFetching,
    total: Company.totalRestaurant,
    restaurantGetStarted: Company.restaurantGetStarted,
    user: typeof User.user !== "undefined" ? User.user : {},
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CompanyRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchCompany: (per_page, page, params = []) => {
      console.log(params);
      actions.fetchRestaurant(dispatch, per_page, page, params);
    },
  };
};
export default connect(mapStateToProps, undefined, mergeProps)(Restaurants);
