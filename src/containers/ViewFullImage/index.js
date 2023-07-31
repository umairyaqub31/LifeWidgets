import React, {Component} from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ActivityIndicator,
  StatusBar
} from 'react-native';

import styles from './styles';

class ViewFullImage extends Component {
  state = {
    imageLoad: true,
  };
  render() {
    return (
      <View style={styles.container} >
     


            <Image
              source={{uri: this.props.route.params.imageUrl }}
              onLoadStart={() => this.setState({imageLoad: true})}
              onLoadEnd={() => this.setState({imageLoad: false})}
              style={styles.imageStyle}
              resizeMode="contain"
            />
            <ActivityIndicator
              style={styles.activityIndicator}
              animating={this.state.imageLoad}
              color="#000"
            />

      </View>
    );
  }
}

export default ViewFullImage;
