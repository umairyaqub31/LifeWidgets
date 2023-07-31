import React, { Component } from "react";
import styles from "./styles";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import colors from "../../../config/color/color";
import { Config } from "@common";

const EventItem = (props) => {
  const { item, navigation } = props;

  let url = "";

  if (item.attachments.length > 0) {
    url =
      Config.lifeWidget.image_url + "/" + item.attachments[0].attachment_url;
  } else {
    url =
      "https://images.unsplash.com/photo-1616962068909-ef7bc0c548da?ixid=MnwxMjA3fDB8MHxzZWFy[…]fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
  }

  var res = item.start_date.split(" ");
  var date = res[0];

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
  var day = dataSplit[2];

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

  return (
    <TouchableOpacity
      style={[
        styles.boxShadow,
        styles.roundedContainer,
        styles.eventsContainer,
      ]}
      onPress={() =>
        navigation.navigate("EventsDetails", {
          item: item,
          type: "my",
        })
      }
    >
      <ImageBackground
        source={{
          uri: url,
        }}
        style={styles.eventsBanner}
        imageStyle={{ borderRadius: 15 }}
      >
        <View style={styles.eventBody}>
          <View style={styles.eventDate}>
            <Text style={styles.eventDateText}>{day}</Text>
            <Text style={styles.eventMonthText}>{monthName}</Text>
          </View>
          <Text
            style={[styles.heading, { color: colors.white }]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default EventItem;
