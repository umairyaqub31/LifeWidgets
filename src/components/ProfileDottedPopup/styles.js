import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({

  scrolledView:{
    flex:1,
    padding:15
  },
  modallistcontainer:{
    flexDirection:'row',
    alignItems:'center',
    paddingTop:10,
    paddingBottom:10,
  },
  modallist:{
    fontSize:17,
    fontFamily:FontFamily.Regular,
  },
  customchipicons:{
    backgroundColor:colors.lightGray,
    width:40,
    height:40,
    borderRadius:20,
    alignItems:'center',
    justifyContent:'center'
  },
  graytext:{
    fontSize:14,
    fontFamily:FontFamily.Regular,
    color:colors.gray
  },
  lightPrimaryBtn:{
    backgroundColor:colors.lightPrimary,
    padding:10,
    borderRadius:6,
    alignItems:'center',
    marginTop:15
  },
  lightPrimaryBtnText:{
    fontFamily:FontFamily.Medium,
    fontSize:16,
    color:colors.primary
  },
  primaryBtn:{
    backgroundColor:colors.primary,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    padding:10,
    flex:1,
    borderRadius:6,
  },
  primaryBtnText:{
    fontSize:16,
    color:colors.white,
    fontFamily:FontFamily.Medium,
    marginLeft:5
  },
  });
  
export default styles;