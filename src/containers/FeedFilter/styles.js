import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'white',
    },
    scrolledview:{
      padding:15,
      flex:1,
    },
    avataroverlyicon:{
      backgroundColor:colors.primary,
      width:25,
      height:25,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:30,
    },
    dislike:{
      backgroundColor:colors.gray
    },
    favorite:{
        backgroundColor:'red'
    }
  });
  
export default styles;