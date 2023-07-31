import { StyleSheet } from "react-native";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  scrolledView: {
    padding: 15,
  },
  modelHead:{
    backgroundColor:colors.lightGray,
    justifyContent:'center',
    alignItems:'center',
    height:50,
    borderTopLeftRadius:14,
    borderTopRightRadius:14,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'space-between',
    paddingTop: 10,
    paddingBottom: 10,
  },
  listInline:{
    flexDirection:'row',
    alignItems:'center'
  },
  modallist: {
    fontSize: 17,
    fontFamily: FontFamily.Regular,
  },
  customchipicons: {
    backgroundColor: colors.lightGray,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight:10
  },
  graytext: {
    fontSize: 14,
    fontFamily: FontFamily.Regular,
    color: colors.gray,
  },
  textBold: {
    fontSize: 16,
    fontFamily: FontFamily.Medium,
    color: colors.black,
  },
  heading: {
    fontSize: 18,
    fontFamily: FontFamily.Medium,
    color: colors.black,
  },
});

export default styles;