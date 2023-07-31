import * as React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import {Auth} from '@containers';
import {AuthContext} from "./context"

export default function Authscreen({navigation}) {
  // const { signIn } = React.useContext(AuthContext)
  return (
    <>
      <Auth navigation={navigation}/>
      {/* <Button title='dafadfadfadf' onPress={() => signIn()} /> */}
    </>
  );
}
