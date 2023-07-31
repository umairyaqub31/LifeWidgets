import { StyleSheet, Dimensions } from "react-native";
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  scrolledview: {
    padding: 15,
    flex:1,
  },
});

export default styles;