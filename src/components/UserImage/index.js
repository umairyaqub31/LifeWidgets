import * as React from "react";
import { View } from "react-native";
import { OptimizeImage } from "@helpers";
import { Avatar } from "react-native-paper";

function Userimage(props) {
  if (props.item.gender === "female") {
    return (
      <View>
        {props.item.profile_photo ? (
          <Avatar.Image
            style={props.style}
            size={props.size??82}
            source={{
              uri: OptimizeImage(props.item.profile_photo),
            }}
          />
        ) : (
          <Avatar.Image
            style={props.style}
            size={props.size??82}
            source={require("@images/favatar.png")}
          />
        )}
      </View>
    );
  } else {
    return (
      <View>
        {props.item.profile_photo ? (
          <Avatar.Image
            style={props.style}
            size={props.size??82}
            source={{
              uri: OptimizeImage(props.item.profile_photo),
            }}
          />
        ) : (
          <Avatar.Image
            style={props.style}
            size={props.size??82}
            source={require("@images/avatar.png")}
          />
        )}
      </View>
    );
  }
}
export default Userimage;