import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import {GroupMembers} from '@containers';

export default function GroupMembersScreen({route,navigation}) {
  return (
      <GroupMembers navigation={navigation} route={route} />
  );
}
