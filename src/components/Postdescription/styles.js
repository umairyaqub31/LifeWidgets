import { StyleSheet } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontFamily: FontFamily.Regular,
    color: colors.black,
  },
  postdescription: {
    marginBottom: 13,
  },
  previewContainer: {
    marginHorizontal:0,
    marginTop:0
  },
});

export default styles;