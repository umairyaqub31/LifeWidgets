import { StyleSheet, Dimensions } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  textInputView: {
    flexDirection: "row",
    alignItems:"center",
    marginHorizontal:15,
    marginTop:13,
  },
  textInput: {
    borderWidth: 2,
    borderColor: colors.gray,
    borderRadius: 6,
    minHeight: 300,
    textAlignVertical: "top",
    padding: 10,
    fontSize: 16,
    fontFamily: FontFamily.Regular,
    color: colors.black,
  },
  headertitle: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  rowDirection: {
    flexDirection: "row",
    paddingVertical: 15,
    borderBottomWidth: 0.1,
  },

  chatUserImage: { height: 40, width: 40, borderRadius: 25 },

  textinput1: {
    height: 45,
    color: "#000",
    borderRadius: 6,
    borderBottomWidth: 0,
    color: "#000",
    width: '100%',
    backgroundColor: colors.lightGray,
    padding:10
  },
  send: {
    marginTop: 6,
    marginLeft: 10,
  },
  onlineUserHead: {
    marginLeft: 20,
    marginTop: 15,
  },
  activeUserImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  recentChatHeadView: {
    marginLeft: 20,
    marginTop: 15,
  },
  userProfileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  mesTime: {
    textAlign: "right",
  },
  activeUserText: {
    fontSize: 17,
    fontFamily: FontFamily.Medium,
  },
  alignCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  activerUserNameText: {
    textAlign: "center",
    fontSize: 15,
    fontFamily: FontFamily.Regular,
  },
  recentChatText: {
    fontSize: 17,
    fontFamily: FontFamily.Medium,
  },
  userListMainView: {
    marginTop: 20,
    marginLeft: 20,
  },
  userNameText: {
    textAlign: "left",
    fontSize: 17,
    fontFamily: FontFamily.Medium,
  },
  lastMsg: {
    fontFamily: FontFamily.Regular,
  },
  width15: {
    width: "15%",
  },
  width60: {
    width: "60%",
  },
  width20: {
    width: "20%",
  },
  fab: {
    position: "absolute",
    margin: 30,
    right: 10,
    bottom: 0,
    color: colors.primary,
    backgroundColor: colors.primary,
  },
  flexDirection: {
    flexDirection: "row",
    alignItems:'center',
  },
  margin15: { marginTop: 15 },
  margin20: { marginLeft: 20 },
  topMargin: { marginTop: 15 },
  badge: {
    width: 20,
    height: 20,
    alignSelf: "flex-end",
    color: colors.primary,
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
  },
  primaryBtn:{
    backgroundColor:colors.primary,
    margin:15,
    padding:10,
    borderRadius:6
  },
  primaryBtnText:{
    fontFamily:FontFamily.Medium,
    color:colors.white,
    textAlign:'center'
  }
});

export default styles;