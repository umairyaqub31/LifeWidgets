import * as React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  Image,
  Platform,
} from "react-native";
import styles from "./styles";
import colors from "../../../config/color/color";
import { Feather, AntDesign, Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import FbGrid from "react-native-fb-image-grid";
import { Config } from "@common";
import Geocoder from "react-native-geocoding";

const marker = require("../../../../assets/images/marker.png");

Geocoder.init("AIzaSyBi1vr84ffSSHUhmtNdxea9sZNROw3QZho");

const EventsDetails = (props) => {
  const { item, type } = props.route.params;
  const [markers, setMarkers] = React.useState({
    coordinate: {
      latitude: item.latitude,
      longitude: item.longitude,
    },
    // key: id,
    color: "red",
  });
  const [address, setAddress] = React.useState(null);
  const [is_edit, setIs_edit] = React.useState(false);

  let url = "";

  if (item.photos) {
    if (item.photos.length > 0) {
      url = Config.lifeWidget.image_url + "/" + item.photos[0].attachment_url;
    }
  } else {
    url =
      "https://images.unsplash.com/photo-1616962068909-ef7bc0c548da?ixid=MnwxMjA3fDB8MHxzZWFy[…]fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
  }

  // console.log("item..", item.attachments[0].attachment_url);
  let urlArray = [];

  if (item.photos) {
    if (item.photos.length > 0) {
      item.photos.map((i) => {
        urlArray.push(Config.lifeWidget.image_url + "/" + i.attachment_url);
      });
    }
  }

  let addressComponent;

  Geocoder.from(item.latitude, item.longitude)
    .then((json) => {
      addressComponent = json.results[0].formatted_address;
      // console.log(addressComponent);
      setAddress(addressComponent);
    })
    .catch((error) => console.warn(error));

  // console.log("url", urlArray);

  React.useEffect(() => {
    if (typeof props.route.params !== "undefined") {
      if (typeof props.route.params.type !== "undefined") {
        setIs_edit(true);
      }
    }
  }, []);
  const convertTime = (time) => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  };
  const convertDate = (d, t) => {
    var res = d.split(" ");
    var date = res[0];
    var time = res[1];

    var dayDate = new Date(date).getDate();
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month;
    var dataSplit = date.split("-");
    var m = dataSplit[1];

    if (m.includes("0")) {
      var index = m.indexOf("0");

      if (index == 0) {
        month = m[1];
      } else {
        month = m;
      }
    } else {
      month = m;
    }
    var monthName = monthNames[month - 1];

    var dayText = days[new Date(date).getDay()];
    var dayName = dayText.substring(0, 3);

    var startTime = time;

    var year = new Date(date).getFullYear();

    return (
      dayName +
      "," +
      " " +
      dayDate +
      "," +
      " " +
      monthName +
      "," +
      " " +
      year +
      " " +
      "." +
      " " +
      "At" +
      " " +
      convertTime(startTime)
    );
  };
  console.log("flag", is_edit);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: url,
        }}
        style={styles.coverImage}
      >
        <View style={styles.overlay}>
          <View style={styles.list}>
            <View>
              {Platform.OS === "ios" ? (
                <TouchableOpacity
                  style={styles.touchOpcity}
                  onPress={() => {
                    props.navigation.goBack();
                  }}
                >
                  <Ionicons
                    name="chevron-back"
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.touchOpcity}
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                >
                  <Ionicons
                    name="md-arrow-back-sharp"
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              )}
            </View>
            {is_edit ? (
              <TouchableOpacity
                style={styles.touchOpcity}
                onPress={() =>
                  props.navigation.navigate("CreateCalenderEvent", {
                    item: item,
                  })
                }
              >
                <Feather name="edit" size={18} color={colors.primary} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </ImageBackground>
      <View style={styles.eventsDescription}>
        <ScrollView
          style={styles.scrolledView}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={[styles.heading, { textAlign: "center" }]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <View style={styles.spacing} />
          <View style={styles.spacing} />
          <View style={styles.listInline}>
            <View style={styles.listIcon}>
              <Ionicons name="location-outline" size={24} color={colors.gray} />
            </View>
            <Text style={styles.textGray}>{address}</Text>
          </View>
          <View style={styles.spacing} />
          <View style={styles.listInline}>
            <View style={styles.listIcon}>
              <AntDesign name="calendar" size={22} color={colors.gray} />
            </View>
            <View>
              <Text style={styles.textGray}>
                Start: {convertDate(item.start_date)}
              </Text>
            </View>
          </View>
          <View style={styles.spacing} />
          <View style={styles.listInline}>
            <View style={styles.listIcon}>
              <AntDesign name="calendar" size={22} color={colors.gray} />
            </View>
            <View>
              <Text style={styles.textGray}>
                End: {convertDate(item.end_date)}
              </Text>
            </View>
          </View>
          <View style={styles.spacing} />
          <View style={styles.listInline}>
            <View style={styles.listIcon}>
              <Feather name="users" size={24} color={colors.gray} />
            </View>
            <View>
              <View style={styles.imageGridOverlay}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1621690977399-84c9c7b479c6?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                  }}
                  style={styles.imageOverlay}
                />
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1621690977399-84c9c7b479c6?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                  }}
                  style={styles.imageOverlay}
                />
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1621690977399-84c9c7b479c6?ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfHRvd0paRnNrcEdnfHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                  }}
                  style={styles.imageOverlay}
                />
                <TouchableOpacity style={styles.moreImages}>
                  <Feather name="plus" size={10} color="black" />
                  <Text style={styles.moreImageText}>10</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
          <Text style={styles.textBold}>About</Text>
          <View style={styles.spacingXS} />
          <Text style={styles.text}>{item.description}</Text>
          <View style={styles.spacing} />
          <Text style={styles.textBold}>Map</Text>
          <View style={styles.spacingXS} />
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: item.latitude,
              longitude: item.longitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            }}
          >
            <Marker
              // key={markers.key}
              coordinate={markers.coordinate}
              pinColor={markers.color}
            >
              <Image style={{ height: 50, width: 50 }} source={marker} />
            </Marker>
          </MapView>
          <View style={styles.spacing} />
          <Text style={styles.textBold}>Pictures</Text>
          <View style={styles.spacingXS} />
          <View style={{ height: 300, marginHorizontal: -7 }}>
            <FbGrid
              images={urlArray}
              onPress={() =>
                props.navigation.navigate("EventsPictures", { item: item })
              }
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default EventsDetails;
