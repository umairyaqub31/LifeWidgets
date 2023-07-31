import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({

  scrolledView:{
    padding:15
  },
  userName:{
    fontSize:16,
    fontFamily:FontFamily.Medium,
    color:colors.black
  },
  avatarimage: {
    marginRight: 10,
    backgroundColor: colors.white,
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
  chipOpcityPrimary: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    marginLeft:-12
  },
  listInline:{
    flexDirection:'row',
    alignItems:'center'
  },
  separator:{
    backgroundColor:colors.lightGray,
    height:1,
    marginVertical:10
  },
  text:{
    fontSize:16,
    fontFamily:FontFamily.Regular,
    color:colors.black
  },




  mainHeaderContainer: {
    flexDirection: "row",
  },

  buttonContainerInner: {
    justifyContent: "space-around",
    flexDirection: "row",
    marginTop: 20,
  },

  buttonContainerInnerTextContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#168BFC",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonContainerInnerText: {
    color: "#fff",
    alignItems: "center",
    //paddingHorizontal: 5,
    alignItems: "center",
    fontFamily: FontFamily.Medium,
  },
  innerContainer: {
    alignItems: "center",
  },
  ImageStyles: {
    marginTop: 10,
    width: 300,
    height: 400,
    // borderRadius:140,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  iconfiles: {
    marginTop: 10,
  },
  DailogMainContainer1: {
    marginTop: -10,
  },
  DailogMainContainer: {
    marginTop: -20,
  },
  insideContainerDailog: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
  },
  iconDailogscontaint: {},
  testcontentinnerDailog: {
    marginHorizontal: 15,
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "lightgrey",
    paddingVertical: 12,
  },
  activityIndicator: {
    position: "absolute",
    alignSelf: "center",
    paddingTop: 25,
  },
  sendIcon: {
    marginRight:0,
  },
  bottomInputView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position:'relative',
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: "300",
    color: "#8c8c8c",
    borderRadius: 25,
    paddingHorizontal: 12,
    paddingTop: Platform.OS === "ios" ? 14 : 10,
    paddingBottom: Platform.OS === "ios" ? 14 : 10,
    paddingRight: 30,
    backgroundColor: "whitesmoke",
  },
  button: {
    width: 30,
    height: 30,
    //marginBottom: Platform.OS === "ios" ? 15 : 0,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  attachment: {
    width: 40,
    height: 50,
    position: "absolute",
    right: 5,
    bottom: 0,
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  inputContainer: {
    marginBottom: Platform.OS === "ios" ? 15 : 0,
    flexDirection: "row",
    width: "70%",
  },
  chatContainer: {
    borderRadius: 15,
    margin: 5,
  },
  chatTxt: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 5,
    fontWeight: "500",
    padding: 8,
  },
  activityIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  senderMessage: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  sendImage: {
    borderColor: "#03a5fc",
    marginBottom: 3,
    borderWidth: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  sendImageTime: {
    alignSelf: "flex-end",
    textAlign: "right",
    paddingHorizontal: 3,
    paddingTop: 10,
    fontSize: 13,
    color: "#ffffff",
    marginTop: -40,
    marginRight: 10,
    marginBottom: 10,
  },
  sendMessageText: {
    backgroundColor: "#03a5fc",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  recieveMessageTime: {
    alignSelf: "flex-end",
    textAlign: "right",
    paddingTop: 1,
    paddingHorizontal: 3,
    fontSize: 12,
    color: "lightcyan",
  },
  recieveMessageView: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  recieveMessageText: {
    backgroundColor: "#cae8ed",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  recieveTextTime: {
    alignSelf: "flex-end",
    textAlign: "right",
    paddingTop: 1,
    paddingHorizontal: 3,
    fontSize: 12,
    color: "#171717",
  },
  recieveImage: {
    borderColor: "#cae8ed",
    marginBottom: 3,
    borderWidth: 5,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  chatImage: { width: 300, height: 150 },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#25539c",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  dateHeader: {
    backgroundColor: "#8fd4eb",
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 15,
    marginBottom: 10,
  },
  headertitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageTitleView: {
    marginTop: 10,
    // height: 55,
  },

  rowDirection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //paddingVertical:20
  },

  chatImage1: { height: 50, width: 50, borderRadius: 25 },
  chatUserName: { fontSize: 18, marginLeft: 10 },



  });

export default styles;
