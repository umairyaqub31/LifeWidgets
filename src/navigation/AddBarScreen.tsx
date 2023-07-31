import * as React from 'react';
import {AddBar} from '@containers';


export default function AddBarScreen({route,navigation}) {
  return (
      <AddBar navigation={navigation} route={route} />
  );
}
