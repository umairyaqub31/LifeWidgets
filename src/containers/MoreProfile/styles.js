import { StyleSheet, Dimensions } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrolledview: {
    padding: 15,
    height: windowHeight,
  },
  heading: {
    fontFamily: FontFamily.Medium,
    fontSize: 20,
    color: colors.black,
  },
  primarytext: {
    fontFamily: FontFamily.Regular,
    fontSize: 16,
    color: colors.primary,
  },
  editHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  separator: {
    marginTop: 13,
    marginBottom: 13,
  },
  avatarImage: {
    marginRight: 10,
  },
  ProfileAvatarContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 13,
  },
  ProfileImageBackground: {
    height: 200,
    resizeMode: "cover",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderRadius: 10,
    margin: 13,
    marginBottom: 0,
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  listText: {
    marginLeft: 5,
  },
  listIcon: {
    width: 30,
  },
  text: {
    fontSize: 16,
    fontFamily: FontFamily.Regular,
    color: colors.black,
  },
  graytext: {
    color: colors.gray,
    fontSize: 16,
    fontFamily: FontFamily.Regular,
  },
  listContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 13,
  },
  listContainerRight: {
    flex: 1,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    paddingBottom: 13,
  },
  listtitleContainer: {
    flex: 1,
  },
  titleBold: {
    fontFamily: FontFamily.Medium,
    fontSize: 16,
  },
  textGray: {
    fontFamily: FontFamily.Regular,
    fontSize: 14,
    color: colors.gray,
  },
  chipOpacity: {
    backgroundColor: colors.lightGray,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    marginRight: 10,
  },
  reslationShipStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIcon: {
    marginRight: 5,
  },
});

export default styles;