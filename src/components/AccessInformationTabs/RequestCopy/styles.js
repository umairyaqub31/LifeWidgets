import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  scrolledview: {
    padding: 15,
    flex:1,
  },
  separator: {
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 15,
    fontFamily: FontFamily.Regular,
    color: colors.black,
  },
  textGray: {
    fontSize: 14,
    fontFamily: FontFamily.Regular,
    color: colors.gray,
  },
  textBold: {
    fontSize: 15,
    fontFamily: FontFamily.Medium,
    color: colors.black,
  },
  textPrimary: {
    fontSize: 14,
    fontFamily: FontFamily.Medium,
    color: colors.primary,
  },
  listPanel:{
    padding:10,
    borderRadius:6,
    margin:1,
    backgroundColor:colors.white,
    alignItems:'center'
  },
  list:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:10
  },
  listIcon:{
    marginRight:10
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
  DatePicker:{
    marginTop:10,
    backgroundColor:colors.lightGray,
    borderRadius:6,
    padding:6,
    flex:1
  },
  horizontalSpace:{
    width:10
  },
  primaryBtn:{
    backgroundColor:colors.primary,
    height:40,
    textTransform:'uppercase',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:4,
},
primaryBtnText:{
    color:colors.white,
    fontFamily:FontFamily.Medium,
    fontSize:14
},
});

export default styles;