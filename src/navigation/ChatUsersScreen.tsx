import * as React from 'react';
import {ChatUsers} from '@containers';


export default function ChatUsersScreen({route,navigation}) {
  
  return (
      <ChatUsers navigation={navigation} route={route} />
  );
}
