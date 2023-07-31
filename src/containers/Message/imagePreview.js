import React, { Component } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity } from "react-native";
import { StyleSheet,Image } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LifeWidget, Commonstring } from "@common";
import Main from "react-native-country-picker-modal";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import axios from 'axios';

class ImagePreView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ImageList:[],
            UserID: this.props.route.params.UserID,
            ChatUserID: this.props.route.params.ChatUserID,
            selectedImage:'',
            SelectedTrueUser:false,
            buttonType:''
        };
    }
    componentDidMount() {
        this.getWallpeparImages();
    };
    getWallpeparImages = async () => {
        let json =await LifeWidget.getWallpeparPredefined('All');
        console.log(json, "getWallpeparImages");
        if(json.status_code===200)
        {
            this.setState({ImageList:json.user})
            console.log(this.state.ImageList,"ImageListSate")
        }
    }
    selectImage = (data) =>{
        console.log('funct1221212123213')
            this.setState({selectedImage:data,SelectedTrueUser:true});
    }
    saveasDefailt = async () => {
        var formData = new FormData();
        formData.append("user_id", this.state.UserID);
        formData.append("profile",  this.state.selectedImage);
        formData.append("type", 'Default');
        formData.append("old_user_id", this.state.ChatUserID);
        formData.append("status", 'Perdefined');
         console.log('formdataparameter', formData);
        // console.log('this.props', this.props);
        const token = await AsyncStorage.getItem("usertoken");
        console.log("token",token);
        var instance = axios.create({
          baseURL: 'http://lifewidgets.chetu.com/api/',
          timeout: 1000,
          headers: {'Content-Type': 'multipart/form-data;',
          'Accept':'*/*',
          'Authorization': `Bearer ${token}`
        }
        });
        const dataUpload = await instance.post('/v1/store-chat-wall-image', formData);
        console.log('apiresponse', dataUpload);
        if(dataUpload.data.status_code===200)
        {
            this.props.navigation.goBack();
            //this.props.navigation.navigate("ChatUserList");
            //this.setState({ImageList:json.user})
           // console.log(this.state.ImageList,"ImageListSate")
        } 

        // let data1 = {
        //     user_id: this.state.UserID,
        //     profile: this.state.selectedImage,
        //     type:'Default',
        //     old_user_id: this.state.ChatUserID,
        //     Status:'Perdefined',
        //   };
        //   console.log("saveWallpeparImagesPreDefinedData",data1);
        // let json =await LifeWidget.saveWallpepar(data1);
        // console.log(json, "saveWallpeparImagesPreDefined");
        // if(json.status_code===200)
        // {
        //    // this.props.navigation.goBack();
        //     this.props.navigation.navigate("ChatUserList");
        //     //this.setState({ImageList:json.user})
        //    // console.log(this.state.ImageList,"ImageListSate")
        // } 
    }
    saveasChatUser = async () => {
        var formData = new FormData();
        formData.append("user_id", this.state.UserID);
        formData.append("profile",  this.state.selectedImage);
        formData.append("type", 'custom');
        formData.append("old_user_id", this.state.ChatUserID);
        formData.append("status", 'Perdefined');
         console.log('formdataparameter', formData);
        // console.log('this.props', this.props);
        const token = await AsyncStorage.getItem("usertoken");
        console.log("token",token);
        var instance = axios.create({
          baseURL: 'http://lifewidgets.chetu.com/api/',
          timeout: 1000,
          headers: {'Content-Type': 'multipart/form-data;',
          'Accept':'*/*',
          'Authorization': `Bearer ${token}`
        }
        });
        const dataUpload = await instance.post('/v1/store-chat-wall-image', formData);
        console.log('apiresponse', dataUpload);
        if(dataUpload.data.status_code===200)
        {
           this.props.navigation.goBack();
           // this.props.navigation.navigate("ChatUserList");
            //this.setState({ImageList:json.user})
           // console.log(this.state.ImageList,"ImageListSate")
        } 

    }
    render() {
        return (
            <KeyboardAwareScrollView>
                <FlatList
                    data={this.state.ImageList}
                    numColumns={2}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.Container}>
                                <View style={[styles.innerContainer,{ borderWidth:this.state.selectedImage == item.image ? 2  : 0.4}]}>
                                    <TouchableOpacity onPress={()=>{this.selectImage(item.image)}}>
                                        <Image style={styles.ImageStyles} source={{uri:item.image}}/>
                                    </TouchableOpacity>
                              
                                </View>
                            </View>

                        )
                    }}
                />
                {
                    this.state.SelectedTrueUser ?

                    <View style={styles.buttonContainerInner}>
                    <View style={styles.buttonContainerInnerTextContainer}>
                      <TouchableOpacity onPress={() => {this.saveasDefailt()}}>
                        <Text style={styles.buttonContainerInnerText}>Set for All</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainerInnerTextContainer}>
                      <TouchableOpacity onPress={() => {this.saveasChatUser()}}>
                        <Text style={styles.buttonContainerInnerText}>Set only Chat User</Text>
                      </TouchableOpacity>
                    </View>
                </View>

                    : null
                }
             

            </KeyboardAwareScrollView>
        );
    }
}
const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 50,
    },
 
    innerContainer: {
        borderColor: '#000',
        height: 180,
        borderWidth:0.6,
        width: 150,
        alignItems:'center'
    },
    innerContainer1: {
        borderColor: 'red',
        height: 180,
        borderWidth:0.6,
        width: 150,
        alignItems:'center',
        marginHorizontal: 30
    },
    ImageStyles:{
width:149,
height:180,

    },
    buttonContainerInner: {
        justifyContent: 'space-around',
        flexDirection: 'row',
         marginTop:20,
      },
    
      buttonContainerInnerTextContainer: {
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor:'#168BFC',
          borderRadius:10,
          marginTop:10,
          marginBottom:20,
          paddingHorizontal:20,
          paddingVertical:10
      },
      buttonContainerInnerText: {
          color:'#fff',
         alignItems: 'center',
         paddingHorizontal: 5,
         alignItems: 'center',
         fontFamily: FontFamily.Medium
        },

});

export default (ImagePreView);
