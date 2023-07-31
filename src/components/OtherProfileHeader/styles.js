import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  ProfileImageBackground:{
        height:180,
        width:'100%',
        resizeMode:'cover',
        alignItems:'flex-end',
        justifyContent:'flex-end',
        borderRadius:0
    },
    ProfileAvatarContainer:{
      alignItems:'flex-start',
      justifyContent:'flex-start',
      position:'absolute',
      top:70,
    },
    ProfileAvatarOpactiy:{
        marginTop:70,
        marginLeft:15,
        borderRadius:80,
        width:75,
        height:75,
        flexDirection:'row',
        alignItems:'center',
        padding:0,
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
      marginLeft:-50,
      borderWidth:1.5,
      borderColor:colors.white
    }
  });

export default styles;
