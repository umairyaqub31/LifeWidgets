import { StyleSheet,Dimensions } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;


const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      flex:2,
      padding:15,
      paddingTop:13,
      paddingBottom:13,
    },
    profileimage: {
        flexDirection:'row',
        alignItems:'center',
      },
      username: {
        color:colors.black,
        fontSize: 16,
        fontFamily: FontFamily.Medium,
      },
      withText:{
        marginLeft:5,
        marginRight:5
      },
      textgray:{
        fontSize: 13,
        fontFamily: FontFamily.Regular,
        color:colors.gray
      },
      avatarimage:{
        marginRight:10,
        backgroundColor:colors.white
      },
      statusgridcontainer:{
        flexDirection:'row',
        marginTop:4
      },
      statusgrid:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        borderWidth:1,
        borderColor:colors.gray,
        borderRadius:4,
        height:24,
        paddingLeft:4,
        paddingRight:4,
        marginRight:6
      },
      statusSpacing:{
        marginLeft:4,
        marginRight:4
      },
      
      postTextarea:{
        textAlignVertical: "top",
        fontSize:20,
        paddingTop:20,
        paddingBottom:13,
        minHeight:200,
      },
      animatedview:{
        borderWidth:1,
        padding:13,
        borderColor:colors.lightGray,
        backgroundColor:colors.white,
        width:'100%',
        borderWidth: 1,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      },
      modallist:{
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'flex-start',
      },
      modallistOpacity:{
        flexDirection:'row',
        alignItems:'center',
      },
      photochipicon:{
        color:'green'
      },
      chipicon:{
        marginRight:5,
        alignItems:'center',
        width:35
      },
      popupclosehead:{
          alignItems:'center',
          
      },
      popupcloseLine:{
          backgroundColor:colors.lightGray,
          width:70,
          height:6,
          borderRadius:20,
          marginTop:-30
      },
      separator:{
        marginTop:10,
        marginBottom:10,
      },
      text:{
        fontSize:16,
        fontFamily:FontFamily.Regular,
        color:colors.black
      },
      headRightOpacity:{
        width:60,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      },
      headRightText:{
        fontFamily:FontFamily.Medium,
        color:colors.primary,
        fontSize:15
      },
      mediaContainer:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    mediaBoxButton:{
      margin:10,
      zIndex:2
    }
  });
  
export default styles;