import React from "react";
import { ActivityIndicator, Text, View, TouchableOpacity, Image, StyleSheet, Platform } from "react-native";
import { Video, Audio } from "expo-av";
import { Entypo } from '@expo/vector-icons';
import * as VideoThumbnails from "expo-video-thumbnails";
import color from "../../config/color/color";

const millisToMinutesAndSeconds = (millis) => {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  if(isNaN(minutes) || isNaN(seconds)){
      return null;
  }
  return `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}

class VideoPlayer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      pauseButtonDisplay: true,
      replayButtonDisplay: false,
      isBuffering:false,
      image: null,
      time:"",
    };
    this.videoplayer, this.clearTimeout;
  }

  componentDidMount() {
    if (this.props.show) {
      if(Platform.OS === 'ios'){
        this.generateThumbnail();
      }
    }
    //do you really need this now since it is now based on inViewPort
    //this.willBlurSubscription = this.props.navigation.addListener('willBlur', this.willBlurAction);
  }

  componentWillUmount () {
    this.videoPause(); 
  }

  generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        this.props.uri,
        {
          time: 10,
        }
      );
      this.setState({ image: uri });
    } catch (e) {}
  };

  _onPlaybackStatusUpdate = (playbackStatus) => {
    this.setState({time:millisToMinutesAndSeconds(playbackStatus.durationMillis - playbackStatus.positionMillis)})
    if(playbackStatus.isBuffering){
        this.setState({ isBuffering: true});
    } else {
        this.setState({ isBuffering: false});
    }
    if (playbackStatus.isPlaying) {
      if (!this.state.isPlaying) {
        this.setState({ isPlaying: true, replayButtonDisplay: false });
      }
      if (this.state.pauseButtonDisplay) {
        this.clearTimeout = setTimeout(() => {
          this.setState({ pauseButtonDisplay: false });
        }, 2000);
      }
    } else {
      if (this.state.isPlaying) {
        this.setState({ isPlaying: false, replayButtonDisplay: false });
      }
      if (
        playbackStatus.durationMillis === playbackStatus.positionMillis &&
        playbackStatus.isLoaded
      ) {

        this.setState({ replayButtonDisplay: true });
        if (this.videoplayer) {
          this.videoplayer.stopAsync();
        }
      }
      if (!this.state.pauseButtonDisplay) {
        this.setState({ pauseButtonDisplay: true });
      }
    }
  };

  videoPlay = () => {
    this.enableAudio();
    this.videoplayer.playAsync();
    if(typeof this.props.stopOtherPlayer ==="function"){
      this.props.stopOtherPlayer(this.props.id);
    }
  };

  videoPause = () => {
    this.videoplayer.pauseAsync();
  };

  videoReplay = () => {
    this.videoplayer.replayAsync();
  };

  pauseButtonDisplay = () => {
    clearTimeout(this.clearTimeout);
    this.setState({ pauseButtonDisplay: true });
  };

  isPlaying = () => {
    return this.state.isPlaying;
  }

  enableAudio = async () => {
    try{
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        interruptionModeAndroid: INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        shouldDuckAndroid: false,
      })
    } catch(e){}

}

  render() {
    let { image, time, isBuffering  } = this.state;
    let uri = this.props.uri;

    if (this.props.show) {
      return (
        <View>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                width: this.props.width,
                height: 200,
                resizeMode: "cover",
              }}
            />
          ) : (
            <View style={{ width: this.props.width, height: 200 }}></View>
          )}
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, .25)",
            }}
          >
            <Image
              style={{
                width: 50,
                height: 45,
                resizeMode: "contain",
              }}
              source={require("@images/playButton.png")}
            />
          </View>
        </View>
      );
    }
    if (!this.props.show) {
      return (
        <View
          style={[this.props.style]}
        >
          {!this.state.isPlaying ? (
            this.state.replayButtonDisplay ? (
              <TouchableOpacity
                onPress={this.videoReplay}
                style={{
                  position: "absolute",
                  zIndex: 1,
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, .25)",

                }}
              >
                <Image
                  style={{
                    width: 50,
                    height: 45,
                    resizeMode: "contain",
                  }}
                  source={require("@images/replayButton.png")}
                />
              </TouchableOpacity>
            ) : (
                isBuffering?
                <View style={{
                  position: "absolute",
                  zIndex: 1,
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, .25)",
                }}>
                <ActivityIndicator size="large" color={color.white} />
                </View>
                :
              <TouchableOpacity
                onPress={this.videoPlay}
                style={{
                  position: "absolute",
                  zIndex: 1,
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(0, 0, 0, .25)",
                }}
              >
                <Image
                  style={{
                    width: 50,
                    height: 45,
                    resizeMode: "contain",
                  }}
                  source={require("@images/playButton.png")}
                />
              </TouchableOpacity>
            )
          ) : this.state.pauseButtonDisplay ? (
            <TouchableOpacity
              onPress={this.videoPause}
              style={{
                position: "absolute",
                zIndex: 1,
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, .25)",
              }}
            >
              <Image
                style={{ width: 50, height: 45, resizeMode: "contain" }}
                source={require("@images/pauseButton.png")}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={this.pauseButtonDisplay}
              style={{
                position: "absolute",
                zIndex: 1,
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            ></TouchableOpacity>
          )}

          <Video
            ref={(ref) => {
              this.videoplayer = ref;
            }}
            source={{
              uri: uri,
            }}
            //ignoreSilentSwitch={"ignore"}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={Video.RESIZE_MODE_COVER}
            shouldCorrectPitch={true}
            playsInSilentLockedModeIOS={ true }
            ignoreSilentSwitch={"ignore"}
            onPlaybackStatusUpdate={(playbackStatus) =>
              this._onPlaybackStatusUpdate(playbackStatus)
            }
            style={{
              flex:1,
              backgroundColor: '#fff',
              aspectRatio: 4 / 5,
              justifyContent:'center',
              alignItems:'center',

            }}
          />
          {!!time &&
          <View style={{position:"absolute", bottom:0, right:0, backgroundColor:"#000", margin:5, padding:2, borderRadius:5}}>
          <Text style={{color:color.white, fontSize:16}}>{time}</Text>
          </View>
          }
          {!!time &&
          <View style={{position:"absolute", bottom:0, left:0, backgroundColor:"#000", margin:5, padding:2, borderRadius:5, zIndex:10}}>
          <TouchableOpacity style={{zIndex:10}} onPress={()=>this.videoplayer.presentFullscreenPlayer()}>
          <Entypo name="resize-full-screen" size={24} color={color.white} />
          </TouchableOpacity>
          </View>
          }
        </View>
      );
    }

    return null;
  }
}

const styles = StyleSheet.create({});

export default VideoPlayer;
