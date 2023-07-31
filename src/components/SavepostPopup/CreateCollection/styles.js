import { StyleSheet } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  scrolledView:{
    padding:15,
  },
  textBold:{
    fontSize:16,
    fontFamily:FontFamily.Medium,
    color:colors.black,
    textAlign:'center'
  },
  text:{
    fontSize:16,
    fontFamily:FontFamily.Regular,
    color:colors.black,
    textAlign:'center'
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
  roundedtextinputcontainer:{
    backgroundColor:colors.lightGray,
    borderRadius:6,
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:10,
    height: 40,
    marginTop:15,
    marginBottom:30
  },
  roundedtextinput:{
    flex:1,
    height:"100%",
    paddingLeft:5,
  },
  multiBtn:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around'
  },
  primaryBtn:{
    flex:1,
    marginLeft:30,
    backgroundColor:colors.primary,
    height:40,
    textTransform:'uppercase',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:4,
  },
  primaryBtnText:{
      color:colors.white,
      fontFamily:FontFamily.Medium,
      fontSize:14
  },
  grayBtn:{
    flex:1,
    marginRight:30,
    backgroundColor:colors.lightGray,
    height:40,
    textTransform:'uppercase',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:4,
  },
  grayBtnText:{
      color:colors.black,
      fontFamily:FontFamily.Medium,
      fontSize:14
  },
  });
  
export default styles;