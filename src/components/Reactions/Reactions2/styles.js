import { StyleSheet, Platform } from 'react-native';
import colors from "../../../config/color/color";
import FontFamily from "../../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent:'center'
  },

  likeContainer: {
    position: "absolute",
    left: -10,
    padding: 5,
    flex: 1,
    backgroundColor: "red",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 20,
  },
  borderContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 20,
  },
  imgContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  img: {
    marginLeft: 5,
    marginRight: 5,
    width: 30,
    height: 30,
    overflow: "visible",
  },
  });
  
export default styles;