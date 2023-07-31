import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";


const width = Dimensions.get('window').width-50;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:colors.white,
    },
    whiteText:{
      color:colors.white
    },
    heading: {
      color:colors.primary,
      fontSize: 24,
      fontFamily: FontFamily.Medium,
    },
    Text:{
      fontSize: 16,
      fontFamily: FontFamily.Regular,
      textAlign:'justify',
    },
    SwiperContainer:{
        flex:1,
        padding:15,
        marginTop:10,
        justifyContent:'center',
        backgroundColor:colors.primary,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
    },
    spacing:{
      height:15
    },
    logo:{
      width:width,
      height:100,
      resizeMode:'contain'
    },
    loginbuttons:{
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:colors.white,
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        padding:15
    },
    filledbtn:{
        backgroundColor:colors.white,
        borderColor:colors.white,
        borderWidth:2,
        borderRadius:30,
        height:45,
        alignItems:'center',
        justifyContent:'center',
    },
    filledbtnText:{
        fontSize: 16,
        fontFamily: FontFamily.Medium,
        color:colors.primary
    }
  });
  
export default styles;