import * as React from 'react';
import { FlirtDetail } from '@containers';


export default function FlirtDetailScreen({route,navigation}) {
  return (
      <FlirtDetail navigation={navigation} route={route} />
  );
}
