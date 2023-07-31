import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import colors from "../../config/color/color";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

import { Config } from "@common";
import { useNavigation } from "@react-navigation/native";

const EventComponent = (props) => {
  const { item, index, route } = props;
  let pendingFlag = false;
  if (route) {
    if (route === "pending") {
      pendingFlag = true;
    }
  }
  const navigation = useNavigation();
  let url = "";
  if (item.photos !== undefined && item.photos.length > 0) {
    url = Config.lifeWidget.image_url + "/" + item.photos[0].attachment_url;
  }

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

  const handleInvitaion = (value) => {
    Alert.alert("Invitation Alert!", `Do you want to ${value}?`, [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => props.addResponse(value, item.id) },
    ]);
  };

  return (
    <TouchableOpacity
      style={[
        styles.boxShadow,
        styles.roundedContainer,
        styles.eventsContainer,
      ]}
      key={index}
      onPress={() => navigation.navigate("EventsDetails", { item: item })}
    >
      <>
        {item.photos && item.photos.length > 0 ? (
          <Image
            source={{
              uri: url,
            }}
            style={styles.eventsBanner}
          />
        ) : (
          <Image
            style={styles.eventsBanner}
            source={require("../../../assets/images/Events.png")}
          />
        )}
      </>

      <View style={styles.eventBody}>
        <View style={styles.listInline}>
          <Text style={styles.graytext}>{convertDate(item.start_date)}</Text>
        </View>
        <Text style={styles.textBold} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.spacing} />
        <View style={styles.imageGridOverlay}>
          {/* {e.interestedUsers.length > 0 ? (
                    <>
                      {e.interestedUsers.slice(0, size).map((i) => (
                        <Image
                          source={require('../../../../assets/images/block.jpg')}
                          style={styles.imageOverlay}
                        />
                      ))}
                    </>
                  ) : null} */}

          <View style={styles.dot} />
          <Text style={styles.graytext}>{item.interest_count} Interested</Text>
          <View style={styles.dot} />
          <Text style={styles.graytext}>{item.going_count} Going</Text>
        </View>

        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />
        <View style={styles.spacingXL} />
        {item.is_invited ? (
          <View style={styles.multiBtns}>
            <TouchableOpacity
              style={[styles.primaryBtn, styles.listInline]}
              onPress={() => handleInvitaion("accept")}
            >
              {/* <AntDesign name="star" size={24} color={colors.white} /> */}
              <Text style={styles.primaryBtnText}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.grayBtn, styles.listInline]}
              onPress={() => handleInvitaion("reject")}
            >
              <Text style={[styles.primaryBtnText, { color: colors.black }]}>
                Reject
              </Text>
            </TouchableOpacity>
          </View>
        ) : item.is_going ? (
          <View style={styles.multiBtns}>
            <TouchableOpacity
              style={[
                styles.primaryBtn,
                styles.listInline,
                { backgroundColor: colors.lightGray },
              ]}
              onPress={() => handleInvitaion("reject")}
            >
              <Text style={[styles.primaryBtnText, { color: colors.black }]}>
                Reject
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.grayBtn, styles.listInline]}>
              <FontAwesome
                name="share-square-o"
                size={22}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.multiBtns}>
            <TouchableOpacity
              style={[styles.primaryBtn, styles.listInline]}
              onPress={() => props.openResponsePannel(item.id)}
            >
              <AntDesign name="star" size={24} color={colors.white} />
              <Text style={styles.primaryBtnText}>Interested</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.grayBtn, styles.listInline]}>
              <FontAwesome
                name="share-square-o"
                size={22}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
export default EventComponent;
