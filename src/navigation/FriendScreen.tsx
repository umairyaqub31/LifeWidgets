import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Friends} from '@containers';


export default function FriendScreen({navigation}) {
  return (
      <Friends navigation={navigation}/>
  );
}
