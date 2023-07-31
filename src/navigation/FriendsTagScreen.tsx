import * as React from 'react';
import {FriendsTag} from '@containers';


export default function FriendsTagScreen({route,navigation}) {
  return (
      <FriendsTag navigation={navigation} route={route}/>
  );
}
