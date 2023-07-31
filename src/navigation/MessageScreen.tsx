import * as React from 'react';
import { Message } from '@containers';
export default function MessageScreen({navigation,route}) {
  return (
      <Message navigation={navigation} route={route}/>
  );
}
