import { StyleSheet } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.white,
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
  pillscontainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuscreenpills: {
    alignItems: "center",
    maxWidth: "49%",
    width: "100%",
    marginBottom: 10,
    margin: 1,
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 3,
  },
  menuImage: {
    resizeMode: "cover",
    height: 180,
    width: "100%",
    borderRadius: 8,
  },
  ShareNow: {
    position: "absolute",
    right: 0,
    margin: 5,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 11,
    backgroundColor: colors.white,
    borderRadius: 40,
  },

  close: {
    position: "absolute",
    top: 25,
    left: 10,
    zIndex: 1,
    padding: 10,
  },
  shareButtonContainer: {
    marginBottom: 20,
  },
  appButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    padding:50,
    borderRadius:8,
    position:'absolute',
    zIndex:11,
    bottom:20,
    width:"94%",
    left:'3%'
  },
  appButtonText: {
    fontSize: 17,
    color: "#fff",
    fontFamily: FontFamily.Regular,
    alignSelf: "center",
    textTransform: "uppercase",
  },
});

export default styles;