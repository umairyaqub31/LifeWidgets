import { StyleSheet, Dimensions } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  windowWidth: {
    width: windowWidth,
  },
  scrolledview: {
    flex: 1,
    padding: 15,
    paddingTop: 0,
    paddingBottom: 0,
  },
  modalContent: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
  },
  noTittleBar: {
    padding: 0,
    margin: 0,
    height: 0,
  },
  modalTitleLine: {
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 5,
  },
  modalTitle: {
    width: 80,
    borderRadius: 40,
    height: 6,
    backgroundColor: colors.lightGray,
  },
  modallistcontainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
  },
  modallistcontainerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 10,
  },
  modallist: {
    fontSize: 16,
    fontFamily: FontFamily.Regular,
  },
  modallistText: {
    fontFamily: FontFamily.Medium,
    fontSize: 16,
    color: colors.black,
  },
  customchipicons: {
    backgroundColor: colors.lightGray,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryfilledbtn: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 6,
  },
  primaryfilledbtntext: {
    color: colors.white,
    fontFamily: FontFamily.Medium,
    textAlign: "center",
    fontSize: 17,
  },
  privacyHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 5,
  },
  textPrimary: {
    fontSize: 16,
    fontFamily: FontFamily.Medium,
    color: colors.primary,
  },
  touchOpacity: {
    padding: 5,
  },
  groupsIcon: {
    backgroundColor: "#F7B928",
  },
  text: {
    fontFamily: FontFamily.Medium,
    fontSize: 15,
    color: colors.black,
  },
  center: {
    textAlign: "center",
  },
  separator: {
    marginTop: 13,
    marginBottom: 0,
  },
  chipiconopacity: {
    backgroundColor: colors.lightGray,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    marginBottom: 5,
  },
  activechipiconopacity: {
    backgroundColor: colors.primary,
  },
  profileimage: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
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
  statusgridcontainer: {
    flexDirection: "row",
    marginTop: 4,
  },
  statusgrid: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 4,
    height: 24,
    width: 100,
    paddingLeft: 4,
    paddingRight: 4,
    marginRight: 6,
  },
  textgray: {
    fontSize: 13,
    fontFamily: FontFamily.Regular,
    color: colors.gray,
  },
  popupTextinput: {
    textAlignVertical: "top",
    paddingTop: 20,
    minHeight: 120,
    fontSize: 16,
    color: colors.black,
    fontFamily: FontFamily.Regular,
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    height: 30,
    width: 100,
    textTransform: "uppercase",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  primaryBtnText: {
    color: colors.white,
    fontFamily: FontFamily.Medium,
    fontSize: 12,
  },
  popUpHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 10,
  },
  textPrimary: {
    fontSize: 16,
    fontFamily: FontFamily.Medium,
    color: colors.primary,
  },
  touchOpacity: {
    padding: 5,
  },
  separator: {
    marginTop: 10,
    marginBottom: 13,
  },
  primarytext: {
    fontSize: 15,
    fontFamily: FontFamily.Regular,
    color: colors.primary,
    padding: 10,
    paddingLeft: 0,
  },
  graytext: {
    fontSize: 15,
    fontFamily: FontFamily.Regular,
    color: colors.gray,
  },
  heading: {
    fontFamily: FontFamily.Medium,
    fontSize: 18,
  },
  noPadding: {
    paddingTop: 0,
  },
  nomarginBottom: {
    marginBottom: 0,
  },
  nomarginTop: {
    marginTop: 0,
  },
  groupTextinputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    paddingLeft: 15,
    paddingRight: 15,
  },
  groupTextinput: {
    fontSize: 16,
    fontFamily: FontFamily.Regular,
    color: colors.black,
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  choosePrivacy: {
    backgroundColor: colors.primary,
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    marginBottom: 13,
  },
  choosePrivacyText: {
    fontSize: 15,
    fontFamily: FontFamily.Medium,
    color: colors.white,
  },
});

export default styles;