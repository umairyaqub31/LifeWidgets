import { StyleSheet } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrolledView: {
    flex: 1,
    padding: 15,
  },
  roundedImage: {
    width: 52,
    height: 52,
    resizeMode: "cover",
    borderRadius: 6,
  },
  modallistcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  modallistcontainerPortal:{
    flexDirection:'row',
    alignItems:'center',
    paddingTop:10,
    paddingBottom:10,
  },
  customchipicons: {
    backgroundColor: colors.lightGray,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modallistcontainerRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 10,
  },
  modallist: {
    fontSize: 16,
    fontFamily: FontFamily.Medium,
  },
  graytext: {
    fontSize: 14,
    fontFamily: FontFamily.Regular,
    color: colors.gray,
  },
  opacityIcon: {
    padding: 10,
    paddingRight: 0,
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
