import { StyleSheet, Dimensions, Platform } from 'react-native';
import colors from "../../../../config/color/color";


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
    container: {
      flex: 1,
    },
    scrolledView:{
      flex:1,
      backgroundColor:colors.white,
    },
    header: {
      height: isIPhoneX() ? 74 : 64,
      backgroundColor: "transparent"
  },
  statusBarTop: {
      paddingTop: isIPhoneX() ? 30 : Platform.OS === "ios" ? 20 : 0
  },
  pageHeader: {
      flexDirection: "row",
      alignItems: "center",
      top: 0,
      width: "100%",
      position: "absolute",
      zIndex: 1000
  },
  });
  
export default styles;