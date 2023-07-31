import React, { Component } from "react";
import {
  PanResponder,
  Dimensions,
  Animated,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  View,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./styles";
import colors from "../../../config/color/color";
import { LifeWidget } from "@common";
const windowWidth = Dimensions.get("window").width;

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
      visible: false,
      url: require("@images/reaction/like.gif"),
      text: "Like",
      select: require("@images/reaction/like.png"),
      color: colors.primary,
    };
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
          {/* {this.state.visible ? (
            <View style={this.text_out()}>
              <Text style={styles.textTooltip}>{img.text}</Text>
            </View>
          ) : null} */}
          <TouchableOpacity onPress={() => this.change(img)}>
            <Animated.Image
              style={[
                styles.pic,
                this.img(),
              ]}
              source={img.img}
            />
          </TouchableOpacity>
        </Animated.View>
      );
    });
  }
  text_out() {
    if (this.state.open)
      return {
        position: "absolute",
        left: -8,
        top: -50,
        backgroundColor: "rgba(0, 0, 0, .9)",
        minWidth: 45,
        height: 15,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
      };
  }
  gradiet_out() {
    if (this.state.open)
      return {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        justifyContent: "space-evenly",
        borderRadius: 225,
        backgroundColor: "#fff",
        transform: [{ translate: [0, 0, 1] }],
        zIndex: 5,
        borderWidth: 1,
        borderColor: colors.lightGray,
        minWidth: 320,
        width: "100%",
        height: 45,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        position: "absolute",
        left: 18,
      };
  }
  gradiet_in() {
    if (this.state.open)
      return {
        backgroundColor: "#fff",
      };
  }
  img() {
    if (this.state.open) {
      return {
        height: 35,
        width: 35,
      };
    }
    return {
      height: 0,
      width: 0,
    };
  }
  change = async (i) => {
    this.props.item.reaction = { code: i.code };
    this.setState({
      open: !this.state.open,
    });
  const json = await LifeWidget.addReaction(this.props.item.id, i.id);
  };
  onPressIn = () => {
    this.setState({ visible: true });
  };
  onPressOut = () => {
    this.setState({ visible: false });
  };
  open = () => {
    LayoutAnimation.configureNext({
      duration: 200,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      },
    });
    this.setState({ open: true });
  };
  close = () => {
    this.setState({ open: false });
    if (this.props.item.reaction) {
      this.props.item.reaction = false;
    } else {
      this.props.item.reaction = { code: "100", id:1 };
    }
  };
  render() {
    const { max_vote } = this.props.item;
    const selected = images.find((item) => item.code === max_vote.code);
    if(max_vote.count>0){
      return (
        <View style={styles.gradiet_out}>
          <View  style={{ flexDirection: "row", alignItems: "center" }}>
              {max_vote && selected ? (
                <>
                  <Image
                    style={[
                      styles.pic,
                      {
                        height: 25,
                        width: 25,
                        marginRight: 3,
                      },
                    ]}
                    source={selected.select}
                  />
                  <Text style={(styles.text, { color: selected.color })}>
                    {max_vote.count}
                  </Text>
                </>
              ) : null}
          </View>
        </View>
      );
    }
    return null;
  }
}