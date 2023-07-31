import { StyleSheet } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontFamily: FontFamily.Regular,
    color: colors.black,
  },
  postcontainer: {
    paddingLeft: 15,
    paddingRight: 15,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    width: windowWidth,
    marginBottom: 13,
  },
  profileimagewithoption: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  postdescription: {
    marginBottom: 13,
  },
  profileimage: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  username: {
    color: colors.black,
    fontSize: 18,
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
  replyleftspaceing: {
    marginLeft: 52,
  },
  timeagoearth: {
    width: 12,
    height: 12,
    marginLeft: 3,
  },
  withText: {
    marginTop: 3,
    marginLeft: 5,
    marginRight: 5,
  },
  textgray: {
    fontSize: 13,
    fontFamily: FontFamily.Regular,
    color: colors.gray,
  },
  mentions: {
    fontSize: 14,
    fontFamily: FontFamily.Regular,
    color: colors.primary,
  },
  RecentCommentContent: {
    flex: 1,
    alignItems: "flex-start",
  },
  Medium: {
    fontFamily: FontFamily.Medium,
    opacity: 0.7,
  },
  graytext: {
    color: colors.gray,
    fontSize: 14,
    fontFamily: FontFamily.Regular,
  },
  RecentCommentQuickReplyText: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 3,
    paddingBottom: 5,
  },
  dot: {
    width: 3,
    height: 3,
    backgroundColor: colors.gray,
    borderRadius: 20,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default styles;
