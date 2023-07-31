import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import {GroupDescription} from '@containers';

export default function GroupDescriptionScreen({navigation}) {
  return (
      <GroupDescription navigation={navigation} />
  );
}
