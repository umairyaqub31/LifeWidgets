import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import styles from './styles';
import { AntDesign } from '@expo/vector-icons';
import ConnectyCube from 'react-native-connectycube'
import moment from "moment";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as Linking from 'expo-linking';
import { MessageSendState } from '@components'
class ChatBox extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      userFullName:''
    }
  }
  //for downloading the attachment
  downloadFile = async (remoteUrl, localPath, name) => {
    const fileUri = FileSystem.documentDirectory + name;
    const url = remoteUrl;

    let downloadObject = FileSystem.createDownloadResumable(
      url,
      fileUri
    );
    await downloadObject.downloadAsync().then(({ uri }) => {
      Linking.openURL(url);
      console.log('ddddd888888888888');
    })
      .catch(error => {
        console.error(error);
      })
  }

  saveFile = async (fileUri) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      console.log(fileUri, 'asset');
      await MediaLibrary.createAlbumAsync("Download", asset, false);
      Linking.openURL(fileUri);
    }
  }

  // get user detaails
  getUser = async(id) =>{
    let name="demo";
  const params = {
      page: 1,
      per_page: 1,
      filter: {
        field: "id",
        param: "in",
        value: [id],
      },
    };

    
    await ConnectyCube.users
      .get(params)
      .then((result) => { 
           console.log(result.items[0].user.full_name,'coonectycub111111'); this.setState({userFullName:result.items[0].user.full_name}); 
          
           name=result.items[0].user.full_name;
          })
      .catch((error) => { console.log(error)});

      // setTimeout(async ()=>{
      //     await this.getMessage();
      //   },1000)

      return name;
}

  render() {
    const { message, currentUserCubeId , chatType,username } = this.props;
    // this.getUser(message.sender_id);
    return (
      (message.sender_id != currentUserCubeId ? message.body == "Image attachment" ?
        <View style={styles.senderMessage}>
          {message.attachment[0].type.split("/")[0] == 'image' ?
            <View style={{}}>
              
              <TouchableOpacity style={styles.sendImage} onPress={() => this.props.navigation.navigate('ViewFullImage', { imageUrl: ConnectyCube.storage.privateUrl(message.attachment[0].uid) })}  >
                <Image style={styles.chatImage} source={{ uri: ConnectyCube.storage.privateUrl(message.attachment[0].uid) }} />
              </TouchableOpacity>
              <View style={[styles.sendImageTime, styles.sendImagePosition]}>
                <Text style={{}}>
                  {moment(new Date(message.date_sent * 1000)).format('h:mm a')}
                </Text>
                <MessageSendState send_state={message.send_state} />
              </View>
            </View>
            :
            <TouchableOpacity View style={[styles.sendMessageText,]} onPress={() => this.downloadFile(ConnectyCube.storage.privateUrl(message.attachment[0].uid), message.attachment[0].url, message.attachment[0].name)}  >
              <View style={styles.sendFileNameView}>
                <Text style={styles.sendFileNameText} >{message.attachment[0].name} </Text>
                <AntDesign name="clouddownload" size={24} color="#ffffff" />
              </View>
              <View style={styles.sendImagePosition}>
                <Text style={styles.sendFileTime}>
                  {moment(new Date(message.date_sent * 1000)).format('h:mm a')}
                </Text>
                <MessageSendState send_state={message.send_state} /></View>
            </TouchableOpacity>
          }
        </View>
        :
        <View style={styles.senderMessage}>
          <View style={styles.sendMessageText}>
            <Text style={styles.sendMsgText}>
              {message.body}
            </Text>
            <View style={styles.sendImagePosition}>
              <Text style={styles.recieveMessageTime}>
                {moment(new Date(message.date_sent * 1000)).format('h:mm a')}
              </Text><MessageSendState send_state={message.send_state} /></View>
          </View>
        </View>
        :

        message.body == "Image attachment" ?
          <View style={styles.recieveMessageView}>
                {message.attachment[0].type.split("/")[0] == 'image' ?
              <View>
                <Text>{message.sender_name}</Text> 
             <TouchableOpacity style={styles.recieveImage} onPress={() => this.props.navigation.navigate('ViewFullImage', { imageUrl: ConnectyCube.storage.privateUrl(message.attachment[0].uid) })} >
                  <Image style={styles.chatImage} source={{ uri: ConnectyCube.storage.privateUrl(message.attachment[0].uid) }} />
                </TouchableOpacity>
                <View style={styles.sendImagePosition}>
                  <Text style={styles.sendImageTime}>
                    {moment(new Date(message.date_sent * 1000)).format('h:mm a')}
                  </Text></View>
              </View>
              :
              <TouchableOpacity View style={[styles.recieveMessageText,]} onPress={() => this.downloadFile(ConnectyCube.storage.privateUrl(message.attachment[0].uid), message.attachment[0].url, message.attachment[0].name)}  >
                <View style={styles.recieveFileNameView}>
                <Text style={{ fontSize:15,fontWeight: 'bold'}}>{message.sender_name}</Text> 
                
                  <Text style={styles.recieveFileNameText} >{message.attachment[0].name} </Text>
                  <AntDesign name="clouddownload" size={24} color="#ffffff" />
                </View>
                <View style={styles.sendImagePosition}>
                  <Text style={styles.sendFileTime}>
                    {moment(new Date(message.date_sent * 1000)).format('h:mm a')}
                  </Text></View>
              </TouchableOpacity>
            }
          </View>
          :
          <View style={styles.recieveMessageView}>
               
            <View style={styles.recieveMessageText}>
            
            <Text style={[styles.recievetext,{fontWeight:'bold'}]}>{message.sender_name}</Text> 

              <Text style={styles.recievetext}>
                {message.body}
              </Text>
              
              <View style={styles.sendImagePosition}>
                <Text style={styles.recieveTextTime}>
                  {moment(new Date(message.date_sent * 1000)).format('h:mm a')}
                </Text></View>
            </View>
          </View>
      )
    );
  }
};

export default ChatBox;