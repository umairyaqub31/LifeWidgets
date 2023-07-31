import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {PeopleNearMe} from '@containers';


export default function PeopleNearMeScreen({navigation}) {
  return (
      <PeopleNearMe navigation={navigation}/>
  );
}
