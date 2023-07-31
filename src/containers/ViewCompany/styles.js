import { StyleSheet } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding:15,
    backgroundColor:colors.white,
  },
  scrolledView: {
    flex: 1,
    backgroundColor: colors.white,
    paddingLeft: 15,
    paddingRight: 15,
  },
  pillscontainer: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  menuscreenpills: {
    alignItems: "center",
    maxWidth: "49%",
    width: "100%",
    marginBottom: 10,
  },
  menuImage: {
    resizeMode: "cover",
    height: 100,
    width: "100%",
    borderRadius: 8,
  },
  menuscreenpillstext: {
    color: colors.black,
    fontSize: 16,
    fontFamily: FontFamily.Medium,
    marginTop: 2,
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
  chipOpcity: {
    backgroundColor: colors.lightGray,
    borderRadius: 30,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
});

export default styles;