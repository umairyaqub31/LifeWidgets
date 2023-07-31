import * as React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import styles from './styles';
import {Slider} from '@components';


class Auth extends React.Component{
      constructor(props){
        super(props);
        this.state = {}
      }

  render(){
    return(
      <View style={styles.container}>
          <View style={{flex:.3,justifyContent:'flex-end',alignItems:'center'}}>
              <Image
                style={styles.logo}
                source={require('../../../assets/images/logo.png')}
              />
          </View>
          <View style={styles.SwiperContainer}>
              {/* <Slider /> */}
              <View style={{flex:1,justifyContent:'center'}}>
                <Text style={[styles.heading,styles.whiteText]}>LIFE CONNECTED WITH THE APP THAT HAS IT ALL...</Text>
                <View style={styles.spacing} />
                <View style={styles.spacing} />
                <Text style={[styles.Text,styles.whiteText]}>In a world where Big Tech companies seem to focus more on revenues than their user experiences, our mission is to put users FIRST by providing a better experience that connects everything that matters in one place making it easier to live connected.
                </Text>
                <View style={styles.spacing} />
                <Text style={[styles.Text,styles.whiteText]}>Life Widgets is more than an app, it’s a promise and mission that we hope will change the future of app experiences for the better.
                </Text>
              </View>
              <View style={{flex:.3}}>
                <TouchableOpacity style={styles.filledbtn} onPress={() => this.props.navigation.navigate('Signin')}>
                    <Text style={styles.filledbtnText}>Get Started</Text>
                </TouchableOpacity>
              </View>
          </View>
      </View>
    )
  }
}
export default Auth;