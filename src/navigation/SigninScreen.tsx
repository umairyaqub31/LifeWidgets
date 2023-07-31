import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Signin} from '@containers';


export default function SigninScreen({navigation}) {
  return (
      <Signin navigation={navigation}/>
  );
}
