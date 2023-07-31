import * as React from 'react';
import { StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import {Groups} from '@containers';
import { MaterialCommunityIcons,FontAwesome5, Feather, AntDesign,MaterialIcons } from '@expo/vector-icons';

export default function GroupScreen({navigation}) {
  // const [count, setCount] = React.useState(0);
  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: (props) => (
  //       <TouchableOpacity style={{flex:1,padding:10}} onPress={onPressMoreButton}>
  //           <AntDesign name="pluscircle" size={20} color="black" />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation, setCount]);
  return (
      <Groups navigation={navigation} />
  );
}
