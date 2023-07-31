import { StyleSheet, Platform } from "react-native";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const styles = StyleSheet.create({
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
  reactionsGif:{
    resizeMode: 'cover',
    height: 35,
    width: 35,
  },
  gifGrid:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly'
  }
});

export default styles;