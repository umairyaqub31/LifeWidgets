import React, {Component} from 'react';
import {
  View,
} from 'react-native';
import styles from './styles';
import images from './Images';
import { Reactions, Reactions2 } from '@components'

export default class Animation extends Component {
  render () {
    return (
      <View style={styles.container}>
              <Reactions />
          {/* <View style={{height:600}}>
              <Reactions2 />
          </View> */}
      </View>
    );
  }
}