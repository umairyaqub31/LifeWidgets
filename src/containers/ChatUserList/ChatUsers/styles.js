import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white,
  },
  scrolledview:{
    flex:1,
    padding:15,
  },
  textBold:{
      fontFamily:FontFamily.Medium,
      fontSize:15,
      color:colors.black,
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
  primaryBtn:{
    backgroundColor:colors.primary,
    margin:15,
    padding:10,
    borderRadius:6
  },
  primaryBtnText:{
    fontFamily:FontFamily.Medium,
    color:colors.white,
    textAlign:'center'
  },
  chipOpcity: {
    backgroundColor: colors.lightGray,
    borderRadius: 30,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});

export default styles;