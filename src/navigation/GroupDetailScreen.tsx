import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import {Groupdetail} from '@containers';
import { MaterialCommunityIcons,FontAwesome5, Feather, AntDesign,MaterialIcons } from '@expo/vector-icons';

export default function GroupDetailScreen({route,navigation}) {
  return (
      <Groupdetail navigation={navigation} route={route} />
  );
}
