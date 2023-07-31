import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../config/color/color";
import fontfamily from "../../../config/fonts/fontfamily";
import FontFamily from "../../../config/fonts/fontfamily";
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrolledview: {
    padding: 7,
  },
  headertitleText: {
    color: colors.black,
    fontSize: 20,
    fontFamily: FontFamily.Medium,
    textAlign: "center",
  },
  heading: {
    fontFamily: FontFamily.Medium,
    fontSize: 18,
    color: colors.black,
  },
  text: {
    fontSize: 16,
    fontFamily: FontFamily.Regular,
    color: colors.black,
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
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  roundedContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 15,
    margin: 8,
  },
  spacing: {
    height: 10,
  },
  spacingXL: {
    height: 15,
  },
  coverImage: {
    height: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  eventsBanner: {
    height: 150,
    width: "100%",
  },
  eventsContainer: {
    maxWidth: 250,
    width: 250,
    padding: 0,
  },
  eventBody: {
    padding: 15,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flex: 1,
  },
  eventDate: {
    backgroundColor: colors.white,
    borderRadius: 6,
    padding: 5,
    alignItems: "center",
  },
  eventDateText: {
    fontFamily: FontFamily.Medium,
    fontSize: 16,
    color: colors.primary,
  },
  eventMonthText: {
    fontFamily: FontFamily.Regular,
    fontSize: 12,
    color: colors.primary,
  },
  coverTitle: {
    fontSize: 25,
    fontFamily: FontFamily.Medium,
    position: "absolute",
    color: colors.white,
  },
  dateTagPanel: {
    alignItems: "center",
    marginTop: -30,
  },
  dateTag: {
    padding: 15,
    width: "70%",
  },
  separator: {
    backgroundColor: colors.lightGray,
    height: 2,
    marginVertical: 10,
  },
  listInlineIcon: {
    marginRight: 10,
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
});

export default styles;
