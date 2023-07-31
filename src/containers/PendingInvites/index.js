import * as React from 'react';
import { View, ScrollView } from 'react-native';
import styles from './styles';
import {  Pendinginvites } from '@components'


class PendingInvites extends React.Component{
  render(){
    return(
      <View style={styles.container}>
      <ScrollView style={styles.scrolledview}>
          <View>
          <Pendinginvites navigation={this.props.navigation} route={this.props.route} />
          </View>
      </ScrollView>
    </View>
    )
  }
}

export default PendingInvites;