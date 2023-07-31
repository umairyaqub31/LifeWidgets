import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  ProfileImageBackground:{
        height:180,
        width:'100%',
        resizeMode:'cover',
        borderRadius:0
    },
    ProfileAvatarContainer:{
      alignItems:'flex-start',
      justifyContent:'center',
      marginLeft:10,
      position:'absolute',
      top:135,
    },
    ProfileAvatarOpactiy:{
      borderRadius:75,
      width:75,
      height:75,
      flexDirection:'row',
      alignItems:'center',
      margin:3,
      backgroundColor:colors.white,
      shadowColor: "#000",
      shadowOffset: {
    	width: 0,
    	height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    ProfileAvatar:{
      backgroundColor:'transparent',
      resizeMode:'contain'
    },
    onlineStatusDot:{
      backgroundColor:'#31a24c',
      padding:6,
      borderRadius:30,
      marginLeft:-45,
      borderWidth:1.5,
      borderColor:colors.white
    }
  });

export default styles;
