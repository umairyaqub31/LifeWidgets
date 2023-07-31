import * as React from 'react';
import { ChatUserList } from '@containers';
export default function ChatUserListScreen({navigation,route}) {
  return (
      <ChatUserList navigation={navigation} route={route}/>
  );
}
