import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
const width = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.white,
  },
  scrolledview:{
    flex:1,
    padding:15,
  },
  userName:{
      fontFamily:FontFamily.Medium,
      fontSize:15,
      color:colors.black,
      marginLeft:10
  },
  text:{
    fontFamily:FontFamily.Regular,
    fontSize:15,
    color:colors.black,
},
  boxShadow:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  headerRight:{
    flex:1,
    width:50,
    alignItems:'center',
    justifyContent:'center'
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
  },
  boxShadow:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  roundedtextinputcontainer:{
    backgroundColor:colors.lightGray,
    borderRadius:6,
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:10,
    minHeight: 50,
    marginBottom:1
  },
  roundedtextinput:{
    flex:1,
    height:"100%",
    paddingLeft:5,
  },
  sendIconBtn:{
    backgroundColor:colors.primary,
    width:30,
    height:30,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:30
  },
  modelList:{
    flexDirection:'row',
    alignItems:'center',
    height:50,
    justifyContent:'center'
  },
  listText:{
    fontFamily:FontFamily.Regular,
    fontSize:16,
    paddingLeft:10
  },
  separator:{
    backgroundColor:colors.lightGray,
    height:1,
    marginHorizontal:13
  }
});

export default styles;