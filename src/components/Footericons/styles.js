import { StyleSheet } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderColor: colors.lightGray,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerleft: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerright: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footiconopacity: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  footiconopacityleft: {
    paddingLeft: 0,
  },
  footiconopacityRight: {
    paddingRight: 0,
  },
  footicon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  dot: {
    width: 2,
    height: 2,
    backgroundColor: colors.gray,
    marginLeft: 4,
    borderRadius: 20,
  },
  footstatsopacity: {
    flexDirection: "row",
    alignItems: "center",
  },
  graytext: {
    fontSize: 13,
    fontFamily: FontFamily.Regular,
    color: colors.gray,
    marginLeft: 5,
  },
  footerstats: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingTop: 8,
    paddingBottom: 13,
  },
  foottotallikes: {
    flexDirection: "row",
    alignItems: "center",
    height: 20,
  },

  footerStatslikeIconChip: {
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;