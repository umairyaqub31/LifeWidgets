import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {Forgotpswd} from '@containers';


export default function ForgotpswdScreen({route,navigation}) {
  return (
      <Forgotpswd navigation={navigation} route={route} />
  );
}
