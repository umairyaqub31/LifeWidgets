import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  scrolledview: {
    padding: 15,
    flex:1,
  },
  noCopy:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal:30
  },
  separator: {
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    fontFamily: FontFamily.Regular,
    color: colors.black,
  },
  textGray: {
    fontSize: 14,
    fontFamily: FontFamily.Regular,
    color: colors.gray,
  },
  textBold: {
    fontSize: 15,
    fontFamily: FontFamily.Medium,
    color: colors.black,
  },
  textPrimary: {
    fontSize: 14,
    fontFamily: FontFamily.Medium,
    color: colors.primary,
  },
  listPanel:{
    padding:10,
    borderRadius:6,
    margin:1,
    backgroundColor:colors.white,
  },
  list:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:10
  },
  listIcon:{
    marginRight:10
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
});

export default styles;