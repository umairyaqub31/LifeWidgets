import * as React from 'react';
import { BarAbout } from '@containers';


export default function BarAboutScreen({route,navigation}) {
  return (
      <BarAbout navigation={navigation} route={route}/>
  );
}
