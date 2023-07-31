import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {PendingInvites} from '@containers';


export default function PendingInivteScreen({route,navigation}) {
  return (
      <PendingInvites navigation={navigation} route={route} />
  );
}
