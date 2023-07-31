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
import { Modalize } from 'react-native-modalize';
import { Portal } from "react-native-portalize";
import { Alert } from "react-native";

const height = Dimensions.get("window").height;

const images = [
  { id: 'like', img: 'http://i.imgur.com/LwCYmcM.gif' },
  { id: 'love', img: 'http://i.imgur.com/k5jMsaH.gif' },
  { id: 'haha', img: 'http://i.imgur.com/f93vCxM.gif' },
  { id: 'yay', img: 'http://i.imgur.com/a44ke8c.gif' },
  { id: 'wow', img: 'http://i.imgur.com/9xTkN93.gif' },
  { id: 'sad', img: 'http://i.imgur.com/tFOrN5d.gif' },
  { id: 'angry', img: 'http://i.imgur.com/1MgcQg0.gif' },
];


export default class ReactionsPopup extends Component {
  constructor() {
    super();
    this.state = {
      url: 'http://i.imgur.com/k5jMsaH.gif',
      evt:null,
      target:0
    };
    this.ReactionsPopup = React.createRef();
  }

  modalizeOpen = (evt) => {
    this.setState({target:evt.nativeEvent.pageY - 81})
    this.ReactionsPopup.current?.open();
  };

  render() {
    return (
      <>
      <Portal>
          <Modalize 
            ref={this.ReactionsPopup} 
            withHandle={false} 
            adjustToContentHeight={true} 
            closeOnOverlayTap={true} 
            modalStyle={[styles.modalStyle,{top:this.state.target}]} 
            overlayStyle={styles.overlayStyle}>
            <View style={styles.content}>
                <View style={styles.gifGrid}>
                    <Image
                      style={styles.reactionsGif}
                      source={require("@images/reaction/100.png")}
                    />
                    <Image
                      style={styles.reactionsGif}
                      source={require("@images/reaction/love.gif")}
                    />
                    <Image
                      style={styles.reactionsGif}
                      source={require("@images/reaction/haha.gif")}
                    />
                    <Image
                      style={styles.reactionsGif}
                      source={require("@images/reaction/wow.gif")}
                    />
                    <Image
                      style={styles.reactionsGif}
                      source={require("@images/reaction/sad.gif")}
                    />
                    <Image
                      style={styles.reactionsGif}
                      source={require("@images/reaction/rolling.gif")}
                    />
                    <Image
                      style={styles.reactionsGif}
                      source={require("@images/reaction/angry.gif")}
                    />
                </View>
            </View>
          </Modalize>
      </Portal>
      </>
    );
  }
}