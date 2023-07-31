import * as React from 'react';
import { BarsFilter } from '@containers';


export default function BarsFilterScreen({route,navigation}) {
  return (
      <BarsFilter navigation={navigation} route={route} />
  );
}
