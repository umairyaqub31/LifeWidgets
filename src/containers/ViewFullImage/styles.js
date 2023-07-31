import { StyleSheet,Dimensions,Platform } from 'react-native';
import colors from "../../config/color/color";
import FontFamily from "../../config/fonts/fontfamily";
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor:'#000000'
  },
  safeAreaView:{backgroundColor: '#fff', flex: 1, marginTop: 50,},
  alignCenter:{justifyContent: 'center', alignItems: 'center'},
  imageStyle:{height: '95%', width: '100%'},
  activityIndicator:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  mainContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 130 : 40,
    alignItems: 'center',
  },
  image: {
    height: 190,
    width: 220,
    marginTop: 30,
  },
  whoText: {
    fontSize: 40,
    color: '#000000',
    fontFamily: 'NewYorkExtraLarge-Bold',
    textAlign: 'center',
  },
  messageText: {
    fontSize: 18,
    color: '#000000',
    fontFamily: 'SFProDisplay-Regular',
    textAlign: 'center',
  },
  buttonView: {
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    left: 0,
  },
  bannerText: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallText: {
    marginTop: 20,
    fontSize: 19,
  },
  skipButton: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#581845',
    fontFamily: 'SFProDisplay-Regular',
  },
});

export default styles;
