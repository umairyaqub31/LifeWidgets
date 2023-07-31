import React, { Component } from "react";
import {
  Animated,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  View,
  LayoutAnimation,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";
import colors from "../../../config/color/color";
import { LifeWidget } from "@common";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
const closeAnimationConfig = {
  timing: { duration: 0 },
};
const images = [
  {
    id: 1,
    code: "100",
    img: require("@images/reaction/100.png"),
    select: require("@images/reaction/100.png"),
    text: "",
    color: colors.danger,
  },
  {
    id: 2,
    code: "love",
    img: require("@images/reaction/love.gif"),
    select: require("@images/reaction/love.png"),
    text: "Love",
    color: colors.danger,
  },
  {
    id: 3,
    code: "haha",
    img: require("@images/reaction/haha.gif"),
    select: require("@images/reaction/haha.png"),
    text: "Haha",
    color: colors.warning,
  },
  {
    id: 4,
    code: "wow",
    img: require("@images/reaction/wow.gif"),
    select: require("@images/reaction/wow.png"),
    text: "Wow",
    color: colors.warning,
  },
  {
    id: 5,
    code: "sad",
    img: require("@images/reaction/sad.gif"),
    select: require("@images/reaction/sad.png"),
    text: "Sad",
    color: colors.warning,
  },
  {
    id: 6,
    code: "sarcasm",
    img: require("@images/reaction/rolling.gif"),
    select: require("@images/reaction/rolling.png"),
    text: "Sarcasm",
    color: colors.warning,
  },
  {
    id: 7,
    code: "angry",
    img: require("@images/reaction/angry.gif"),
    select: require("@images/reaction/angry.png"),
    text: "Angry",
    color: colors.danger,
  },
];
export default class Reactions3 extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      url: require("@images/reaction/like.gif"),
      text: "Like",
      select: require("@images/reaction/like.png"),
      color: colors.primary,
      target: 0,
    };
    this.ReactionsPopup = React.createRef();
  }
  getImages() {
    return images.map((img, i) => {
      return (
        <Animated.View
          style={{
            position: "relative",
            zIndex: 1,
            transform: [{ rotate: (i * 0) / 1 + "deg" }, { translateX: 0 }],
          }}
        >
          <TouchableOpacity onPress={() => this.change(img)}>
            <Animated.Image
              style={[styles.pic, { height: 35, width: 35 }]}
              source={img.img}
            />
          </TouchableOpacity>
        </Animated.View>
      );
    });
  }
  change = async (i) => {
    this.ReactionsPopup.current?.close();
    this.props.item.reaction = { code: i.code };
    this.setState({open:!this.state.open})
    const json = await LifeWidget.addReaction(this.props.item.id, i.id);
  };
  open = (evt) => {
    this.ReactionsPopup.current?.open();
    this.setState({ target: evt.nativeEvent.pageY - 81 });
  };
  close = async () => {
    this.ReactionsPopup.current?.close();
    this.setState({ open: false });
    if (this.props.item.reaction) {
      this.props.item.reaction = false;
      const json = await LifeWidget.removeReaction(this.props.item.id);
    } else {
      this.props.item.reaction = { code: "100", id: 1 };
      const json = await LifeWidget.addReaction(this.props.item.id, 1);
    }
  };
  render() {
    const { reaction } = this.props.item;
    const selected = images.find((item) => item.code === reaction.code);
    return (
      <View style={styles.gradiet_out}>
        <View style={[styles.gradiet_in]}>
          {reaction && selected ? (
            <TouchableOpacity
              onPress={this.close}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <Image
                style={[
                  styles.pic,
                  {
                    height: 24,
                    width: 24,
                    marginRight: 2,
                  },
                ]}
                source={selected.select}
              />
              <Text style={(styles.text, { color: selected.color })}>
                {selected.text}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={this.open}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <MaterialCommunityIcons
                name="eye"
                size={26}
                color={colors.gray}
              />
              <Text style={styles.text}>{" Rate"}</Text>
            </TouchableOpacity>
          )}
        </View>
        <Portal>
          <Modalize
            ref={this.ReactionsPopup}
            withHandle={false}
            adjustToContentHeight={true}
            closeOnOverlayTap={true}
            modalStyle={[styles.modalStyle, { top: this.state.target }]}
            overlayStyle={styles.overlayStyle}
            panGestureEnabled={false}
            closeAnimationConfig={closeAnimationConfig}
          >
            <View style={styles.content}>
              <View style={styles.gifGrid}>{this.getImages()}</View>
            </View>
          </Modalize>
        </Portal>
      </View>
    );
  }
}