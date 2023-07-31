import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {PhoneValidate} from '@containers';


export default function PhoneValidateScreen({navigation}) {
  return (
      <PhoneValidate navigation={navigation}/>
  );
}
