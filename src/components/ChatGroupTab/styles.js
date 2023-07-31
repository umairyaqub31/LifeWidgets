import { StyleSheet } from "react-native";
import color from "../../config/color/color";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrolledview: {
    flex:1,
    padding:15,
  },
  text: {
    fontFamily: FontFamily.Regular,
    fontSize: 14,
    color: colors.black,
  },
  profileimage: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  username: {
    color: colors.black,
    fontSize: 16,
    fontFamily: FontFamily.Medium,
  },
  avatarimage: {
    marginRight: 10,
    backgroundColor: colors.white,
  },
  timeslotstatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeago: {
    fontSize: 14,
    fontFamily: FontFamily.Regular,
    color: colors.gray,
  },
  timeagodot: {
    backgroundColor: colors.gray,
    width: 3,
    height: 3,
    borderRadius: 20,
    marginLeft: 3,
    marginRight: 5,
  },
  timeagoearth: {
    width: 12,
    height: 12,
    marginLeft: 3,
  },
  withText: {
    marginTop: 1,
    marginRight: 5,
  },
  textgray: {
    fontSize: 14,
    fontFamily: FontFamily.Regular,
    color: colors.gray,
  },
  mentions: {
    fontSize: 14,
    fontFamily: FontFamily.Regular,
    color: colors.primary,
  },
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  roundedtextinputcontainer: {
    backgroundColor: colors.lightGray,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
  },
  roundedtextinput: {
    flex: 1,
    height: "100%",
    paddingLeft: 5,
  },
  usersOnline: {
    marginVertical: 13,
  },
  userOnline: {
    alignItems: "center",
    marginRight: 10,
    borderRadius: 6,
    backgroundColor: colors.white,
    margin: 2,
    padding: 10,
  },
  spacing: {
    height: 6,
  },
  separator: {
    height: 1,
    backgroundColor: colors.lightGray,
    marginVertical: 13,
  },
  greenDot: {
    backgroundColor: colors.success,
    height: 10,
    width: 10,
    borderRadius: 30,
    position: "absolute",
    left: 42,
    top: 2,
    zIndex: 11,
  },
  badge:{
    backgroundColor:colors.primary,
  },
  bold:{
    fontFamily:FontFamily.Medium
  },
  addGroupButton:{
    marginLeft:5
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
  rightAction: {
    backgroundColor: colors.danger,
    justifyContent: "center",
    padding:25,
    borderRadius:5
  },
});

export default styles;