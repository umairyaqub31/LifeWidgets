import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import {SignupPhone} from '@containers';


export default function SignupPhoneScreen({route,navigation}) {
  return (
      <SignupPhone navigation={navigation} route={route} />
  );
}
