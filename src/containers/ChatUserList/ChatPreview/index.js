import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  Animated,
  TouchableOpacity,
  Keyboard,
  Alert,
} from "react-native";
import styles from "./styles";
import { Avatar } from "react-native-paper";
import {
  Ionicons,
  AntDesign,
  MaterialIcons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";


class ChatPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.translateValue = new Animated.Value(0);
    this.modalizeRef = React.createRef();
  }

  SavepostPopup = () => {
    this.modalizeRef.current?.open();
  };

  componentDidMount() {
    this.props.navigation
      .dangerouslyGetParent()
      ?.setOptions({ tabBarVisible: false });
    this.props.navigation.setOptions({
       headerLeft:()=> 
          <View style={{flexDirection:'row', alignItems:'center',flex:1}}>
            <TouchableOpacity style={{flex:1,justifyContent:'center'}} onPress={()=> this.props.navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={30} color="black" />
            </TouchableOpacity>
            <Avatar.Image
              size={48}
              source={require('../../../../assets/images/block.jpg')}
            />
            <Text style={styles.userName}>User Name</Text>
        </View>,
        headerRight:()=> 
        <TouchableOpacity style={styles.headerRight} onPress={this.SavepostPopup}>
          <MaterialIcons name="add-call" size={24} color={colors.primary} />
        </TouchableOpacity>
    });
  }

  UNSAFE_componentWillMount() {
    this.keyboardWillShowSub = Keyboard.addListener(
      "keyboardWillShow",
      this.keyboardWillShow
    );
    this.keyboardWillHideSub = Keyboard.addListener(
      "keyboardWillHide",
      this.keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }
  keyboardWillShow = (event) => {
    Animated.timing(this.translateValue, {
      toValue: -event.endCoordinates.height,
      duration: event.duration,
      useNativeDriver: true,
      easing: Easing.out(Easing.elastic(1)),
    }).start();
  };
  keyboardWillHide = (event) => {
    Animated.spring(this.translateValue, {
      toValue: 0,
      duration: event.duration,
      useNativeDriver: true,
      easing: Easing.in(Easing.elastic(1)),
    }).start();
  };


  render(){
    return (
      <>
      <KeyboardAwareScrollView style={{flex:1,backgroundColor:colors.white}}>
        <View style={[styles.container,{flex:1,height:'100%'}]}>
            <Text style={styles.userName}>Chat Preview</Text>
        </View>
        <Portal>
        <Modalize ref={this.modalizeRef} adjustToContentHeight={true}> 
          <View> 
              <TouchableOpacity style={styles.modelList}>
                <Feather name="phone-call" size={24} color={colors.primary} />
                <Text style={styles.listText}>Call</Text>
              </TouchableOpacity>
              <View style={styles.separator} />
              <TouchableOpacity style={styles.modelList}>
                <FontAwesome name="video-camera" size={24} color={colors.primary} />
                <Text style={styles.listText}>Video</Text>
              </TouchableOpacity>
          </View>
        </Modalize>
      </Portal>
      </KeyboardAwareScrollView>
      <Animated.View
          style={[styles.boxShadow,{
            transform: [{ translateY: this.translateValue }],
            zIndex: 11,
            width: "100%",
            backgroundColor:colors.white
          }]}
        >
        <View style={[styles.roundedtextinputcontainer, styles.boxShadow]}>
          <TouchableOpacity>
              <AntDesign name="pluscircle" size={24} color={colors.gray}/>
          </TouchableOpacity>
            <TextInput
              multiline
              style={styles.roundedtextinput}
              placeholder="Type your message"
              placeholderTextColor={colors.gray}
            />
            <TouchableOpacity style={styles.sendIconBtn}>
              <Ionicons name="ios-send" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      
        </>
    );
  }
}
  

export default ChatPreview;