import { StyleSheet } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrolledview: {
    flex: 1,
    padding: 15,
  },
  roundedtextinputcontainer: {
    backgroundColor: colors.lightGray,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    marginBottom: 13,
  },
  roundedtextinput: {
    flex: 1,
    height: "100%",
    paddingLeft: 5,
  },
  heading: {
    fontFamily: FontFamily.Medium,
    fontSize: 20,
    color: colors.black,
  },
  graytext: {
    fontFamily: FontFamily.Regular,
    color: colors.gray,
    fontSize: 14,
  },
  pendinginvitescontainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    marginTop: 13,
    paddingBottom: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  pendinginvitesnamecontainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  username: {
    color: colors.black,
    fontSize: 20,
    fontFamily: FontFamily.Medium,
  },
  avatarimage: {
    marginRight: 10,
    backgroundColor: colors.white,
  },
  graytext: {
    fontSize: 14,
    fontFamily: FontFamily.Regular,
    color: colors.gray,
  },
  optionsopacity: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  optionsimage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  primarybtn: {
    backgroundColor: colors.primary,
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  dangerBtn: {
    backgroundColor: "#DC143C",
    padding: 5,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
  },
  primarybtntext: {
    fontFamily: FontFamily.Medium,
    color: colors.white,
    fontSize: 13,
    marginLeft: 3,
    textAlign:"center",
  },
  headertitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headertitleText: {
    color: colors.black,
    fontSize: 20,
    fontFamily: FontFamily.Medium,
    textAlign: "center",
  },
});

export default styles;