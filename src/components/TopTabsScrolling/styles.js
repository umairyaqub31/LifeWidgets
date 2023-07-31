import { StyleSheet } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  list:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  listInline:{
    flexDirection:'row',
    alignItems:'center',
  },
  animtedTabs:{
    borderColor:colors.primary,
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  animtedTabText:{
    fontFamily:FontFamily.Medium,
    fontSize:14,
    color:colors.black
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