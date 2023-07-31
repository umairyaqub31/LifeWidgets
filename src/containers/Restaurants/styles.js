import { StyleSheet } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  menuImage: {
    resizeMode: "cover",
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontFamily: FontFamily.Regular,
  },
  textBold: {
    fontSize: 16,
    fontFamily: FontFamily.Medium,
  },
  separator: {
    marginTop: 13,
    marginBottom: 13,
  },
  postTextarea: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 6,
    fontFamily: FontFamily.Regular,
    fontSize: 16,
    marginVertical: 10,
    textAlignVertical: "top",
  },
  primaryBtn: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  primaryBtnText: {
    color: colors.white,
    textAlign: "center",
    fontFamily: FontFamily.Medium,
    fontSize: 16,
  },
  cardTitle:{
    fontFamily: FontFamily.Medium,
    fontSize: 16,
    margin:5
  },
  roundedfilterinputcontainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterIcon: {
    backgroundColor: colors.lightGray,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    marginLeft: 10,
  },
  roundedtextinputcontainer: {
    backgroundColor: colors.lightGray,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    flex: 1,
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
    height: "100%",
    paddingLeft: 5,
  },
  restaurantsContainer: {
    borderRadius: 8,
    paddingBottom: 0,
    marginBottom: 13,
    backgroundColor: colors.lightGray,
    alignItems:'center',
    alignContent:'center',
  },
  restaurantsBody:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  callText: {
    padding: 5,
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
  noMargin:{
    marginTop:0
  },
  welcomePrimaryBtn:{
    backgroundColor:colors.primary,
    padding:10,
    borderRadius:6
  },
  welcomePrimaryBtnText:{
    color:colors.white,
    textAlign:'center',
    fontFamily:FontFamily.Medium,
    fontSize:16,
  },
  textp10: {
    paddingBottom: 10,
  },
  messageShow:{
    flexDirection:'row',
    marginTop:10,
  },
});

export default styles;
