import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      flex:1,
    },
    groupprofileimage:{
        height:250,
        resizeMode:'cover',
        borderWidth:1
    },
    overlay:{
        backgroundColor:'rgba(0,0,0,0.5)',
        position:'absolute',
        height:'100%',
        zIndex:1,
        width:'100%'
    },
    tooldots:{
      zIndex:1,
      alignItems:'flex-end',
      flexDirection:'row',
      justifyContent:'space-between',
      opacity:0.7
    },
    opacitydots:{
      padding:13,
    },
    groupdeatilheadercontainer:{
        paddingLeft:15,
        paddingRight:15,
        paddingTop:13,
        paddingBottom:13
    },
    groupheadertitlecontainer:{
        flexDirection:'row',
    },
    grouptitle:{
        fontFamily:FontFamily.Medium,
        fontSize:25,
        color:colors.black,
        marginBottom:5
    },
    groupstutusmember:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:13
    },
    graytext:{
        fontFamily:FontFamily.Regular,
        color:colors.gray,
        fontSize:14
    },
    dot:{
        width:2,
        height:2,
        backgroundColor:colors.gray,
        marginLeft:5
    },
    totalmembers:{
        fontFamily:FontFamily.Medium,
        color:colors.black,
        fontSize:14,
        marginRight:5,
        marginLeft:5
    },
    mutualimagescontainer:{
        flexDirection:'row',
        marginRight:10,
      },
      avatarimage:{
        marginRight:10,
        backgroundColor:colors.white
      },
      mutualimages:{
        borderRadius:30,
        borderLeftWidth:1,
        borderColor:colors.white,
        backgroundColor:colors.white
      },
      mutualtextimagescontainer:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:3
      },
      customchip:{
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:colors.primary,
        padding:8,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:20,
        marginRight:8
      },
      customchiptext:{
        fontFamily:FontFamily.Medium,
        marginLeft:8,
        color:colors.white
      },
      postcontainer:{
        marginTop:13,
        paddingLeft:15,
        paddingRight:15,
        borderBottomWidth:1,
        borderColor:colors.lightGray,
      },
    animatedview:{
        padding:10,
        borderTopWidth:1,
        borderColor:colors.lightGray,
        position:'absolute',
        bottom:0,
        zIndex:111,
        backgroundColor:colors.white,
        width:'100%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
      },
      modallistcontainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingTop:10,
        paddingBottom:10,
      },
      modallist:{
        fontSize:17,
        fontFamily:FontFamily.Regular,
      },
      profileimage: {
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#fff',
      },
    profileimagewithoption:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        marginBottom:13,
      },
      username: {
        color:colors.black,
        fontSize: 16,
        fontFamily: FontFamily.Medium,
      },
      option:{
        width:22,
        height:18,
        resizeMode:'contain',
      },
      optionopacity:{
        padding:10,
      },
      avatarimage:{
        marginRight:10,
        backgroundColor:colors.white
      },
      timeslotstatus:{
        flexDirection:'row',
        alignItems:'center'
      },
      timeago:{
        fontSize: 14,
        fontFamily: FontFamily.Regular,
        color:colors.gray
      },
      timeagodot:{
        backgroundColor:colors.gray,
        width:3,
        height:3,
        borderRadius:20,
        marginLeft:3
      },
      timeagoearth:{
        width:12,
        height:12,
        marginLeft:3
      },
      headertitle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      headertitleText: {
        color: colors.black,
        fontSize: 20,
        fontFamily: FontFamily.Medium,
        textAlign: "center",
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