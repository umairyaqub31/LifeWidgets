import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import {Report} from '@containers';


export default function ReportScreen({route,navigation}) {
  return (
      <Report navigation={navigation} route={route} />
  );
}
