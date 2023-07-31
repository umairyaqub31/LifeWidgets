import { StyleSheet, Dimensions} from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: 'lightgrey',
      },
      userContainer: {
     
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      nameTitle: {
        fontSize: 18,
        fontWeight: '700',
      },
      select: {
        color: 'green',
        fontSize: 10,
        fontWeight: '500',
      },
  });
  
export default styles;