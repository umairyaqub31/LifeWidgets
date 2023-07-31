import { StyleSheet, Platform } from "react-native";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  gradiet_out: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  gradiet_in: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
  },
  pic: {
    resizeMode: "cover",
  },
  textTooltip: {
    fontSize: 10,
    color: colors.white,
    fontFamily: FontFamily.Regular,
  },
  text: {
    fontSize: 14,
    fontFamily: FontFamily.Regular,
    color: colors.gray,
  },
  modalStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    position:'absolute',
    left:10,
    // top:200,
    height:50,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
  },
  overlayStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  content:{
    backgroundColor: '#fff',
    height:50,
    width:320,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,
    borderBottomLeftRadius:40,
    borderBottomRightRadius:40,
  },
  
  gifGrid:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly'
  }
});

export default styles;