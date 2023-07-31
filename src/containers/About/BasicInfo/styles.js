import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      paddingBottom:15,
      flex:1,
    },
    heading:{
      fontFamily:FontFamily.Medium,
      fontSize:16,
      color:colors.black
    },
    titleBold:{
      fontFamily:FontFamily.Medium,
      fontSize:16
    },
    textGray:{
      fontFamily:FontFamily.Regular,
      fontSize:14,
      color:colors.gray
    },
    text:{
      fontFamily:FontFamily.Regular,
      fontSize:16,
      color:colors.black
    },
    primarytext:{
      fontFamily:FontFamily.Regular,
      fontSize:16,
      color:colors.primary
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
      backgroundColor:colors.lightGray,
      borderRadius:6,
      flex:1,
      marginLeft:15
    },
    ListPanelHeader:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      backgroundColor:colors.lightGray,
      padding:5,
      paddingLeft:15,
      paddingRight:15,
    },
    ListPanelBody:{
      paddingLeft:15,
      paddingRight:15
    },
    noBorder:{
      borderBottomWidth:0
    },
    separator:{
      marginTop:13,
      marginBottom:13
    },
    listContainer:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:"center",
      padding:5,
      borderBottomWidth:1,
      borderColor:colors.lightGray
    },
    listtitleContainer:{
      flex:1,
    },
    editOpacity:{
      padding:8,
      justifyContent:'center'
    },
    listContainerRight:{
      flex:1,
      flexDirection:'row',
      borderBottomWidth:1,
      borderColor:colors.lightGray,
    },
    noPadding:{
      paddingBottom:0
    },
    chipOpacity:{
      backgroundColor:colors.lightGray,
      width:25,
      height:25,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:4,
      borderWidth:1,
      borderColor:colors.gray
    },
    birthdayList:{
      flexDirection:'row',
      alignItems:'center',
      marginTop:13,
      marginBottom:13
    },
    roundedtextinput:{
      borderRadius:6,
      backgroundColor:colors.lightGray,
      height: 50,
      marginTop:10,
    },
  });
  
export default styles;