import * as React from 'react';
import { ViewFullImage } from '@containers';
export default function MessageScreen({navigation,route}) {
  return (
      <ViewFullImage navigation={navigation} route={route}/>
  );
}