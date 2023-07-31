import { StyleSheet, Dimensions } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  heading: {
    fontFamily: FontFamily.Medium,
    fontSize: 20,
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
  graytext: {
    color: colors.gray,
    fontSize: 13,
    fontFamily: FontFamily.Regular,
  },
  spacing: {
    height: 10,
  },
  spacingXL: {
    height: 15,
  },
  separator: {
    backgroundColor: colors.lightGray,
    height: 2,
    marginVertical: 10,
  },
  listInline: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalizeContainer: {
    padding: 20,
  },
  primaryText: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: FontFamily.Medium,
  },
});

export default styles;
