import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import styles from "./styles";
import { TimeAgo, UserImage } from "@components";
import { Capitalize, OptimizeImage } from "@helpers";
import { FontAwesome5, MaterialIcons, AntDesign } from "@expo/vector-icons";
import colors from "../../config/color/color";
import { Avatar } from "react-native-paper";
import { Config } from "@common";

export default function Profileimage(props) {
  const navigateToGroup = () => {
    props.navigation.navigate("GroupDetail", {
      item: props.item.group,
    });
  };
  return (
    <View style={styles.profileimage}>
      <UserImage item={props.item.user} style={styles.avatarimage} size={52} />

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={{ flexDirection: "row", flexWrap: "wrap" }}
          onPress={() => {
            if (props.item.user.id === props.me.id) {
              props.navigation.navigate("Menu", { screen: "MyProfile" });
            } else {

              props.navigation.navigate("UserProfile", {
                user_id: props.item.user.id,
              });
            }
          }}
        >
          <Text style={[styles.username, { marginRight: 5 }]}>
            {Capitalize(props.item.user.first_name) +
              " " +
              Capitalize(props.item.user.last_name)}
              {props.item.user.verified && (
                <AntDesign name="star" size={18} color={colors.gold} />
              )}
          </Text>
          {props.item.group && (
            <>
              <MaterialIcons name="play-arrow" size={24} color={colors.gray} />
              <TouchableOpacity onPress={navigateToGroup}>
                <Text style={styles.username}>{props.item.group.title}</Text>
              </TouchableOpacity>
            </>
          )}
          {/* {props.item.share_id && (
            <>
              <FontAwesome5 name="play" size={12} color={colors.gray} style={{marginRight:5,marginTop:5}}/>
              <TouchableOpacity
                onPress={() => {
                  if (props.item.share.user.id === props.me.id) {
                    props.navigation.navigate("Menu", { screen: "MyProfile" });
                  } else {
                    props.navigation.navigate("UserProfile", {
                      user_id: props.item.share.user.id,
                    });
                  }
                }}
              >
                <Text numberOfLines={1} style={styles.username}>
                  {typeof props.item.share !== "undefined"
                    ? props.item.share.user.first_name
                    : ""}
                </Text>
              </TouchableOpacity>
            </>
          )} */}
          {props.item.post_tags && props.item.post_tags.length > 0 && (
            <Text style={[styles.textgray, styles.withText]}>is with</Text>
          )}
          {props.item.post_tags && props.item.post_tags.length > 0 && (
            <Text style={styles.username}>
              {props.item.post_tags[0].first_name}
            </Text>
          )}
          {props.item.post_tags && props.item.post_tags.length > 1 && (
            <>
              <Text style={[styles.textgray, styles.withText]}>and</Text>
              <Text style={styles.username}>
                {props.item.post_tags.length - 1} others
              </Text>
            </>
          )}
        </TouchableOpacity>
        {props.item.category && (
          <Text style={[styles.textgray, styles.withText]}>
            posted in{" "}
            <Text style={styles.username}>{props.item.category.label}</Text>
          </Text>
        )}

        <View style={styles.timeslotstatus}>
          <TimeAgo style={styles.timeago} created_at={props.item.created_at} />
          {/* <View style={styles.timeagodot}></View> */}
          <Text style={styles.timeago}></Text>
          {/* <View style={styles.timeagodot}></View> */}
          <FontAwesome5
            name={props.item.user.icon}
            size={12}
            color={colors.gray}
          />
        </View>
      </View>
    </View>
  );
}
