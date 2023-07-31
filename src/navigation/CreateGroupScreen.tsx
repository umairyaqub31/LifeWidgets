import * as React from 'react';
import { CreateGroup } from '@containers';
export default function CreateGroupScreen({navigation,route}) {
    
  return (
      <CreateGroup navigation={navigation} route={route}/>
  );
}
