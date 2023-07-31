import { StyleSheet } from 'react-native';
import color from '../../config/color/color';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
      },
      scrolledview:{
        flex:1,
        padding:15,
      },
    profileimage: {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#fff',
    },
    profileimagewithoption:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingTop:15,
      paddingBottom:10,
    },
    username: {
      color:colors.black,
      fontSize: 16,
      fontFamily: FontFamily.Medium,
    },
    avatarimage:{
      backgroundColor:colors.white
    },
    textgray:{
      color:colors.gray,
      fontSize: 13,
      fontFamily: FontFamily.Regular,
    },
    primarybtn:{
        backgroundColor:colors.primary,
        padding:10,
        paddingTop:5,
        paddingBottom:5,
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center'
    },
    primarybtntext:{
        fontFamily:FontFamily.Medium,
        color:colors.white,
        fontSize:13,
        marginLeft:3
    },
    avataroverly:{
        marginRight:15,
        flexDirection:'row',
        alignItems:'flex-end'
    },
    avataroverlyicon:{
        backgroundColor:colors.primary,
        width:28,
        height:28,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:2,
        borderColor:colors.white,
        borderRadius:30,
        position:'absolute',
        right:-6,
        bottom:-5
    },
    dislike:{
        backgroundColor:colors.gray
    },
    favorite:{
        backgroundColor:'red'
    }
  });
  
export default styles;