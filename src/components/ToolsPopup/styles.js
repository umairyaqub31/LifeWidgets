import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
      modalgridcontainer:{
        flexDirection:'row',
        flexWrap:'wrap',
        paddingBottom:10,
      },
      modallistcontainer:{
        flexDirection:'column',
        alignItems:'center',
        width:'33%',
        marginBottom:15,
      },
      modallist:{
        fontSize:17,
        fontFamily:FontFamily.Regular,
      },
      popupclosehead:{
          flexDirection:'row',
          justifyContent:'center',
          alignItems:'center',
          marginTop:15
      },
      text:{
          fontFamily:FontFamily.Medium,
          fontSize:15,
          color:colors.black
      },
      separator:{
          marginTop:13,
          marginBottom:15
      },
      chipiconopacity:{
        backgroundColor:colors.lightGray,
        width:45,
        height:45,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:40,
        marginBottom:5
      },
      activechipiconopacity:{
        backgroundColor:colors.primary,
      }
  });
  
export default styles;