import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:15,
      backgroundColor:colors.white,
    },
    profileimage: {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#fff',
    },
    boxShadow:{
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
    },
    username: {
      color:colors.black,
      fontSize: 17,
      fontFamily: FontFamily.Medium,
    },
    avatarimage:{
      marginRight:10,
      backgroundColor:colors.white
    },
    seeprofile:{
      color:colors.gray,
      fontSize: 14,
      fontFamily: FontFamily.Regular,
    },
    pillscontainer:{
      marginTop:10,
      flexDirection:'row',
      flexWrap:'wrap',
      justifyContent:'space-between',
    },
    menuscreenpills:{
      alignItems:'center',
      maxWidth:'49%',
      width:'100%',
      marginBottom:10
    },
    menuImage:{
      resizeMode: "cover",
      height:100,
      width:'100%',
      borderRadius:8,
    },
    menuscreenpillstext:{
      color:colors.black,
      fontSize: 16,
      fontFamily: FontFamily.Medium,
      marginTop:2
    },
    menubottom:{
      marginBottom:30
    },
    menubottomlist:{
      padding:5,
      paddingLeft:10,
      paddingRight:10,
      flexDirection:'row',
      alignItems:'center',
    },
    separator:{
      marginVertical:0
    },
    accordion:{
      padding:0,
      margin:0,
      marginLeft:-5,
      marginRight:-5,
    },
    accordionLeftIcon:{
      margin:0
    },
    accordionTitle:{
      fontFamily: FontFamily.Medium,
      color:colors.black,
      fontSize: 16,
    },
    listPanel:{
      margin:5,
      padding:10,
      borderRadius:6,
      backgroundColor:colors.lightGray,
      paddingLeft:10,
      flexDirection:'row',
      alignItems:'center'
    },
    listPanelIcon:{
      marginRight:10
    }
  });
  
export default styles;