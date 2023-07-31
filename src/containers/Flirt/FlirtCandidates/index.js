import * as React from "react";
import {
  Alert,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
  Dimensions,
  Image
} from "react-native";
import * as Location from "expo-location";
import styles from "./styles";
import colors from "../../../config/color/color";
import { Entypo, AntDesign, Ionicons, Feather,MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import { OptimizeImage, Capitalize } from "@helpers";
import { Color, LifeWidget } from "@common";
import { UserImage } from "@components";
import FontFamily from "../../../config/fonts/fontfamily";
import Flirt from "../../Flirt";
import { Modalize } from 'react-native-modalize';
import { Portal } from "react-native-portalize";
import Swiper from "react-native-web-swiper";
import { getStatusBarHeight } from "react-native-status-bar-height";


const imageSize = Dimensions.get("window").width / 3 - 20;
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;




class FlirtCandidates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      is_location_on: false,
    };
    this.per_page = 10;
    this.page = 1;
    this.modalizeRef = React.createRef();
  }

  onOpen = () => {
    this.modalizeRef.current?.open();
  };


  onRefresh = () => {
    if (this.state.is_location_on) {
      this.page = 1;
      this.props.fetchFlirts(this.per_page, this.page);
    }
  };
  componentDidMount() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.chipOpcity}
          onPress={() => this.props.navigation.navigate("FlirtSetting",{onRefresh:this.onRefresh})}
        >
          <Feather name="sliders" size={20} color={colors.primary} />
        </TouchableOpacity>
      ),
    })
    this.updateCurrentLocation();
    this.props.fetchFlirts(this.per_page, this.page);
    this.props.navigation.addListener("focus", this.focus);
  }

  focus = () => {
    this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({ tabBarVisible: true });
  };
  

  updateCurrentLocation = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        this.setState({ loading: true });
        Alert.alert(
          "Location permission",
          "Please allow location permission for this app",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const data = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };
      this.setState({ is_location_on: true, loading: true });
      this.page = 1;
      this.props.fetchFlirts(this.per_page, this.page);
      const json = await LifeWidget.updateCurrentLocation(data);
    } catch (error) {
      this.setState({ loading: true });
    }
  };

  renderEmptyContainer = () => {
    if (!this.props.isFetching) {
      return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>
            No flirt found in your search criteria
          </Text>
        </View>
      );
    }
    return null;
  };

  onEndReached = ({ distanceFromEnd }) => {
    if (!this.props.isFetching) {
      if (this.props.total > this.props.items.length) {
        if (this.state.is_location_on) {
          this.page++;
          this.props.fetchFlirts(this.per_page, this.page, this.params);
        }
      }
    }
  };

  renderItem = ({ item, index }) => {
    const { flirt_setting } = item;
    return (
      <TouchableOpacity
        key={index}
        style={[styles.candidateContainerGrid, styles.boxShadow]}
        onPress={() =>
          this.props.navigation.navigate("FlirtDetail", { item: item })
        }
      >
      <UserImage item={item} size={imageSize} style={[styles.avatarImg, {alignItems:"center", justifyContent:"center"}]} />
        <View style={styles.candidateGridBody}>
          {flirt_setting.is_fname_visible == 1 &&
            flirt_setting.is_lname_visible == 1 && (
              <Text style={styles.userName}>
                {Capitalize(item.first_name)} {Capitalize(item.last_name)}
                {item.verified && (
                  <AntDesign name="star" size={18} color={Color.gold} />
                )}
              </Text>
            )}
          {flirt_setting.is_fname_visible == 1 &&
            flirt_setting.is_lname_visible != 1 && (
              <Text style={styles.userName}>
              {Capitalize(item.first_name)}
              {item.verified && (
                  <AntDesign name="star" size={18} color={Color.gold} />
                )}
              </Text>
            )}
          {flirt_setting.is_fname_visible != 1 &&
            flirt_setting.is_lname_visible == 1 && (
              <Text style={styles.userName}>
              {Capitalize(item.last_name)}
              {item.verified && (
                  <AntDesign name="star" size={18} color={Color.gold} />
                )}
              </Text>
            )}
          {flirt_setting.is_fname_visible != 1 &&
            flirt_setting.is_lname_visible != 1 && (
              <Text style={styles.userName}>
                {Capitalize(flirt_setting.nick_name)}
              </Text>
            )}
        </View>
      </TouchableOpacity>
    );
  };

  listHeaderComponent = () => {
    const { is_location_on, loading } = this.state;
    if (is_location_on) {
      return null;
    }
    if (loading) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Entypo name="location-pin" size={50} color={Color.primary} />
          <Text
            style={{
              color: "#a9a9a9",
              fontSize: 20,
              fontFamily: FontFamily.Medium,
              textAlign: "center",
            }}
          >
            Please turn on device location for better search experience
          </Text>
          <TouchableOpacity
            onPress={this.updateCurrentLocation}
            style={{
              backgroundColor: Color.primary,
              margin: 10,
              padding: 10,
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Tun on</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  render() {
    const { settings, items, isFetching, user } = this.props;

    return (
      <>
        {user.is_flirt_message == 1 ? (
          <Flirt {...this.props} />
        ) : (
          <View style={styles.container}>
            {/* <TouchableOpacity onPress={this.onOpen}><Text>Modal adf adf ad</Text></TouchableOpacity> */}

            <View>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={{margin:10}}
                style={{borderBottomWidth:1,borderColor:colors.lightGray}}
              >
              <View
                  style={[styles.customchip, {backgroundColor:colors.primary}]}
                >
                <Ionicons style={styles.customchipIcon} name="ios-heart-circle" size={18} color={colors.white} />
                  <Text style={[styles.customchiptext, {color:colors.white}]}>Available Flirts</Text>
                </View>
                <TouchableOpacity
                  style={[styles.customchip]}
                  onPress={() => this.props.navigation.navigate("FlirtsActive")}
                >
                  <AntDesign
                    style={styles.customchipIcon}
                    name="heart"
                    size={18}
                    color={colors.primary}
                  />
                  <Text style={styles.customchiptext}>Active Flirts</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.customchip}
                  onPress={() =>
                    this.props.navigation.navigate("FlirtsRequestPending")
                  }
                >
                  <AntDesign
                    style={styles.customchipIcon}
                    name="hearto"
                    size={18}
                    color={colors.primary}
                  />
                  <Text style={styles.customchiptext}>Request</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.customchip}
                  onPress={() =>
                    this.props.navigation.navigate("FlirtsPending")
                  }
                >
                  <AntDesign
                    style={styles.customchipIcon}
                    name="hearto"
                    size={18}
                    color={colors.primary}
                  />
                  <Text style={styles.customchiptext}>Pending Flirts</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
            <View style={styles.scrolledview}>
              <View style={styles.candidateContainer}>
                <FlatList
                  numColumns={2}
                  keyExtractor={(_, index) => index.toString()}
                  refreshControl={
                    <RefreshControl
                      refreshing={false}
                      onRefresh={this.onRefresh}
                    />
                  }
                  onEndReached={this.onEndReached}
                  ListEmptyComponent={this.renderEmptyContainer}
                  ListHeaderComponent={this.listHeaderComponent}
                  onEndReachedThreshold={0.5}
                  data={items}
                  showsVerticalScrollIndicator={false}
                  ListFooterComponent={() =>
                    isFetching ? (
                      <ActivityIndicator
                        color={Color.gray}
                        style={{ margin: 10 }}
                      />
                    ) : null
                  }
                  renderItem={this.renderItem}
                />
              </View>
            </View>
          </View>
        )}

      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.User.user,
    settings: state.Flirt.form,
    items: state.Flirt.items,
    isFetching: state.Flirt.isFetching,
    total: state.Flirt.total,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/FlirtRedux");
  return {
    ...ownProps,
    ...stateProps,
    fetchFlirts: (per_page, page) => {
      actions.fetchFlirts(dispatch, per_page, page);
    },
  };
};

export default connect(mapStateToProps, undefined, mergeProps)(FlirtCandidates);
