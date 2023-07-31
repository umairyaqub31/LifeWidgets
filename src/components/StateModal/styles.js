import { StyleSheet } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  modalView:{
      flex:1,
      marginTop:20
  },
  close:{
    marginTop:20,
    marginRight:10,
    alignSelf:"flex-end"
  },
  item:{
    padding:12, 
    borderBottomWidth:1, 
    borderBottomColor:colors.lightGray,
    justifyContent:"center",
  },
  textStyle:{
    fontFamily:FontFamily.Regular,
    fontSize:17
  }
});

export default styles;