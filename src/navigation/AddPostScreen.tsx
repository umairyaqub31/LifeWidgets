import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import {AddPost} from '@containers';


export default function AddPostScreen({route,navigation}) {
  return (
    <AddPost navigation={navigation} route={route} />
  );
}

