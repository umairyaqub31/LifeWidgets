import { StyleSheet } from 'react-native';
import colors from "../../config/color/color";
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width-42;

const styles = StyleSheet.create({
    Swiper:{
      maxHeight:250,
      height:250,
      alignSelf: 'center',
    },
    arrayImagesGrid:{
      marginRight:10,
      //width:windowWidth,
    },
    ImagesGridphoto:{
        borderRadius:8,
        aspectRatio:3/2,
        resizeMode:"cover"
    },
    close:{
      position:'absolute',
      top:25,
      left:10,
      zIndex:1,
      padding:10
    }
  });

export default styles;
