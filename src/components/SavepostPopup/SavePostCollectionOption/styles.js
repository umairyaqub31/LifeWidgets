import { StyleSheet } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  scrolledView:{
    padding:15,
  },
  roundedImage:{
    width:42,
    height:42,
    resizeMode:'cover',
    borderRadius:6
  },
  modallistcontainer:{
    flexDirection:'row',
    alignItems:'center',
    paddingTop:10,
    paddingBottom:10,
  },
  modallistcontainerRadio:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingTop:10,
    paddingBottom:10,
},
modallistcontainerRight:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    flex:1,
    marginLeft:10,
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
  }
  });
  
export default styles;