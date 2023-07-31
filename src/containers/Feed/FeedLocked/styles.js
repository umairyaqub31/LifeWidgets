import { StyleSheet } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width - 30;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white',
    },
    scrolledView:{
      flex:1,
      padding:15
    },
    textgray:{
      fontSize: 13,
      fontFamily: FontFamily.Regular,
      color:colors.gray
    },
    text:{
      fontSize:15,
      fontFamily:FontFamily.Regular,
      color:colors.black,
    },
    heading:{
      fontSize:20,
      fontFamily:FontFamily.Medium,
      color:colors.black,
      textAlign:'center'
    },
    setFeedLockedTime:{
      flex:1,
    },
    spacing:{
      height:15
    },
    primaryBtn:{
      backgroundColor:colors.primary,
      height:40,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:4,
  },
  primaryBtnText:{
      color:colors.white,
      fontFamily:FontFamily.Medium,
      fontSize:16,
      textTransform:'uppercase',
  },
  DatePicker:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:colors.lightGray,
    borderRadius:6,
    padding:10
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
  headerlogo:{
    resizeMode:"contain",
    width:windowWidth,
    height:100
  }
});
  
export default styles;