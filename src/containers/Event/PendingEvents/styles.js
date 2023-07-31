import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrolledview: {
    padding: 7,
  },
  heading: {
    fontFamily: FontFamily.Medium,
    fontSize: 20,
    color: colors.black,
  },
  textBold: {
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
    fontSize: 13,
    fontFamily: FontFamily.Regular,
  },
  primaryText: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: FontFamily.Medium,
  },
  boxShadow:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  roundedContainer:{
    backgroundColor:colors.white,
    borderRadius:15,
    marginHorizontal:8,
    marginBottom:13,
  },
  spacing:{
    height:10
  },
  spacingXL:{
    height:15,
  },
  coverImage:{
    height:100,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  imageGridOverlay:{
    flexDirection:'row',
    alignItems:'center',
    marginLeft:5
  },
  imageOverlay:{
    height:22,
    width:22,
    borderRadius:30,
    marginLeft:-5
  },
  dot:{
    backgroundColor:colors.gray,
    width:3,
    height:3,
    borderRadius:20,
    marginHorizontal:5
  },
  eventsBanner:{
    height:220,
    width:'100%',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
  },
  eventsContainer:{
    padding:0,
  },
  eventBody:{
    padding:20,
  },
  coverTitle:{
    fontSize:25,
    fontFamily:FontFamily.Medium,
    position:'absolute',
    color:colors.white
  },
  separator:{
    backgroundColor:colors.gray,
    height:1,
    marginVertical:10
  },
  listInline:{
    flexDirection:'row',
    alignItems:'center'
  },
  multiBtns:{
    flexDirection:'row',
    alignItems:'center'
  },
  primaryBtn:{
    flex:1,
    backgroundColor:colors.primary,
    padding:8,
    borderRadius:8,
    justifyContent:'center'
  },
  primaryBtnText:{
    fontFamily:FontFamily.Medium,
    fontSize:16,
    marginLeft:5,
    color:colors.white
  },
  grayBtn:{
    marginLeft:5,
    backgroundColor:colors.lightGray,
    padding:8,
    paddingHorizontal:15,
    borderRadius:8,
    justifyContent:'center'
  },
});

export default styles;