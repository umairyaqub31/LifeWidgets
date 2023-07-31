import * as React from 'react';
import { Joingroups } from '@containers';


export default function JoingroupsScreen({route,navigation}) {
  return (
      <Joingroups navigation={navigation} route={route} />
  );
}