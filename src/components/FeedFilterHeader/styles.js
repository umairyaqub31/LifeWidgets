import { StyleSheet } from 'react-native';
import color from '../../config/color/color';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { Dimensions, Platform} from 'react-native';


const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    searchInput:{
        backgroundColor:colors.lightGray,
        borderRadius:20,
        paddingLeft:10,
        paddingRight:10,
        minHeight:35,
        fontSize:16,
        fontFamily:FontFamily.Regular,
        ...Platform.select({
            ios: {
                width:windowWidth - 60,
                marginLeft:30,
            },
          }),
    }
  });
  
export default styles;