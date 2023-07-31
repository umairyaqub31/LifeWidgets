import { StyleSheet, Platform, Dimensions } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


function isIPhoneX() {
  const X_WIDTH = 375;
  const X_HEIGHT = 812;
  return (
      Platform.OS === "ios" &&
      ((deviceHeight === X_HEIGHT && deviceWidth === X_WIDTH) ||
      (deviceHeight === X_WIDTH && deviceWidth === X_HEIGHT))
  );
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.white,
    },
    scrolledview:{
      flex:1,
    },
    header: {
      height: isIPhoneX() ? 74 : 64,
      backgroundColor: "transparent"
  },
  headerBody: {
      flex: 1,
      alignItems: "center",
  },
  statusBarTop: {
      paddingTop: isIPhoneX() ? 30 : Platform.OS === "ios" ? 20 : 0
  },
  mobileHeader: {
      // width: deviceWidth,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
  },
  // masonryHeader: {
  //     position: "absolute",
  //     zIndex: 10,
  //     flexDirection: "row",
  //     padding: 5,
  //     alignItems: "center",
  //     backgroundColor: "rgba(150,150,150,0.4)"
  // },
  pageHeader: {
      flexDirection: "row",
      alignItems: "center",
      top: 0,
      width: "100%",
      position: "absolute",
      zIndex: 1000
  },
  title: {
      fontSize: 25
  },
  listTab: {
      height: 32,
      flexDirection: "row",
      borderTopLeftRadius: 7.5,
      borderTopRightRadius: 7.5,
      backgroundColor: "#fff",
      marginBottom: -5
  },
  tab: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
  },
  tabTextUnderline: {
      borderBottomWidth: 2,
      borderBottomColor: "#e53935"
  },
  tabTextOn: {
      fontSize: 10,
      color: "#e53935"
  },
  tabTextOff: {
      fontSize: 10,
      color: "grey"
  },
  // userPic: {
  //     height: 20,
  //     width: 20,
  //     borderRadius: 10,
  //     marginRight: 10
  // },
  // userName: {
  //     color: "#616161"
  // },
  whiteText: {
      fontWeight: "bold",
      color: "#fafafa"
  },
  profilePrimary: {
      fontSize: 14,
      paddingHorizontal: 5
  },
  profileSecondary: {
      fontSize: 12,
      paddingHorizontal: 5
  },
  });
  
export default styles;