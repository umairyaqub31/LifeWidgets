import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  calendar: {
    margin: 2,
    borderRadius: 8,
  },

  // Asad
  addEventPlusBtn: {
    position: "absolute",
    zIndex: 1,
    bottom: 20,
    right: 20,
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
  roundedContainer: {
    backgroundColor: colors.success,
    borderRadius: 6,
    padding: 15,
    flex: 1,
    marginBottom: 13,
  },
  barSearchChips: {
    marginBottom: 10,
  },
  activecustomchip: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    marginRight: 8,
  },
  activecustomchiptext: {
    color: colors.white,
    fontFamily: FontFamily.Medium,
  },
  customchip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    marginRight: 8,
  },
  customchiptext: {
    fontFamily: FontFamily.Medium,
  },
  customchipIcon: {
    marginRight: 6,
  },
  badge: {
    backgroundColor: colors.primary,
    width: 15,
    height: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  badgeText: {
    fontSize: 8,
    fontFamily: FontFamily.Medium,
    color: colors.white,
  },
  listInline: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
  },
  eventDayContainer: {
    alignItems: "center",
    marginRight: 10,
  },
  eventDay: {
    fontFamily: FontFamily.Medium,
    color: colors.gray,
    fontSize: 14,
  },
  eventDate: {
    fontFamily: FontFamily.Medium,
    color: colors.black,
    fontSize: 14,
  },
});

export default styles;
