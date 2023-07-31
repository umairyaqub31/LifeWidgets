import * as React from 'react';



import {Menu} from '@containers';


export default function MenuScreen({navigation}) {
  navigation
      .dangerouslyGetParent()
      ?.setOptions({ tabBarVisible: true });
  return (
      <Menu navigation={navigation}/>
  );
}
