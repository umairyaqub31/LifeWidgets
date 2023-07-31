import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
const windowHeight = Dimensions.get("window").height;
const width = Dimensions.get("screen").width - 80;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
    padding: 10,
  },
  scrolledview: {
    flex: 1,
  },
  heading: {
    fontFamily: FontFamily.Medium,
    fontSize: 18,
    color: colors.black,
  },
  textBold: {
    fontFamily: FontFamily.Medium,
    fontSize: 16,
    color: colors.black,
  },
  text: {
    fontSize: 16,
    fontFamily: FontFamily.Regular,
    color: colors.black,
  },
  photos: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    borderRadius: 4,
  },
  photoList: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    padding: 10,
  },
  graytext: {
    color: colors.gray,
    fontSize: 15,
    fontFamily: FontFamily.Regular,
  },
  primaryText: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: FontFamily.Medium,
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
  roundedtextinput: {
    flex: 1,
    fontFamily: FontFamily.Regular,
    fontSize: 15,
  },
  roundedfilterinputcontainer: {
    marginTop: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  roundedtextinputcontainer: {
    backgroundColor: colors.lightGray,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: 50,
    flex: 1,
  },
  roundedContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
    margin: 2,
  },
  spacing: {
    height: 13,
  },
  spacingXL: {
    height: 25,
  },
  titleInput: {
    fontFamily: FontFamily.Regular,
    fontSize: 18,
    flex: 1,
  },
  textInput: {
    fontFamily: FontFamily.Regular,
    fontSize: 15,
    flex: 1,
  },
  listInlineIcon: {
    marginRight: 10,
  },
  inviteeIcon: {
    backgroundColor: colors.gold,
    width: 45,
    height: 45,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  listInline: {
    flexDirection: "row",
    alignItems: "center",
  },
  list: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalizeContainer: {
    padding: 20,
  },
  separator: {
    backgroundColor: colors.lightGray,
    height: 1,
    marginVertical: 10,
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
  headRightOpacity: {
    width: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headRightText: {
    fontFamily: FontFamily.Medium,
    color: colors.primary,
    fontSize: 15,
  },
  uploadImagesContainer: {
    padding: 20,
    borderRadius: 6,
    backgroundColor: colors.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  activeImageContainer: {
    backgroundColor: "#eee",
  },
  uploadImages: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderRadius: 6,
  },
  uploadImagesClose: {
    position: "absolute",
    top: -10,
    right: -10,
    zIndex: 998,
    backgroundColor: colors.danger,
    borderRadius: 30,
    width: 26,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
